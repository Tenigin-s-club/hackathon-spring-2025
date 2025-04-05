import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import Container from "../ui/container";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useGetMe } from "@/services/AuthByEmail/AuthByEmail";
import { showErrorNotification } from "@/lib/helpers/notification";
import axios from "axios";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useGetMe();

  const navigate = useNavigate();

  useEffectOnce(() => {
    (async () => {
      console.log(await axios.get("https://huisos.ru/api/auth/me"));
    })();
    if (!isLoading && !data) {
      showErrorNotification("Не удалось получить информацию о пользователе.");
      navigate("/login");
    }
  });

  if (isLoading) {
    return (
      <Container className="w-full h-[100vh] flex items-center justify-center">
        <Loader />
      </Container>
    );
  }

  return children;
};
