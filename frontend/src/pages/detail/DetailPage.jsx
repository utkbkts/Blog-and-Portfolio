import { Link } from "react-router-dom";
import Sidebar from "./partials/Sidebar";
import Comments from "./partials/Comments";
import { useParams } from "react-router-dom";
import { generateSlug, getDateLocal } from "../../helpers/helpers";
import Loading from "../../components/Loading";
import { usePostByIdQuery } from "../../redux/api/postApi";
import { useSelector } from "react-redux";
import MetaData from "../../layouts/MetaData";

import parse from "html-react-parser";
import DOMPurify from "dompurify";

const DetailPage = () => {
  const { title, postId } = useParams();

  const { data, error, isLoading } = usePostByIdQuery({
    title,
    postId,
  });
  console.log("🚀 ~ DetailPage ~ data:", data);
  const { user } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <>
      <MetaData title={generateSlug(title)} />
      <div className="flex flex-col gap-8 pt-12">
        {/* detial */}
        <div className="flex gap-8">
          <div className="lg:w-3/5 flex flex-col gap-8">
            <h1 className="md:text-3xl text-md font-bold text-white">
              {data?.title}
            </h1>
            <div className="flex items-center gap-2 text-white text-sm flex-wrap">
              <span className="text-blue-400 underline">
                {data?.user?.username}
              </span>
              <span>By</span>
              {Array.isArray(data?.category) ? (
                data?.category?.map((cat, index) => (
                  <>
                    <Link
                      key={index}
                      to={`/postList?category=${encodeURIComponent(cat)}`}
                      className="text-blue-400 underline"
                    >
                      {cat}
                      {index !== data?.category?.length - 1 && ","}
                    </Link>
                  </>
                ))
              ) : (
                <Link
                  to={`/postList?category=${data?.category}`}
                  className="text-blue-400 underline"
                >
                  {data?.category}
                </Link>
              )}
              <span>{getDateLocal(data?.createdAt)}</span>
            </div>
            <p className="text-white font-medium">{data?.desc}</p>
          </div>
          <div className="hidden lg:block w-2/5">
            <img
              src={data?.img?.url}
              alt={"image"}
              className="object-cover h-[400px] w-full"
            />
          </div>
        </div>
        {/* content */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between">
          <div className="lg:text-lg flex flex-col gap-6 text-white blog-view">
            {parse(DOMPurify.sanitize(data?.content))}
          </div>
          {/* menu */}
          <div>
            <Sidebar post={data} />
          </div>
        </div>
        {user && user.isVerified === "true" ? (
          <Comments postId={postId} title={title} />
        ) : (
          <h1 className="text-center text-white text-2xl font-bold pt-12">
            <hr />
            {!user
              ? "Log in now to comment"
              : user.isVerified === "false"
              ? "Please verify your account"
              : null}
          </h1>
        )}
      </div>
    </>
  );
};

export default DetailPage;
