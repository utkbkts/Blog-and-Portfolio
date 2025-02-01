import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const OnlineUsersContext = createContext();

export const OnlineUsersProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_API_URL);

    setOnlineUsers(newSocket);

    newSocket.on("onlineUsers", (count) => {
      setOnlineUsers(count);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};
