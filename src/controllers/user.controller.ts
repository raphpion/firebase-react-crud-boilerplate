import { auth, db, provider } from '../firebaseConfig';
import { doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import User, { UpdateUserPayload } from '../models/user.model';
import { signInWithPopup, signOut } from 'firebase/auth';

export async function getCurrentUser(): Promise<User | null> {
  if (!auth.currentUser) return null;
  return getUserById(auth.currentUser.uid);
}

export async function getUserById(id: string): Promise<User | null> {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists) return null;
  return docSnap.data() as User;
}

export async function createUser(): Promise<User> {
  const authUser = auth.currentUser;
  if (!authUser) throw new Error('There is no current User!');
  const user = await getUserById(authUser.uid);
  if (user) throw new Error('User already exists!');
  const newUser: User = {
    id: authUser.uid,
    email: authUser.uid,
    displayName: authUser.displayName,
    photoURL: authUser.photoURL,
  };
  await setDoc(doc(db, 'users', newUser.id), newUser);
  return newUser;
}

export async function deleteUser(): Promise<void> {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('There is no User to delete!');
  const docRef = doc(db, 'users', currentUser.id);
  return deleteDoc(docRef);
}

export async function updateUser(id: string, payload: UpdateUserPayload): Promise<User> {
  const user = await getUserById(id);
  if (!user) throw new Error('User is not found!');

  const updatedUser = { ...user, ...payload };
  await setDoc(doc(db, 'users', user.id), updatedUser);
  return updatedUser;
}

export async function login(): Promise<User | null> {
  const userCredential = await signInWithPopup(auth, provider);
  const authUser = userCredential.user;
  return getUserById(authUser.uid);
}

export async function logout(): Promise<void> {
  return signOut(auth);
}
