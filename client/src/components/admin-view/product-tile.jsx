import { Edit2, Trash2 } from "lucide-react";

function AdminProductTile({ product, setFormData, setOpenCreateProductsDialog, setCurrentEditedId, handleDelete }) {
  return (
    <div className="card-luxury group" style={{ borderRadius: 0 }}>
      <div className="product-img-wrap" style={{ aspectRatio: "4/3" }}>
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            className="w-10 h-10 flex items-center justify-center transition-all duration-200"
            style={{ background: "rgba(201,169,110,0.2)", border: "1px solid var(--gold)", color: "var(--gold)" }}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(product?._id)}
            className="w-10 h-10 flex items-center justify-center transition-all duration-200"
            style={{ background: "rgba(224,85,85,0.2)", border: "1px solid #e05555", color: "#e05555" }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4" style={{ background: "var(--charcoal)" }}>
        <h2
          className="text-base mb-2 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)", fontWeight: 500 }}
        >
          {product?.title}
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product?.salePrice > 0 ? (
              <>
                <span className="text-sm font-medium" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)" }}>
                  ₹{product.salePrice}
                </span>
                <span className="text-xs line-through" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium" style={{ fontFamily: "'Jost', sans-serif", color: "var(--cream)" }}>
                ₹{product?.price}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setOpenCreateProductsDialog(true);
                setCurrentEditedId(product?._id);
                setFormData(product);
              }}
              className="text-[0.6rem] tracking-widest uppercase px-3 py-1.5 transition-all duration-200"
              style={{ border: "1px solid rgba(201,169,110,0.3)", color: "var(--gold)", fontFamily: "'Jost', sans-serif" }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product?._id)}
              className="text-[0.6rem] tracking-widest uppercase px-3 py-1.5 transition-all duration-200"
              style={{ border: "1px solid rgba(224,85,85,0.3)", color: "#e05555", fontFamily: "'Jost', sans-serif" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductTile;
