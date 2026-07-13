import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import confetti from "canvas-confetti";

const COLORS = ["#C9A96E", "#FF6B6B", "#4ECDC4", "#FFD93D", "#6C5CE7", "#FF8C42", "#A8E6CF", "#FFB7B2"];

function fireConfetti() {
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.4 },
    colors: COLORS,
    ticks: 200,
  });

  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.7 },
      colors: COLORS,
      ticks: 200,
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.7 },
      colors: COLORS,
      ticks: 200,
    });
  }, 300);

  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 120,
      origin: { y: 0.3 },
      startVelocity: 25,
      colors: COLORS,
      ticks: 150,
    });
  }, 600);

  setTimeout(() => {
    const duration = 800;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: COLORS,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: COLORS,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, 1200);
}

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasFired = useRef(false);

  const orderId = location.state?.orderId;
  const totalAmount = location.state?.totalAmount || 0;

  useEffect(() => {
    if (!hasFired.current) {
      hasFired.current = true;
      fireConfetti();
    }
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      style={{ background: "var(--obsidian)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="animate-slide-up" style={{ animationDelay: "0s" }}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(201,169,110,0.25), rgba(201,169,110,0.05))",
            border: "2px solid rgba(201,169,110,0.4)",
            animation: "pulse-gold 2s ease-in-out infinite",
          }}
        >
          <svg
            className="w-12 h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animation: "checkmark-draw 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
            }}
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <p
        className="section-eyebrow mb-3 animate-slide-up"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        Confirmed
      </p>

      <h1
        className="text-5xl mb-3 animate-slide-up gold-text"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          animationDelay: "0.35s",
          opacity: 0,
        }}
      >
        Payment Successful!
      </h1>

      <p
        className="text-sm mb-8 animate-slide-up"
        style={{
          color: "var(--mist)",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          maxWidth: "400px",
          animationDelay: "0.5s",
          opacity: 0,
        }}
      >
        Your order has been confirmed and is being processed.
        <br />
        You'll receive a confirmation email shortly.
      </p>

      <div
        className="animate-slide-up mb-10 py-4 px-8"
        style={{
          background: "var(--charcoal)",
          border: "1px solid rgba(201,169,110,0.15)",
          borderRadius: "2px",
          animationDelay: "0.65s",
          opacity: 0,
        }}
      >
        {orderId && (
          <p
            className="text-xs tracking-widest uppercase mb-2"
            style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}
          >
            Order ID:{" "}
            <span style={{ color: "var(--gold)" }}>
              {orderId.toString().slice(-8).toUpperCase()}
            </span>
          </p>
        )}
        {totalAmount > 0 && (
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif" }}
          >
            Total Paid:{" "}
            <span style={{ color: "var(--gold)" }}>
              ₹{Number(totalAmount).toFixed(2)}
            </span>
          </p>
        )}
      </div>

      <div
        className="divider-gold w-16 mx-auto mb-8 animate-fade-in"
        style={{ animationDelay: "0.75s", opacity: 0 }}
      />

      <div
        className="flex gap-4 animate-slide-up"
        style={{ animationDelay: "0.85s", opacity: 0 }}
      >
        <button
          onClick={() => navigate("/shop/account")}
          className="btn-gold px-8 py-3"
          style={{ borderRadius: "2px" }}
        >
          View Orders
        </button>
        <button
          onClick={() => navigate("/shop/home")}
          className="btn-outline-gold px-8 py-3"
          style={{ borderRadius: "2px" }}
        >
          Continue Shopping
        </button>
      </div>

      <style>{`
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 30; stroke-dasharray: 30; }
          100% { stroke-dashoffset: 0; stroke-dasharray: 30; }
        }
      `}</style>
    </div>
  );
}

export default PaymentSuccessPage;
