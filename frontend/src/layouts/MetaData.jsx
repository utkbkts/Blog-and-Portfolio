import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - DevJourney`}</title>
    </Helmet>
  );
};

export default MetaData;
