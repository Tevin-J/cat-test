import { CatType, CatInfoType } from "./types/entities"
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./store";
import { api } from "./api";
export const SET_CATS = 'SET_CATS'
export const TOGGLE_CURRENT_CAT = 'TOGGLE_CURRENT_CAT'
export const SET_CAT_INFO = 'SET_CAT_INFO'

type InitialStateType = {
    cats: Array<CatType>
    currentCatId: number | null
    currentCatInfo: CatInfoType
}
const initialState: InitialStateType = {
    cats: [],
    currentCatId: null,
    currentCatInfo: {} as CatInfoType
}
const reducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    console.log(state.currentCatId);
    switch (action.type) {
        case SET_CATS:
            return {
                ...state,
                cats: action.cats
            }
        case TOGGLE_CURRENT_CAT:
            return {
                ...state,
                currentCatId: action.id
            }
        case SET_CAT_INFO:
            return {
                ...state,
                currentCatInfo: action.catInfo
            }
        default:
            return state
    }
}
/*action creators types*/
type SetCatsType = {
    type: typeof SET_CATS
    cats: Array<CatType>
}
type ToggleCurrentCatType = {
    type: typeof TOGGLE_CURRENT_CAT
    id: number
}
type SetCatInfoType = {
    type: typeof SET_CAT_INFO
    catInfo: CatInfoType
}
type AppActionType = SetCatsType | ToggleCurrentCatType | SetCatInfoType
/*action creators*/
const setCatsSuccess = (cats: Array<CatType>): SetCatsType => ({type: SET_CATS, cats})
export const toggleCurrentCat = (id: number): ToggleCurrentCatType => ({type: TOGGLE_CURRENT_CAT, id})
const setCatInfoSuccess = (catInfo: CatInfoType): SetCatInfoType => ({type: SET_CAT_INFO, catInfo})
/*thunk creators*/
type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionType>
export const getCats = (): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, AppActionType>,
                                         getState: () => AppStateType) => {
    api.getCats()
        .then(response => {
            dispatch(setCatsSuccess(response.data.data))
        })
        .catch((error) => {
            console.log(error);
        })
}
export const getCatInfo = (id: number, more: string): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, AppActionType>,
                                         getState: () => AppStateType) => {
    dispatch(toggleCurrentCat(id))
    api.getCatInfo(more)
        .then(response => {
            dispatch(setCatInfoSuccess(response.data))
        })
        .catch((error) => {
            console.log(error);
        })
}
export default reducer