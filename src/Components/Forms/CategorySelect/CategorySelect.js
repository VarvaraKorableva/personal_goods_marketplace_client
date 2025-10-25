import React, { useState, useEffect } from 'react'

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
          <label className="popup__inputname">{label}</label>
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
