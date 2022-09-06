import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import User from '../models/user.model';

export async function register(email: string, password: string, firstName: string, lastName: string): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = { id: userCredential.user.uid, email, firstName, lastName } as User;
  await setDoc(doc(db, 'users', user.id), user);
  return user;
}

export async function login(email: string, password: string): Promise<void> {
  const response = signInWithEmailAndPassword(auth, email, password);
  console.log('Login successful!');
}

export async function logout(): Promise<void> {
  return signOut(auth);
}

export async function deleteAccount(): Promise<void> {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('There is no currently authenticated User!');
  await deleteDoc(doc(db, 'users', currentUser.uid));
  await deleteUser(currentUser);
}
