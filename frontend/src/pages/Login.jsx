import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { useState, useRef } from "react";
import './login.css'
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
// import { PiPassword } from "react-icons/pi";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
  const userRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] =useState(false)
  const history =useNavigate()

const {dispatch}= useContext(AppContext)
  

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // const  handleUsernameChange = ()=>{
  //   const {name,value}= e.target;
  //   setUser({...username, [name]:value})

  // }

  // const handlePasswordChange = ()=>{

  // }

  // const [matchPwd, setMatchPwd]= useState('')
  // const [validMatch, setValidMatch]= useState(false)
  // const [matchFocus, setMatchFocus]= useState(false)

  useEffect(() => {
    userRef.current.focus(); //to focus on a particular element on first render
  }, []);
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  const handleSubmit =async (e) => {

    e.preventDefault();

    try{
        setLoading(true)
        const response =await axios.post("https://blog-app-uylh.onrender.com/api/v1/auth/login", {username:user, password:pwd})
        
        if(response.status===200){
          localStorage.setItem("pantone", JSON.stringify(response.data)) //to store data to local system storage
          console.log(response.data)
          dispatch({type:"LOGIN", payload:response.data})
          toast.success("Login successful")
          history('/')

        }

    }
    catch (error) {
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          error.message
      );
    }
    finally{
      setLoading(false)
    }
    console.log("disabled");
  };
  return (
    <div className=" flex justify-center text-black items-center w-full   min-h-screen">
      <div className=" sm:w-[40%] w-[70%] h-1/2 shadow-2xl rounded-lg">
        <h1 className="text-center py-1 text-3xl text-cyan-700">Login now</h1>
        <form onSubmit={handleSubmit} className="px-10 py-5 relative">
          <div className="form-control relative">
            <label className="username" htmlFor="username">
              Username*
              <span
                className={`transition-all duration-300 text-green-500 ${!validName ? "hidden" : "valid"}`}
              >
                ✔
              </span>
              <span
                className={`text-red-500 transition-all duration-300 ${
                  validName || !user ? "hide" : "invalid"
                }`}
              >
                ❌
              </span>
            </label>
            <input
              onChange={(e) => {
                setUser(e.target.value);
              }}

              className={`w-full rounded-3xl px-4 py-2 outline-none  border bg-slate-100 ${
                validName ? "border-green-500" : "border-red-500"
              } ${!user ? "border-yellow-400" :"none"} `}
              type="text"
              placeholder="Enter your username"
              name="username"
              // id="username"
              value={user}
              aria-invalid={validName ? "false" : "true"}
              autoComplete="off"
              ref={userRef}
              onFocus={() => {
                setUserFocus(true);
              }}
              onBlur={() => {
                setUserFocus(false);
              }}
            />
            <p
              id="uidnote"
              className={` absolute z-10 transition-all duration-100 ${
                userFocus && user && !validName ? "instructions" : "offscreen"
              }`}
            >
              {/* <FontAwesomeIcon icon={faInfoCircle}/> */}
              4-28 characters
              <br />
              must begin with a letter <br />
              letter, number, underscores, hyphens allowed.
            </p>
          </div>
          <div className="form-controls">
            <label className="" htmlFor="password">
              Password*
              <span className={`transition-all duration-300 text-green-500 ${validPwd ? "valid" : "hidden"}`}>
                ✔
              </span>
              <span className={` duration-300 transition-all ${validPwd || !pwd ? "hidden" : "invalid"}`}>❌</span>
            </label>
            <div className="relative">
              <input
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
                className={`w-full rounded-3xl px-4 py-2 bg-slate-100 border outline-none   ${
                  validPwd? "border-green-500" : "border-red-500"
                }  ${!pwd ? "border-yellow-500" : "border-green-500"}`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                // id="password"
                value={pwd}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => {
                  setPwdFocus(true);
                }}
                onBlur={() => {
                  setPwdFocus(false);
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-3 group-focus:border-b border-blue-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
              </button>
              <p
                id="pwdnote"
                className={` absolute bg-red-300 ${
                  pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
                } `}
              >
                {/* <FontAwesomeIcon icon={faInfoCircle}/> */}
                8-28 characters
                <br />
                must include uppercase and lowercase letters, a number and a
                special character <br />
                allowed special characters{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
            </div>
          </div>

          <div className="form-controls inline-flex gap-x-2">
            <input type="checkbox" name="remember" id="remember" />
            <label htmlFor="">Remember me</label>
          </div>

          <button
            disabled={!validName || !validPwd  ? true : false}
            className="w-full rounded-3xl bg-blue-400  px-2 py-2 "
            type="submit"

          >
            {loading ? "logging in": "Login"}
            
          </button>
        </form>
        <div className="flex justify-around flex-col py-4 sm:flex-row">
          <p>
          Don't have an account?  <Link to={"/register "}>Register</Link>
          </p>
        
          <Link>Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
