import React from "react";
import { TextField, Tooltip, MenuItem, makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
  customMenu: {
    // !important is applied because the default z-index is applied inline
    zIndex: "1501 !important",
  },
  customDrop: {
    borderRadius: 3,
    border: 0,
    color: 'white'
  },
  customPadd: {
      padding: '10px'
  },
  customArrow: {
      color: 'white'
  }
});

export default function SelectGroupDropDown(props) {
  const classes = useStyles();
  
  return (



        <TextField
            select
            // classes={{root: classes.customPadd}}
            SelectProps={{
                classes: {
                    root:classes.customDrop,
                    icon: classes.customArrow,
                },
                
                MenuProps: {
                    PopoverClasses: {
                        root: classes.customMenu
                    }
                }
            }}

            onChange={(e, child) => props.callback(0, e.target.value, 0, props.arrayTitle, true)}
            >

            {props.groups.map((group) =>(<MenuItem  value={group.Group !== undefined ? group.Group : group.Name}>{group.Group !== undefined ? group.Group : group.Name} &nbsp;</MenuItem>))}
            
        </TextField>
  );
}
