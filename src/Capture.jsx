import React,{ useState,useCallback  } from 'react'
import Webcam from "react-webcam";
import { IconButton } from '@material-ui/core'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ImageCropModal from './Crop/ImageCropModal';
import './Capture.css'

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const pictureDimentions = {
    height: 1280,
    width: 720
}

       
const Capture = () => {
    const webcamRef = React.useRef(null);
    const [image, addImage] = useState(null);
    const [croppedImage, updateCroppedImage] = useState(null);
    const [toggle, updateToggle] = useState(false);
    const [dialogToggle, setDialogToggle] = useState(false)
    const capture = () => {
        const screenshot = webcamRef.current.getScreenshot();
        addImage(screenshot);
        updateToggle(false);
        console.log(screenshot)
    }

    const onCrop = (image) => {
        addImage(null);
        updateCroppedImage(image);
    }
       
    return (
        <>
        <div className="camera-btn">
            <IconButton aria-label="camera" onClick={()=>updateToggle(!toggle)}>
                <PhotoCameraIcon fontSize="small" />
            </IconButton>
        </div>
        { toggle 
        ? <div className="webcam-content">
            <div className="webcam">
            <Webcam
                audio={false}
                height={pictureDimentions.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={pictureDimentions.width}
                videoConstraints={videoConstraints}
                className="webcam-area"
            />
            <button className="capture-btn" onClick={capture}>Capture photo</button>
            </div>
            
         </div>
        : ''
        }
        { image !== null && <ImageCropModal image={image} onCrop={onCrop} />}
        { croppedImage !== null && <img className="cropped-image" src={croppedImage} />}
        
        </>
    );
};

export default Capture;
