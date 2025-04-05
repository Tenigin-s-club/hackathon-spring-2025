import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type Question = {
  materials: File[]; // вместо FileList | null
  description: string;
  title: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const schemaQuestion = z.object({
  title: z.string({
    message: "Повестка дня обязательный.",
  }),
  description: z.string({ message: "Текст повестки дня обязательный." }),
});

interface AddQuestionProps {
  isOpen: boolean;
  onOpenChange: (n: boolean) => void;
  number: number;
  onSubmit: (title: string, description: string, materials: File[]) => void;
}
const AddQuestion = ({
  onOpenChange,
  isOpen,
  number,
  onSubmit,
}: AddQuestionProps) => {
  const form = useForm<z.infer<typeof schemaQuestion>>();
  const [materials, setMaterials] = useState<File[]>([]);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="w-full">
        <Button className="w-full mt-6" type="button">
          Добавить вопрос
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <h3 className="mb-4 font-semibold text-3xl w-full text-left">
            Вопрос №{number}
          </h3>

          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вопрос</FormLabel>
                <FormControl>
                  <Input placeholder="Вопрос..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full gap-1.5 mb-5 mt-5">
            <Label htmlFor="message">Текст сообщения</Label>
            <Textarea
              {...form.register("description")}
              className="max-h-48"
              placeholder="Введите сообщение...."
            />
          </div>
          <FormLabel>Материалы</FormLabel>
          {materials && (
            <ol className="max-h-[20vh] flex flex-col gap-2 list-decimal mb-3 overflow-y-scroll">
              {materials.map((file, index) => (
                <li className="flex justify-between">
                  <p className="truncate sm:max-w-[425px]">
                    {index + 1}. {file.name},{" "}
                    {((file.size || 0) / 1024).toFixed(1)} КБ
                  </p>
                  <X
                    className="min-h-[25px] min-w-[25px] cursor-pointer"
                    color="#DC2626"
                    onClick={() =>
                      setMaterials((prev) => prev.filter((_, i) => i !== index))
                    }
                  />
                </li>
              ))}
            </ol>
          )}
          <Input
            onChange={(e) =>
              setMaterials((prev) => [
                ...prev,
                ...(e.target.files ? Array.from(e.target.files) : []),
              ])
            }
            multiple
            type="file"
            className="mb-4"
          />
          <Button
            type="button"
            onClick={() => {
              form
                .handleSubmit(({ title, description }) =>
                  onSubmit(title, description, materials)
                )()
                .then(() => {
                  setMaterials([]);
                  form.reset();
                });
            }}
            className="ml-auto"
          >
            Добавить
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestion;
