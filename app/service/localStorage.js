import AsyncStorage  from '@react-native-community/async-storage';

export const _storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log('setdata', key + ': ' + value);
    }
    catch(error) {
        //Error saving data
        console.log('AsyncStorage_setItem' ,error);
    }
}

export const _retrieveData = async (key) => {
    try {
        var str = await AsyncStorage.getItem(key);
        var value = JSON.parse(str);
        console.log('getdata', key + ': ' +value)
        if(value === null) return '';
        return value;
    }
    catch(error) {
        // Error retrieving data
        console.log('AsyncStorage_getItem', key + ': ' + error);
    }
    return '';
}