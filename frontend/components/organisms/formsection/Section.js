import React from 'react';
import Selectable from './Selectable';
import TextSection from './TextSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Section = ({
    type,
    name,
    question,
    helpText,
    options,
    required,
    canDelete,
    handleTypeChange,
    handleInputChange,
    handleOptionChange,
    handleOptionAdd,
    handleOptionDelete,
    handleSectionDelete,
    handleSectionDuplicate,
    handleToggleRequired,
}) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transition,
        transform,
        isDragging,
    } = useSortable({ id: name });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        border: '2px solid black',
        marginBottom: 5,
        marginTop: 5,
        opacity: isDragging ? 0.5 : 1,
    };

    switch (type) {
        case 'text':
        case 'email':
        case 'longtext':
        case 'numbers':
        case 'phone':
            return (
                <div
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    style={style}
                >
                    <TextSection
                        sectionName={name}
                        type={type}
                        question={question}
                        helpText={helpText}
                        required={required}
                        handleTypeChange={handleTypeChange}
                        handleInputChange={handleInputChange}
                        handleSectionDelete={handleSectionDelete}
                        handleSectionDuplicate={handleSectionDuplicate}
                        handleToggleRequired={handleToggleRequired}
                        canDelete={canDelete}
                    />
                </div>
            );
        case 'checkbox':
        case 'radio':
        case 'boolean':
        case 'menu_single':
        case 'menu_multi':
            return (
                <div
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    style={style}
                >
                    <Selectable
                        sectionName={name}
                        type={type}
                        question={question}
                        helpText={helpText}
                        options={options}
                        required={required}
                        handleTypeChange={handleTypeChange}
                        handleInputChange={handleInputChange}
                        handleOptionChange={handleOptionChange}
                        handleOptionAdd={handleOptionAdd}
                        handleOptionDelete={handleOptionDelete}
                        handleSectionDelete={handleSectionDelete}
                        handleSectionDuplicate={handleSectionDuplicate}
                        handleToggleRequired={handleToggleRequired}
                        canDelete={canDelete}
                    />
                </div>
            );
        default:
            return <></>;
    }
};
export default Section;
