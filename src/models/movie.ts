type Genre = 'action' | 'comedy' | 'drama' | 'fantasy' | 'horror' | 'romance' | 'sci-fi';
export interface Movie {
    id: string;
    title: string;
    description: string;
    genres: Genre[];
    releaseDate: Date;
    director: string;
    actors: string[];
  }