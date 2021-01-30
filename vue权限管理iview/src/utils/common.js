import CryptoJS from "crypto-js";

// 使用cryptojs来处理页面存储信息的加密以及解密
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量
//加密方法
const Encrypt = word => {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
};
//解密方法
const Decrypt = word => {
  if (word != null) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
};



// sessionStorage存储页面所需的一些信息
export const setSessionStorage = (keyName, Info) => {
  // 加密处理
  let encryptInfo = Encrypt(Info);
  sessionStorage.setItem(keyName, encryptInfo);
};
// 获取sessionStorage存储的信息
export const getSessionStorage = keyName => {
  let Info = sessionStorage.getItem(keyName);
  // 解密处理
  let decryptInfo = Decrypt(Info);
  return decryptInfo;
};
// 清除sessionStorage
export const clearSessionStorage = (...agm) => {
  // 判断有没有传入要删除的  如果有  则按传入的key删除  如果没有  则默认全部删除
  if (agm.length > 0) {
    for (let i = 0; i < agm.length; i++) {
      sessionStorage.removeItem(agm[i]);
    }
  } else {
    sessionStorage.clear();
  }
};