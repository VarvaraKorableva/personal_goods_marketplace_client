import './MainSearchEngine.css'

function MainSearchEngine() {
    return(
        <form className="MainSearchEngine-form">
            <input 
                className="MainSearchEngine-input"
                placeholder="Search by advertisements"
            />
            <button className="MainSearchEngine-btn">Search</button>
        </form>
    )
}

export default MainSearchEngine;