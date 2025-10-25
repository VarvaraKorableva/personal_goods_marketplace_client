import React from 'react'
import { conditions } from '../../../const/Сonditions/Сonditions'

function ConditionSelect({
  language,
  translatedContext,
  condition,
  setCondition,
  isConditionSelected,
  setIsConditionSelected,
  conditionErrorMessage,
  setConditionErrorMessage
}) {

  const handleConditionChange = (e) => {
    if (e.target.value) {
      setCondition(e.target.value)
      setIsConditionSelected(true)
      setConditionErrorMessage('')
    } else {
      setCondition('')
      setIsConditionSelected(false)
      setConditionErrorMessage(translatedContext.errors.conditionErrorMessage.errorMessage)
    }
  }

  return (
    <>
      <select 
        className='addAdPage__select margin' 
        onChange={handleConditionChange}
        value={condition}
      >
        <option value="">{translatedContext.condition}</option>

        {language === 'rus'
          ? conditions.rus.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))
          : conditions.en.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))
        }
      </select>

      {isConditionSelected ? (
        <span className='popup__mistake-msg margin'></span>
      ) : (
        <span className='popup__mistake-msg margin'>{conditionErrorMessage}</span>
      )}
    </>
  )
}

export default ConditionSelect
