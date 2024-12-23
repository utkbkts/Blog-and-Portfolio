import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/global-routes";

const App = () => {
  return (
    <React.Fragment>
      <div>
        <RouterProvider router={router} />
      </div>
    </React.Fragment>
  );
};

export default App;
