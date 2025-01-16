import { Outlet, useNavigate } from "react-router-dom";
const AdminLayouts = () => {
  let user;
  const navigate = useNavigate();
  if (user?.publicMetadata?.role !== "admin") {
    navigate("/");
    return null;
  }
  return (
    <div className="flex flex-col bg-quaternary ">
      <div className="flex-grow min-h-screen pt-32 container mx-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayouts;
