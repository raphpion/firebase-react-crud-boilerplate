import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import User from '../models/user.model';

export async function register(email: string, password: string, firstName: string, lastName: string): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = { id: userCredential.user.uid, email, firstName, lastName } as User;
  await setDoc(doc(db, 'users', user.id), user);
  console.log('Account created successfully!');
  return user;
}

export async function login(email: string, password: string): Promise<void> {
  const response = signInWithEmailAndPassword(auth, email, password);
  console.log('Login successful!');
}

export async function logout(): Promise<void> {
  await signOut(auth);
  console.log('Logout successful!');
}
