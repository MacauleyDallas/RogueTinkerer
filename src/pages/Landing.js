import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class Landing extends React.Component {
    render () {
        return (
            <div><h1>Welcome to -insert name-</h1>
                <p>An interactive rogue trader character sheet tool.</p>
                <Link to="/astroassistant">Access the Astro-Assistant</Link>

                
            </div>
        )
    }
}