export interface ProfileUser {
  wallet: string;
  points: number;
  createdAt: string;
}

export interface ProfileActivity {
  id: string;
  wallet: string;
  title: string;
  points: number;
  txHash?: string | null;
  createdAt: string;
  date?: string; // Optional date field for display purposes
}

export interface ProfileAchievement {
  id: string;
  wallet: string;
  title: string;
  description: string;
  current: number;
  target: number;
  createdAt: string;
}

export interface CreateWalletRequest {
  wallet: string;
}

export interface CreateActivityRequest {
  title: string;
  points: number;
}

export interface PaginatedActivities {
  activities: ProfileActivity[];
  total: number;
  page: number;
  size: number;
}
