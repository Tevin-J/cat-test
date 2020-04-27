import * as React from "react";
import {CatInfoType, CatType} from "../../types/entities";
import {AppStateType} from "../../store";
import {connect} from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 30px;
`

type MSTPType = {
    cats: Array<CatType>
    currentCatId: number | null
    currentCatInfo: CatInfoType
}
type PropsType = MSTPType

const ItemDetails: React.FC<PropsType> = (props) => {
    /*props*/
    const currentCatId = props.currentCatId
    const cats = props.cats
    const currentCatInfo = props.currentCatInfo

    if (cats && currentCatId) {
        return (
            <Wrapper>
                <h1>{cats.filter((cat: CatType) => cat.id === currentCatId)[0].name}</h1>
                <img src={`https://mrsoft.by/tz20/${currentCatInfo.pic}`}/>
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
        currentCatInfo: state.catsList.currentCatInfo
    }
}
export default connect<MSTPType, {}, {}, AppStateType>(mstp, {})(ItemDetails)