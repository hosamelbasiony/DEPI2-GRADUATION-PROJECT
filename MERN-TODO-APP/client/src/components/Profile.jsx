import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {
    CircleUserRound,

  } from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  async function hndlLogout() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}user/logout`, {
        method: "POST",
        credentials: "include",
      });

      if(!res.ok) throw new Error("Logout failed. Please try again.");

      navigate("/login");
      
    } catch (ex) {
        toast.error(ex.message);
    }
  }
  return <DropdownMenu>
    <DropdownMenuTrigger>
    <CircleUserRound className="transition ease-in-out hover:cursor-pointer hover:stroke-primary" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={hndlLogout}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;
}

export default Profile;
