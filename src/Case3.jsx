import React, { Component } from 'react';
import './App.css';
import data from './routes.data';
import Main from './main';

class Case3 extends Component {
    constructor(props) {
        super(props);

        this.state={
            nodes: [],
            points: [{name: 'A'},{name: 'B'}],
            price: null
        };

        this.treeBuilder = this.treeBuilder.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.countPrice = this.countPrice.bind(this);
    }

    componentDidMount() {
        this.treeBuilder();
        Main;
    }

    treeBuilder () {
        let nodes = [];
        data.forEach((item) => {
            if ("undefined" === typeof(nodes[item.from])){
                nodes[item.from] = {};
            }
            nodes[item.from][item.to]=item.price;
        });
        this.setState({nodes});
    };

    handleOnChange (e) {
        let points = this.state.points;
        points[e.target.id] = {name:e.target.value};
        this.countPrice();
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

    render() {
        return (
            <div>
                {/*<select onChange={this.handleOnChange}>*/}
                    {/*{*/}
                        {/*Object.keys(this.props.nodes).map((key, index) => (*/}
                            {/*<option value={key} key={index}>{key}</option>*/}
                        {/*))*/}
                    {/*}*/}
                {/*</select>*/}

                {/*<select onChange={this.handleOnChange}>*/}
                    {/*{*/}
                        {/*Object.keys(this.props.nodes).map((key, index) => (*/}
                            {/*<option value={key} key={index}>{key}</option>*/}
                        {/*))*/}
                    {/*}*/}
                {/*</select>*/}

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
