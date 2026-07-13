import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { useState } from "react";

function ShoppingAccount() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      {/* Hero */}
      <div className="relative h-52 overflow-hidden">
        <img src={accImg} className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.3)" }} />
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20">
          <p className="section-eyebrow mb-2">My Profile</p>
          <h1 className="section-title">My Account</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: "linear-gradient(to top, var(--obsidian), transparent)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        {/* Custom tabs */}
        <div className="flex gap-1 mb-8" style={{ borderBottom: "1px solid rgba(201,169,110,0.12)" }}>
          {["orders", "address"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-8 py-3 text-[0.65rem] tracking-widest uppercase transition-all duration-300 relative"
              style={{
                fontFamily: "'Jost', sans-serif",
                color: activeTab === tab ? "var(--gold)" : "var(--mist)",
                background: "transparent",
                borderBottom: activeTab === tab ? "2px solid var(--gold)" : "2px solid transparent",
                marginBottom: "-1px",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "orders" ? <ShoppingOrders /> : <Address />}
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
