import React from "react";
import GoogleLogin from "react-google-login";

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

const responseGoogle = response => {
  console.log(response);
};

const Login = () => (
  <div>
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
        <Header2>Log In</Header2>
        <Header4>Login with your Waterloop Email</Header4>
        <Header4>
          <GoogleLogin
            clientId="404915833701-5kvp9td9jonstfsola74atmkjct4h00d.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Header4>
      </div>
    </Card>
  </div>
);

export default Login;
