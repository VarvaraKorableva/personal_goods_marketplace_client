//DiscriptionField
import React from 'react'
import './DiscriptionField.css'

export default function DiscriptionField({
  label,
  name,
  value,
  isValid,
  errorMessage,
  maxLength = 900,
  required = false,
  setIsValid,
  setErrorMessage,
  setValue,
  translatedContext
}) {

  const handleChange = (e) => {
    const inputValue = e.target.value

    if (inputValue.length > maxLength) {
      setIsValid(false)
      setErrorMessage(`${translatedContext.errors.descriptionErrorMessage.tooLong || `Длина описания не может превышать ${maxLength} символов`}`)
    } else if (inputValue) {
      setIsValid(true)
      setErrorMessage('')
      setValue(inputValue)
    } else {
      setIsValid(true)
      setErrorMessage('')
      setValue('')
    }
  }

  return (
    <div className="text-area-field">
      <label className="popup__inputname">
        {label}
        {required && <span className="popup__inputname-span">*</span>}
        <textarea
          className="popup__input-description"
          name={name}
          value={value}
          onChange={handleChange}
          rows={5}
        />
      </label>

      <span className="popup__mistake-msg">
        {isValid ? '' : errorMessage}
      </span>
    </div>
  )
}
