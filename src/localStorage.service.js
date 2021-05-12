const LOCAL_STORAGE_PREFIX = 'study_with_me_';

const setObject = (key, object) => {
    const str = JSON.stringify(object);
    try {
        localStorage.setItem(LOCAL_STORAGE_PREFIX + key, str);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const getObject = (key) => {
    const object = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    try {
        return JSON.parse(object);
    } catch (e) {
        console.error(e);
        return {};
    }
};

const removeItem = (key) => {
    localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);
};

export const setUserInLocalStorage = (userObject) => {
    setObject('userDetails', userObject);
}

export const getUserFromLocalStorage = () => {
    getObject('userDetails');
}

export const removeUserFromLocalStorage = () => {
    removeItem('userDetails');
}
