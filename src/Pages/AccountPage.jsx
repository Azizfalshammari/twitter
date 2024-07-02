import React from "react";
import Footer from "../Components/Footer";
import LoginForm from "../Components/LoginForm";
import SignUpForm from "../Components/SignupForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AccountPage() {
  const handleSignIn = () => {
    const modal = document.getElementById("login_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const handleSignUp = () => {
    const modal = document.getElementById("sign_up_modal");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div className="flex flex-wrap w-full bg-base-100 overflow-clip max-sm:justify-center sm:min-h-screen h-screen">
        <div className="hidden sm:block lg:w-[50%] max-h-screen">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/1483px-X_icon_2.svg.png"
            alt="Large X Icon"
          />
        </div>
        <div className="block sm:hidden w-16">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/240px-X_icon_2.svg.png"
            alt="Small X Icon"
          />
        </div>
        <div className="flex flex-col justify-center max-sm:items-center max-sm:justify-center gap-y-6">
          <div>
            <span className="text-[64px] flex flex-col text-start font-bold text-white max-sm:text-[32px]">
              Happening now
            </span>
            <span className="text-[32px] flex flex-col text-start font-bold text-white max-sm:text-[16px]">
              Join today.
            </span>
          </div>
          <div className="flex flex-col w-[60%]">
            <button className="btn btn-primary text-white rounded-3xl mb-2" onClick={handleSignUp}>
              Create Account
            </button>
            <p className="max-sm:text-[.50rem] text-sm inline">
              By signing up, you agree to the
              <span className="text-primary inline"> Terms of Service</span> and
              <span className="text-primary inline"> Privacy Policy</span>, including
              <span className="text-primary inline"> Cookie Use</span>
            </p>
            <p className="font-bold text-white mt-4">
              Already have an account?
            </p>
            <button
              className="btn btn-outline btn-primary- text-[#1d9bf0] rounded-3xl mt-4 hover:bg-[#1d9bf0] hover:bg-opacity-15 hover:text-[#1d9bf0]"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <LoginForm />
      <SignUpForm />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default AccountPage;
