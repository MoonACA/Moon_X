import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
// Sample data for the leaderboard
const rows = [
  {
    rank: 1,
    user: {
      avatar: '/path-to-avatar1.jpg',
      wallet: '0x1234...abcd',
    },
    quizscore: 45,
    earnedCoin: {
      amount: 100,
      currency: 'Mand',
    },
    accountCreated: {
      date: '12 Jul 2024',
      time: '08:45 AM',
    },
  },
  {
    rank: 2,
    user: {
      avatar: '/path-to-avatar2.jpg',
      wallet: '0x5678...efgh',
    },
    quizscore: 35,
    earnedCoin: {
      amount: 75,
      currency: 'Mand',
    },
    accountCreated: {
      date: '10 Jul 2024',
      time: '11:30 AM',
    },
  },
  {
    rank: 2,
    user: {
      avatar: '/path-to-avatar2.jpg',
      wallet: '0x5678...efgh',
    },
    quizscore: 35,
    earnedCoin: {
      amount: 75,
      currency: 'Mand',
    },
    accountCreated: {
      date: '10 Jul 2024',
      time: '11:30 AM',
    },
  },
  {
    rank: 2,
    user: {
      avatar: '/path-to-avatar2.jpg',
      wallet: '0x5678...efgh',
    },
    quizscore: 35,
    earnedCoin: {
      amount: 75,
      currency: 'Mand',
    },
    accountCreated: {
      date: '10 Jul 2024',
      time: '11:30 AM',
    },
  },
  {
    rank: 2,
    user: {
      avatar: '/path-to-avatar2.jpg',
      wallet: '0x5678...efgh',
    },
    quizscore: 35,
    earnedCoin: {
      amount: 75,
      currency: 'Mand',
    },
    accountCreated: {
      date: '10 Jul 2024',
      time: '11:30 AM',
    },
  },
  {
    rank: 2,
    user: {
      avatar: '/path-to-avatar2.jpg',
      wallet: '0x5678...efgh',
    },
    quizscore: 35,
    earnedCoin: {
      amount: 75,
      currency: 'Mand',
    },
    accountCreated: {
      date: '10 Jul 2024',
      time: '11:30 AM',
    },
  },
  {
    rank: 2,
    user: {
      avatar: '/path-to-avatar2.jpg',
      wallet: '0x5678...efgh',
    },
    quizscore: 35,
    earnedCoin: {
      amount: 75,
      currency: 'Mand',
    },
    accountCreated: {
      date: '10 Jul 2024',
      time: '11:30 AM',
    },
  },
  {
    rank: 2,
    user: {
      avatar: '/path-to-avatar2.jpg',
      wallet: '0x5678...efgh',
    },
    quizscore: 35,
    earnedCoin: {
      amount: 75,
      currency: 'Mand',
    },
    accountCreated: {
      date: '10 Jul 2024',
      time: '11:30 AM',
    },
  },
  // Add more rows as needed
];

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Typography,
} from '@mui/material';
export default function page() {
  return (
    <div className=" bg-[#00122C] py-[10rem] ">
      <div className=" w-[80vw] mx-auto max-sm:w-[98vw]">
        <div className="bg-[#192A41]  border rounded-xl border-white">
          <div className="bg-[#00122C] rounded-xl  flex  items-center py-[3rem] justify-center">
            <h3 className="text-white  text-lg">Leaderboard</h3>{' '}
          </div>
          <hr className="bg-white  h-[2px]" />
          <div className="bg-[#192A41] rounded-xl  py-[1rem]">
            <div className="flex justify-between gap-2 md:gap-0 items-center px-3 ">
              <div className="relative w-[20rem] md:w-[30rem] md:flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border border-white bg-none pl-10 rounded-lg p-[0.3rem] "
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch />
                </div>
              </div>
              <div className="py-2 px-2 rounded-md gap-2 bg-white flex items-center justify-center">
                <FiFilter className="" />
                <p>Filter</p>
              </div>
            </div>
            {/* leaderboard */}
            <div className="px-3 py-3">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Quiz Score</TableCell>
                      <TableCell>Earned Coin</TableCell>
                      <TableCell>Account Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? 'white' : '#f5f5f5',
                        }}
                      >
                        <TableCell>{row.rank}</TableCell>
                        <TableCell>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Avatar
                              src={row.user.avatar}
                              alt="avatar"
                              style={{ marginRight: 8 }}
                            />
                            <Typography variant="body2">
                              {row.user.wallet}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell>{row.quizscore}</TableCell>
                        <TableCell>
                          {row.earnedCoin.amount} {row.earnedCoin.currency}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {row.accountCreated.date}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {row.accountCreated.time}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
