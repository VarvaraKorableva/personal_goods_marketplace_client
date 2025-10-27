import React from 'react'
import '../../Forms/Forms.css'

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

  const [isError, setIsError] = React.useState(false)

  const handleChange = (e) => {
    const val = e.target.value

    if (!val) {
      setIsValid(false)
      setIsError(true)
      setErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessage}`)
      setValue('')
    } else if (!/^\d*$/.test(val)) {
      setIsError(true)
      setErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessageOnlyNumbers}`)
    } else if (val.length > 10) {
      setIsError(true)
      setIsValid(false)
      setErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessageToLong}`)
    } else {
      setIsError(false)
      setIsValid(true)
      setErrorMessage('')
      setValue(val)
    }
  }

  return (
    <div className="input-container">
      <label className="inputname">
        {label}
        {required && <span className="inputname-span">*</span>}
        <input
          className="input"
          //className={`input ${isError ? 'input_error' : ''}`}
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
