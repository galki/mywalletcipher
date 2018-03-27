// @flow

import forge from 'node-forge'


const salt = forge.random.getBytesSync(128)
const iv = forge.random.getBytesSync(16)

export default class Encryption {
  static numIterations: number = 60

  static encrypt(password: string, data: Object): string {
    const key = forge.pkcs5.pbkdf2(password, salt, this.numIterations, 16)

    const cipher = forge.cipher.createCipher('AES-CBC', key)
    cipher.start({ iv })
    cipher.update(forge.util.createBuffer(JSON.stringify(data)))
    cipher.finish()
    const encrypted = cipher.output
    return encrypted.toHex()
  }

  static decrypt(data: Object, password: string): Object | boolean {
    const key = forge.pkcs5.pbkdf2(password, salt, this.numIterations, 16)
    // const iv = forge.random.getBytesSync(16)

    const x = forge.util.createBuffer()
    x.putBytes(forge.util.hexToBytes(data))

    const decipher = forge.cipher.createDecipher('AES-CBC', key)
    decipher.start({ iv })
    decipher.update(x)
    return decipher.finish() ? JSON.parse(decipher.output) : false
  }
}
