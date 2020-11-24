import React,{ useState } from 'react'
import ReactCrop from "react-image-crop"
import CropImage from './CropImage'

const Crop = ({image,onSubmit}) => {
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
            CropImage(imageRef,crop, 'croppedImage.jpeg')
            .then((result)=> {
                console.log(result);
                const blobUrl = URL.createObjectURL(result)
                setCroppedImageUrl(blobUrl)
            })
         }
     }
     const onCrop = () => {
       onSubmit(croppedImageUrl)
     }

      return (
            <> 
              <ReactCrop
                className="captured-image" 
                src={image} 
                crop={crop} 
                onChange={newCrop => setCrop(newCrop)}
                onComplete={onCropComplete}
                onImageLoaded={onImageLoaded} 
              />;
              <button onClick={onCrop} className="submit-btn">Submit</button>
            </>
    )
}

export default Crop;