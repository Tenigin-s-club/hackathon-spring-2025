import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useEffect, useState } from "react";
import { getVerEmployees } from "@/services/OfficesOperations/OfficesOperations";
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
import { VerifiedUsers } from "@/services/OfficesOperations/OfficesOperations.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddQuestion, { schemaQuestion } from "./AddQuestion";

const schema = z.object({
  place: z.string({
    message: "Место подведения итогов обязательное и должно быть строкой.",
  }),
  voting_datetime: z.date({ message: "Дата начала голосования обязательная." }),
  end_datetime: z.date({ message: "Дата окончания голосования обязательная." }),
  is_internal: z.boolean({ message: "Поле обязательное" }),
  counter: z.string({ message: "Обязательно выбрать подсчитывающего голоса." }),
  questions: z.array(schemaQuestion),
});

const CreateMeetingPage = () => {
  const [users, setUsers] = useState<VerifiedUsers[]>([]);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const { handleSubmit, ...form } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    (async () => {
      const data = await getVerEmployees();
      setUsers(data);
    })();
  }, []);

  return (
    <>
      <Form handleSubmit={handleSubmit} {...form}>
        <form className="flex gap-7">
          <div className="h-full">
            <div className="max-w-[600px] flex flex-col gap-6 sticky top-11 h-min">
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
              <div className="flex">
                <p className="mr-2">Заочное</p>
                <Switch />
                <p className="ml-2">Очно-заочное (с применением ВКС)</p>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={"Выбрать подсчитывающего..."} />
                </SelectTrigger>
                <SelectContent>
                  {users.map((el) => (
                    <SelectItem value={el.id} key={el.id}>
                      {el.fio}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>Создать</Button>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AddQuestion
              isOpen={modalAddOpen}
              onOpenChange={setModalAddOpen}
              number={(form.getValues()?.questions?.length || 0) + 1}
              onSubmit={(
                title: string,
                description: string,
                materials: FileList
              ) => {
                console.log(title, description, materials);
                // form.setValue("questions", [
                //   ...(form.getValues()?.questions || []),
                //   question,
                // ]);
              }}
            />
          </Accordion>
        </form>
      </Form>
    </>
  );
};

export default CreateMeetingPage;
