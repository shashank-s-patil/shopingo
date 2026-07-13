import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = { userName: "", email: "", password: "" };

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/login");
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <p className="section-eyebrow mb-3">Join Us</p>
        <h1
          className="text-4xl mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--cream)" }}
        >
          Create Account
        </h1>
        <div className="divider-gold w-12 mb-6" />
        <p className="text-sm" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          Already have an account?{" "}
          <Link
            to="/auth/login"
            style={{ color: "var(--gold)" }}
            onMouseEnter={e => e.target.style.color = "var(--gold-light)"}
            onMouseLeave={e => e.target.style.color = "var(--gold)"}
          >
            Sign in
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText="Create Account"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
