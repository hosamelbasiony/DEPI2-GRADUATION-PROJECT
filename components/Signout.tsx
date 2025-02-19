"use client";
import { signOut } from "next-auth/react"
import { BiExit } from "react-icons/bi";

export default function Signout() {
  const logout = async () => {
    await signOut();
  };

  return (
    <button onClick={() => logout()}>
      <BiExit title="Sign out" className="inline-svg ml-2 text-orange-700" />
    </button>
  );
}
