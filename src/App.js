import PostList from "./components/dashboard/posts/PostList";
import TambahPost from "./components/dashboard/posts/TambahPost";
import Navbar from "./components/main/Navbar.js";
import EditPost from "./components/dashboard/posts/EditPost.js";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/main/Hero";
import PostArchive from "./components/archives/PostArchive";
import PostSingle from "./components/singles/PostSingle";
import Footer from "./components/main/Footer.js";
import Kelompok from "./components/tentang/Kelompok";
import Cta from "./components/main/Cta";
import UserList from "./components/dashboard/users/UserList.js";
import EditUser from "./components/dashboard/users/EditUser";
import TambahUser from "./components/dashboard/users/TambahUser.js";
import ListingPost from "./components/dashboard/listings/ListingPost";
import TambahListings from "./components/dashboard/listings/TambahListings";
import EditListing from "./components/dashboard/listings/EditListing";
import ListingSingle from "./components/singles/ListingSingle";
import ListingArchive from "./components/archives/ListingArchive";
import Register from "./components/main/Register";
import Login from "./components/main/Login";
import LupaPassword from "./components/main/LupaPassword"
import ResetPassword from "./components/main/ResetPassword"
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/posts" element={<PostList />} />

        <Route path="/blog" element={<PostArchive />} />

        <Route
          path="/tentang"
          element={
            <>
              <Hero />
              <Kelompok />
              <Cta />
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
              <Hero />
              <PostArchive />
              <Cta />
            </>
          }
        />

        <Route path="listings-dashboard" element={<ListingArchive />} />

        <Route path="/listings" element={<ListingPost />} />

        <Route path="post-listing" element={<TambahListings />} />

        <Route
          path="/listings-dashboard/edit-listing/:id"
          element={<EditListing />}
        />

        <Route path="/listings/:id" element={<ListingSingle />} />
        <Route path="tambah-post" element={<TambahPost />} />
        <Route path="edit-post/:id" element={<EditPost />} />
        <Route path="blog/:id" element={<PostSingle />} />
        <Route path="/users" element={<UserList />} />
        <Route path="edit-user/:id" element={<EditUser />} />
        <Route path="tambah-user" element={<TambahUser />} />
        <Route path="/forgot-password" element={<LupaPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
