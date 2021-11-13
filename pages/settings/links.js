import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {ACTIVE_MODAL} from '../../frontend/components/constants';

import Header5 from '../../frontend/components/atoms/Header5';
import {SystemLink} from '../../frontend/components/atoms/SystemComponents';
import {SystemComponent} from '../../frontend/components/atoms/SystemComponents';
import SettingsSection from '../../frontend/components/molecules/AccountSettings/SettingsSection';
import {capitalize} from 'lodash';

const ThreeColumnGrid = styled(SystemComponent)`
    display: grid;
    grid-template-columns: 20px 150px auto;
    grid-auto-rows: minmax(30px, auto);

    ${props => props.theme.mediaQueries.mobile} {
        grid-template-columns: 20px 150px 350px;
    }
`;

const NonUnderlinedLink = styled(SystemLink)`
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const AddInfoPrompt = styled(SystemLink)`
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
        cursor: pointer; 
        opacity: 0.7;
    }
`;

const LinksSection = ({sectionTitle, setActiveModal, userDataLoaded}) => {

    const { user } = useSelector(state => state.userState);
    const links = userDataLoaded && user ? user.links : [];
    const linkLabelIcons = ['fa-globe', 'fa-linkedin', 'fa-github', 'fa-facebook-square'] // CSS Class names of font-awesome icons
    const accountTypes = ["website", 'linkedin', 'github', 'facebook'];
    const altText = {
        "website": "Personal Website",
        "linkedin": "Linkedin Profile",
        "github": "Github Profile",
        "facebook": "Facebook Profile"
    };

    return (
        <SettingsSection 
            title={sectionTitle}
            onEditClicked={() => {
                setActiveModal(ACTIVE_MODAL.EXTERNAL_LINKS); 
            }}
        >
            <ThreeColumnGrid>
                {
                    accountTypes.map((acctType, i) =>
                    <> 
                        <SystemComponent gridColumn="1 / 2"><i className={"fa " + linkLabelIcons[i]}/></SystemComponent>
                        <SystemComponent gridColumn="2 / 3" 
                            gridRow={(i+1).toString().concat(" / span 1")}
                        >
                            <Header5>
                                {capitalize(acctType)}
                            </Header5>
                        </SystemComponent>
                        <SystemComponent 
                            gridColumn="3 / 4" 
                            gridRow={(i+1).toString().concat(" / span 1")}
                            textAlign="right"
                        >
                            {(links.find(link => link.type === acctType) && 
                                (links.find(link => link.type === acctType).link.length > 0)) ? (
                                <NonUnderlinedLink 
                                    href={links.find(link => link.type === acctType).link} 
                                    alt={altText[acctType]} 
                                    target="_blank"
                                >
                                    {links.find(link => link.type === acctType).link}
                                </NonUnderlinedLink>
                            ) : (
                                <AddInfoPrompt alt={altText[acctType]} onClick={e => setActiveModal(ACTIVE_MODAL.EXTERNAL_LINKS)}>
                                    {"Click to add a link"}
                                </AddInfoPrompt>
                            )}
                        </SystemComponent>
                    </>
                )}
            </ThreeColumnGrid>
        </SettingsSection>
    );

}
export default LinksSection;