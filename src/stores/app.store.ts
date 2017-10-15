import {action, computed, autorun, observable} from 'mobx';
import {appInjector} from "../core/appInjector";


class AppStore {

    @observable currentUserNavDetails

    @action
    updateCurrentUser(user: any) {
        if (user) {
            this.currentUserNavDetails = {
                email: user.email
            };
        }
        else {
            let currentUser = appInjector.get('authService').getCurrentUser();
            if (!currentUser) {
                this.currentUserNavDetails = null;
            }
            else {
                this.currentUserNavDetails = {
                    email: currentUser.email
                };
            }
        }
    }

    @action
    async waitForUser() {
        let currentUser = await  appInjector.get('authService').waitForCurrentUser();
        this.updateCurrentUser(currentUser);
    }

    constructor(initialStore: any) {

    }
}

export function getAppStore(initialState: any) {
    return new AppStore({});
}

autorun(() => {

});

