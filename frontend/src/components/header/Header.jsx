import { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import { HeaderLinks } from "./partials/header-data";
import MobileMenu from "./partials/MobileMenu";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/authApi";
import { useVerifyReplyMutation } from "../../redux/api/userApi";
import lodash from "lodash";

const Header = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const lastScrollY = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [logout, { error, isSuccess, isError }] = useLogoutMutation();
  const [verifyEmail] = useVerifyReplyMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (isSuccess) {
      toast.success("Logout success!!");
    }
  }, [isSuccess, error, isError]);

  const handleScroll = lodash.throttle(() => {
    const currentScroll = Math.round(window.scrollY);

    if (currentScroll === 0) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(lastScrollY.current > currentScroll);
    }

    lastScrollY.current = currentScroll;
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleVerify = async () => {
    await verifyEmail();
    toast.success("Verification email sent. Please check your inbox!");
  };
  return (
    <>
      <header
        className={`fixed !top-0  font-heading w-full max-md:bg-quaternary max-md:translate-y-0  z-[999] shadow-xl h-32 transition-transform duration-300 ${
          isScrollingUp ? "translate-y-0 bg-quaternary" : "-translate-y-[100%]"
        } `}
      >
        <div className=" items-center flex justify-between container mx-auto px-4">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo utku toygun"
              title="DevJourney - Software Developer"
              className="rounded-full w-36 h-36 object-cover"
            />
          </Link>
          <ul className=" items-center gap-4  mds:flex hidden text-[#fff]">
            {HeaderLinks.map((link, index) => (
              <Link to={link.url} key={index}>
                <li className={link.className}>{link.name}</li>
              </Link>
            ))}
            {user?.role === "admin" && (
              <li className="hidden mds:block">
                <Link to={"/admin/create"}>Oluştur</Link>
              </li>
            )}
            {user && <Button onClick={handleLogout}>Logout✨</Button>}
            {(user?.user?.isVerified === "false" && user?.user) && (
              <Link to={"/verify-email"} onClick={handleVerify}>
                <Button>Verify Email</Button>
              </Link>
            )}
            {(!user?.user && !user) && (
              <Link to={"/login"}>
                <Button>Login🙌</Button>
              </Link>
            )}
          </ul>
        </div>
        <div className="absolute right-12 top-12 cursor-pointer mds:hidden flex text-[#fff]">
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </header>
      <div className="mds:hidden flex">
        {isMenuOpen && (
          <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        )}
      </div>
    </>
  );
};

export default Header;
