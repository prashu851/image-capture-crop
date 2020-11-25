const RotateImage = (image, rotation, fileName) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');

  ctx.save();
  ctx.translate((canvas.width * scaleX)/2,(canvas.height * scaleY)/2);
ctx.rotate(rotation * Math.PI / 180);
ctx.drawImage(image, -(canvas.width * scaleX)/2, -(canvas.height * scaleY)/2,
 canvas.width * scaleX, canvas.height * scaleY)

ctx.restore();
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      blob.name = fileName;
      resolve(blob);
    }, 'image/jpeg', 1);
  });
}
export default RotateImage;