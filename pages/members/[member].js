import { useRouter } from 'next/router'
import React, { useEffect, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import PageTemplate from '../../frontend/components/templates/PageTemplate';
import { useSelector } from 'react-redux';
import MemberInfoCard from '../../frontend/components/organisms/MemberInfoCard';

const Post = () => {
    const router = useRouter()
    const { pid } = router.query
    const theme = useContext(ThemeContext);

    const selectedMember = useSelector(state => state.membersState.selectedMember)

    function reroute() {
        if (window.innerWidth >= theme.breakpoints[1].slice(0, -2)) {
            router.push("/");
        }
    }

    useEffect(() => {
        reroute()
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