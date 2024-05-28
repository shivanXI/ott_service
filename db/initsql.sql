/* Case : Queries for setting up initial db schema with static values */

CREATE TYPE genre AS ENUM ('action', 'comedy', 'drama', 'fantasy', 'horror', 'romance', 'sci-fi');
CREATE TYPE content_type AS ENUM ('movie', 'tv_show_episode', 'tv_show');

CREATE TABLE IF NOT EXISTS "users" (
	"id" VARCHAR(255) NOT NULL,
	"email" VARCHAR(200) NOT NULL,
	"username" VARCHAR(200) NOT NULL,
	"preferences" JSONB,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "u_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS "movies" (
	"id" VARCHAR(255) NOT NULL,
	"title" VARCHAR(200) NOT NULL,
	"description" VARCHAR(200) NOT NULL,
	"genres" TEXT[] NOT NULL,
  "releast_date" DATE NOT NULL,
  "director" VARCHAR(200) NOT NULL,
  "actors" TEXT[] NOT NULL,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "m_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS "tv_show" (
	"id" VARCHAR(255) NOT NULL,
	"title" VARCHAR(200) NOT NULL,
	"description" VARCHAR(200) NOT NULL,
	"genres" TEXT[] NOT NULL,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS "tv_show_episodes_map" (
	"id" VARCHAR(255) NOT NULL,
  "tv_show_id" VARCHAR(255) NOT NULL,
	"title" VARCHAR(200) NOT NULL,
	"episode_number" INTEGER NOT NULL,
	"season_number" INTEGER NOT NULL,
  "releast_date" DATE NOT NULL,
  "director" VARCHAR(200) NOT NULL,
  "actors" TEXT[] NOT NULL,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "tsem_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS "user_watch_history" (
	"id" VARCHAR(255) NOT NULL,
  "user_id" VARCHAR(255) NOT NULL,
  "content_id" VARCHAR(255) NOT NULL,
  "content_type" content_type NOT NULL,
	"watched_on" DATE NOT NULL,
  "ratings" INTEGER DEFAULT 0,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "uwh_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE IF NOT EXISTS "user_favorites" (
    "id" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "content_id" VARCHAR(255) NOT NULL,
    "content_type" content_type NOT NULL,
    "is_removed" BOOLEAN DEFAULT FALSE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "uf_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

/* Case : Insert queries for initial data in db */
INSERT INTO users (id, email, username, preferences, created_at, updated_at)
VALUES
  ('user_id_1', 'user1@example.com', 'user1', '{"favorite_genre": ["comedy", "drama"], "disliked_genre": ["fantasy", "sci-fi"]}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user_id_2', 'user2@example.com', 'user2', '{"favorite_genre": ["horror", "comedy"], "disliked_genre": ["fantasy"]}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user_id_3', 'user3@example.com', 'user3', '{"favorite_genre": ["comedy"], "disliked_genre": ["fantasy", "sci-fi"]}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user_id_4', 'user4@example.com', 'user4', '{"favorite_genre": ["drama"], "disliked_genre": ["horror", "sci-fi"]}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('user_id_5', 'user5@example.com', 'user5', '{"favorite_genre": ["comedy", "drama"], "disliked_genre": ["romance", "sci-fi"]}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO movies (id, title, description, genres, releast_date, director, actors, created_at, updated_at)
VALUES
  ('movie_id_1', 'The Shawshank Redemption', 'A tale of hope and friendship', 
   '{"drama", "fantasy"}', '1994-10-14', 'Frank Darabont', '{"Tim Robbins", "Morgan Freeman"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('movie_id_2', 'The Godfather', 'The story of the Corleone family under patriarch Vito Corleone', 
   '{"drama", "action"}', '1972-03-24', 'Francis Ford Coppola', '{"Marlon Brando", "Al Pacino"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('movie_id_3', 'The Dark Knight', 'When the menace known as Joker emerges from chaos', 
   '{"action", "horror"}', '2008-07-18', 'Christopher Nolan', '{"Christian Bale", "Heath Ledger"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('movie_id_4', 'Pulp Fiction', 'The lives of two mob hit men, a boxer, and a wife of a gangster become intertwined', 
   '{"action", "comedy"}', '1994-09-23', 'Quentin Tarantino', '{"John Travolta", "Samuel L. Jackson"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('movie_id_5', 'Inception', 'A professional thief who steals corporate secrets through use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO', 
   '{"action", "sci-fi", "horror"}', '2010-07-16', 'Christopher Nolan', '{"Leonardo DiCaprio", "Joseph Gordon-Levitt"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO tv_show (id, title, description, genres, created_at, updated_at)
VALUES
  ('tv_show_id_1', 'Game of Thrones', 'Seven noble families fight for control of the mythical land of Westeros', 
   '{"drama", "fantasy"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('tv_show_id_2', 'Breaking Bad', 'A high school chemistry teacher diagnosed with terminal cancer turns to drug dealing to secure his familys financial future', 
   '{"drama", "crime"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('tv_show_id_3', 'Stranger Things', 'When a young boy disappears, a small town uncovers a mystery involving secret government experiments, terrifying supernatural forces and one very strange little girl', 
   '{"sci-fi", "horror", "drama"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('tv_show_id_4', 'The Office (US)', 'The mockumentary on the everyday work lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company', 
   '{"comedy", "mockumentary"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('tv_show_id_5', 'Friends', 'Follows the lives of six friends in their 20s and 30s who navigate careers, love and life in Manhattan.', 
   '{"comedy", "romance"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert episode data for tv_show_id_1 (Game of Thrones)
INSERT INTO tv_show_episodes_map (id, tv_show_id, title, episode_number, season_number, releast_date, director, actors, created_at, updated_at)
VALUES
  ('episode_id_1', 'tv_show_id_1', 'Winter Is Coming', 1, 1, '2011-04-17', 'Tim Van Patten', '{"Sean Bean", "Emilia Clarke"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('episode_id_2', 'tv_show_id_1', 'The Kingsroad', 2, 1, '2011-04-24', 'Brian Kirk', '{"Sean Bean", "Nikolaj Coster-Waldau"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('episode_id_3', 'tv_show_id_1', 'Lord Snow', 3, 1, '2011-05-01', 'Bryan Singer', '{"Sean Bean", "Kit Harington"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert episode data for tv_show_id_2 (Breaking Bad)
INSERT INTO tv_show_episodes_map (id, tv_show_id, title, episode_number, season_number, releast_date, director, actors, created_at, updated_at)
VALUES
  ('episode_id_4', 'tv_show_id_2', 'Pilot', 1, 1, '2008-01-20', 'Bryan Cranston', '{"Bryan Cranston", "Aaron Paul"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('episode_id_5', 'tv_show_id_2', 'Cats Cradle', 2, 1, '2008-01-27', 'Vince Gilligan', '{"Bryan Cranston", "Anna Gunn"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('episode_id_6', 'tv_show_id_2', '...And the Bag is in the River', 3, 1, '2008-02-10', 'Rick Miner', '{"Bryan Cranston", "Dean Norris"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- WATCH HISTORY
-- user_id_1 watching movie_id_1 (The Shawshank Redemption)
INSERT INTO user_watch_history (id, user_id, content_id, content_type, watched_on, ratings, created_at, updated_at)
VALUES
  ('watch_history_id_1', 'user_id_1', 'movie_id_1', 'movie', '2024-05-25', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- user_id_2 watching tv_show_id_2 (Breaking Bad) - episode_id_4 (Pilot)
INSERT INTO user_watch_history (id, user_id, content_id, content_type, watched_on, ratings, created_at, updated_at)
VALUES
  ('watch_history_id_2', 'user_id_2', 'episode_id_4', 'tv_show_episode', '2024-05-24', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- user_id_3 watching movie_id_3 (The Dark Knight)
INSERT INTO user_watch_history (id, user_id, content_id, content_type, watched_on, ratings, created_at, updated_at)
VALUES
  ('watch_history_id_3', 'user_id_3', 'movie_id_3', 'movie', '2024-05-23', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- user_id_4 watching tv_show_id_1 (Game of Thrones) - episode_id_1 (Winter Is Coming)
INSERT INTO user_watch_history (id, user_id, content_id, content_type, watched_on, ratings, created_at, updated_at)
VALUES
  ('watch_history_id_4', 'user_id_4', 'episode_id_1', 'tv_show_episode', '2024-05-22', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- USER FAVORITES
-- user_id_1 marking movie_id_2 (The Godfather) as favorite
INSERT INTO user_favorites (id, user_id, content_id, content_type, is_removed, created_at, updated_at)
VALUES
  ('favorite_id_1', 'user_id_1', 'movie_id_2', 'movie', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- user_id_2 marking tv_show_id_1 (Game of Thrones) as favorite
INSERT INTO user_favorites (id, user_id, content_id, content_type, is_removed, created_at, updated_at)
VALUES
  ('favorite_id_2', 'user_id_2', 'tv_show_id_1', 'tv_show', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- user_id_3 marking movie_id_4 (Pulp Fiction) as favorite
INSERT INTO user_favorites (id, user_id, content_id, content_type, is_removed, created_at, updated_at)
VALUES
  ('favorite_id_3', 'user_id_3', 'movie_id_4', 'movie', FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- INDEXES FOR FASTER QUERYING
CREATE INDEX idx_user_favorites_user_id_is_removed_created_at
ON user_favorites (user_id, is_removed, created_at DESC);

CREATE INDEX idx_movies_id ON movies (id);

CREATE INDEX idx_tv_show_id ON tv_show (id);


