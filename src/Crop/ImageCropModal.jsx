import { Height } from '@material-ui/icons';
import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import Modal from 'react-modal';
import TestCrop from '../TestCrop';
import Crop from './Crop'
import './Crop.css'
const customStyles = {
  overlay: {
    height: '35rem',
    width: '50rem',
    margin: '0 auto'
  },
};
const ImageCropModal = ({image, onCrop}) => {  
    const onSubmit = (croppedImage) => {
      onCrop(croppedImage);
    }

    return(
      <Modal
          isOpen={true}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <Crop onSubmit={onSubmit} image={image}/>
        {/* <TestCrop image={image} /> */}
      </Modal>
    )
}

export default ImageCropModal;