import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type Question = {
  materials: FileList;
  description: string;
  title: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const schemaQuestion = z.object({
  materials: z.instanceof(FileList),
  title: z.string({
    message: "Повестка дня обязательный.",
  }),
  description: z.string({ message: "Текст повестки дня обязательный." }),
});

interface AddQuestionProps {
  isOpen: boolean;
  onOpenChange: (n: boolean) => void;
  number: number;
  onSubmit: (title: string, description: string, materials: FileList) => void;
}
const AddQuestion = ({
  onOpenChange,
  isOpen,
  number,
  onSubmit,
}: AddQuestionProps) => {
  const form = useForm<z.infer<typeof schemaQuestion>>();
  const [materials, setMaterials] = useState<FileList | null>(null);
  useEffect(() => {
    if (!materials) return;
    form.setValue("materials", materials);
  }, [materials, form]);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="w-full">
        <Button className="w-full" type="button">
          Добавить вопрос на повестку дня
        </Button>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent className="h-screen overflow-auto absolute z-50 top-0 left-1/2 -translate-x-1/2">
        <div className="max-w-[500px] w-full bg-white p-7 rounded-md my-[50%]">
          <DialogClose className="mt-0 right-5 absolute">
            <X size={32} />
          </DialogClose>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                onSubmit(data.title, data.description, data.materials)
              )}
            >
              <h3 className="mb-4 font-semibold text-3xl w-full text-left">
                Вопрос №{number}
              </h3>

              <div className="grid w-full gap-1.5 mb-5">
                <Label htmlFor="message">Повестка дня</Label>
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
              </div>
              <div className="grid w-full gap-1.5 mb-5">
                <Label htmlFor="message">Текст сообщения</Label>
                <Textarea
                  {...form.register("description")}
                  className="max-h-48"
                  placeholder="Введите сообщение...."
                />
              </div>
              {materials && (
                <ol className="flex flex-col gap-2 list-decimal mb-3">
                  {Array.from({ length: materials.length }).map((_, index) => {
                    const file = materials.item(index);
                    if (!file) return;
                    return (
                      <li className="flex justify-between">
                        <p>
                          {index + 1}. {file.name},{" "}
                          {((file.size || 0) / 1024).toFixed(1)} КБ
                        </p>
                        <Button
                          type="button"
                          onClick={() =>
                            setMaterials(() => {
                              // if (!prev) return prev;
                              const newItems = new DataTransfer();
                              for (let i = 0; i <= materials.length; i++) {
                                const file = materials.item(i);
                                if (i === index || !file) continue;
                                newItems.items.add(file);
                              }
                              return newItems.files;
                            })
                          }
                        >
                          <X />
                        </Button>
                      </li>
                    );
                  })}
                </ol>
              )}
              <Input
                onChange={(e) => setMaterials(e.target.files)}
                multiple
                type="file"
                className="mb-4"
              />
              <Button
                type="button"
                onClick={() => {
                  form.handleSubmit(({ title, materials, description }) =>
                    onSubmit(title, description, materials)
                  );
                }}
                className="ml-auto"
              >
                Добавить
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestion;
