import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {Slice} from "./slice"
//=> Data persistence
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['store']
}

const rootReducer = combineReducers({
    store: Slice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),

})