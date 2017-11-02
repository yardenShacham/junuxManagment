import {StyleService} from '../core/styleService'
import {appInjector} from '../core/appInjector';
import {authService, entityService} from 'jx-core/src';
import {appConfiguration} from '../app.config';
import {FieldState} from '../entity';
import * as Guid from 'guid';

export function registerDependencies() {
    return new Promise((resolve, reject) => {
        if (appInjector) {
            appInjector.registerSingleton("styleService", StyleService);
            appInjector.registerSingleton("authService",
                appConfiguration.isTestMode ? authServiceMock : authService);
            appInjector.registerSingleton("entityService",
                appConfiguration.isTestMode ? entityServiceMock : entityService, true);

            resolve();
        }
        else {
            reject("rejector has does not exsit or have some problems");
        }
    });
}


class entityServiceMock {

    allEntities: any
    inputTypes: any
    usedInputs: any

    constructor() {
        this.allEntities = {
            Users1: {
                fields: [{
                    fieldId: Guid.raw(),
                    input: {
                        inputId: 1,
                        inputType: 1
                    },
                    name: "First Name"
                }, {
                    fieldId: Guid.raw(),
                    input: {
                        inputId: 1,
                        inputType: 1
                    },
                    name: "Last Name"
                }, {
                    fieldId: Guid.raw(),
                    input: {
                        inputId: 14,
                        inputType: 2
                    },
                    name: "Age"
                }, {
                    fieldId: Guid.raw(),
                    input: {
                        inputId: 1354,
                        inputType: 3
                    },
                    name: "Is Male"
                }, {
                    fieldId: Guid.raw(),
                    input: {
                        inputId: 1334,
                        inputType: 4
                    },
                    name: "Password"
                }, {
                    fieldId: Guid.raw(),
                    input: {
                        inputId: 1324,
                        inputType: 6
                    },
                    name: "Resume"
                }, {
                    fieldId: Guid.raw(),
                    input: {
                        inputId: 12,
                        inputType: 7
                    },
                    name: "Date of Birth"
                }, {
                    fieldId: Guid.raw(),
                    input: {
                        inputId: 12,
                        inputType: 8
                    },
                    name: "Born time"
                }, {
                    fieldId: Guid.raw(),
                    input: {
                        inputId: 123,
                        inputType: 9
                    },
                    name: "Selected Week"
                }, {
                    fieldId: Guid.raw(),
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
                }],
                name: "Users"
            }
        }
        this.inputTypes = {
            "checkbox": 3,
            "date": 7,
            "daysOfWeek": 9,
            "file": 6,
            "number": 2,
            "password": 4,
            "radio": 5,
            "subEntity": 10,
            "text": 1,
            "time": 8
        }
        this.usedInputs = {};
    }

    getTypeEnum() {
        return Promise.resolve(this.inputTypes);
    }

    getEnteties(uid: any) {
        return Promise.resolve(this.allEntities);
    }

    addField(entityId: any, fieldName: string, inputType: number) {
        this.allEntities[entityId].fields.push({
            fieldId: Guid.raw(),
            input: {
                inputId: Guid.raw(),
                inputType: inputType
            },
            name: fieldName
        });
        return Promise.resolve();
    }

    removeField(entityId: any, fieldId: any) {
        for (let i = 0; i < this.allEntities[entityId].fields.length; i++) {
            if (this.allEntities[entityId].fields[i].fieldId === fieldId) {
                this.allEntities[entityId].fields.splice(i, 1);
                return Promise.resolve();
            }
        }
        return Promise.reject("");
    }

    createNewUserInput(iType: string, desc: string) {
        this.usedInputs[Guid.raw()] = {
            inputType: iType,
            state: FieldState.CREATED,
            description: desc
        };

        return Promise.resolve();
    }

    removeUsedInput(inputId: any) {
        if (this.usedInputs[inputId])
            delete this.usedInputs[inputId];

        return Promise.resolve();
    }

    getUsedInputs() {
        return Promise.resolve(this.usedInputs);
    }

    initConnetedUser(user: any) {

    }

    getInputTypeEnum() {
        return Promise.resolve(this.inputTypes);
    }

    getEntityById(entityId: any) {
        let entity = this.allEntities[entityId];
        return Promise.resolve(Object.assign({}, entity, {entityId}));
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




