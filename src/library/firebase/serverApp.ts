import * as admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

function getFirebaseAdmin() {
  if (getApps().length === 0) {
    try {
      return admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.firebase_projectId,
          clientEmail: process.env.firebase_client_email,
          privateKey: process.env.firebase_private_key?.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error) {
      console.error('Firebase admin initialization error:', error);
      throw error;
    }
  } else {
    return getApps()[0];
  }
}

export const adminDb = admin.firestore(getFirebaseAdmin());

export async function createOrder(orderData: any) {
  const orderRef = await adminDb.collection('orders').add(orderData);
  return orderRef.id;
}
