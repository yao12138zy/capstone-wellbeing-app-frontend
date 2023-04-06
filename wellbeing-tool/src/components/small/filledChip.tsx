import InfoIcon from "@mui/icons-material/Info";
import {Chip} from "@mui/material";
import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const FilledChip = (prop: any) => {
    return(
        <Chip size='medium'
              color='secondary'
              variant='filled'
              sx={{
                  p: '5pt',
              }}
              icon={prop.icon}
              label={prop.item.name}
              classes={prop.classes}
              onClick={prop.onClick}/>
    )
}

export default FilledChip