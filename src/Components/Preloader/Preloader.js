import '../Popups/Popups.css'
import './Preloader.css';

const Preloader = ({isLoading}) => {

    return (
        <div className={`popup ${isLoading && 'popup__opened'}`}>
            
                <div className="container">
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <p className="preloader__text">Loading...</p>
                </div>
            
        </div>
    );
};

export default Preloader;

/*
return(
        <div className={`popup ${isOpen && 'popup__opened'}`}>
        <div className="popup__container">
            <div class="container">
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
            <p>Loading...</p>
        </div>
        </div>
        </div>
    )
        <div class="container">
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
            <p>Loading...</p>
        </div>
*/
