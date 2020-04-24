import axios from 'axios'
import { CatType } from './types/entities'

type GetCatInfoType = {
    id: number
    bio: string
    pic: string
}
type GetCatsResponseType = {
    basepath: string
    data: Array<CatType>
}
type GetCatPicType = {
    pic: string
}
const instance = axios.create({
    baseURL: `https://cors-anywhere.herokuapp.com/https://mrsoft.by/tz20/`
})
export const api = {
    getCats() {
        return (
            instance.get<GetCatsResponseType>(`list.json`)
        )
    },
    getCatInfo(more: string) {
        return (
            instance.get<GetCatInfoType>(`${more}`)
        )
    },
    getCatPic(picUrl: string) {
        return (
            instance.get<GetCatPicType>(`${picUrl}`)
        )
    }
}