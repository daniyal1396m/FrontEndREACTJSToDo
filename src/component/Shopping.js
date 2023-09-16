import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faDonate, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';

export const Shopping = ({task, toggleComplete, deleteShopping , editShopping}) => {
    return (
        <div className="bg-amber-500 grid grid-cols-3 gap-4 m-2">
            <p onClick={() => toggleComplete(task.id)}
               className={`${task.completed ? 'col-span-2 ... line-through' : "col-span-2 ..."}`}>{task.title}</p>
            <div className='...'>
                <FontAwesomeIcon icon={faPenToSquare} onClick={()=>editShopping(task.id)}/>
                <FontAwesomeIcon icon={faTrash} onClick={()=>deleteShopping(task.id)}/>
            </div>
        </div>
    )
}