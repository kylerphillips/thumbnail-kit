export const fileToBytes = async (file: File): Promise<Uint8Array> => {
  const reader = new FileReader();

  return new Promise<Uint8Array>((resolve, reject) => {
    reader.onload = () => {
      resolve(new Uint8Array(reader.result as ArrayBuffer));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
