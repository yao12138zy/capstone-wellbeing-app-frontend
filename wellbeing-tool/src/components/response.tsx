import {Alert, Card, Chip, IconButton, Snackbar, Stack, Tooltip, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from "@mui/icons-material/Info";
import LoadingButton from '@mui/lab/LoadingButton';
import React from "react";
import client from "../client/Client";
import IconDescriptions from "./small/descriptions";
import OutlineChip from "./small/outlineChip";

const iconList = [
    {id: 1, description: "very sad", icon: '😩'},
    {id: 2, description: "sad", icon: '🙁'},
    {id: 3, description: "neutral", icon: '😐'},
    {id: 4, description: "happy", icon: '🙂'},
    {id: 5, description: "very happy", icon: '😄'},
    {id: 6, description: "anxious", icon: '😰'},
    {id: 7, description: "excited", icon: '😂'},
    {id: 8, description: "ill", icon: '🤒'},
    {id: 9, description: "tired", icon: '😴'},
    {id: 10, description: "angry", icon: '😡'},
] // Probably should come from backend

function CloseIcon(props: { fontSize: string }) {
    return null;
}

const ResponseInterface = () => {

    const [showDescriptions, setShowDescriptions] = React.useState(false);
    const [selectedIconId, setSelectedIconId] = React.useState(-1)
    const [open, setOpen] = React.useState(false);
    const [successfulSubmit, setSuccessfulSubmit] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const toggleShowDescriptions = () => {
        setShowDescriptions(!showDescriptions)
    }
    const handlePrivacyClick = () => {
        console.info('Anonymous');
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            const result = await client.responses.put({iconId: selectedIconId})
            setSuccessfulSubmit(result.ok)
            setSelectedIconId(-1)
        } catch {
            setSuccessfulSubmit(false)
        } finally {
            setIsSubmitting(false)
            setOpen(true)
        }
    };

    const handleIconClick = (id: number) => {
        if (selectedIconId !== id)
            setSelectedIconId(id);
        else
            setSelectedIconId(-1)
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const submitConfirmation = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <Stack sx={{height: "100%", backgroundColor: 'primary', my: '50px'}} spacing={2} direction="column"
               alignItems="center" justifyContent="flex-start">
            <Typography variant="h5" color="secondary">How are you feeling today?</Typography>
            <Card sx={{width: "100%", marginTop: '5px', padding: '15px', borderRadius: '10px'}}>
                <Grid2 container spacing={2} columns={5}>
                    {
                        iconList.map((item) => {
                            return (
                                <Grid2 key={`i-${item.id}`} xs={1}>
                                    <Tooltip title={item.description}>
                                        <IconButton className='grow' aria-label="mood" onClick={() => handleIconClick(item.id)}
                                                    classes={{root: item.id === selectedIconId ? 'emoji-icon-button-selected' : ''}}>
                                            <Typography color="black" variant="h3">{item.icon}</Typography>
                                        </IconButton>
                                    </Tooltip>
                                    {showDescriptions ? <Typography align='center' variant='subtitle2'>{item.description}</Typography>: null}
                                </Grid2>)
                        })
                    }
                </Grid2>
            </Card>
            <Stack sx={{width: '100%'}} spacing={2} direction="row" alignItems="flex-start"
                   justifyContent="space-between">
                <Stack sx={{flexGrow: '5'}} spacing={2} direction="row" alignItems="flex-start"
                       justifyContent="flex-start">
                    <OutlineChip action={toggleShowDescriptions} label='Show descriptions' icon={<InfoIcon fontSize='small'/>}/>
                    <OutlineChip action={handlePrivacyClick} label='Confidential' icon={<LockIcon fontSize='small'/>}/>
                </Stack>

                <LoadingButton sx={{marginLeft: 'auto', marginRight: '0'}}
                               variant="contained"
                               color="secondary"
                               onClick={handleSubmit}
                               loading={isSubmitting}
                               disabled={selectedIconId === -1}>Submit</LoadingButton>
            </Stack>


            {/*{showDescriptions ?*/}
            {/*    <IconDescriptions iconList={iconList}/> : null}*/}

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={submitConfirmation}
            >
                {successfulSubmit ?
                    <Alert severity="success">Response submitted!</Alert>
                    : <Alert severity="error">Could not submit response</Alert>}
            </Snackbar>

        </Stack>
    )
}

export default ResponseInterface