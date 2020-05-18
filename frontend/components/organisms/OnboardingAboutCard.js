import React from "react";
import styled from "styled-components";
import { SystemComponent } from "../atoms/SystemComponents";

import Subtitle from "../atoms/Subtitle";
import Header5 from "../atoms/Header4";
import Select, { CreatableSelect } from "../atoms/Select";
import Body from "../atoms/Body";
import Card from "../atoms/Card";
import TermSelect from "../atoms/TermSelect";
import Button from "../atoms/Button";
import { useSelector } from "react-redux";

const months = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" }
];
const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const programs = ["Computer Science", "Mathematics", "Mechanical Engineering", 
"Electrical Engineering", "Software Engineering", "Computer Engineering", "Mechatronics Engineering", "Systems Design Engineering",
"Management Engineering", "Physics", "AFM", "CFM"]

const terms = ["F19", "W20", "S20", "F20", "W21", "S21", "F21", "W22", "S22", "F22", "W23", "S23", "F23", "W24", "S24", "F24"]

export default ({values, setValues, submit}) => {
  const { interests, skills, years } = useSelector(state => state.membersState.filters)
    return (
      <CustomCard>
        <Subtitle mb={3}>Tell us more about yourself</Subtitle>
        <Header5 mb={1}>Birthday</Header5>
        <DateLayout>
          <Select 
            placeholder="Month"
            options={months}
            value={{label: months[values.birthday[0]].label, value: values.birthday[0]}}
            onChange={(val) => setValues.setBirthday([val.value, values.birthday[1], values.birthday[2]])}
          />
          <Select 
            placeholder="Day" 
            variant="text" 
            options={[...Array(days[0])].map((_, day) => ({value: day + 1, label: day + 1 < 10 ? "0" + (day + 1) : day + 1}))}
            value={{value: values.birthday[1], label: values.birthday[1] < 10 ? '0' + values.birthday[1] : values.birthday[1]}}
            onChange={val => setValues.setBirthday([values.birthday[0], val.value, values.birthday[2]])}
            />
          <Select 
            placeholder="Year" 
            variant="text" 
            options={[...Array(31)].map((_, day) => ({value: 2008 - day, label: 2008 - day}))}
            value={{value: values.birthday[2], label: values.birthday[2]}}
            onChange={val => setValues.setBirthday([values.birthday[0], values.birthday[1], val.value])}
          />
        </DateLayout>
        <InlineItemRow></InlineItemRow>

          <DateLayout>
            <SystemComponent>
              <Header5 mb={1} mt={4}>What program are you in?</Header5>
              <CreatableSelect 
                placeholder="Choose Program" 
                options={programs.map(program => ({value: program, label: program}))} 
                value={{value: values.program, label: values.program}}
                onChange={val => setValues.setProgram(val.value)}
              />
            </SystemComponent>

            <SystemComponent>
              <Header5 mb={1} mt={4}>What term are you on?</Header5>
              <Select 
                options={years ? years.map(year => ({value: year, label: year})) : []} 
                value={{value: values.term, label: values.term}}
                onChange={val => setValues.setTerm(val.value)}
              />
            </SystemComponent>
          </DateLayout>
          
        
        <Header5 mb={1} mt={4}>Which terms are you onstream?</Header5>
        <GridLayout>
          {
            terms.map((term, i) => 
              <SelectableTerms 
                key={i} 
                selected={values.coopSequence[term]}
                onClick={() => {
                  if (values.coopSequence[term]) {
                    const newSeq = Object.keys(values.coopSequence).reduce((accum, key) => {
                      if (key != term) accum[key] = values.coopSequence[key];
                      return accum;
                    }, {})
                    setValues.setCoopSequence(newSeq);
                  }
                  else setValues.setCoopSequence({...values.coopSequence, [term]: true});
                }}>
                {term}
              </SelectableTerms>)
          }
        </GridLayout>

        <Header5 mt={4} mb={1}>What are some of your interests?</Header5>
        <CreatableSelect 
          isMulti 
          variant="text" 
          placeholder="Interests"
          options={interests ? interests.map(interest => ({value: interest.name, label: interest.name})) : []}
          values={values.interests}
          onChange={values => {
            setValues.setInterests(values);
          }}
        />

        <Header5 mt={4} mb={1}>What are some of your skills?</Header5>
        <CreatableSelect 
          isMulti 
          variant="text" 
          placeholder="Skills"
          options={skills ? skills.map(skill => ({value: skill.name, label: skill.name})) : []}
          values={values.skills}
          onChange={values => {
            setValues.setSkills(values);
          }}       
        />

        <Header5 mt={4} mb={1}>Write a little bio!</Header5>
        <TextBox placeholder="Write bio here..." value={values.bio} onChange={e => setValues.setBio(e.target.value)}/>

        <ContinueButton onClick={submit}>Continue</ContinueButton>
      </CustomCard>
    )
};

const SelectableTerms = styled(TermSelect)`
  background-color: ${props => props.selected ? props.theme.colors.software : props.theme.colors.white};
  color: ${props => props.selected ? props.theme.colors.background : props.theme.colors.foreground};

`

const TextBox = styled.textarea`
  width: calc(100% - ${props => props.theme.space.cardPaddingSmall}px);
  height: 200px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2rem;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  transition: all 0.2s ease;
  margin: 10px 0 0;
  border: 1px solid ${props => props.theme.colors.greys[2]};
  &:focus {
    border: 1px solid ${props => props.theme.colors.action};
  }
  ${props => props.theme.mediaQueries.tablet} {
    width: calc(100% - ${props => props.theme.space.cardPadding}px);
  }
`;

const DateLayout = styled(SystemComponent)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;

    ${props => props.theme.mediaQueries.tablet} {
      grid-template-columns: repeat(3, 200px);
    }
`;

const CustomCard = styled(Card)`
  margin: 0 0 50px;
  ${props => props.theme.mediaQueries.tablet} {
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: 800px;
    width: 80vw;
    height: 700px;
    max-height: 80%;
    overflow-y: scroll;
    transform: translate(-50%, -50%);
    overflow-x: hidden;
    margin: 0;
  }
`;
const InlineItemRow = styled(SystemComponent)`
  display: flex;
  align-items: center;
`;
const CustomBody = styled(Body)`
  ${props => props.theme.mediaQueries.mobile} {
    width: auto;
  }
  font-family: ${props => props.theme.fonts.body};
`;

const GridLayout = styled(SystemComponent)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-gap: 5px;
  width: auto;
`;


const ContinueButton = styled(Button)`
    display: none;
    ${props => props.theme.mediaQueries.tablet} {
        display: block;
        justify-self: end;
        position: relative;
    }
`
