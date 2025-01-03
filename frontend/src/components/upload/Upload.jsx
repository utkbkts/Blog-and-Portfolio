import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Upload = ({ setData, type, children }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

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
          setData(result.info);
        }
      }
    );
  }, []);

  return (
    <button
      onClick={() => widgetRef.current.open()}
      className="upload-button"
      type="button"
    >
      {children}
    </button>
  );
};

export default Upload;
