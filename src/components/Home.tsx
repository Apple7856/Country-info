import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useStyle = makeStyles({
    home: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    form: {
        marginTop: "20px"
    },
    button: {
        marginTop: "20px"
    },
    capitalContainer: {
        width: "600px",
        height: "250px",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    }
})

interface state {
    open: boolean,
    submitOpen: boolean,
    capitalWeather: boolean,
    inputVal: any,
    cityData: any,
    locationData: any,
}

const Home: React.FC = () => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [capitalWeather, setCapitalWeather] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [cityData, setCityData] = useState("");
    const [locationData, setLocationData] = useState("");

    const submitClick = async () => {
        try {
            const data = await axios.get(`http://api.weatherstack.com/current?access_key=8103d12609124071f6e54b72cb853d87&query=${inputVal}`);
            setCityData(data.data.location);
            setLocationData(data.data.current)
            setOpen(true);
            setInputVal("");
            setCapitalWeather(false);
        } catch (error) {
            console.log("Wrong data",error);
        }
    }

    return (
        <Container>
            <Typography component="div" className={classes.home}>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField id="outlined-basic" value={inputVal} placeholder="Search Country Name" variant="outlined" onChange={(e) => setInputVal(e.target.value)} />
                </form>
                <Button className={classes.button} variant="contained" color="primary" disabled={inputVal ? false : true} onClick={() => submitClick()}>
                    Submit
                </Button>
                {
                    open ?
                        <Typography component="div" className={classes.capitalContainer}>
                            <Typography className={classes.button} component="h4">Capital: {cityData.name}</Typography>
                            <Typography className={classes.button} component="h4">Population: { cityData.lon }</Typography>
                            <Typography className={classes.button} component="h4">latlng: { cityData.lat }</Typography>
                            <Typography className={classes.button} component="h4">Country: {cityData.country} </Typography>
                            <Button className={classes.button} variant="contained" color="primary" onClick={() => setCapitalWeather(!capitalWeather)}>
                                Capital Weather
                            </Button>
                        </Typography>
                        : ""
                }
                {
                    capitalWeather ?
                        <Typography component="div" className={classes.capitalContainer}>
                            <Typography className={classes.button} component="h4">Temperature: { locationData.temperature }</Typography>
                            <Typography className={classes.button} component="h4">Weather Icons: <img src={locationData.weather_icons[0]} /></Typography>
                            <Typography className={classes.button} component="h4">Wind Speed: { locationData.wind_speed }</Typography>
                            <Typography className={classes.button} component="h4">Precip: { locationData.precip}</Typography>
                        </Typography>
                        : ""
                }
            </Typography>
        </Container>
    )
}

export default Home
