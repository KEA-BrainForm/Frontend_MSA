import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '1',
    Alpha: 4000,
    Beta: 2400,
    Delta: 2400,
  },
  {
    name: '2',
    Alpha: 3000,
    Beta: 1398,
    Delta: 2210,
  },
  {
    name: '3',
    Alpha: 2000,
    Beta: 9800,
    Delta: 2290,
  },
  {
    name: '4',
    Alpha: 2780,
    Beta: 3908,
    Delta: 2000,
  },
  {
    name: '5',
    Alpha: 1890,
    Beta: 4800,
    Delta: 2181,
  },
  {
    name: '6',
    Alpha: 2390,
    Beta: 3800,
    Delta: 2500,
  },
  {
    name: '7',
    Alpha: 3490,
    Beta: 4300,
    Delta: 2100,
  },
];

function Chart() {

  return (
    <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend align='right'/>
      <Line type="monotone" dataKey="Alpha" stroke="#8884d8"/>
      <Line type="monotone" dataKey="Beta" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Delta" stroke="#334d2d" />
    </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;