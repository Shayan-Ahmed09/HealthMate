import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import "./pages/Home/home.CSS";
import About from "./pages/Dashboard/Dashboard.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
// import Dashboard from "./pages/Dashboard/Dashboard.jsx";
// import User from "./components/User/User.jsx";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="user/:userid" element={<User />} /> */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
