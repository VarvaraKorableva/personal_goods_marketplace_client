import './RulesPublicationsPage.css'

function RulesPublicationsPage() {
    return(
        <section className="rulesPublicationsPage__section">
            <h2 className="rulesPublicationsPage__title">Правила размещения объявлений</h2>
            <p className="rulesPublicationsPage__subtitle">
                Продолжая пользоваться сайтом, вы соглашаетесь с правилами, установленными администрацией.
            </p>

            <ul className="rulesPublicationsPage__rules-wrapper">

                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">
                        1.Запрещенные товары и услуги
                    </h3>
                    <p className="rulesPublicationsPage__text">
                        Запрещается размещать товары и услуги, нарушающие законодательство Израиля: 
                        оружие, наркотические вещества, порнографию, услуги интимного характера,
                        поддельные документы, рецептурные лекарства, пиратскую продукцию, 
                        опасные товары, объекты с нарушением прав третьих лиц.
                    </p>
                    <p className="rulesPublicationsPage__text">
                        Объявления, нарушающие данные правила, удаляются без предупреждения.
                    </p>
                </li>

                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">2.Модерация объявлений</h3>
                    <p className="rulesPublicationsPage__text">
                        Все объявления проходят обязательную модерацию. Администрация вправе 
                        удалить или отклонить объявление без объяснения причин, если оно 
                        нарушает правила или законодательство.
                    </p>
                </li>

                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">3.Количество объявлений</h3>
                    <p className="rulesPublicationsPage__text">
                        Разрешено бесплатно добавлять не более 20 объявлений на одного пользователя.
                    </p>
                </li>

                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">4.Как разместить объявление</h3>
                    <p className="rulesPublicationsPage__text">
                        Чтобы разместить объявление, необходимо зарегистрироваться и авторизоваться на сайте.
                    </p>
                    <p className="rulesPublicationsPage__text">
                        В мобильной версии откройте меню в правом верхнем углу и выберите 
                        «Добавить объявление».
                    </p>
                    <p className="rulesPublicationsPage__text">
                        Выберите категорию, заполните форму и нажмите «Добавить объявление».
                    </p>
                </li>

                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">5.Запрещенный контент</h3>
                    <p className="rulesPublicationsPage__text">
                        Запрещается размещать оскорбительные материалы, материалы 18+, 
                        вводящую в заблуждение информацию, мошеннические схемы, 
                        а также изображения и текст, нарушающие авторские права.
                    </p>
                </li>

                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">6.Ответственность пользователя</h3>
                    <p className="rulesPublicationsPage__text">
                        Пользователь несёт полную ответственность за достоверность информации 
                        в объявлении, а также за возможные нарушения закона, связанные 
                        с продаваемыми товарами или услугами.
                    </p>
                </li>
{/*}
                <li className="rulesPublicationsPage__rule-container">
                    <h3 className="rulesPublicationsPage__rule-subtitle">Запросы администрации</h3>
                    <p className="rulesPublicationsPage__text">
                        Администрация может запросить подтверждающие документы 
                        (например, чек, подтверждение владения товаром или сертификат). 
                        При отказе объявление может быть удалено.
                    </p>
                </li>  */}

            </ul>
        </section>
    )
}

export default RulesPublicationsPage
