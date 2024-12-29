import Image from "../../components/image/Image";
import { Link } from "react-router-dom";
import Sidebar from "./partials/Sidebar";
import Comments from "./partials/Comments";
import axiosInstance from "../../utils/axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchDetails = async (title, id) => {
  const res = await axiosInstance.get(`/posts/${title}/${id}`);
  return res.data;
};

const DetailPage = () => {
  const { title, id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["details", title, id],
    queryFn: () => fetchDetails(title, id),
    retry: false,
  });
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-8 pt-12">
      {/* detial */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>Written By</span>
            <Link to={"/"} className="text-blue-400 underline">
              Utku Toygun Bektasoglu
            </Link>
            <span>on</span>
            <Link to={"/blog"} className="text-blue-400 underline">
              Software Development
            </Link>
            <span>2 days ago</span>
          </div>
          <p className="text-slate-300 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            similique porro obcaecati perferendis earum illum velit natus,
            laudantium at harum possimus tenetur illo molestias voluptatum magni
            commodi qui, aliquam repudiandae? Eligendi, voluptas et magni vel
            cupiditate dignissimos iusto dicta debitis quisquam ratione
            perferendis, veniam eveniet odio sapiente quo molestias tempora.
          </p>
        </div>
        <div className="hidden lg:block w-2/5">
          <Image src={"/featured1.jpeg"} alt={"image"} />
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="lg:text-lg flex flex-col gap-6 text-slate-300">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            earum reiciendis magni, ducimus libero, similique omnis impedit est
            dolor commodi eveniet numquam culpa corporis aperiam suscipit dicta.
            Odit quisquam error cupiditate expedita perferendis tenetur
            reiciendis nesciunt fuga laboriosam rerum consequatur, voluptates
            nisi provident magni eos similique, mollitia iure aliquid harum! Ab
            necessitatibus rem ipsum eum dolores sunt repudiandae molestiae, est
            eligendi a deserunt recusandae, laudantium exercitationem soluta
            ratione? Quia alias saepe possimus rem, voluptatem vitae
            exercitationem libero consectetur facilis hic nulla voluptas iste
            sunt in nihil odit aliquam dolores modi iusto. Maiores voluptatem
            quod ullam nulla voluptates dignissimos nostrum similique sunt
            libero possimus? Totam sed nulla cumque repellat sunt, doloremque
            veniam, facilis autem, accusamus a cupiditate dolorem perspiciatis
            expedita libero eveniet beatae at officiis dolores impedit ut dolor
            distinctio neque ea quia. Vero aspernatur dolorum distinctio hic
            impedit ducimus tenetur atque, amet totam temporibus. Doloremque sed
            maxime optio adipisci nobis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            earum reiciendis magni, ducimus libero, similique omnis impedit est
            dolor commodi eveniet numquam culpa corporis aperiam suscipit dicta.
            Odit quisquam error cupiditate expedita perferendis tenetur
            reiciendis nesciunt fuga laboriosam rerum consequatur, voluptates
            nisi provident magni eos similique, mollitia iure aliquid harum! Ab
            necessitatibus rem ipsum eum dolores sunt repudiandae molestiae, est
            eligendi a deserunt recusandae, laudantium exercitationem soluta
            ratione? Quia alias saepe possimus rem, voluptatem vitae
            exercitationem libero consectetur facilis hic nulla voluptas iste
            sunt in nihil odit aliquam dolores modi iusto. Maiores voluptatem
            quod ullam nulla voluptates dignissimos nostrum similique sunt
            libero possimus? Totam sed nulla cumque repellat sunt, doloremque
            veniam, facilis autem, accusamus a cupiditate dolorem perspiciatis
            expedita libero eveniet beatae at officiis dolores impedit ut dolor
            distinctio neque ea quia. Vero aspernatur dolorum distinctio hic
            impedit ducimus tenetur atque, amet totam temporibus. Doloremque sed
            maxime optio adipisci nobis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            earum reiciendis magni, ducimus libero, similique omnis impedit est
            dolor commodi eveniet numquam culpa corporis aperiam suscipit dicta.
            Odit quisquam error cupiditate expedita perferendis tenetur
            reiciendis nesciunt fuga laboriosam rerum consequatur, voluptates
            nisi provident magni eos similique, mollitia iure aliquid harum! Ab
            necessitatibus rem ipsum eum dolores sunt repudiandae molestiae, est
            eligendi a deserunt recusandae, laudantium exercitationem soluta
            ratione? Quia alias saepe possimus rem, voluptatem vitae
            exercitationem libero consectetur facilis hic nulla voluptas iste
            sunt in nihil odit aliquam dolores modi iusto. Maiores voluptatem
            quod ullam nulla voluptates dignissimos nostrum similique sunt
            libero possimus? Totam sed nulla cumque repellat sunt, doloremque
            veniam, facilis autem, accusamus a cupiditate dolorem perspiciatis
            expedita libero eveniet beatae at officiis dolores impedit ut dolor
            distinctio neque ea quia. Vero aspernatur dolorum distinctio hic
            impedit ducimus tenetur atque, amet totam temporibus. Doloremque sed
            maxime optio adipisci nobis!
          </p>
        </div>
        {/* menu */}
        <Sidebar post={data} />
      </div>
      <Comments postId={id} title={title} />
    </div>
  );
};

export default DetailPage;
