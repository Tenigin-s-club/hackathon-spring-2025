import { meFetch } from "@/services/User/User";
import { showErrorNotification } from "@/lib/helpers/notification";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import Container from "../ui/container";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        await meFetch();
      } catch (error) {
        showErrorNotification(`Ошибка: ${error}`);
        navigate("/login");
      }
    })();
    setIsLoading(false);
  }, [navigate]);

  if (isLoading)
    return (
      <Container className="w-full h-[100vh] flex items-center justify-center">
        <Loader />
      </Container>
    );

  return children;
};
