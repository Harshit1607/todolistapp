import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SingleCompletedItem = ({item, handleDelete}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return(
    <div className='todos' draggable key={item._id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='info'>
        <span className='info-main'>Task- {item.text}</span>
        <span className='info-date'>Date Completed- {item.date}</span>
      </div>
      <button onClick={handleDelete}>Del</button>
    </div>
  )
}
