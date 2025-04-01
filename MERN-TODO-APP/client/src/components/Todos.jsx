import useSWR from "swr";
import toast from "react-hot-toast";
// import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { PlusIcon, CheckCircle, Trash2Icon } from "lucide-react";
import { Input } from "./ui/input";
import EditTodo from "./EditTodo";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fetcher = (url, options = {}) =>
  fetch(url, {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: options.body ? JSON.stringify(options.body) : undefined,
  }).then((res) => res.json());

const Todos = () => {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);
  const { data, error, mutate, isLoading } = useSWR(
    `${import.meta.env.VITE_BASE_URL}todo`,
    fetcher
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}user/profile`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.ok) setAuthenticated(true);
      else navigate("/login");
    });
  }, []);

  if (!authenticated) {
    return <>Unauthorized</>;
  }
  if (error) {
    return <h1 className="text-2xl py-2 text-center">Something went wrong</h1>;
  }

  if (isLoading) {
    return <h1 className="text-2xl py-2 text-center">Loading...</h1>;
  }

  const hndlError = async (error) => {
    toast.error(error);
    throw new Error(error);
  };

  const deleteTodo = async (id) => {
    await mutate(
      async () => {
        const res = await fetcher(
          `${import.meta.env.VITE_BASE_URL}todo/${id}`,
          {
            method: "DELETE",
          }
        );

        if (res.error) hndlError(res.error);
        else toast.success("Todo deleted");

        return data.filter((todo) => todo._id != id);
      },
      {
        optimisticData: data.filter((todo) => todo._id != id),
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  const hndlComplete = async (todo) => {
    await mutate(
      async () => {
        const res = await fetcher(
          `${import.meta.env.VITE_BASE_URL}todo/${todo._id}`,
          {
            method: "PUT",
            body: {
              title: todo.title,
              isCompleted: !todo.isCompleted,
            },
          }
        );

        if (res.error) hndlError(res.error);
        else toast.success("Todo updated");

        return data.map((item) => {
          if (item._id == todo._id)
            return {
              ...item,
              isCompleted: !item.isCompleted,
            };

          return item;
        });
      },
      {
        optimisticData: data.map((item) => {
          if (item._id == todo._id)
            return {
              ...item,
              isCompleted: !item.isCompleted,
            };

          return item;
        }),
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  const hndlAddTodo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");

    if (!title.trim().length) {
      toast.error("Todo can not be empty!");
      return;
    }

    const newTodo = {
      title: `${title} adding...`,
      _id: Date.now().toString(),
      isCompleted: false,
    };

    async function addTodo() {
      const res = await fetcher(`${import.meta.env.VITE_BASE_URL}todo`, {
        method: "POST",
        body: { title },
      });

      if (res.error) hndlError(res.error);

      return [...data, res];
    }

    await mutate(addTodo, {
      optimisticData: [...data, newTodo],
      revalidate: true,
      rollbackOnError: true,
    });

    e.target.reset();
  };

  const hndlUpdate = async ({ title, id }) => {
    let todo = data.find((x) => x._id == id);

    await mutate(
      async () => {
        const res = await fetcher(
          `${import.meta.env.VITE_BASE_URL}todo/${todo._id}`,
          {
            method: "PUT",
            body: {
              title,
              isCompleted: todo.isCompleted,
            },
          }
        );

        if (res.error) hndlError(res.error);
        else toast.success("Todo updated");

        return data.map((item) => {
          if (item._id == todo._id)
            return {
              ...item,
              title,
            };

          return item;
        });
      },
      {
        optimisticData: data.map((item) => {
          if (item._id == todo._id)
            return {
              ...item,
              title,
            };
          return item;
        }),
        revalidate: false,
        rollbackOnError: true,
      }
    );
  };

  return (
    <div className="mx-auto mt-20 max-w-xl px-4 w-full flex flex-col gap-6">
      <div>
        {/* <CircleUserRound /> */}
        <Profile />
      </div>
      <h1 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-4xl text-center mb-4 text-transparent bg-clip-text">
        DEPI Todos
      </h1>
      <form onSubmit={hndlAddTodo} className="flex gap-4 items-center">
        <Input
          type="text"
          placeholder="Enter todo"
          name="title"
          id="title"
          required
          className="shadow-md"
        ></Input>
        <button data-cy="add-todo" className="h-9 rounded-md border border-input bg-transparent px-4 text-base shadow-md flex items-center hover:bg-purple-700 hover:text-white transition ease-linear group-[]:">
          <PlusIcon
            size={20}
            className="transition ease-linear group-hover:stroke-white"
          />{" "}
        </button>
      </form>
      {data?.length ? (
        <div className="shadow-md border-2 border-input bg-transparent flex flex-col rounded">
          {data.map((todo, index) => (
            <div
              className={`flex h-10 items-center w-full ${
                index === data.length - 1 ? "border-b-0" : "border-b-2"
              }`}
              key={index}
            >
              <span
                data-cy="todo-entry"
                className={`flex-1 px-3 ${
                  todo.isCompleted && "line-through text-[#63657b]"
                }`}
              >
                {todo.title}
              </span>
              <div className="px-3 flex gap-4">
                <CheckCircle
                  data-cy="complete-todo"
                  className={`transition ease-in-out hover:cursor-pointer hover:text-purple-700 ${
                    todo.isCompleted ? "text-primary" : "text-slate-300 "
                  }`}
                  size={20}
                  onClick={() => hndlComplete(todo)}
                />
                <Trash2Icon
                  data-cy="delete-todo"
                  className={`hover:text-purple-700 transition ease-linear hover:cursor-pointer text-slate-300`}
                  size={20}
                  onClick={() => deleteTodo(todo._id)}
                />
                <EditTodo
                  hndlUpdate={hndlUpdate}
                  id={todo._id}
                  title={todo.title}
                />
                {/* <ClipboardPenLineIcon
                  className={`hover:text-purple-700 transition ease-linear hover:cursor-pointer text-slate-300`}
                  size={20}
                /> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span>You do not have any todos yet!</span>
      )}
    </div>
  );
};

export default Todos;
