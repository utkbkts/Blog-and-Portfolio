import { Link } from "react-router-dom";
import { usePostGetCategoryAllQuery } from "../../../redux/api/postApi";
import _ from "lodash";
import { charUpperCase } from "../../../helpers/helpers";
const MainCategories = () => {
  const { data } = usePostGetCategoryAllQuery();
  return (
    <div className="hidden md:flex bg-black text-gray-700 rounded-3xl xl:rounded-full p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 items-center justify-center gap-10">
      {/* Links */}
      <div className="flex items-center justify-center flex-wrap gap-6">
        {data?.categories?.map((item) => (
          <div key={_.uniqueId("category_")} className="group">
            <Link
              to={`/postList?category=${item}`}
              className="block px-5 py-2.5 text-sm font-medium rounded-full bg-gray-50 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 group-hover:scale-105 transition-all duration-200 ease-in-out"
            >
              {charUpperCase(item)}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCategories;
