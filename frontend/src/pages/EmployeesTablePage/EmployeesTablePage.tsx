import EmployeesTable from "@/components/shared/EmployeesTable";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetUnVerEmployees,
  useGetVerifiedEmployees,
} from "@/services/Employees/Employees";
import Loader from "@/components/shared/Loader/Loader";

export interface UnverifiedUsers {
  id: string;
  email: string;
  fio: string;
}

export interface VerifiedUsers extends UnverifiedUsers {
  role: (
    | "member_union"
    | "member_comitet"
    | "admin"
    | "secretar"
    | "corporative_secretar"
  )[];
}

const columnsUnVer: ColumnDef<UnverifiedUsers>[] = [
  {
    accessorKey: "fio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ФИО
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Почта
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
const columnsVer: ColumnDef<UnverifiedUsers>[] = [
  ...columnsUnVer,
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Роль
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const EmployeesTableAdminPage = () => {
  const { data: unVerEmployees, isLoading } = useGetUnVerEmployees();
  const { data: verifiedEmployees } = useGetVerifiedEmployees();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <Tabs defaultValue="ver" className="">
        <TabsList className="grid w-full grid-cols-2 max-w-[300px]">
          <TabsTrigger value="ver">Сотрудники</TabsTrigger>
          <TabsTrigger value="unver">Заявки</TabsTrigger>
        </TabsList>
        <TabsContent value="ver">
          <EmployeesTable
            isRequest={false}
            columns={columnsVer}
            data={verifiedEmployees || []}
          />
        </TabsContent>
        <TabsContent value="unver">
          <EmployeesTable
            isRequest={true}
            columns={columnsUnVer}
            data={unVerEmployees || []}
          />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default EmployeesTableAdminPage;
