import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddQuestion, { schemaQuestion } from "./AddQuestion";
import { useGetVerifiedEmployees } from "@/services/Employees/Employees";
import {
  useAddMeeting,
  useAddQuestionForMeeting,
} from "@/services/Meetings/Meetings";
import { showErrorNotification } from "@/lib/helpers/notification";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  place: z.string({
    message: "Место подведения итогов обязательное и должно быть строкой.",
  }),
  voting_datetime: z.date({ message: "Дата начала голосования обязательная." }),
  end_datetime: z.date({ message: "Дата окончания голосования обязательная." }),
  is_internal: z.boolean({ message: "Поле обязательное" }),
  counter: z.string(),
  questions: z.array(schemaQuestion),
});

const CreateMeetingPage = () => {
  const { data: users } = useGetVerifiedEmployees();
  const [addMeeting] = useAddMeeting();
  const [addQuestionForMeeting] = useAddQuestionForMeeting();
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { is_internal: false },
  });
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const id = await addMeeting({
      voting_datetime: values.voting_datetime.toISOString().slice(0, -1),
      end_datetime: values.end_datetime.toISOString().slice(0, -1),
      place: values.place,
      is_internal: values.is_internal,
      counter: values.counter,
    });
    for (let i = 0; i < values.questions.length; i++) {
      const files = new FormData();
      values.questions[i].materials.forEach((f) => files.append("file", f));
      addQuestionForMeeting({
        idMeeting: id.data || "",
        title: values.questions[i].title,
        description: values.questions[i].description,
        materials: files,
      });
    }
    try {
      navigate("/meetings");
    } catch {
      showErrorNotification("Ошибка при создании заседания");
    }
  };

  return (
    <>
      <Form {...form}>
        <h2 className="text-4xl font-bold text-center mt-4 mb-6">
          Создание заседания
        </h2>
        <form className="flex gap-7 max-md:flex-col-reverse">
          <div className="border-[1px] border-gray-300 p-4 rounded-xl  max-w-[600px] flex flex-col gap-6 sticky top-5 h-min">
            <h2 className="text-2xl font-semibold">Основная информация</h2>
            <FormField
              name={"place"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Место подведения итогов</FormLabel>
                  <FormControl>
                    <Input placeholder="г. Ростов-на-Дону" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-6">
              <FormField
                name={"voting_datetime"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Начало голосования</FormLabel>
                    <FormControl>
                      <DateTimePicker {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={"end_datetime"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Окончание голосования</FormLabel>
                    <FormControl>
                      <DateTimePicker {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name={"is_internal"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Формат голосования</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <p className="mr-2">Заочное</p>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <p className="ml-2">Очно-заочное (с применением ВКС)</p>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="counter"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Выбрать подсчитывающего..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {users?.map((el) => (
                        <SelectItem value={el.fio} key={el.id}>
                          {el.fio}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={() => {
                form.handleSubmit((meeting) => onSubmit(meeting))();
              }}
              type="button"
            >
              Создать
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <h2 className="text-2xl font-semibold mb-3">
              Вопросы на повестку дня
            </h2>
            {form.getValues()?.questions?.map((el, index) => (
              <AccordionItem
                key={index + new Date().getTime()}
                value={`item-${index}`}
              >
                <AccordionTrigger>
                  <h3 className="text-2xl text-justify">
                    <span className="text-3xl font-bold">#{index + 1}.</span>{" "}
                    {el.title}
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <h4 className="font-semibold text-[18px] mb-6">
                    Описание задачи:{" "}
                    <span className="text-[#666] text-[15px]">
                      {el.description}
                    </span>
                  </h4>
                  <h4 className="font-semibold text-[18px] mb-3">Материалы:</h4>
                  <ol>
                    {el.materials.map((item, index2) => (
                      <li>
                        <a href={URL.createObjectURL(item)}>
                          {index2 + 1}. {item?.name},{" "}
                          {((item?.size || 0) / 1024).toFixed(1)} КБ
                        </a>
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            ))}
            <AddQuestion
              isOpen={modalAddOpen}
              onOpenChange={setModalAddOpen}
              number={(form.getValues()?.questions?.length || 0) + 1}
              onSubmit={(
                title: string,
                description: string,
                materials: File[]
              ) => {
                console.log(form.getValues());
                form.setValue("questions", [
                  ...(form.getValues()?.questions || []),
                  { title, description, materials },
                ]);

                setModalAddOpen(false);
              }}
            />
          </Accordion>
        </form>
      </Form>
    </>
  );
};

export default CreateMeetingPage;
