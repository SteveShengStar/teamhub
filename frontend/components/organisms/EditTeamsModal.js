import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { removeDuplicates } from '../../util';

import { SystemComponent } from '../atoms/SystemComponents';
import Header5 from '../atoms/Header5';
import ToggleListItem from '../atoms/ToggleListItem';
import MultiSelectInput from '../molecules/MultiSelectInput';
import EditSettingsModal from '../molecules/EditSettingsModal';

import { updateProfileInfo, UserTypes } from '../../store/reducers/userReducer';
import { getFilters } from '../../store/reducers/membersReducer';
import useLoadingScreen from '../../hooks/useLoadingScreen';
import { filter, capitalize, isEmpty } from 'lodash';

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

const EditTeamsModal = ({ visible, handleCloseModal }) => {
    const { user, hydrated } = useSelector((state) => state.userState);
    const { filters } = useSelector((state) => state.membersState);
    const { projects: projectOpts } = filters;
    const router = useRouter();
    const dispatch = useDispatch();
    const [loader, showLoader, hideLoader] = useLoadingScreen(false);

    const persistedSelectedTeams = user.subteams
        ? user.subteams.map((s) => s.name)
        : [];
    let persistedNonSelectedteams = filter(
        Object.keys(subteamDisplayNames),
        (team) => persistedSelectedTeams.includes(team) === false
    );

    const [localSelectedTeams, setLocalSelectedTeams] = useState(
        persistedSelectedTeams
    );
    const [selectedProjects, setSelectedProjects] = useState(
        user.projects
            ? user.projects.map((i) => {
                  return {
                      label: capitalize(i.name),
                      value: i.name,
                  };
              })
            : []
    );

    useEffect(() => {
        if (hydrated && isEmpty(filters)) {
            getFilters(dispatch, router);
        }
    }, [hydrated]);

    const handleSave = () => {
        showLoader();
        updateProfileInfo(
            dispatch,
            {
                projects: removeDuplicates(
                    selectedProjects.map((p) => p.value)
                ),
                subteams: localSelectedTeams,
            },
            user._id,
            router,
            false
        )
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: UserTypes.UPDATE_INFO,
                        payload: res.body[0],
                    });
                }
                handleCloseModal();
            })
            .catch((err) => {
                console.error(err);
                alert(
                    'Save not successful. Please contact Waterloop Web Team for assistance.'
                );
            })
            .finally(() => {
                hideLoader();
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
                title='Edit Teams &amp; Responsibilities'
                handleCloseModal={handleCloseModal}
                handleSave={handleSave}
            >
                <SystemComponent
                    display='grid'
                    gridTemplateColumns='100%'
                    gridAutoRows='minmax(70px, auto)'
                    gridRowGap={4}
                >
                    <SystemComponent>
                        <Header5>Which Subteams are you in ?</Header5>
                        <SystemComponent
                            display='grid'
                            gridTemplateColumns='1fr'
                            gridRowGap={3}
                        >
                            {persistedSelectedTeams.map((team) => (
                                <SystemComponent key={team}>
                                    <ToggleListItem
                                        id={team}
                                        text={subteamDisplayNames[team]}
                                        selected={localSelectedTeams.includes(
                                            team
                                        )}
                                        onSelect={toggleSelectItem}
                                    />
                                </SystemComponent>
                            ))}
                            {persistedNonSelectedteams.map((team) => (
                                <SystemComponent key={team}>
                                    <ToggleListItem
                                        id={team}
                                        text={subteamDisplayNames[team]}
                                        selected={localSelectedTeams.includes(
                                            team
                                        )}
                                        onSelect={toggleSelectItem}
                                    />
                                </SystemComponent>
                            ))}
                        </SystemComponent>
                    </SystemComponent>
                    <SystemComponent>
                        <MultiSelectInput
                            title='What Projects are you Working on ?'
                            setSelectedItems={(list) =>
                                setSelectedProjects(list)
                            }
                            selectedItems={selectedProjects}
                            options={
                                projectOpts
                                    ? projectOpts.map((project) => ({
                                          value: project.name,
                                          label: capitalize(project.name),
                                      }))
                                    : []
                            }
                            helpMessage='Type below to create new/custom entries.'
                        />
                    </SystemComponent>
                </SystemComponent>
                {loader}
            </EditSettingsModal>
        </>
    );
};
export default EditTeamsModal;

// Give suggestions for Projects -- Fetch from backend
