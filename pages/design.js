import React from 'react';

import Button from '../components/atoms/Button';
import Title from '../components/atoms/Title';
import Subtitle from '../components/atoms/Subtitle';
import Header2 from '../components/atoms/Header2';
import Header3 from '../components/atoms/Header3';
import Header4 from '../components/atoms/Header4';
import Header5 from '../components/atoms/Header5';
import Body from '../components/atoms/Body';
import Card from '../components/atoms/Card';
import Select from '../components/atoms/Select';
import Input from '../components/atoms/Input';
import { SystemComponent } from '../components/atoms/SystemComponents';
import PageTemplate from '../components/templates/PageTemplate';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];
const Home = () => (
    <PageTemplate title="Design System "display="flex">
        <SystemComponent>
            <Card display="flex" flexDirection="column" alignItems="start">
                <Select options={options} width="100%"/>
                <Input variant="text" placeholder="Search" />
                <Title>Header</Title>
                <Subtitle as={'h2'}>Subtitle</Subtitle>
                <Header2>Header 2</Header2>
                <Header3>Header 3</Header3>
                <Header4>Header 4</Header4>
                <Header5>Header 5</Header5>
                <Body variant="big">Big Body</Body>
                <Body>Body</Body>
                <Button>Button</Button>
                <Button variant="ghost">Button</Button>
                <Button variant="ghostAlert">Button</Button>
                <Button variant="borderless">Button</Button>
                <Button variant="borderless">Button</Button>
            </Card>
        </SystemComponent>
    </PageTemplate>
);

export default Home;
