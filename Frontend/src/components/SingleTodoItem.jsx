import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragOverlay, useDraggable } from '@dnd-kit/core';
import { isVisible } from '@testing-library/user-event/dist/utils';

export const SingleTodoItem = ({ item, handleComplete, handleDelete}) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: item._id })


    const style = {
      '--translate-x': transform ? transform.x : 0,
    '--translate-y': transform ? transform.y : 0,
    '--transition': transition,
    };

    return (
      <div className='todos' key={item._id} ref={setNodeRef} style={style}  > 
        <input type='radio' checked={false} className='check-box' onChange={handleComplete} />
        <div className='info' key={item._id} id={item._id} {...attributes} {...listeners}>
          <span className='info-main' >Task- {item.text}</span>
          <span className='info-date'>Date Added- {item.date}</span>
        </div>
        <button onClick={handleDelete} >Del</button>
       </div>
    )
}
