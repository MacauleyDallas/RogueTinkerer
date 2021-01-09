import React from 'react';
import ArchmilitantImage from '../images/Female_Rogue_Trader.png'
import AstropathImage from '../images/astropath.png'
import './CareerSelector.css'
import { Container, Tooltip, withStyles, Grid} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RuleBook from './resources/rulebook.json'

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

     setSelectedItem(x, y, i) {
        let j = 0
        
        while (document.getElementById('select' + x + '-' + j) !== null) {
            let selected = this.props.selected['careerItems']

            console.log(selected)
            if (j === y) {
                document.getElementById('select' + x + '-' + j).classList.add('selectedItem')
                
            } else {
                document.getElementById('select' + x + '-' + j).classList.remove('selectedItem')
            }
            j = j + 1
        }
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
                            
                            <ObjectBoxes callback={this.setSelectedItem} objects={RuleBook.Career[this.props.careerIndex]['StartingItems']} />
                            {/* <ObjectBoxes type={'Item'} choices={true} objects={RuleBook.Career[this.props.careerIndex]['StartingItems']} callback={this.setSelectedItem}/> */}

                            
                        </div>
                    </div>                        
                </div>
            </Container>
        )
    }
}