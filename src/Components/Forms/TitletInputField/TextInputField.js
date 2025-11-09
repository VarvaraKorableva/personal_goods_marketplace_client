import React from 'react'
import '../../Forms/Forms.css'

export default function TitletInputField({
    label,
    value,
    name,
    isValid,
    errorMessage,
    required = false,
    setIsTitleSelected,
    setTitleErrorMessage,
    setTitle,
    translatedContext
  }) {
    //const [isError, setIsError] = React.useState(false)

    const handleTitleChange = (e) => {
      if(e.target.value.length > 40) {
        setIsTitleSelected(false)
        setTitleErrorMessage(`${translatedContext.errors.titleErrorMessage.errorMessageToLong}`)
        setTitle(e.target.value)
      } else if (e.target.value.length < 3) {
        setTitleErrorMessage(`${translatedContext.errors.titleErrorMessage.errorMessageToSmall}`)
        setIsTitleSelected(false)
        setTitle(e.target.value)
      } else if(!e.target.value) {
        setIsTitleSelected(false)
        setTitleErrorMessage(`${translatedContext.errors.titleErrorMessage.errorMessage}`)
        setTitle(e.target.value)
      } else {
        setIsTitleSelected(true)
        setTitleErrorMessage('')
        setTitle(e.target.value[0].toUpperCase() + e.target.value.slice(1))
      }
    }

    return (
      <div className="input-container">
        <label className="inputname">
          {label}
          {required && <span className="inputname-span">*</span>}
          <input
            className="input font"
            name={name}
            type="text"
            value={value}
            onChange={handleTitleChange}
          />
        </label>

        <span className="popup__mistake-msg">
          {isValid ? '' : errorMessage}
        </span>
      </div>
    )
}
