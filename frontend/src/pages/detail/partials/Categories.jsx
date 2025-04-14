import { Link } from "react-router-dom";
import { usePostGetCategoryAllQuery } from "../../../redux/api/postApi";

const Categories = () => {
  const { data } = usePostGetCategoryAllQuery();

  return (
    <div className="flex flex-col gap-2 ">
      {data?.categories?.map((item, index) => (
        <Link
          to={`/postList?category=${item}`}
          key={index}
          className="underline !text-blue-400"
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
