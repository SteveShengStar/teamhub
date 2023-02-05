import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { SystemComponent } from '../../atoms/SystemComponents';
import Header4 from '../../atoms/Header4';
import Input from '../../atoms/Input';
import RadioSection from '../../molecules/Form/RadioSection';
import BooleanRadioSection from '../../molecules/Form/BooleanRadioSection';
import CheckboxSection from '../../molecules/Form/CheckboxSection';
import MenuSection from '../../molecules/Form/MenuSection';

const TitleSection = ({ text, required }) => {
    return (
        <SystemComponent>
            <Header4>
                {text}
                {required && <span style={{ color: 'red' }}> * </span>}
            </Header4>
        </SystemComponent>
    );
};

const DescriptionSection = ({ text }) => {
    // TODO: incorporate form-section descriptions later.
    return <SystemComponent>{text}</SystemComponent>;
};

const FieldSection = ({
    title,
    description = '',
    type = 'text',
    required,
    onChange,
    name,
    value,
    hasError = false,
    errorText = 'Incorrect answer provided. Please double-check your answer.',
    options = [],
}) => {
    const theme = useContext(ThemeContext);
    const renderInputField = (type) => {
        switch (type) {
            case 'text':
            case 'longtext':
            case 'phone':
            case 'email':
            case 'numbers':
                return (
                    <Input
                        height={[
                            theme.textInputHeight.small,
                            theme.textInputHeight.medium,
                            theme.textInputHeight.large,
                        ]}
                        width='98%'
                        name={name}
                        value={value}
                        onChange={(e) => onChange(name, e.target.value)}
                    />
                );
            case 'checkbox':
                return (
                    <CheckboxSection
                        options={options}
                        name={name}
                        selectedOptions={value}
                        setSelectedOptions={onChange}
                    />
                );
            case 'radio':
                return (
                    <RadioSection
                        options={options}
                        selectedOption={value}
                        name={name}
                        setSelectedOption={onChange}
                    />
                );
            case 'boolean':
                return (
                    <BooleanRadioSection
                        selectedOption={value}
                        name={name}
                        setSelectedOption={onChange}
                    />
                );
            case 'menu_single':
                return (
                    <MenuSection
                        name={name}
                        options={options.map((opt) => {
                            return {
                                value: opt,
                                label: opt,
                            };
                        })}
                        setSelectedValue={onChange}
                        selectedValue={value}
                    />
                );
            case 'menu_multi':
                return (
                    <MenuSection
                        isMulti
                        name={name}
                        options={options.map((opt) => {
                            return {
                                value: opt,
                                label: opt,
                            };
                        })}
                        setSelectedValue={onChange}
                        selectedValue={value}
                    />
                );
            default:
                return <></>;
        }
    };

    return (
        <SystemComponent
            fontSize={theme.fontSizes.header3}
            id={name} // Component needs `id` value set since in frontend/util.js#scrollToFirstError, we rely on this id to select the DOM element to scroll up to.
            textAlign='left'
            width={['98%', '100%', '100%', '100%']}
        >
            <SystemComponent textAlign='left' mb={['10px', '15px']}>
                <TitleSection text={title} required={required} />
                <DescriptionSection text={description} />
            </SystemComponent>

            <SystemComponent>{renderInputField(type)}</SystemComponent>
            {hasError && (
                <SystemComponent textAlign='left' color='red'>
                    {errorText}
                </SystemComponent>
            )}
        </SystemComponent>
    );
};
export default FieldSection;
