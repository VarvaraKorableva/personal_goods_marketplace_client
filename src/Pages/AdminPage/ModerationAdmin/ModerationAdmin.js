import React from 'react'
import Button from '../../../UK-kit/Button/Button'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import NotFoundPage from '../../NotFoundPage/NotFoundPage'
import * as Api from '../../../Api/ApiAdmin'
import './ModerationAdmin.css'
import Container from '../../../UK-kit/Container/Container'
import '../AdminPage.css'

function ModerationAdminPage() {
    const currentUser = React.useContext(CurrentUserContext)
    const [allUnModeratedItems, setAllUnModeratedItems] = React.useState([])

    if (currentUser.email !== process.env.REACT_APP_ADMIN) {
        return <NotFoundPage></NotFoundPage>
    }

    async function getAllItemsAdmin(page = 1, limit = 20) {
        page = 1
        limit = 50
        try {
          const res = await Api.getAllItemsAdmin({ page, limit });
          setAllUnModeratedItems(res.result)
        } catch (err) {
          console.log(err);
        }
    }

    async function updateModeratedAdmin(item_id, moderated) {
      try {
        const res = await Api.updateModeratedAdmin(item_id, moderated);
    
        if (res && res.item) {
          setAllUnModeratedItems((prev) =>
            prev.filter((item) => item.item_id !== item_id)
          );
        }
      } catch (err) {
        console.error("Ошибка при обновлении:", err);
      }
    }

    return(
            <section className='ModerationAdminPage__container'>
            <h1 className='page-title'>Модерация page</h1>
            <Button onClick={getAllItemsAdmin}>Посмотреть что есть на модерации</Button>

            <ul className='ModerationAdminPage__wrapper'>
                {allUnModeratedItems?.map((i) => (
                    <li key={i.item_id} className='ModerationAdminPage__card'>

                        <Button className='ModerationAdminPage__consent-btn' onClick={() => updateModeratedAdmin(i.item_id, true)}>Одобрить</Button>

                        <p className='ModerationAdminPage__string'>title:{i.title}</p>
                        <p className='ModerationAdminPage__string'>category_id: {i.category_id}</p>
                        
                        <p className='ModerationAdminPage__string'>description: {i.description}</p>
                        <p className='ModerationAdminPage__string'>images:</p>

                        {i.images? 
                        <div className="ModerationAdminPage__img-container">
                          {i.images.map((img, index) => (
                            <img className="ModerationAdminPage-pic" alt = {i.title} src={img} key={index}></img>
                          ))}
                        </div>
                        
                        : 
                        <></>
                        }
                        <>
                        <form className='ModerationAdminPage__form'>
                          
                          <Button className='ModerationAdminPage__no-consent-btn'>Удалить</Button>
                          
                          <input
                            className="popup__input"
                            type="text"
                          >
                          </input>

                          <Button className='ModerationAdminPage__no-consent-btn'>Отправить сообщение</Button>
                        </form>
                        </>
                        
                    </li>
                ))}
            </ul>
            </section>

    )
}

export default ModerationAdminPage;