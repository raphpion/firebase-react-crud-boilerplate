interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default User;
export type { UpdateUserPayload };
