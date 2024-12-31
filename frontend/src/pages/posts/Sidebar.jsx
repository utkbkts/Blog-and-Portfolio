import SearchPage from "../../components/search/Search";
import Categories from "../detail/partials/Categories";

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
      <div className="flex flex-col items-start gap-2 text-sm">
        <Categories />
      </div>
    </div>
  );
};

export default Sidebar;
