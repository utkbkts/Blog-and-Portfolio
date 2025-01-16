import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { HeaderLinks } from "./partials/header-data";
import MobileMenu from "./partials/MobileMenu";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/authApi";

const Header = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(100);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    await logout();
  };
  console.log("🚀 ~ Header ~ user:", user);

  return (
    <>
      <header
        className={`fixed  font-heading w-full   z-[999] shadow-xl h-32   transition-transform duration-300 ${
          isScrollingUp ? "navbar-visible bg-quaternary" : "navbar-hidden "
        } top-0`}
      >
        <div className=" items-center flex justify-between container mx-auto px-4">
          <div>
            <img
              src="/logo.png"
              alt="logo utku toygun"
              title="DevJourney - Software Developer"
              className="rounded-full w-36 h-36 object-cover"
            />
          </div>
          <ul className=" items-center gap-4  md:flex hidden text-[#fff]">
            {HeaderLinks.map((link, index) => (
              <Link to={link.url} key={index}>
                <li className={link.className}>{link.name}</li>
              </Link>
            ))}
            {user?.publicMetadata?.role === "admin" && (
              <li className="hidden md:block">
                <Link to={"/admin/create"}>Create</Link>
              </li>
            )}
            {user ? (
              <Button onClick={handleLogout}>Logout💋</Button>
            ) : (
              <Link to={"/auth/signin"}>
                <Button>Login🙌</Button>
              </Link>
            )}
          </ul>
        </div>
        <div className="absolute right-12 top-12 cursor-pointer md:hidden flex text-[#fff]">
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </header>
      <div className="md:hidden flex">
        {isMenuOpen && (
          <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        )}
      </div>
    </>
  );
};

export default Header;
