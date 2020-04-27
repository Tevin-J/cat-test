import { CatType, CatInfoType } from "./types/entities"
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./store";
import { api } from "./api";

type InitialStateType = typeof initialState

const initialState = {
    cats: [] as Array<CatType>,
    currentCatId: null as null | number,
    currentCatInfo: {} as CatInfoType,
    removedCats: [] as Array<CatType>
}

const reducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_CATS':
            return {
                ...state,
                cats: action.cats
            }
        case 'TOGGLE_CURRENT_CAT':
            return {
                ...state,
                currentCatId: action.id
            }
        case 'SET_CAT_INFO':
            return {
                ...state,
                currentCatInfo: action.catInfo
            }
        case 'REMOVE_CAT':
            return {
                ...state,
                removedCats: [...state.removedCats, action.cat]
            }
        default:
            return state
    }
}
/*action creators types*/
type AppActionType = InferActionTypes<typeof actions>
/*action creators*/
const actions = {
    setCatsSuccess: (cats: Array<CatType>) => ({type: 'SET_CATS', cats} as const),
    toggleCurrentCat: (id: number) => ({type: 'TOGGLE_CURRENT_CAT', id} as const),
    setCatInfoSuccess: (catInfo: CatInfoType) => ({type: 'SET_CAT_INFO', catInfo} as const),
    removeCatSuccess: (cat: CatType) => ({type: 'REMOVE_CAT', cat} as const)
}
/*thunk creators*/
type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionType>
export const getCats = (): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, AppActionType>,
                                         getState: () => AppStateType) => {
    let response = await api.getCats()
    try {
        dispatch(actions.setCatsSuccess(response.data.data))
    } catch (e){
        console.log(e);
    }
}
export const getCatInfo = (id: number, more: string): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, AppActionType>,
                                                                           getState: () => AppStateType) => {
    dispatch(actions.toggleCurrentCat(id))
    let response = await api.getCatInfo(more)
    try {
        dispatch(actions.setCatInfoSuccess(response.data))
    } catch (e) {
        console.log(e);
    }
}
export const removeCat = (cat: CatType): ThunkType => async (dispatch: ThunkDispatch<AppStateType, unknown, AppActionType>,
                                                                          getState: () => AppStateType) => {
    dispatch(actions.removeCatSuccess(cat))
}
export default reducer