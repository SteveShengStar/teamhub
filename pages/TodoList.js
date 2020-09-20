import React, { useState, useEffect } from "react";
import Card from "../frontend/components/atoms/Card";
import Header3 from "../frontend/components/atoms/Header3";
import Header4 from "../frontend/components/atoms/Header4";
import PageTemplate from "../frontend/components/templates/PageTemplate";
import SwitchButton from "../frontend/components/atoms/SwitchButton";

const data = [
  {
    title: "Choose projects you want to work on",
    body: "Add yourself to a project here.",
    completed: false
  },
  {
    title: "Complete WHMIS safety training",
    body: (
      <ol>
        <li>
          Log in to <a href="http://learn.uwaterloo.ca">learn.uwaterloo.ca</a>
        </li>
        <li>
          On the homepage, click on <strong>Self-Registration</strong>
        </li>
        <li>
          Enrol in <strong>WHMIS</strong> training course
        </li>
        <li>Upload your certificate</li>
      </ol>
    ),
    completed: false
  }
];

const TodoCard = ({ checked, onToggleCheck, title, children }) => {
  console.log(onToggleCheck);
  return (
    <Card style={{ marginBottom: 15 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header4>{title}</Header4>
        <input type="checkbox" checked={checked} onclick={onToggleCheck} />
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

  const handleToggleCheck = () => {
    console.log("checked");
    // setTodos([...todos, { ...todos[index], completed: !todos[index].completed }]);
    // console.log(todos);
  };

  return (
    <PageTemplate>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <Header3>My Tasks</Header3>
        <div style={{ maxWidth: 500, paddingBottom: 25 }}>
          <SwitchButton
            textLeft="Pending"
            textRight="Completed"
            selected={showPending}
            onToggle={handleButtonToggle}
          />
        </div>
        {todos
          .filter(({ completed }) => completed != showPending)
          .map((item, key) => (
            <TodoCard
              key={key}
              checked={item.completed}
              title={item.title}
              onToggleCheck={handleToggleCheck}
            >
              {item.body}
            </TodoCard>
          ))}
      </div>
    </PageTemplate>
  );
};

export default TodoList;
