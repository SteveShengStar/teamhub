import React from 'react';
import styled from 'styled-components';
import Image from '../../atoms/Image';
import {SystemComponent} from '../../atoms/SystemComponents';


// TODO: Set actual image URL later
// TODO: Use server data
const imageUrl = undefined;
const Grid = styled(SystemComponent)`
    display: grid;
`;
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
export default ProfileSummary;
