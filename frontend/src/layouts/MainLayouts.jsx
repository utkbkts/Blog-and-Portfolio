import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { FooterComponent } from "../components/footer/Footer";

const MainLayouts = () => {
  return (
    <div className="flex flex-col items-center justify-center !mt-[8rem] bg-quaternary ">
      <Header />
      <div className="flex-grow min-h-screen  container mx-auto p-10 !pt-4">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
};

export default MainLayouts;
