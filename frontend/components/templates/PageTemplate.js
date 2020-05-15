import React, { useEffect } from "react";
import Head from "next/head";
import Image from "../atoms/Image";
import { SystemComponent } from "../atoms/SystemComponents";
import Subtitle from "../atoms/Subtitle";
import MyHub from "../organisms/MyHub";
import styled from "styled-components";

export const PageTemplateGridLayout = styled(SystemComponent)`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: inherit;
  grid-gap: ${props => props.theme.space.titleBottomMargin}px;

  ${props => props.theme.mediaQueries.tablet} {
    grid-template-rows: 100px 1fr;
  }
`;

const PageTemplate = ({ className, title, children, myHubHidden }) => {
  return (
    <div>
      <Head>
        <title>{title} | Team Hub</title>
      </Head>
      <Image
        variant="background"
        //src="/static/background.png"
        //alt="background"
        position="fixed"
        left={0}
        right={0}
        top={0}
        bottom={0}
      />
      {
        <SystemComponent
          display="flex"
          position={["relative", "relative", "absolute"]}
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflow={["auto", "auto", "visible"]}
          alignItems={"stretch"}
          bg="greys.0"
        >
          {/*myHubHidden ? null : <MyHub />*/}
          <PageTemplateGridLayout
            className={className}
            height="inherit"
            p={["cardMarginSmall", "cardMarginSmall", "cardMargin"]}
            width="inherit"
            mt={["20vw", "20vw", 0]}
            flex={1}
            alignItems={"stretch"}
          >
            <Subtitle
              as="h1"
              alignSelf="end"
              fontSize={["smallSubtitle", "subtitle"]}
              display={["none", "none", "block"]}
            >
              {title}
            </Subtitle>
            {React.Children.only(children)}
          </PageTemplateGridLayout>
        </SystemComponent>
      }
    </div>
  );
};

export default PageTemplate;
