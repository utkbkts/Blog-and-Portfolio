import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../utils/use-debounce";
import axiosInstance from "../../utils/axios";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async (search) => {
  const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { search },
  });
  return res.data;
};

const SearchPage = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [query, setQuery] = useState(search);
  const debounced = useDebounce(query, 300);
  const [isModalOpen, setModalOpen] = useState(false); // Modal durumu için state

  const { data, isError, error } = useQuery({
    queryKey: ["posts", debounced],
    queryFn: () => fetchPosts(debounced),
  });

  const handleSelect = (item) => {
    navigate(`/postList?search=${item.title}`);
    setModalOpen(false); // Modalı kapat
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setModalOpen(true); // Arama yapıldığında modalı aç
  };

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        name="search"
        placeholder="Search Title and Press Enter"
        className="bg-transparent outline-none text-white border-b"
        value={query}
        onChange={handleInputChange}
      />
      {isModalOpen && query.length > 0 && (
        <div className="absolute top-16 flex flex-col gap-4 w-[200px] bg-white rounded-md h-[200px] overflow-y-auto text-black">
          {data?.posts?.length > 0 ? (
            data?.posts?.map((item) => (
              <div
                key={item._id}
                onClick={() => handleSelect(item)}
                className="p-2 cursor-pointer hover:bg-slate-400 rounded-md"
              >
                <h3>{item.title}</h3>
              </div>
            ))
          ) : (
            <p className="text-gray-500 flex items-center justify-center h-full">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
