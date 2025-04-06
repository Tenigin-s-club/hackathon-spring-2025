import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

import { Input } from "@/components/ui/input";

import ExportEmployeesButton from "./ExportEmployeesButton";

import { useDeleteEmployee } from "@/services/Employees/Employees";
import { ChartColumnBig, Check, Trash2, X } from "lucide-react";
import { useSelector } from "react-redux";
import { UnVerifiedUser, VerifiedUser } from "@/services/Employees/types";
import { User } from "@/services/User/types";
import { ConfirmEmployeeDialog } from "./ConfirmEmployeeDialog";

interface Props<TValue> {
  columns: ColumnDef<UnVerifiedUser | VerifiedUser, TValue>[];
  data: UnVerifiedUser[] | VerifiedUser[];
  isRequest: boolean;
}

function EmployeesTable<TValue>({ columns, data, isRequest }: Props<TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [deleteEmployee] = useDeleteEmployee();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const user = useSelector((state: { user: User | null }) => state.user);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const deleteFunc = async (id: string) => {
    deleteEmployee(id);
  };

  return (
    <div>
      <div className="flex items-center py-4 justify-between gap-2 flex-wrap">
        <Input
          placeholder="Искать по ФИО..."
          value={(table.getColumn("fio")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fio")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex gap-4">
          <>
            <ExportEmployeesButton />
          </>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, id) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                  {user?.role.includes("admin") ? (
                    <TableCell className="flex items-center justify-evenly gap-2">
                      {isRequest ? (
                        <>
                          <X
                            onClick={() => deleteFunc(data[id]?.id)}
                            color="#DC2626"
                            className="cursor-pointer"
                          />
                          <ConfirmEmployeeDialog user={data[Number(row.id)]}>
                            <Check color="#16a34a" />
                          </ConfirmEmployeeDialog>
                        </>
                      ) : (
                        <>
                          <ChartColumnBig color="#111111" />
                          <Trash2
                            color="#DC2626"
                            className="cursor-pointer"
                            onClick={() => deleteFunc(data[id]?.id)}
                          />
                        </>
                      )}
                    </TableCell>
                  ) : (
                    <TableCell className="opacity-40 flex items-center justify-between gap-2">
                      <ChartColumnBig color="#111111" />
                      <Trash2 color="#DC2626" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Результаты не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default EmployeesTable;
