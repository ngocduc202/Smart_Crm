import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';

const Home = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className='main-container'>
      <div className='flex justify-between mb-8'>
        <h3 className='text-2xl text-gray-800'>DASHBOARD</h3>
      </div>

      <div className='grid grid-cols-4 gap-5 mt-4'>
        <div className='flex flex-col justify-between p-2 md:p-4 rounded-md bg-blue-500'>
          <div className='flex items-center justify-between'>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill size={25} />
          </div>
          <h1>300</h1>
        </div>
        <div className='flex flex-col justify-between p-2 md:p-4 rounded-md bg-orange-500'>
          <div className='flex items-center justify-between'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill size={25} />
          </div>
          <h1>12</h1>
        </div>
        <div className='flex flex-col justify-between p-2 md:p-4 rounded-md bg-green-500'>
          <div className='flex items-center justify-between'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill size={25} />
          </div>
          <h1>33</h1>
        </div>
        <div className='flex flex-col justify-between p-2 md:p-4 rounded-md bg-red-500'>
          <div className='flex items-center justify-between'>
            <h3>ALERTS</h3>
            <BsFillBellFill size={25} />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-5 mt-16 h-72'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </main>
  )
}

export default Home