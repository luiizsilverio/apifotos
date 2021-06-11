import AsyncStorage from '@react-native-async-storage/async-storage'

export const StorageService = {
    async get(key) {
        try {
            const response = await AsyncStorage.getItem(key)
            if (response) {
                return JSON.parse(response)
            } else {
                return ''
            }
        } catch(err) {
            console.error(err)
            return ''
        }
    },
    async set(key, value) {
        if (!value) {
            value = []
        }
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value))
        } catch(err) {
            console.error(err)
            return ''
        }        
    }
}