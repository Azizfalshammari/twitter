import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountPage from '../Pages/AccountPage';
import FeedPage from '../Pages/FeedPage';
import ProfilePage from '../Pages/ProfilePage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
