import { Outlet } from "react-router-dom";

const AdminLayouts = () => {
  return (
    <div className="flex flex-col bg-quaternary ">
      <div className="flex-grow min-h-screen pt-32 container mx-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayouts;
