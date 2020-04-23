import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {AppStateType} from "../../store";
import {getCatInfo} from "../../reducer";

type OwnPropsType = {
    id: number
    name: string
    more: string
    shortInfo: string
}
type MDTPType = {
    getCatInfo: (id: number, more: string) => void
}
type PropsType = OwnPropsType & MDTPType

const Wrapper = styled.div`
  margin-left: 5px;
  border: 2px solid skyblue;
  :hover {
    background-color:skyblue;
    cursor: pointer;
  }
`
const Item = (props: PropsType) => {
    const name = props.name
    const shortInfo = props.shortInfo
    const id = props.id
    const more = props.more
    return (
        <Wrapper onClick={() => props.getCatInfo(id, more)}>
            <div>{name}</div>
            <div>{shortInfo}</div>
        </Wrapper>
    )
}
export default connect<{}, MDTPType, {}, AppStateType>(null, {getCatInfo})(Item)