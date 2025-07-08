import React, { useState, useEffect } from 'react';

function WeatherApp() {
    const [city, setCity] = useState(); // State untuk menyimpan nama kota
    const [weatherData, setWeatherData] = useState(null); // State untuk menyimpan data cuaca

    const apiKey = "07ceb21872ee0771ca76743b922f73de"; // API GWEH INI WOY DAH

    // useEffect untuk fetch data saat komponen pertama kali di render atau saat kota berubah
    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!city) return;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Kota tidak ditemukan.");
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error("Gagal mengambil data cuaca:", error);
                setWeatherData(null); // Reset data jika terjadi error
            }
        };

        fetchWeatherData();
    }, [city]); // "Dependency array, effect akan berjalan lagi jika `city` berubah" -> kalau kata gpt ya gini

    const handleSearch = (e) => {
        e.preventDefault();
        const newCity = e.target.elements.city.value;
        setCity(newCity);
    };
    const getWeatherIcon = (weatherCondition) => {
        const iconMap = {
            clouds: "./src/assets/clouds.png",
            clear: "./src/assets/clear.png",
            rain: "./src/assets/rain.png",
            drizzle: "./src/assets/drizzle.png",
            mist: "./src/assets/mist.png",
        };
        return iconMap[weatherCondition] || "./src/assets/default.png";
    };


    return (
        <div className="w-[90%] max-w-[470px] bg-gradient-to-r from-blue-500 to-purple-600 mt-[100px] mx-auto rounded-[20px] py-[40px] px-[35px] text-center text-white shadow-lg">
            <form onSubmit={handleSearch} className="mb-8 flex justify-center items-center space-x-2">
                <input
                    name="city"
                    type="text"
                    placeholder="Masukkan Nama Kota"
                    spellCheck="false"
                    className="w-full py-3 px-4 rounded-lg
             border-2 border-gray-500
             text-black placeholder-gray-800
             focus:outline-none focus:ring-2 focus:ring-gray-500
             transition-transform duration-150 ease-in-out
             hover:scale-101"
                />
                <button type="submit" className="p-3 bg-white rounded-lg hover:bg-gray-300 transition">
                    <img src="assets/cari.png" alt="Search" className="w-6 h-6" />
                </button>
            </form>

            {weatherData && (
                <>
                    <div className="mb-8">
                        <img src={getWeatherIcon(weatherData.weather[0].main.toLowerCase())} alt="Weather Icon" className="mx-auto w-20 h-20" />
                        <h1 className="text-5xl font-bold my-3">{Math.round(weatherData.main.temp)}°C</h1>
                        <h2 className="text-xl font-semibold">{weatherData.name}</h2>
                    </div>
                    <div className="flex justify-between mt-6">
                        <div className="flex items-center space-x-2">
                            <img src="assets/humidity.png" alt="Humidity" className="w-8 h-8" />
                            <div>
                                <p className="text-lg font-semibold">{weatherData.main.humidity}%</p>
                                <p className="text-sm text-gray-200">Kelembapan</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src="assets/wind.png" alt="Wind" className="w-8 h-8" />
                            <div>
                                <p className="text-lg font-semibold">{weatherData.wind.speed} Km/h</p>
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