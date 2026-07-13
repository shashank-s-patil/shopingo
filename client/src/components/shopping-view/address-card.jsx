import { MapPin, Phone, FileText, Edit2, Trash2 } from "lucide-react";

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId }) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <div
      onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null}
      className="p-5 transition-all duration-300 cursor-pointer relative"
      style={{
        background: isSelected ? "rgba(201,169,110,0.08)" : "var(--smoke)",
        border: isSelected ? "1px solid var(--gold)" : "1px solid rgba(201,169,110,0.1)",
      }}
    >
      {isSelected && (
        <div
          className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))" }}
        >
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3L3 5L7 1" stroke="var(--obsidian)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
          <div>
            <p className="text-xs" style={{ color: "var(--cream)", fontFamily: "'Jost', sans-serif" }}>
              {addressInfo?.address}
            </p>
            <p className="text-xs" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
              {addressInfo?.city} — {addressInfo?.pincode}
            </p>
          </div>
        </div>
        {addressInfo?.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 flex-shrink-0" style={{ color: "var(--gold)" }} />
            <p className="text-xs" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
              {addressInfo?.phone}
            </p>
          </div>
        )}
        {addressInfo?.notes && (
          <div className="flex items-start gap-2">
            <FileText className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
            <p className="text-xs" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
              {addressInfo?.notes}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-3" style={{ borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <button
          onClick={(e) => { e.stopPropagation(); handleEditAddress(addressInfo); }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[0.6rem] tracking-widest uppercase transition-all duration-300"
          style={{ border: "1px solid rgba(201,169,110,0.25)", color: "var(--gold)", fontFamily: "'Jost', sans-serif" }}
        >
          <Edit2 className="w-3 h-3" /> Edit
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addressInfo); }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[0.6rem] tracking-widest uppercase transition-all duration-300"
          style={{ border: "1px solid rgba(255,80,80,0.2)", color: "#e05555", fontFamily: "'Jost', sans-serif" }}
        >
          <Trash2 className="w-3 h-3" /> Delete
        </button>
      </div>
    </div>
  );
}

export default AddressCard;
