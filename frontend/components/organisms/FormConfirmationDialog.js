import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DialogBaseModal from '../molecules/DialogBaseModal';

import useLoadingScreen from '../../hooks/useLoadingScreen';

const FormConfirmationDialog = ({
    visible,
    handleContinueEditing,
    handleReturnToMain,
    success,
}) => {
    const { user } = useSelector((state) => state.userState);
    const { filters } = useSelector((state) => state.membersState);
    const [loader, showLoader, hideLoader] = useLoadingScreen(false);

    const persistedSelectedTeams = user.subteams
        ? user.subteams.map((s) => s.name)
        : [];

    return (
        <>
            <DialogBaseModal
                visible={visible}
                success={success}
                handleCloseModal={handleContinueEditing}
                handleSave={handleReturnToMain}
            >
                {loader}
            </DialogBaseModal>
        </>
    );
};
export default FormConfirmationDialog;

// Give suggestions for Projects -- Fetch from backend
