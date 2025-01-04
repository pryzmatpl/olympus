import React from 'react';
import { Link } from 'react-router-dom';
import { Book, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navigation() {
  const userProfile = useStore((state) => state.userProfile);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Book className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Mythical Journey
              </span>
            </Link>
          </div>
          
          {userProfile && (
            <div className="flex items-center">
              <img
                src={userProfile.avatar.url}
                alt="Avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-gray-600">
                {userProfile.westernZodiac} • {userProfile.chineseZodiac}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}