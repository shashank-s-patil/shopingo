import { StarIcon, X } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) { setRating(getRating); }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex((item) => item.productId === getCurrentProductId);
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({ title: `Only ${getQuantity} quantity can be added for this item`, variant: "destructive" });
          return;
        }
      }
    }
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Added to your cart" });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(addReview({
      productId: productDetails?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    })).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({ title: "Review added successfully!" });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview = reviews && reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
    : 0;

  const discount = productDetails?.salePrice > 0
    ? Math.round(((productDetails.price - productDetails.salePrice) / productDetails.price) * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="p-0 overflow-hidden max-w-[92vw] sm:max-w-[85vw] lg:max-w-[72vw]"
        style={{ background: "var(--charcoal)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "0" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "1/1", background: "var(--smoke)" }}>
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <span
                className="absolute top-4 left-4 px-3 py-1 text-[0.6rem] tracking-widest uppercase font-bold"
                style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", color: "var(--obsidian)", fontFamily: "'Jost', sans-serif" }}
              >
                -{discount}%
              </span>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col p-8 overflow-y-auto" style={{ maxHeight: "85vh" }}>
            <div className="flex-1">
              {/* Title */}
              <p className="section-eyebrow mb-2">{productDetails?.category} · {productDetails?.brand}</p>
              <h1
                className="text-3xl mb-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "var(--cream)" }}
              >
                {productDetails?.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-0.5">
                  <StarRatingComponent rating={averageReview} />
                </div>
                <span className="text-xs" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
                  {averageReview.toFixed(1)} ({reviews?.length || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                {productDetails?.salePrice > 0 ? (
                  <>
                    <span className="text-2xl font-medium" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)" }}>
                      ${productDetails.salePrice}
                    </span>
                    <span className="text-base line-through" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
                      ${productDetails.price}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-medium" style={{ fontFamily: "'Jost', sans-serif", color: "var(--cream)" }}>
                    ${productDetails?.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                {productDetails?.description}
              </p>

              {/* Add to cart */}
              {productDetails?.totalStock === 0 ? (
                <button
                  disabled
                  className="w-full py-3.5 text-[0.68rem] tracking-widest uppercase"
                  style={{ background: "rgba(255,255,255,0.04)", color: "var(--mist)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Jost', sans-serif", cursor: "not-allowed" }}
                >
                  Out of Stock
                </button>
              ) : (
                <button
                  className="btn-gold w-full py-3.5"
                  style={{ borderRadius: "2px" }}
                  onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                >
                  Add to Cart
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="divider-gold my-7" />

            {/* Reviews section */}
            <div>
              <h2 className="text-lg mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)" }}>
                Customer Reviews
              </h2>

              <div className="space-y-5 max-h-48 overflow-y-auto mb-6">
                {reviews && reviews.length > 0 ? reviews.map((reviewItem, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", color: "var(--obsidian)", fontFamily: "'Jost', sans-serif" }}
                    >
                      {reviewItem?.userName[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium" style={{ color: "var(--cream)", fontFamily: "'Jost', sans-serif" }}>
                          {reviewItem?.userName}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-1">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>No reviews yet. Be the first!</p>
                )}
              </div>

              {/* Write review */}
              <div className="space-y-3">
                <p className="text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
                  Write a Review
                </p>
                <div className="flex gap-1">
                  <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
                </div>
                <input
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-2.5 text-sm input-luxury"
                  style={{ borderRadius: "2px" }}
                />
                <button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === ""}
                  className="btn-outline-gold w-full py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ borderRadius: "2px" }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
