
 import React from 'react';
 import { Grid, Container, Button, Tooltip, withStyles, FormControl, InputLabel, Select, MenuItem, ListSubheader} from '@material-ui/core';
 import RuleBook from './resources/rulebook.json'
 import ObjectPopup from './ObjectPopup'
 import './ObjectBoxes.css'
import SelectGroupDropDown from './SelectGroupDropDown';

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




    export default class ObjectBoxes extends React.Component {
        constructor(props) {    
            super(props);
            this.genChoice = this.genChoice.bind(this)
            this.getSkillGroups = this.getSkillGroups.bind(this)
            this.getTalentGroups = this.getTalentGroups.bind(this)
        }

    getSkillGroups(skill) {
        let groups = []
        RuleBook.Skills.forEach(element => {
            if (element.Name === skill) {
                groups = element.SkillGroups
            }
        });

        return groups
    }

    getTalentGroups(talent) {
        let groups = []
        RuleBook.Skills.forEach(element => {
            if (element.Name === talent) {
                groups = element.SkillGroups
            }
        });

        return groups
    }

    getAll(type) {
        let all = RuleBook[type]

        let ret = []
        
        all.forEach(ob => {
            ret.push(ob['name'])
        });
        return ret
    }
    genChoice(o, x) {
        let preSelected = false
        
        if (this.props.choiceValues[this.props.arrayTitle] !== undefined) {
            if (this.props.choiceValues[this.props.arrayTitle][x] !== undefined) preSelected = true
        }
        
        
        let type
        return (
           <div className="ItemSelectBoxBox">
            {o['Choice'].map((i) => (
            <div className={`ItemSelectBox ${this.props.bookTag}`} id={'select-' + this.props.arrayTitle + x + '-' + o['Choice'].indexOf(i)} onClick={() => this.props.callback(x, o['Choice'].indexOf(i), i, this.props.arrayTitle)}>
                {Object.keys(i).forEach(element => {            
                    if (['Item', 'Skill', 'Talent', 'Feature', 'Attr', 'Type', 'FatePoint', 'Wound'].includes(element)) type = element
                })}
                
                            
                <ObjectPopup object={i}>
                    {/* Item */}
                    {type === 'Item' && i.Quality && <span>{i.Quality} </span>}
                    {type === 'Item' && i[type]}
                    {type === 'Item' && i.Upgrades && <span> ({i.Upgrades.map((u) => (u))})</span>}
                        
                    {/* Attr */}
                    {type === 'Attr' && i[type]}
                    {type === 'Attr' && i.Value !== undefined && 
                    (' ' + i.Value > 0 ? ': + ' + i.Value : ': - ' + -1*i.Value)}

                    {/* Skills */}
                    {type === 'Skill' && i[type]}
                    {type === 'Skill' && i[type] === "Any Skill" && <SelectGroupDropDown groups={RuleBook.Skills} arrayTitle={this.props.arrayTitle} callback={this.props.callback}/>}
                    {type === 'Skill' && (i.Groups !== undefined && i.Groups.length === 1) && 
                        // Display groups listed
                        (i.Groups[0]['Choose'] === undefined ?
                        i.Groups.map((g) => (<span> ({g})</span>))
                        :
                        // Display a group selection dropdown
                        <span>
                            <SelectGroupDropDown groups={this.getSkillGroups(i[type])} arrayTitle={this.props.arrayTitle} callback={this.props.callback}/>
                        </span>)
                    }

                    {/* Talents */}
                    {type === 'Talent' && i[type]}
                    {type === 'Talent' && i[type] === "Any Talent" && <SelectGroupDropDown groups={RuleBook.Talents} arrayTitle={this.props.arrayTitle} callback={this.props.callback}/>}
                    {type === 'Talent' && (i.Groups !== undefined && i.Groups.length === 1) && 
                        // Display groups listed
                        (i.Groups[0]['Choose'] === undefined ?
                        i.Groups.map((g) => (<span> ({g})</span>))
                        :
                        // Display a group selection dropdown
                        <span>
                            <SelectGroupDropDown groups={this.getTalentGroups(i[type])} arrayTitle={this.props.arrayTitle} callback={this.props.callback}/>
                        </span>)
                    }


                    {/* Fate Points */}
                    {type === 'FatePoint' && i[type] > 0 && <span>+{i[type]} Starting Fatepoint</span>}  
                    {type === 'FatePoint' && i[type] < 0 && <span>-{1*i[type]} Starting Fatepoint</span>}
                    
                    {/* Wound Points */}
                    {type === 'Wound' && i[type] > 0 && <span>+{i[type]} Starting Wound</span>}  
                    {type === 'Wound' && i[type] < 0 && <span>-{1*i[type]} Starting Wound</span>}

                    {/* Feature Points */}
                    {type === 'Feature' && i[type]}
                    
                </ObjectPopup>
                </div>
                ))}
            </div>

        )
            
}
    
     render() {
        
        let type, choice
        // console.log(this.props.objects)
            
            return (
                <Grid container spacing={1}>
                    {this.props.objects.map((o) => (
                <ObjectPopup object={o}>
                    
                        {

                            Object.keys(o).forEach(element => {            
                                if (['Item', 'Skill', 'Talent', 'Feature', 'Attr', 'FatePoint', 'Wound'].includes(element)) type = element
                                if (element === "Choice") choice = true
                            })
                        }
                        {/* {console.log('object:', type)} */}
                        {o[type] &&
                           
                                <div className={type + 'Box'}>

                                    {/* Item */}
                                    {type === 'Item' && o.Quality && <span>{o.Quality} </span>}
                                    {type === 'Item' && o[type]}
                                    {type === 'Item' && o.Upgrades && <span> ({o.Upgrades.map((u) => (u))})</span>}

                                    {/* Attr */}
                                    {type === 'Attr' && o[type]}
                                    {type === 'Attr' && o.Value !== undefined && 
                                    (' ' + o.Value > 0 ? ': + ' + o.Value : ': - ' + -1*o.Value)}

                                    {/* Skills */}
                                    {type === 'Skill' && o[type]}
                                    {type === 'Skill' && o[type] === "Any Skill" && <SelectGroupDropDown groups={RuleBook.Skills} arrayTitle={this.props.arrayTitle} callback={this.props.callback}/>}
                                    {type === 'Skill' && (o.Groups !== undefined && o.Groups.length === 1) && 
                                        // Display groups listed
                                        (o.Groups[0]['Choose'] === undefined ?
                                        o.Groups.map((g) => (<span> ({g})</span>))
                                        :
                                        // Display a group selection dropdown
                                        <span>
                                            <SelectGroupDropDown groups={this.getSkillGroups(o[type])} arrayTitle={this.props.arrayTitle} callback={this.props.callback}/>
                                        </span>)
                                    }

                                    {/* Talents */}
                                    {type === 'Talent' && o[type]}
                                    {type === 'Talent' && o[type] === "Any Talent" && <SelectGroupDropDown groups={RuleBook.Talents} arrayTitle={this.props.arrayTitle} callback={this.props.callback}/>}
                                    {type === 'Talent' && (o.Groups !== undefined && o.Groups.length === 1) && 
                                        // Display groups listed
                                        (o.Groups[0]['Choose'] === undefined ?
                                        o.Groups.map((g) => (<span> ({g})</span>))
                                        :
                                        // Display a group selection dropdown
                                        <span>
                                            <SelectGroupDropDown groups={this.getTalentGroups(o[type])} arrayTitle={this.props.arrayTitle} callback={this.props.callback}/>
                                        </span>)
                                    }

                                    
                                    
                                    
                                    
                                    
                                    {(type === 'Skill' || type === 'Talent') && (o.Groups !== undefined && o.Groups.length > 1) &&
                                    (<span> ({o.Groups.map((g) => (
                                    <span>{ g}{g !== o.Groups[o.Groups.length - 1] && ', '}</span>
                                    ))})</span>)}


                                    {/* Fate Points */}
                                    {type === 'FatePoint' && o[type] > 0 && <span>+{o[type]} Starting Fatepoint</span>}
                                    {type === 'FatePoint' && o[type] < 0 && <span>-{1*o[type]} Starting Fatepoint</span>}

                                    {/* Wound Points */}
                                    {type === 'Wound' && o[type] > 0 && <span>+{o[type]} Starting Wound</span>}  
                                    {type === 'Wound' && o[type] < 0 && <span>-{1*o[type]} Starting Wound</span>}

                                    {/* Feature Points */}
                                    {type === 'Feature' && o[type]}

                                </div>
                           }

                           {o['Choice'] &&
                           this.genChoice(o, this.props.objects.indexOf(o))}
                           
                </ObjectPopup>
                ))}
                </Grid>
            )
        
     }
}