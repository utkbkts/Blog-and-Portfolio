import { useUser } from "@clerk/clerk-react";
import Loading from "../../../components/Loading";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import SelectInput from "../../../ui/SelectInput";
import TextArea from "../../../ui/TextArea";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const AdminCreate = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <Loading />;
  }

  if (isLoaded && !isSignedIn) {
    return <h1>You should login</h1>;
  }

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  return (
    <div className="h-screen">
      <h1 className="text-2xl text-white text-center pb-4">
        Create a New Post
      </h1>
      <form className="flex flex-col gap-6 p-4">
        <Button type={"button"} className={"text-white w-1/4"}>
          Add a cover image
        </Button>
        <Input name="story" type={"text"} placeholder={"My Awesome Story"} />
        <div className="">
          <SelectInput options={options} placeholder="Choose a fruit" />
        </div>
        <div>
          <TextArea
            rows={5}
            placeholder={"Title"}
            name="title"
            className={"resize-none"}
          />
        </div>
        <ReactQuill
          theme="snow"
          className="text-black flex-1 bg-white shadow-lg "
          placeholder="Write your story here..."
        />
        <div>
          <Button type={"submit"} className={"text-white"}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreate;
