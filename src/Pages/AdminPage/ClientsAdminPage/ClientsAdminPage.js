///categoriesAdmin

import React from 'react'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

import { Link, useLocation } from 'react-router-dom'
import Button from '../../../UK-kit/Button/Button'
import NotFoundPage from '../../NotFoundPage/NotFoundPage'
//import createCategory from '../../../Api/Api'
import * as Api from '../../../Api/Api'

function ClientsAdminPage() {
    const currentUser = React.useContext(CurrentUserContext)
  
    const [allUsers, setAllUsers] = React.useState([])
    const [count, setCounts] = React.useState(0)
  
    async function getAllUsers() {
      try {
        const res = await Api.getUsers()
        // если Api.getUsers возвращает массив:
        setAllUsers(res)
        setCounts(res.length)
      } catch (err) {
        console.log(err)
      }
    }
  
    if (currentUser.email !== process.env.REACT_APP_ADMIN) {
      return <NotFoundPage></NotFoundPage>
    }
  
    return (
      <>
        <h2>ClientsAdminPage</h2>
        <Button onClick={getAllUsers}>Посмотреть всех пользователей</Button>
        <p>{`Count of users: ${count}`}</p>
        <ul>
          {allUsers.map((i) => (
            <li key={i.user_id}>
              <p>{`user_id: ${i.user_id}`}</p>
              <p>{`Name: ${i.username}`}</p>
              <p>{`email: ${i.email}`}</p>
              <p>{`created_at: ${i.created_at}`}</p>
              <p>{`ad_count: ${i.ad_count}`}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }
  
  export default ClientsAdminPage