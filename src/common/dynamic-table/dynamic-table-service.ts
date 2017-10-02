import {camelCase, forEach, uniq, orderBy} from 'lodash';

export class dynamicTableService {
    getKeys(data: any[]) {
        let keys: string[] = [];
        forEach(data, (obj: any) => {
            keys = keys.concat(Object.keys(obj));
        });

        return orderBy(uniq(keys));
    }


    shika(){

    }
}