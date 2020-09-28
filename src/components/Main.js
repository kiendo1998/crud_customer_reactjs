import React, { Component } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Content from '../components/Content';
import Footer from '../components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

class Main extends Component {

    render() {

        return (
            <Router>
                <div>
                    <Header />
                    <Menu />
                    <Content />
                    <Footer />
                </div>
            </Router>
        );
    }
}



export default Main;