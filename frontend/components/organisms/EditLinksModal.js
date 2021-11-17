import {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {SystemComponent} from '../atoms/SystemComponents';
import { updateProfileInfo } from "../../store/reducers/userReducer";

import Input from '../atoms/Input';
import Header5 from '../atoms/Header5';
import EditSettingsModal from '../molecules/EditSettingsModal';
import theme from '../theme';
import {isURL} from 'validator';

const CustomInput = styled(Input)`
    box-sizing: border-box;
    height: 34px;
    width: 100%;
`;

const URLField = ({label, name, placeholder, value, onHandleChange, error, errorText}) => {
    return (
        <>
            <Header5>{label}</Header5>
            <CustomInput 
                name={name}
                placeholder={placeholder}
                variant="text"
                value={value}
                onChange={(evt) => onHandleChange(name, evt.target.value)} 
            />
            {error && <SystemComponent color={theme.colors.alertAction}>{errorText}</SystemComponent>}
        </>
    )
}

const EditLinksModal = ({dataLoaded, visible, handleCloseModal}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { token, user } = useSelector(state => state.userState);

    const facebookUrl = dataLoaded && user.links && user.links.find(l => l.type === "facebook")
                            ? user.links.find(l => l.type === "facebook").link : '';
    const linkedInUrl = dataLoaded && user.links && user.links.find(l => l.type === "linkedin")
                            ? user.links.find(l => l.type === "linkedin").link : '';
    const githubUrl = dataLoaded && user.links && user.links.find(l => l.type === "github")
                            ? user.links.find(l => l.type === "github").link : '';
    const websiteUrl = dataLoaded && user.links && user.links.find(l => l.type === "website")
                            ? user.links.find(l => l.type === "website").link : '';
    const [formValues, setFormValues] = useState({
        facebookUrl,
        linkedInUrl,
        githubUrl,
        websiteUrl
    });
    const [hasError, setErrors] = useState({
        facebookUrl: false,
        linkedInUrl: false,
        githubUrl: false,
        websiteUrl: false
    });

    useEffect(() => {
        if (visible) {
            setFormValues({
                facebookUrl,
                linkedInUrl,
                githubUrl,
                websiteUrl
            });

            setErrors({
                facebookUrl: false,
                linkedInUrl: false,
                githubUrl: false,
                websiteUrl: false
            });
        }
    }, [dataLoaded, visible])

    const validateUrl = (errorList, fieldName, fieldValue, allowedHosts = false) => {
        if(!fieldValue) return;

        if (!isURL(fieldValue, {require_host: true, 
                                allow_underscores: true,
                                host_whitelist: allowedHosts})) {
            errorList[fieldName] = true;
        } else {
            errorList[fieldName] = false;
        }
    }

    const handleSave = (evt) => {
        evt.preventDefault();

        const errors = {...hasError};

        let facebookUrl = formValues['facebookUrl'].trim();
        let githubUrl = formValues['githubUrl'].trim();
        let linkedInUrl = formValues['linkedInUrl'].trim();
        let websiteUrl = formValues['websiteUrl'].trim();

        validateUrl(errors, 'facebookUrl', facebookUrl, ['www.facebook.com', 'facebook.com']);
        validateUrl(errors, 'githubUrl', githubUrl, ['www.github.com', 'github.com']);
        validateUrl(errors, 'linkedInUrl', linkedInUrl, ['www.linkedin.com', 'linkedin.com']);
        validateUrl(errors, 'websiteUrl', websiteUrl);

        setErrors(errors);

        let dataIsValid = !Object.values(errors).includes(true);

        if (dataIsValid) {
            facebookUrl = (!facebookUrl || facebookUrl.slice(0, 4) === "http") ? facebookUrl : "https://".concat(facebookUrl);
            githubUrl = (!githubUrl || githubUrl.slice(0, 4) === "http") ? githubUrl : "https://".concat(githubUrl);
            linkedInUrl = (!linkedInUrl || linkedInUrl.slice(0, 4) === "http") ? linkedInUrl : "https://".concat(linkedInUrl);
            websiteUrl = (!websiteUrl || websiteUrl.slice(0, 4) === "http") ? websiteUrl : "https://".concat(websiteUrl);

            // TODO: set "isShowingGhostLoader" boolean variable to true

            setTimeout(function(){ 
                updateProfileInfo(dispatch, {
                    "links": [
                        {"type": "facebook", "link": facebookUrl},
                        {"type": "github", "link": githubUrl},
                        {"type": "website", "link": websiteUrl},
                        {"type": "linkedin", "link": linkedInUrl}
                    ]
                }, token, user._id, router)
                .then(res => {
                    if (res.success) {
                        dispatch({ type: UserTypes.UPDATE_INFO, payload: res.body[0] });
                    }
                    // TODO: set "isShowingGhostLoader" boolean variable to false
                    handleCloseModal();
                }).catch(() => {
                    // TODO: set "isShowingGhostLoader" boolean variable to false
                    alert("An error occured when updating your profile information.");
                });
            }, 4000);
        }
    }

    const handleChange = (name, value) => {
        setErrors({
            ...hasError,
            [name]: false
        });
        
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    return (
        <>
            {isShowingGhostLoader === true && <GhostLoadingScreenReactComponent/>}
            <EditSettingsModal 
                visible={visible} 
                title="Edit External Accounts" 
                handleCloseModal={handleCloseModal}
                handleSave={handleSave}
            >
                <SystemComponent display="grid" 
                    gridTemplateColumns={["100%", "repeat(2, 1fr)"]}
                    gridColumnGap={[20, 30, 40]}
                    gridAutoRows='minmax(70px, auto)'
                >
                    <SystemComponent>
                        <URLField
                            label="Personal Website"
                            name="websiteUrl"
                            placeholder="Enter Website Link ..." 
                            value={formValues["websiteUrl"]}
                            error={hasError['websiteUrl']}
                            errorText={"Please Enter Valid Url."}
                            onHandleChange={handleChange}
                        />
                    </SystemComponent>
                    <SystemComponent>
                        <URLField
                            label="Github"
                            name="githubUrl"
                            placeholder="Enter Github Link ..." 
                            value={formValues["githubUrl"]}
                            error={hasError['githubUrl']}
                            errorText={"Please Enter Valid Github Profile Url."}
                            onHandleChange={handleChange}
                        />
                    </SystemComponent>
                    <SystemComponent>
                        <URLField
                            label="LinkedIn"
                            name="linkedInUrl"
                            placeholder="Enter LinkedIn Link ..."
                            value={formValues["linkedInUrl"]}
                            error={hasError['linkedInUrl']} 
                            errorText={"Please Enter Valid LinkedIn Profile Url."}
                            onHandleChange={handleChange}
                        />
                    </SystemComponent>
                    <SystemComponent>   
                        <URLField
                            label="Facebook"
                            name="facebookUrl"
                            placeholder="Enter Facebook Link ..." 
                            value={formValues["facebookUrl"]}
                            error={hasError.facebookUrl}
                            errorText={"Please Enter Valid Facebook Profile Url."}
                            onHandleChange={handleChange}
                        />
                    </SystemComponent>
                </SystemComponent>
            </EditSettingsModal>
        </>
    )
}
export default EditLinksModal;
