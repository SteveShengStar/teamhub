import React, { useState } from "react";
import Button from "../frontend/components/atoms/Button";
import Card from "../frontend/components/atoms/Card";
import DocsIcon from "../frontend/components/atoms/Icons/DocsIcon";
import Header3 from "../frontend/components/atoms/Header3";
import Header4 from "../frontend/components/atoms/Header4";
import Input from "../frontend/components/atoms/Input";
import PageTemplate from "../frontend/components/templates/PageTemplate";
import SwitchButton from "../frontend/components/atoms/SwitchButton";
import styled from "styled-components";
import { SystemComponent } from "../frontend/components/atoms/SystemComponents";
import theme from "../frontend/components/theme";

import data from "./data";

const TodoCard = ({ isSelected, onButtonClick, title, children }) => {

  const getTaskButtonText = () => {
    return isSelected ? "Move to Pending" : "Complete Task";
  }

  const getTaskButtonVariant = () => {
    return isSelected ? "lightGrey" : "electrical";
  }

  return (
    <Card style={{ marginBottom: 15 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header4>{title}</Header4>
        <Button variant={getTaskButtonVariant()} onClick={onButtonClick}>{getTaskButtonText()}</Button>
      </div>
      {children}
    </Card>
  );
};

const GoogleDocItems = ({ items }) => {
  
  return items.map((item, i) => (
    <SystemComponent
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
      marginLeft="50px"
      key={i}
    >
      <DocsIcon size={24} style={{paddingRight: "5px"}}/>
      {item}
    </SystemComponent>
  ));
}

const TextInput = () => {

  const [value, setValue] = useState("");

  const handleSubmit = () => {
    console.log("Submitted: " + value);
  }

  const handleTextChange = (event) => {
    setValue(event.target.value);
    event.preventDefault();
  }

  return (
    <SystemComponent
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      width="700px"
    >
      <StyledInput placeholder="Github username or email..." value={value} onChange={handleTextChange}/>
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </SystemComponent>
  )
}

const TodoList = () => {
  const [showPending, setShowPending] = useState(true);
  const [todos, setTodos] = useState(data);

  const handleButtonToggle = () => {
    setShowPending(!showPending);
  };

  const handleToggleCheck = (index) => {
    setTodos([
      ...todos.slice(0, index),
      {
        ...todos[index],
        completed: !todos[index].completed
      },
      ...todos.slice(index + 1)
    ]);
  };

  return (
    <PageTemplate>
      <>
        <SystemComponent
          display="flex-column"
          justifyContent="space-between"
          alignItems="flex-start"
          pb={10}
          width="50%"
        >
          <Header3>My Tasks</Header3>
          <SwitchButton
            textLeft="Pending"
            textRight="Completed"
            selected={showPending}
            onToggle={handleButtonToggle}
          />
        </SystemComponent>
        <SystemComponent
          display="flex-column"
          height="50vh"
          justifyContent="flex-start"
          overflowY="scroll"
          overflowX="hidden"
          padding="20px"
          border={`solid 3px ${theme.colors.greys[3]}`}
        >
          {todos
            .filter(({ completed }) => completed != showPending)
            .map((item) => (
              <TodoCard
                key={item.key}
                isSelected={item.completed}
                title={item.title}
                onButtonClick={() => handleToggleCheck(item.key)}
              >
                {item.body !== "github" ? item.body : <TextInput />}
                {item.docItems && <GoogleDocItems items={item.docItems}/>}
              </TodoCard>
            ))}
        </SystemComponent>
      </>
    </PageTemplate>
  );
};

export default TodoList;

const SubmitButton = styled(Button)`
  height: 30px;
  width: 100px;
  border-radius: 0px;

`;

const StyledInput = styled(Input)`
  height: 24px;
  width: 300px;
`;