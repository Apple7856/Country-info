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


const Home = () => {
    const classes = useStyle();
    const [open, setOpen] = useState<boolean>(true);
    const [capitalWeather, setCapitalWeather] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<any>("");
    const [cityData, setCityData] = useState<any>("");
    const [locationData, setLocationData] = useState<any>("");
    const [capital, setCapital] = useState<string>("");

    const submitClick = async () => {
        try {
            const data = await axios.get(`https://restcountries.com/v3.1/name/${inputVal}`);
            setCityData(data.data[0]);
            setCapital(data.data[0].capital);
            setOpen(false);
            setInputVal("");
            setCapitalWeather(false);
        } catch (error) {
            console.log("Wrong data", error);
        }
    }

    const grtCapitalData = async () => {
        try {
            const data = await axios.get(`http://api.weatherstack.com/current?access_key=8103d12609124071f6e54b72cb853d87&query=${capital}`);
            setLocationData(data.data.current);
            setCapitalWeather(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Typography component="div" data-testid="mainComponent" className={classes.home}>
                {
                    open ?
                        <><form className={classes.form} noValidate autoComplete="off">
                            <TextField id="outlined-basic" value={inputVal} placeholder="Search Country Name" variant="outlined" data-testid="inputField" onChange={(e) => setInputVal(e.target.value)} />
                        </form>
                            <Button data-testid="buttonTest" className={classes.button} variant="contained" color="primary" disabled={inputVal ? false : true} onClick={() => submitClick()}>
                                Submit
                            </Button></>
                        :
                        <Typography component="div" className={classes.capitalContainer}>
                            <Typography className={classes.button} component="h4">Capital: {cityData.capital}</Typography>
                            <Typography className={classes.button} component="h4">Population: {cityData.population}</Typography>
                            <Typography className={classes.button} component="h4">latlng: {cityData.latlng[0]} - {cityData.latlng[1]}</Typography>
                            <Typography className={classes.button} component="h4">Flag: <img src={cityData.flags.svg} width="30px" height="20px" /> </Typography>
                            <Button className={classes.button} variant="contained" color="primary" onClick={() => grtCapitalData()}>
                                Capital Weather
                            </Button>
                        </Typography>

                }
                {
                    capitalWeather ?
                        <Typography component="div" className={classes.capitalContainer}>
                            <Typography className={classes.button} component="h4">Temperature: {locationData.temperature}</Typography>
                            <Typography className={classes.button} component="h4">Weather Icons: <img src={locationData.weather_icons[0]} /></Typography>
                            <Typography className={classes.button} component="h4">Wind Speed: {locationData.wind_speed}</Typography>
                            <Typography className={classes.button} component="h4">Precip: {locationData.precip}</Typography>
                        </Typography>
                        : ""
                }
            </Typography>
        </Container>
    )
}

export default Home
