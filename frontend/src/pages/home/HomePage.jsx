import BreadCrump from "./partials/BreadCrump";
import FeaturesBlogs from "./partials/FeaturesBlogs";
import FeaturesProjects from "./partials/FeaturesProjects";
import Introduction from "./partials/Introduction";
import MainCategories from "./partials/MainCategories";
import Slider from "./partials/Slider";

const HomePage = () => {
  return (
    <div className="text-[#fff] pt-12">
      {/* BreadCrumb */}
      <div>
        <BreadCrump />
      </div>
      {/* Introduction */}
      <div>
        <Introduction />
      </div>
      {/* Main Category */}
      <div>
        <MainCategories />
      </div>
      {/* FeaturesBlogs */}
      <div className="pb-4">
        <h1 className="font-bold text-3xl p-8">My Blogs</h1>
        <FeaturesBlogs />
      </div>
      {/* FeaturesProjects */}
      <div>
        <Slider />
      </div>
      <div>
        <h1 className="font-bold text-3xl p-8">My Projects</h1>
        <FeaturesProjects />
      </div>
    </div>
  );
};

export default HomePage;
