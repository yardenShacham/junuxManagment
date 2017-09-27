import {action, autorun, observable} from 'mobx';

class AppStore {
    private testService: any;

    constructor(initialStore: any) {
        this.testService = initialStore.testService;
    }
}

export function getAppStore(injector: any, initialState: any) {
    return new AppStore({
        testService: injector.get("testService")
    });
}

autorun(() => {

});

