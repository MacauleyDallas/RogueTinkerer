import React from 'react';
import ArchmilitantImage from '../images/Female_Rogue_Trader.png'
import AstropathImage from '../images/astropath.png'
import './CareerSelector.css'
import { Container, Tooltip, withStyles, Grid} from '@material-ui/core';
import RuleBook from './resources/rulebook.json'
import SetSelectedItem from './SetSelectedItem'
import ObjectBoxes from './ObjectBoxes'

  
export default class BirthrightSelector extends React.Component {
    constructor(props) {
        super(props);
        this.setSelectedItem = this.setSelectedItem.bind(this);
        this.state = {
            careerIndex: this.props.careerIndex,
            careerItems: []
         }
     }

     setSelectedItem(x, y, i, title) {
        SetSelectedItem(x, y, i, title, this.props.choiceValues, this.props.updateParentState, 'homeworld')
        this.props.setSelectedStats()

    }

    render () {
        let images = [AstropathImage, ArchmilitantImage]
        let bookSection = RuleBook.Birthright[this.props.birthrightIndex]
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
                        arrayTitle={'birthrightFeatures'} callback={this.setSelectedItem}
                            objects={bookSection['Features']} 
                            />
                    </div>                        
                </div>
            </Container>
        )
    }
}