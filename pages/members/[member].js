import { useRouter } from 'next/router'
import React, { useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PageTemplate from '../../frontend/components/templates/PageTemplate';
import { useSelector, useDispatch } from 'react-redux';
import MemberInfoCard from '../../frontend/components/organisms/MemberInfoCard';
import { lookupMember } from '../../frontend/store/reducers/membersReducer';

const Post = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const routeId = router.query.member;
    const theme = useContext(ThemeContext);

    const selectedMember = useSelector(state => state.membersState.selectedMember);
    const loadedMembers = useSelector(state => state.membersState.loadedMembers);

    function reroute() {
        if (window.innerWidth >= theme.breakpoints[1].slice(0, -2)) {
            router.push("/");
            return true;
        }
    }
    useEffect(() => {
        if (reroute()) return;
        if (routeId === selectedMember._id);
        if (loadedMembers[routeId]) {
            dispatch({
                type: "SET_SELECTED_MEMBER",
                payload: loadedMembers[routeId]
            })
            
            return
        }
        lookupMember(dispatch, routeId);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", reroute);
        return () => window.removeEventListener("scroll", reroute);
    })

    return (
        <PageTemplate>
            <MemberCard memberData={selectedMember} onClose={() => router.back()}/>
        </PageTemplate>
    )
}

export default Post;

const MemberCard = styled(MemberInfoCard)`
    position: relative;
    width: inherit;

    ${props => props.theme.mediaQueries.tablet} {
        display: block;
        width: auto;
        position: relative;
        height: auto;
    }
`;