import Button from "../../../ui/Button";
import Comment from "./Comment";

const Comments = () => {
  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-white ">Comments</h1>
      <hr className="text-white" />
      <div className="flex items-center justify-between gap-8 w-full">
        <textarea
          placeholder="Write a comment..."
          className="w-full p-4 rounded-xl outline-none"
        />
        <Button className={"text-white"}>Send</Button>
      </div>
      <Comment />
    </div>
  );
};

export default Comments;
