"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function createDummy() {
  await prisma.todoUser.create({
    data: {
      name: "Hosam Mohammad",
      email: "hosam@home.com",
      lab: "tarqeem",
      password: await bcrypt.hash("asd", 10),
    },
  });

  revalidatePath("/");
}
