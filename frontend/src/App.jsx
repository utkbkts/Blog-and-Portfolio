import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/global-routes";

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <div>
        <RouterProvider router={router} />
      </div>
    </React.Fragment>
  );
};

export default App;
