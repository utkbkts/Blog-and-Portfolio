import { User } from "lucide-react";
import { useContext } from "react";
import { OnlineUsersContext } from "../../context/SocketContext";

const UserCount = () => {
  const { onlineUsers } = useContext(OnlineUsersContext);
  return (
    <div className="fixed bottom-1 right-4">
      <div className="bg-orange-400 h-12 w-12 rounded-md text-2xl text-white flex items-center justify-center">
        <User /> {onlineUsers?.length}
      </div>
    </div>
  );
};

export default UserCount;
