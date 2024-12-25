import { Pencil, Trash } from "lucide-react";
const Response = () => {
  const response = false;
  return (
    <div className="pt-8  w-full border-l-2 border-l-blue-500 bg-slate-300 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="font-semibold text-lg">Ares Alexander(Admin)</span>
        <div className="flex items-center gap-3">
          <Pencil size={20} className="cursor-pointer" />
          <Trash size={20} className="cursor-pointer" />
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
        placeat cum mollitia consectetur et exercitationem nam. Ipsum sapiente
        autem minus excepturi, reprehenderit soluta officiis veniam, molestias,
        explicabo dicta tenetur asperiores.
      </p>

      {response && (
        <div className="flex flex-col gap-2 mt-4">
          <textarea
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
            placeholder="Write your answer here..."
          ></textarea>
          <button className="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Response;
