import React from 'react';
import {Paper, Tabs, Tab} from '@material-ui/core';
import {withRouter} from "react-router-dom";

class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    render() {

        const paths = [
            "/",
            "/upload",
        ]

        const handleChange = (event, newValue) => {
            this.setState({value: newValue});
            this.props.history.push(paths[newValue])
        };

        return (
            <Paper square>
                <Tabs
                    value={this.state.value}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="tabs"
                    centered
                    onChange={handleChange}
                >
                    <Tab label="Get Random Image" topath="/"/>
                    <Tab label="Upload Image" topath="/upload"/>
                </Tabs>
            </Paper>
        );
    }
}

export default withRouter(Navbar);
