type Genre = 'action' | 'comedy' | 'drama' | 'fantasy' | 'horror' | 'romance' | 'sci-fi';
export interface User {
    id: string;
    email: string;
    username: string;
    preferences: {
        favoriteGenres: Genre[];
        dislikedGenres: Genre[];
    }; 
    watchHistory: Array<{
        contentId: string;
        watchedOn: Date;
        rating?: number;
    }>;
  }