import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    catsList: reducer
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionTypes<T extends {[key: string]: (...args:any)=> any}> = ReturnType<PropertiesType<T>>

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store

// @ts-ignore
window.store = store