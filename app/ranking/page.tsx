'use client';
import { FiFilter } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import React, { ChangeEvent, useState } from 'react';
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
  Pagination,
  PaginationItem,
  Stack,
} from '@mui/material';

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

// Custom Previous Button Component
const PreviousButton = () => (
  <div className="bg-white text-black rounded-md py-1 px-1 md:py-2 md:px-2  flex">
    <FaLongArrowAltLeft className="mr-1 mt-1" />
    Previous
  </div>
);

// Custom Next Button Component
const NextButton = () => (
  <div className="bg-white text-black rounded-md px-1 py-1 md:py-2 md:px-2 flex">
    <FaLongArrowAltRight className="mr-1 mt-1" />
    Next
  </div>
);
export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows); // Initial rows
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter rows based on search term (searching in wallet address)
    const filtered = rows.filter((row) =>
      row.user.wallet.toLowerCase().includes(value)
    );
    setFilteredRows(filtered);
  };

  // For simplicity, assume the filter does something specific, like sorting by rank
  const handleFilterClick = () => {
    const sortedRows = [...filteredRows].sort((a, b) => a.rank - b.rank);
    setFilteredRows(sortedRows);
  };

  return (
    <div className=" bg-[#00122C] py-[10rem] ">
      <div className=" w-[80vw] mx-auto max-sm:w-[98vw]">
        <div className="bg-[#192A41]  border rounded-[2rem] border-white">
          <div className="bg-[#00122C] rounded-t-[2rem]  flex  items-center py-[3rem] justify-center">
            <h3 className="text-white  text-lg">Leaderboard</h3>{' '}
          </div>
          <hr className="bg-white  h-[2px]" />
          <div className="bg-[#192A41] rounded-[2rem]  py-[1rem]">
            <div className="flex justify-between gap-2 md:gap-0 items-center px-3 ">
              <div className="relative w-[20rem] md:w-[30rem] md:flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border border-white bg-none pl-10 rounded-lg p-[0.3rem]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch />
                </div>
              </div>
              <div
                onClick={handleFilterClick}
                className="py-2 px-2 rounded-md gap-2 bg-white flex items-center justify-center cursor-pointer"
              >
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
                    {filteredRows.map((row, index) => (
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
            <div className="flex justify-center items-center">
              <Pagination
                className="inline-flex"
                count={7}
                shape="rounded"
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    sx={{
                      color: item.selected ? 'black' : 'white',
                      backgroundColor: item.selected
                        ? 'white !important'
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: item.selected
                          ? 'white'
                          : 'rgba(255, 255, 255, 0.08)',
                      },
                    }}
                    components={{
                      previous: PreviousButton,
                      next: NextButton,
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
