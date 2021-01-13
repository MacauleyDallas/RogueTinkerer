import React from 'react';
import './CareerSelector.css'
import { Container, Tooltip, withStyles, Grid} from '@material-ui/core';
import RuleBook from './resources/rulebook.json'
import SetSelectedItem from './SetSelectedItem'
import ObjectBoxes from './ObjectBoxes'  

export default class CareerSelector extends React.Component {
    constructor(props) {
        super(props);
        this.setSelectedItem = this.setSelectedItem.bind(this);
        this.state = {
            careerIndex: this.props.careerIndex,
            careerItems: []
         }
     }

    setSelectedItem(x, y, i, title) {
        SetSelectedItem(x, y, i, title, this.props.choiceValues, this.props.updateParentState, 'career')
        this.props.setSelectedStats()

    }

    render () {
        return (
            <Container maxWidth='xl'>
                <div className='careerContainer'>
                        <div>
                        
                        <div className='textContainer'>
                            
                            <h2>{RuleBook.Career[this.props.careerIndex]['Title']}</h2>
                            {RuleBook.Career[this.props.careerIndex]['Description'].map((Para, i) => <p>{i === 0 && <span><img src={'/images/careers/' + RuleBook.Career[this.props.careerIndex]['Image']}  className='careerImage' alt="image" /></span>}{Para}</p>)}
                        </div>


                        <div className='startingStats'>
                            <h3 className="starterHeading">
                                Starting Skills
                            </h3>
                            <ObjectBoxes type={'Skill'} objects={RuleBook.Career[this.props.careerIndex]['StartingSkills']}/>
                            
                            <h3 className="starterHeading">
                            Starting Talents
                            </h3>

                            <ObjectBoxes type={'Talent'} objects={RuleBook.Career[this.props.careerIndex]['StartingTalents']} />

                            <h3 className="starterHeading">
                                Starting Gear
                            </h3>
                            <ObjectBoxes bookTag={'career'} choiceValues={this.props.choiceValues} arrayTitle={'careerStartingItems'} callback={this.setSelectedItem}  objects={RuleBook.Career[this.props.careerIndex]['StartingItems']} />

                            
                        </div>
                    </div>                        
                </div>
            </Container>
        )
    }
}