import React, { useState, useEffect } from 'react';
import TweetInput from '../Components/TweetInput';
import Tweet from '../Components/Tweet';
import TweetService from '../Services/TweetService';
import UserService from '../Services/UserService';
import Toast from '../Components/Toast';

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchTweetsAndUsers = async () => {
      try {
        const tweetsResponse = await TweetService.getAllTweets();
        setTweets(tweetsResponse.data.reverse());
        const usersResponse = await UserService.getAllUsers();
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchTweetsAndUsers();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      UserService.getUserById(userId).then(response => {
        setCurrentUser(response.data);
        setLoading(false);
      }).catch(error => {
        console.error("Error fetching current user", error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleNewTweet = (tweetContent, tweetImage, userId) => {
    const newTweet = {
      content: tweetContent,
      author: userId,
      timestamp: new Date().toISOString(),
      image: tweetImage || null,
    };
    TweetService.createTweet(newTweet).then(response => {
      setTweets([response.data, ...tweets]);
      setToast({ message: "Tweet created successfully!", type: "success" });
      setTimeout(() => setToast({ message: "", type: "" }), 3000);
    }).catch(error => {
      console.error("Error creating tweet:", error);
      setToast({ message: "An error occurred while creating the tweet. Please try again.", type: "error" });
      setTimeout(() => setToast({ message: "", type: "" }), 3000);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      {toast.message && <Toast message={toast.message} type={toast.type} />}
      <TweetInput onTweet={handleNewTweet} currentUser={currentUser} />
      {tweets.map((tweet) => {
        const user = users.find(u => u.id === String(tweet.author));
        return (
          <Tweet
            key={tweet.id}
            content={tweet.content}
            user={user?.username || 'Unknown'}
            userHandler={user?.handler || 'UnknownHandler'}
            timestamp={tweet.timestamp}
            image={tweet.image}
            profilePic={user?.img || 'https://blog.za3k.com/wp-content/uploads/2015/03/default_profile_1.png'}
          />
        );
      })}
    </div>
  );
};

export default Feed;
