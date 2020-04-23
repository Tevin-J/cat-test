import * as React from "react";
import {CatInfoType, CatType} from "../../types/entities";
import {AppStateType} from "../../store";
import {connect} from "react-redux";
import styled from "styled-components";

type MSTPType = {
    cats: Array<CatType>
    currentCatId: number | null
    currentCatInfo: CatInfoType
}
type PropsType = MSTPType
const Wrapper = styled.div`
  margin: 30px;
`
const ItemDetails = (props: PropsType) => {
    const currentCatId = props.currentCatId
    const cats = props.cats
    const currentCatInfo = props.currentCatInfo
    if (cats && currentCatId) {
        return (
            <Wrapper>
                {/*<img src={currentCatInfo.pic}/>*/}
                <h1>{cats.filter((cat: CatType) => cat.id === currentCatId)[0].name}</h1>
                <div>{currentCatInfo.bio}</div>
            </Wrapper>
        )
    } else {
        return (
            <div>Select a cat</div>
        )
    }
}
const mstp = (state: AppStateType): MSTPType => {
    return {
        cats: state.catsList.cats,
        currentCatId: state.catsList.currentCatId,
        currentCatInfo: state.catsList.currentCatInfo
    }
}
export default connect<MSTPType, {}, {}, AppStateType>(mstp, {})(ItemDetails)