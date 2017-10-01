import {action, autorun, observable} from 'mobx';


class AppStore {


    constructor(initialStore: any) {

    }
}

export function getAppStore(initialState: any) {
    return new AppStore({});
}

autorun(() => {

});

