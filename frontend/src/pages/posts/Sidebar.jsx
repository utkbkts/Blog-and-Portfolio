import { Link } from "react-router-dom";
import SearchPage from "../../components/search/Search";
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

const sortLinks = [
  {
    label: "Newest",
  },
  {
    label: "Most Popular",
  },
  {
    label: "Trending",
  },
  {
    label: "Oldest",
  },
];

const Sidebar = () => {
  return (
    <div className="px-4 h-max sticky top-8 text-slate-200">
      <h1 className="mb-1 text-xl mt-4 font-medium">Search</h1>
      <hr className="mb-4" />
      <SearchPage />
      <h1 className="mb-1 text-xl mt-4 font-medium">Filter</h1>
      <hr className="mb-4" />
      <div className="flex flex-col gap-2 text-sm">
        {sortLinks.map((item, index) => (
          <>
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="sort"
                value={item.label}
                className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-600"
              />
              {item.label}
            </label>
          </>
        ))}
      </div>
      <h1 className="mb-1 text-xl mt-4 font-medium">Categories</h1>
      <hr className="mb-4" />
      <div className="flex flex-col gap-2 text-sm">
        {MenuLinks.map((item, index) => (
          <Link key={index} className="underline" to={item.url}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
