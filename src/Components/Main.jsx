import React from "react";
import Kurs_block from "./Kurs_block";

export default function Main() {
  return (
    <main className="main-container">
      <h1 className="main-title">Онлайн курсы</h1>
      <div className="courses-wrapper">
        <Kurs_block
          title="Курс немецкого языка"
          description="Освойте чтение, письмо, разговорную и письменную речь на разных уровнях. Узнайте больше о культуре немецкоговорящих стран."
          image="\кельнский собор.jpg"
          lang="немецкий"
        />

        <Kurs_block
          title="Курс корейского языка"
          description="Изучите корейский алфавит хангыль, базовую грамматику и развейте навыки устной и письменной речи. Познакомьтесь с основами культуры Кореи."
          image="\корейский храм.jpg"
          lang="корейский"
        />
      </div>
    </main>
  );
}
