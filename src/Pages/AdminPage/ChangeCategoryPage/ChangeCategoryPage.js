///categoriesAdmin

import React from 'react'
import './ChangeCategoryPage.css'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../../UK-kit/Button/Button'
//import createCategory from '../../../Api/Api'
import * as Api from '../../../Api/Api'
import NotFoundPage from '../../NotFoundPage/NotFoundPage'

function ChangeCategoryPage() {
    const currentUser = React.useContext(CurrentUserContext)
    const [categories, setCategories] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [id, setId] = React.useState("");
    const [addCategoryAdminFormOpen, setAddCategoryAdminFormOpen] = React.useState(true)
    const [addSubCategoryAdminFormOpen, setAddSubCategoryAdminFormOpen] = React.useState(false)
    const [deleteCategoryAdminFormOpen, setDeleteCategoryAdminFormOpen] = React.useState(false)


    function openAddCategoryAdminForm() {
        setAddCategoryAdminFormOpen(true)
        setAddSubCategoryAdminFormOpen(false)
        setDeleteCategoryAdminFormOpen(false)
    }


    function openSubAddCategoryAdminForm() {
        setAddCategoryAdminFormOpen(false)
        setAddSubCategoryAdminFormOpen(true)
        setDeleteCategoryAdminFormOpen(false)
    }

    function openDeleteCategoryAdminForm() {
        setAddCategoryAdminFormOpen(false)
        setAddSubCategoryAdminFormOpen(false)
        setDeleteCategoryAdminFormOpen(true)
        setMessage("введи айди категори, которую хочешь удалить")
    }

    function createCategoryAdmin(data) {
        setMessage("")
        Api.createCategory(data)
          .then((res) => {
            setMessage("Категория создана")
          })
          .catch((err) => {
            setMessage("Ошибка при создании категории")
          });
      }
      
      const handleCreateCategory = () => {
        /*createCategoryAdmin({
            name: "Homemade Food",
            is_good: true,
            parent_id: null,
            image_url: "https://images.unsplash.com/photo-1500816159285-731ab12cbd82?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fEhvbWVtYWRlJTIwRm9vZHxlbnwwfHwwfHx8MA%3D%3D",
            slug: "homemade-food",
            name_rus: "Домашняя еда"
        }); */
        setMessage("Аккуратнее, чтобы создать новую категорию требуется заполнить данные")
      }; 

      const handleCreateSubCategory = () => {
        /*createCategoryAdmin({
            name: "Other",
            is_good: true,
            parent_id: 12,
            image_url: "https://images.unsplash.com/photo-1605642634357-80a58f89af26?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGVsZWN0cm9uaWNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=400",
            slug: "electronics-other",
            name_rus: "Другое"
        }); */
        setMessage("Аккуратнее, чтобы создать новую категорию требуется заполнить данные")
      };

      async function getAllCategory() {
        try {
          const res = await Api.getCategory();
          setCategories(res);
          res.length? message('') : message("категории отсутствуют")
        } catch (err) {
          console.log(err);
        }
      }

      function deleteCategoryAdmin(category_id) {
        Api.deleteCategory(category_id)
          .then((res) => {
            setMessage('deleted')
           
          })
          .catch((err) => {
            console.log(err)
            setMessage('что-то пошло не так')
          })
      }

      //

      async function handleUpdateCategorySlug() {
        setMessage("")
        try {
          const result = await Api.updateCategorySlug(
            45,
            "mens-boots"
          );
          // в случае успеха
          setMessage("Изменение прошло")
        } catch (err) {
          console.log(err);
          setMessage("что-то пошло не так");
        }
      }

      async function handleUpdateCategoryImg() {
        setMessage("")
        try {
          const result = await Api.updateCategoryImg(
            2,
            "https://images.unsplash.com/photo-1563662931846-29b0af7443ff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTcxfHxoZWVsc3xlbnwwfHwwfHx8MA%3D%3D"
          );
          // в случае успеха
          setMessage("Изменение прошло")
        } catch (err) {
          console.log(err);
          setMessage("что-то пошло не так");
        }
      }
      

      async function handleUpdateCategoryNameRus() {
        setMessage("")
        try {
          const result = await Api.updateCategoryNameRus(
            22, 
            "Товары для школы"
          );
          setMessage("Изменение прошло")
        } catch (err) {
          console.error(err);
          setMessage("что-то пошло не так")
        }
      }

      async function handleUpdateCategoryNameEng() {
        setMessage("")
        try {
          const result = await Api.updateCategoryNameEng(
            36, 
            "Jackets and Coats"
          );
          setMessage("Изменение прошло")
        } catch (err) {
          console.error(err);
          setMessage("что-то пошло не так")
        }
      }

      function onUpdateCategorySlug() {
       //handleUpdateCategorySlug()
      }

      function onUpdateCategoryNameRus() {
        //handleUpdateCategoryNameRus()
      }

      function onUpdateCategoryNameEng() {
        //handleUpdateCategoryNameEng()
      }

      function onUpdateCategoryImg() {
        //handleUpdateCategoryImg()
      }

      const handleChange = (e) => {
        setId(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const numericId = Number(id);
        deleteCategoryAdmin(numericId)
      };

      if (currentUser.email !== process.env.REACT_APP_ADMIN) {
        return <NotFoundPage></NotFoundPage>
      }

    return(
        <>
            <h1>Add Category Page</h1>
            <div className='btn__container'>
                <Button onClick={handleCreateCategory}>Добавить категорию</Button> {/*onClick={openAddCategoryAdminForm}*/}
                <Button onClick={handleCreateSubCategory}>Добавить суб категорию</Button> {/*onClick={openSubAddCategoryAdminForm}*/}
                <Button onClick={openDeleteCategoryAdminForm}>Удалить Категорию</Button> {/*onClick={openDeleteCategoryAdminForm}*/}
                <Button onClick={getAllCategory}>Посмотреть все категории</Button>
                <Button onClick={onUpdateCategoryImg}>Изменить картинку категории</Button>
                <Button onClick={onUpdateCategoryNameRus}>Изменить название категории rus</Button>
                <Button onClick={onUpdateCategoryNameEng}>Изменить название категории eng</Button>
                <Button onClick={onUpdateCategorySlug}>Изменить Slug</Button>
            </div>
            
            {
                deleteCategoryAdminFormOpen ? (
                    <form onSubmit={handleSubmit}>
                        <label>
                            ID:
                            <input
                                type="number"
                                value={id}
                                onChange={handleChange}
                                placeholder="Введите ID"
                            />
                        </label>
                        <Button type='submit'>Подтвердить удаление категорию</Button>
                    </form>
                ) : (
                    <ul className="categoryCardContainerAdmin">
                        {categories?.length > 0 ? (
                            categories.map((i) => (
                                <li key={i.category_id} className="categoryCardAdmin">
                                    <p>category_id = {i.category_id}</p>
                                    <p>{i.name_rus}</p>
                                    <p>parent_id = {i.parent_id}</p>
                                </li>
                            ))
                    ) : (
                        <p>{message}</p>
                    )}
                    </ul>
                )
            }

            
{/*            <form>
                <input></input>
                <button type='submit'>Удалить Категорию `${i.name_rus}`</button>
            </form>

            <form>
                <input>name</input>
                <input>is_good</input>
                <input>parent_id</input>
                <input>image_url</input>
                <input>slug</input>
                <input>name_rus</input>
</form>*/}
        </>

    )
}

export default ChangeCategoryPage;