import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Search } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <span
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="text-[0.68rem] font-medium cursor-pointer tracking-widest uppercase text-[var(--mist)] hover:text-[var(--gold)] transition-colors duration-300"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          {menuItem.label}
        </span>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-5">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <button
          onClick={() => setOpenCartSheet(true)}
          className="relative w-9 h-9 flex items-center justify-center border border-[rgba(201,169,110,0.2)] rounded-none text-[var(--mist)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300"
          aria-label="Cart"
        >
          <ShoppingCart className="w-4 h-4" />
          {(cartItems?.items?.length || 0) > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-[0.55rem] font-bold rounded-full gold-gradient text-[var(--obsidian)]">
              {cartItems?.items?.length}
            </span>
          )}
        </button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-9 h-9 flex items-center justify-center border border-[rgba(201,169,110,0.2)] rounded-none text-[var(--obsidian)] hover:border-[var(--gold)] transition-all duration-300 gold-gradient">
            <span className="text-xs font-bold uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
              {user?.userName[0].toUpperCase()}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-52 bg-[var(--charcoal)] border border-[rgba(201,169,110,0.2)] rounded-none p-1">
          <DropdownMenuLabel className="text-[var(--mist)] text-xs tracking-widest uppercase pb-2" style={{ fontFamily: "'Jost', sans-serif" }}>
            {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[rgba(201,169,110,0.15)]" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="text-[var(--cream)] hover:text-[var(--gold)] hover:bg-[rgba(201,169,110,0.08)] cursor-pointer text-xs tracking-wider uppercase rounded-none"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            <UserCog className="mr-2 h-3.5 w-3.5" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[rgba(201,169,110,0.15)]" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-[var(--cream)] hover:text-[var(--gold)] hover:bg-[rgba(201,169,110,0.08)] cursor-pointer text-xs tracking-wider uppercase rounded-none"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            <LogOut className="mr-2 h-3.5 w-3.5" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 w-full transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,10,10,0.97)"
          : "rgba(10,10,10,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,169,110,0.12)",
      }}
    >
      {/* Top announcement bar */}
      <div
        className="w-full text-center py-2 text-[0.6rem] tracking-[0.25em] uppercase"
        style={{
          background: "linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark))",
          color: "var(--obsidian)",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 600,
        }}
      >
        Free Shipping on Orders Above $99 · New Season Arrivals
      </div>

      <div className="flex h-16 items-center justify-between px-6 md:px-10">
        <Link to="/shop/home" className="flex items-center gap-3 group">
          <div className="w-8 h-8 gold-gradient flex items-center justify-center">
            <HousePlug className="h-4 w-4 text-[var(--obsidian)]" />
          </div>
          <span
            className="text-lg tracking-[0.15em] uppercase text-[var(--cream)] group-hover:text-[var(--gold)] transition-colors duration-300"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            Shopingo
          </span>
        </Link>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden w-9 h-9 flex items-center justify-center border border-[rgba(201,169,110,0.2)] text-[var(--mist)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-all duration-300">
              <Menu className="h-4 w-4" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-[var(--charcoal)] border-r border-[rgba(201,169,110,0.15)] p-8">
            <div className="mb-10">
              <span className="text-xl tracking-[0.15em] uppercase gold-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Shopingo
              </span>
            </div>
            <MenuItems />
            <div className="mt-8 pt-8 border-t border-[rgba(201,169,110,0.15)]">
              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
