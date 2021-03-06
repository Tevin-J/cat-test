import React, {useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {AppStateType} from "../../store";
import {getCatInfo, removeCat} from "../../reducer";
import './Item.css'
import {CatType} from "../../types/entities";

const Wrapper = styled.div`
  margin-left: 5px;
  border: 2px solid skyblue;
  position: relative;
  :hover {
    background-color:skyblue;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`

type OwnPropsType = {
    id: number
    name: string
    more: string
    shortInfo: string
    cat: CatType
}
type MDTPType = {
    getCatInfo: (id: number, more: string) => void
    removeCat: (cat: CatType) => void
}
type PropsType = OwnPropsType & MDTPType

const Item: React.FC<PropsType> = (props) => {
    /*props*/
    const name = props.name
    const shortInfo = props.shortInfo
    const id = props.id
    const more = props.more
    /*hook*/
    const [isCatRemoved, addRemoveCatClass] = useState(false)
    /*classForRemovedCat*/
    const classesForCat = isCatRemoved ? 'removedCat' : ''
    return (
        <Wrapper className={classesForCat}>
            <div onClick={() => props.getCatInfo(id, more)}>
                <div>{name}</div>
                <div>{shortInfo}</div>
            </div>
            {isCatRemoved ? '' : <button onClick={() => {
                props.removeCat(props.cat)
                addRemoveCatClass(true)
            }}>X</button>}
        </Wrapper>
    )
}
export default connect<{}, MDTPType, {}, AppStateType>(null, {getCatInfo, removeCat})(Item)