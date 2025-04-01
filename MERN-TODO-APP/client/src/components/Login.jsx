import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useActionState, useEffect } from "react";
import { login } from "@/actions/userActions";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "depi2_1743508892353@egypt.eg",
    password: "depi2",
    // email: "hosam@home.com",
    // password: "dev@dmin406A",
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
        <h1 className="main-title text-4xl text-center font-bold mt-8 mb-6">DEPI Todos</h1>
        <div className="flex flex-col gap-2 ">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={hndlChange}
            data-cy="email"
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
            data-cy="password"
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
        <Button disabled={isPending} data-cy="login">
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
