import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, deleteUser, updateEmail, signInWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth';
import { doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import User, { UpdateUserPayload } from '../models/user.model';

export async function deleteAccount(): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('There is no currently authenticated User!');
  await deleteDoc(doc(db, 'users', currentUser.uid));
  await deleteUser(currentUser);
}

export async function getUserById(id: string): Promise<User | null> {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists) return null;
  return docSnap.data() as User;
}

export async function login(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout(): Promise<void> {
  return signOut(auth);
}

export async function register(email: string, password: string, firstName: string, lastName: string): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = { id: userCredential.user.uid, email, firstName, lastName } as User;
  await setDoc(doc(db, 'users', user.id), user);
  return user;
}

export async function updateUser(id: string, payload: UpdateUserPayload): Promise<User> {
  const user = await getUserById(id);
  if (!user) throw new Error('User is not found!');

  const updatedUser = { ...user, ...payload };
  await setDoc(doc(db, 'users', user.id), updatedUser);
  return updatedUser;
}

export async function updateUserEmail(email: string): Promise<User> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('There is no currently authenticated User!');

  const user = await getUserById(currentUser.uid);
  if (!user) throw new Error('User is not found!');

  await updateEmail(currentUser, email);
  const updatedUser = { ...user, email };
  await setDoc(doc(db, 'users', user.id), updatedUser);
  return updatedUser;
}

export async function updateUserPassword(password: string): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('There is no currently authenticated User!');
  await updatePassword(currentUser, password);
}
