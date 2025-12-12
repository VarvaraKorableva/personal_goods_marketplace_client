import React from "react";
import '../RulesPublicationsPage/RulesPublicationsPage.css'
import { Link } from 'react-router-dom';

export default function AboutGoodsPage() {
  return (
    <section className="rulesPublicationsPage__section">
      <div className="about__container">
      <div className="about__logo"></div>
        <p className="rulesPublicationsPage__maintext font_Mulish">
          ГУДС Израиль- это персональный маркетплейс, созданный для удобного, безопасного и простого размещения объявлений о продаже товаров.
          Проект был создан для того, чтобы сделать процесс покупки и продажи максимально комфортным как для частных лиц, так и для небольших продавцов в Израиле.
        </p>

        
      </div>
      {/* Цель */}
      <div className="rulesPublicationsPage__sectionTitle__container">
        <h2 className="rulesPublicationsPage__sectionTitle">Наша цель</h2>
      </div>
      <p className="rulesPublicationsPage__text">
        Мы стремимся создать пространство, где каждый пользователь может легко:
      </p>
      <ul className="goal__container">
        <li className="goal__card"><div className="goal__card__vpic"></div><p>Разместить объявление о продаже товара</p></li>
        <li className="goal__card"><div className="goal__card__vpic"></div><p>Найти нужную вещь по честной цене</p></li>
        <li className="goal__card"><div className="goal__card__vpic"></div><p>Быстро связаться с продавцом или покупателем</p></li>
        <li className="goal__card"><div className="goal__card__vpic"></div><p>Пользоваться платформой без лишних действий и сложностей</p></li>
      </ul>

      {/* Почему Goods */}
      <div className="rulesPublicationsPage__sectionTitle__container">
        <h2 className="rulesPublicationsPage__sectionTitle">Почему ГУДС?</h2>
      </div>
    <ul className="cards__container">
      <li className="cards__oneCard">
        <h3 className="cards__subtitle">Удобство</h3>
        <p className="rulesPublicationsPage__text font_Mulish">
          Интуитивно понятный интерфейс, простая форма добавления объявлений и продуманная структура каталога.
        </p>
      </li>

      <li className="cards__oneCard">
        <h3 className="cards__subtitle">Персональный подход</h3>
        <p className="rulesPublicationsPage__text font_Mulish">
          ГУУДС Израиль - это удобная платформа для вас. Мы делаем маркетплейс, в котором каждому пользователю удобно управлять своими объявлениями, профилем и общением.
        </p>
      </li>

      <li className="cards__oneCard">
        <h3 className="cards__subtitle">Безопасность и прозрачность</h3>
        <p className="rulesPublicationsPage__text font_Mulish">
          Мы внимательно относимся к защите данных. Все персональные данные обрабатываются в соответствии с законодательством Израиля, 
          а серверы находятся в регионе Франкфурт, что обеспечивает стабильность и высокий уровень безопасности.
        </p>
      </li>

      <li className="cards__oneCard">
        <h3 className="cards__subtitle">Быстрая модерация</h3>
        <p className="rulesPublicationsPage__text font_Mulish">
          Мы стремимся к тому, чтобы на платформе размещались только честные предложения. Объявления проходят быструю проверку и модерацию.
        </p>
      </li>

    </ul>
      {/* Для кого */}
      
        <h2 className="rulesPublicationsPage__sectionTitle">Для кого создан проект?</h2>
      
      <p className="aboutGoodsPage__title font_Mulish">
        Goods подходит всем, кто хочет:
      </p>
      <ul className="rulesPublicationsPage__text goal__card__gaps">
        <li className="goal__card__smallpic__container">
          <div className="goal__card__smallpic10"></div>
            Продать личные вещи;
          
          </li>
        <li className="goal__card__smallpic__container">
          <div className="goal__card__smallpic12"></div>
            Купить что-то выгодно;

        </li>
        <li className="goal__card__smallpic__container">
          <div className="goal__card__smallpic13"></div>
            Разместить товары своего небольшого бизнеса;
        </li>
        <li className="goal__card__smallpic__container">
          <div className="goal__card__smallpic14"></div>
            Вести продажи без сложных настроек и технических знаний.
        </li>
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
      
      <p className="rulesPublicationsPage__text font_Mulish">
        Если у вас есть вопросы или предложения - мы всегда открыты для обратной связи.  
        Мы стремимся развивать платформу и делать её лучше для вас. 
      </p>

      <Link to={`/`} className="rulesPublicationsPage__sectionTitle margin_top_50px">Посмотреть объявления</Link>

    </section>
  );
}
