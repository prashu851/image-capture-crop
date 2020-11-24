
import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import ReactCrop from "react-image-crop";
import Modal from 'react-modal';
import getCroppedImg from './CropImage'
import './Crop.css'
const customStyles = {
  overlay: {
    backgroundColor: 'papayawhip',
    height: '35rem',
    width: '45rem',
    margin: '0 auto'
  },
};
const Crop = ({image, onSubmit}) => {
    const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [completedCrop, setCompletedCrop] = useState(null);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    const onCrop = useCallback(async () => {
      
      try {
        const croppedImage = await getCroppedImg(
          image,
          croppedAreaPixels
        )
        console.log('donee', { croppedImage })
        onSubmit(croppedImage);
      } catch (e) {
        console.error(e)
      }
    }, [croppedAreaPixels])
  

    return(
     <>
            <div className="crop-content">
            <Cropper
                className="screenshots"
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={4/3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                />
            </div>
            <button onClick={onCrop} className="submit-btn">submit</button>
</>
    )
}

export default Crop;