import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, House, Menu, LogOut, Presentation } from "lucide-react";
import LogoIcon from "@/assets/logo.jpeg";
import { useSelector } from "react-redux";
import { showErrorNotification } from "@/lib/helpers/notification";
import { useLogout } from "@/services/AuthByEmail/AuthByEmail";
import { User } from "@/services/User/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const TopBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [logout] = useLogout();

  const user = useSelector((state: { user: User | null }) => state.user);

  return (
    <>
      <div className="max-md:hidden justify-between p-4 w-full items-center flex ">
        <Link to="/">
          <img src={LogoIcon} className="max-w-32" />
        </Link>
        <ul className="items-center justify-center gap-2 flex ">
          {/* <li>
            <Button
              variant={pathname === `/` ? "default" : "secondary"}
              className="min-w-[150px] w-1/6"
              onClick={() => navigate("/")}
            >
              <House />
              Главная
            </Button>
          </li> */}
          {user && user.role.includes("admin") && (
            <>
              <li>
                <Button
                  variant={pathname === `/meetings` ? "default" : "secondary"}
                  className="min-w-[150px] w-1/6"
                  onClick={() => navigate("/meetings")}
                >
                  <Presentation />
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
      <div className="md:hidden flex items-center justify-between py-3 md:py-5 md:block">
        <Link className="md:hidden" to="/">
          <img src={LogoIcon} className="max-w-32" />
        </Link>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="outline">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Меню</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/")}
              >
                <House />
                Главная
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(`/meetings`)}
              >
                <Presentation /> Заседания
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(`/employees`)}
              >
                <Users /> Сотрудники
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={async () => {
                  try {
                    await logout();
                    navigate("/login");
                  } catch {
                    showErrorNotification("Не удалось выйти из аккаунта");
                  }
                }}
              >
                <LogOut />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default TopBar;
