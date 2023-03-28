import React,{useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './component/List';
import './app.css'
// import Alert from './component/Alert';


let items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

const App = () => {
  const [itemName,setItemName]=useState('');
  const [list, setList]=useState(items);
  const[isEditing, setIsEditing]=useState(false);
  const[editId, setEditId]=useState('');
  // const [Alert,setAlert]=useState('');

  useEffect(()=>{
    localStorage.setItem('items',JSON.stringify(list));
  },[list]);


  const deleteItems =(id) => {
    const filteredItems = list.filter((item)=>item.id !==id);
    setList(filteredItems);
  }

  const editItem =(id) => {
    const itemToEdit = list.find((item)=> item.id===id);
    setIsEditing(true);
    setEditId(id);
    setItemName(itemToEdit.names);
  }
  const clearItems = ()=>{
    setList([]);
  }

  const submitHandler=(e)=>{
    e.preventDefault();
    if(!itemName){
      alert('enter a value')
    }
    else if(itemName && isEditing){
      setList(
        list.map((item)=>{
         if(item.id===editId){
          return{...item,names:itemName}
         }
         else{
          return item;
         }
        })
      )
      setItemName('');
      setIsEditing(false);
      setEditId('');
    }
    else{
      const newItem={id :uuidv4(),names:itemName};
      setList([...list,newItem])
      setItemName('')
    }
  };

  return (
   <div>
    <section>
      <form onSubmit={submitHandler}>
      <h1 className='heading'>CRUD APPLICATION</h1>
      <div className='card'>
        <input type='text' className='grocery' placeholder='Apple' 
        value={itemName} onChange={(e)=>setItemName(e.target.value)}/>
        <button type='submit' className='submit-btn'>Submit</button>
      </div>
      </form>
      {list.length>0 &&(
        <div>
          <List items={list} deleteItems={deleteItems} editItem={editItem}/>

          <div className='clear-button'>
          <button className='clear-btn'onClick={clearItems}>Clear Items</button>
          </div>
          
        </div>
      )}
    </section>
   </div>
  )
}

export default App;