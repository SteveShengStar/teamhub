import React from 'react';
import styled from 'styled-components';

import PageTemplate from '../frontend/components/templates/PageTemplate';
import Card from '../frontend/components/atoms/Card';

/* Testing Steven Steven's changes */
import Header3 from '../frontend/components/atoms/Header3';
import Header4 from '../frontend/components/atoms/Header4';
import {SystemComponent} from '../frontend/components/atoms/SystemComponents';
import Image from '../frontend/components/atoms/Image';

import Button from '../frontend/components/atoms/Button';
import theme from '../frontend/components/theme';
import {capitalize, startCase} from 'lodash';


const subheadingHeight = 30;
const SettingsDivBody = styled(SystemComponent)`
    padding-left: ${theme.space.settingsSubsectionPadding}px;
`;

// Assumption: I receive an ID representing subteam
// I can look up the corresponding subteam color code
const subteams = ['software', 'electrical'];
const projects = ['teamhub', 'test rig programming'];

const CustomSubHeading = styled(Header4)`
    font-size: 16.5px;
`;

 
// TODO: change to props => props.theme later
const EditButton = styled(Button)`
    background-color: ${theme.colors.greys[2]};
    height: 30px;
`;

const CustomButton = styled(Button)`
    padding-top: 2px;
    padding-bottom: 2px;

    // TODO: Is there a better way to do this ?
    transform: scale(1.0) !important;
`;

const EditableSectionHeader = ({title}) => {
    const buttonLabel = 'Edit';

    return (
        <SystemComponent display='flex' justifyContent='flex-start' flexDirection='row'>
            <SystemComponent style={{ transformOrigin: 'left' }} 
                mr={theme.space.editableHeaderMargin}
            >
                <Header3>{title}</Header3>
            </SystemComponent>
            <EditButton><Header4 color="#ffffff">{buttonLabel}</Header4></EditButton>
        </SystemComponent>
    )
}

const ButtonWrapper = ({variant, label}) => {
    return (
        <CustomButton variant={variant} 
            mr={theme.space[5]}
        >
            {label}
        </CustomButton>
    );
};

const SettingsDivSubsection = ({
                                headerText, 
                                isLabelListSection = false,
                                labelValues,
                                labelStyleVariants,
                                children}) => {
    //console.log(theme.colors[subteams[1]]);

    // TODO: revise this condition later
    // TODO: update the keys later
    // TODO: make sure labelValues and labelStylingVariants have same length
    let sectionBody;
    if (isLabelListSection) {
        sectionBody = labelValues.map((labelValue, i) => 
            <ButtonWrapper key={i}
                variant={labelStyleVariants[i]} 
                label={startCase(labelValue)}
            />
        );
    } else {
        sectionBody = children;
    }
    
    return (
        <>
            {headerText &&  
                <SystemComponent height={subheadingHeight}>
                    <CustomSubHeading>{headerText}</CustomSubHeading>
                </SystemComponent>
            }
            <SystemComponent>
                {sectionBody}
            </SystemComponent>
        </>
    );
};

const Grid = styled(SystemComponent)`
    display: grid;
`

// TODO: using styled component may be better
// because I never pass parameters that actually configure properties of this container.
const SettingsHorizontalFlexbox = ({children, leftChildWidth, componentSpacing}) => {

    return (
        <Grid 
            gridTemplateColumns={leftChildWidth + 'px auto'}
            gridColumnGap={componentSpacing}
        >
            <SystemComponent>
                {children[0]}
            </SystemComponent>
            <SystemComponent>
                {children[1]}
            </SystemComponent>
        </Grid>
    );
}

// TODO: insert icons to the left of the labels
const ProfileSummary = () => {
    return (
        <SettingsHorizontalFlexbox leftChildWidth={200} componentSpacing={20}>
            <Image
                width='100%'
                src={imageUrl || "/static/default-headshot.png"}
                borderRadius="18px"
            />
            <SystemComponent overflowY='auto'>
                <table style={{width: '100%'}}>
                    <tbody>
                        {Object.values(userInformation).map((fieldInfo, i) =>
                            <tr key={i}>
                                <td></td>
                                <td>{fieldInfo.label}</td>
                                <td style={{textAlign: 'right'}}>{fieldInfo.value}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </SystemComponent>
        </SettingsHorizontalFlexbox>
    );
}

// Text Area
// TODO: Delete this component
const NonEditableTextArea = styled(SystemComponent)`
    width: 100%;
`;
// TODO: Set actual image URL later
const imageUrl = undefined;
const userInformation = {
    firstName: {
        label: 'First Name',
        value: "Steven"
    },
    lastName: {
        label: "Last Name",
        value: "Xiong"
    },
    birthDay: {
        label: "Birthday",
        value: "Nov 20, 1998"
    },
    birthDay: {
        label: "Program",
        value: "Computer Engineering"
    },
    term: {
        label: "Term",
        value: "3B"
    },
    email: {
        label: "Email",
        value: "ssxiong@edu.uwaterloo.ca"
    }
};


const Home = () => {
    return (
        <PageTemplate >
            <Card overflowY="auto">
                <EditableSectionHeader title="Teams &amp; Responsibilities"></EditableSectionHeader>
                <SettingsDivBody>
                    <SettingsDivSubsection headerText='My Subteams'
                        isLabelListSection={true}
                        labelValues={subteams}
                        labelStyleVariants={subteams}
                    />
                    <SettingsDivSubsection headerText='My Projects'
                        isLabelListSection={true}
                        labelValues={projects}
                        labelStyleVariants={['software', 'software']}
                    />
                    <SettingsDivSubsection headerText='What do I do on Teamhub ?'>
                        <NonEditableTextArea>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus 
                            sodales blandit. Nam eget dui ipsum. Fusce elit lorem, aliquet sed ipsum quis, 
                            euismod porta urna. Suspendisse egestas dui at massa ultricies, in consectetur 
                            sapien rutrum. Fusce pulvinar vel felis id pretium. Vestibulum mattis auctor 
                            varius. Suspendisse maximus tortor ac lacinia maximus. Nam sit amet ultrices magna. 
                        </NonEditableTextArea>
                    </SettingsDivSubsection>
                    
                </SettingsDivBody>

                <EditableSectionHeader title="Profile Information"></EditableSectionHeader>
                <SettingsDivBody>
                    <ProfileSummary />
                </SettingsDivBody>
            </Card>
        </PageTemplate>
    )
};
export default Home;
// TODO: The styling between thhe 2 sections is too different.
// Break up into 2 components
// Futhermore, start organizing the code a little more.
// Modularize and put into separate files