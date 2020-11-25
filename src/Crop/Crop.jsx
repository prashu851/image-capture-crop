import React,{ useState } from 'react'
import ReactCrop from "react-image-crop"
import CropImage from './CropImage'
import RotateImage from './RotateImage';

const Crop = ({image,onSubmit}) => {
    const [croppedImageUrl, setCroppedImageUrl] = useState('')
    const [imageRef, setImageRef] = useState(null)
    const [rotation, setRotation] = useState(0)
    const [imageDimentions, updateImageDimentions] = useState({height: '', width: ''});
    const [crop, setCrop] = useState({ 
        x:0,
        y:0,
        width:100,
        height:100
     });

     const onImageLoaded = (image) => {
        setImageRef(image);
        updateImageDimentions({height: image.height, width: image.width});
     }
     const onCropComplete = (crop) => {
        if(imageRef !== null){
                CropImage(imageRef, crop, 'cropped.jpeg')
                .then((data) => {
                  const blobUrl1 = URL.createObjectURL(data)
                  setCroppedImageUrl(blobUrl1)
                })
         }
     }

     const rotateImage = () => {

      RotateImage(imageRef, 90, 'croppedImage.jpeg')
            .then((result)=> {
              const blobUrl = URL.createObjectURL(result)
              imageRef.src = blobUrl;
            })
     }
     const onCrop = () => {
       onSubmit(croppedImageUrl)
     }
     const newSetCrop = (crop) => {
      setCrop(crop);
     }

      return (
            <> 
              <ReactCrop
                className="captured-image"
                src={image} 
                crop={crop} 
                onChange={newCrop => newSetCrop(newCrop)}
                onComplete={onCropComplete}
                onImageLoaded={onImageLoaded} 
              />
              <button onClick={rotateImage}>Rotate</button>
              <button onClick={onCrop} className="submit-btn">Submit</button>
      {imageRef && <img src={imageRef.src} /> }
            </>
    )
}
//imageStyle={{transform:`rotate(${rotation}deg)`}} 
export default Crop;