import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import config from "../config";
export default {
    init() {
        global.storage = new Storage({
            size: 1000,
            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,
            defaultExpires: null
        });
    },
    token(success, fail) {
        storage.load({
            key: config.cache.token,
            autoSync: false
        }).then(ret => {
            success(ret);
        }).catch(err => {
            fail(err);
        });
    },
    LogOut() {
        global.token = "";
        storage.remove({ key: config.cache.token });
    },
    searchData(success, fail) {
        storage.load({
            key: config.cache.search,
            autoSync: false
        }).then(data => {
            success(data);
        }).catch(err => {
            fail(err);
        });
    }
};

