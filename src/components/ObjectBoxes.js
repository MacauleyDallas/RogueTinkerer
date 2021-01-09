
 import React from 'react';
 import {Grid, Tooltip, withStyles} from '@material-ui/core';
 import RuleBook from './resources/rulebook.json'
 import ObjectPopup from './ObjectPopup'


 import './ObjectBoxes.css'


    export default class ObjectBoxes extends React.Component {
        constructor(props) {    
            super(props);
            this.genChoice = this.genChoice.bind(this)
        }

    genChoice(o, x) {

        let type
        return (
           <div className="ItemSelectBoxBox">
            {o['Choice'].map((i) => (
            <div className="ItemSelectBox" id={'select' + x + '-' + o['Choice'].indexOf(i)} onClick={() => this.props.callback(x, o['Choice'].indexOf(i), i)}>
                {Object.keys(i).forEach(element => {            
                    if (['Item', 'Skill', 'Talent', 'Feature', 'Attr', 'Type'].includes(element)) type = element
                })}
                
                            
                <ObjectPopup object={i}>
                            {i.Quality && <span>{i.Quality} </span>}
                            {i[type]}
                            {i.Upgrades && <span> ({i.Upgrades.map((u) => (u))})</span>}
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
                                if (['Item', 'Skill', 'Talent', 'Feature', 'Attr'].includes(element)) type = element
                                if (element === "Choice") choice = true
                            })
                        }
                        {/* {console.log('object:', type)} */}
                        {o[type] &&
                           
                                <div className={type + 'Box'}>
                                    {o[type]}
                                
                                    {o.Value !== undefined && (' ' + o.Value > 0 ? ': + ' + o.Value : ': - ' + -1*o.Value)}
                                    {(o.Groups !== undefined && o.Groups.length === 1) && (o.Groups[0]['Choose'] === undefined ? o.Groups.map((g) => (<span> ({g})</span>)) : <span>Choos One</span>)}
                                    {(o.Groups !== undefined && o.Groups.length > 1) && (<span> ({o.Groups.map((g) => (<span>{ g}{g !== o.Groups[o.Groups.length - 1] && ', '}</span>))})</span>)}
        
                                </div>
                           }
                           {/* {console.log('OA', o)} */}
                           {o['Choice'] &&
                           this.genChoice(o, this.props.objects.indexOf(o))}
                </ObjectPopup>
                ))}
                </Grid>
            )
        
     }
}