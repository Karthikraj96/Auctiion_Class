import React from 'react'

class TodoCreate extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title : ""
        }
    
    }
    titleChange= (event) =>{
        console.log(event.target.value)
        this.setState({title : event.target.value})
    }
    handleOnSubmit = (event) =>{
        let data =this.state.title
        event.preventDefault()
        this.props.createTodo(data)
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12" style ={{ background:"#f3f3f3"}}>
                    <h5>Add New Todo</h5>
                    <form onSubmit={this.handleOnSubmit} className="form">
                        <label >Title</label>
                        <input onChange={this.titleChange} className="form-control"/>
                        <input  className="btn btn-primary" type="submit"/>
                    </form>
                </div>

            </div>
        )
    }
}

export default TodoCreate