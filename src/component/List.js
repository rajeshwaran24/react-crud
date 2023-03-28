import React from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa';
const List =({items,deleteItems,editItem})=>{
    return(
        <div className='grocery-list'>
            {items.map((item)=>{
                const{id,names}=item;
                return(
                    <article  key={id}>
                        <div className='edit-delete'>
                        <p className='title'>{names}</p>
                        <div className='button'>
                        <button type='button' className='edit-btn' onClick={()=>editItem(id)}><FaEdit/></button>
                        <button type='button' className='trash-btn' onClick={()=>deleteItems(id)}><FaTrash/></button>
                        </div>
                        
                        </div>
                        
                    </article>
                )
            })}
        </div>
    )
}



export default List