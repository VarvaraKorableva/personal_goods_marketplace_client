/*import React, { useState, useEffect } from 'react'

function CategorySelect({
  categories,
  language,
  translatedContext,
  onCategorySelect, // callback возвращает конечный ID
  isGood = true
}) {
  const [levels, setLevels] = useState([{ parentId: null, selectedId: '' }])

  const handleChange = (e, levelIndex) => {
    const selectedId = e.target.value ? Number(e.target.value) : ''
  
    const newLevels = levels.slice(0, levelIndex + 1)
    newLevels[levelIndex] = { ...newLevels[levelIndex], selectedId }
  
    const children = getChildren(selectedId)
    if (children.length > 0) {
      newLevels.push({ parentId: selectedId, selectedId: '' })
    }
  
    setLevels(newLevels)
    onCategorySelect(selectedId, newLevels) // 👈 передаём и id, и весь массив уровней
  }
  

  // Получаем дочерние категории для текущего уровня
  const getChildren = (parentId) => {
    return categories.filter(cat => cat.parent_id === parentId && cat.is_good === isGood)
  }

  // Вычисляем отображаемые списки на основе уровней
  const renderSelects = () =>
    levels.map((level, index) => {
      const options = getChildren(level.parentId)
      if (options.length === 0) return null

      const label =
        index === 0
          ? translatedContext.choiseACategory
          : `${translatedContext.choiseASubCategory} ${index}`

      return (
        <div key={index} className="category-select__group">
          <label className="inputname">{label} <span className="inputname-span">*</span></label>
          <select
            className="addAdPage__select"
            value={level.selectedId}
            onChange={(e) => handleChange(e, index)}
          >
            <option value="">{label}</option>
            {options.map((item) => (
              <option key={item.category_id} value={item.category_id}>
                {language === 'rus' ? item.name_rus : item.name}
              </option>
            ))}
          </select>
        </div>
      )
    })

  return <>{renderSelects()}</>
}

export default CategorySelect
*/

import React, { useState, useEffect } from 'react'
import '../../Forms/Forms.css'

function CategorySelect({
  categories,
  language,
  translatedContext,
  onCategorySelect, // callback возвращает конечный ID
  isGood = true
}) {
  const [levels, setLevels] = useState([{ parentId: null, selectedId: '' }])
  const [isServiceCategory, setIsServiceCategory] = useState(false)
  //const [isError, setIsError] = React.useState(false)

  useEffect(() => {
    if (!isGood) {
      // Найдём категорию "Услуги" (root с is_good = false)
      const servicesRoot = categories.find(cat => cat.parent_id === null && cat.is_good === false)
      if (servicesRoot) {
        setIsServiceCategory(true)
        // Сразу открываем подкатегории "Услуг"
        setLevels([{ parentId: servicesRoot.category_id, selectedId: '' }])
        // Сразу считаем "услуги" выбранными
        onCategorySelect(servicesRoot.category_id, [{ parentId: null, selectedId: servicesRoot.category_id }])
      }
    } else {
      setIsServiceCategory(false)
      setLevels([{ parentId: null, selectedId: '' }])
    }
  }, [isGood, categories])

  const handleChange = (e, levelIndex) => {
    const selectedId = e.target.value ? Number(e.target.value) : ''
    const newLevels = levels.slice(0, levelIndex + 1)
    newLevels[levelIndex] = { ...newLevels[levelIndex], selectedId }

    const children = getChildren(selectedId)
    if (children.length > 0) {
      newLevels.push({ parentId: selectedId, selectedId: '' })
    }

    setLevels(newLevels)
    onCategorySelect(selectedId, newLevels)
  }

  const getChildren = (parentId) => {
    return categories.filter(cat => cat.parent_id === parentId && cat.is_good === isGood)
  }

  const renderSelects = () =>
    levels.map((level, index) => {
      const options = getChildren(level.parentId)
      if (options.length === 0) return null

      const label =
        index === 0
          ? (isServiceCategory ? translatedContext.choiseASubCategory : translatedContext.choiseACategory)
          : `${translatedContext.choiseASubCategory} ${index}`

      return (
        <div key={index} className="input-container">
          <label className="inputname">
            {label} <span className="inputname-span">*</span>
          </label>
          <select
            className="addAdPage__select"
            value={level.selectedId}
            onChange={(e) => handleChange(e, index)}
          >
            <option value="">{label}</option>
            {options.map((item) => (
              <option key={item.category_id} value={item.category_id}>
                {language === 'rus' ? item.name_rus : item.name}
              </option>
            ))}
          </select>
        </div>
      )
    })

  return (
    <>
      {isServiceCategory && (
        <></>
      )}
      {renderSelects()}
    </>
  )
}

export default CategorySelect
