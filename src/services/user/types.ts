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
  proportion: number | string;
};

export type UserOwnedData = {
  user: {
    walletAddress: string;
    name?: string;
    avatar?: string;
  };
  memeAmount: number;
  ethAmount: number;
};
