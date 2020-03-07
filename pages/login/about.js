import React, { useState } from "react";

import PageTemplate from "../../frontend/components/templates/PageTemplate";
import OnboardingAboutCard from "../../frontend/components/organisms/OnboardingAboutCard";
import LoginTransition from "../../frontend/components/templates/LoginTransition";
import Button from "../../frontend/components/atoms/Button";
import styled from "styled-components";
import { updateUser } from "../../frontend/store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default () => {
  const user = useSelector(state => state.userState.user);
  const [shouldHide, setShouldHide] = useState(false);
  const [birthday, setBirthday] = useState(user && user.birthday ? [user.birthday.month || 0, user.birthday.day || 1, user.birthday.year || 2000] : [0,1,2000]);
  const [program, setProgram ] = useState(user && user.program || "");
  const [term, setTerm] = useState("");
  const [coopSequence, setCoopSequence] = useState({});
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState("");

  const router = useRouter()

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
    if (!bio) {
      alert("No bio is set");
      return;
    }
    if (!term) {
      alert("No term is picked");
      return;
    }
    setShouldHide(true)
    updateUser(dispatch, {
      birthday: { month: birthday[0], day: birthday[1], year: birthday[2] },
      program,
      stream: { coopStream: coopSequence, currentSchoolTerm: term },
      interests: interests.map(val => val.value),
      skills: skills.map(skill => skill.value),
      bio
    }, localStorage.getItem("refreshToken"), user._id).then(res => {
      router.push("/")
    })
  }
  return (
    <>
      <PageTemplate myHubHidden title="Onboarding">
        <LoginTransition shouldHide={shouldHide}>
          <OnboardingAboutCard 
            submit={trySubmit}
            values={{
              birthday, program, coopSequence, setCoopSequence, interests, skills, bio, term
            }}
            setValues={{
              setBirthday, setProgram, setCoopSequence, setInterests, setSkills, setBio, setTerm
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