import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../utils/use-debounce";
const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const debounced = useDebounce(query, 300);

  useEffect(() => {
    const fetchRequest = async () => {
      if (!debounced) return;
      try {
        const res = await fetch(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );

        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const data = await res.json();
        setSearchData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchRequest();
  }, [debounced]);
  const handleSelect = (item) => {
    console.log("Selected Item:", item);

    navigate(`/details/${item.show.id}`);
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
        placeholder="Search and Press Enter"
        className="bg-transparent outline-none text-white "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query.length > 0 && (
        <div className="absolute top-16 flex flex-col gap-4 w-[200px] bg-white rounded-md h-[200px] overflow-y-auto text-black">
          {searchData.length > 0 ? (
            searchData?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(item)}
                  className="p-2 cursor-pointer hover:bg-slate-400 rounded-md"
                >
                  <h3>{item.show.name}</h3>
                </div>
              );
            })
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
