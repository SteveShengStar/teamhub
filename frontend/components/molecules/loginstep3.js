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
import theme from "../theme";

const TextBox = styled(Input)`
  width: 900px;
  height: 200px;
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
    <Card
      style={{
        width: "80%",
        height: "90%"
      }}
    >
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
        <InlineItemRow>
          <Select placeholder="Month" options={months} width="15%" />
          <Input
            style={{ paddingLeft: "5px" }}
            variant="variant"
            placeholder="Day"
            style={{ lineHeight: "33px" }}
          />
          <Input
            style={{ paddingLeft: "5px" }}
            variant="variant"
            placeholder="Year"
            style={{ lineHeight: "33px" }}
          />
        </InlineItemRow>
      </div>

      <div
        style={{
          paddingBottom: "10px"
        }}
      >
        <InlineItemRow>
          <Header5>What program are you in?</Header5>
          <Header5 style={{ paddingLeft: "40px" }}>
            Select your Co-op Sequence
          </Header5>
        </InlineItemRow>
        <InlineItemRow>
          <Select placeholder="Choose Program" options={months} width="25%" />
          <Select
            style={{ paddingLeft: "30px" }}
            placeholder="Choose Sequence"
            options={term}
            width="25%"
          />
          <div style={{ paddingLeft: "30px" }}>
            <Button>Onstream</Button>
            <Button>Offstream</Button>
          </div>
        </InlineItemRow>
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
          writing, use this template and just change some
        </Body>
        <Body>
          content If you're feeling extra craftly, write something different and
          be creative!
        </Body>
        <TextBox />
      </div>
    </Card>
  </div>
);

const InlineItemRow = styled(SystemComponent)`
  display: flex;
  align-items: center;
`;

export default LoginStep3;
