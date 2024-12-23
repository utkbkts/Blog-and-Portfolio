import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { HeaderLinks } from "./partials/header-data";
import MobileMenu from "./partials/MobileMenu";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(100);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed  font-heading w-full  z-[999] shadow-xl h-24   transition-transform duration-300 ${
          isScrollingUp ? "navbar-visible" : "navbar-hidden"
        } top-0`}
      >
        <div className=" items-center flex justify-between container mx-auto pt-8">
          <div>
            <img
              src="/logo.png"
              alt="logo utku toygun"
              title="utku toygun bektasoglu"
              className="rounded-full w-12 h-12 object-cover"
            />
          </div>
          <ul className=" items-center gap-4  md:flex hidden text-[#fff]">
            {HeaderLinks.map((link, index) => (
              <li key={index} className={link.className}>
                {link.name}
              </li>
            ))}
            <SignedOut>
              <Link to={"/login"}>
                <Button>Login🙌</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
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
