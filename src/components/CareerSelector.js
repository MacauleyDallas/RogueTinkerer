import React from 'react';
import ArchmilitantImage from '../images/Female_Rogue_Trader.png'
import AstropathImage from '../images/astropath.png'
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
        console.log('here?')
        SetSelectedItem(x, y, i, title, this.props.choiceValues, this.props.updateParentState, 'career')
        this.props.setSelectedStats()

    }

    render () {
        let images = [AstropathImage, ArchmilitantImage]
        return (
            <Container maxWidth='xl'>
                <div className='careerContainer'>
                        <div>
                        
                        <div className='imageContainer'>
                            <img className='careerImage' src={images[this.props.careerIndex]}></img>
                        </div>
                        <div className='textContainer'>
                            {/* {console.log('CarInd', this.props.careerIndex)} */}
                            <h2>{RuleBook.Career[this.props.careerIndex]['Title']}</h2>
                            {RuleBook.Career[this.props.careerIndex]['Description'].map((Para) => <p>{Para}</p>)}
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
                            <ObjectBoxes bookTag={'career'} choiceValues={this.props.choiceValues} arrayTitle={'StartingItems'} callback={this.setSelectedItem}  objects={RuleBook.Career[this.props.careerIndex]['StartingItems']} />
                            {/* <ObjectBoxes type={'Item'} choices={true} objects={RuleBook.Career[this.props.careerIndex]['StartingItems']} callback={this.setSelectedItem}/> */}

                            
                        </div>
                    </div>                        
                </div>
            </Container>
        )
    }
}