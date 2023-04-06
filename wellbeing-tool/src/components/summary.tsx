import {
    Alert, Card, Snackbar,
    Stack, Tooltip,
    Typography
} from "@mui/material";
import React, {useEffect} from "react";
import {Types} from "./BubbleChart/types";
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfoIcon from '@mui/icons-material/Info';
import BubbleChart3 from "./BubbleChart/BubbleChart";
import client from "../client/Client";
import IconDescriptions from "./small/descriptions";
import OutlineChip from "./small/outlineChip";

const SummaryInterface = () => {

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

    const [data, setData] = React.useState<Types.Data[]>(d)
    const [showDescriptions, setShowDescriptions] = React.useState(false);
    const [timePeriod, setTimePeriod] = React.useState(7);
    const [open, setOpen] = React.useState(false);

    const updateData = (response: any) => {
        setData(d.map(icon => ({...icon, size: response[icon.id]})))
    }
    const fetchData = async () => {

        try{
            const result = await client.responses.get({employeeId: 0, day: timePeriod})
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
    }, [timePeriod])


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
            <Typography variant="h5" color="secondary">Your recent stats</Typography>
            <Card sx={{borderRadius: '10px', height: '100%', width: '100%'}}>
                <BubbleChart3 bubblesData={data} width={500} height={400} textFillColor="drakgrey" backgroundColor="#ffffff"
                              minValue={Math.min(...data.map(it => it.size))}
                              maxValue={Math.max(...data.map(it => it.size))} selectedCircle={selectedKeyHandler}/>
            </Card>
            <Stack sx={{width: "100%"}} direction="row" alignItems="flex-start" justifyContent="space-between">
                {/*<FormControl color="secondary" size='small'>*/}
                {/*    <Select*/}
                {/*        labelId="time-period"*/}
                {/*        id="time-period"*/}
                {/*        value={timePeriod}*/}
                {/*        label=""*/}
                {/*        onChange={handleTimePeriodChange}*/}
                {/*        color="secondary"*/}
                {/*    >*/}
                {/*        <MenuItem color="secondary" value={7}>Past 7 days</MenuItem>*/}
                {/*        <MenuItem color="secondary" value={30}>Past 30 days</MenuItem>*/}
                {/*        <MenuItem color="secondary" value={60}>Past 60 days</MenuItem>*/}
                {/*        <MenuItem color="secondary" value={90}>Past 90 days</MenuItem>*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}
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

export default SummaryInterface