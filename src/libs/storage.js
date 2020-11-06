import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.error('Storage store err: ', err);

      return false;
    }
  };

  get = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      console.error('Storage get err: ', err);

      return false;
    }
  };

  multiGet = async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (err) {
      console.error('Storage multitGet err: ', err);

      throw Error(err);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (err) {
      console.error('Storage getAllKeys err: ', err);

      throw Error(err);
    }
  };

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (err) {
      console.error('Storage remove err: ', err);

      return false;
    }
  };
}

export default Storage;
