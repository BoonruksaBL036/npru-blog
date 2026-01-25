import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from '../context/UserContext'
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const { userInfo, logOut } = useContext(UserContext);
  const username = userInfo?.username;
  const menuItems = [
    {
      name: "Home",
      url: "/",
    },
    ...(username ? [{
      name: "Create New Post",
      url: "/create",
    }] : []),
    ...(username ? [{
      name: "My Posts",
      url: `/postbyauthor/${userInfo?.id}`,
    }] : []),
  ];
    const logout = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your session.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          logOut();
        }
      });
    };
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a href={item.url}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">NPRU BLOG</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item) => {
              return (
                <li key={item.name}>
                  <a href={item.url}>{item.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="navbar-end">
          {username ? (
            <>
              <button onClick={logout} className="btn">
                Log Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="btn">
                Login
              </button>
              <button onClick={() => navigate("/register")} className="btn ml-2">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
