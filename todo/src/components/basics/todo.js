import React, { useEffect, useState } from 'react'
import './style.css'

const Todo = () => {
     
    const getLocaldata = () => { 
        const lists = localStorage.getItem("todolist")

        if(lists){
            return JSON.parse(lists);
        }else{
            return [];
        }
    }

    const [inputData,setinputData] = useState("")
    const [items, setItems] = useState(getLocaldata())
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);


    const addItem = () => {
        if(!inputData){
            alert(" ENTER DATA!! ")
        }

        else if (inputData && toggleButton) {
      setItems(
        items.map((curEle) => {
          if (curEle.id === isEditItem) {
            return { ...curEle, name: inputData };
          }
          return curEle;
        })
      );
      setinputData("");
      setIsEditItem(null);
      setToggleButton(false);

    } 
        else{
            const NewToDo = { 
                id: new Date().getTime().toString(),
                name: inputData
            }
                
            setItems([...items, NewToDo ])
            setinputData("")
        }
    }



    const deleteItem = (index)=>{
            const updateItems = items.filter((curEle)=>{
                return curEle.id !== index;
            })
            setItems(updateItems);
    }
   
    const deleteAll = () =>{
        setItems([]);
    }

    const editItem =(index)=>{
         const todo_edited  = items.find((curEle)=>{
            return curEle.id === index;
         });
         setinputData(todo_edited.name)
         setIsEditItem(index)
         setToggleButton(true)

    }
    
    useEffect(() => {
        localStorage.setItem("todolist",JSON.stringify(items))
    }, [items])
    
    
  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
        <figure>
            <img src='./images/todo.svg' alt=''/>
            <figcaption>Add your todo here</figcaption>
            <div className='add-item'>
                <input type='text'
                placeholder= "add item"
                className= 'form-control'
                value = {inputData}
                onChange = {(event)=>{setinputData(event.target.value)}}
                 />
                 {toggleButton ? (
              <i className="fa fa-edit add-btn " onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
            </div>
        </figure>
           
         <div className='showItems'>
           
             {
                items.map( (curEle)=>{
                    return(
                        <div className='eachItem' key={curEle.id}>
                            <h3>{curEle.name}</h3>
                            <div className='todo-btn'>
                            <i className="far fa-edit add-btn" onClick={()=> {editItem(curEle.id)}}></i>
                            <i className="far fa-trash-alt add-btn" onClick={()=>{ deleteItem(curEle.id)}}></i>
                         </div>
                        </div>
                    )})}
         </div>
         <div className='showItems'>
              <button className='btn effect04' data-sm-link-text="Remove all" onClick={deleteAll}><span>CHECK LIST</span></button>
         </div>

        </div>
      </div>
    </>
  )
}

export default Todo
