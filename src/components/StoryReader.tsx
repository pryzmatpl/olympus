import React, { useEffect, useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useStore } from '../store/useStore';
import { generateChapter } from '../services/api';
import { Chapter } from '../types';

export default function StoryReader() {
  const { userProfile, chapters, addChapter, setSubscription } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateNewChapter = async () => {
      if (!userProfile || loading) return;
      
      setLoading(true);
      try {
        const newChapter = await generateChapter(userProfile, chapters.length + 1);
        addChapter(newChapter);
      } finally {
        setLoading(false);
      }
    };

    // Generate new chapter if conditions are met
    if (chapters.length === 0 || 
        (userProfile?.hasSubscription && 
         chapters.length < 30 && 
         new Date().getHours() === 0)) {
      generateNewChapter();
    }
  }, [userProfile, chapters.length]);

  if (!userProfile) {
    return <div>Please enter your birthday first</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={userProfile.avatar.url}
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">Your Mythical Journey</h2>
            <p className="text-gray-600">
              {userProfile.westernZodiac} ♦ {userProfile.chineseZodiac}
            </p>
          </div>
        </div>

        {chapters.map((chapter: Chapter, index: number) => (
          <div key={chapter.id} className="mb-8">
            <h3 className="text-xl font-bold mb-4">{chapter.title}</h3>
            {index === 0 && !userProfile.hasSubscription && (
              <div className="my-4 p-4 bg-gray-100 rounded">
                <p className="mb-4">Subscribe to continue reading</p>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "9.99"
                          }
                        }
                      ]
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order!.capture().then(() => {
                      setSubscription(true);
                    });
                  }}
                />
              </div>
            )}
            {(index === 0 || userProfile.hasSubscription) && (
              <>
                <img
                  src={chapter.imageUrl}
                  alt={chapter.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-700 leading-relaxed mb-4">
                  {chapter.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {chapter.mythologicalEntities.map((entity) => (
                    <span
                      key={entity}
                      className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {entity}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}