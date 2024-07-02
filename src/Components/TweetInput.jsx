import React, { useState, useEffect } from 'react';
import UserService from '../Services/UserService';

const TweetInput = ({ onNewTweet }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [tweetImage, setTweetImage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await UserService.getCurrentUser();
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tweetContent.trim() === '') return;
    onNewTweet(tweetContent, tweetImage);
    setTweetContent('');
    setTweetImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-gray-700">
      <div className="flex items-start">
        {currentUser && (
          <img
            src={currentUser.img || 'https://blog.za3k.com/wp-content/uploads/2015/03/default_profile_1.png'}
            alt="User Profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4"
          />
        )}
        <div className="flex flex-col w-full">
          <textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-base-100 text-white p-2 rounded-lg mb-2"
          />
          {tweetImage && (
            <img
              src={tweetImage}
              alt="Tweet Preview"
              className="w-full h-auto rounded-lg mb-2"
            />
          )}
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={tweetImage}
              onChange={(e) => setTweetImage(e.target.value)}
              placeholder="Add image URL"
              className="bg-base-100 text-white p-2 rounded-lg flex-1 mr-2"
            />
            <button
              type="submit"
              className="btn btn-primary text-white rounded-full"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TweetInput;
