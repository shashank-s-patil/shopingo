import { Outlet } from "react-router-dom";
import { Sparkles } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full" style={{ background: "var(--obsidian)" }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col items-center justify-center w-1/2 px-16 relative overflow-hidden"
        style={{ background: "var(--charcoal)" }}
      >
        {/* Decorative elements */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,169,110,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,169,110,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-0 left-0 w-px h-full opacity-20"
          style={{ background: "linear-gradient(to bottom, transparent, var(--gold), transparent)" }}
        />

        <div className="relative z-10 text-center max-w-md">
          {/* Logo mark */}
          <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center" style={{ border: "1px solid rgba(201,169,110,0.3)" }}>
            <Sparkles className="w-6 h-6" style={{ color: "var(--gold)" }} />
          </div>

          <h1
            className="text-5xl mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--cream)" }}
          >
            Welcome to<br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Shopingo</em>
          </h1>

          <div className="divider-gold w-20 mx-auto mb-6" />

          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Your destination for curated luxury fashion.<br />
            Discover, explore, and elevate your wardrobe.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {["Free Returns", "Secure Payment", "Premium Brands"].map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 text-[0.6rem] tracking-widest uppercase"
                style={{
                  border: "1px solid rgba(201,169,110,0.2)",
                  color: "var(--gold)",
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10 lg:px-16"
        style={{ background: "var(--obsidian)" }}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <h1
              className="text-3xl tracking-widest"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)" }}
            >
              Shopingo
            </h1>
            <div className="divider-gold w-16 mx-auto mt-3" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
