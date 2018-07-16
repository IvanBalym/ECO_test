import React, { Component } from 'react';
import './App.css';
import data from './routes.data';
import Main from './main';

class Case3 extends Component {
    constructor(props) {
        super(props);

        this.state={
            nodes: [],
            points: [],
            from: data[0].from,
            to: data[0].from,
            way: [],
            visited: [],
            price: null
        };

        this.treeBuilder = this.treeBuilder.bind(this);
        this.handleOnChangeFrom = this.handleOnChangeFrom.bind(this);
        this.handleOnChangeTo = this.handleOnChangeTo.bind(this);
        this.countPrice = this.countPrice.bind(this);
    }

    componentDidMount() {
        this.treeBuilder();
        //Main;
    }

    treeBuilder () {
        let nodes = [];
        data.forEach((item) => {
            if ("undefined" === typeof(nodes[item.from])){
                nodes[item.from] = {};
            }
            nodes[item.from][item.to]={price: item.price, visited: false, way: 0};
        });
        this.setState({nodes});
    };

    handleOnChangeFrom (e) {
        this.setState({from:e.target.value});
        this.countPath(e.target.value, this.state.to);
    }

    handleOnChangeTo (e) {
        this.setState({to:e.target.value});
        this.countPath(this.state.from, e.target.value);
    }

    countPrice () {
        const { points } =  this.state;
        let result = 0;

        for(let i=0; points.length-1 > i; i++) {
            let from = points[i].name,
                to = points[i+1].name;
            result += parseInt(this.state.nodes[from][to]);
        }
        this.setState({
            price: result
        });
    }

    count(node) {
        const {visited, way, nodes} = this.state;
        console.log(visited.node);
        if (visited[node]) {
            return way[node]
        };

        let sum = 0;
        // Object.keys(nodes[node]).map(key => {
        //     sum+= this.count(key);
        // });
        way[node] = sum;
        visited[node] = true;
        console.log(way,visited);
        return sum;
    }

    countPath(start, end) {
        const {way, visited} = this.state;
        this.setState({way: [],visited: []});
        way[start] = 1;
        visited[start] = true;
        return this.count(end);
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
                        <h3>The price for {this.state.points.map(item=>item.name)} will be {this.state.price}</h3>
                        :
                        <h3>No such route</h3>
                }
            </div>
        );
    }
}

export default Case3;
