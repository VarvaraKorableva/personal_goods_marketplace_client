
import { useNavigate } from 'react-router-dom'

function BackBtn() {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1);
      };

    return (
        <button className='back-btn' onClick={goBack}>← Назад</button>
    )
}

export default BackBtn