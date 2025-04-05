import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Title from "../ui/title";
import { registerFetch } from "@/services/AuthByEmail/AuthByEmail";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/lib/helpers/notification";

const formSchema = z.object({
  email: z.string().email({ message: "incorrect email" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  lastname: z
    .string()
    .min(2, { message: "Lastname must be at least 2 characters." }),
  middlename: z
    .string()
    .min(2, { message: "Middle name must be at least 2 characters." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    name,
    lastname,
    middlename,
    email,
    password,
  }: z.infer<typeof formSchema>) {
    try {
      await registerFetch(
        `${lastname || ""} ${name || ""} ${middlename || ""}`.trim(),
        email,
        password
      );
      navigate("/login");
      showSuccessNotification("Ваш аккаунт отправлен на проверку.");
    } catch {
      showErrorNotification(
        "Не удалось зарегистрироваться, попробуйте еще раз."
      );
    }
  }
  return (
    <div className="w-96 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col space-y-1.5 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
          <Title size="sm" text={"Регистрация"} />
          <p>Создайте учетную запись, введя ФИО, email и пароль!</p>
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder="Иванов" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Иван" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middlename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отчество</FormLabel>
                <FormControl>
                  <Input placeholder="Иванович" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Создать аккаунт
          </Button>
        </form>
      </Form>
      <a className="text-black mx-auto" href="/login">
        Есть аккаунт? Войти!
      </a>
    </div>
  );
};

export default RegisterForm;
