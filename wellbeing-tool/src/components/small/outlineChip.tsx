import {Chip} from "@mui/material";
import React from "react";

const OutlineChip = (prop: any) => {
    return (
        <Chip size='medium'
              color='secondary'
              variant='outlined'
              sx={{
                  p: '5pt',
              }}
              icon={prop.icon}
              label={prop.label}
              onClick={prop.action}/>
    )
}

export default OutlineChip