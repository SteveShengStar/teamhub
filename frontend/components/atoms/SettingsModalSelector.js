import { ACTIVE_MODAL } from '../constants';
import EditProfileModal from '../organisms/EditProfileModal';
import EditTeamsModal from '../organisms/EditTeamsModal';
import EditLinksModal from '../organisms/EditLinksModal';

const SettingsModalSelector = ({ activeModal, handleCloseModal }) => {
    return (
        <>
            {activeModal === ACTIVE_MODAL.PROFILE_INFO && (
                <EditProfileModal
                    handleCloseModal={handleCloseModal}
                    visible={true}
                />
            )}
            {activeModal === ACTIVE_MODAL.TEAMS_RESPONSIBILITIES && (
                <EditTeamsModal
                    handleCloseModal={handleCloseModal}
                    visible={true}
                />
            )}
            {activeModal === ACTIVE_MODAL.EXTERNAL_LINKS && (
                <EditLinksModal
                    handleCloseModal={handleCloseModal}
                    visible={true}
                />
            )}
        </>
    );
};
export default SettingsModalSelector;
