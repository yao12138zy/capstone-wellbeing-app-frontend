import {
    Alert,
    Card, Divider, Snackbar,
    Stack, Tooltip,
    Typography
} from "@mui/material";
import React, {useEffect} from "react";
import {Types} from "./BubbleChart/types";
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfoIcon from '@mui/icons-material/Info';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BubbleChart3 from "./BubbleChart/BubbleChart";
import client from "../client/Client";
import IconDescriptions from "./small/descriptions";
import OutlineChip from "./small/outlineChip";
import FilledChip from "./small/filledChip";

const AdminInterface = () => {


    const d: Types.Data[] = [
        {id: 1, description: "very happy", icon: '😄', size: 200, fillColor: '#00000000'},
        {id: 2, description: "happy", icon: '🙂', size: 50, fillColor: '#00000000'},
        {id: 3, description: "sad", icon: '🙁', size: 100, fillColor: '#00000000'},
        {id: 4, description: "anxious", icon: '😰', size: 70, fillColor: '#00000000'},
        {id: 5, description: "excited", icon: '😂', size: 250, fillColor: '#00000000'},
        {id: 6, description: "ill", icon: '🤒', size: 130, fillColor: '#00000000'},
        {id: 7, description: "tired", icon: '😴', size: 80, fillColor: '#00000000'},
        {id: 8, description: "neutral", icon: '😐', size: 50, fillColor: '#00000000'},
        {id: 9, description: "very sad", icon: '😩', size: 90, fillColor: '#00000000'},
        {id: 10, description: "angry", icon: '😡', size: 40, fillColor: '#00000000'},
    ]
    const groups = [
        {id: 1, name: 'All'},
        {id: 2, name: 'Group 1'},
        {id: 3, name: 'Group 2'},
    ]


    const [data, setData] = React.useState<Types.Data[]>(d)
    const [showDescriptions, setShowDescriptions] = React.useState(false);
    const [timePeriod, setTimePeriod] = React.useState(7);
    const [open, setOpen] = React.useState(false);
    const [groupId, setGroupId] = React.useState(1);

    const updateData = (response: any) => {
        setData(d.map(icon => ({...icon, size: response[icon.id]})))
    }
    const fetchData = async () => {

        try{
            const result = (groupId === -1) ?
                await client.admin.getAll({day: timePeriod}) :
                await client.admin.getGroup({groupId: groupId,day: timePeriod})

            if (result.ok)
                updateData(result.response)
            else
                setOpen(true)
        } catch {
            setOpen(true)
        }


    }

    useEffect(() => {

        fetchData();
    }, [timePeriod, groupId])


    const toggleShowDescriptions = () => {
        setShowDescriptions(!showDescriptions)
    }
    const changeData = () => {

        setData(d.sort(() => Math.random() - 0.5))
        console.log(data)
    }

    const selectedKeyHandler = (key: string) => {
        // alert(key)
    }

    const handleTimePeriodChange = () => {
        if (timePeriod === 7)
            setTimePeriod(30);
        else
            setTimePeriod(7);

        // fetchData()
        changeData() // replace with API call
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack sx={{height: "100%", backgroundColor: 'primary', my: '50px'}} spacing={2} direction="column"
               alignItems="center"
               justifyContent="flex-start">
            <Typography variant="h5" color="secondary">Team Statistics</Typography>
            <Card sx={{borderRadius: '10px', height: '100%', width: '100%'}}>
                <BubbleChart3 bubblesData={data} width={500} height={400} textFillColor="drakgrey" backgroundColor="#ffffff"
                              minValue={Math.min(...data.map(it => it.size))}
                              maxValue={Math.max(...data.map(it => it.size))} selectedCircle={selectedKeyHandler}/>

                <Divider/>
                <Stack sx={{width: "100%", p: '10pt 10pt'}} spacing={1.5} direction="row" alignItems="center" justifyContent="flex-start">
                    <Typography color='secondary' variant='subtitle1'>Available groups</Typography>
                    {groups.map((item) => {
                        return(
                            <FilledChip
                                item={item}
                                icon={<PeopleAltIcon sx={{ fontSize: 18 }}/>}
                                onClick={() => { setGroupId(item.id)}}
                                classes={{root: item.id === groupId ? 'group-chip-selected' : ''}}
                            />
                        )
                    })}
                </Stack>
            </Card>

            <Stack sx={{width: "100%"}} direction="row" alignItems="flex-start" justifyContent="space-between">
                <Tooltip title='Show icon descriptions'>
                    <OutlineChip action={toggleShowDescriptions} label='Show descriptions' icon={<InfoIcon fontSize='small'/>}/>
                </Tooltip>
                <Tooltip title='Click to change time period'>
                    <OutlineChip action={handleTimePeriodChange} label={`Past ${timePeriod} days`} icon={<DateRangeIcon fontSize='small'/>}/>
                </Tooltip>
            </Stack>
            {showDescriptions ?
                <IconDescriptions iconList={data}/> : null}

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="error">Error loading data</Alert>
            </Snackbar>

        </Stack>
    )
}

export default AdminInterface