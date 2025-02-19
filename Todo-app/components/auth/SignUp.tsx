"use client";
import React, { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const SignUp = () => {
  const router = useRouter();
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = "/api/auth/register";

    let ret = await axios.post(url, {
      name: userName.current,
      email: userName.current,
      password: pass.current,
    });

    if (ret?.data) {
      router.push("http://localhost:3000");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create new account
          </h2>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-4"
          // className="mt-10 sm:mx-auto sm:w-full space-y-4"
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Repeat Password
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
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{" "}
          <a
            href="/signin"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Signin to an existing account
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUp;
