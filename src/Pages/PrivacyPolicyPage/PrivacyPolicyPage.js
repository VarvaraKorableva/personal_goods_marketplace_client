import React from "react";
import '../RulesPublicationsPage/RulesPublicationsPage.css'

export default function PrivacyPolicyPage() {
  return (
    <section className="rulesPublicationsPage__section">
      <h2 className="rulesPublicationsPage__title">Политика обработки персональных данных</h2>
      <ul className="rulesPublicationsPage__rules-wrapper">
        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">1. Общие положения</h3>
          <p className="rulesPublicationsPage__text">
            Настоящая Политика определяет порядок обработки и защиты персональных
            данных пользователей, предоставляемых при использовании нашего сайта.
          </p>
        </li>

        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">2. Состав собираемых данных</h3>
          <p className="rulesPublicationsPage__text">
            Мы можем собирать следующие данные: имя, адрес электронной почты,
            номер телефона, данные учетной записи, а также информацию,
            переданную при заполнении форм на сайте.
          </p>
        </li>

        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">3. Цели обработки данных</h3>
          <p className="rulesPublicationsPage__text">
            Персональные данные используются для регистрации пользователей,
            предоставления доступа к функционалу сервиса, обратной связи,
            повышения безопасности и улучшения качества предоставляемых услуг.
          </p>
        </li>

        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">4. Передача данных третьим лицам</h3>
          <p className="rulesPublicationsPage__text">
            Мы не передаем персональные данные третьим лицам, за исключением
            случаев, предусмотренных законодательством или необходимых для
            предоставления услуг (например, хостинг‑провайдеров).
          </p>
        </li>

        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">5. Хранение и защита данных</h3>
          <p className="rulesPublicationsPage__text">
            Данные хранятся на защищенных серверах и обрабатываются с соблюдением
            всех необходимых мер безопасности в соответствии с законодательством
            Израиля.
          </p>
        </li>

        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">6. Права пользователя</h3>
          <p className="rulesPublicationsPage__text">
            Пользователь имеет право на получение информации о своих данных,
            изменение или удаление данных, а также отзыв согласия на их
            обработку. Пользователь также вправе подать запрос на прекращение
            использования своих данных.
          </p>
        </li>

        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">7. Cookies и технологии отслеживания</h3>
          <p className="rulesPublicationsPage__text">
            На сайте могут использоваться Cookies, локальное хранилище (localStorage),
            а также инструменты аналитики для улучшения работы сервиса. Пользователь
            может ограничить использование Cookies в настройках браузера.
          </p>
        </li>

        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">8. Передача данных за границу</h3>
          <p className="rulesPublicationsPage__text">
            Обработка данных может осуществляться на серверах, расположенных за пределами Израиля,
            включая ЕС (например, сервер Render, расположенный во Франкфурте). Пользователь соглашается
            с такой передачей данных, если она необходима для работы сервиса.
          </p>
        </li>

        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">9. Обновления и изменения политики</h3>
          <p className="rulesPublicationsPage__text">
            Мы можем обновлять настоящую Политику при необходимости. Обновленная версия вступает
            в силу с момента публикации на сайте. Рекомендуем пользователям регулярно
            проверять данный раздел.
          </p>
        </li>

        <li className="rulesPublicationsPage__rule-container">
          <h3 className="rulesPublicationsPage__rule-subtitle">10. Контакты</h3>
          <p className="rulesPublicationsPage__text">
            По вопросам, связанным с обработкой персональных данных, вы можете
            связаться с нами по адресу: info@example.com
          </p>
        </li>
      </ul>
    </section>
  );
}
