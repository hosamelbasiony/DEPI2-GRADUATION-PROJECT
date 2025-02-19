import { PrismaClient } from "@prisma/client";
import { createDummy } from "@/app/actions/userActions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'

import AddTodo from "@/components/shared/AddTodo";

import Todo from "@/components/shared/Todo";
import Signout from "@/components/Signout";

const prisma = new PrismaClient();

async function getData(authData: any) {
  const data = await prisma.todo.findMany({
    where: {
      authorId: authData?.user.id,
    },
    select: {
      title: true,
      id: true,
      isCompleted: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

const Home = async () => {
  const authData = await getServerSession(authOptions);

  const data = await getData(authData);

  if ( authData ) {
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">
      <span className="text-3xl font-extrabold uppercase mb-4">
        {authData?.user.name} Todo List
        <Signout />
      </span>
      <h1 className=" text-2xl font-extrabold uppercase mb-5">
        DEPI 2<span className="text-orange-700 ml-2">Graduation project </span>
      </h1>
      <div className="flex justify-center flex-col items-center w-[1000px] ">
        <AddTodo />
        <div className=" flex flex-col gap-5 items-center justify-center mt-10 w-full">
          {data.map((todo, id) => (
            <div className="w-full" key={id}>
              <Todo todo={todo} />
            </div>
          ))}
        </div>
      </div> 
    </div>
  );

} else {
  redirect('/signin')
}
};

export default Home;
