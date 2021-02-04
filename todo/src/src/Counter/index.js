import React,{Component} from "react";
import {CounterDisplay} from "./Display"

class Counter extends Component {
    constructor(props){
        super(props)
        this.state = {"counter" :10}
   this.handlePlusClick=this.handlePlusClick.bind(this)
    }
        handlePlusClick(){

            this.setState({"counter": this.state.counter+1})
        }
         handleMinusClick = () =>{
             if(this.state.counter<=0){
                 this.setState({"counter":this.state.counter-1+1})
             }else{
            this.setState({"counter": this.state.counter-1})
                 }
    }
         handleResetClick =() =>{
            this.setState({"counter":this.state.counter-this.state.counter})
        }

    
    render(){
        return (
            <div className="container">
                <CounterDisplay counterValue={this.state.counter} handlePlusClick={this.handlePlusClick} handleMinusClick={this.handleMinusClick}handleResetClick={this.handleResetClick} title="Counter" hello="hello" />
                <br/>
                
            </div>
        )
    }
}

export default Counter