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
    inputTypes: any

    constructor() {
        this.allEntities = {
            Users1: {
                fields: [1, 2, 5],
                name: "Users"
            }
        }
        this.inputTypes = {
            1: "Text",
            2: "Number",
            3: "Checkbox",
            4: "Password",
            5: "Radio",
            6: "File",
            7: "Date",
            8: "Time",
            9: "Days Of Week",
            10: "Sub Entity"
        }
    }

    getTypeEnum() {
        return this.inputTypes;
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
            fieldId: 61,
            input: {
                inputId: 14,
                inputType: 2
            },
            name: "Age"
        }, {
            fieldId: 72,
            input: {
                inputId: 1354,
                inputType: 3
            },
            name: "Is Male"
        }, {
            fieldId: 73,
            input: {
                inputId: 1334,
                inputType: 4
            },
            name: "Password"
        }, {
            fieldId: 74,
            input: {
                inputId: 1324,
                inputType: 6
            },
            name: "Resume"
        }, {
            fieldId: 75,
            input: {
                inputId: 12,
                inputType: 7
            },
            name: "Date of Birth"
        }, {
            fieldId: 735,
            input: {
                inputId: 12,
                inputType: 8
            },
            name: "Born time"
        }, {
            fieldId: 7215,
            input: {
                inputId: 123,
                inputType: 9
            },
            name: "Selected Week"
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
        for (let i = 0; i < 20; i++) {
            fields.push({
                fieldId: 100 + i,
                input: {
                    inputId: 1,
                    inputType: 1
                },
                name: "First Name " + i
            });
        }
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




