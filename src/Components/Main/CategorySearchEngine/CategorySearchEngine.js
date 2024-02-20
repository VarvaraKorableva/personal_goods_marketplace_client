import React from 'react'
import './CategorySearchEngine.css'

function CategorySearchEngine({ startToSearchSecondPage }) {
    const [keyWord, setKeyWord] = React.useState('')

    function handleTakeKeyWord(e) {
        setKeyWord(e.target.value)
    }

    function handleSubmitToSearch(e) {
        e.preventDefault()
        startToSearchSecondPage(keyWord)
    }

    return(
        <form className="MainSearchEngine-form" onSubmit={handleSubmitToSearch}>
            <input 
                className="MainSearchEngine-input"
                placeholder="Search by advertisements"
                value={keyWord}
                onChange={handleTakeKeyWord}
            />
            <button className="MainSearchEngine-btn" type='submit'>Search</button>
        </form>
    )
}

export default CategorySearchEngine;