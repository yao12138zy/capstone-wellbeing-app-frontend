import { Container } from "@mui/material"
import {Outlet} from "react-router-dom";


const Layout = () => {
    return (
        <Container sx={{height: "100%", backgroundColor: 'primary'}} maxWidth="sm">
            <Outlet/>
        </Container>
    )
}

export default Layout