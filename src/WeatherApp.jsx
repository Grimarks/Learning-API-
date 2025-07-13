import React, { useState, useEffect } from "react";
import clouds   from "./assets/clouds.png";
import clear    from "./assets/clear.png";
import rain     from "./assets/rain.png";
import drizzle  from "./assets/drizzle.png";
import mist     from "./assets/mist.png";
import searchI  from "./assets/cari.png";
import humidityI from "./assets/humidity.png";
import windI     from "./assets/wind.png";

function WeatherApp() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        if (!city) return;

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((r) => {
                if (!r.ok) throw new Error("Kota tidak ditemukan");
                return r.json();
            })
            .then(setWeatherData)
            .catch((err) => {
                console.error(err);
                setWeatherData(null);
            });
    }, [city]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCity(e.target.elements.city.value.trim());
    };

    const iconMap = { clouds, clear, rain, drizzle, mist };

    return (
        <div className="w-[90%] max-w-[470px] bg-gradient-to-r from-blue-500 to-purple-600 mt-[100px] mx-auto rounded-[20px] py-[40px] px-[35px] text-center text-white shadow-lg">
            {/* search */}
            <form onSubmit={handleSearch} className="mb-8 flex justify-center items-center space-x-2">
                <input
                    name="city"
                    type="text"
                    placeholder="Masukkan Nama Kota"
                    spellCheck="false"
                    className="w-full py-3 px-4 rounded-lg border-2 border-gray-500 text-black placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform duration-150 ease-in-out hover:scale-101"
                />
                <button type="submit" className="p-3 bg-white rounded-lg hover:bg-gray-300 transition">
                    <img src={searchI} alt="Search" className="w-6 h-6" />
                </button>
            </form>

            {/* hasil */}
            {weatherData && (
                <>
                    <div className="mb-8">
                        <img
                            src={iconMap[weatherData.weather[0].main.toLowerCase()] || defaultI}
                            alt="Weather Icon"
                            className="mx-auto w-20 h-20"
                        />
                        <h1 className="text-5xl font-bold my-3">{Math.round(weatherData.main.temp)}°C</h1>
                        <h2 className="text-xl font-semibold">{weatherData.name}</h2>
                    </div>

                    <div className="flex justify-between mt-6">
                        <div className="flex items-center space-x-2">
                            <img src={humidityI} alt="Humidity" className="w-8 h-8" />
                            <div>
                                <p className="text-lg font-semibold">{weatherData.main.humidity}%</p>
                                <p className="text-sm text-gray-200">Kelembapan</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src={windI} alt="Wind" className="w-8 h-8" />
                            <div>
                                <p className="text-lg font-semibold">{weatherData.wind.speed} Km/h</p>
                                <p className="text-sm text-gray-200">Kecepatan Angin</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default WeatherApp;
