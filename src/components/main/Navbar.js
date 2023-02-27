import { useEffect, useState } from "react";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [status, setStatus] = useState(null);
  const [gambar, setGambar] = useState(null);

  const navigate = useNavigate();

  const getMe = async () => {
    try {
      const res = await axios.get("me");
      setStatus(res.data.bb_user_datum.peran_user);
      setGambar(res.data.link_gambar_user);
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete("logout");
      setStatus(null);
      window.localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const location = useLocation().pathname;

  useEffect(() => {
    getMe();
  }, [location]);

  // check too see if user is logged in as an admin/user/contributor
  const listings = status === "Admin" || status === "Pengguna" ? true : false;

  const blog = status === "Admin" || status === "Kontributor" ? true : false;

  return (
    <div
      className={`shadow ${
        location === "/" ||
        location.includes("/tentang") ||
        location.includes("/kontak")
          ? ""
          : "mb-10"
      }`}
    >
      <div className="container">
        <div className="navbar bg-base-100 p-0">
          <div className="navbar-start">
            <Link
              to="/"
              className="btn btn-ghost normal-case text-xl italic text-primary"
            >
              BlitzBiz
            </Link>
          </div>
          <div className="navbar-center hidden md:block lg:block">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink to="/tentang">Tentang</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/listings">Listings</NavLink>
              </li>
            </ul>
          </div>
          {!status && (
            <div className="navbar-end">
              <Link
                to="/login"
                className="btn btn-primary rounded-lg w-[100px] hover:bg-white hover:text-black"
              >
                LOGIN
              </Link>
            </div>
          )}
          {status && (
            <div className="navbar-end">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={gambar} />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {status === "Admin" && (
                    <>
                      <li>
                        <NavLink to="/dashboard">
                          <p className="justify-between">Dashboard</p>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/users">
                          <p className="justify-between">Users</p>
                        </NavLink>
                      </li>
                    </>
                  )}
                  {listings && (
                    <li>
                      <NavLink to="/listings-dashboard">
                        <p>Listings</p>
                      </NavLink>
                    </li>
                  )}
                  {blog && (
                    <li>
                      <NavLink to="/blog-dashboard">
                        <p>Blog</p>
                      </NavLink>
                    </li>
                  )}
                  {
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  }
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="btm-nav z-10 md:hidden lg:hidden">
        <Link
          to="/"
          className={`${
            location === "/"
              ? "text-primary active"
              : "text-primary border-t-2 border-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
        <Link
          to="/tentang"
          className={`${
            location === "/tentang"
              ? "text-primary active"
              : "text-primary border-t-2 border-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </Link>
        <Link
          to="/blog"
          className={`${
            location === "/blog"
              ? "text-primary active"
              : "text-primary border-t-2 border-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </Link>
        <Link
          to="/listings"
          className={`${
            location === "/listings"
              ? "text-primary active"
              : "text-primary border-t-2 border-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
