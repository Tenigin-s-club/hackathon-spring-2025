import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, House } from "lucide-react";
import LogoIcon from "@/assets/logo.svg";

const TopBar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  return (
    <div className="justify-between p-4 w-full items-center flex ">
      <Link to="/">
        <LogoIcon />
      </Link>

      <ul className="items-center justify-center gap-2 flex ">
        <li>
          <Button
            variant={pathname === `/` ? "default" : "secondary"}
            className="min-w-[150px] w-1/6"
            onClick={() => navigate("/")}
          >
            <House />
            Заседания
          </Button>
        </li>

        <li>
          <Button
            variant={pathname === `/employees/${id}` ? "default" : "secondary"}
            className="min-w-[150px] w-1/6"
            onClick={() => navigate(`/employees/${id}`)}
          >
            <Users /> Сотрудники
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default TopBar;
