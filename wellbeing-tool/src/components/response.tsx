import {Button, Card, Chip, IconButton, Paper, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from "@mui/icons-material/Info";
import React from "react";
import {Types} from "./BubbleChart/types";
import uuid from "react-uuid";

const d: Types.Data[] = [
    {id: 1, description:"very happy", icon: '😄', size: 200, fillColor: '#FFFFFF'},
    {id: 2, description:"happy", icon: '🙂', size: 50, fillColor: '#FFFFFF'},
    {id: 3, description:"sad",  icon: '🙁', size: 100, fillColor: '#FFFFFF'},
    {id: 4, description:"anxious", icon: '😰', size: 70, fillColor: '#FFFFFF'},
    {id: 5, description:"excited", icon: '😂', size: 250, fillColor: '#FFFFFF'},
    {id: 6, description:"ill", icon: '🤒', size: 130, fillColor: '#FFFFFF'},
    {id: 7, description:"tired", icon: '😴', size: 80, fillColor: '#FFFFFF'},
    {id: 8, description:"neutral", icon: '😐', size: 50, fillColor: '#FFFFFF'},
    {id: 9, description:"very sad", icon: '😩', size: 90, fillColor: '#FFFFFF'},
    {id: 10,description:"angry", icon: '😡', size: 40, fillColor: '#FFFFFF'},
]

const iconList = ['😩', '🙁', '😐', '🙂', '😄', '😂', '😰', '😡', '😴', '🤒']
const ResponseInterface = () => {

    const [showDescriptions, setShowDescriptions] = React.useState(false);

    const toggleShowDescriptions = () => {
        setShowDescriptions(!showDescriptions)
    }
    const handlePrivacyClick = () => {
        console.info('Anonymous');
    };

    const handleIconClick = () => {
    }

    return(
        <Stack sx={{height: "100%", backgroundColor: 'primary', my: '50px'}} spacing={2} direction="column" alignItems="center" justifyContent="flex-start">
            <Typography variant="h5" color="secondary">How are you feeling today?</Typography>
            <Card sx={{width:"100%", marginTop:'5px', padding: '15px', borderRadius: '10px'}}>
                <Grid2 container spacing={2} columns={5}>
                    {
                        iconList.map((item) => {
                            return (
                                <Grid2 key={`i-${uuid()}`} xs={1}>
                                    <IconButton aria-label="mood" onClick={handleIconClick}>
                                        <Typography color="black" variant="h3">{item}</Typography>
                                    </IconButton>
                                </Grid2>)
                        })
                    }
                </Grid2>
            </Card>
            <Stack sx={{width: '100%'}} spacing={2} direction="row" alignItems="flex-start" justifyContent="space-between">
                <Stack sx={{flexGrow: '5'}} spacing={2} direction="row" alignItems="flex-start" justifyContent="flex-start" >
                    <Chip size='medium'
                          color='secondary'
                          variant='outlined'
                          icon={<InfoIcon fontSize='small'/>}
                          label="Show descriptions"
                          onClick={toggleShowDescriptions}/>
                    <Chip
                        size='medium'
                        color='secondary'
                        variant='outlined'
                        icon={<LockIcon fontSize='small'/>}
                        label="Confidential"
                        onClick={handlePrivacyClick}/>
                </Stack>

                <Button sx={{marginLeft:'auto', marginRight:'0'}} variant="contained" color="secondary">Submit</Button>
            </Stack>


            {showDescriptions ?
                <Paper sx={{width: "100%", p: '10px 10px', height: '200px'}}>
                    <Stack sx={{width: "100%", maxHeight: '100%', overflow: 'auto'}} spacing={0.5}>
                        {
                            d.map((line) => {
                                return(
                                    <Stack key={`d-${uuid()}`} sx={{width: "100%"}} spacing={2} direction="row" alignItems="center" justifyContent="flex-start">
                                        <Typography variant='h5'>{line.icon}</Typography>
                                        <Typography variant='body1'>{line.description}</Typography>
                                    </Stack>
                                )})
                        }
                    </Stack>
                </Paper> : null}

        </Stack>
    )
}

export default ResponseInterface