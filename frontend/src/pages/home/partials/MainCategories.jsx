import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";

const fetchCategory = async () => {
  const res = await axiosInstance.get("/posts/categories");
  return res.data;
};

const MainCategories = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategory(),
    retry: false,
  });
  if (isPending) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="hidden md:flex bg-white text-quaternary rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* Links */}
      <div className="lg:flex-1 flex items-center justify-between flex-wrap">
        {data?.categories?.map((item, index) => (
          <>
            <Link
              key={index}
              to={`/postList?=cat=${item}`}
              className={"hover:bg-slate-200 px-4 py-2 rounded-full "}
            >
              {item}
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
