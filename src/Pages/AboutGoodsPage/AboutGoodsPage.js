import React from "react";
import '../RulesPublicationsPage/RulesPublicationsPage.css'
import { Link } from 'react-router-dom';

export default function AboutGoodsPage() {
  return (
    <section className="rulesPublicationsPage__section">

      <h1 className="rulesPublicationsPage__title">О проекте — Goods</h1>
      <p className="rulesPublicationsPage__text font">
        <strong style={{ color: 'rgb(16, 21, 133)', fontSize: '24px' }}>Goods</strong> — это персональный маркетплейс, созданный для удобного, безопасного и простого размещения объявлений о продаже товаров.
        Проект был создан для того, чтобы сделать процесс покупки и продажи максимально комфортным как для частных лиц, так и для небольших продавцов.
      </p>

      {/* Цель */}
      <h2 className="rulesPublicationsPage__sectionTitle">Наша цель</h2>
      <p className="rulesPublicationsPage__text">
        Мы стремимся создать пространство, где каждый пользователь может легко:
      </p>
      <ul className="goal__container">
        <li className="goal__card">Разместить объявление о продаже товара</li>
        <li className="goal__card">Найти нужную вещь по честной цене</li>
        <li className="goal__card">Быстро связаться с продавцом или покупателем</li>
        <li className="goal__card">Пользоваться платформой без лишних действий и сложностей</li>
      </ul>

      {/* Почему Goods */}
      <h2 className="rulesPublicationsPage__sectionTitle">Почему Goods?</h2>
    <ul className="cards__container">
      <li className="cards__oneCard">
        <h3 className="cards__subtitle">Удобство</h3>
        <p className="rulesPublicationsPage__text font">
          Интуитивно понятный интерфейс, простая форма добавления объявлений и продуманная структура каталога.
        </p>
      </li>

      <li className="cards__oneCard">
        <h3 className="cards__subtitle">Персональный подход</h3>
        <p className="rulesPublicationsPage__text font">
          Goods — это удобная платформа для вас. Мы делаем маркетплейс, в котором каждому пользователю удобно управлять своими объявлениями, профилем и общением.
        </p>
      </li>

      <li className="cards__oneCard">
        <h3 className="cards__subtitle">Безопасность и прозрачность</h3>
        <p className="rulesPublicationsPage__text font">
          Мы внимательно относимся к защите данных. Все персональные данные обрабатываются в соответствии с законодательством Израиля, 
          а серверы находятся в регионе Франкфурт, что обеспечивает стабильность и высокий уровень безопасности.
        </p>
      </li>

      <li className="cards__oneCard">
        <h3 className="cards__subtitle">Быстрая модерация</h3>
        <p className="rulesPublicationsPage__text font">
          Мы стремимся к тому, чтобы на платформе размещались только честные предложения. Объявления проходят быструю проверку и модерацию.
        </p>
      </li>

    </ul>
      {/* Для кого */}
      <h2 className="rulesPublicationsPage__sectionTitle">Для кого создан проект?</h2>
      <p className="rulesPublicationsPage__text font">
        Goods подходит всем, кто хочет:
      </p>
      <ul className="rulesPublicationsPage__text">
        <li >Продать личные вещи;</li>
        <li >Купить что-то выгодно;</li>
        <li >Разместить товары своего небольшого бизнеса;</li>
        <li >Вести продажи без сложных настроек и технических знаний.</li>
      </ul>

      {/* Планы 
      <h2 className="rulesPublicationsPage__sectionTitle">Наши планы</h2>
      <p className="rulesPublicationsPage__text">
        Мы активно развиваем платформу и работаем над новыми возможностями, среди которых:
      </p>
      <ul className="rulesPublicationsPage__text">
        <li>улучшенный личный кабинет;</li>
        <li>рейтинг продавцов;</li>
        <li>система безопасных сделок;</li>
        <li>расширенные фильтры и поиск;</li>
        <li>мобильное приложение.</li>
      </ul>
      <p className="rulesPublicationsPage__text">
        Наша цель — сделать Goods вашим удобным инструментом для продаж и покупок каждый день.
      </p>
*/}
      {/* Связь */}
      <h2 className="rulesPublicationsPage__sectionTitle">Связь с проектом</h2>
      <p className="rulesPublicationsPage__text font">
        Если у вас есть вопросы или предложения — мы всегда открыты для обратной связи.  
        Мы стремимся развивать платформу и делать её лучше для вас. 
      </p>

      <Link to={`/`} className="rulesPublicationsPage__sectionTitle">Посмотреть объявления</Link>

    </section>
  );
}
