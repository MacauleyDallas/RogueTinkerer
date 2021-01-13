import React from 'react';

import './CareerSelector.css'
import { Container, Tooltip, withStyles, Grid} from '@material-ui/core';
import RuleBook from './resources/rulebook.json'
import SetSelectedItem from './SetSelectedItem'
import ObjectBoxes from './ObjectBoxes'

  
export default class LureofTheVoid extends React.Component {
    constructor(props) {
        super(props);
        this.setSelectedItem = this.setSelectedItem.bind(this);
        this.state = {
            careerIndex: this.props.careerIndex,
            careerItems: []
         }
     }

     setSelectedItem(x, y, i, title) {
        SetSelectedItem(x, y, i, title, this.props.choiceValues, this.props.updateParentState, 'trialsAndTravails')
        this.props.setSelectedStats()

    }

    render () {
        let bookSection = RuleBook['Trials and Travails'][this.props.trialsAndTravailsIndex]
        return (
            <Container maxWidth='xl'>
                <div className='careerContainer'>
                    <div>
                        
                        <div>
                            <h2>{bookSection['Title']}</h2>
                            <p>{bookSection['Description']}</p>
                        </div>
                        <h4>Features</h4>

                        {bookSection['Features'].map((feature) => (
                            <div>
                                <h4>{feature.Title}</h4>
                                <p>{feature.Description}</p>
                                {feature.Features !== undefined && <ObjectBoxes choiceValues={this.props.choiceValues} arrayTitle={'trials' + feature.Title} bookTag={'trialsAndTravails'} callback={this.setSelectedItem} objects={feature.Features} />}
                            </div>

                        ))}
                    </div>                        
                </div>
            </Container>
        )
    }
}