import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaReply, FaShare, FaEllipsisH, FaTrashAlt } from 'react-icons/fa';
import TweetService from '../Services/TweetService';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString(undefined, options);
};

const Tweet = ({ id, content, user, userHandler, timestamp, image, profilePic, userId, likes = [], currentUser, onDelete }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setLiked(likes.includes(currentUser));
    setLikesCount(likes.length);
  }, [likes, currentUser]);

  const handleLike = async () => {
    const newLikes = liked
      ? likes.filter(like => like !== currentUser)
      : [...likes, currentUser];

    setLiked(!liked);
    setLikesCount(newLikes.length);

    try {
      await TweetService.updateTweet(id, { likes: newLikes });
    } catch (error) {
      console.error("Error updating tweet likes", error);
      // Revert state changes on error
      setLiked(likes.includes(currentUser));
      setLikesCount(likes.length);
    }
  };

  const handleDelete = async () => {
    try {
      await TweetService.deleteTweet(id);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting tweet", error);
    }
  };

  return (
    <div className="flex flex-col p-4 border-b border-gray-700 w-full">
      <div className="flex flex-row items-start">
        <img
          src={profilePic}
          alt="User Profile"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="font-bold">{user}</span>
            <p className="text-gray-400">@{userHandler}</p>
            <span className="hidden sm:inline text-gray-400">
              <FaEllipsisH className="inline mx-1" />
              {formatDate(timestamp)}
            </span>
          </div>
          <span className="flex-1 flex justify-end sm:hidden relative">
            {currentUser === userId && (
              <button onClick={() => setShowOptions(!showOptions)} className="text-gray-400 hover:text-red-500">
                <FaEllipsisH />
              </button>
            )}
            {showOptions && (
              <button onClick={handleDelete} className="absolute right-0 bg-red-600 text-white rounded p-1 mt-2">
                <FaTrashAlt />
              </button>
            )}
          </span>
        </div>
        <span className="hidden sm:flex justify-end relative">
          {currentUser === userId && (
            <button onClick={() => setShowOptions(!showOptions)} className="text-gray-400 hover:text-red-500">
              <FaEllipsisH />
            </button>
          )}
          {showOptions && (
            <button onClick={handleDelete} className="absolute right-0 bg-red-600 text-white rounded p-1 mt-2">
              <FaTrashAlt />
            </button>
          )}
        </span>
      </div>
      <div className="flex flex-col mt-2 w-full">
        <span className="text-[15px] mb-4">{content}</span>
        {image && (
          <div className="flex justify-center w-full">
            <img
              src={image}
              alt="Tweet Content"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between items-center mt-4 text-gray-500 text-sm">
        <div className="flex flex-row space-x-4">
          <button onClick={handleLike} className="flex items-center space-x-1">
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span>{likesCount}</span>
          </button>
          <button className="flex items-center space-x-1">
            <FaReply />
            <span>Reply</span>
          </button>
          <button className="flex items-center space-x-1">
            <FaShare />
            <span>Share</span>
          </button>
        </div>
        <span className="sm:hidden text-gray-400">
          <FaEllipsisH className="inline mx-1" />
          {formatDate(timestamp)}
        </span>
      </div>
    </div>
  );
};

export default Tweet;
