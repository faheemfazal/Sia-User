import { configureStore } from "@reduxjs/toolkit";
import {cliendSliceReducer} from "./slice/userReducer";
// import {adminSliceReducer} from "./slice/adminReducer";
import {
        persistStore,
        persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfigUser = {key :"user", storage, version: 1}
// const persistConfigAdmin = {key:"admin",storage, version:1}

const userPersistedReducer = persistReducer(
    persistConfigUser,
    cliendSliceReducer.reducer
)

// const adminPersistConfigAdmin = persistReducer(
//     persistConfigAdmin,
//     adminSliceReducer.reducer
// )

export const store = configureStore({
    reducer:{
        userSlice: userPersistedReducer,
        // adminSlice:adminPersistConfigAdmin
    },
    middleware:(getDefaultMiddleware)=>
       getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH , REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
       })
    
})



export const persistor = persistStore(store);