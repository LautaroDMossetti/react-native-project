import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthStorage {
  constructor (namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken () {
    const token = await AsyncStorage.getItem(this.namespace)

    return token || null
  }

  async setAccessToken (token) {
    await AsyncStorage.setItem(this.namespace, token)
  }

  async removeAccessToken () {
    await AsyncStorage.removeItem(this.namespace)
  }
}

export default AuthStorage
