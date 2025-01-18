import { Link } from "react-router-dom";
import {useEffect} from "react"
import OutsideClickHandler from "react-outside-click-handler";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { HeaderLinks } from "./header-data";
import Button from "../../../ui/Button";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../../redux/api/userApi";
const MobileMenu = ({ setIsMenuOpen, isMenuOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const [logout, { error, isSuccess, isError }] = useLogoutMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (isSuccess) {
      toast.success("Logout is successfully !!");
    }
  }, [isSuccess, error, isError]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsMenuOpen(false)}>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut", staggerChildren: 0.2 }}
        className="fixed z-[9999] top-0 right-0 bg-black h-full w-[250px]"
      >
        <div className="p-4">
          <X
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#fff] cursor-pointer"
          />
          <ul className="flex items-center flex-col gap-4 pt-28 text-[#fff]">
            {HeaderLinks.map((item, index) => (
              <Link to={item.url} key={index} className={item.className}>
                {item.name}
              </Link>
            ))}
            {user ? (
              <Button onClick={handleLogout}>Logout✨</Button>
            ) : (
              <Link to={"/auth/signin"}>
                <Button>Login🙌</Button>
              </Link>
            )}
          </ul>
        </div>
      </motion.div>
    </OutsideClickHandler>
  );
};

export default MobileMenu;
