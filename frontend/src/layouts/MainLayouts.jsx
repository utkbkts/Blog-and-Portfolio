import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { FooterComponent } from "../components/footer/Footer";

const MainLayouts = () => {
  return (
    <div className="flex flex-col bg-quaternary ">
      <Header />
      <div className="flex-grow min-h-screen pt-32 container mx-auto p-10">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
};

export default MainLayouts;
