import axios from 'axios';

const AVATAR_API = 'https://api.avatar-generator.com';
const STORY_API = 'https://api.story-generator.com';
const MODEL_API = 'https://api.3d-model-generator.com';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Make sure to set this in your environment
});

export async function generateAvatar(westernZodiac, chineseZodiac) {
  try {
    // Generate a detailed prompt based on zodiac signs
    const prompt = `A mystical avatar combining elements of ${westernZodiac} and ${chineseZodiac} zodiacs. 
                   Artistic style: ethereal digital art with cosmic elements and spiritual symbols. 
                   The composition should blend Western zodiac ${westernZodiac} with Chinese zodiac ${chineseZodiac} characteristics.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url"
    });

    return {
      url: response.data[0].url,
      model3dUrl: `${MODEL_API}/models/${westernZodiac.toLowerCase()}-${chineseZodiac.toLowerCase()}.glb`
    };
  } catch (error) {
    console.error('Error generating avatar:', error);
    throw new Error('Failed to generate avatar');
  }
}

export async function generateChapter(userProfile, chapterNumber) {
  try {
    // Create a system message that sets up the story context
    const chapterPrompt = `Create a mythological story chapter with the following requirements:
    - Protagonist is associated with ${userProfile.westernZodiac} zodiac
    - Include elements of ${userProfile.chineseZodiac} Chinese zodiac
    - Chapter number: ${chapterNumber}
    - Genre: Mythological fantasy
    - Length: Approximately 500 words
    - Include: Title, content, and references to mythological entities
    - Style: Epic adventure with personal growth elements
    
    Format the response as a JSON object with title, content, and mythologicalEntities arrays.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are a skilled mythological storyteller who creates engaging narratives blending Western and Chinese zodiac elements."
        },
        { 
          role: "user", 
          content: chapterPrompt 
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the response
    const storyData = JSON.parse(completion.choices[0].message.content);

    // Generate an image for the chapter
    const imagePrompt = `A scene from a mythological story featuring ${userProfile.westernZodiac} zodiac elements: ${storyData.title}`;
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url"
    });

    return {
      id: `chapter-${chapterNumber}`,
      title: storyData.title,
      content: storyData.content,
      imageUrl: imageResponse.data[0].url,
      createdAt: new Date(),
      mythologicalEntities: storyData.mythologicalEntities
    };
  } catch (error) {
    console.error('Error generating chapter:', error);
    throw new Error('Failed to generate chapter');
  }
}

// Utility function to handle API errors
function handleApiError(error) {
  if (error.response) {
    console.error(error.response.status, error.response.data);
    throw new Error(`API error: ${error.response.status}`);
  } else {
    console.error('Error:', error.message);
    throw error;
  }
}