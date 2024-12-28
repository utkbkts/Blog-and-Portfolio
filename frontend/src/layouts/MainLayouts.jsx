import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const MainLayouts = () => {
  return (
    <div className="flex flex-col bg-quaternary ">
      <Header />
      <div className="flex-grow min-h-screen pt-32 container mx-auto p-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
