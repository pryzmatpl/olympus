import axios from 'axios';

const AVATAR_API = 'https://api.avatar-generator.com';
const STORY_API = 'https://api.story-generator.com';
const MODEL_API = 'https://api.3d-model-generator.com';

export async function generateAvatar(westernZodiac, chineseZodiac) {
  return {
    url: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop`,
    model3dUrl: `${MODEL_API}/models/${westernZodiac.toLowerCase()}-${chineseZodiac.toLowerCase()}.glb`
  };
}

export async function generateChapter(userProfile, chapterNumber) {
  const mythologicalEntities = ['Zeus', 'Hercules', 'Athena', 'Apollo'];
  
  return {
    id: `chapter-${chapterNumber}`,
    title: `Chapter ${chapterNumber}: The Quest Begins`,
    content: `In the realm of ${userProfile.westernZodiac}, our hero embarks on a journey...`,
    imageUrl: `https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=400&fit=crop`,
    createdAt: new Date(),
    mythologicalEntities: mythologicalEntities.slice(0, Math.random() * 4)
  };
}