import { useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";

const Upload = ({ setData, type, children }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleSetData = useCallback((info) => {
    setData(info);
  }, [setData]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        resourceType: type,
        folder: "website",
      },
      (error, result) => {
        if (!error && result?.event === "success") {
          toast.success("Image uploaded successfully!");
          handleSetData(result.info);
        }
      }
    );
  }, [handleSetData, type]);

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
