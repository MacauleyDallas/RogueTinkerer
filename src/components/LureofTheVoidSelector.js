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
        SetSelectedItem(x, y, i, title, this.props.choiceValues, this.props.updateParentState, 'lureOfTheVoid')
        this.props.setSelectedStats()

    }



    render () {
        let bookSection = RuleBook['Lure of The Void'][this.props.lureOfTheVoidIndex]
        // console.log('Let me know whats missing', this.props.lureOfTheVoidIndex)
        return (
            <Container maxWidth='xl'>
                <div className='careerContainer'>
                    <div>
                        
                        
                        <div>
                            <h2>{bookSection['Title']}</h2>
                            <p>{bookSection['Description']}</p>
                        </div>
                        
                           <h4>Features</h4>

                            <ObjectBoxes choiceValues={this.props.choiceValues} 
                            arrayTitle={'VoidEffect'}
                            bookTag={'lureOfTheVoid'}
                            callback={this.setSelectedItem}
                            objects={[bookSection['Effect']]} 
                            />
                        
                    </div>                        
                </div>
            </Container>
        )
    }
}