import React from 'react';
import { Container, Button, withStyles, ButtonGroup, Tooltip, Grid, TextField} from '@material-ui/core';
import './BaseRoll.css'

const HtmlTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: '#4c4c4c',
        font: 12,
      color: 'orange',
    },
  }))(Tooltip);

const CssTextField = withStyles(() => ({
    root: {backgroundColor: '#2a2a2a'},
    }))(TextField);


export default class BaseRoll extends React.Component {
    constructor(props) {
        super(props);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.reRollLowest = this.reRollLowest.bind(this);
        this.generateNumbers = this.generateNumbers.bind(this);
        this.lockRolls = this.lockRolls.bind(this);
        this.getBoxValues = this.getBoxValues.bind(this);

        this.state = {
            allBoxesFilled: false,
            rolledState: false,
            canReRoll: false,
            baseType: 3,
            rolls: [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
            scores: ['?','?','?','?','?','?','?','?','?']
        }
     }
    
     reRollLowest () {  
        let scores = this.state.scores
        let low = 99;
        let lIndex = -1;
        for (let index = 0; index < scores.length; index++) {
            const element = scores[index];
            if (element < low) {
                low = element
                lIndex = index
            }
        }

        let rolls = this.state.rolls
        rolls[lIndex][0] = this.roll() + 1
        rolls[lIndex][1] = this.roll() + 1

        scores[lIndex] = rolls[lIndex][0] + rolls[lIndex][1] + 25
        this.setState({rolls:rolls, scores:scores, canReRoll:false})

    }

     lockRolls () {
         let unalloc = {}

         for (let i = 0; i < this.state.scores.length; i++) {
             unalloc[i] = this.state.scores[i]
         }

        this.props.updateParentState({unallocatedValues: unalloc, baseRolls: this.state.scores, baseRolled: true})
     }

     handleTypeChange = (e, type) => {
        let response = true
        if (this.state.rolledState) {
            response = window.confirm("Warning, data will be reset!");
        }
        if (response) {

        
        document.getElementsByClassName('selectedType')[0].classList.remove('selectedType')
        e.target.classList.add('selectedType')
        this.setState({baseType: type})

        let cSelect = document.getElementsByClassName('selectedTypeContainer')[0].classList
        cSelect.remove('selectedTypeContainer')
        cSelect.add('hidden')

        this.setState({rolls: [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
            scores: ['?','?','?','?','?','?','?','?','?'], rolledState: false, canReRoll: false})

        switch (type) {
            case 1:
                cSelect = document.getElementById('typeDiceRoll').classList
                cSelect.add('selectedTypeContainer')
                break;

            case 2:
                cSelect = document.getElementById('typePointBuy').classList
                cSelect.add('selectedTypeContainer')
                break;
            
            case 3:
                cSelect = document.getElementById('typeManualEntry').classList
                cSelect.add('selectedTypeContainer')
                break;
            default:
                break;
        }
        }
    }

    roll() {
        return (Math.round(Math.random()*10%9))
    }

    componentDidMount() {
        console.log('base props: ', this.props)
    }
    
    generateNumbers (e) {
        let tRoll = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
        let tScores = [0,0,0,0,0,0,0,0,0]
        for (let index = 0; index < 9; index++) {
            tRoll[index][0] = this.roll() + 1
            tRoll[index][1] = this.roll() + 1
            tScores[index] = tRoll[index][0] + tRoll[index][1] + 25
        }
        this.setState({rolls: tRoll, scores: tScores, rolledState:true, canReRoll:true})        
    }

    getBoxValues () {
        let list = document.getElementsByClassName('scoreInputBox')
        let values = this.state.scores
        let count = 0;
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            if (parseInt(element.children[0].children[0].value) > 0) {
                count++
                values[index] = parseInt(element.children[0].children[0].value)
            }

        }
        this.setState({scores:values});

        if (count === 9) {
            this.setState({allBoxesFilled: true})
        }
    }

    render () {
        let roll = this.state.rolls
        let scores = this.state.scores
    
        return (
            <Container>
                <div id='rollTypeContainer'>
                    <div onClick={(e) => {this.handleTypeChange(e, 1)}} className='rollTypeButton selectedType'>Dice Roll</div>
                    <div onClick={(e) => {this.handleTypeChange(e, 2)}} className='rollTypeButton'>Point Buy</div>
                    <div onClick={(e) => {this.handleTypeChange(e, 3)}} className='rollTypeButton'>Manual Entry</div>
                </div>

                <div id="typeDiceRoll" className="hidden selectedTypeContainer">
                
                    <Grid className='rolledNumbersGridC' container justify="center" direction="row" spacing={2}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                        <Grid key={value} item xs={1}>
                            <HtmlTooltip title={<p>({roll[value][0]} + {roll[value][1]}) + 25</p>}>
                                <h1 style={{animationDelay: ((scores[value]-25)/20)*-1 + 's'}} className='rolledScores'>{scores[value]}</h1></HtmlTooltip>
                        </Grid>

                    ))}

                    </Grid>
                    <div onClick={(e) => {this.generateNumbers(e, 1)}} className={`yellow-button ${this.state.rolledState ? "hidden" : ""}`}>Roll 2d10 + 25</div>
                    <div onClick={(e) => {this.reRollLowest()}} id='reRollButton' className={`blue-button ${this.state.canReRoll ? "" : "hidden"}`} >Re-Roll lowest value?</div>
                        <br></br>
                    <div onClick={(e) => {this.lockRolls()}} id='lockRollsButton' className={`yellow-button ${this.state.rolledState ? "" : "hidden"}`}>Lock rolls</div>
                </div>

                <div id='typePointBuy' className='hidden'>
                        <h1>pb</h1>
                </div>

                <div id='typeManualEntry' className='hidden'>
                    <Grid className='rolledNumbersGridC' container justify="center" direction="row" spacing={2}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                            <Grid key={value} item xs={1}>
                                <CssTextField className='scoreInputBox' onChange={this.getBoxValues} inputProps={{min:0, style:{textAlign:'center', color: 'white', fontSize:23}}}
                                id="outlined-basic" variant="outlined" />
                            </Grid>

                        ))}

                    </Grid>
                <div onClick={(e) => {this.lockRolls()}} id='lockRollsButton' className={`yellow-button ${this.state.allBoxesFilled ? "" : "hidden"}`}>Lock rolls</div>
                </div>

            </Container>
        )
    }

}