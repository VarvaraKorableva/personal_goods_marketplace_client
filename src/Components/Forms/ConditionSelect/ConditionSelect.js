import React from 'react'
import '../../Forms/Forms.css'

function ConditionSelect({
  label,
  conditions,
  language,
  translatedContext,
  condition,
  setCondition,
  isConditionSelected,
  setIsConditionSelected,
  conditionErrorMessage,
  setConditionErrorMessage
}) {
  //const [isError, setIsError] = React.useState(false)

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
    <div className='input-container'>
      <label className="inputname">{label} <span className="inputname-span">*</span> </label>
      <select 
        className='addAdPage__select margin' 
        onChange={handleConditionChange}
        value={condition}
      >
        
        <option value="">{label} </option>

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
    </div>
  )
}

export default ConditionSelect
