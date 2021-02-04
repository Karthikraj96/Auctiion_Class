import React from "react"

let titleStyle = {"color" : "blue","fontWeight" : 100}
export function CounterDisplay(props){
    console.log(props)
    let {title,counterValue,handlePlusClick,handleMinusClick,handleResetClick}= props;
    return (
        <>
            {counterValue<15?<h4 style={titleStyle}>{title}</h4>:<h4 style={titleStyle}>Hello {title}</h4>} 
            <label> { props.counterValue} </label>
            <br/>
            <button onClick={handleMinusClick}className="btn btn-danger">-</button><br/>
                <button onClick={handlePlusClick} className="btn btn-success">+</button><br/>
                <button onClick={handleResetClick}className="btn btn-primary" >Reset</button><br/>
        </>
    )
}

