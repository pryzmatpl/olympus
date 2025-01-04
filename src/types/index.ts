export interface UserProfile {
  birthday: Date;
  westernZodiac: string;
  chineseZodiac: string;
  avatar: {
    url: string;
    model3dUrl: string;
  };
  hasSubscription: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
  mythologicalEntities: string[];
}