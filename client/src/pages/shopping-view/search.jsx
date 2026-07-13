import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
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
        toast({ title: "Product is added to cart" });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="min-h-screen px-6 md:px-10 lg:px-20 py-16" style={{ background: "var(--obsidian)" }}>
      {/* Header */}
      <div className="text-center mb-12">
        <p className="section-eyebrow mb-3">Discover</p>
        <h1 className="section-title mb-8">Search Products</h1>
        <div className="divider-gold w-16 mx-auto mb-10" />

        {/* Search bar */}
        <div className="max-w-xl mx-auto relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--gold)" }}
          />
          <input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for products, brands, categories..."
            className="w-full pl-12 pr-6 py-4 text-sm input-luxury"
            style={{
              background: "var(--charcoal)",
              border: "1px solid rgba(201,169,110,0.2)",
              borderRadius: "2px",
              color: "var(--cream)",
              fontFamily: "'Jost', sans-serif",
              outline: "none",
            }}
          />
        </div>
      </div>

      {keyword.trim().length > 3 && !searchResults.length ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)", fontStyle: "italic" }}>
            No results found
          </p>
          <p className="text-sm" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
            Try a different keyword or browse our collections
          </p>
        </div>
      ) : null}

      {searchResults.length > 0 && (
        <div>
          <p className="text-xs mb-6 tracking-widest uppercase" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
            {searchResults.length} results for "{keyword}"
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {searchResults.map((item) => (
              <ShoppingProductTile
                key={item._id}
                handleAddtoCart={handleAddtoCart}
                product={item}
                handleGetProductDetails={handleGetProductDetails}
              />
            ))}
          </div>
        </div>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
