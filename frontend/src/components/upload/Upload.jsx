import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Upload = ({ setData, type, children }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME, // Çevresel değişken
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET, // Çevresel değişken
        resourceType: type,
        folder: "website",
      },
      (error, result) => {
        if (!error && result?.event === "success") {
          toast.success("success image");
          setData(result.info);
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
