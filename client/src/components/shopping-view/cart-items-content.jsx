import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItems = cartItems.items || [];
      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex((item) => item.productId === getCartItem?.productId);
        const getCurrentProductIndex = productList.findIndex((product) => product._id === getCartItem?.productId);
        const getTotalStock = productList[getCurrentProductIndex]?.totalStock;
        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({ title: `Only ${getQuantity} quantity can be added for this item`, variant: "destructive" });
            return;
          }
        }
      }
    }
    dispatch(updateCartQuantity({
      userId: user?.id,
      productId: getCartItem?.productId,
      quantity: typeOfAction === "plus" ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1,
    })).then((data) => {
      if (data?.payload?.success) toast({ title: "Cart updated" });
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })).then((data) => {
      if (data?.payload?.success) toast({ title: "Item removed from cart" });
    });
  }

  return (
    <div
      className="flex items-center gap-4 py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden" style={{ border: "1px solid rgba(201,169,110,0.1)" }}>
        <img src={cartItem?.image} alt={cartItem?.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className="text-sm truncate mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)", fontWeight: 500 }}
        >
          {cartItem?.title}
        </h3>
        {/* Qty controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            className="w-6 h-6 flex items-center justify-center transition-all duration-200 disabled:opacity-30"
            style={{ border: "1px solid rgba(201,169,110,0.25)", color: "var(--gold)" }}
          >
            <Minus className="w-2.5 h-2.5" />
          </button>
          <span className="w-6 text-center text-sm" style={{ fontFamily: "'Jost', sans-serif", color: "var(--cream)" }}>
            {cartItem?.quantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
            className="w-6 h-6 flex items-center justify-center transition-all duration-200"
            style={{ border: "1px solid rgba(201,169,110,0.25)", color: "var(--gold)" }}
          >
            <Plus className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-sm font-medium" style={{ fontFamily: "'Jost', sans-serif", color: "var(--cream)" }}>
          ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => handleCartItemDelete(cartItem)}
          className="transition-colors duration-200"
          style={{ color: "var(--mist)" }}
          onMouseEnter={e => e.currentTarget.style.color = "#e05555"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--mist)"}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
