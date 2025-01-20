import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayouts = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.role !== "admin") {
        navigate("/");
      }
      setIsLoading(false);
    }
  }, [user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-quaternary h-full">
      <div className="flex-grow min-h-screen pt-32 container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayouts;
