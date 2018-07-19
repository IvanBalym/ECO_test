import React, { Component } from 'react';
import '../styles/App.css';
import data from './../routes.data';
import minCost from './../logic/minCost';
import createGraph from './../logic/createGraph';


class Case3 extends Component {
    constructor(props) {
        super(props);

        this.state={
            nodes: [],
            points: [],
            from: data[0],
            to: data[0],
            price: null
        };

        this.handleOnChangeFrom = this.handleOnChangeFrom.bind(this);
        this.handleOnChangeTo = this.handleOnChangeTo.bind(this);
    }

    componentDidMount() {
        const graph = createGraph();
        this.setState({
            nodes: graph
        });
    }

    handleOnChangeFrom (e) {
        this.setState({from:e.target.value});
        const graph = createGraph();
        const price = minCost(graph, e.target.value, this.state.to);
        this.setState({
            price
        });
    }

    handleOnChangeTo (e) {
        this.setState({to:e.target.value});
        const graph = createGraph();
        const price = minCost(graph, this.state.from ,e.target.value);
        this.setState({
            price
        });
    }

    render() {
        return (
            <div>
                <select onChange={this.handleOnChangeFrom} value={this.state.from}>
                    {
                        Object.keys(this.state.nodes).map((key, index) => (
                            <option value={key} key={index}>{key}</option>
                        ))
                    }
                </select>

                <select onChange={this.handleOnChangeTo} value={this.state.to}>
                    {
                        Object.keys(this.state.nodes).map((key, index) => (
                            <option value={key} key={index}>{key}</option>
                        ))
                    }
                </select>

                {
                    this.state.price
                        ?
                        <h3>The price for {this.state.from} -> {this.state.to} will be {this.state.price}</h3>
                        :
                        <h3>No such route</h3>
                }
            </div>
        );
    }
}

export default Case3;
