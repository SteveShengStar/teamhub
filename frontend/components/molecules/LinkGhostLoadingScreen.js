import React from "react"
import {SystemComponent} from '../atoms/SystemComponents';
import EditSettingsModal from './EditSettingsModal';

const LinkGhostLoadingScreen = () => {

    const ghostLoadingStyle = {
        opacity: "50%" 
    };
    const systemsComponentStyle = {
        display: "grid", 
        gridTemplateColumns: '[100%, repeat(2, 1fr)]', 
        gridColumnGap: "[20, 30, 40]}", 
        gridAutoRows: 'minmax(70px, auto)'
    }

    return (
        <div className="ghostLoadingScreen">
            <EditSettingsModal>
                <SystemComponent 
                    style={systemsComponentStyle}
                    // display="grid" 
                    // gridTemplateColumns={["100%", "repeat(2, 1fr)"]}
                    // gridColumnGap={[20, 30, 40]}
                    // gridAutoRows='minmax(70px, auto)'
                >
                    <SystemComponent>
                        {/* <URLField
                            label="Personal Website"
                            name="websiteUrl"
                            placeholder="Enter Website Link ..." 
                            errorText={"Please Enter Valid Url."}
                        /> */}
                    </SystemComponent>
                    <SystemComponent>
                        {/* <URLField
                            label="Github"
                            name="githubUrl"
                            placeholder="Enter Github Link ..." 
                            errorText={"Please Enter Valid Github Profile Url."}
                        /> */}
                    </SystemComponent>
                    <SystemComponent>
                        {/* <URLField
                            label="LinkedIn"
                            name="linkedInUrl"
                            placeholder="Enter LinkedIn Link ..."
                            errorText={"Please Enter Valid LinkedIn Profile Url."}
                        /> */}
                    </SystemComponent>
                    <SystemComponent>   
                        {/* <URLField
                            label="Facebook"
                            name="facebookUrl"
                            placeholder="Enter Facebook Link ..." 
                            errorText={"Please Enter Valid Facebook Profile Url."}
                        /> */}
                    </SystemComponent>
                </SystemComponent>
            </EditSettingsModal>
        </div>
    );
}
 
export default LinkGhostLoadingScreen;