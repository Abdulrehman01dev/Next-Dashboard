// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: '66aa86ec55074dc87fe22661', // Evil Rabbit
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: '66aa86ec55074dc87fe22662', // Delba de Oliveira
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: '66aa86ec55074dc87fe22663', // Lee Robinson
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: '66aa86ec55074dc87fe22664', // Michael Novotny
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: '66aa86ec55074dc87fe22665', // Amy Burns
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: '66aa86ec55074dc87fe22666', // Balazs Orban
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: '66aa86ec55074dc87fe22661', // Evil Rabbit
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: '66aa86ec55074dc87fe22662', // Delba de Oliveira
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: '66aa86ec55074dc87fe22663', // Lee Robinson
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: '66aa86ec55074dc87fe22664', // Michael Novotny
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: '66aa86ec55074dc87fe22665', // Amy Burns
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: '66aa86ec55074dc87fe22666', // Balazs Orban
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: '66aa86ec55074dc87fe22661', // Evil Rabbit
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];


const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, customers, invoices, revenue };
