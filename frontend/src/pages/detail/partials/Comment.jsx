import Image from "../../../components/image/Image";
import Response from "./Response";
import { Pencil, Trash } from "lucide-react";

const Comment = () => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Image
          src={"/featured1.jpeg"}
          className={"w-10 h-10 rounded-full object-cover"}
          w="40"
        />
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-slate-500">2 days ago</span>
        <div className="flex items-center gap-3">
          <Pencil size={20} className="cursor-pointer" />
          <Trash size={20} className="cursor-pointer" />
        </div>
      </div>
      <div className="mt-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          adipisci, odio repellendus ratione earum similique recusandae vero
          eius? Maiores beatae reprehenderit aliquid voluptate voluptas
          laudantium veniam culpa nostrum earum quod corporis ipsam, architecto
          error modi voluptatum ut, mollitia sit sunt consequuntur temporibus?
          In nulla repellendus maiores dignissimos. Natus, distinctio
          voluptatem?
        </p>
      </div>
      <div className="mt-8 mx-12">
        <Response />
      </div>
    </div>
  );
};

export default Comment;
