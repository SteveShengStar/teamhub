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

const TodoItemCard = ({ status, id, title, description, docUrls, searchBarPlaceholderTexts, handleButtonClick, showButton = true }) => {
  const getTaskButtonText = () => {
    return status === 'complete' ? "Mark as Unfinished" : "Mark as Complete";
  }

  const getTaskButtonVariant = () => {
    return status === 'complete' ? "moderateGrey" : "electrical";
  }

  return (
    <CustomCard style={{ marginBottom: 15 }} backgroundColor={theme.colors.greys[1]}>
      {showButton && <SystemComponent display="flex" flexDirection="row-reverse">
          <Button mb={2} variant={getTaskButtonVariant()} display onClick={() => handleButtonClick(id)}>{getTaskButtonText()}</Button>
      </SystemComponent>}
      <SystemComponent>
          <Header4>{title}</Header4>
      </SystemComponent>
        {description && populateLinks(description)}
        {searchBarPlaceholderTexts && <TextInput placeholderTexts={searchBarPlaceholderTexts} />}
        {docUrls && <GoogleDocLinks docUrls={docUrls.map(d => d.url)} docTitles={docUrls.map(d => d.displayTitle)} />}
    </CustomCard>
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
                  minWidth="300px"
                >
                  <StyledInput placeholder={text} value={value} onChange={handleTextChange}/>
                  <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                </SystemComponent>)
            )}
          </SystemComponent>
)}

const TodoListBody = ({ taskStatus, tasks, handleButtonClick }) => {
  const relevantTasks = tasks.filter(task => task.status === taskStatus);
  return (
    <SystemComponent
      display="flex-column"
      justifyContent="flex-start"
      overflowY={["hidden", "hidden", "auto"]}
      overflowX="hidden"
      padding="15px"
      border={`solid 3px ${theme.colors.greys[3]}`}
      backgroundColor={theme.colors.background}
    >
      {relevantTasks.length === 0 ?
        (<TodoItemCard showButton={false} description={`You have no ${taskStatus === 'pending' ? 'Unfinished' : 'Completed' } tasks.`}/>)
         :
        (relevantTasks.map(task => (
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
        )))
      }
    </SystemComponent>
  )
};


const TodoList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPendingTasks, setShowPendingTasks] = useState(true); // Whether the pending tasks or completed tasks are showing.
  const [tasks, setTasks] = useState([]);
  const { token, user: {_id}, hydrated } = useSelector(state => state.userState);

  const handleButtonToggle = () => {
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
    if (res)
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
    <PageTemplate title="Dashboard">
      <>
        <SystemComponent
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
          gridRowGap={4}
          gridColumnGap={3}
        > 

          <SystemComponent>
            <Header3>Important Links</Header3>
            <SystemComponent 
              display="flex-column"
              justifyContent="flex-start"
              overflowY={["hidden", "hidden", "auto"]}
              overflowX="hidden"
              padding="15px"
              border={`solid 3px ${theme.colors.greys[3]}`}
              backgroundColor={theme.colors.background}
            >
              <LinkTree />
            </SystemComponent>
          </SystemComponent>

          <SystemComponent>
            <SystemComponent
              display="flex"
              justifyContent="space-between"
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
          </SystemComponent>

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
  height: 30px;
  width: 200px;
  box-sizing: border-box;
  padding-left: 5px;
`;

const CustomCard = styled(Card)`
  background-color: ${props => props.theme.colors.greys[0]};
  border: 1px solid #000;
`;