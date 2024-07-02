import React, { useEffect, useState } from 'react';
import TweetService from '../Services/TweetService';
import UserService from '../Services/UserService';
import Tweet from '../Components/Tweet';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import SearchSection from '../Components/SearchSection';
import TweetInput from '../Components/TweetInput';

const FeedPage = () => {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('For you');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tweetsResponse = await TweetService.getAllTweets();
        setTweets(tweetsResponse.data);

        const usersResponse = await UserService.getAllUsers();
        setUsers(usersResponse.data);

        const currentUserResponse = await UserService.getCurrentUser();
        setCurrentUser(currentUserResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleNewTweet = async (tweetContent, tweetImage) => {
    if (!currentUser) {
      console.error('No current user');
      return;
    }

    const newTweet = {
      content: tweetContent,
      image: tweetImage,
      timestamp: new Date().toISOString(),
      author: currentUser.id,
      likes: [],
    };

    try {
      const response = await TweetService.createTweet(newTweet);
      setTweets([response.data, ...tweets]);
    } catch (error) {
      console.error('Error creating tweet', error);
    }
  };

  const renderTweets = () => {
    return tweets.map(tweet => {
      const tweetUser = users.find(user => user.id === tweet.author) || {};
      return (
        <Tweet
          key={tweet.id}
          id={tweet.id}
          content={tweet.content}
          user={tweetUser.username || 'Unknown'}
          userHandler={tweetUser.handler || 'UnknownHandler'}
          timestamp={tweet.timestamp}
          image={tweet.image}
          profilePic={tweetUser.img || 'https://blog.za3k.com/wp-content/uploads/2015/03/default_profile_1.png'}
          userId={tweet.author}
          likes={tweet.likes || []}
          currentUser={currentUser ? currentUser.id : null}
        />
      );
    });
  };

  return (
    <div className="flex justify-center w-screen h-screen bg-base text-white">
      <div className="flex flex-row w-full max-w-[1400px] h-full border-l border-r border-gray-700">
        <Sidebar />
        <div className="flex flex-col w-[60%] border-r border-gray-700">
          <Header
            tabs={['For you', 'Following']}
            selectedTab={selectedTab}
            onTabClick={setSelectedTab}
          />
          <TweetInput onNewTweet={handleNewTweet} />
          <div className="max-w-2xl mx-auto flex-1 overflow-y-auto w-full">
            {renderTweets()}
          </div>
        </div>
        <SearchSection />
      </div>
    </div>
  );
};

export default FeedPage;
