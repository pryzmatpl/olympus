import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { getWesternZodiac, getChineseZodiac } from '../utils/zodiac';
import { generateAvatar } from '../services/api';
import { useStore } from '../store/useStore';

export default function BirthdayForm() {
  const [birthday, setBirthday] = useState('');
  const navigate = useNavigate();
  const setUserProfile = useStore((state) => state.setUserProfile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const birthdayDate = new Date(birthday);
    const westernZodiac = getWesternZodiac(birthdayDate);
    const chineseZodiac = getChineseZodiac(birthdayDate);
    
    const avatar = await generateAvatar(westernZodiac, chineseZodiac);
    
    setUserProfile({
      birthday: birthdayDate,
      westernZodiac,
      chineseZodiac,
      avatar,
      hasSubscription: false
    });
    
    navigate('/story');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Begin Your Mythical Journey</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              When were you born?
            </label>
            <input
              type="date"
              required
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Your Journey
          </button>
        </form>
      </div>
    </div>
  );
}