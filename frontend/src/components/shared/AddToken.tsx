import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/lib/helpers/notification";
import { useNavigate } from "react-router-dom";

export type Question = {
  materials: File[]; // вместо FileList | null
  description: string;
  title: string;
};

interface Props {
  children: ReactNode;
  meetingId: string;
  voice: "agree" | "disagree" | "abstain";
}
const AddToken = ({ children, meetingId }: Props) => {
  const navigate = useNavigate();
  const [material, setMaterial] = useState<File>();
  const addToken = () => {
    console.log(material?.type);
    if (material?.type === "pfx") {
      showSuccessNotification("Вы ответили на вопрос");
      navigate(`/meetings/${meetingId}`);
    } else {
      showErrorNotification("Не правильная подпись");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <h3 className="mb-4 font-semibold text-3xl w-full text-left">
          Добавьте электронную подпись
        </h3>
        <Input
          id="picture"
          type="file"
          onChange={(e) => setMaterial(e.target.value)}
        />
        <DialogClose>
          <Button type="button" onClick={addToken} className="ml-auto">
            Подтвердить
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddToken;
