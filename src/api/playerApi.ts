
//playerApi.ts//

import type { Player } from '../types';

import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase.config';
import axios from 'axios';


const playerCol = collection(db, 'players');
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/players`;

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


export const updatePlayerStatusAxios = async ({ id, newStatus }: { id: string; newStatus: string }) => {
  const url = `${BASE_URL}/${id}?updateMask.fieldPaths=status`;
  // Firebase REST API expects a specific JSON structure for updates
  const payload = {
    fields: {
      status: { stringValue: newStatus }
    }
  };
  return axios.patch(url, payload);
};

export const deletePlayerAxios = async (id: string) => {
  const url = `${BASE_URL}/${id}`;
  return axios.delete(url);
};