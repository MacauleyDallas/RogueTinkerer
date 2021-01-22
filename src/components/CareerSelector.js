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
        this.getImageHeight = this.getImageHeight.bind(this);
        this.state = {
            imageHeight: 0,
            careerIndex: this.props.careerIndex,
            careerItems: []
         }
     }

    setSelectedItem(x, y, i, title, dropdown) {
        SetSelectedItem(x, y, i, title, this.props.choiceValues, this.props.updateParentState, 'career')
        this.props.setSelectedStats()

    }

    getImageHeight() {
        let imageHeight = this.state.imageHeight
        try {Array.from(document.getElementById('textContainer').children).forEach(element => {
            imageHeight += element.offsetHeight + 16 + 16 
        });}
        catch {}
        this.setState({imageHeight: imageHeight})
    }
  componentDidMount() {
    this.getImageHeight()
    }
    
    render () {
        return (
            <Container maxWidth='xl'>
                <div className='careerContainer'>
                    <div>
                        <div>
                            <h2>{RuleBook.Career[this.props.careerIndex]['Title']}</h2>
                            <span><img style={{maxHeight: this.state.imageHeight}} src={'/images/careers/' + RuleBook.Career[this.props.careerIndex]['Image']}  className='careerImage' alt="image" /></span>
                            <span id="textContainer">{RuleBook.Career[this.props.careerIndex]['Description'].map((Para, i) => <p>{Para}</p>)}</span>
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
                            <ObjectBoxes bookTag={'career'} choiceValues={this.props.choiceValues} arrayTitle={'careerStartingItems'} selected={this.props.choiceValues} callback={this.setSelectedItem}  objects={RuleBook.Career[this.props.careerIndex]['StartingItems']} />

                            
                        </div>
                    </div>                        
                </div>
            </Container>
        )
    }
}