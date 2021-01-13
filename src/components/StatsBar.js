import React from 'react';
import { Grid, Container, Button, Tooltip, withStyles, FormControl, InputLabel, Select, MenuItem, ListSubheader} from '@material-ui/core';
import './StatsBar.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ls from 'local-storage'


const StyledDropdown = withStyles({
    root: {
     // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      fontSize: '20px',
      padding: '10px 10px',
      margin:'',
      lineHeight: '10px',
    },
    selectMenu: {
        minHeight:'0px'
    },
    icon: {
        color: 'white'
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Select);


const HtmlTooltip = withStyles(() => ({
    tooltip: {
      backgroundColor: '#4c4c4c',
        font: 12,
      color: 'orange',
    },
  }))(Tooltip);

export default class HeaderBar extends React.Component {

    constructor(props) {
        super(props);
        this.toggleVerboseStats = this.toggleVerboseStats.bind(this);
        this.updateAllocations = this.updateAllocations.bind(this);
        this.calcScores = this.calcScores.bind(this);
        this.toggleScorePlacements = this.toggleScorePlacements.bind(this);

        this.state = {
            verboseAttr: false,
        }
     }

     toggleVerboseStats () {
         this.calcScores()
         let list = document.getElementsByClassName("verbose")
         if (this.state.verboseAttr) {
    
            for (var i = 0; i < list.length; i++) {
                list[i].classList.add('hidden'); 
            }
            this.setState({verboseAttr: false})
         } else {
            for (var i = 0; i < list.length; i++) {
                list[i].classList.remove('hidden'); 
            }
            this.setState({verboseAttr: true})
         }
        
    }


    updateAllocations (e, child) {
        console.log('xx', e.target.value)
        
        this.calcScores()
        let value = e.target.value
        let vPos = parseInt(child.key.slice(9))
        let tAllocatedValues = this.props.allocatedValues
        let tUnallocatedValues = this.props.unallocatedValues
        if (e.target.value === "") {
            delete tAllocatedValues[value]
        } else {
            if (tAllocatedValues[value] !== undefined) {
                tUnallocatedValues[tAllocatedValues[value]['vPos']] = tAllocatedValues[value]['value']
                delete tAllocatedValues[tAllocatedValues[value]]
            }
            if (tUnallocatedValues[vPos] === undefined) {
                Object.keys(tAllocatedValues).forEach(key => {
                    if (tAllocatedValues[key]['vPos'] === vPos) {
                        tUnallocatedValues[tAllocatedValues[key]['vPos']] = tAllocatedValues[key]['value']
                        delete tAllocatedValues[key]
                    }
                })
                
            }
    
            tAllocatedValues[value] = {'vPos': vPos, 'value': tUnallocatedValues[e.target.value]}
            delete tUnallocatedValues[e.target.value]
        }

        this.props.updateParentState({allocatedValues: tAllocatedValues, unallocatedValues: tUnallocatedValues})

    }


    calcScores() {
        let tScores = this.props.allocatedValues;
        let tBase = [0,0,0,0,0,0,0,0,0]

        for (let index = 0; index < Object.keys(tScores).length; index++) {
            const element = tScores[Object.keys(tScores)[index]];
            tBase[Object.keys(tScores)[index]] = element['value'];
        }

        let tBonus = this.props.skillBonusSum
        let tPen = this.props.skillPenaltySum
        let tTotal = this.props.finalScores
        console.log(tPen)
        for (let index = 0; index < 9; index++) {
            tTotal[index] = tBase[index] + tBonus[index] - tPen[index]
        }

        this.props.updateParentState({finalScores:tTotal, baseScores: tBase})

    }

    toggleScorePlacements () {
        if (Object.keys(this.props.allocatedValues).length === 9 && this.props.scorePlacementMode) {
            this.props.updateParentState({scorePlacementMode: false})
            this.calcScores()

        } else if (!this.props.scorePlacementMode) {
            let response = window.confirm("Are you sure?");
            if (response) {

                let unalloc = {}

                for (let i = 0; i < this.props.baseRolls.length; i++) {
                    unalloc[i] = this.props.baseRolls[i]
                }

                this.props.updateParentState({scorePlacementMode: true, allocatedValues: {}, unallocatedValues: unalloc})
            }
        } else {
            alert('All values must be allocated!')
        }
        
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
      
    

    render () {
        // console.log('skillbar props: ', this.props)

        let skillData = {
            skillNames: ['Weapon Skill', 'Ballistic Skill', 'Strength', 'Toughness', 'Agility', 'Intelligence', 'Perception', 'Willpower', 'Fellowship'],
            skillAbbr: ['WS', 'BS', 'S', 'T', 'Ag', 'Int', 'Per', 'WP', 'Fel'],
            skillBase: this.props.baseRolls,
            skillPenaltySum: this.props.skillPenaltySum,
            skillBonusSum: this.props.skillBonusSum,
            skillFinal: this.props.finalScores,
            skillBonuses: [{'Sick Cunt': 3, 'Shooty Boi': 2}, {}, {}, {}, {}, {}, {}, {}, {}],
            skillPenaltys: [{'Sick Cunt': 3, 'Shooty Boi': 2}, {}, {}, {}, {}, {}, {}, {}, {}],
            unallocatedValues: this.props.unallocatedValues,
            allocatedValues: this.props.allocatedValues
        };
        // console.log('stats', this.props.unallocatedValues)
        
        return (
            <Container style={{background:'#1c1c1c', borderRadius:'40px'}}maxWidth="md">
                <div className="pointButtons">
                    <div class='toggleVstats' onClick={this.toggleVerboseStats}>Toggle Verbose Stats</div>
                    <div class='toggleVstats' onClick={this.toggleScorePlacements}>{this.props.scorePlacementMode ? "Save Placements" : "Reset Placements"}</div>
                </div>
                <Grid container justify="center" direction="row" spacing={2}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((xValue) => (
                    <Grid item xs={1.8}>
                        <Grid container className='MainAttr' direction="column" spacing={1}>
                            <Grid className='SkillName' item>
                            {skillData['skillNames'][xValue]}
                            </Grid>

                            <Grid className='SkillAbbr' item>
                                {skillData['skillAbbr'][xValue]}
                            </Grid>

                            {this.props.scorePlacementMode ?
                            <Grid className='SkillValue' item>
                            
                            <FormControl>
                                <StyledDropdown
                                id={'dropdown' + xValue}
                                onChange={this.updateAllocations}
                                id="grouped-select">
                                    <ListSubheader disabled='true'>Free</ListSubheader>
                            
                                    {Object.keys(skillData['unallocatedValues']).map((value) => (
                                    <MenuItem id={`uVDB${value}`} key={`uVDB${xValue}${value}`} value={value}>{skillData['unallocatedValues'][value]}</MenuItem>))}
                                    
                                    <ListSubheader>Allocated</ListSubheader>
                                    {Object.keys(skillData['allocatedValues']).map((value) => (
                                    <MenuItem disabled='true' id={`aVDB${value}`} key={`aVDB${xValue}${value}`} value={skillData['allocatedValues'][value]['vPos']}>{skillData['allocatedValues'][value]['value']}</MenuItem>))}
                                    // jumppoint
                                    </StyledDropdown>
                            </FormControl>


                            <p className='NumTag'>Starting</p>
                            </Grid>
                            :
                            <Grid className='SkillValue verbose hidden' item>
                            <p className='Num'>{skillData['skillBase'][xValue]}</p>
                            <p className='NumTag'>Starting</p>
                            </Grid>
                            }
                            
                            
                            

                                {Object.keys(skillData['skillBonuses'][xValue]).length > 0 ?
                            <HtmlTooltip placement='right' title={
                                Object.keys(skillData['skillBonuses'][xValue]).map((v) => (<p>{v}: - {skillData['skillBonuses'][xValue][v]}</p>))
                            }>
                                <Grid className='SkillValue verbose hidden' item>
                                <p className='Num'>+ {skillData['skillBonusSum'][xValue]}</p>
                                <p className='NumTag'>Bonuses</p>
                                </Grid>
                            </HtmlTooltip>
                            :
                            <Grid className='SkillValue verbose hidden' item>
                                <p className='Num'>+ {skillData['skillBonusSum'][xValue]}</p>
                                <p className='NumTag'>Bonuses</p>
                            </Grid>
                            }

                            {Object.keys(skillData['skillPenaltys'][xValue]).length > 0 ?
                            <HtmlTooltip placement='right' title={
                                Object.keys(skillData['skillPenaltys'][xValue]).map((v) => (<p>{v}: - {skillData['skillPenaltys'][xValue][v]}</p>))
                            }>
                                <Grid className='SkillValue verbose hidden' item>
                                <p className='Num'>- {skillData['skillPenaltySum'][xValue]}</p>
                                <p className='NumTag'>Penaltys</p>
                                </Grid>
                            </HtmlTooltip>
                            :
                            <Grid className='SkillValue verbose hidden' item>
                                <p className='Num'>- {skillData['skillPenaltySum'][xValue]}</p>
                                <p className='NumTag'>Penaltys</p>
                            </Grid>
                            }
                            

                            {this.props.scorePlacementMode ?
                            <Grid className='SkillValue verbose hidden' item>
                            <p className='Num'>{skillData['skillFinal'][xValue]}</p>
                            <p className='NumTag'>Final</p>
                            </Grid>
                            :
                            <Grid className='SkillValue' item>
                            <p className='Num'>{skillData['skillFinal'][xValue]}</p>
                            <p className='NumTag'>Final</p>
                            </Grid>
                            }

                        </Grid>
                    </Grid>
                ))}
                    

                </Grid>
            </Container>
        )
    }
}