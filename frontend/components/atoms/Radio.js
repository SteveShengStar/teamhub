import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

// Credits: https://codesandbox.io/s/react-styled-components-radio-button-qpxul?file=/src/index.js

const { useState } = React;

const Radio = () => {
  const [select, setSelect] = useState("optionA");

  const handleSelectChange = event => {
    const value = event.target.value;
    setSelect(value);
  };
  return (
    <Wrapper>
      <Item>
        <RadioButton
          type="radio"
          name="radio"
          value="optionA"
          checked={select === "optionA"}
          onChange={event => handleSelectChange(event)}
        />
        <RadioButtonLabel />
        <div>Choose Pickup</div>
      </Item>
      <Item>
        <RadioButton
          type="radio"
          name="radio"
          value="optionB"
          checked={select === "optionB"}
          onChange={event => handleSelectChange(event)}
        />
        <RadioButtonLabel />
        <div>Choose Delivery</div>
      </Item>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 0px 16px 24px 16px;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 2px;
  margin-bottom: 10px;
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;
const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  &:hover ~ ${RadioButtonLabel} {
    background: #ccc;
    &::after {
      content: "\f005";
      font-family: "FontAwesome";
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
  &:checked + ${Item} {
    background: yellowgreen;
    border: 2px solid yellowgreen;
  }
  &:checked + ${RadioButtonLabel} {
    background: yellowgreen;
    border: 1px solid yellowgreen;
    &::after {
      content: "\f005";
      font-family: "FontAwesome";
      display: block;
      color: white;
      width: 12px;
      height: 12px;
      margin: 4px;
    }
  }
`;
export default Radio;
