// @flow

import forge from 'node-forge'


function getPinIterations(pin) {
  return 3 * parseInt(pin, 10)
}

function getNumIterations(min: number, max: number, pin: ?number) {
  if (pin) {
    return getPinIterations(pin)
  }
  return Math.floor(Math.random() * ((max - min) + 1)) + min
}

const MIN_ITERATIONS = 5000
const MAX_ITERATIONS = 10000

export default class Encryption {
  static encrypt(data: Object, password: string, pin: ?number): string {
    const iterations = getNumIterations(MIN_ITERATIONS, MAX_ITERATIONS, pin)
    const salt = forge.random.getBytesSync(128)
    const key = forge.pkcs5.pbkdf2(password, salt, iterations, 32)
    const iv = forge.random.getBytesSync(32)

    const cipher = forge.cipher.createCipher('AES-CBC', key)
    cipher.start({ iv })
    cipher.update(forge.util.createBuffer(JSON.stringify(data)))
    cipher.finish()
    const encrypted = cipher.output

    return btoa(JSON.stringify({
      iterations: pin ? null : iterations,
      iv: forge.util.bytesToHex(iv),
      salt: forge.util.bytesToHex(salt),
      data: encrypted.toHex(),
    }))
  }

  static decrypt(encrypted: string, password: string, pin: ?number): Object | null {
    const decrypted = JSON.parse(atob(encrypted))
    let { iterations, iv, salt } = decrypted
    if (pin) {
      iterations = getPinIterations(pin)
    }

    iv = forge.util.hexToBytes(iv)
    salt = forge.util.hexToBytes(salt)
    const dataBuffer = forge.util.createBuffer()
    dataBuffer.putBytes(forge.util.hexToBytes(decrypted.data))

    try {
      const key = forge.pkcs5.pbkdf2(password, salt, iterations, 32)
      const decipher = forge.cipher.createDecipher('AES-CBC', key)
      decipher.start({ iv })
      decipher.update(dataBuffer)
      return decipher.finish() ? JSON.parse(decipher.output) : null
    } catch (e) {
      return null
    }
  }
}
