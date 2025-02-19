"use client";
import React, { useRef } from "react";
import InputBox from "./InputBox";
import { Button } from "./Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = () => {
  const router = useRouter();
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: false,
    });

    if (!res?.error) {
      router.push("http://localhost:3000");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            alt="Your Company"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => (userName.current = e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => (pass.current = e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>

          {/* <div className="flex items-center justify-center mt-2 gap-2">
            <Button type="submit" className="w-28">
              Sign In
            </Button>
            <Link
              href={"/"}
              className="w-28 border border-red-600 text-center py-2 rounded-md text-red-600 transition hover:bg-red-600 hover:text-white hover:border-transparent active:scale-95"
            >
              Cancel
            </Link>
          </div> */}
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <a
            href="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Signup to our Todo App
          </a>
        </p>

        {/* <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => login()}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Signup to our Todo App
            </a>
          </p>
        </div> */}
      </div>
    </>
  );
};

export default Login;
