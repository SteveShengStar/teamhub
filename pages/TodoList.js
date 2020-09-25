import React, { useState, useEffect } from "react";
import Card from "../frontend/components/atoms/Card";
import Header3 from "../frontend/components/atoms/Header3";
import Header4 from "../frontend/components/atoms/Header4";
import PageTemplate from "../frontend/components/templates/PageTemplate";
import SwitchButton from "../frontend/components/atoms/SwitchButton";
import { SystemComponent } from "../frontend/components/atoms/SystemComponents";
import theme from "../frontend/components/theme";

import data from "./data";

const TodoCard = ({ isSelected, onToggleCheck, title, children }) => {
  return (
    <Card style={{ marginBottom: 15 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header4>{title}</Header4>
        <input type="checkbox" checked={isSelected} onChange={onToggleCheck} />
      </div>
      {children}
    </Card>
  );
};

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
                onToggleCheck={() => handleToggleCheck(item.key)}
              >
                {item.body}
              </TodoCard>
            ))}
        </SystemComponent>
      </>
    </PageTemplate>
  );
};

export default TodoList;
