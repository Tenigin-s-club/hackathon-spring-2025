import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { appRoutersConfig } from "./lib/config/RouteConfig/RouteConfig";
import { Suspense } from "react";
import Loader from "./components/shared/Loader/Loader";

function App() {
  if (typeof requestIdleCallback !== "function") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.requestIdleCallback = function (callback) {
      return setTimeout(function () {
        callback({
          didTimeout: false,
          timeRemaining: function () {
            return 50;
          },
        });
      }, 1);
    };

    window.cancelIdleCallback = function (id) {
      clearTimeout(id);
    };
  }

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader />
        </div>
      }
    >
      <ToastContainer />
      <RouterProvider router={appRoutersConfig} />
    </Suspense>
  );
}

export default App;
