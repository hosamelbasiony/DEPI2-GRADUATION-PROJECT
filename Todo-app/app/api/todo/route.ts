"use server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  const authData = await getServerSession(authOptions);
  // return NextResponse.json(
  //   { authData }
  // );

  try {
    const todos = await prisma.todo.findMany({where: {
      authorId: authData?.user.id
    }});

    return NextResponse.json({ todos }, { status: 200 });
  } catch (ex) {
    return NextResponse.json(
      { message: "Server Error", error: ex },
      { status: 500 }
    );
  } finally {
    // TODO
  }
};
