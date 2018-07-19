import React, { Component } from 'react';
import './styles/App.css';
import Case1 from "./components/Case1";
import Case2 from "./components/Case2";
import Case3 from "./components/Case3";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'Case3'
        }

        this.renderPage = this.renderPage.bind(this);
        this.handlePageSwitch = this.handlePageSwitch.bind(this);
    }

    renderPage() {
        switch(this.state.page) {
            case 'Case2':
                return <Case2 />;
            case 'Case1':
                return <Case1 />;
            default:
                return <Case3 />;
        }
    }

    handlePageSwitch(e){
        this.setState({
            page: e.target.value
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <button value={'Case1'} onClick={this.handlePageSwitch}>Case1</button>
                    {/*<button value={'Case2'} onClick={this.handlePageSwitch}>Case2</button>*/}
                    <button value={'Case3'} onClick={this.handlePageSwitch}>Case3</button>

                </header>
                {this.renderPage()}
            </div>
        );
    }
}

export default App;
