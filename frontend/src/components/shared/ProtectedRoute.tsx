import { useMe } from "@/services/User/User";
import { showErrorNotification } from "@/lib/helpers/notification";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import Container from "../ui/container";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, error } = useMe();

  useEffect(() => {
    if (error) {
      showErrorNotification(`Ошибка: ${error}`);
      navigate("/login");
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <Container className="w-full h-[100vh] flex items-center justify-center">
        <Loader />
      </Container>
    );
  }

  return children;
};
