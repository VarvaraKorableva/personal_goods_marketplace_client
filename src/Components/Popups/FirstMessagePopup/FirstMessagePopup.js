function FirstMessagePopup ({onClose, isOpen, createNewMessage}) {
    return(
        <div className={`popup ${isOpen && 'popup__opened'}`}>
        <div className="popup__container">
            <button 
              className="popup__close-button" 
              type="button" 
              onClick={onClose}>
            </button>
    
        <h2 className="popup__title-ChoiceOfProductOrServicePopup">Написать сообщение</h2>
        <form className='popup__container-ChoiceOfProductOrServicePopup'>
            <textarea>

            </textarea>

            <button>Отправить сообщение</button>

        </form>  
        </div>
        </div>
    )
}

export default FirstMessagePopup;