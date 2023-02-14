import { createStore } from "redux";
import reducers from "redux/reducers";
import { setData } from "redux/actions";


export interface ConfigureStore {
    isFirstLoad: boolean;
    reLogin: boolean;
    isNewVersion: boolean;
    sidebarOpen: boolean;
}

const state: ConfigureStore = {
    isFirstLoad: true,
    reLogin: false,
    isNewVersion: false,
    sidebarOpen: false
}

const configureStore = createStore(reducers, state);

export function storeDispatch(props: (Partial<ConfigureStore> | ((data: ConfigureStore) => Partial<ConfigureStore>))) {
    if (typeof props === "function") {
        configureStore.dispatch(setData(props(configureStore.getState())))
    }
    else configureStore.dispatch(setData(props))
}

export default configureStore;
