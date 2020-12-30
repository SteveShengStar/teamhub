import React, { useState, useEffect } from "react";
import {useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
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
import api from "../frontend/store/api";

const TodoItemCard = ({ status, id, title, description, docUrls, searchBarPlaceholderTexts, handleButtonClick }) => {

  const getTaskButtonText = () => {
    return status === 'complete' ? "Move to Pending" : "Complete Task";
  }

  const getTaskButtonVariant = () => {
    return status === 'complete' ? "lightGrey" : "electrical";
  }
  console.log("searchBarPlaceholderTexts");
  console.log(searchBarPlaceholderTexts);

  return (
    <Card style={{ marginBottom: 15 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header4>{title}</Header4>
        <Button variant={getTaskButtonVariant()} onClick={() => handleButtonClick(id)}>{getTaskButtonText()}</Button>
      </div>
        {description && description}
        {searchBarPlaceholderTexts && <TextInput placeholderTexts={searchBarPlaceholderTexts} />}
        {docUrls && <GoogleDocLinks docUrls={docUrls}/>}
    </Card>
  );
};

const GoogleDocLinks = ({ docUrls }) => {
    return (<SystemComponent marginLeft="50px">
                {docUrls.map((url, i) => (
                    <SystemComponent
                      display="flex"
                      flexDirection="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      width="100%"
                      key={i}
                    >
                        <DocsIcon size={24} style={{paddingRight: "5px"}}/> {url}
                    </SystemComponent>
                ))}
          </SystemComponent>
    );
}

const TextInput = ({placeholderTexts}) => {
  console.log("Second")
  console.log(placeholderTexts)
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    console.log("Submitted: " + value);
  }

  const handleTextChange = (event) => {
    setValue(event.target.value);
    event.preventDefault();
  }

  return (<SystemComponent>
            {placeholderTexts.map(text => 
                <SystemComponent
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="700px"
                >
                  <StyledInput placeholder={text} value={value} onChange={handleTextChange}/>
                  <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                </SystemComponent>
            )}
          </SystemComponent>
)}

const TodoListBody = ({ taskStatus, tasks, handleButtonClick }) => {
  return (
    <SystemComponent
      display="flex-column"
      height="50vh"
      justifyContent="flex-start"
      overflowY="scroll"
      overflowX="hidden"
      padding="20px"
      border={`solid 3px ${theme.colors.greys[3]}`}
    >
      {tasks.filter(task => task.status === taskStatus)
            .map(task => (
              <TodoItemCard
                id={task._id}
                key={task._id}
                status={task.status}
                title={task.taskId.title}
                description={task.taskId.description}
                docUrls={task.taskId.documentLinks}
                searchBarPlaceholderTexts={task.taskId.searchBarPlaceholderTexts}
                handleButtonClick={handleButtonClick}
              />
            ))
      }
    </SystemComponent>
  )
};

// TODO: "Enter Github username or email..." 
const TodoList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPendingTasks, setShowPendingTasks] = useState(true); // Whether the pending tasks or completed tasks are showing.
  const [tasks, setTasks] = useState([]);
  const { token, user: {_id}, hydrated } = useSelector(state => state.userState);

  const handleButtonToggle = () => {
    console.log(showPendingTasks);
    setShowPendingTasks(!showPendingTasks);
  };

  const getStatus = () => {
    return showPendingTasks ? 'pending' : 'complete'; 
  }

  const getOppositeStatus = () => {  // Get the opposite of the current status
    return showPendingTasks ? 'complete' : 'pending';
  }

  const getTasks = async () => {
    const res = await api.members.getMemberTasks(_id, token, undefined, dispatch, router);
    setTasks(res.body.length > 0 ? res.body[0].tasks : []);
  }

  const handleToggleCheck = async (taskId) => {
    const taskToUpdate = tasks.find(task => task._id === taskId);
    const res = await api.members.updateTaskStatus(_id, token, taskToUpdate.taskId._id, getOppositeStatus(), dispatch, router); // Update the status of the task.

    if (res.success) {
      console.log("Successfully updated task status.");
      getTasks();   // Fetch task data from the back end to make sure the front end is showing the most recent task-related details
    } else {
      console.error("Error: Failed to update the task's status");
    }
  };

  useEffect(() => {
    if (hydrated) {
      getTasks();
    }
  }, [hydrated]);

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
            selected={showPendingTasks}
            onToggle={handleButtonToggle}
          />
        </SystemComponent>

        <TodoListBody
          taskStatus={getStatus()}
          tasks={tasks}
          handleButtonClick={handleToggleCheck}
        />
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