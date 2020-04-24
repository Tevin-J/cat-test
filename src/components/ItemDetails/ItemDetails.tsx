import * as React from "react";
import {CatInfoType, CatType} from "../../types/entities";
import {AppStateType} from "../../store";
import {connect} from "react-redux";
import styled from "styled-components";

type MSTPType = {
    cats: Array<CatType>
    currentCatId: number | null
    currentCatInfo: CatInfoType
    currentCatPic: string
}
type PropsType = MSTPType
const Wrapper = styled.div`
  margin: 30px;
`
const ItemDetails = (props: PropsType) => {
    const currentCatId = props.currentCatId
    const cats = props.cats
    const currentCatInfo = props.currentCatInfo
    const currentCatPic = props.currentCatPic
    if (cats && currentCatId) {
        return (
            <Wrapper>
                <h1>{cats.filter((cat: CatType) => cat.id === currentCatId)[0].name}</h1>
                <img src={currentCatPic}/>
                <div>{currentCatInfo.bio}</div>
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                <h1>Select a cat</h1>
            </Wrapper>
        )
    }
}
const mstp = (state: AppStateType): MSTPType => {
    return {
        cats: state.catsList.cats,
        currentCatId: state.catsList.currentCatId,
        currentCatInfo: state.catsList.currentCatInfo,
        currentCatPic: state.catsList.catPic
    }
}
export default connect<MSTPType, {}, {}, AppStateType>(mstp, {})(ItemDetails)