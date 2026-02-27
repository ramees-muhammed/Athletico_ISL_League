import axios from 'axios';
import type { Player } from '../types';


const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/players`;

export const fetchPlayersAxios = async (): Promise<Player[]> => {
  const { data } = await axios.get(BASE_URL);
  
  // Firebase REST API returns a specific structure: { documents: [{ fields: {...} }] }
  if (!data.documents) return [];

  return data.documents.map((doc: any) => {
    const fields = doc.fields;
    return {
      id: doc.name.split('/').pop(), // Extracts the document ID
      fullname: fields.fullname?.stringValue || '',
      phone: fields.phone?.stringValue || '',
      place: fields.place?.stringValue || '',
    //   age: Number(fields.age?.integerValue || 0),
      club: fields.club?.stringValue || '',
      position: fields.position?.stringValue || 'FW',
      status: fields.status?.stringValue || 'Pending',
      facePhotoUrl: fields.facePhotoUrl?.stringValue || '',
      fullPhotoUrl: fields.fullPhotoUrl?.stringValue || '',
      createdAt: Number(fields.createdAt?.integerValue || Date.now()),
    } as Player;
  });
};