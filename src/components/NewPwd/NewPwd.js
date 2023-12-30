import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/Axios";

const RESET_PASSWORD_URL = "http://localhost:8000/auth/users/reset_password_confirm/";

const NewPasswordForm = () => {
  const newPasswordRef = useRef();
  const retypePasswordRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== retypeNewPassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    try {
      // Make API call to reset password
      const response = await axios.post(
        RESET_PASSWORD_URL,
        JSON.stringify({ newPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Reset password successful");
        navigate("/login"); // Redirect to login page after password reset
      } else {
        setErrMsg("Invalid request");
      }
    } catch (err) {
      // Handle error responses here
      // ...
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-center py-4 gap-2">
        <h1 className="font-semibold md:font-bold text-4xl">Reset Password</h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col w-full gap-8"
        >
          <input
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            ref={newPasswordRef}
            autoComplete="off"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            required
            className="input-field"
          />
          <input
            type="password"
            id="retypeNewPassword"
            placeholder="Retype new password"
            ref={retypePasswordRef}
            autoComplete="off"
            onChange={(e) => setRetypeNewPassword(e.target.value)}
            value={retypeNewPassword}
            required
            className="input-field"
          />
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <button type="submit" className="submit-button">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPasswordForm;
