const RotateImage = (image, rotation, fileName) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.height;
  canvas.height = image.width;
  const ctx = canvas.getContext('2d');

  ctx.save();
  ctx.translate((canvas.width)/2,(canvas.height)/2);
ctx.rotate(rotation * Math.PI / 180);
ctx.drawImage(image, -(canvas.height)/2, -(canvas.width )/2,
 canvas.height , canvas.width )

ctx.restore();
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      blob.name = fileName;
      resolve(blob);
    }, 'image/jpeg', 1);
  });
}
export default RotateImage;