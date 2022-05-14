import { closestCenter, DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const UserComponent = ({
    id,
    name,
    height,
}) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transition,
        transform,
        isDragging,
    } = useSortable({ id: id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        border: '2px solid black',
        marginBottom: 5,
        marginTop: 5,
        opacity: isDragging ? 0.5 : 1,
        height: height
    }

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            {name}
        </div>
    )
}

function POC() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Manoj",
      height: '100px'
    },
    {
      id: "2",
      name: "John",
      height: '200px'
    },
    {
      id: "3",
      name: "Ronaldo",
      height: '300px'
    }
  ])

  const sensors = [useSensor(PointerSensor)];

  const handleDragEnd = ({active, over}) => {
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div
      style={{
        margin: 'auto',
        width: 200,
        textAlign: 'center'
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
            <UserComponent {...items[0]} key={items[0].id} />
            <UserComponent {...items[1]} key={items[1].id} />
            <UserComponent {...items[2]} key={items[2].id} />
        </SortableContext>
      </DndContext>
    </div>
  );
}
export default POC;