import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../utils/use-debounce";
import { useGetAllPostsQuery } from "../../redux/api/postApi";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const [isModalOpen, setModalOpen] = useState(false);
  const { data, isLoading } = useGetAllPostsQuery();

  const handleSelect = (item) => {
    if (debounced) {
      navigate(`/postList?search=${encodeURIComponent(item.title)}`);
      setQuery("");
      setModalOpen(false);
    } else {
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setModalOpen(true);
  };
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
        placeholder="Başlık Ara and Enter'e bas"
        className="bg-transparent outline-none text-white border-b"
        value={query}
        onChange={handleInputChange}
      />
      {isModalOpen && query.length > 0 && (
        <div className="absolute top-16 flex flex-col gap-4 w-[200px] bg-white rounded-md h-[200px] overflow-y-auto text-black">
          {data?.posts?.length > 0 ? (
            data.posts.map((item) => (
              <div
                key={item._id}
                onClick={() => handleSelect(item)}
                className="p-2 cursor-pointer hover:bg-slate-400 rounded-md"
              >
                <h3>{item.title}</h3>
              </div>
            ))
          ) : isLoading ? (
            <div className="flex items-center flex-col justify-center h-full">
              Yükleniyor...
            </div>
          ) : (
            <p className="text-gray-500 flex items-center justify-center h-full">
              Sonuç bulunamadı
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
