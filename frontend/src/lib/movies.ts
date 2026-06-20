export type Movie = {
  id: string;
  title: string;
  year: number;
  runtime: number; // minutes
  director: string;
  genre: string[];
  rating: number; // out of 10
  synopsis: string;
  cast: string[];
  country: string;
  poster: string; // Unsplash URL
};

export const GENRES = ["All", "Drama", "Thriller", "Sci-Fi", "Romance", "Crime", "Comedy", "Documentary"] as const;

// Helper to build Unsplash URLs with grayscale tone matching the B&W theme.
const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop&sat=-100`;

export const movies: Movie[] = [
  {
    id: "persona",
    title: "Persona",
    year: 1966,
    runtime: 83,
    director: "Ingmar Bergman",
    genre: ["Drama"],
    rating: 8.1,
    synopsis:
      "A young nurse cares for a mute actress, and the boundaries of identity slowly dissolve between them.",
    cast: ["Bibi Andersson", "Liv Ullmann"],
    country: "Sweden",
    poster: u("photo-1485846234645-a62644f84728"),
  },
  {
    id: "stalker",
    title: "Stalker",
    year: 1979,
    runtime: 162,
    director: "Andrei Tarkovsky",
    genre: ["Sci-Fi", "Drama"],
    rating: 8.2,
    synopsis:
      "A guide leads two men into the Zone, a forbidden territory where desire takes physical shape.",
    cast: ["Alexander Kaidanovsky", "Anatoly Solonitsyn"],
    country: "Soviet Union",
    poster: u("photo-1478720568477-152d9b164e26"),
  },
  {
    id: "in-the-mood-for-love",
    title: "In the Mood for Love",
    year: 2000,
    runtime: 98,
    director: "Wong Kar-wai",
    genre: ["Romance", "Drama"],
    rating: 8.1,
    synopsis:
      "Two neighbours form a quiet bond after discovering their spouses are having an affair.",
    cast: ["Tony Leung", "Maggie Cheung"],
    country: "Hong Kong",
    poster: u("photo-1517602302552-471fe67acf66"),
  },
  {
    id: "no-country",
    title: "No Country for Old Men",
    year: 2007,
    runtime: 122,
    director: "Joel & Ethan Coen",
    genre: ["Thriller", "Crime"],
    rating: 8.2,
    synopsis:
      "A hunter stumbles on the aftermath of a drug deal and is pursued across Texas by a calm, faceless killer.",
    cast: ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin"],
    country: "United States",
    poster: u("photo-1500530855697-b586d89ba3ee"),
  },
  {
    id: "the-lighthouse",
    title: "The Lighthouse",
    year: 2019,
    runtime: 109,
    director: "Robert Eggers",
    genre: ["Drama", "Thriller"],
    rating: 7.4,
    synopsis:
      "Two keepers descend into mythology and madness on a remote New England island.",
    cast: ["Robert Pattinson", "Willem Dafoe"],
    country: "United States",
    poster: u("photo-1507272931001-fc06c17e4f43"),
  },
  {
    id: "roma",
    title: "Roma",
    year: 2018,
    runtime: 135,
    director: "Alfonso Cuarón",
    genre: ["Drama"],
    rating: 7.7,
    synopsis: "A year in the life of a housekeeper for a middle-class family in 1970s Mexico City.",
    cast: ["Yalitza Aparicio", "Marina de Tavira"],
    country: "Mexico",
    poster: u("photo-1519183071298-a2962feb14f4"),
  },
  {
    id: "manhattan",
    title: "Manhattan",
    year: 1979,
    runtime: 96,
    director: "Woody Allen",
    genre: ["Romance", "Comedy"],
    rating: 7.8,
    synopsis:
      "A neurotic writer navigates love and work in a black-and-white New York that hums with Gershwin.",
    cast: ["Woody Allen", "Diane Keaton", "Mariel Hemingway"],
    country: "United States",
    poster: u("photo-1496442226666-8d4d0e62e6e9"),
  },
  {
    id: "raging-bull",
    title: "Raging Bull",
    year: 1980,
    runtime: 129,
    director: "Martin Scorsese",
    genre: ["Drama"],
    rating: 8.1,
    synopsis:
      "The rise and self-destruction of middleweight boxer Jake LaMotta, told in punishing close-up.",
    cast: ["Robert De Niro", "Joe Pesci"],
    country: "United States",
    poster: u("photo-1517438476312-10d79c077509"),
  },
  {
    id: "the-seventh-seal",
    title: "The Seventh Seal",
    year: 1957,
    runtime: 96,
    director: "Ingmar Bergman",
    genre: ["Drama"],
    rating: 8.1,
    synopsis:
      "A disillusioned knight returning from the Crusades plays a game of chess with Death.",
    cast: ["Max von Sydow", "Bengt Ekerot"],
    country: "Sweden",
    poster: u("photo-1518562180175-34a163b1a9a6"),
  },
  {
    id: "parasite",
    title: "Parasite",
    year: 2019,
    runtime: 132,
    director: "Bong Joon-ho",
    genre: ["Thriller", "Drama"],
    rating: 8.5,
    synopsis:
      "A poor family schemes their way into the household of a wealthy one, with unforeseen consequences.",
    cast: ["Song Kang-ho", "Lee Sun-kyun"],
    country: "South Korea",
    poster: u("photo-1533174072545-7a4b6ad7a6c3"),
  },
  {
    id: "her",
    title: "Her",
    year: 2013,
    runtime: 126,
    director: "Spike Jonze",
    genre: ["Romance", "Sci-Fi"],
    rating: 8.0,
    synopsis: "A lonely letter-writer falls in love with the voice of his new operating system.",
    cast: ["Joaquin Phoenix", "Scarlett Johansson"],
    country: "United States",
    poster: u("photo-1534447677768-be436bb09401"),
  },
  {
    id: "citizen-kane",
    title: "Citizen Kane",
    year: 1941,
    runtime: 119,
    director: "Orson Welles",
    genre: ["Drama"],
    rating: 8.3,
    synopsis:
      "A reporter chases the meaning of a newspaper tycoon's final whispered word: Rosebud.",
    cast: ["Orson Welles", "Joseph Cotten"],
    country: "United States",
    poster: u("photo-1440404653325-ab127d49abc1"),
  },
];
