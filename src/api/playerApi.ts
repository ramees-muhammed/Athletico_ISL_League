
//playerApi.ts//

import type { Player } from '../types';

import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase.config';


const playerCol = collection(db, 'players');

export const fetchPlayers = async (isAdmin: boolean) => {
  // If not admin, only fetch accepted players
  const q = isAdmin 
    ? query(playerCol, orderBy('createdAt', 'desc'))
    : query(playerCol, where('status', '==', 'accepted'), orderBy('createdAt', 'desc'));
    
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Player));
};

export const registerPlayer = async (playerData: Omit<Player, 'id' | 'status' | 'createdAt'>) => {
console.log("playerDataaaa", playerData);


  const allPlayers = await getDocs(playerCol);
  if (allPlayers.size >= 50) throw new Error('Registration Limit Reached');

  return await addDoc(playerCol, {
    ...playerData,
    status: 'pending', // Centralized status management
    createdAt: Date.now()
  });
};