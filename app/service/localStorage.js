import AsyncStorage from "@react-native-community/async-storage";
import { ASKeys } from "../interface/AsyncStorageKeys";
export const _storeData = async (key, value) => {
  try {
    if (
      key === ASKeys.FB_TOKEN ||
      key === ASKeys.INSTAGRAM_TOKEN ||
      key === ASKeys.FB_SYNC ||
      key === ASKeys.IG_SYNC
    ) {
      var str = await AsyncStorage.getItem(ASKeys.USER_TOKEN);
      key = str + "_" + key;
    }
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("setdata", key + ": " + value);
  } catch (error) {
    //Error saving data
    console.log("AsyncStorage_setItem", error);
  }
};

export const _retrieveData = async key => {
  try {
    const key_temp = key;
    if (
      key === ASKeys.FB_TOKEN ||
      key === ASKeys.INSTAGRAM_TOKEN ||
      key === ASKeys.FB_SYNC ||
      key === ASKeys.IG_SYNC
    ) {
      var str = await AsyncStorage.getItem(ASKeys.USER_TOKEN);
      key = str + "_" + key;
    }
    var str = await AsyncStorage.getItem(key);
    if (!str) {
      if (key_temp === ASKeys.IG_SYNC) return true;
      return "";
    }
    var value = JSON.parse(str);
    console.log("getdata", key + ": " + value);
    return value;
  } catch (error) {
    // Error retrieving data
    console.log("AsyncStorage_getItem", key + ": " + error);
  }
  if (key === ASKeys.IG_SYNC) return true;
  return "";
};
