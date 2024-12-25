import { Link, useLocation } from "react-router-dom";

const MenuLinks = [
  {
    url: "/",
    label: "All",
  },
  {
    url: "/posts?cat=database",
    label: "Database",
  },
  {
    url: "/posts?cat=react",
    label: "React.JS",
  },
  {
    url: "/posts?cat=nodejs",
    label: "Node.JS",
  },
  {
    url: "/posts?cat=javascript",
    label: "Javascript",
  },
  {
    url: "/posts?cat=typescript",
    label: "Typescript",
  },
  {
    url: "/posts?cat=go",
    label: "Go",
  },
  {
    url: "/posts?cat=python",
    label: "Python",
  },
  {
    url: "/posts?cat=cyber-security",
    label: "Cyber Security",
  },
];

const MainCategories = () => {
  const location = useLocation().pathname;
  return (
    <div className="hidden md:flex bg-white text-quaternary rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* Links */}
      <div className="lg:flex-1 flex items-center justify-between flex-wrap">
        {MenuLinks.map((item, index) => (
          <>
            <Link
              key={index}
              to={item.url}
              className={
                item.url === location
                  ? "bg-blue-800 text-white px-4 py-2 rounded-full "
                  : "hover:bg-slate-200 px-4 py-2 rounded-full "
              }
            >
              {item.label}
            </Link>
          </>
        ))}
      </div>
      <span className="text-xl font-medium">|</span>
      {/* Search */}
      <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-gray-600"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search and Press Enter"
          className="bg-transparent focus:outline-none w-full text-sm"
        />
      </div>
    </div>
  );
};

export default MainCategories;
