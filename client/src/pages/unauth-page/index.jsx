import { useNavigate } from "react-router-dom";
import { ShieldOff } from "lucide-react";

function UnauthPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "var(--obsidian)" }}
    >
      <div
        className="w-20 h-20 flex items-center justify-center mb-8"
        style={{ border: "1px solid rgba(201,169,110,0.2)" }}
      >
        <ShieldOff className="w-8 h-8" style={{ color: "var(--gold)" }} />
      </div>
      <p className="section-eyebrow mb-3">Access Denied</p>
      <h1
        className="text-4xl mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--cream)" }}
      >
        Unauthorized
      </h1>
      <div className="divider-gold w-16 mx-auto mb-6" />
      <p className="text-sm mb-8" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
        You don't have permission to access this page.
      </p>
      <button
        onClick={() => navigate("/shop/home")}
        className="btn-gold px-8 py-3"
        style={{ borderRadius: "2px" }}
      >
        Go Home
      </button>
    </div>
  );
}

export default UnauthPage;
