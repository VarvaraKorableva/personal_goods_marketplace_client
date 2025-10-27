import React from 'react'
import imageCompression from 'browser-image-compression'
import '../../Forms/Forms.css'

function ImagesUpload({
  translatedContext,
  openLoading,
  closeLoading,
  errorImgMessage,
  setErrorImgMessage,
  firstFile, setFirstFile,
  secondFile, setSecondFile,
  thirdFile, setThirdFile,
  fourthFile, setFourthFile,
}) {

  const addFirstPicRef = React.useRef(null);
  const addSecondPicRef = React.useRef(null);
  const addThirdPicRef = React.useRef(null);
  const addFourthPicRef = React.useRef(null);

  const options = {
    maxSizeMB: 1.0,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    initialQuality: 0.9,
    fileType: "image/webp",
  };

  const handleImgFirstLinkChange = async (event) => {
    openLoading()
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedImage = await imageCompression(file, options);
        setFirstFile(compressedImage);
      } catch (error) {
        console.error('Ошибка при сжатии изображения:', error);
        setErrorImgMessage('Ошибка при загрузке изображения');
      } finally {
        closeLoading();
      }
    }
  };

  const handleImgSecondLinkChange = async (event) => {
    openLoading()
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedImage = await imageCompression(file, options);
        setSecondFile(compressedImage);
      } catch (error) {
        console.error('Ошибка при сжатии изображения:', error);
        setErrorImgMessage('Ошибка при загрузке изображения');
      } finally {
        closeLoading();
      }
    }
  };

  const handleImgThirdLinkChange = async (event) => {
    openLoading()
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedImage = await imageCompression(file, options);
        setThirdFile(compressedImage);
      } catch (error) {
        console.error('Ошибка при сжатии изображения:', error);
        setErrorImgMessage('Ошибка при загрузке изображения');
      } finally {
        closeLoading();
      }
    }
  };

  const handleImgFourthLinkChange = async (event) => {
    openLoading()
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedImage = await imageCompression(file, options);
        setFourthFile(compressedImage);
      } catch (error) {
        console.error('Ошибка при сжатии изображения:', error);
        setErrorImgMessage('Ошибка при загрузке изображения');
      } finally {
        closeLoading();
      }
    }
  };

  function deleteAddedFile(numberOfPic) {
    if(numberOfPic === 1) setFirstFile(null)
    if(numberOfPic === 2) setSecondFile(null)
    if(numberOfPic === 3) setThirdFile(null)
    if(numberOfPic === 4) setFourthFile(null)
  }

  return (
    <div className='input-container'>
      <label className='inputname'>{translatedContext.picture}</label>
      <span className='popup__inputmistake'>{errorImgMessage}</span>

      <div className='files-container'>
        {/* 1 */}
        {firstFile ? (
          <div className='popup__compressed-pic-wrapper'>
            <img src={URL.createObjectURL(firstFile)} alt="Compressed" className='popup__compressed-pic'/>
            <button className='popup__compressed-pic-delete-btn' onClick={() => deleteAddedFile(1)} type='button'></button>
          </div>
        ) : (
          <>
            <button onClick={() => addFirstPicRef.current.click()} className='popup__input-btn' type="button">
              {translatedContext.uploadPictureBtn}
            </button> 
            <input
              ref={addFirstPicRef}
              className='popup__input-pic'
              name='firstFile'
              type="file"
              onChange={handleImgFirstLinkChange}
              hidden
            />
          </>
        )}

        {/* 2 */}
        {secondFile ? (
          <div className='popup__compressed-pic-wrapper'>
            <img src={URL.createObjectURL(secondFile)} alt="Compressed" className='popup__compressed-pic'/>
            <button className='popup__compressed-pic-delete-btn' onClick={() => deleteAddedFile(2)} type='button'></button>
          </div>
        ) : (
          <>
            <button onClick={() => addSecondPicRef.current.click()} className='popup__input-btn' type="button">
              {translatedContext.uploadPictureBtn}
            </button> 
            <input
              ref={addSecondPicRef}
              className='popup__input-pic'
              name='secondFile'
              type="file"
              onChange={handleImgSecondLinkChange}
              hidden
            />
          </>
        )}

        {/* 3 */}
        {thirdFile ? (
          <div className='popup__compressed-pic-wrapper'>
            <img src={URL.createObjectURL(thirdFile)} alt="Compressed" className='popup__compressed-pic'/>
            <button className='popup__compressed-pic-delete-btn' onClick={() => deleteAddedFile(3)} type='button'></button>
          </div>
        ) : (
          <>
            <button onClick={() => addThirdPicRef.current.click()} className='popup__input-btn' type="button">
              {translatedContext.uploadPictureBtn}
            </button> 
            <input
              ref={addThirdPicRef}
              className='popup__input-pic'
              name='thirdFile'
              type="file"
              onChange={handleImgThirdLinkChange}
              hidden
            />
          </>
        )}

        {/* 4 */}
        {fourthFile ? (
          <div className='popup__compressed-pic-wrapper'>
            <img src={URL.createObjectURL(fourthFile)} alt="Compressed" className='popup__compressed-pic'/>
            <button className='popup__compressed-pic-delete-btn' onClick={() => deleteAddedFile(4)} type='button'></button>
          </div>
        ) : (
          <>
            <button onClick={() => addFourthPicRef.current.click()} className='popup__input-btn' type="button">
              {translatedContext.uploadPictureBtn}
            </button> 
            <input
              ref={addFourthPicRef}
              className='popup__input-pic'
              name='fourthFile'
              type="file"
              onChange={handleImgFourthLinkChange}
              hidden
            />
          </>
        )}
      </div>
    </div>
  )
}

export default ImagesUpload
