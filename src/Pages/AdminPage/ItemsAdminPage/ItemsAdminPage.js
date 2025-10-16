import React from 'react'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import Button from '../../../UK-kit/Button/Button'
import NotFoundPage from '../../NotFoundPage/NotFoundPage'
import * as Api from '../../../Api/ApiAdmin'
import './ItemsAdminPage.css'

function ItemsAdminPage() {
    const currentUser = React.useContext(CurrentUserContext)
    const [totalCount, setTotalCount] = React.useState(0)

    if (currentUser.email !== process.env.REACT_APP_ADMIN) {
      return <NotFoundPage></NotFoundPage>
    }
  
    function getItems(reason) {
        Api.getItemsByReasonAdmin({ reason })
          .then((res) => {
            setTotalCount(res);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    
    const reasons = [
        'Продал на «ГУДС»',
        'Продал где-то еще',
        'Передумал продавать',
        'Другая причина'
      ];
    return (
      <>
        <h2>ItemsAdminPage</h2>
        <div className='container__flex'>
            {reasons.map((btn, index) => (
                <Button key={index} onClick={() => getItems(btn)}>{btn}</Button>
            ))}
        </div>
        <p className='ItemsAdminPage__number'>{totalCount}</p>
      </>
    )
  }
  
  export default ItemsAdminPage