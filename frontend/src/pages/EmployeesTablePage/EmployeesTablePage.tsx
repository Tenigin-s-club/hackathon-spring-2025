import EmployeesTable from "@/components/shared/EmployeesTable";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  UnverifiedUsers,
  VerifiedUsers,
} from "@/services/OfficesOperations/OfficesOperations.type";
import { useCallback, useEffect, useState } from "react";
import {
  getVerEmployees,
  getUnVerEmployees,
} from "@/services/OfficesOperations/OfficesOperations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [verEmployeesData, setVerEmployeesData] = useState<VerifiedUsers[]>([]);
  const [unVerEmployeesData, setUnVerEmployeesData] = useState<
    UnverifiedUsers[]
  >([]);

  const updateData = useCallback(async () => {
    const dataVer = await getVerEmployees();
    setVerEmployeesData(dataVer);
    const dataUnver = await getUnVerEmployees();
    setUnVerEmployeesData(dataUnver);
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);
  return (
    <Container>
      <Tabs defaultValue="ver" className="">
        <TabsList className="grid w-full grid-cols-2 max-w-[300px]">
          <TabsTrigger value="ver">Сотрудники</TabsTrigger>
          <TabsTrigger value="unver">Заявки</TabsTrigger>
        </TabsList>
        <TabsContent value="ver">
          <EmployeesTable
            updateData={updateData}
            columns={columnsVer}
            data={verEmployeesData}
          />
        </TabsContent>
        <TabsContent value="unver">
          <EmployeesTable
            updateData={updateData}
            columns={columnsUnVer}
            data={unVerEmployeesData}
          />
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default EmployeesTableAdminPage;
