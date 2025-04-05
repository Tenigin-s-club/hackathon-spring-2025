import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import Container from "../ui/container";
import { fetchUser } from "@/store/ui/thunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getRequests } from "@/store/ui/selectors";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const requests = useSelector(getRequests);
  useEffect(() => {
    dispatch(fetchUser(navigate));
  }, [dispatch, navigate]);

  if (requests["getUser"] === "pending") {
    return (
      <Container className="w-full h-[100vh] flex items-center justify-center">
        <Loader />
      </Container>
    );
  }

  return children;
};
