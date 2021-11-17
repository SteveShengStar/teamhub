import React from "react"
import Header5 from "../atoms/Header5";
import {SystemComponent} from '../atoms/SystemComponents';
import ToggleListItem from "../atoms/ToggleListItem";
import EditSettingsModal from './EditSettingsModal';
import MultiSelectInput from "./MultiSelectInput";


const TeamsGhostLoadingScreen = ({persistedSelectedTeams, persistedNonSelectedteams}) => {
    return (
    <div className="teams-ghost">
      <EditSettingsModal
      opacity="50%"
      >
        <SystemComponent
          display="grid"
          gridTemplateColumns="100%"
          gridAutoRows="minmax(70px, auto)"
          gridRowGap={4}
        >
        <SystemComponent>
            <Header5>Which Subteams are you in ?</Header5>
            <SystemComponent
              display="grid"
              gridTemplateColumns="1fr"
              gridRowGap={3}
            >
              {/* {persistedSelectedTeams.map((team) => (
                <SystemComponent key={team}>
                  <ToggleListItem
                  />
                </SystemComponent>
              ))}
              {persistedNonSelectedteams.map((team) => (
                <SystemComponent key={team}>
                  <ToggleListItem
                  />
                </SystemComponent>
              ))} */}
            </SystemComponent>
          </SystemComponent>
          <SystemComponent>
            <MultiSelectInput
            />
          </SystemComponent>
        </SystemComponent>
      </EditSettingsModal>
    </div>
    )
};
 
export default TeamsGhostLoadingScreen;