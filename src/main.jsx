import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import { AuthGuard } from "./components/index.js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route
          path="/login"
          element={
            <AuthGuard authentication={false}>
              <Login />
            </AuthGuard>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthGuard authentication={false}>
              <Signup />
            </AuthGuard>
          }
        />

        <Route
          path="/all-posts"
          element={
            <AuthGuard authentication={true}>
              <AllPosts />
            </AuthGuard>
          }
        />
        <Route
          path="/add-post"
          element={
            <AuthGuard authentication={true}>
              <AddPost />
            </AuthGuard>
          }
        />
        <Route
          path="/edit-post/:slug"
          element={
            <AuthGuard authentication={true}>
              <EditPost />
            </AuthGuard>
          }
        />

        <Route path="/post/:slug" element={<Post />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
