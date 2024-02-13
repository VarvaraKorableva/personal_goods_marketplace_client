import React from 'react'
import './ThirdCategorySearchEngine.css'

function ThirdCategorySearchEngine({lastFourtyItems, categories, startToSearch}) {
    const [keyWord, setKeyWord] = React.useState('')

    function handleTakeKeyWord(e) {
        setKeyWord(e.target.value)
    }

    function handleSubmitToSearch(e) {
        e.preventDefault()
        startToSearch(keyWord)
    }

    return(
        <form className="thirdCategorySearchEngine-form" onSubmit={handleSubmitToSearch}>
            <input 
                className="thirdCategorySearchEngine-input"
                placeholder="Search by advertisements"
                value={keyWord}
                onChange={handleTakeKeyWord}
            />
            <button className="thirdCategorySearchEngine-btn" type='submit'>Search</button>
        </form>
    )
}

export default ThirdCategorySearchEngine;