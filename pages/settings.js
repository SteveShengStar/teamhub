import React, { useState, useContext } from "react";
import styled from "styled-components";

import { ACTIVE_MODAL } from "../frontend/components/constants";
import Card from "../frontend/components/atoms/Card";
import Header2 from "../frontend/components/atoms/Header2";
import Header3 from "../frontend/components/atoms/Header3";
import Header5 from "../frontend/components/atoms/Header5";
import LargeButton from "../frontend/components/atoms/LargeButton";
import { SystemComponent } from "../frontend/components/atoms/SystemComponents";
import SettingsDivSubsection from "../frontend/components/molecules/SettingsDivSubsection";
import ProfileSummary from "../frontend/components/molecules/AccountSettings/ProfileSummary";
import SettingsModalSelector from "../frontend/components/atoms/SettingsModalSelector";

import PageTemplate from "../frontend/components/templates/PageTemplate";
import theme from "../frontend/components/theme";
import { marginBottom } from "styled-system";

// Assumption: I receive an ID representing subteam
// I can look up the corresponding subteam color code
const subteams = ["software", "electrical"];
const projects = ["teamhub", "test rig programming"];

const externalLinks = {
  0: "steven.xiong.me",
  1: "www.linkedin.ca",
  2: "www.github.com",
  3: "www.facebook.com"
};
const externalLinkLabels = [
  "Personal Website",
  "LinkedIN",
  "GitHub",
  "Facebook"
];

const EditableSectionHeader = ({ title, handleEditClicked }) => {
  return (
    <SystemComponent
      display="flex"
      justifyContent="flex-start"
      flexDirection="row"
    >
      <SystemComponent
        style={{ transformOrigin: "left", marginBottom: "1%", marginTop: "1%" }}
        mr={theme.space.editableHeaderMargin}
      >
        <Header2>{title}</Header2>
      </SystemComponent>
      <LargeButton handleClick={handleEditClicked}>Edit</LargeButton>
    </SystemComponent>
  );
};
// TODO: Discuss naming of button colours, especially for gray. "cancel" may be a bad label

const SettingsDivBody = styled(SystemComponent)`
  padding-left: ${theme.space.settingsSubsectionPadding}px;
`;

// Text Area
// TODO: Delete this component
const NonEditableTextArea = styled(SystemComponent)`
  width: 100%;
  margin-bottom: 3%;
`;

const SettingsDiv = ({ children, title, onEditClicked }) => {
  return (
    <>
      <EditableSectionHeader title={title} handleEditClicked={onEditClicked} />
      <SettingsDivBody>{children}</SettingsDivBody>
    </>
  );
};

const SideNavContainer = styled(SystemComponent)`
  box-sizing: border-box;
  display: none;

  width: 360px;
  padding-right: 25px;

  ${theme.mediaQueries.tablet} {
    display: block;
  }
`;

const SideNavMenu = styled(Card)`
  box-sizing: border-box;
  width: "100%";
`;

const ThreeColumnGrid = styled(SystemComponent)`
  display: grid;
  grid-template-columns: 150px auto;
  grid-auto-rows: minmax(30px, auto);

  ${theme.mediaQueries.mobile} {
    grid-template-columns: 150px 350px;
  }
  ${theme.mediaQueries.tablet} {
    grid-template-columns: 150px auto;
  }
  @media screen and (min-width: 935px) {
    grid-template-columns: 150px 300px;
  }
`;

const Home = () => {
  const [activeModal, setActiveModal] = useState(false);

  const handleCloseModal = () => {
    setActiveModal(ACTIVE_MODAL.NONE);
  };

  return (
    <PageTemplate>
      <>
        <SettingsModalSelector
          activeModal={activeModal}
          handleCloseModal={handleCloseModal}
        />
        <SystemComponent display="flex" overflow="hidden">
          <SideNavContainer>
            <SideNavMenu></SideNavMenu>
          </SideNavContainer>
          <Card overflow="auto" width={["90vw", "85vw", "100%"]} flexGrow={1}>
            <SettingsDiv
              title="Teams &amp; Responsibilities"
              onEditClicked={() => {
                setActiveModal(ACTIVE_MODAL.TEAMS_RESPONSIBILITIES);
              }}
            >
              <SettingsDivSubsection
                headerText="My Subteams"
                isLabelListSection={true}
                labelValues={subteams}
                labelStyleVariants={subteams}
              />
              <SettingsDivSubsection
                headerText="My Projects"
                isLabelListSection={true}
                labelValues={projects}
                labelStyleVariants={["software", "software"]}
              />
              <SettingsDivSubsection headerText="What do I do on Teamhub ?">
                <NonEditableTextArea>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus faucibus sodales blandit. Nam eget dui ipsum. Fusce
                  elit lorem, aliquet sed ipsum quis, euismod porta urna.
                  Suspendisse egestas dui at massa ultricies, in consectetur
                  sapien rutrum. Fusce pulvinar vel felis id pretium. Vestibulum
                  mattis auctor varius. Suspendisse maximus tortor ac lacinia
                  maximus. Nam sit amet ultrices magna.
                </NonEditableTextArea>
              </SettingsDivSubsection>
            </SettingsDiv>

            <SettingsDiv
              title="Profile Information"
              onEditClicked={() => {
                setActiveModal(ACTIVE_MODAL.PROFILE_INFO);
              }}
            >
              <ProfileSummary />
              <SettingsDivSubsection
                headerText="My Skills"
                isLabelListSection={true}
                labelValues={[
                  "Circuit Design",
                  "Web Design",
                  "Public Speaking"
                ]}
                labelStyleVariants={["cancel", "cancel", "cancel"]}
              />
              <SettingsDivSubsection
                headerText="My Interests"
                isLabelListSection={true}
                labelValues={["Self-Driving Cars", "UX Design"]}
                labelStyleVariants={["cancel", "cancel"]}
              />
              <SettingsDivSubsection
                headerText="Short Bio"
                isLabelListSection={false}
              />
            </SettingsDiv>

            <SettingsDiv
              title="Edit External Accounts"
              onEditClicked={() => {
                setActiveModal(ACTIVE_MODAL.EXTERNAL_LINKS);
              }}
            >
              <ThreeColumnGrid>
                {Object.values(externalLinks).map((url, i) => (
                  <>
                    <SystemComponent
                      gridColumn="1 / 2"
                      gridRow={(i + 1).toString().concat(" / span 1")}
                    >
                      <Header5>{externalLinkLabels[i]}</Header5>
                    </SystemComponent>
                    <SystemComponent
                      gridColumn="2 / 3"
                      gridRow={(i + 1).toString().concat(" / span 1")}
                      textAlign="right"
                    >
                      {url}
                    </SystemComponent>
                  </>
                ))}
              </ThreeColumnGrid>
            </SettingsDiv>
          </Card>
        </SystemComponent>
      </>
    </PageTemplate>
  );
};
export default Home;
