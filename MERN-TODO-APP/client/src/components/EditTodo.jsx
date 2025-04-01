import { ClipboardPenLineIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

function EditTodo({ title, id, hndlUpdate }) {
  const [updatedTitle, setUpdatedTitle] = useState(title);

  const hndlOnclick = () => hndlUpdate({
    id, title: updatedTitle
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ClipboardPenLineIcon
          data-cy="edit-todo"
          className={`hover:text-purple-700 transition ease-linear hover:cursor-pointer text-slate-300`}
          size={20}
        />
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px]`}>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <input type="hidden" value={id} id="id" name="id" />
          <Label htmlFor="title">Previous Todo</Label>
          <Input
            data-cy="edit-todo"
            id="title"
            name="title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="col-span-3"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button data-cy="update-todo" onClick={() => hndlOnclick() }>Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditTodo;
