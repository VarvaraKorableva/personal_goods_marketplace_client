import React from 'react'

export default function PriceInputField({
  label,
  name = 'price',
  value,
  isValid,
  errorMessage,
  required = true,
  setIsValid,
  setErrorMessage,
  setValue,
  translatedContext
}) {
  const handleChange = (e) => {
    const val = e.target.value

    if (!val) {
      setIsValid(false)
      setErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessage}`)
      setValue('')
    } else if (!/^\d*$/.test(val)) {
      //setIsValid(false)
      setErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessageOnlyNumbers}`)
    } else if (val.length > 10) {
      setIsValid(false)
      setErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessageToLongs}`)
    } else {
      setIsValid(true)
      setErrorMessage('')
      setValue(val)
    }
  }

  return (
    <div className="price-input-field">
      <label className="popup__inputname">
        {label}
        {required && <span className="popup__inputname-span">*</span>}
        <input
          className="popup__input"
          name={name}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </label>

      <span className="popup__mistake-msg">
        {isValid ? '' : errorMessage}
      </span>
    </div>
  )
}
