import React, { useContext } from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const RESET_PASSWORD_URL = "/auth/users/reset_password/";

const ResetPwd = () => {

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [resetmailmsg, setResetmailmsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

   {/*} try {
      const response = await axios.post(
        RESET_PASSWORD_URL,
        JSON.stringify({ email }), //Diff between javascript objects and json strings
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Reset password email sent");
        setResetmailmsg("Reset password email sent");
        navigate("/QR");
      } else {
        setErrMsg("Invalid email");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
      console.log(errMsg);
    }*/}
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
        <div className="flex justify-center items-center h-[10%] ">
          <h1 className="font-semibold md:font-bold text-4xl ">Reset Password</h1>
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

        

          <button onClick={resetmailmsg} className="flex text-xl font-medium bg-black text-white py-2 px-8 rounded-3xl items-center justify-center hover:bg-[#27272a]">
            Submit
          </button>
        </form>
        
      </div>
    </>
  );
};

export default ResetPwd;
