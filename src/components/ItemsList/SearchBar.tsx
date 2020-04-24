import React, {ChangeEvent, ChangeEventHandler} from "react";
import styled from "styled-components";


const InputWrapper = styled.div`
  width: 80%;
  margin: 5px auto 20px auto;
  input {
    width: 100%;
  }
`
type OwnPropsType = {
    updateSearch: (newText: string) => void
    term: string
}
type PropsType = OwnPropsType
const SearchBar = (props: PropsType) => {
    const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
        props.updateSearch(e.currentTarget.value.trimLeft())
    }
    return (
        <InputWrapper>
            <input placeholder={'search'} value={props.term} onChange={onInputChanged}/>
        </InputWrapper>
    )
}
export default SearchBar