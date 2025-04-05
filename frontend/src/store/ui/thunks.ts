import { uiActions } from "@/store/ui";
import { AppDispatch } from "@/store/index";

import { NavigateFunction } from "react-router-dom";
import { fetchMe } from "@/services/User/User";
import { showErrorNotification } from "@/lib/helpers/notification";
import { getLocationQuery } from "@/lib/helpers/getLocationQuery";

export const fetchUser =
  (navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    dispatch(uiActions.setRequestStarted("getUser"));
    try {
      const user = await fetchMe();
      dispatch(uiActions.setUser(user));
    } catch {
      showErrorNotification("Ошибка при получении информации о пользователе");
      const backPath = getLocationQuery("back") || location.pathname.slice(1);
      const url = backPath ? `/login?back=${backPath}` : "/login";
      navigate(url);
      return;
    } finally {
      dispatch(uiActions.setRequestFinished("getUser"));
    }
  };
