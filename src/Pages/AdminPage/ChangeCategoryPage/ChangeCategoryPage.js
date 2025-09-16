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
        
        Api.createCategory(data)
          .then((res) => {
            console.log("Категория создана!", res);
            
          })
          .catch((err) => {
            console.error("Ошибка при создании категории:", err);
            
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
        /*createCategoryAdmin(
            {

            }
        );*/
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

      async function handleUpdateCategoryImg() {
        try {
          const result = await Api.updateCategoryImg(61, "https://images.unsplash.com/photo-1619970984080-2666543ed883?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fCVEMCVBOCVEMCVCQSVEMCVCRSVEMCVCQiVEMSU4QyVEMCVCRCVEMSU4QiVEMCVCNSUyMCVEMCVCRiVEMSU4MCVEMCVCOCVEMCVCRCVEMCVCMCVEMCVCNCVEMCVCQiVEMCVCNSVEMCVCNiVEMCVCRCVEMCVCRSVEMSU4MSVEMSU4MiVEMCVCOHxlbnwwfHwwfHx8MA%3D%3D");
          console.log(result.msg); // "Successfully updated"
        } catch (err) {
          console.error(err);
        }
      }

      async function handleUpdateCategoryNameRus() {
        try {
          const result = await Api.updateCategoryNameRus(61, "Товары для школы");
          console.log(result.msg); // "Successfully updated"
        } catch (err) {
          console.error(err);
        }
      }

      //

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
            <>
                <Button onClick={handleCreateCategory}>Добавить категорию</Button> {/*onClick={openAddCategoryAdminForm}*/}
                <Button onClick={handleCreateSubCategory}>Добавить суб категорию</Button> {/*onClick={openSubAddCategoryAdminForm}*/}
                <Button onClick={openDeleteCategoryAdminForm}>Удалить Категорию</Button> {/*onClick={openDeleteCategoryAdminForm}*/}
                <Button onClick={getAllCategory}>Посмотреть все категории</Button>
                <Button onClick={handleUpdateCategoryImg}>Изменить картинку категории</Button>
                <Button onClick={handleUpdateCategoryNameRus}>Изменить название категории</Button>
            </>
            
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