import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [getCurrentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Added to your cart" });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--obsidian)" }}>

      {/* ── HERO SLIDER ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "92vh", maxHeight: "720px" }}>
        {/* Slides */}
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-1000"
                style={{ opacity: index === currentSlide ? 1 : 0 }}
              >
                <img
                  src={slide?.image}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.55)" }}
                />
              </div>
            ))
          : null}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to top, var(--obsidian), transparent)" }}
        />

        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 lg:px-28">
          <div className="max-w-xl animate-slide-up">
            <p className="section-eyebrow mb-4">New Season · 2024</p>
            <h1
              className="text-[clamp(3rem,8vw,6rem)] leading-[0.95] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--cream)" }}
            >
              Elevate Your<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Style</em>
            </h1>
            <p className="text-sm tracking-wider mb-8" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
              Curated collections from the world's finest brands.<br />
              Discover your signature look.
            </p>
            <button
              onClick={() => navigate("/shop/listing")}
              className="btn-gold px-8 py-3.5 inline-flex items-center gap-3"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {featureImageList?.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="h-px transition-all duration-500"
              style={{
                width: i === currentSlide ? "32px" : "16px",
                background: i === currentSlide ? "var(--gold)" : "rgba(201,169,110,0.35)",
              }}
            />
          ))}
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length)}
          className="absolute top-1/2 left-5 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[rgba(201,169,110,0.3)] text-[var(--gold)] hover:bg-[rgba(201,169,110,0.15)] transition-all duration-300"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % featureImageList.length)}
          className="absolute top-1/2 right-5 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[rgba(201,169,110,0.3)] text-[var(--gold)] hover:bg-[rgba(201,169,110,0.15)] transition-all duration-300"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="py-24 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Browse</p>
            <h2 className="section-title">Shop by Category</h2>
            <div className="divider-gold w-24 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {categoriesWithIcon.map((categoryItem) => (
              <div
                key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                className="category-pill"
              >
                <div className="icon-wrap">
                  <categoryItem.icon className="w-5 h-5" />
                </div>
                <span>{categoryItem.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ── */}
      <section className="py-6 px-6 md:px-10 lg:px-20">
        <div
          className="max-w-7xl mx-auto relative overflow-hidden"
          style={{ background: "var(--charcoal)", border: "1px solid rgba(201,169,110,0.1)", padding: "60px 48px" }}
        >
          {/* decorative corner */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5"
            style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5"
            style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="section-eyebrow mb-2">Limited Time</p>
              <h3 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--cream)" }}>
                Seasonal Sale
              </h3>
              <p className="text-2xl gold-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                Up to 40% Off
              </p>
            </div>
            <button
              onClick={() => navigate("/shop/listing")}
              className="btn-outline-gold px-10 py-3.5 whitespace-nowrap"
            >
              Explore Deals
            </button>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="py-24 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-eyebrow mb-3">Partners</p>
            <h2 className="section-title">Featured Brands</h2>
            <div className="divider-gold w-24 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {brandsWithIcon.map((brandItem) => (
              <div
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="category-pill"
              >
                <div className="icon-wrap">
                  <brandItem.icon className="w-5 h-5" />
                </div>
                <span>{brandItem.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="section-eyebrow mb-3">Handpicked</p>
              <h2 className="section-title">Featured Products</h2>
              <div className="divider-gold w-24 mt-5" />
            </div>
            <button
              onClick={() => navigate("/shop/listing")}
              className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors duration-300"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      {/* ── FOOTER BANNER ── */}
      <footer
        className="mt-auto py-16 px-6"
        style={{ background: "var(--charcoal)", borderTop: "1px solid rgba(201,169,110,0.12)" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p
            className="text-3xl mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--cream)" }}
          >
            Shopingo
          </p>
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
            Luxury · Style · Excellence
          </p>
          <div className="divider-gold w-16 mx-auto mt-6" />
          <p className="text-xs mt-6" style={{ color: "rgba(136,136,128,0.5)", fontFamily: "'Jost', sans-serif" }}>
            © 2024 Shopingo. All rights reserved.
          </p>
        </div>
      </footer>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
