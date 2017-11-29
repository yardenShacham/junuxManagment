import {
    action,
    observable,
    runInAction,
    computed
} from 'mobx';
import {appInjector} from '../core/appInjector';

class ViewStore {
    @observable currentViewName: string;
    @observable selectedEntityId: any;

    @computed
    get searchedViews() {
        return this.allViews ? this.allViews.filter((view: any) => {
            let isViewRelated = this.selectedEntityId ?
                view.relatedEntitiesIds.find((i: any) => i === this.selectedEntityId) : true;

            let isContainName = this.currentViewName ? view.name.toLowerCase()
                .includes(this.currentViewName.toLowerCase()) : true;
            return isViewRelated && isContainName;
        }) : []
    }

    @observable allViews;


    constructor(initialStore: any) {
        this.getAllViews();
    }

    @action
    searchViews(entityId: any, viewName: string) {
        this.selectedEntityId = entityId;
        this.currentViewName = viewName;
    }

    @action
    removeView = (viewId: any) => {
        appInjector.get('viewsService').removeView(viewId)
            .then(() => this.getAllViews());
    }

    @action
    getAllViews() {
        appInjector.get('viewsService').getViews().then((views: any[]) => {
            runInAction(() => {
                this.allViews = views;
            });
        });
    }
}

export function getViewStore(initialState: any) {
    return new ViewStore({});
}