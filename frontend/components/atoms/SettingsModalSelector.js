import {ACTIVE_MODAL} from '../constants';
import EditProfileModal from '../organisms/EditProfileModal';
import EditTeamsModal from '../organisms/EditTeamsModal';
import EditLinksModal from '../organisms/EditLinksModal';

// TODO: do not reveal the stuff yet
const SettingsModalSelector = ({isLoaded, activeModal, handleCloseModal}) => {
    return (
        <>
            <EditProfileModal dataLoaded={isLoaded} handleCloseModal={handleCloseModal} visible={activeModal === ACTIVE_MODAL.PROFILE_INFO} />
            <EditTeamsModal dataLoaded={isLoaded} handleCloseModal={handleCloseModal} visible={activeModal === ACTIVE_MODAL.TEAMS_RESPONSIBILITIES}/>
            <EditLinksModal dataLoaded={isLoaded} handleCloseModal={handleCloseModal} visible={activeModal === ACTIVE_MODAL.EXTERNAL_LINKS}/>
        </>
    )
}
export default SettingsModalSelector;
