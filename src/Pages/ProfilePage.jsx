import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from '../Services/UserService';
import TweetService from '../Services/TweetService';
import Tweet from '../Components/Tweet';
import Header from '../Components/Header';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('My Tweets');

  useEffect(() => {
    if (!id) {
      toast.error('An error happened, please try again later');
      setTimeout(() => {
        navigate('/feed');
      }, 3000); // Delay the navigation for 3 seconds to display the toast
      return;
    }

    UserService.getUserById(id).then(response => {
      setUser(response.data);
    }).catch(error => {
      console.error("Error fetching user", error);
    });

    TweetService.getTweetsByUserId(id).then(response => {
      setTweets(response.data);
    }).catch(error => {
      console.error("Error fetching tweets", error);
    });

    TweetService.getAllTweets().then(response => {
      const likedTweets = response.data.filter(tweet => tweet.likes && tweet.likes.includes(id));
      setLikedTweets(likedTweets);
    }).catch(error => {
      console.error("Error fetching liked tweets", error);
    });

    UserService.getCurrentUser().then(response => {
      setCurrentUser(response.data);
    }).catch(error => {
      console.error("Error fetching current user", error);
    });
  }, [id, navigate]);

  const handleDeleteTweet = (tweetId) => {
    setTweets(tweets.filter(tweet => tweet.id !== tweetId));
    setLikedTweets(likedTweets.filter(tweet => tweet.id !== tweetId));
  };

  const renderTweets = () => {
    const tweetsToRender = selectedTab === 'My Tweets' ? tweets : likedTweets;
    return tweetsToRender.slice().reverse().map(tweet => (
      <Tweet
        key={tweet.id}
        id={tweet.id}
        content={tweet.content}
        user={user ? user.username : 'Unknown'}
        userHandler={user ? user.handler : 'UnknownHandler'}
        timestamp={tweet.timestamp}
        image={tweet.image}
        profilePic={user ? user.img : 'https://blog.za3k.com/wp-content/uploads/2015/03/default_profile_1.png'}
        userId={user ? user.id : ''}
        likes={tweet.likes || []}
        currentUser={currentUser ? currentUser.id : null}
        onDelete={handleDeleteTweet}
      />
    ));
  };

  return (
    <div className="flex justify-center w-screen h-screen bg-base text-white">
      <ToastContainer />
      <div className="flex flex-row w-full max-w-[1400px] h-full border-l border-r border-gray-700">
        <div className="flex flex-col flex-1 border-r border-gray-700">
          {user && (
            <div className="p-4 mb-4 max-w-2xl mx-auto">
              <img
                src={user.img || 'https://blog.za3k.com/wp-content/uploads/2015/03/default_profile_1.png'}
                alt="User Profile"
                className="w-20 h-20 rounded-full"
              />
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-gray-400">@{user.handler}</p>
            </div>
          )}
          <Header
            tabs={['My Tweets', 'Likes']}
            selectedTab={selectedTab}
            onTabClick={setSelectedTab}
          />
          <div className="max-w-2xl mx-auto flex-1 overflow-y-auto w-full">
            {renderTweets()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
