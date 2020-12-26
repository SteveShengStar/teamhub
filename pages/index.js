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
import MemberFilterComponent from '../frontend/components/molecules/MemberFilterComponent';
import MemberListGrid from '../frontend/components/molecules/MemberListGrid';
import { searchMembers, lookupMember, getFilters, DataFetchType } from '../frontend/store/reducers/membersReducer';
import MemberInfoCard from '../frontend/components/organisms/MemberInfoCard';
import MembersFilterModal from '../frontend/components/organisms/MembersFilterModal';

import { getUserId, startGroupConversation } from "./api/slack";
import { constants } from "../constants";

const Home = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    // Use the theme (colours, fonts, etc.) from /frontend/components/theme.js
    const theme = useContext(ThemeContext);

    // Indicates whether the dialog window (with dropdown menus for list item filters) is visible and upfront
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ searchQuery, setSearchQuery ] = useState({})
    const memberCardRef = useRef();

    // token:    user authentication token. 
    // hydrated: boolean flag -- "true" if the Redux store has been re-populated after a page-load/page-refresh
    const { token, hydrated, user } = useSelector(state => state.userState);
    const { members, selectedMember, loadedMembers, filters, fetchingData, fetchedMembers } = useSelector(state => state.membersState);
    
    // Group selection 
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isSelectionEnabled, setIsSelectionEnabled] = useState(false);

    // The user selected a member (identified by id) from the members list to see a preview of his/her profile
    const onSelectMember = (id) => {

        if (isSelectionEnabled) {
            if(id !== user._id) {
                const index = selectedMembers.indexOf(id);
                if(index == -1) {
                    // Add id to selected members
                    setSelectedMembers([...selectedMembers, id]); 
                } else {
                    // Remove id from selected members
                    selectedMembers.splice(index, 1);
                    setSelectedMembers([...selectedMembers]);
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

        lookupMember(dispatch, token, id, router);
    };

    const updateSearchQuery = (input) => {
        if (typeof(input) == "string") {
            setSearchQuery({...searchQuery, display: input || undefined})
            return;
        }
        let normalized = {};
        Object.keys(input).forEach(key => {
            if (input[key] && input[key].length > 0) {
                let newKey = key.toLowerCase()
                if (key == "roles") newKey = "roles";
                normalized[newKey] = input[key][0].label
            }
        });
        setSearchQuery({...normalized, display: searchQuery.display });
    };

    /* useEffect(() => {
        if (filters.projects && !fetchingData) {
            // TODO: Must fix.
            // Update the list of members based on the search bar's query
            searchMembers(dispatch, token, searchQuery, router)
        }
    }, [searchQuery]) */     /* searchQuery: Object containing the text in the search bar
                                {display: [text-in-search-bar]} */

    useEffect(() => {
        if (hydrated && !fetchingData) {
            getFilters(dispatch, token, router).then(success => {
                if (success) searchMembers(dispatch, token, {subteams: {"$in": user.subteams.map(st => st._id) }}, router);
            });
        }
    }, [hydrated]);      /* hydrated: set to true once data is re-loaded into the Redux store after a page-refresh/page-reload */ 

    useEffect(() => {
        if (selectedMember._id) {
            // Make the member profile card slide into view or out of view depending on which member was just selected 
            anime({
                targets: memberCardRef.current,
                translateX: 0,
                easing: "easeOutQuad",
                duration: 200
            })
        }
    }, [selectedMember]);

    const getEmails = () => {
        const emails = [];

        // Get the email of each user
        selectedMembers.forEach(id => {
            const email = members.find(({ _id }) => _id === id).email;
            if(email) emails.push(email);
        });

        return emails;
    }

    const generateGroupEmail = () => {
        const emails = getEmails();
        const filteredEmails = emails.filter((email) => email !== user.email);

        // Generate Gmail mailto link
        const concatenatedEmails = filteredEmails.join(';'); 
        const link = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${concatenatedEmails}`;
        window.open(link);
    }

    const generateSlackGroup = async () => {
      const emails = getEmails();
      const slackIds = [];

      for(const email of emails) {
        const slackId = await getUserId(email);
        slackIds.push(slackId);
      }
      
      const slackIdsStr = slackIds.join();
      const { channel } = await startGroupConversation(slackIdsStr);
      window.open(`slack://channel?team=${constants.TEAM_ID}&id=${channel.id}`);
    }

    const cancelGroupSelection = () => {
      setIsSelectionEnabled(false);
      setSelectedMembers([]);
    }

    const enableGroupSelection = () => {
      setIsSelectionEnabled(true);
      setSelectedMembers([user._id]);
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
          <MembersFilterModal
            visible={modalVisible}
            filters={filters}
            updateSearchQuery={updateSearchQuery}
            hide={() => setModalVisible(false)}
          />
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
                  
                  <SystemComponent display="flex" flexWrap='wrap'>
                      {isSelectionEnabled ? (
                          <>
                          <OptionButton onClick={generateGroupEmail} width="80px">
                            Email
                          </OptionButton>
                          <OptionButton onClick={generateSlackGroup} width="100px">
                            Slack DM
                          </OptionButton>
                          <CancelButton onClick={cancelGroupSelection} width="80px">
                            Cancel
                          </CancelButton>
                        </>
                      ) : (
                        <OptionButton onClick={enableGroupSelection} width="80px">
                          Select
                        </OptionButton>
                      )}
                      <OptionButton onClick={() => setModalVisible(!modalVisible)} width="100px">
                        Edit Filters
                      </OptionButton> 
                  </SystemComponent>                     
              </SystemComponent>
              <MemberFilterComponent filterOptions={filters} updateSearchQuery={updateSearchQuery}/>
              <MemberListGrid memberData={selectedMember} members={members} onSelect={onSelectMember} fetchedMembers={fetchedMembers} />
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
`;

const CancelButton = styled(OptionButton)`
  background-color: ${({ theme }) => theme.colors.alertAction};
`;