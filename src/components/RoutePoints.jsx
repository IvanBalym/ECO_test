import React, {Component} from "react";

class HandleAddStop extends Component {
    render (){
        return (
            <select className='select' onChange={this.props.handleOnChange} id={this.props.point} value={this.props.value}>
                {
                    Object.keys(this.props.nodes).map((key, index) => (
                        <option value={key} key={index}>{key}</option>
                    ))
                }
            </select>
        )
    }
}

export default HandleAddStop;