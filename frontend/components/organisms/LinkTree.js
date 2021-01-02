import styled from 'styled-components';
import { SystemComponent } from "../atoms/SystemComponents";
import Header5 from '../atoms/Header5';
import Image from '../atoms/Image';

const importantLinks = [
    {
        title: 'Google Drive',
        description: 'Documentation and Meeting Notes',
        url: 'a',
        imagePath: '/static/linktree/gdrive.png'
    },
    {
        title: 'Slack',
        description: 'Message your Teammates',
        url: 'a',
        imagePath: '/static/linktree/slack.png'
    },
    {
        title: 'Google Calendar',
        description: 'Schedule Meetings and Events',
        url: 'a',
        imagePath: '/static/linktree/gcal.png'
    },
    {
        title: 'Github',
        description: 'Access Waterloop\'s code repos',
        url: 'a',
        imagePath: '/static/linktree/git.png'
    },
    {
        title: 'ClickUp',
        description: 'Track Tasks and Manage Tickets',
        url: 'a',
        imagePath: '/static/linktree/clickup.png'
    },
    {
        title: 'Discord',
        description: 'Voice Conference with Teammates',
        url: 'a',
        imagePath: '/static/linktree/discord.png'
    },
];

const GridLayout = styled(SystemComponent)`
    display: grid;
    grid-template-rows: 18px 18px;
    grid-template-columns: auto 1fr;
    grid-column-gap: ${props => props.theme.space[4]}px;
    padding: ${props => props.theme.space[3]}px;
    cursor: pointer;
    background-color: ${props => props.theme.colors.greys[0]};

    border: solid #000 2px;
    border-radius: ${props => props.theme.space[3]}px;

    &:hover {
        transform: scale(1.01);
        background-color: ${props => props.theme.colors.greys[1]};
    }
    &:active {
        transform: scale(1.025);
    }
`;

const LinkTree = () => {
    return(
        <SystemComponent display="flex" flexDirection="column" mb={3}>
            {importantLinks.map((link, i) => 
                <a key={i} href={link.url} style={{textDecoration: "none"}} target="_blank">
                    <GridLayout>
                        <Image 
                            height={36} 
                            src={link.imagePath}
                            gridRow="1/3"
                            borderRadius="18px"
                            overflow="visible"
                        />
                        <SystemComponent> 
                            <Header5>{link.title}</Header5>
                        </SystemComponent>

                        <SystemComponent gridRow="2/3" gridColumn="2/3">
                            {link.description}
                        </SystemComponent>
                    </GridLayout>
                </a>
            )}
        </SystemComponent>
    )
}

export default LinkTree;