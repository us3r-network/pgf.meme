export type UserData = {
  id: string;
  name: string;
  email?: string;
};

export type UserLeaderboardData = {
  user: {
    walletAddress: string;
    name?: string;
    avatar?: string;
  };
  ethAmount: number;
  memeAmount: number;
  proportion: number | string;
};

export type OwnedMemeData = {
  user: {
    walletAddress: string;
    name?: string;
    avatar?: string;
  };
  meme: {
    address: string;
    name: string;
    image: string;
  };
  memeAmount: number;
  ethAmount: number;
  usdAmount: number;
};

export type EnsProfile = {
  address: string;
  identity: string;
  platform: string;
  displayName: string;
  avatar: string;
  description: string;
  email: string;
  location: string;
  header: string;
  contenthash: string;
  links: {
    website: {
      link: string;
      handle: string;
    };
  };
  social: {};
};
