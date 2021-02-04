import React from "react"
import TodoItem from "./TodoItem"
import DoneItem from "./DoneItem"
import TodoCreate from "./TodoCreate"
let data3 = [
    {
        id: 1,
        desc: "Buy Milk",
        done: false
    },
    {
        id: 2,
        desc: "Be awesome",
        done: false
    },
    {
        id: 3,
        desc: "Learn react",
        done: false
    },
    {
        id: 4,
        desc: "Sleep Yesterday",
        done: true
    },
    {
        id: 5,
        desc: "Buy Phone",
        done: true
    }
]

class Todo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "todos": data3
        }
    }

    setTodoDone = (id) => {
        console.log("ID", id)
        let updatedTodos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                todo.done = !todo.done
            }

            return todo
        })
        this.setState({ "todos": updatedTodos })
    }
    deleteTodo = (id) => {
        let updatedTodos = this.state.todos.filter((todo) => {

            return todo.id !== id;
        })
        this.setState({ "todos": updatedTodos })
    }
    createTodo = (data) => {
        console.log(data);
        let len = this.state.todos.length
        console.log(len);
        len = len+1;
        let data2 = {
            id : len,
            desc : data,
            done : false
        }
        let data4 = this.state.todos.slice()
        data4.push(data2);
        this.setState({"todos":data4})
    }


    render() {
        return (
            <div className="container">

                <TodoCreate createTodo={this.createTodo} />
                <div className="row">
                    <div className="col-6">
                        <h3>Todo Items</h3>
                        {
                            this.state.todos.map((todo) => {
                                return (
                                    <>
                                        {!todo.done && <TodoItem todo={todo} setTodoDone={this.setTodoDone} deleteTodo={this.deleteTodo} />}
                                    </>
                                )
                            }
                            )

                        }
                    </div>
                    <div className="col-6">
                        <h3>Done Items</h3>
                        {
                            this.state.todos.map((todo) => {
                                return (
                                    <>
                                        {todo.done && <DoneItem todo={todo} setTodoDone={this.setTodoDone} deleteTodo={this.deleteTodo} />}
                                    </>
                                )
                            }
                            )

                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Todo


