import React from 'react';
import './App.css';
import ResponseInterface from "./components/response";
import {createTheme, CssBaseline, GlobalStyles, ThemeProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import SummaryInterface from "./components/summary";

/*TD Green (Light): #008A00; */
/* Background of Style Sheet: #E5E5E5*/
const tdTheme = createTheme({
  palette: {
    primary: {
      main: '#E5E5E5'
    },
    secondary: {
      main: '#008A00'
    },
    background: {
      default: '#F5F5F5'
    }

  },

  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '-apple-system',
      'BlinkMacSystemFont',
    ].join(','),

    allVariants: {
      fontWeight: 600,
    },

    fontWeightBold: 800,

    // h1: {
    //
    // },
    // h2: {
    //
    // },
    // h3: {
    //
    // },
    // h4: {
    //
    // },
    // h5: {
    //
    // },
    // h6: {
    //
    // },

    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 500,
    },
  }


})
function App() {
  return (
      <ThemeProvider theme={tdTheme}>
        <CssBaseline />
        <GlobalStyles
            styles={{
              body: { backgroundColor: "primary" }
            }}
        />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout/>}>
                <Route index element={<Navigate to="/response"/>}/>
                <Route path="response" element={<ResponseInterface/>}/>
                <Route path="summary" element={<SummaryInterface/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
