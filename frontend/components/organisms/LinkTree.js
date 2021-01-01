import { SystemComponent } from "../atoms/SystemComponents";

const importantLinks = [
    {
        title: 'Google Drive',
        description: 'Technical Documentation and Meeting Notes',
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
        description: 'Schedule Group Meetings and Events',
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


const LinkTree = () => {

    return(
        <SystemComponent display="flex" flexDirection="column" mb={3}>
            {importantLinks.map(link => 
                <SystemComponent borderRadius={3} borderWidth="2px" borderColor="black">
                    <SystemComponent></SystemComponent>
                    <SystemComponent></SystemComponent>
                    <SystemComponent></SystemComponent>
                </SystemComponent>
            )}
        </SystemComponent>
    )
}

export default LinkTree;