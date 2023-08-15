import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../consts/consts';

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (text: string) => {
  return CryptoJS.AES.decrypt(text, SECRET_KEY).toString(CryptoJS.enc.Utf8);
};
