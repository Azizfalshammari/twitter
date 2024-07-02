import React, { useEffect, useState } from 'react';
import { FaHome, FaHashtag, FaBell, FaEnvelope, FaUser, FaEllipsisH, FaFeatherAlt } from 'react-icons/fa';
import { AiFillCrown } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import UserService from '../Services/UserService';

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    UserService.getCurrentUser().then(response => {
      setCurrentUser(response.data);
    }).catch(error => {
      console.error("Error fetching current user", error);
    });
  }, []);

  return (
    <div className="flex flex-col items-center sm:items-start w-[60px] sm:w-[240px] h-full bg-base border-r border-gray-700 p-4 space-y-4 justify-between">
      <div className="mb-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/1483px-X_icon_2.svg.png"
          alt="X Logo"
          className="w-8 h-8"
        />
      </div>
      <div className="flex flex-col items-center sm:items-start space-y-6 w-full">
        <div className="flex items-center space-x-2 cursor-pointer w-full p-2">
          <FaHome className="text-2xl" />
          <span className="hidden sm:inline text-xl">Home</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer w-full p-2">
          <FaHashtag className="text-2xl" />
          <span className="hidden sm:inline text-xl">Explore</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer w-full p-2">
          <FaBell className="text-2xl" />
          <span className="hidden sm:inline text-xl">Notifications</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer w-full p-2">
          <FaEnvelope className="text-2xl" />
          <span className="hidden sm:inline text-xl">Messages</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer w-full p-2">
          <BsPeopleFill className="text-2xl" />
          <span className="hidden sm:inline text-xl">Communities</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer w-full p-2">
          <AiFillCrown className="text-2xl" />
          <span className="hidden sm:inline text-xl">Premium</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer w-full p-2">
          <FaUser className="text-2xl" />
          <span className="hidden sm:inline text-xl">Profile</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer w-full p-2">
          <FaEllipsisH className="text-2xl" />
          <span className="hidden sm:inline text-xl">More</span>
        </div>
        <button className="btn btn-primary text-white rounded-full w-full sm:w-auto flex items-center justify-center p-2">
          <FaFeatherAlt className="text-xl" />
          <span className="hidden sm:inline ml-2">Tweet</span>
        </button>
      </div>
      {currentUser && (
        <Link to={`/profile/${currentUser.id}`} className="flex items-center space-x-2 w-full mt-4 p-2">
          <img
            src={currentUser.img || 'https://blog.za3k.com/wp-content/uploads/2015/03/default_profile_1.png'}
            alt="User Profile"
            className="w-8 h-8 sm:w-12 sm:h-12 rounded-full cursor-pointer"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-bold">{currentUser.username}</span>
            <span className="text-gray-400">@{currentUser.handler}</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
