import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useActionState, useEffect } from "react";
import { register } from "@/actions/userActions";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    // email: "hosam@home.com",
    // name: "Hosam Mohammad",
    // password: "dev@dmin406A",
  });

  const [state, formAction, isPending] = useActionState(register, {
    success: null,
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [state.success]);

  const hndlChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // console.log(formData);

  return (
    <div className="h-screen flex justify-center items-center transform -translate-y-16">
      <form
        action={formAction}
        className="flex flex-col gap-6 max-w-xl w-full px-8"
      >
        <h1 className="main-title text-4xl text-center font-bold mt-28 mb-4">DEPI Todos</h1>
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
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={hndlChange}
            data-cy="name"
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
          <span className="message bg-red-600">{state.error}</span>
        )}
        <Button data-cy="register" disabled={isPending}>
          {isPending ? "Registering" : "Register"}
        </Button>
        <span className="text-[#63657b] text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
