import {Button, ButtonGroup, Container, Stack, Typography} from "@mui/material"
import {Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <div>
            <Stack alignContent='center' spacing={4} sx={{background: 'black', padding: '4pt 10pt'}} direction='row'>
                <Typography sx={{marginTop: 'auto', marginBottom: 'auto', }} variant='body2' align='center' color='white'>Demo Version</Typography>
                    <ButtonGroup variant="text" size="small" color='primary'>
                        <Button sx={{p: '2pt 10pt'}}
                            href="/response"
                            >Response</Button>
                        <Button sx={{p: '2pt 10pt'}}
                            href="/summary"
                            >User Summary</Button>
                        <Button sx={{p: '2pt 10pt'}}
                            href="/admin"
                            >Admin Summary</Button>
                    </ButtonGroup>
            </Stack>
            <Container sx={{height: "100%", backgroundColor: 'primary'}} maxWidth="sm">
                <Stack pt='20pt' spacing={2} justifyContent='center' alignContent='center'>
                    {/*<Typography align='center' variant='h6'>Welcome to this demo version of a wellbeing*/}
                    {/*    survey!</Typography>*/}
                    {/*<Stack pb='30pt' alignContent='center' justifyContent='center' direction='row'>*/}
                    {/*    /!*<Typography align='right' pr='10pt' color='secondary' variant='h6'>Go to</Typography>*!/*/}
                    {/*    <ButtonGroup variant='outlined'>*/}
                    {/*        <Button*/}
                    {/*            href="/response"*/}
                    {/*            >Response</Button>*/}
                    {/*        <Button*/}
                    {/*            href="/summary"*/}
                    {/*            >User Summary</Button>*/}
                    {/*        <Button*/}
                    {/*            href="/admin"*/}
                    {/*            >Admin Summary</Button>*/}
                    {/*    </ButtonGroup>*/}

                    {/*</Stack>*/}

                    <Outlet/>
                </Stack>

            </Container>
        </div>
    )
}

export default Layout