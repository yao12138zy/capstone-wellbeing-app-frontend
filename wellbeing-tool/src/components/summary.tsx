import {
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Typography
} from "@mui/material";
import React from "react";
import {Types} from "./BubbleChart/types";
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfoIcon from '@mui/icons-material/Info';
import BubbleChart3 from "./BubbleChart3/BubbleChart3";
import uuid from "react-uuid";

const SummaryInterface = () => {

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

    const [data, setData] = React.useState<Types.Data[]>(d.slice(1, 10))
    const [showDescriptions, setShowDescriptions] = React.useState(false);
    const [timePeriod, setTimePeriod] = React.useState(7);

    // const handleChange = (event: SelectChangeEvent) => {
    //     setTimePeriod(event.target.value);
    // };

    const toggleShowDescriptions = () => {
        setShowDescriptions(!showDescriptions)
    }
    const changeData = () => {

        setData(d.sort(() => Math.random() - 0.5))
    }

    const selectedKeyHandler = (key: string) => {
        alert(key)
    }

    return (
        <Stack sx={{height: "100%", backgroundColor: 'primary', my: '50px'}} spacing={3} direction="column" alignItems="center"
               justifyContent="flex-start">
            <Typography variant="h5" color="secondary">Your recent stats</Typography>
            <BubbleChart3 bubblesData={data} width={600} height={400} textFillColor="drakgrey" backgroundColor="#ffffff"
                          minValue={1} maxValue={150} selectedCircle={selectedKeyHandler}/>
            <Stack sx={{width: "100%"}} direction="row" alignItems="flex-start" justifyContent="space-between">
                <Chip size='medium'
                      color='secondary'
                      variant='outlined'
                      icon={<InfoIcon fontSize='small'/>}
                      label="Show descriptions"
                      onClick={toggleShowDescriptions}/>
                {/*<FormControl size='small'>*/}
                {/*    <Select*/}
                {/*        labelId="time-period"*/}
                {/*        id="time-period"*/}
                {/*        value={timePeriod}*/}
                {/*        label=""*/}
                {/*        onChange={handleChange}*/}
                {/*    >*/}
                {/*        <MenuItem value={7}>Past 7 days</MenuItem>*/}
                {/*        <MenuItem value={30}>Past 30 days</MenuItem>*/}
                {/*        <MenuItem value={60}>Past 60 days</MenuItem>*/}
                {/*        <MenuItem value={90}>Past 90 days</MenuItem>*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}
                <Chip size='medium'
                      variant='outlined'
                      color='secondary'
                      icon={<DateRangeIcon fontSize='small'/>}
                      label="Past 7 days"
                      onClick={changeData}/>
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

export default SummaryInterface