import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Toaster } from 'react-hot-toast';
import "./App.css";
import "./index.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
