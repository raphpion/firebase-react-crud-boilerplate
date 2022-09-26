interface UpdateUserPayload {
  displayName?: string | null;
  photoURL?: string | null;
}

interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

interface UserSlice {
  user: User | null;
}

export default User;
export type { UpdateUserPayload, UserSlice };
