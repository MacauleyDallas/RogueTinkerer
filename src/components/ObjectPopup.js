
 import React from 'react';
 import {Grid, Tooltip, withStyles} from '@material-ui/core';
 import RuleBook from './resources/rulebook.json'


 import './ObjectBoxes.css'

    const HtmlTooltip = withStyles(() => ({
        tooltip: {
            backgroundColor: '#1c1c1c',
            font: 12,
            color: 'orange',
        },
    }))(Tooltip);

    export default class ObjectPopup extends React.Component {
        constructor(props) {            
            super(props);
            this.getPopup = this.getPopup.bind(this);           
    }

    findArrayElementByTitle(array,  title) {
        return array.find((element) => {
            return element.Name === title || element.Group === title;
        })
        }


    getSkillGroups(skill, groups) {
        if(groups === undefined) {
            return;
        }

        return (groups.map((group) => (
            <span>
                <h3>{group}</h3>
                <p>{this.findArrayElementByTitle(skill.SkillGroups, group).Description}</p>
            </span>
        )))
    }

    getPopup(type, groups, objectData) {
        if (type === 'Skill') {
            return (
            <div>
                <h3>Skill Type: {objectData.Type}</h3><h3>Stat: {objectData.Characteristic}</h3>
                <p>{objectData.Description}</p>
                    {groups}
            </div>
            )
        }
    }

     render() {
        let type, groups, objectData
        Object.keys(this.props.object).forEach(element => {            
            if (['Item', 'Skill', 'Talent'].includes(element)) type = element
            
        });

        if (type) {
            if (type) {
                objectData = this.findArrayElementByTitle(RuleBook[type + 's'], this.props.object.type)
                if (objectData) groups = this.getSkillGroups(objectData, objectData.Groups)
            }
            return (
                <HtmlTooltip title={this.getPopup(type, groups, objectData)}>
                    <Grid item>
                        {this.props.children}
                    </Grid>
                </HtmlTooltip>
            )
        } else {
            return (
                <Grid item>
                    {this.props.children}
                </Grid>
            )
        }
     }
}