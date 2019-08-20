import React, { useState } from 'react'
import { ResultsLookup } from '../../types'
import { ISelectionPathData } from 'react-sidenav/types'
import GherkinDocument from '../gherkin/GherkinDocument'
import { messages } from 'cucumber-messages'
import GherkinDocumentSideNav from './GherkinDocumentSideNav'
import styled from 'styled-components'

// https://webdevtrick.com/css-sidebar-menu/

const Body = styled.div`
  font: 12px 'Open Sans', sans-serif;
  color: #212121;
  background: #eee;
  overflow-x: hidden;
`

const Container = styled.div`
  display: flex;
  min-height: 100%;
`

const SwipeInput = styled.input`
  position: absolute;
  opacity: 0;
`

const Headings = styled.div`
  flex: 1;
  padding: 80px 30px;
  background: #eee;
  box-shadow: 0 0 5px black;
  transform: translate3d(0, 0, 0);
  transition: transform .3s;
  
  ${SwipeInput}:checked ~ & {
    transform: translate3d(280px, 0px, 0px);
  }
`

const Sidebar = styled.div`
  transform: translate3d(-280px, 0px, 0px);
  position: absolute;
  width: 280px;
  background: #263249;
  color: #eee;
  left: 0;
  height: 100%;
  transition: all .3s;

  ${SwipeInput}:checked ~ & {
    transform: translate3d(0, 0, 0);
  }
`

const SwipeLabel = styled.label`
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 1;
  display: block;
  width: 42px;
  height: 42px;
  font: 42px fontawesome;
  text-align: center;
  color: #333;
  cursor: pointer;
  transform: translate3d(0, 0, 0);
  transition: transform .3s;
  
  &:hover {
    color: red;
  }
  
  &:checked {
    display: block;
  }
  
  &:nth-child(2) {
    display: none;
  }

  ${SwipeInput}:checked ~ & {
    transform: translate3d(280px, 0, 0);
  }
  
  ${SwipeInput}:checked ~ &:nth-child(2) {
    display: block;
    transform: translate3d(280px, 0px, 0px);
  }

  ${SwipeInput}:checked ~ &:nth-child(3) {
    display: none;
  }

`

interface IProps {
  gherkinDocuments: messages.IGherkinDocument[]
  resultsLookup: ResultsLookup
}

const App: React.FunctionComponent<IProps> = ({ gherkinDocuments, resultsLookup }) => {
  const [selectedUri, setSelectedUri] = useState(gherkinDocuments[2].uri)
  const gherkinDocumentByUri = toMap(gherkinDocuments)

  const selectGherkinDocument = (selectionPath: string, selectionPathData: ISelectionPathData) => {
    setSelectedUri(selectionPath)
  }

  return <Body>
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet"/>
    <Container>
      <SwipeInput data-function="swipe" id="swipe" type="checkbox"/>
      <SwipeLabel data-function="swipe" htmlFor="swipe">&#xf057;</SwipeLabel>
      <SwipeLabel data-function="swipe" htmlFor="swipe">&#xf0c9;</SwipeLabel>

      <Headings>
        <GherkinDocument gherkinDocument={gherkinDocumentByUri.get(selectedUri)} resultsLookup={resultsLookup}/>
      </Headings>
      <Sidebar>
        <GherkinDocumentSideNav gherkinDocuments={gherkinDocuments}
                                selectedUri={selectedUri}
                                onSelection={selectGherkinDocument}/>
      </Sidebar>
    </Container>
  </Body>
}

function toMap(gherkinDocuments: messages.IGherkinDocument[]) {
  const map = new Map<string, messages.IGherkinDocument>()
  for (const gdoc of gherkinDocuments) {
    map.set(gdoc.uri, gdoc)
  }
  return map
}

export default App
