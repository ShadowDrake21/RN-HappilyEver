export const readFileAsDataURL = (data: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.readAsDataURL(data);
    fr.onload = function () {
      resolve(fr.result as string);
    };
    fr.onerror = function () {
      reject(new Error('Error reading image'));
    };
  });
};
