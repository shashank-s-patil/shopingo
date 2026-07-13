import { useNavigate } from "react-router-dom";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingBag } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount = cartItems && cartItems.length > 0
    ? cartItems.reduce((sum, currentItem) =>
        sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0)
    : 0;

  return (
    <SheetContent
      className="flex flex-col sm:max-w-md"
      style={{ background: "var(--charcoal)", border: "none", borderLeft: "1px solid rgba(201,169,110,0.15)" }}
    >
      <SheetHeader className="pb-5" style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
        <SheetTitle className="flex items-center gap-3">
          <ShoppingBag className="w-4 h-4" style={{ color: "var(--gold)" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "var(--cream)" }}>
            Your Cart
          </span>
          {cartItems.length > 0 && (
            <span
              className="ml-auto text-xs px-2 py-0.5"
              style={{ background: "rgba(201,169,110,0.15)", color: "var(--gold)", fontFamily: "'Jost', sans-serif" }}
            >
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          )}
        </SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-5 space-y-1">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent key={item.productId} cartItem={item} />)
          : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <ShoppingBag className="w-10 h-10 mb-4" style={{ color: "rgba(201,169,110,0.3)" }} />
              <p className="text-base mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)" }}>
                Your cart is empty
              </p>
              <p className="text-xs" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
                Add items to get started
              </p>
            </div>
          )}
      </div>

      {cartItems.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(201,169,110,0.1)", paddingTop: "20px" }}>
          <div className="flex justify-between items-center mb-5">
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
              Total
            </span>
            <span className="text-lg font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)" }}>
              ${totalCartAmount.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => { navigate("/shop/checkout"); setOpenCartSheet(false); }}
            className="btn-gold w-full py-3.5"
            style={{ borderRadius: "2px" }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;
