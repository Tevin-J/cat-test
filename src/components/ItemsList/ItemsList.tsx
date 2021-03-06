import * as React from "react";
import SearchBar from "./SearchBar";
import {connect} from "react-redux";
import {CatType} from "../../types/entities";
import {AppStateType} from "../../store";
import {getCats} from "../../reducer";
import {useEffect, useState} from "react";
import Item from "./Item";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
`

type MSTPType = {
    cats: Array<CatType>
    removedCats: Array<CatType>
}
type MDTPType = {
    getCats: () => void
}
type PropsType = MDTPType & MSTPType

const ItemsList: React.FC<PropsType> = (props) => {
    /*hook*/
    const [term, changeTerm] = useState('')
    /*first rendering component*/
    useEffect(() => {
        props.getCats()
    }, [])
    /*search bar realization*/
    const searchCat = (cats: Array<CatType>, term: string): Array<CatType> => {
        if (term.length === 0) {
            return cats
        }
        return cats.filter(cat => {
            return cat.name.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }
    const updateSearch = (term: string) => {
        changeTerm(term)
    }
    let nonRemovedCats = []
    nonRemovedCats = props.cats.filter(el => props.removedCats.indexOf(el) < 0)
    let resultCats = [...nonRemovedCats, ...props.removedCats]
    console.log(resultCats);
    /*render filtered cats*/
    const catsItems = searchCat(resultCats, term).map(item => <Item key={item.id} id={item.id}
                                                   name={item.name} more={item.more}
                                                   shortInfo={item.shortInfo} cat={item}/>)
    return (
        <div>
            <SearchBar updateSearch={updateSearch} term={term}/>
            <Wrapper>
                {catsItems}
            </Wrapper>
        </div>
    )
}
const mstp = (state: AppStateType): MSTPType => {
    return {
        cats: state.catsList.cats,
        removedCats: state.catsList.removedCats
    }
}
export default connect<MSTPType, MDTPType, {}, AppStateType>(mstp, {getCats})(ItemsList)