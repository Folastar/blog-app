import React, { useState, useRef, useEffect } from "react";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";
import "./register.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const porsonInfo = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};
const Register = () => {
  const [formData, setFormData] = useState(porsonInfo);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);


  // first_name
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //set password 
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);


  const history = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUser(value) 
  };


  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, username: value });
    setUser(value);
  };
  
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, password: value });
    setPwd(value);
  };
  

  const userRef = useRef();

  const [focus, setFocus] = useState(false);
  // const handlePass =()=>  setShowPassword((prev) => !prev)

  useEffect(()=>{
    setValidName(USER_REGEX.test(user))
  },[user])

  useEffect(()=>{
    setValidPwd(PWD_REGEX.test(pwd))
  },[pwd])

  useEffect(() => {
    userRef.current.focus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4005/api/v1/auth/signup",
        formData
      );

      if (res.status === 201) {
        localStorage.setItem("pantone", JSON.stringify(res.data)) //to store data to local system storage
        console.log(res.data)
        toast.success("Registration Successful");
        history("/");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          error.message
      );
    }
  };
  return (
    <div className="  ">
      <div className="w-full inputBox h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl my-4 text-blue-200">Create account</h1>

          <div className="form-control">
            <input
              className="w-full inputBox"
              ref={userRef}
              type="text"
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              // id="first_name"
              placeholder=" "
            />
            <label className="-top-0 labelBox" htmlFor="first_name">
              Firstname*


              <span className={`  ${!validName ? "hide" :"valid" } `}>✔</span>
              <span className={`   ${ !user || validName ? "hidden": "invalid"}` }> ❌</span>
            </label>
          </div>

          <div className="form-control">
            <input
              onChange={handleChange}
              className="w-full inputBox "
              type="text"
              value={formData.last_name}
              // id="last_name"
              placeholder=" "
              name="last_name"
            />
            <label className="-top-0 labelBox" htmlFor="last_name">
              Lastname*
            </label>
          </div>

          <div className="form-control">
            <input
              className="outline-none focus:border-b-2 border-b border-blue-400 w-full inputBox"
              placeholder=" "
              type="text"
              value={formData.username}
              // id="username"
              name="username"
              onChange={handleChange}
            />
            <label className="top-0 labelBox" htmlFor="username">
              Username*
            </label>
          </div>
          <div className="form-control">
            <input
              className="outline-none border-b focus:border-b-2 border-blue-400 w-full inputBox"
              placeholder=" "
              type="text"
              value={formData.email}
              name="email"
              onChange={handleChange}
              // id="email"
            />
            <label className="top-0 labelBox" htmlFor="email">
              {" "}
              Email*
            </label>
          </div>

          <div className="form-control">
            <input
              className="outline-none group focus:border-b-2 relative border-b border-blue-400 w-full inputBox"
              placeholder=" "
              type={showPassword ? "text" : "password"}
              value={formData.password}
              id="password"
              onChange={handlePasswordChange}
              name="password"
            />
            <label className="-top-0 labelBox left-0" htmlFor="password">
              Password*

              <span className={`  ${validPwd ? "valid" :"hidden" } `}>✔</span>
              <span className={`   ${ !pwd || validPwd ? "hidden": "invalid"}` }> ❌</span>
              
            </label>

            <button
              type="button"
              className="absolute right-0 "
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
            </button>
          </div>

          {/* <div className="form-control ">
          
              <input
                className="outline-none  focus:border-b-2 relative border-b border-blue-400 w-full inputBox"
                placeholder=" "
                type={confirmPassword ? "text" : "password"}
                name=""
                id="confirmpwd"
              />
            <label className="right-0 -top-0 labelBox left-0" htmlFor="confirmpwd">Confirm Password*</label>

              <button
                className="absolute right-0  "
                onClick={() => setConfirmPassword((prev) => !prev)}
              >
                {confirmPassword ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
              </button>
          
          </div> */}

          <button
            className="w-1/2 bg-green-200 px-2 py-2 rounded-3xl my-3"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
