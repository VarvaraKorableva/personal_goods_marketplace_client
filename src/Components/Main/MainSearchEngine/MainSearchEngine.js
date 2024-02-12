import React from 'react'
import './MainSearchEngine.css'

function MainSearchEngine({lastFourtyItems, categories, startToSearch}) {
    const [keyWord, setKeyWord] = React.useState('')

    function handleTakeKeyWord(e) {
        setKeyWord(e.target.value)
    }

    function handleSubmitToSearch(e) {
        e.preventDefault()
        startToSearch(keyWord)
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

export default MainSearchEngine;