import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await UserService.loginUser({ credential, password });
      localStorage.setItem("userId", response.user.id);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/feed");
      }, 3000);
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Login failed, please check your credentials and try again.");
    }
  };

  return (
    <dialog id="login_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Sign in to X</h3>
        <input
          type="text"
          placeholder="Email or Username"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          className="input input-bordered w-full mb-4 bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4 bg-gray-800 text-white"
        />
        <button
          onClick={handleLogin}
          className="btn btn-primary text-white w-full"
        >
          Login
        </button>
        <form method="dialog" className="mt-4">
          <button className="btn">Close</button>
        </form>
      </div>
    </dialog>
  );
};

export default LoginForm;
