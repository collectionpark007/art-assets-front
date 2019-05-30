import RSAKey from './rsa';
import { b64tohex, hex2b64 } from './base64';

/**
 * RSA加密
 * @param pwd 密码
 * @param publicKey 就是接口中返回的modulus
 * @param exponent 
 */
export default function getEncryptedStr(pwd:string, publicKey: string, exponent: string): string {
  const rsaKey = new RSAKey();
  rsaKey.setPublic(b64tohex(publicKey), b64tohex(exponent));
  const enPassword = hex2b64(rsaKey.encrypt(pwd));
  return enPassword;
}