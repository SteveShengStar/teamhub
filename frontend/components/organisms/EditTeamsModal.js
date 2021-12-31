import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBadValuesAndDuplicates } from '../../helpers';

import MultiSelectInput from '../molecules/MultiSelectInput';
import { SystemComponent } from '../atoms/SystemComponents';
import { useRouter } from 'next/router';

import Header5 from '../atoms/Header5';
import ToggleListItem from '../atoms/ToggleListItem';
import EditSettingsModal from '../molecules/EditSettingsModal';

import { updateProfileInfo, UserTypes } from '../../store/reducers/userReducer';
import { filter, capitalize } from 'lodash';

// Subteam ID to String Mapping
const subteamDisplayNames = {
  Business: 'business',
  Lim: 'LIM',
  Software: 'software',
  Electrical: 'electrical',
  Mechanical: 'mechanical',
  Exec: 'executive',
  Infrastructure: 'infrastructure',
  Admin: 'admin',
  Web: 'web',
};

const EditTeamsModal = ({ dataLoaded, visible, handleCloseModal }) => {
  const { user } = useSelector((state) => state.userState);
  const { filters } = useSelector((state) => state.membersState);
  const { projects: projectOpts } = filters;
  const router = useRouter();
  const dispatch = useDispatch();

  const persistedSelectedTeams =
    dataLoaded && user.subteams ? user.subteams.map((s) => s.name) : [];
  let persistedNonSelectedteams = filter(
    Object.keys(subteamDisplayNames),
    (team) => persistedSelectedTeams.includes(team) === false
  );

  const [localSelectedTeams, setLocalSelectedTeams] = useState(
    persistedSelectedTeams
  );
  const [selectedProjects, setSelectedProjects] = useState(
    dataLoaded && user.projects ? user.projects.map((p) => p.name) : []
  );

  useEffect(() => {
    if (visible) {
      setLocalSelectedTeams(persistedSelectedTeams);
      setSelectedProjects(
        dataLoaded && user.projects ? user.projects.map((p) => p.name) : []
      );
    }
  }, [dataLoaded, visible]);

  const handleSave = () => {
      updateProfileInfo(
        dispatch,
        {
          projects: removeBadValuesAndDuplicates(selectedProjects),
          subteams: localSelectedTeams,
        },
        user._id,
        router,
        false
      ).then(res => {
        if (res.success) {
            dispatch({ type: UserTypes.UPDATE_INFO, payload: res.body[0] });
        }
        handleCloseModal();
      }).catch(() => {
        alert("An error occured when updating your profile information.");
      });
  };

  const toggleSelectItem = (team) => {
    if (localSelectedTeams.includes(team)) {
      setLocalSelectedTeams(filter(localSelectedTeams, (i) => i != team));
    } else {
      setLocalSelectedTeams(localSelectedTeams.concat(team));
    }
  };

  return (
    <>
      <EditSettingsModal
        visible={visible}
        title="Edit Teams &amp; Responsibilities"
        handleCloseModal={handleCloseModal}
        handleSave={handleSave}
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
              {persistedSelectedTeams.map((team) => (
                <SystemComponent key={team}>
                  <ToggleListItem
                    id={team}
                    text={subteamDisplayNames[team]}
                    selected={localSelectedTeams.includes(team)}
                    onSelect={toggleSelectItem}
                  />
                </SystemComponent>
              ))}
              {persistedNonSelectedteams.map((team) => (
                <SystemComponent key={team}>
                  <ToggleListItem
                    id={team}
                    text={subteamDisplayNames[team]}
                    selected={localSelectedTeams.includes(team)}
                    onSelect={toggleSelectItem}
                  />
                </SystemComponent>
              ))}
            </SystemComponent>
          </SystemComponent>
          <SystemComponent>
            <MultiSelectInput
              title="What Projects are you Working on ?"
              setSelectedItems={(list) => setSelectedProjects(list)}
              options={
                projectOpts
                  ? projectOpts.map((project) => ({
                      value: project.name,
                      label: capitalize(project.name),
                    }))
                  : []
              }
              helpMessage="Type below to create new/custom entries."
            />
          </SystemComponent>
        </SystemComponent>
      </EditSettingsModal>
    </>
  );
};
export default EditTeamsModal;

// Give suggestions for Projects -- Fetch from backend
