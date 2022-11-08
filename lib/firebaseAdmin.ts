import { initializeApp, cert } from "firebase-admin/app";

import { getFirestore, FieldValue } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT ?? "{}");

// Initialize Firebase
try {
  initializeApp({
    credential: cert(serviceAccount),
  });
} catch (err: any) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err);
  }
}

const db = getFirestore();

// **** FUNCTIONS **** //

/**
 * Adds new word to dictionary
 * @param {String} word
 * @returns
 */
export const log = async (type: string, data: any) => {
  return await db.collection("log").add({
    time: FieldValue.serverTimestamp(),
    type: type,
    data: data,
  });
};

/**
 * Get config
 * @returns
 */
export const getConfig = async () => {
  const configRef = db.collection("config").doc("main");
  const doc = await configRef.get();
  if (!doc.exists) {
    log("Config", "Does not exist");
    return false;
  }
  return doc.data();
};

/**
 * Set block target
 * @param {number} blockNumber
 * @returns
 */
export const setBlockTarget = async (blockNumber: number) => {
  return db
    .collection("config")
    .doc("main")
    .update({ blockTarget: blockNumber });
};

/**
 * Set transaction hash
 * @param {string} txHash
 * @returns
 */
export const setTxHash = async (txHash: string) => {
  return db.collection("config").doc("main").update({ txHash });
};

exports.log = log;
