import { showErrorNotification } from "@/lib/helpers/notification";
import { Button } from "../ui/button";
import axios from "axios";

const ExportEmployeesButton = () => {
  const importFile = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_API}/load_employees`);
    } catch {
      showErrorNotification(
        "Не удалось загрузить список сотрудников, попробуйте позже."
      );
    }
  };
  return (
    <Button disabled={localStorage.getItem("role") !== "admin"}>
      <label style={{ lineHeight: 0 }}>
        <Button onClick={() => importFile()}>
          Экспорт сотрудников (Excel)
        </Button>
      </label>
    </Button>
  );
};

export default ExportEmployeesButton;
