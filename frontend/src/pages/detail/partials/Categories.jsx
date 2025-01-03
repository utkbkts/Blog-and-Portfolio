import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axios";
import { Link } from "react-router-dom";

const fetchCategory = async () => {
  const res = await axiosInstance.get("/posts/categories");
  return res.data;
};

const Categories = () => {
  const { error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategory(),
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-2 ">
      {data?.categories?.map((item, index) => (
        <Link
          to={`/postList?category=${item}`}
          key={index}
          className="underline"
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
