import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useActionState, useEffect } from "react";
import { login } from "@/actions/userActions";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "hosam@home.com",
    password: "dev@dmin406A",
  });

  const [state, formAction, isPending] = useActionState(login, {
    success: null,
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [state.success]);

  const hndlChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-screen flex justify-center items-center transform -translate-y-16">
      <form
        action={formAction}
        className="flex flex-col gap-6 max-w-xl w-full px-8"
      >
        <div className="flex flex-col gap-2 ">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={hndlChange}
          ></Input>
        </div>
        <div className="flex flex-col gap-2 ">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={hndlChange}
          ></Input>
        </div>
        {state.success && (
          <span className="message success-msg">
            {state.success} {"Redirecting..."}
          </span>
        )}
        {state.error && (
          <span className="message bg-red-600">
            {state.error}
          </span>
        )}
        <Button disabled={isPending}>
          {isPending ? "Logging in" : "Login"}
        </Button>
        <span className="text-[#63657b] text-center">
          Do not have an account? {" "}
          <Link to="/register" className="transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline">Signup</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
