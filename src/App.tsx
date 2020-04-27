import React from 'react'
import ItemsList from "./components/ItemsList/ItemsList";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 50%;
    margin: 50px auto;
    display: grid;
    grid-template-columns: 30% 70%;
    border: 2px solid #000000;
`

function App() {
  return (
    <Wrapper>
      <ItemsList/>
      <ItemDetails/>
    </Wrapper>
  );
}

export default App;
