import React from 'react';
import RuleBook from '../components/resources/rulebook.json'
import { Grid, Container, Button, Tooltip, Checkbox, withStyles, FormControl, InputLabel, Select, MenuItem, ListSubheader} from '@material-ui/core';
import './CharacterSheet.css'


const StyledCheckbox = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      color: 'white',
      fontSize: '20px',
      padding: '0px',
    }
  })(Checkbox);

export default class CharacterSheet extends React.Component {
    render () {
        let basicSkills =  RuleBook.Skills.filter((o) => {
                return o.Type === 'Basic'
        })

        basicSkills.sort((a, b) => {
            if (a.Name > b.Name) return 1
            if (a.Name < b.Name) return -1
            return 0
        })


        let advancedSkills =  RuleBook.Skills.filter((o) => {
            return o.Type === 'Advanced'
        })

        advancedSkills.sort((a, b) => {
            if (a.Name > b.Name) return 1
            if (a.Name < b.Name) return -1
            return 0
        })
        console.log(this.props.selected)

        return (
            <div>
                <h1>Char Sheet</h1>
                <div>
                    <div id="skillContainer">
                        <div id="basicSkillContainer">
                        <Grid container spacing={1}>
                        <Grid item container xs={12}>
                                    <Grid item  xs={2}>
                                    </Grid>
                                    <Grid item container xs={6}>
                                        <Grid item xs={2}>
                                            Basic
                                        </Grid>

                                        <Grid item xs={2}>
                                            Trained
                                        </Grid>

                                        <Grid item xs={2}>
                                            +10
                                        </Grid>

                                        <Grid item xs={2}>
                                            +20
                                        </Grid>

                                        <Grid item xs={2}>
                                            Total
                                        </Grid>
                                    </Grid>
                                </Grid>


                            {basicSkills.map((skill) => (
                                <Grid item container xs={12}>
                                    <Grid item  xs={2}>
                                        <div class="skillNameBox">
                                            {skill.Name}
                                        </div>
                                    </Grid>
                                    <Grid item container xs={6}>
                                        <Grid item xs={2}>
                                            <StyledCheckbox
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <StyledCheckbox
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <StyledCheckbox
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <StyledCheckbox
                                            />
                                        </Grid>

                                        <Grid item xs={2}>
                                            <StyledCheckbox
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}
                            </Grid>
                        </div>

                        <div id="advancedSkillContainer">
                         <Grid container spacing={1}>
                            {advancedSkills.map((skill) => (
                                <Grid item xs={12}>
                                    <div class="skillBox">
                                        {skill.Name}
                                    </div>
                                </Grid>
                            ))}
                            </Grid>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}