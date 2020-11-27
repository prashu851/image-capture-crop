import React,{ useState } from 'react'
import ReactCrop from "react-image-crop"
import CropImage from './CropImage'
import RotateImage from './RotateImage';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


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

     const rotateRight = () => {

      RotateImage(imageRef, 90, 'croppedImage.jpeg')
            .then((result)=> {
              const blobUrl = URL.createObjectURL(result)
              imageRef.src = blobUrl;
            })
     }
     const rotateLeft = () => {

      RotateImage(imageRef, -90, 'croppedImage.jpeg')
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
            <div className="crop-content">
            <Dialog open={true} maxWidth="sm" fullWidth>
              <DialogTitle>Edit Image</DialogTitle>

              <DialogContent className="image-dialog">
                <ReactCrop
                      className="captured-image"
                      src={image} 
                      crop={crop} 
                      onChange={newCrop => newSetCrop(newCrop)}
                      onComplete={onCropComplete}
                      onImageLoaded={onImageLoaded} 
                    />
              </DialogContent>
              <DialogActions>
                <div className="btns">
                  <button className="left-btn" onClick={rotateLeft}>Rotate Left</button>
                  <button className="right-btn" onClick={rotateRight}>Rotate Right</button>
                  <button onClick={onCrop} className="submit-btn">Submit</button>
                </div>
              </DialogActions>
            </Dialog> 
            </div>
    
            </>
    )
}
export default Crop;