import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageTemplate from '../../../frontend/components/templates/PageTemplate';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { SystemComponent } from '../../../frontend/components/atoms/SystemComponents';
import useLoadingScreen from '../../../frontend/hooks/useLoadingScreen';
import { useForms } from '../../../frontend/hooks/forms';
import Card from '../../../frontend/components/atoms/Card';
import Button from '../../../frontend/components/atoms/Button';
import usePopupBanner from '../../../frontend/hooks/usePopupBanner';
import { v4 as uuidv4 } from 'uuid';

const EditFormButton = styled(Button)`
    width: 100%;
    height: 48px;
    margin-bottom: ${(props) => props.theme.space.headerBottomMargin}px;
    margin-top: 16px;
    border-radius: 5px;
`;

const ExportRespButton = styled(Button)`
    width: 100%;
    height: 48px;
    border-radius: 5px;
`;

const CreateFormButton = styled(Button)`
    width: 20%;
    height: 48px;
    margin-bottom: ${(props) => props.theme.space.headerBottomMargin}px;
    margin-top: 16px;
    border-radius: 5px;
`;

const CheckmarkRow = styled.div`
    display: flex;
    align-items: flex-start;
`;

const Text = styled.div`
    font-family: 'SF Pro';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    color: #000000;
`;

const BigIconWrapper = styled.div`
    height: 57px;
    width: 57px;
    display: flex;
    align-item: center;
    border-radius: 50%;
    border: 2px solid;
    padding: 2px;
    justify-content: center;
    box-sizing: border-box;
`;
const Svg = styled.img`
    justify-content: center;
    height: 30px;
    width: 30px;
    margin-top: 10px;
`;

const TitleText = styled.div`
    font-family: 'SF Pro';
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSizes.header2}px;
    line-height: 29px;

    text-align: center;
    letter-spacing: -0.01em;
    margin-top: 17px;
    margin-bottom: 40px;

    color: #000000;
`;

const FormInfoCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
    width: 100%;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;

    padding: 90px 30px 30px 30px;
    ${(props) => props.theme.mediaQueries.mobile} {
        padding: 90px 20px 20px 20px;
    }
    @media screen and (min-width: 1400px) {
        padding: 90px 30px 30px 30px;
    }
`;

const Bullet = ({ text, className }) => {
    return (
        <CheckmarkRow className={className}>
            <i
                className='fa fa-solid fa-square-check fa-2x'
                style={{ marginRight: '15px' }}
            />
            <Text>{text}</Text>
        </CheckmarkRow>
    );
};

const BulletOverride = styled(Bullet)`
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
`;

const BulletsSection = styled(SystemComponent)`
    align-self: start; /* this section's text should be left-aligned */
    height: 200px;
`;

const EXPORT_SUCCESS_MSG = 'Form Responses Exported to Google Drive.';
const EXPORT_ERROR_MSG =
    'Error occurred. Please contact Waterloop Web Team for assistance.';

const FormMetadataSection = ({ src, title, bulletPoints, formName = '' }) => {
    const router = useRouter();
    const {
        renderSuccessBanner,
        renderErrorBanner,
        showSuccessBanner,
        showErrorBanner,
    } = usePopupBanner(EXPORT_SUCCESS_MSG, EXPORT_ERROR_MSG);

    return (
        <>
            {renderSuccessBanner()}
            {renderErrorBanner()}
            <FormInfoCard>
                <SystemComponent>
                    <BigIconWrapper>
                        <Svg src={src}></Svg>
                    </BigIconWrapper>
                </SystemComponent>
                <SystemComponent>
                    <TitleText>{title}</TitleText>
                </SystemComponent>
                <BulletsSection>
                    {bulletPoints?.map((bullet, i) => (
                        <BulletOverride margin='10px' key={i} text={bullet} />
                    ))}
                </BulletsSection>
                <EditFormButton
                    onClick={(e) => {
                        e.preventDefault();
                        router.push('/form/edit/' + formName);
                    }}
                >
                    Edit Form
                </EditFormButton>
                <ExportRespButton
                    onClick={(e) => {
                        e.preventDefault();
                        fetch('/api/google/export/' + formName, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        })
                            .then((res) => {
                                showSuccessBanner();
                            })
                            .catch((e) => {
                                console.error(e);
                                showErrorBanner();
                            });
                    }}
                    variant='white'
                >
                    Export Responses
                </ExportRespButton>
            </FormInfoCard>
        </>
    );
};

const DashboardPanel = () => {
    const [formData, setFormData] = useState([]);
    const [loader, showLoader, hideLoader] = useLoadingScreen(false);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        showLoader();
        useForms(dispatch, router)
            .then((res) => {
                setFormData(res.body ? res.body : []);
            })
            .finally(() => {
                hideLoader();
            });
    }, []);

    return (
        <PageTemplate title='Waterloop Forms'>
            <React.Fragment>
        
                <CreateFormButton
                    onClick={(e) => {
                        e.preventDefault();
                        router.push('/form/edit/' + uuidv4());
                    }}
                >
                    Create New Form
                </CreateFormButton>
                <SystemComponent
                    display='grid'
                    gridTemplateColumns={[
                        '1fr',
                        'repeat(2, 1fr);',
                        'repeat(2, 1fr);',
                        'repeat(3, 1fr);',
                    ]}
                    gridAutoRows={'minmax(500px, 500px)'}
                    gridColumnGap={5}
                    gridRowGap={6}
                >
                    {loader}
                    {formData?.map((data) => (
                        <FormMetadataSection
                            src={data.imageSrc}
                            title={data.title}
                            bulletPoints={data.bulletPoints}
                            formName={data.name}
                        />
                    ))}
                </SystemComponent>
            </React.Fragment>
        </PageTemplate>
    );
};

export default DashboardPanel;
