import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import Container from "../ui/container";
import { fetchUser } from "@/store/ui/thunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { getRequests } from "@/store/ui/selectors";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { uiSelectors } from "@/store/ui";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const user = useSelector(uiSelectors.getUser);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const requests = useSelector(getRequests);

  useEffectOnce(() => {
    if (!user) dispatch(fetchUser(navigate));
  });

  if (requests["getUser"] === "pending") {
    return (
      <Container className="w-full h-[100vh] flex items-center justify-center">
        <Loader />
      </Container>
    );
  }

  return children;
};
