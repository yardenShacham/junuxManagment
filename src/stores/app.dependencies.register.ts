import {StyleService} from '../core/styleService'
import {appInjector} from '../core/appInjector';
import {authService, entityService} from 'jx-core/src';

export function registerDependencies() {
    return new Promise((resolve, reject) => {
        if (appInjector) {
            appInjector.registerSingleton("styleService", StyleService);
            appInjector.registerSingleton("authService", authServiceMock);
            appInjector.registerSingleton("entityService", entityServiceMock);

            resolve();
        }
        else {
            reject("rejector has does not exsit or have some problems");
        }
    });
}


class entityServiceMock {

    allEntities: any

    constructor() {
        this.allEntities = {
            Users1: {
                fields: [1, 2, 5],
                name: "Users"
            }
        }
    }

    getEnteties(uid: any) {
        return Promise.resolve(this.allEntities);
    }

    getEntityById(entityId: any) {
        let entity = this.allEntities[entityId];
        let fields = [{
            fieldId: 1,
            input: {
                inputId: 1,
                inputType: 1
            },
            name: "First Name"
        }, {
            fieldId: 2,
            input: {
                inputId: 1,
                inputType: 1
            },
            name: "Last Name"
        }, {
            fieldId: 5,
            input: {
                inputId: 3,
                inputType: 10,
                subEntityField: {
                    fields: [{
                        fieldId: 3,
                        inputId: 1,
                        name: "City"
                    }, {
                        fieldId: 4,
                        inputId: 2,
                        name: "Post Code"
                    }]
                }
            },
            name: "Location"
        }];
        entity.fields = fields;
        return Promise.resolve(entity);
    }
}

class authServiceMock {
    currentLogedInUser: any

    constructor() {
        this.currentLogedInUser = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : null;
    }

    waitForCurrentUser() {
        return Promise.resolve(this.currentLogedInUser);
    }

    getCurrentUser() {
        return this.currentLogedInUser;
    }

    isAuthenticated() {
        return this.currentLogedInUser ? true : false;
    }

    signIn() {
        this.currentLogedInUser = {
            uid: "38vbwKv0jHdCCxpl2LXvizL2Leb2",
            email: "yarden101111@gmail.com"
        }
        localStorage.setItem("login", JSON.stringify(this.currentLogedInUser));
        return Promise.resolve(this.currentLogedInUser);
    }

    signOut() {
        this.currentLogedInUser = null;
        localStorage.removeItem('login');
        return Promise.resolve();
    }
}




