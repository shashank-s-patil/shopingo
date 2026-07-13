import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { useState } from "react";
import { createNewOrder, capturePayment } from "@/store/shop/order-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard } from "lucide-react";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { razorpayOrderId, amount, currency, keyId, orderId, isLoading } =
    useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            ((currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity || 0),
          0
        )
      : 0;

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleInitiateRazorpayPayment() {
    if (!cartItems?.items?.length) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      cartId: cartItems?._id,
    };

    setIsPaymemntStart(true);
    const data = await dispatch(createNewOrder(orderData));
    if (!data?.payload?.success) {
      setIsPaymemntStart(false);
      return;
    }
    openRazorpayModal();
  }

  function openRazorpayModal() {
    const scriptLoaded = loadRazorpayScript();
    scriptLoaded.then((loaded) => {
      if (!loaded) {
        toast({
          title: "Failed to load payment gateway. Please try again.",
          variant: "destructive",
        });
        setIsPaymemntStart(false);
        return;
      }

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Shopingo",
        description: "Complete your purchase",
        order_id: razorpayOrderId,
        handler: function (response) {
          dispatch(
            capturePayment({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              orderId: orderId,
            })
          ).then((data) => {
            if (data?.payload?.success) {
              sessionStorage.removeItem("currentOrderId");
              navigate("/shop/payment-success", {
                state: {
                  orderId,
                  totalAmount: totalCartAmount,
                },
              });
            } else {
              toast({
                title: "Payment verification failed. Please contact support.",
                variant: "destructive",
              });
              setIsPaymemntStart(false);
            }
          });
        },
        modal: {
          ondismiss: function () {
            setIsPaymemntStart(false);
            toast({
              title: "Payment cancelled",
              variant: "destructive",
            });
          },
        },
        prefill: {
          name: user?.userName || "",
          email: user?.email || "",
          contact: currentSelectedAddress?.phone || "",
        },
        theme: {
          color: "#C9A96E",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={img}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.35)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20">
          <p className="section-eyebrow mb-2">Almost There</p>
          <h1 className="section-title">Checkout</h1>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            background:
              "linear-gradient(to top, var(--obsidian), transparent)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2
            className="text-xl mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--cream)",
            }}
          >
            Delivery Address
          </h2>
          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>

        <div>
          <h2
            className="text-xl mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--cream)",
            }}
          >
            Order Summary
          </h2>
          <div
            className="p-6 mb-6"
            style={{
              background: "var(--charcoal)",
              border: "1px solid rgba(201,169,110,0.1)",
            }}
          >
            <div className="space-y-0">
              {cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items.map((item) => (
                    <UserCartItemsContent
                      key={item.productId}
                      cartItem={item}
                    />
                  ))
                : null}
            </div>

            <div className="divider-gold my-5" />

            <div className="flex justify-between items-center mb-6">
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  color: "var(--mist)",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                Order Total
              </span>
              <span
                className="text-2xl"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--cream)",
                }}
              >
                ₹{totalCartAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleInitiateRazorpayPayment}
              disabled={isPaymentStart || isLoading}
              className="btn-gold w-full py-4 flex items-center justify-center gap-3"
              style={{ borderRadius: "2px" }}
            >
              <CreditCard className="w-4 h-4" />
              {isPaymentStart || isLoading
                ? "Processing Payment..."
                : "Pay with Razorpay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
