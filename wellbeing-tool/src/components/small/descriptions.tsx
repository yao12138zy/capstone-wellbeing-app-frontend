import {Paper, Stack, Typography} from "@mui/material";
import uuid from "react-uuid";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";

const IconDescriptions = (prop: { iconList: any[]; }) => {
    return(
        <Paper sx={{width: "100%", p: '10px 10px', height: '200px'}}>
            {/*<Stack sx={{width: "100%", maxHeight: '100%', overflow: 'auto'}} spacing={0.5}>*/}
            <Grid2 container spacing={2} columns={5}>
                {
                    prop.iconList.map((line: any) => {
                        return (
                            <Grid2 key={`i-${line.id}`} xs={1}>
                            <Stack key={`d-${uuid()}`} sx={{width: "100%"}} spacing={1} direction="column"
                                   alignItems="center" justifyContent="flex-start">
                                <Typography variant='h4'>{line.icon}</Typography>
                                <Typography align='center' variant='subtitle2'>{line.description}</Typography>
                            </Stack>
                            </Grid2>
                        )
                    })
                }
            </Grid2>
            {/*</Stack>*/}
        </Paper>
    )
}

export default IconDescriptions