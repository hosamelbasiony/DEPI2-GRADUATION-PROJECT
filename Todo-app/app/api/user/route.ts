"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async () => {
try {
    
    const users = await prisma.todoUser.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (ex) {
    return NextResponse.json({ message:"Server Error", error: ex }, { status: 500 });
  } finally {
    // TODO
  }
};
