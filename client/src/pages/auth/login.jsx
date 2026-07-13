import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = { email: "", password: "" };

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      toast({
        title: data?.payload?.message,
        variant: data?.payload?.success ? "default" : "destructive",
      });
    });
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <p className="section-eyebrow mb-3">Welcome Back</p>
        <h1
          className="text-4xl mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--cream)" }}
        >
          Sign In
        </h1>
        <div className="divider-gold w-12 mb-6" />
        <p className="text-sm" style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="transition-colors duration-300"
            style={{ color: "var(--gold)" }}
            onMouseEnter={e => e.target.style.color = "var(--gold-light)"}
            onMouseLeave={e => e.target.style.color = "var(--gold)"}
          >
            Create one
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
