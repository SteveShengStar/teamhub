import React, { useState } from "react";

import PageTemplate from "../../frontend/components/templates/PageTemplate";
import OnboardingAboutCard from "../../frontend/components/organisms/OnboardingAboutCard";
import LoginTransition from "../../frontend/components/templates/LoginTransition";
import Button from "../../frontend/components/atoms/Button";
import styled from "styled-components";
import { updateUser } from "../../frontend/store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const user = useSelector(state => state.userState.user);
  const [birthday, setBirthday] = useState([6,23,2001]);
  const [program, setProgram ] = useState("");
  const [coopSequence, setCoopSequence] = useState({});
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState("");

  const dispatch = useDispatch()

  function trySubmit() {
    if (!program) {
      alert("No program selected!");
      return;
    }
    if (Object.keys(coopSequence).length == 0) {
      alert("Coop sequence is 0!");
      return;
    }
    if (!bio.length) {
      alert("No bio is set");
      return;
    }

    updateUser(dispatch, {
      birthday: { month: birthday[0], day: birthday[1], year: birthday[2] },
      program,
      stream: { coopStream: coopSequence },
      interests: interests.map(val => val.value),
      skills: skills.map(skill => skill.value),
      bio
    }, localStorage.getItem("refreshToken"), user._id).then(res => {
      console.log(res)
    })
  }
  return (
    <>
      <PageTemplate myHubHidden title="Onboarding">
        <LoginTransition>
          <OnboardingAboutCard 
            submit={trySubmit}
            values={{
              birthday, program, coopSequence, setCoopSequence, interests, skills, bio
            }}
            setValues={{
              setBirthday, setProgram, setCoopSequence, setInterests, setSkills, setBio
            }}
          />
        </LoginTransition>
      </PageTemplate>
      <Row>
        <Button onClick={trySubmit}>Continue</Button>
      </Row>
    </>
  )
};

const Row = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10px;
    display: grid;
    justify-items: end;
    background-color: rgba(255,255,255,0.37);
    ${props => props.theme.mediaQueries.tablet} {
        display: none;
    }
    backdrop-filter: blur(13px);
`