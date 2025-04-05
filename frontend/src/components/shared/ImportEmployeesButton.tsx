import { showErrorNotification } from "@/lib/helpers/notification";
import { Button } from "../ui/button";
import axios from "axios";
import { FormEvent } from "react";

const ImportEmployeesButton = () => {
  const importFile = async (files: FormEvent<HTMLInputElement>) => {
    if (!files.currentTarget.files) return;
    try {
      const formData = new FormData();
      formData.append("file", files.currentTarget.files[0]);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}auth/load_employees`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    } catch (e) {
      showErrorNotification(e as string);
    }
  };
  return (
    <Button disabled={localStorage.getItem("role") !== "admin"}>
      <label style={{ lineHeight: 0 }}>
        <input
          accept=".xlsx;type=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="w-0 h-0"
          type="file"
          onInput={(files) => importFile(files)}
        />
        <p>Импорт сотрудников (Excel)</p>
      </label>
    </Button>
  );
};

export default ImportEmployeesButton;
