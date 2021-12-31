import React, { useState, useContext, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeContext } from "styled-components";
import anime from "animejs";

import PageTemplate from '../frontend/components/templates/PageTemplate';
import { SystemComponent } from '../frontend/components/atoms/SystemComponents';
import Header3 from '../frontend/components/atoms/Header3';
import Card from '../frontend/components/atoms/Card';
import Button from "../frontend/components/atoms/Button";
import MemberListGrid from '../frontend/components/molecules/MemberListGrid';
import { searchMembers, lookupMember, getFilters, DataFetchType } from '../frontend/store/reducers/membersReducer';
import { getMemberEmail } from "../frontend/store/api/members";
import MemberInfoCard from '../frontend/components/organisms/MemberInfoCard';

const Home = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useContext(ThemeContext); // Using the theme (colours, fonts, etc.)  from  /frontend/components/theme.js
    const memberCardRef = useRef();

    const { hydrated, user } = useSelector(state => state.userState);   // hydrated: boolean flag -- true if the Redux store has been re-populated after a page-load/page-refresh                                                             
    const { members, selectedMember, loadedMembers, fetchingData, fetchedMembers } = useSelector(state => state.membersState);
    
    // Group Action selection 
    const [groupSelectedMembers, setGroupSelectedMembers] = useState([]);
    const [activeAction, setActiveAction] = useState("");

    // The user selected a member (identified by id) from the members list to see a preview of his/her profile
    const onSelectMember = (id) => {
        if (activeAction) {
            if(id !== user._id) {
                const index = groupSelectedMembers.indexOf(id);
                if(index == -1) {
                    // Add id to selected members
                    setGroupSelectedMembers([...groupSelectedMembers, id]); 
                } else {
                    // Remove id from selected members
                    groupSelectedMembers.splice(index, 1);
                    setGroupSelectedMembers([...groupSelectedMembers]);
                }
            }
            return;
        }
 
        // If browser width is narrow (tablet/mobile phone), transition to a new url which shows the member's profile
        // If browser width is wide (laptop/PC), display the member's profile on the same page (use the same url)
        if (window.innerWidth < theme.breakpoints[1].slice(0, -2)) {
            router.push(`/members/${id}`);
            return;
        }
        if (loadedMembers[id]) {
            // As soon as the member identified by "id" is set as the selected member in the Redux store,
            // then the profile of that member (identified by "id") is displayed on the website
            dispatch({
                type: "SET_SELECTED_MEMBER",
                payload: loadedMembers[id]
            });
            return;
        }
        lookupMember(dispatch, id, router);
    };

    useEffect(() => {
        if (hydrated && user && !fetchingData) {
            getFilters(dispatch, router).then(success => {
                if (success) searchMembers(dispatch, {subteams: {"$in": user.subteams.map(st => st._id) }}, router);
            });
        }
    }, [hydrated, user]);      /* hydrated is set to true once data is re-loaded into the Redux store after a page-refresh/page-reload */ 

    useEffect(() => {
        if (selectedMember._id) {
            // Make the member profile card slide into or out of view depending on which member was selected 
            anime({
                targets: memberCardRef.current,
                translateX: 0,
                easing: "easeOutQuad",
                duration: 200
            });
        }
    }, [selectedMember]);

    const getEmails = async () => {
        const emails = [];

        for (let i = 0; i < groupSelectedMembers.length; i++) {
          const id = groupSelectedMembers[i];
          const res = await getMemberEmail(id, dispatch, router);

          if(res.success) emails.push(res.body[0].email);
        }
        return emails;
    }

    const generateGroupEmail = async () => {
        const emails = await getEmails();
        const filteredEmails = emails.filter((email) => email !== user.email);

        // Generate Gmail mailto link
        const concatenatedEmails = filteredEmails.join(';'); 
        const link = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${concatenatedEmails}`;
        window.open(link);
    }

    const getActionText = () => {
      if (activeAction === 'slack')
        return 'Message'
      else if (activeAction === 'email')
        return 'Email'
      return '';
    }

    const onExecuteAction = () => {
      if (activeAction === 'email')
        generateGroupEmail();
    }

    const toggleGroupAction = (action) => {
      if (action === activeAction) {
        onCancel();
        return;
      }

      if (action) setActiveAction(action);
    }

    const onCancel = () => {
      setActiveAction("");
      setGroupSelectedMembers([]);
    }

    return (
      <PageTemplate title="Explore">
        <SystemComponent
          position="relative"
          overflowY="hidden"
          overflowX="hidden"
          gridGap={["cardMarginSmall", "cardMarginSmall", "cardMarginSmall", "cardMargin"]}
          display={["block", "block", "grid", "grid"]}
          gridTemplateRows="auto auto"
          gridTemplateColumns="auto 1fr"
        >
          <MembersListCard
            display="grid"
            gridTemplateColumns="1fr"
            gridTemplateRows="auto auto 1fr"
            gridRow={"1/3"}
            overflowY="auto"
            overflowX="hidden"
            position={["relative", "relative", "relative"]}
            memberData={selectedMember}
          >
              <SystemComponent display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Header3 style={{ transformOrigin: 'left' }}>Members</Header3>
                  
                  <SystemComponent>
                      <SystemComponent display="flex" flexWrap='wrap' flexDirection="row-reverse">
                          <OptionButton onClick={() => toggleGroupAction('email')} isSelected={activeAction === 'email'}>
                            Email
                          </OptionButton>
                          {
                            (groupSelectedMembers.length > 0) && 
                            <ExecuteActionButton onClick={onExecuteAction}>
                              Send {getActionText()}
                            </ExecuteActionButton>
                          }
                          {
                            activeAction &&   
                            <CancelButton onClick={onCancel}>
                              Cancel
                            </CancelButton>
                          }
                      </SystemComponent>
                        {activeAction && <SystemComponent textAlign='right'>Select a bunch of members below, then Click Send {getActionText()}.</SystemComponent>}           
                  </SystemComponent>     
              </SystemComponent>
              <MemberListGrid members={members} onSelect={onSelectMember} fetchedMembers={fetchedMembers} groupSelectedMembers={groupSelectedMembers} />
          </MembersListCard>
          <MemberCard 
            animRef={memberCardRef}
            memberData={selectedMember}
            onClose={() => {
                anime({ // Make the member profile card slide out of view
                    targets: memberCardRef.current,
                    translateX: "110%",
                    easing: "easeOutQuad",
                    duration: 200
                }).finished.then(() => {
                    dispatch({
                        type: "SET_SELECTED_MEMBER",
                        payload: {}
                    })
                })
            }}
          />
        </SystemComponent>
      </PageTemplate>
    );
};

export default Home;

const MembersListCard = styled(Card)`
    transition: all 0.2s ease-out;
    -webkit-transition: all 0.5s ease;

    width: calc(100vw - ${props => 2 * props.theme.space.cardMarginSmall + 2 * props.theme.space.cardPaddingSmall}px);
    top: 0;
    ${props => props.theme.mediaQueries.tablet} {
        height: auto;
        transform: none;
        width: 300px;
        padding: 20px;
    }

    ${props => props.theme.mediaQueries.smallDesktop} {
        width: 50vw;
    }

    ${props => props.theme.mediaQueries.desktop} {
        width: 60vw;
    }
`;

const MemberCard = styled(MemberInfoCard)`
    display: none !important;
    ${props => props.theme.mediaQueries.tablet} {
        display: grid !important;
        width: inherit;
        position: relative;
        height: inherit;
        transition: all 0.2s ease-in-out;
        transform: translateX(110%);
        grid-row: 1/3;
        overflow-y: auto;
    }
`;

const OptionButton = styled(Button)`
  display: block;
  margin-left: ${props => props.theme.space[3]}px;
  margin-bottom: ${props => props.theme.space[2]}px;

  background-color: ${props => props.isSelected && props.theme.colors.background};
  color: ${props => props.isSelected && props.theme.colors.foreground};
  font-weight: ${props => props.isSelected && 700};
  font-size: ${props => props.isSelected && props.theme.fontSizes.body2}px;
  border: ${props => props.isSelected && 'solid 1px #000'};

  ${props => props.isSelected && '&:hover {transform: scale(1); pointer: default;}'}
  ${props => props.isSelected && '&:active {opacity: 1;}'}
  ${props => props.isSelected && 'cursor: default;'}
`;

const CancelButton = styled(OptionButton)`
  background-color: ${({ theme }) => theme.colors.alertAction};
`;

const ExecuteActionButton = styled(OptionButton)`
  background-color: ${({ theme }) => theme.colors.electrical};
`;