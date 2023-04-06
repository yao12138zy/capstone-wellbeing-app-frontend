import {Chip} from "@mui/material";
import React from "react";

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