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
  setConditionErrorMessage,
  setCondition_ru,
  setCondition_en,
  setCondition_he,
}) {
  //const [isError, setIsError] = React.useState(false)

  const handleConditionChange = (e) => {
    const value = e.target.value;
  
    if (value) {
      const selectedCondition = conditions.find(
        (item) => item[language] === value
      );
      //setCondition(value);
      setCondition(selectedCondition.en);
      setCondition_ru(selectedCondition.rus);
      setCondition_en(selectedCondition.en);
      setCondition_he(selectedCondition.hebrew);
  
      setIsConditionSelected(true);
      setConditionErrorMessage('');
    } else {
      setCondition('');
      setIsConditionSelected(false);
      setConditionErrorMessage(translatedContext.errors.conditionErrorMessage.errorMessage);
    }
  };

  return (
    <div className='input-container'>
      <label className="inputname">{label} <span className="inputname-span">*</span> </label>
      <select 
        className='addAdPage__select margin font' 
        onChange={handleConditionChange}
        value={condition}
      >
        
        <option value="">{label} </option>
        {conditions.map((item, index) => (
          <option key={index} value={item[language]}>
            {item[language]}
          </option>
        ))}
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
