import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useConfirmEmployee } from "@/services/Employees/Employees";
import {
  EmployeeRole,
  UnVerifiedUser,
  VerifiedUser,
} from "@/services/Employees/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
  children: ReactNode;
  user: UnVerifiedUser | VerifiedUser;
}

const FormSchema = z.object({
  role: z.string({
    required_error: "Пожалуйста выберите роль",
  }),
});

export function ConfirmEmployeeDialog({ children, user }: Props) {
  const [confirmEmployee] = useConfirmEmployee();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    confirmEmployee({
      id: user.id,
      roles: [data.role as EmployeeRole],
    });
    close();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Подтвердить регистрацию пользователя {user.fio}?
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Выберите роль для пользователя:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Роль" className="w-full" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="admin">Администратор</SelectItem>
                        <SelectItem value="member_union">
                          Член Совета директоров
                        </SelectItem>
                        <SelectItem value="member_comitet">
                          Член Комитета Совета директоров
                        </SelectItem>
                        <SelectItem value="secretar">Секретарь</SelectItem>
                        <SelectItem value="corporative_secretar">
                          Корпоративный секретарь
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit">Подтвердить</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
