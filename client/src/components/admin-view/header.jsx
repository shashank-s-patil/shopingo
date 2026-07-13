import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  return (
    <header
      className="flex items-center justify-between px-6 py-4"
      style={{ background: "var(--charcoal)", borderBottom: "1px solid rgba(201,169,110,0.12)" }}
    >
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden w-9 h-9 flex items-center justify-center transition-all duration-300"
        style={{ border: "1px solid rgba(201,169,110,0.2)", color: "var(--mist)" }}
      >
        <AlignJustify className="w-4 h-4" />
      </button>

      <div className="flex flex-1 justify-end">
        <button
          onClick={() => dispatch(logoutUser())}
          className="flex items-center gap-2 px-5 py-2 text-[0.65rem] tracking-widest uppercase transition-all duration-300"
          style={{
            border: "1px solid rgba(201,169,110,0.2)",
            color: "var(--gold)",
            fontFamily: "'Jost', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,169,110,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
