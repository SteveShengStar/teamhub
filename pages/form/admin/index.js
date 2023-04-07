import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
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

const CreateFormButton = styled(Button)`
    width: 200px;
    height: 35px;
    margin-bottom: ${(props) => props.theme.space.headerBottomMargin}px;
    margin-top: 16px;
    border-radius: 5px;
`;

const DeleteFormButton = styled.div`
    margin-left: auto;
    cursor: pointer;
`;

const DeleteIcon = styled.img`
    justify-content: center;
    height: 27px;
    width: 27px;
`;

const IconWrapper = styled.div`
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

const Icon = styled.img`
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

    padding: 30px 30px 30px 30px;
    ${(props) => props.theme.mediaQueries.mobile} {
        padding: 20px 20px 20px 20px;
    }
    @media screen and (min-width: 1400px) {
        padding: 30px 30px 30px 30px;
    }
`;

const EXPORT_SUCCESS_MSG = 'Form was successfully exported.';
const EXPORT_ERROR_MSG =
    'Form could not be exported. Please contact Waterloop Web Team for assistance.';

const FormMetadataSection = ({
    src,
    title,
    description,
    formName = '',
    onDelete,
}) => {
    const router = useRouter();
    const theme = useContext(ThemeContext);
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
                <DeleteFormButton
                    onClick={(e) => {
                        e.preventDefault();
                        fetch('/api/form/' + formName + '/delete', {
                            method: 'DELETE',
                        })
                            .then((res) => {
                                onDelete(formName);
                            })
                            .catch((e) => {
                                console.error(e);
                            });
                    }}
                >
                    <DeleteIcon src='/static/trash-solid.svg' />
                </DeleteFormButton>
                <SystemComponent marginTop='60px'>
                    <IconWrapper>
                        <Icon src={src}></Icon>
                    </IconWrapper>
                </SystemComponent>
                <SystemComponent height='80px'>
                    <TitleText>{title}</TitleText>
                </SystemComponent>
                <SystemComponent
                    height='140px'
                    fontSize={theme.fontSizes.body2}
                    alignSelf='start' /* this section's text should be left-aligned */
                    textAlign='justify'
                >
                    {description}
                </SystemComponent>
                <SystemComponent
                    width='100%'
                    height='35px'
                    marginBottom='5px'
                    boxSizing='border-box'
                >
                    <Button
                        height='100%'
                        width='100%'
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/form/edit/' + formName);
                        }}
                    >
                        <i className='fa-solid fa-pen-to-square' />
                        {'  '}Edit Form
                    </Button>
                </SystemComponent>
                <SystemComponent display='flex' height='35px' width='100%'>
                    <SystemComponent width='60%'>
                        <Button
                            height='100%'
                            width='100%'
                            variant='white'
                            onClick={(e) => {
                                e.preventDefault();
                                fetch('/api/google/export/' + formName, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                })
                                    .then(() => {
                                        showSuccessBanner();
                                    })
                                    .catch((e) => {
                                        console.error(e);
                                        showErrorBanner();
                                    });
                            }}
                        >
                            <i className='fa-solid fa-file-export' />
                            {'  '}Export Responses
                        </Button>
                    </SystemComponent>
                    <SystemComponent width='40%'>
                        <Button
                            height='100%'
                            width='100%'
                            variant='white'
                            onClick={(e) => {
                                e.preventDefault();
                                navigator.clipboard.writeText(
                                    'localhost:3000/form/' + formName
                                );
                            }}
                        >
                            <i className='fa-solid fa-link' />
                            {'  '}Copy Link
                        </Button>
                    </SystemComponent>
                </SystemComponent>
            </FormInfoCard>
        </>
    );
};

const DashboardPanel = () => {
    const [formData, setFormData] = useState([]);
    const [loader, showLoader, hideLoader] = useLoadingScreen(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDelete = (formName) => {
        setFormData(formData.filter((form) => form.name !== formName));
    };

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
            <SystemComponent>
                {loader}
                <SystemComponent>
                    <CreateFormButton
                        onClick={(e) => {
                            e.preventDefault();
                            router.push('/form/edit/' + uuidv4());
                        }}
                    >
                        <i class='fa fa-plus' aria-hidden='true' /> Create New
                        Form
                    </CreateFormButton>
                </SystemComponent>
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
                    {formData?.map((data) => (
                        <FormMetadataSection
                            src={data.imageSrc}
                            title={data.title}
                            description={data.description}
                            formName={data.name}
                            onDelete={handleDelete}
                        />
                    ))}
                </SystemComponent>
            </SystemComponent>
        </PageTemplate>
    );
};

export default DashboardPanel;
