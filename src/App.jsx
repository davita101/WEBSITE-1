import { useState } from 'react'
import { useEffect } from 'react'

export default function App() {
  const [data, setData] = useState([])
  const [updateCity, setUpdateCity] = useState("Tbilisi")
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${updateCity}&appid=5faa8e189a4b974b5f1dd2556054e48f`)
      .then(res => res.json())
      .then(x => setData(x))
  }, [updateCity])
  console.log(Math.floor((data?.weather?.[0]?.main)))
  return (
    <div className='font-sans px-2 md:text-start text-center'>
      <div className='flex items-center h-screen justify-center flex-col '>
        <div className='max-w-80'>
          <h2 className='my-6 font-bold'>Weather app V1.0</h2>
          <form >
            <input
              placeholder='Enter city ...'
              className='w-full font-bold focus:border-gray-700 border-2 outline-none border-gray-500 px-5 py-5 rounded-sm   '
              type="text"
              value={updateCity}
              onChange={(e) => setUpdateCity(e.target.value)} />
          </form>
          {(data.cod !== "404") ? (
            <div className='my-5 border-2 rounded-sm border-gray-500 py-5'>
              <div className='font-bold flex justify-between px-5'>
                <h4>City</h4>
                <span className='text-gray-800'>{data?.name || "no data"}</span>
              </div>
              <div className='font-bold flex justify-between px-5'>
                <h4>temp</h4>
                <span className='text-gray-800'>{Math.floor(data?.main?.temp) - 273.15 || "no data"} C</span>
              </div>
              <br />
              <div className='font-bold flex justify-between px-5'>
                <h4>weather</h4>
                <span className='text-gray-800'>{(data?.weather?.[0]?.main) || "no data"}</span>
              </div>
            </div>) :
            <div className='my-5 border-2 rounded-sm border-gray-500 p-5'>
              <span className='font-bold text-red-500'>City not found</span>
            </div>
          }
        </div>
      </div>
    </div >
  )
}
