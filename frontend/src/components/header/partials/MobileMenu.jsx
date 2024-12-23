import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { HeaderLinks } from "./header-data";
import Button from "../../../ui/Button";
import UserMenu from "./UserMenu";
const MobileMenu = ({ setIsMenuOpen, isMenuOpen }) => {
  const user = true;

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
          <ul className="flex items-center flex-col gap-4 pt-28">
            {HeaderLinks.map((item, index) => (
              <a key={index} className={item.className}>
                {item.name}
              </a>
            ))}

            {user ? (
              <Button className={"bg-quaternary"}>Login🙌</Button>
            ) : (
              <>
                <UserMenu />
                <Button className={"bg-quaternary"}>Logout😒</Button>
              </>
            )}
          </ul>
        </div>
      </motion.div>
    </OutsideClickHandler>
  );
};

export default MobileMenu;
