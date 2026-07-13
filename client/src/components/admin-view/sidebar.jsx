import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket, Zap } from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  { id: "dashboard", label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={15} /> },
  { id: "products", label: "Products", path: "/admin/products", icon: <ShoppingBasket size={15} /> },
  { id: "orders", label: "Orders", path: "/admin/orders", icon: <BadgeCheck size={15} /> },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex-col flex gap-1">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <div
            key={menuItem.id}
            onClick={() => { navigate(menuItem.path); setOpen?.(false); }}
            className={`admin-nav-item ${isActive ? "active" : ""}`}
          >
            <span style={{ color: isActive ? "var(--gold)" : "var(--mist)" }}>{menuItem.icon}</span>
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  const LogoSection = () => (
    <div
      className="flex cursor-pointer items-center gap-3 mb-2"
      onClick={() => navigate("/admin/dashboard")}
    >
      <div className="w-8 h-8 flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))" }}>
        <Zap size={14} style={{ color: "var(--obsidian)" }} />
      </div>
      <div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 500, color: "var(--cream)", lineHeight: 1 }}>
          Shopingo
        </h1>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
          Admin Panel
        </p>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-6" style={{ background: "var(--charcoal)", border: "none", borderRight: "1px solid rgba(201,169,110,0.12)" }}>
          <div className="flex flex-col h-full">
            <SheetHeader style={{ borderBottom: "1px solid rgba(201,169,110,0.1)", paddingBottom: "20px" }}>
              <SheetTitle><LogoSection /></SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-60 flex-col lg:flex p-6" style={{ background: "var(--charcoal)", borderRight: "1px solid rgba(201,169,110,0.12)", minHeight: "100vh" }}>
        <div style={{ borderBottom: "1px solid rgba(201,169,110,0.1)", paddingBottom: "24px", marginBottom: "8px" }}>
          <LogoSection />
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
