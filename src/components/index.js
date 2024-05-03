import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import weatherIcons from './weatherIcons';
import WeatherContext from '../context/WeatherContext';

async function fetchData(city) {

    try {
        const weatherResponse = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/2024-05-03/2024-05-10?unitGroup=metric&include=days%2Ccurrent&key=B98543BQP4HXV7C4LS5YB2JT3&contentType=json`)

        const data = await weatherResponse.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error('İstek başarısız!:', error.message);
        throw error;
    }
}


const gunAdlari = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];


function convertDatetoDay(datetime) {
    let tarih = new Date(datetime);
    let gunIndex = tarih.getDay();
    return gunAdlari[gunIndex];
}

function WeatherApp() {

    const { citys, city, setCity, data, setData } = useContext(WeatherContext);

    useEffect(() => {
        fetchData(city).then(data => setData(data))
    }, [city])

    

    return (
        <>
            <div className='mainframe'>
                <div className='mframe2'>
                    <select onChange={(e) => setCity(e.target.value)} className='selector'>
                        {citys.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    <div>
                        <span className='textsevenday '>8 Günlük Hava Durumu</span>
                    </div>
                </div>
                <div className='dayframe'>
                    {data?.days.map((day, index) => (
                        <div key={index} className='daybox'>
                            <span>{convertDatetoDay(day.datetime)}</span>
                            <img className='iconimages ' src={weatherIcons[day.icon]} alt="weather icon" />
                            <div className='maxmin'>
                                <span>Max.</span>
                                <span>Min.</span>
                            </div>
                            <div className='temps'>
                                <span className=''>{day.tempmax}°C</span>
                                <span className=''>{day.tempmin}°C</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default WeatherApp;
