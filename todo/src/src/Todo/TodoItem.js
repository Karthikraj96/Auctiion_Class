import React from "react"


function TodoItem (props){

    let todo = props.todo // Destructureing Tobe Done
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-text">{todo.desc}</h4>
                <button onClick={ (event)=>{ props.setTodoDone(todo.id) }  } className="btn btn-success">Done</button>
                <button onClick={ (event)=>{ props.deleteTodo(todo.id) }  } className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default TodoItem 