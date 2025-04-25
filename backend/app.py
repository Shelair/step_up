from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///courses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app, supports_credentials=True)  # Enable CORS with credentials

# Models
class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    sections = db.relationship('Section', backref='course', cascade="all, delete-orphan")

class Section(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
    pages = db.relationship('Page', backref='section', cascade="all, delete-orphan")

class Page(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=True)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)

# Routes
@app.route('/api/courses', methods=['POST'])
def save_course():
    if not request.cookies.get('user') or request.cookies.get('role') != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    title = data.get('title')
    sections = data.get('sections')

    if not title or not sections:
        return jsonify({'error': 'Invalid data'}), 400

    course = Course.query.filter_by(title=title).first()
    if course:
        # Update existing course
        course.sections.clear()
    else:
        # Create new course
        course = Course(title=title)
        db.session.add(course)

    for section_data in sections:
        section = Section(title=section_data['title'], course=course)
        for page_data in section_data['pages']:
            page = Page(
                title=page_data['title'],
                type=page_data['type'],
                content=page_data['content'],
                section=section
            )
            section.pages.append(page)
        course.sections.append(section)

    db.session.commit()
    return jsonify({'message': 'Course saved successfully'}), 200

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
