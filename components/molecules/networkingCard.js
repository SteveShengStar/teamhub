import React from "react";
import styled from "styled-components";

import Button from "../atoms/Button";
import Title from "../atoms/Title";
import Subtitle from "../atoms/Subtitle";
import Header2 from "../atoms/Header2";
import Header3 from "../atoms/Header3";
import Header4 from "../atoms/Header4";
import Body from "../atoms/Body";
import Image from "../atoms/Image";
import Card from "../atoms/Card";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import theme from "../theme";

const Networking = () => (
  <div>
    <Card
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <div
        style={{
          textAlign: "left",
          margin: "auto",
          padding: "30px"
        }}
      >
        <Header2
          style={{
            textAlign: "left",
            marginBottom: "25px"
          }}
        >
          Last Step! - Networking
        </Header2>
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div>
            <div
              style={{
                marginRight: "20px",
                marginBottom: "15px"
              }}
            >
              <Header4>LinkedIn</Header4>
              <CustomInput
                name="LinkedIn"
                id="LinkedIn"
                type="text"
                variant="text"
                placeholder="Link"
              />
            </div>
            <div>
              <Header4>GitHub</Header4>
              <CustomInput
                name="GitHub"
                id="GitHub"
                type="text"
                variant="text"
                placeholder="Link"
              />
            </div>
          </div>
          <div>
            <Header4>Personal Website</Header4>
            <CustomInput
              name="Personal Website"
              id="Personal Website"
              type="text"
              variant="text"
              placeholder="Link"
            />
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const CustomInput = styled(Input)`
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
  height: 12px;
  width: 300px;
  &:focus {
    border-bottom: 1px solid black;
    outline: none;
  }
`;
export default Networking;
