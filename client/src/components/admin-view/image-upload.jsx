import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

function ProductImageUpload({ imageFile, setImageFile, imageLoadingState, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState, isEditMode, isCustomStyling = false }) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) { event.preventDefault(); }
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(`${API_BASE_URL}/api/admin/products/upload-image`, data);
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <p className="text-[0.6rem] tracking-widest uppercase mb-3" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
        Upload Image
      </p>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={isEditMode ? "opacity-50 pointer-events-none" : ""}
        style={{
          border: "1px dashed rgba(201,169,110,0.3)",
          padding: "24px",
          background: "var(--smoke)",
          transition: "border-color 0.3s ease",
        }}
      >
        <input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-28 cursor-pointer gap-3"
          >
            <UploadCloudIcon className="w-8 h-8" style={{ color: "var(--gold)" }} />
            <span className="text-xs text-center" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
              Drag & drop or click to upload
            </span>
          </label>
        ) : imageLoadingState ? (
          <div className="h-10 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "var(--gold)", borderTopColor: "transparent" }} />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileIcon className="w-5 h-5" style={{ color: "var(--gold)" }} />
              <p className="text-xs" style={{ color: "var(--cream)", fontFamily: "'Jost', sans-serif" }}>
                {imageFile.name}
              </p>
            </div>
            <button
              onClick={handleRemoveImage}
              className="transition-colors duration-200"
              style={{ color: "var(--mist)" }}
              onMouseEnter={e => e.currentTarget.style.color = "#e05555"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--mist)"}
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
