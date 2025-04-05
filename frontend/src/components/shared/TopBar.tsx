import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, House } from "lucide-react";
import LogoIcon from "@/assets/logo.png";
import { useSelector } from "react-redux";
import { showErrorNotification } from "@/lib/helpers/notification";
import { logout } from "@/services/AuthByEmail/AuthByEmail";
import { User } from "@/services/User/types";

const TopBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector((state: { user: User | null }) => state.user);

  return (
    <div className="justify-between p-4 w-full items-center flex ">
      <Link to="/">
        <img src={LogoIcon} className="max-w-32" />
      </Link>

      <ul className="items-center justify-center gap-2 flex ">
        <li>
          <Button
            variant={pathname === `/` ? "default" : "secondary"}
            className="min-w-[150px] w-1/6"
            onClick={() => navigate("/")}
          >
            <House />
            Главная
          </Button>
        </li>
        {user && user.role.includes("admin") && (
          <>
            <li>
              <Button
                variant={pathname === `/meetings` ? "default" : "secondary"}
                className="min-w-[150px] w-1/6"
                onClick={() => navigate("/meetings")}
              >
                <House />
                Заседания
              </Button>
            </li>

            <li>
              <Button
                variant={pathname === `/employees` ? "default" : "secondary"}
                className="min-w-[150px] w-1/6"
                onClick={() => navigate(`/employees`)}
              >
                <Users /> Сотрудники
              </Button>
            </li>
          </>
        )}
      </ul>
      <Button
        variant="secondary"
        className="bg-red-500 text-white hover:bg-red-700"
        onClick={async () => {
          try {
            await logout();
            navigate("/login");
          } catch {
            showErrorNotification("Не удалось выйти из аккаунта");
          }
        }}
      >
        Выйти
      </Button>
    </div>
  );
};

export default TopBar;
