export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result instanceof ArrayBuffer) {
        resolve(event.target.result);
      } else {
        reject(new Error("Invalid result type"));
      }
    };
    reader.onerror = (event) => {
      reject(event.target?.error || new Error("File read error"));
    };
    reader.readAsArrayBuffer(file);
  });
};
