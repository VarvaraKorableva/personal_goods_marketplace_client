import './RulesPublicationsPage.css'

function RulesPublicationsPage() {
    return(
        <section className="rulesPublicationsPage__section">
            <h2 className="rulesPublicationsPage__title">Правила размещения объявлений</h2>
            <p className="rulesPublicationsPage__subtitle">Продолжая пользоваться приложением, вы соглашаетесь с правилами установленными администрацией сайта</p>

            <ul className="rulesPublicationsPage__rules-wrapper">
                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">Запрещается размещение запрещенных законом товаров и услуг</h3>
                    <p className="rulesPublicationsPage__text">Запрещается размещение запрещенных законом товаров и услуг, таких как наркотические вещества, оружие, порнография, услуги интимного характера и тд.</p>
                    <p className="rulesPublicationsPage__text">В случае нарушения данного пункта, объявление будет удалено модератором без дополнительного уведомления.</p>
                </li>

                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">Количество объявлений</h3>
                    <p className="rulesPublicationsPage__text">В экспериментальном варианте сайта разрешено добавление не более 20 объявлений на одного пользователя.</p>
                </li>

                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">Срок размещения объявлений</h3>
                    <p className="rulesPublicationsPage__text">В экспериментальном варианте сайта объявления будет перенесены в "Неактивные объявления", через 30 дней после их опубликования.</p>
                    <p className="rulesPublicationsPage__text">Для изменения их статуса на "Активное объявление" и их повторного опубликования, необходимо изменить статус самостоятельно, в разделе "Неактивные объявления" на странице "Моя страница".</p>
                </li>
            </ul>
        </section>
    )
}

export default RulesPublicationsPage