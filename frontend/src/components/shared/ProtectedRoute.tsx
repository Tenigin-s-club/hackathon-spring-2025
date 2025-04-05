import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import Container from "../ui/container";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { useGetMe } from "@/services/AuthByEmail/AuthByEmail";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useGetMe();

  const navigate = useNavigate();

  useEffectOnce(() => {
    // if (!isLoading && !data) navigate("/login"); TODO
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
