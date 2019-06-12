export const url2Blob = (url: string) => {
  const img = new Image();
  img.crossOrigin="Anonymous";
  return new Promise((resolve, reject) => {
    img.onload = function(){
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      canvas.toBlob((blob) => {
        resolve(blob)
      });
    };
    img.src = url;
  })
}

export const object2formData = (obj: any) => {
  const params = new FormData();
  Object.keys(obj).map((key) => {
    const element = obj[key];
    if (Array.isArray(element)) {
      element.map(item => params.append(key, item));
    } else {
      params.append(key, element);
    }
    return null;
  });
  return params;
};