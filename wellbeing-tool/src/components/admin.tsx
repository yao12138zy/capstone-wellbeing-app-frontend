import {
    Chip,
    Stack,
    Typography
} from "@mui/material";
import React, {useEffect} from "react";
import {Types} from "./BubbleChart/types";
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfoIcon from '@mui/icons-material/Info';
import BubbleChart3 from "./BubbleChart3/BubbleChart3";
import client from "../client/Client";
import IconDescriptions from "./descriptions";

const AdminInterface = () => {

    const d: Types.Data[] = [
        {id: 1, description:"very happy", icon: '😄', size: 200, fillColor: '#00000000'},
        {id: 2, description:"happy", icon: '🙂', size: 50, fillColor: '#00000000'},
        {id: 3, description:"sad",  icon: '🙁', size: 100, fillColor: '#00000000'},
        {id: 4, description:"anxious", icon: '😰', size: 70, fillColor: '#00000000'},
        {id: 5, description:"excited", icon: '😂', size: 250, fillColor: '#00000000'},
        {id: 6, description:"ill", icon: '🤒', size: 130, fillColor: '#00000000'},
        {id: 7, description:"tired", icon: '😴', size: 80, fillColor: '#00000000'},
        {id: 8, description:"neutral", icon: '😐', size: 50, fillColor: '#00000000'},
        {id: 9, description:"very sad", icon: '😩', size: 90, fillColor: '#00000000'},
        {id: 10,description:"angry", icon: '😡', size: 40, fillColor: '#00000000'},
    ]

    const [data, setData] = React.useState<Types.Data[]>(d)
    const [showDescriptions, setShowDescriptions] = React.useState(false);
    const [timePeriod, setTimePeriod] = React.useState(7);

    useEffect(() => {
        const updateData = (result: any) => {
            // update data based on API response
        }
        const fetchData = async () => {
            const result = await client.responses.get('test')
            updateData(result)
        }

        fetchData();
    })



    const toggleShowDescriptions = () => {
        setShowDescriptions(!showDescriptions)
    }
    const changeData = () => {

        setData(d.sort(() => Math.random() - 0.5))
        console.log(data)
    }

    const selectedKeyHandler = (key: string) => {
        alert(key)
    }

    const handleTimePeriodChange = () => {
        if (timePeriod === 7)
            setTimePeriod(30);
        else
            setTimePeriod(7);

        changeData() // replace with API call
    }

    return (
        <Stack sx={{height: "100%", backgroundColor: 'primary', my: '50px'}} spacing={3} direction="column" alignItems="center"
               justifyContent="flex-start">
            <Typography variant="h5" color="secondary">Admin Dashboard</Typography>
            <BubbleChart3 bubblesData={data} width={600} height={400} textFillColor="drakgrey" backgroundColor="#ffffff"
                          minValue={Math.min(...data.map(it => it.size))} maxValue={Math.max(...data.map(it => it.size))} selectedCircle={selectedKeyHandler}/>
            <Stack sx={{width: "100%"}} direction="row" alignItems="flex-start" justifyContent="space-between">
                <Chip size='medium'
                      color='secondary'
                      variant='outlined'
                      icon={<InfoIcon fontSize='small'/>}
                      label="Show descriptions"
                      onClick={toggleShowDescriptions}/>

                <Chip size='medium'
                      variant='outlined'
                      color='secondary'
                      icon={<DateRangeIcon fontSize='small'/>}
                      label={`Past ${timePeriod} days`}
                      onClick={handleTimePeriodChange}/>
            </Stack>

            {showDescriptions ?
                <IconDescriptions iconList={data}/>: null}

        </Stack>
    )
}

export default AdminInterface