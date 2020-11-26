import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Crop from './Crop'
import './Crop.css'

const ImageCropModal = ({image, onCrop}) => {  
    const onSubmit = (croppedImage) => {
      onCrop(croppedImage);
    }

    return(
      <div className="modal-div">
        <Crop onSubmit={onSubmit} image={image} />
      </div>
    )
}

export default ImageCropModal;