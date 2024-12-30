import { useEffect, useRef } from "react";

const Upload = ({ setData, type, children }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME, // Çevresel değişken
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET, // Çevresel değişken
        resourceType: type, // Yükleme türü
      },
      (error, result) => {
        if (!error && result?.event === "success") {
          console.log("Upload Successful:", result.info);
          setData(result.info); // Yükleme tamamlanınca dosya bilgisi
        }
      }
    );
  }, [setData, type]);

  return (
    <button
      onClick={() => widgetRef.current.open()} // Widget'i aç
      className="upload-button"
      type="button"
    >
      {children}
    </button>
  );
};

export default Upload;
