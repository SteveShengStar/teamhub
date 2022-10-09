import React from 'react';
import styled from 'styled-components';
import Selectable from './Selectable';
import TextSection from './TextSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SystemComponent } from '../../atoms/SystemComponents';

const DragSection = styled(SystemComponent)`
    display: flex;
    justify-content: center;
`;

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
    };

    switch (type) {
        case 'text':
        case 'email':
        case 'longtext':
        case 'numbers':
        case 'phone':
            return (
                <div ref={setNodeRef} style={style}>
                    <DragSection {...attributes} {...listeners}>
                        <i className='fa-solid fa-grip' style={{ cursor: 'move' }}/>
                    </DragSection>
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
                <div ref={setNodeRef} style={style}>
                    <DragSection {...attributes} {...listeners}>
                        <i className='fa-solid fa-grip' style={{ cursor: 'move' }}/>
                    </DragSection>
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
