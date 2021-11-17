import {ACTIVE_MODAL} from '../constants';
import EditProfileModal from '../organisms/EditProfileModal';
import EditTeamsModal from '../organisms/EditTeamsModal';
import EditLinksModal from '../organisms/EditLinksModal';

const SettingsModalSelector = ({userDataLoaded, activeModal, handleCloseModal}) => {
    return (
        <>
            <EditProfileModal dataLoaded={userDataLoaded} handleCloseModal={handleCloseModal} visible={activeModal === ACTIVE_MODAL.PROFILE_INFO} />
            <EditTeamsModal dataLoaded={userDataLoaded} handleCloseModal={handleCloseModal} visible={activeModal === ACTIVE_MODAL.TEAMS_RESPONSIBILITIES}/>
            <EditLinksModal dataLoaded={userDataLoaded} handleCloseModal={handleCloseModal} visible={activeModal === ACTIVE_MODAL.EXTERNAL_LINKS}/>
        </>
    )
}
export default SettingsModalSelector;
