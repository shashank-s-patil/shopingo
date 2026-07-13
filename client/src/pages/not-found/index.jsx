import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "var(--obsidian)" }}
    >
      <p className="section-eyebrow mb-4">Error 404</p>
      <h1
        className="text-8xl mb-4 gold-text"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
      >
        404
      </h1>
      <h2
        className="text-3xl mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--cream)", fontWeight: 300 }}
      >
        Page Not Found
      </h2>
      <div className="divider-gold w-16 mx-auto mb-8" />
      <p className="text-sm mb-10" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/shop/home")}
        className="btn-gold px-10 py-3.5"
        style={{ borderRadius: "2px" }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default NotFound;
