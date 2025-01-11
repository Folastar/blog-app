import React from "react";
import blog from "../assets/blog.svg";
import { GrHome } from "react-icons/gr";
import { NavLink, Link } from "react-router-dom";
import { FaMicroblog } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { toast } from "react-toastify";
function Navigation() {

  const {state:{user},dispatch}=useContext(AppContext)

  const logout = ()=>{
    const leave= window.confirm("are you sure you want to logout!!!");
    if(leave){
      localStorage.removeItem("pantone")
      dispatch({
        type:"LOGOUT"
      })
      toast.info("you've been logged out .")
    }
  }

  console.log(user)
  return (
    <header className="bg-zinc-950">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/" className="block text-teal-600">
              {/* <span className="sr-only">Home</span> */}

              <img src={blog} alt="blog" width={45} />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <NavLink
                    className="text-cyan-500 relative transition hover:text-cyan-500/75 group grid place-items-center"
                    to="/"
                  >
                    <GrHome className="size-6" />
                    <span className="text-cyan-500 transition-all bottom-0 absolute text-xs bg-transparent duration-300 hidden  hover:text-cyan-500/75 group-hover:block">
                      Home
                    </span>
                  </NavLink>
                </li>
                  {user &&<>
                <li>
                  <NavLink
                    className="text-cyan-500 transition hover:text-cyan-500/75"
                    to="/blogs"
                  >
                    <FaMicroblog className="size-6" />
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="text-cyan-500 transition hover:text-cyan-500/75"
                    to="/profile"
                  >
                    {" "}
                    <FaUserAlt className="size-6" />
                  </NavLink>
                </li>

                  </>}
                <li>
                  <NavLink
                    className="text-cyan-500 transition hover:text-cyan-500/75"
                    to="/info"
                  >
                    {" "}
                    <FiInfo className="size-6" />{" "}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="text-cyan-500 transition hover:text-cyan-500/75"
                    to="/categories"
                  >
                    <BiCategory className="size-6" />
                  </NavLink>
                </li>

              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {
              user&& (
                <div className="text-cyan-300 flex gap-2 items-center">
                  <p>Hello, {user.author.username}</p>
                  <button className="p-2 border-2 border-cyan-300 rounded-md" onClick={logout}>LOGOUT</button>
                </div>
              )
            }
           { !user && <div className="sm:flex sm:gap-4">
              <Link
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                to="/login"
              >
                Login
              </Link>

              <div className="hidden sm:flex">
                <Link
                  className="rounded-md bg-cyan-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </div>}

            <div className="block md:hidden">
              <button className="rounded bg-cyan-100 p-2 text-cyan-600 transition hover:text-cyan-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
