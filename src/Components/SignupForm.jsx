import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const [credential, setCredential] = useState('');
  const [handler, setHandler] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await UserService.createUser({ credential, handler, password });
      localStorage.setItem('userId', response.data.id);
      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/feed');
      }, 3000);
    } catch (error) {
      console.error('Error creating account', error);
      toast.error('Signup failed, please try again.');
    }
  };

  return (
    <dialog id="sign_up_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create an account</h3>
        <input
          type="text"
          placeholder="Email or Username"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          className="input input-bordered w-full mb-4 bg-gray-800 text-white"
        />
        <input
          type="text"
          placeholder="Handler"
          value={handler}
          onChange={(e) => setHandler(e.target.value)}
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
          onClick={handleSignUp}
          className="btn btn-primary text-white w-full"
        >
          Sign Up
        </button>
        <form method="dialog" className="mt-4">
          <button className="btn">Close</button>
        </form>
      </div>
    </dialog>
  );
};

export default SignUpForm;
