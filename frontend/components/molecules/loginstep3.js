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
import Image from "../atoms/Image";
import Card from "../atoms/Card";
import Input from "../atoms/Input";
import TermSelect from "../atoms/TermSelect";
import theme from "../theme";

const TextBox = styled.textarea`
  width: 350px;
  height: 200px;
  font-family: nunito-sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2rem;
  border-radius: 5px;
  padding: 15px;
  ${props => props.theme.mediaQueries.mobile} {
    width: 900px;
  }
  ${props => props.theme.mediaQueries.tablet} {
    width: 600px;
  }
`;
const CustomInput = styled(Input)`
  padding-left: 10px;
  line-height: 33px;
  margin-left: 20px;
`;

const DateLayout = styled(SystemComponent)``;

const CustomCard = styled(Card)`
  ${props => props.theme.mediaQueries.mobile} {
    width: 90%;
    height: 90%;
  }
`;

// style={{ paddingLeft: "5px" }}
// variant="variant"
// placeholder="Day"
// style={{ lineHeight: "33px" }}

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
const term = [
  { value: "1A", label: "1A" },
  { value: "1B", label: "1B" },
  { value: "2A", label: "2A" },
  { value: "2B", label: "2B" },
  { value: "3A", label: "3A" },
  { value: "3B", label: "3B" },
  { value: "4A", label: "4A" },
  { value: "4B", label: "4B" },
  { value: "5A", label: "5A" },
  { value: "5B", label: "5B" }
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
          <Select placeholder="Month" options={months} width="15%" />
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
        <Input placeholder="Choose Program" options={months} width="25%" />
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
        {/* <Select
          style={{ paddingLeft: "30px" }}
          placeholder="Choose Sequence"
          options={term}
          width="25%"
        /> */}
      </div>

      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <Header5>What are some of your interests?</Header5>
        <Select options={months} width="100%" />
      </div>

      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <Header5>What are some of your skills?</Header5>
        <Select options={months} width="100%" />
      </div>

      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <Header5>Write a little bio!</Header5>
        <Body>
          You gotta write at least 100 words about yourself. If you hate
          writing, use this template and just change some content If you're
          feeling extra craftly, write something different and be creative!
        </Body>

        <TextBox placeholder="Write bio here..." />
      </div>
    </CustomCard>
  </div>
);

const InlineItemRow = styled(SystemComponent)`
  display: flex;
  align-items: center;
`;

const GridLayout = styled(SystemComponent)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-gap: 5px;
  width: calc(100vw - ${props => props.theme.space.cardPaddingSmall * 2}px);
`;

export default LoginStep3;
