import React from 'react';

import './CareerSelector.css'
import { Container, Tooltip, withStyles, Grid} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RuleBook from './resources/rulebook.json'
import SetSelectedItem from './SetSelectedItem'

import ObjectBoxes from './ObjectBoxes'
  
export default class HomeworldSelector extends React.Component {
    constructor(props) {
        super(props);
        this.setSelectedItem = this.setSelectedItem.bind(this);
        this.state = {
            careerIndex: this.props.careerIndex,
            careerItems: []
         }
    }

    setSelectedItem(x, y, i, title, dropdown) {
        SetSelectedItem(x, y, i, title, this.props.choiceValues, this.props.updateParentState, 'homeworld', dropdown)
        this.props.setSelectedStats()
    }

    render () {
        
        let bookSection = RuleBook.Homeworld[this.props.homeworldIndex]
        return (
            <Container maxWidth='xl'>
                <div className='careerContainer'>
                    <div>
                        <div>
                            <h2>{bookSection['Title']}</h2>
                            <p><i>"{bookSection['Quote']}"</i></p>
                            <p>{bookSection['Description']}</p>
                            <h3>{bookSection['Life']['Title']}</h3>
                            {bookSection['Life']['Description'].map((Para) => <p>{Para}</p>)}
                        </div>
                        
                        
                        <h3>{bookSection['Character Features']['Title']}</h3>
                        <p>{bookSection['Character Features']['Description']}</p>
                        <ObjectBoxes callback={this.setSelectedItem} objects={bookSection['Character Features']['Mods']} />

                        {bookSection['Character Features']['Features'].map((feature) => (
                            <div>
                                <h4>{feature.Title}</h4>
                                <p>{feature.Description}</p>
                                {feature.Features !== undefined && <ObjectBoxes choiceValues={this.props.choiceValues} arrayTitle={'homeworld' + feature.Title} callback={this.setSelectedItem} objects={feature.Features} />}
                            </div>

                        ))}
                    </div>                        
                </div>
            </Container>
        )
    }
}