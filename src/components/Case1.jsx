import React, { Component } from 'react';
import '../styles/App.css';
import data from './../routes.data';
import HandleAddStop from './RoutePoints';
import createGraph from './../logic/createGraph';

class Case1 extends Component {
    constructor(props) {
        super(props);

        this.state={
            nodes: [],
            points: [{name: data[0]}],
            price: null
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleAddStop = this.handleAddStop.bind(this);
        this.countPrice = this.countPrice.bind(this);
    }

    componentDidMount() {
        const graph = createGraph();
        this.setState({
            nodes: graph
        });
    }

    handleOnChange (e) {
        let points = this.state.points;
        points[e.target.id] = {name:e.target.value};
        this.countPrice();
    }

    handleAddStop () {
        let newPoint = this.state.points;
        newPoint.push({name: Object.keys(this.state.nodes)[0]});
        this.setState({points: newPoint});
        this.countPrice();
    }

    countPrice () {
        const { points } =  this.state;
        let result = 0;

        for(let i=0; points.length-1 > i; i++) {
            let from = points[i].name,
                to = points[i+1].name;
            result += parseInt(this.state.nodes[from].paths[to]);
        }
        this.setState({
            price: result
        });
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.points.map((item, index)=>(
                            <HandleAddStop
                                key={index}
                                handleOnChange={this.handleOnChange}
                                nodes={this.state.nodes}
                                point={index}
                                value={item.name}
                            />
                        ))
                    }
                </div>

                <button onClick={this.handleAddStop}>Add stop</button>
                {
                    this.state.price
                        ?
                        <h3>The price for {
                            this.state.points.map((item,index)=><span key={index}>{item.name} </span>)
                        } will be {this.state.price}</h3>
                        :
                        <h3>No such route</h3>
                }
            </div>
        );
    }
}

export default Case1;
