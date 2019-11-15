import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";

import Button from "../components/atoms/Button";
import Title from "../components/atoms/Title";
import Subtitle from "../components/atoms/Subtitle";
import Header2 from "../components/atoms/Header2";
import Header3 from "../components/atoms/Header3";
import Header4 from "../components/atoms/Header4";
import Body from "../components/atoms/Body";
import Image from "../components/atoms/Image";
import Card from "../components/atoms/Card";
import Select from "../components/atoms/Select";
import Input from "../components/atoms/Input";

const responseGoogle = response => {
  console.log(response);
};

const Home = () => (
  <div>
    <Image variant="background" src="/static/background.png" alt="background" />
    <Card
      style={{
        height: "20%",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        padding: "auto",
        justifyContent: "space-around",
        textAlign: "left",
        // marginLeft: "auto",
        // marginRight: "auto"
        marginBottom: "auto",
        marginTop: "auto"
      }}
    >
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          lineHeight: "50px" //here
        }}
      >
        <Header3>Log In</Header3>
        <Header3>Login with your Waterloop Email</Header3>
        <Header3>
          <GoogleLogin
            clientId="404915833701-5kvp9td9jonstfsola74atmkjct4h00d.apps.googleusercontent.com-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Header3>
      </div>
    </Card>
  </div>
);

export default Home;
