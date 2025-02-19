"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "invalid Data" }, { status: 422 });
    }

    const user = await prisma.todoUser.create({
      data: {
        name,
        email,
        lab: "tarqeem",
        password: await bcrypt.hash(password, 10),
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (ex) {
    return NextResponse.json({ message:"Server Error", error: ex }, { status: 500 });
  } finally {
    // TODO
  }
};
