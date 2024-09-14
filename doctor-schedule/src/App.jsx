import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from "./pages/Calendar";

const router = createBrowserRouter([{ path: "/", element: <Calendar /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
