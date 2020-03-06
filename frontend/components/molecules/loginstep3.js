import React from "react";
import styled from "styled-components";
import { SystemComponent } from "../atoms/SystemComponents";

import Button from "../atoms/Button";
import Title from "../atoms/Title";
import Subtitle from "../atoms/Subtitle";
import Header2 from "../atoms/Header2";
import Header3 from "../atoms/Header3";
import Header4 from "../atoms/Header4";
import Header5 from "../atoms/Header4";
import Select from "../atoms/Select";
import Body from "../atoms/Body";
import Card from "../atoms/Card";
import Input from "../atoms/Input";
import TermSelect from "../atoms/TermSelect";

const TextBox = styled.textarea`
  width: 90%;
  height: 200px;
  font-family: nunito-sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2rem;
  border-radius: 5px;
  padding: 15px;
  ${props => props.theme.mediaQueries.tablet} {
    /* width: 80vw; */
    width: 80%;
  }
`;

const CustomSelect = styled(Select)`
  line-height: 33px;

  width: 80%;

  margin-bottom: 5px;
  ${props => props.theme.mediaQueries.tablet} {
    width: 80%;
  }
`;

const CustomInput = styled(Input)`
  padding-left: 10px;
  line-height: 33px;
  width: 90%;

  margin-bottom: 5px;
  ${props => props.theme.mediaQueries.mobile} {
    /* margin-left: 20px; */
    width: 80%;
  }
`;

const DateLayout = styled(SystemComponent)`
  display: flex;
  flex-direction: column;
  ${props => props.theme.mediaQueries.mobile} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const CustomCard = styled(Card)`
  ${props => props.theme.mediaQueries.tablet} {
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: 60%;
    max-height: 60%;
    overflow-y: scroll;
    transform: translate(-50%, -50%);
    overflow-x: hidden;
  }
`;
const InlineItemRow = styled(SystemComponent)`
  display: flex;
  align-items: center;
`;
const CustomBody = styled(Body)`
  ${props => props.theme.mediaQueries.mobile} {
    width: 83.5%;
  }
  font-family: ${props => props.theme.fonts.body};
`;

const GridLayout = styled(SystemComponent)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-gap: 5px;
  width: calc(100vw - ${props => props.theme.space.cardPaddingSmall * 2}px);
`;

const months = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" }
];
const Program = [
  { value: "Computer Science", label: "Computer Science" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Computer Engineering", label: "Computer Engineering" },
  { value: "Mechatronics Engineering", label: "Mechatronics Engineering" },
  { value: "System Design Engineering", label: "System Design Engineering" },
  { value: "Management Engineering", label: "Management Engineering" }
];

const LoginStep3 = () => (
  <div>
    <CustomCard>
      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <Subtitle>Tell us more about yourself</Subtitle>
      </div>

      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <Header5>Birthday</Header5>
        <DateLayout>
          <CustomSelect placeholder="Month" options={months} />
          <CustomInput placeholder="Day" />
          <CustomInput placeholder="Year" />
        </DateLayout>
        <InlineItemRow></InlineItemRow>
      </div>

      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <InlineItemRow>
          <Header5>What program are you in?</Header5>
        </InlineItemRow>
        <InlineItemRow></InlineItemRow>
        <CustomSelect placeholder="Choose Program" options={Program} />
        <Header5>Select your Co-op Sequence</Header5>
        <GridLayout>
          <TermSelect>F19</TermSelect>
          <TermSelect>W20</TermSelect>
          <TermSelect>S20</TermSelect>
          <TermSelect>F20</TermSelect>
          <TermSelect>W21</TermSelect>
          <TermSelect>S21</TermSelect>
          <TermSelect>F21</TermSelect>
          <TermSelect>W22</TermSelect>
          <TermSelect>S22</TermSelect>
          <TermSelect>F22</TermSelect>
          <TermSelect>W23</TermSelect>
          <TermSelect>S23</TermSelect>
          <TermSelect>F23</TermSelect>
          <TermSelect>W24</TermSelect>
        </GridLayout>
      </div>

      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <Header5>What are some of your interests?</Header5>
        <CustomInput />
      </div>

      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <Header5>What are some of your skills?</Header5>
        <CustomInput width="100%" />
      </div>

      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <Header5>Write a little bio!</Header5>
        <CustomBody>
          You gotta write at least 100 words about yourself. If you hate
          writing, use this template and just change some content If you're
          feeling extra craftly, write something different and be creative!
        </CustomBody>

        <TextBox placeholder="Write bio here..." />
      </div>
    </CustomCard>
  </div>
);

export default LoginStep3;
