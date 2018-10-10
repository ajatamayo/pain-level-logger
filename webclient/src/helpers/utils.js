import crypto from 'crypto';
import { CLIENT_ID, ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/localStorage';

async function generateRandomString(length = 24) {
  try {
    const buf = crypto.randomBytes(length);
    return buf.toString('hex');
  } catch (err) {
    return false;
  }
}

async function getOrGenerateClientId() {
  try {
    let clientId;
    clientId = localStorage.getItem(CLIENT_ID);
    if (!clientId) {
      const newClientId = await generateRandomString(40);
      localStorage.setItem(CLIENT_ID, newClientId);
      clientId = newClientId;
    }
    return clientId;
  } catch (err) {
    return false;
  }
}

function removeAuthTokens() {
  localStorage.removeItem(CLIENT_ID);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

export {
  generateRandomString,
  getOrGenerateClientId,
  removeAuthTokens,
};
