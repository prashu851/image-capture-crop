import React,{ useState } from 'react'
import ReactCrop from "react-image-crop"
import TestCropFunction from './TestCropFunction'

const TestCrop = ({image}) => {
    const [croppedImageUrl, setCroppedImageUrl] = useState('')
    const [imageRef, setImageRef] = useState(null)
    const [crop, setCrop] = useState({ 
        x:0,
        y:0,
        width:100,
        height:100
     });

     const onImageLoaded = (image) => {
        setImageRef(image)
     }
     const onCropComplete = (crop) => {
         if(imageRef !== null){
            TestCropFunction(imageRef,crop, 'croppedImage.jpeg')
            .then((result)=> {
                console.log(result);
                const blobUrl = URL.createObjectURL(result)
                setCroppedImageUrl(blobUrl)
            })
         }
     }
    return (
        <> 
    <ReactCrop src={image} crop={crop} 
    onChange={newCrop => setCrop(newCrop)}
     onComplete={onCropComplete}
      onImageLoaded={onImageLoaded} 
      />;
    <img src={croppedImageUrl} />
    </>
    )
}

export default TestCrop;