import React from 'react';
import ArchmilitantImage from '../images/Female_Rogue_Trader.png'
import AstropathImage from '../images/astropath.png'
import './CareerSelector.css'
import { Container, Tooltip, withStyles, Grid} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RuleBook from './resources/rulebook.json'

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

    setSelectedItem (e, parentIndex, index, item) {
        let id = 'itemSelectBox-' + parentIndex + '-' + index
        
        let elements = document.getElementsByClassName(parentIndex)
        
        for (let index = 0; index < Object.keys(elements).length; index++) {
            elements[index].classList.remove('selectedItem')
        }
        document.getElementById(id).classList.add('selectedItem')
        let tCareerItems = this.state.careerItems
        tCareerItems[parentIndex] = item
        this.setState({careerItems: tCareerItems})
    }

    render () {
        let images = [AstropathImage, ArchmilitantImage]
        let bookSection = RuleBook.Homeworld[this.props.homeworldIndex]
        return (
            <Container maxWidth='xl'>
                <div className='careerContainer'>
                        <div>
                        
                        <div className='imageContainer'>
                            {/* <img className='careerImage' src={images[this.props.homeworldIndex]}></img> */}
                        </div>
                        
                        {/* {console.log('import: ', this.props.homeworldIndex)} */}
                        <div>
                            <h2>{bookSection['Title']}</h2>
                            <p><i>"{bookSection['Quote']}"</i></p>
                            <p>{bookSection['Description']}</p>
                            <h3>{bookSection['Life']['Title']}</h3>
                            {bookSection['Life']['Description'].map((Para) => <p>{Para}</p>)}
                        </div>
                        
                        
                        <h3>{bookSection['Character Features']['Title']}</h3>
                        <p>{bookSection['Character Features']['Description']}</p>
                        <ObjectBoxes callback={console.log} objects={bookSection['Character Features']['Mods']} />

                        {bookSection['Character Features']['Features'].map((feature) => (
                            <div>
                                <h4>{feature.Title}</h4>
                                <p>{feature.Description}</p>
                                {feature.Features !== undefined && <ObjectBoxes callback={console.log} objects={feature.Features} />}
                            </div>

                        ))}


                        {/* <div className='startingStats'>
                            <h3 className="starterHeading">
                                Starting Skills
                            </h3>
                            <ObjectBoxes type={'Skill'} objects={RuleBook.Homeworld[this.props.homeworldIndex]['StartingSkills']}/>
                            
                            <h3 className="starterHeading">
                            Starting Talents
                            </h3>

                            <ObjectBoxes type={'Talent'} objects={RuleBook.Homeworld[this.props.careerIndex]['StartingTalents']} />

                            <h3 className="starterHeading">
                                Starting Gear
                            </h3>
                            
                            <ObjectBoxes type={'Item'} objects={RuleBook.Homeworld[this.props.careerIndex]['StartingItems']} />
                            <ObjectBoxes type={'Item'} choices={true} objects={RuleBook.Homeworld[this.props.careerIndex]['StartingItems']} callback={this.setSelectedItem}/>

                            
                        </div> */}
                    </div>                        
                </div>
            </Container>
        )
    }
}