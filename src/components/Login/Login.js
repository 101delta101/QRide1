import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useAuth}from "../../context/AuthProvider";
import supabase from "../../config/supabaseClient";
import google_button from "../Assets/google.png";

const Login = () => {
  const {session,signIn,signInWithGoogle}=useAuth();
 
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState(""); // New state for success message


  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const loginsocial = async (provider) => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        console.error(`Unsupported provider: ${provider}`);
      }
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        throw error;
      }
      
      if(data){
        console.log("User logged in:", data);
        
        navigate('/dashboard')
      }
    }
    catch(error){
      setSuccessMsg("Invalid Credentials");
      console.error("Error logging in user:", error.message);
      return null;
    }
  };



  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-center py-4 gap-2">
        {/*<p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
  </p>*/}
  {successMsg && (
          <div className="bg-red-200 text-red-800 p-2 rounded-md">
            {successMsg}
          </div>
        )}
        <div className="flex justify-center items-center h-[10%] ">
          <h1 className="font-semibold md:font-bold text-4xl ">Login</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col w-full h-[50%] gap-8"
        >
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="flex rounded-3xl h-[20%] w-[50%] text-start px-4 border-2"
          />

          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPwd(e.target.value)}
            value={password}
            required
            className="flex rounded-3xl h-[20%] w-[50%] text-start px-4 border-2"
          />
          {/* <p className="font-normal px-2 text-sm text-left" >Forgot Password?<Link to="/resetpassword">
            {" "}
          </Link></p> */}
          <p className="font-normal px-2 text-sm">
          <Link to="/resetpassword" className="text-black text-base ">
            {" "}
            Forgot Password?
          </Link>
        </p>
          <button className="flex text-xl font-medium bg-black text-white py-2 px-8 rounded-3xl items-center justify-center hover:bg-[#27272a]">
            Login
          </button>
        </form>
        <button className="google-button" onClick={() => loginsocial('google')}>
          <img src={google_button} alt="Google" className="google-icon" />
            <p>&nbsp;Continue with Google</p>
          </button>
        <p className="font-normal px-2 text-sm">
          Need an Account?
          <Link to="/register" className="text-blue-600 text-base ">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
