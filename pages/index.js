import React from 'react';

import { SystemComponent } from '../components/primitives/SystemComponents';

import Button from '../components/primitives/Button';
import Title from "../components/primitives/Title";
import Subtitle from '../components/primitives/Subtitle';
import Header2 from '../components/primitives/Header2';
import Header3 from '../components/primitives/Header3';
import Header4 from '../components/primitives/Header4';
import Body from '../components/primitives/Body';


const Home = () => (
  <SystemComponent display="flex" flexDirection="column" alignItems="start">
    <Title>Header</Title>
    <Subtitle>Subtitle</Subtitle>
    <Header2>Header 2</Header2>
    <Header3>Header 3</Header3>
    <Header4>Header 4</Header4>
    <Body variant="big">Body 2</Body>
    <Body>Body</Body>
    <Button>Button</Button>
    <Button variant="ghost">Button</Button>
    <Button variant="ghostAlert">Button</Button>
    <Button variant="borderless">Button</Button>
    <Button variant="borderless">Button</Button>
  </SystemComponent>
)

export default Home;
