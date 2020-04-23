import React from "react";
import styled from "styled-components";


const InputWrapper = styled.div`
  width: 80%;
  margin: 5px auto 20px auto;
  input {
    width: 100%;
  }
`

const SearchBar = () => {
    return (
        <InputWrapper>
            <input placeholder={'search'}/>
        </InputWrapper>
    )
}
export default SearchBar