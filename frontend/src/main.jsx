import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.jsx";
import { userApi } from "./redux/api/userApi.jsx";
import { OnlineUsersProvider } from "./context/SocketContext.jsx";
store.dispatch(userApi.endpoints.getUser.initiate(""));
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <OnlineUsersProvider>
        <App />
        <ToastContainer
          position="top-right"
          theme="dark"
          pauseOnHover={false}
          autoClose={2000}
        />
      </OnlineUsersProvider>
    </Provider>
  </StrictMode>
);
