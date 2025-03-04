import { Link } from "react-router-dom";
import { usePostGetCategoryAllQuery } from "../../../redux/api/postApi";
import _ from "lodash";
const MainCategories = () => {
  const { data } = usePostGetCategoryAllQuery();
  return (
    <div className="hidden md:flex bg-white text-quaternary rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* Links */}
      <div className="lg:flex-1 flex items-center justify-center ">
        {data?.categories?.map((item) => (
          <div key={_.uniqueId("category_")}>
            <Link
              to={`/postList?category=${item}`}
              className={"hover:bg-slate-200 px-4 py-2 rounded-full "}
            >
              {item}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCategories;
