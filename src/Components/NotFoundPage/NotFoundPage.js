import { Link } from 'react-router-dom';
import './NotFoundPage.css'

function NotFoundPage() {
    return (
        <div className='notFoundPage-container'>
            <h1>404 Not Found Page</h1>
            <Link to="/" className='notFoundPage-link'>
                <p>To the home page &rarr;</p>
            </Link>
        </div>
    )
}

export default NotFoundPage;