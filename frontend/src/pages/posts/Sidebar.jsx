import SearchPage from "../../components/search/Search";
import Categories from "../detail/partials/Categories";

const Sidebar = () => {
  return (
    <div className="px-4 h-max sticky top-8 text-slate-200">
      <h1 className="mb-1 text-xl mt-4 font-medium">Ara</h1>
      <hr className="mb-4" />
      <SearchPage />
      <h1 className="mb-1 text-xl mt-4 font-medium">Kategoriler</h1>
      <hr className="mb-4" />
      <div className="flex flex-col items-start gap-2 text-sm">
        <Categories />
      </div>
    </div>
  );
};

export default Sidebar;
