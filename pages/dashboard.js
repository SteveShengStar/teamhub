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
import LinkTree from "../frontend/components/organisms/LinkTree";
import styled from "styled-components";
import { SystemComponent } from "../frontend/components/atoms/SystemComponents";
import theme from "../frontend/components/theme";
import api from "../frontend/store/api";


const populateLinks = (description) => {
    // Get all indices of <a> tags
    let indexes = [-1];
    do {
        indexes.push(description.indexOf("<a", indexes[indexes.length - 1] + 1));
    } while(indexes[indexes.length - 1] !== -1);
    indexes = indexes.slice(1, indexes.length - 1);

    // Make the hyperlinks active
    if (indexes.length === 0) return description;
    let endIdx = 0;
    let populatedDescription = [];
    for (let j = 0; j < indexes.length; j++) {
        populatedDescription.push(description.substring(endIdx, indexes[j]));

        
        let descrip_startIsTrimmed = description.substring(indexes[j]);
        let linkStartIdx = descrip_startIsTrimmed.indexOf("href='") + 6;
        let linkEndIdx = descrip_startIsTrimmed.indexOf("'", linkStartIdx);
        let link = descrip_startIsTrimmed.substring(linkStartIdx, linkEndIdx);
        populatedDescription.push(<a href={link}>{descrip_startIsTrimmed.substring(descrip_startIsTrimmed.indexOf(">") + 1, descrip_startIsTrimmed.indexOf("</a>"))}</a>);
        
        endIdx = description.indexOf("</a>", indexes[j]) + 4;
    }
    return populatedDescription;
}

const TodoItemCard = ({ status, id, title, description, docUrls, searchBarPlaceholderTexts, handleButtonClick }) => {
  const getTaskButtonText = () => {
    return status === 'complete' ? "Move to Pending" : "Complete Task";
  }

  const getTaskButtonVariant = () => {
    return status === 'complete' ? "lightGrey" : "electrical";
  }

  return (
    <Card style={{ marginBottom: 15 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header4>{title}</Header4>
        <Button variant={getTaskButtonVariant()} onClick={() => handleButtonClick(id)}>{getTaskButtonText()}</Button>
      </div>
        {description && populateLinks(description)}
        {searchBarPlaceholderTexts && <TextInput placeholderTexts={searchBarPlaceholderTexts} />}
        {docUrls && <GoogleDocLinks docUrls={docUrls.map(d => d.url)} docTitles={docUrls.map(d => d.displayTitle)} />}
    </Card>
  );
};

const GoogleDocLinks = ({ docUrls, docTitles }) => {
    return (<SystemComponent ml={3} mt={3}>
                {docUrls.map((url, i) => (
                    <SystemComponent
                      display="flex"
                      flexDirection="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      width="100%"
                      key={i}
                    >
                        <a href={url} target="_blank"><DocsIcon size={24} style={{paddingRight: "5px"}}/></a> <a href={url} target="_blank"><span style={{position: "relative", bottom: "4px"}}>{docTitles[i]}</span></a>
                    </SystemComponent>
                ))}
          </SystemComponent>
    );
}

const TextInput = ({placeholderTexts}) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    console.log("Submitted: " + value);
  }

  const handleTextChange = (event) => {
    setValue(event.target.value);
    event.preventDefault();
  }

  return (<SystemComponent mt={3}>
            {placeholderTexts.map(text => 
                (<SystemComponent
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="700px"
                >
                  <StyledInput placeholder={text} value={value} onChange={handleTextChange}/>
                  <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                </SystemComponent>)
            )}
          </SystemComponent>
)}

const TodoListBody = ({ taskStatus, tasks, handleButtonClick }) => {
  return (
    <SystemComponent
      display="flex-column"
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
      getTasks();                     // Fetch task data from the back end to make sure the front end is showing the most recent task-related details
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
          width="50%"
        >
          <Header3>My Tasks</Header3>
          <SwitchButton
            textLeft="Unfinished"
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