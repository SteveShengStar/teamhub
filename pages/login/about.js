import React, { useState, useEffect } from "react";
import {removeBadValuesAndDuplicates} from '../../frontend/helpers';

import PageTemplate from "../../frontend/components/templates/PageTemplate";
import LoginTransition from "../../frontend/components/templates/LoginTransition";
import OnboardingAboutCard from "../../frontend/components/organisms/OnboardingAboutCard";
import Button from "../../frontend/components/atoms/Button";
import styled from "styled-components";
import { updateUser } from "../../frontend/store/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useLoginTransition from "../../frontend/hooks/useLoginTransition";
import useLoginController from "../../frontend/hooks/useLoginController";
import LoadingModal from "../../frontend/components/atoms/LoadingModal";
import { getFilters } from "../../frontend/store/reducers/membersReducer";

const About = () => {
  const { user, hydrated } = useSelector(state => state.userState);
  const { filters } = useSelector(state => state.membersState);
  const [birthday, setBirthday] = useState(user && user.birthday ? [user.birthday.month || 0, user.birthday.day || 1, user.birthday.year || 2000] : [0,1,2000]);
  const [program, setProgram ] = useState(user && user.program || "");
  const [term, setTerm] = useState(user && user.stream && user.stream.currentSchoolTerm || "");
  const [coopSequence, setCoopSequence] = useState(user && user.stream && user.stream.coopStream || {});
  const [interests, setInterests] = useState(user && user.interests && user.interests.map(it => it.name) || []);
  const [skills, setSkills] = useState(user && user.skills && user.skills.map(sk => sk.name) || []);
  const [bio, setBio] = useState(user && user.bio || "");

  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
      if (!filters.projects) {
          getFilters(dispatch, router)
      }
  }, [hydrated])


  const loginTransition = useLoginTransition()
  useLoginController(loginTransition, dispatch, router.pathname);

  function trySubmit() {
    // If user did not specify a program, display error.
    if (!program) {
      alert("No program was selected!");
      return;
    }
    // If user did not specify a coop sequence, display error.
    if (Object.keys(coopSequence).length == 0) {
      alert("Answer the Question: Which terms are you on campus. If this question is not applicable, choose something random.");
      return;
    }
    if (!term) {
      alert("No term was picked !");
      return;
    }
    if (interests.map(val => val.value).includes(undefined)) {
      alert("You specified an interest that is blank. That is now allowed !");
      return;
    }
    if (skills.map(skill => skill.value).includes(undefined)) {
      alert("You specified a skill that is blank. That is now allowed !");
      return;
    }

    // After passing all form-validation/error checks, transition to the next page
    loginTransition.setVisible(false);
    updateUser(dispatch, {
      birthday: { month: birthday[0], day: birthday[1], year: birthday[2] },
      program,
      stream: { coopStream: coopSequence, currentSchoolTerm: term },
      interests: removeBadValuesAndDuplicates(interests.map(val => val.value)),
      skills: removeBadValuesAndDuplicates(skills.map(skill => skill.value)),
      bio: bio.trim()
    }, user._id, router).then(res => {
      router.push("/")
    })
  }
  return (
    <>
      <PageTemplate title="Onboarding">
        <LoginTransition transitionRef={loginTransition.ref}>
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
      <LoadingModal visible={!loginTransition.visible}/>
    </>
  )
};
export default About;

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