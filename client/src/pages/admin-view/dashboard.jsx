import ProductImageUpload from "@/components/admin-view/image-upload";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload, Image } from "lucide-react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="p-8 min-h-screen" style={{ background: "var(--obsidian)" }}>
      <div className="mb-8">
        <p className="section-eyebrow mb-2">Control Center</p>
        <h1 className="section-title">Dashboard</h1>
        <div className="divider-gold w-16 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload section */}
        <div>
          <h2
            className="text-lg mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)" }}
          >
            Hero Banner Images
          </h2>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling={true}
          />
          <button
            onClick={handleUploadFeatureImage}
            disabled={!uploadedImageUrl}
            className="btn-gold mt-4 w-full py-3 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderRadius: "2px" }}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Banner
          </button>
        </div>

        {/* Current banners */}
        <div>
          <h2
            className="text-lg mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)" }}
          >
            Active Banners
          </h2>
          {featureImageList && featureImageList.length > 0 ? (
            <div className="flex flex-col gap-3">
              {featureImageList.map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden"
                  style={{ border: "1px solid rgba(201,169,110,0.1)" }}
                >
                  <img
                    src={item.image}
                    className="w-full h-36 object-cover"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-3"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
                  >
                    <span
                      className="text-[0.6rem] tracking-widest uppercase"
                      style={{ color: "var(--gold)", fontFamily: "'Jost', sans-serif" }}
                    >
                      Banner {i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center py-16"
              style={{ border: "1px dashed rgba(201,169,110,0.2)" }}
            >
              <Image className="w-8 h-8 mb-3" style={{ color: "rgba(201,169,110,0.3)" }} />
              <p className="text-sm" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
                No banners uploaded yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
