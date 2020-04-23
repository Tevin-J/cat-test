import * as React from "react";
import SearchBar from "./SearchBar";
import {connect} from "react-redux";
import {CatType} from "../../types/entities";
import {AppStateType} from "../../store";
import {getCats} from "../../reducer";
import {useEffect} from "react";
import Item from "./Item";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
`
type MSTPType = {
    cats: Array<CatType>
}
type MDTPType = {
    getCats: () => void
}
type PropsType = MDTPType & MSTPType

const ItemsList = (props: PropsType) => {
    useEffect(() => {
        props.getCats()
    }, [])
    const catsItems = props.cats.map(item => <Item key={item.id} id={item.id}
                                                   name={item.name} more={item.more}
                                                   shortInfo={item.shortInfo}/>)
    return (
        <div>
            <SearchBar/>
            <Wrapper>
                {catsItems}
            </Wrapper>
        </div>
    )
}
const mstp = (state: AppStateType): MSTPType => {
    return {
        cats: state.catsList.cats
    }
}
export default connect<MSTPType, MDTPType, {}, AppStateType>(mstp, {getCats})(ItemsList)