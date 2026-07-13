import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProductTile({ product, handleGetProductDetails, handleAddtoCart }) {
  const discount = product?.salePrice > 0
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="card-luxury group flex flex-col" style={{ borderRadius: 0 }}>
      {/* Image */}
      <div
        className="product-img-wrap cursor-pointer"
        style={{ aspectRatio: "3/4", overflow: "hidden" }}
        onClick={() => handleGetProductDetails(product?._id)}
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)", pointerEvents: "none" }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product?.totalStock === 0 ? (
            <span className="px-2 py-0.5 text-[0.6rem] tracking-widest uppercase font-semibold"
              style={{ background: "rgba(180,40,40,0.85)", color: "#fff", fontFamily: "'Jost', sans-serif" }}>
              Sold Out
            </span>
          ) : product?.totalStock < 10 ? (
            <span className="px-2 py-0.5 text-[0.6rem] tracking-widest uppercase font-semibold"
              style={{ background: "rgba(180,80,0,0.85)", color: "#fff", fontFamily: "'Jost', sans-serif" }}>
              {product?.totalStock} Left
            </span>
          ) : null}
          {discount > 0 && (
            <span className="px-2 py-0.5 text-[0.6rem] tracking-widest uppercase font-bold"
              style={{
                background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                color: "var(--obsidian)",
                fontFamily: "'Jost', sans-serif"
              }}>
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1" style={{ background: "var(--charcoal)" }}>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--gold)", fontFamily: "'Jost', sans-serif" }}>
            {brandOptionsMap[product?.brand]}
          </span>
        </div>

        <h3
          className="text-base mb-3 leading-tight cursor-pointer hover:text-[var(--gold)] transition-colors duration-300 flex-1"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--cream)" }}
          onClick={() => handleGetProductDetails(product?._id)}
        >
          {product?.title}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            {product?.salePrice > 0 ? (
              <>
                <span className="text-base font-medium" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)" }}>
                  ${product.salePrice}
                </span>
                <span className="text-xs line-through" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-base font-medium" style={{ fontFamily: "'Jost', sans-serif", color: "var(--cream)" }}>
                ${product?.price}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => product?.totalStock > 0 && handleAddtoCart(product?._id, product?.totalStock)}
          disabled={product?.totalStock === 0}
          className="mt-4 w-full py-2.5 text-[0.68rem] tracking-widest uppercase font-medium transition-all duration-300"
          style={{
            fontFamily: "'Jost', sans-serif",
            background: product?.totalStock === 0
              ? "rgba(255,255,255,0.04)"
              : "transparent",
            color: product?.totalStock === 0 ? "var(--mist)" : "var(--gold)",
            border: product?.totalStock === 0
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(201,169,110,0.4)",
            cursor: product?.totalStock === 0 ? "not-allowed" : "pointer",
          }}
          onMouseEnter={e => {
            if (product?.totalStock > 0) {
              e.currentTarget.style.background = "linear-gradient(135deg, var(--gold-dark), var(--gold))";
              e.currentTarget.style.color = "var(--obsidian)";
              e.currentTarget.style.borderColor = "var(--gold)";
            }
          }}
          onMouseLeave={e => {
            if (product?.totalStock > 0) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--gold)";
              e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
            }
          }}
        >
          {product?.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ShoppingProductTile;
