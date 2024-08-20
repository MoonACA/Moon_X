'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

// Define the types for the leaderboard data
interface LeaderboardRow {
  rank: number;
  user: {
    avatar: string;
    wallet: string;
  };
  quizscore: number;
  earnedCoin: {
    amount: number;
    currency: string;
  };
  accountCreated: {
    date: string;
    time: string;
  };
}

// Sample data for the leaderboard
const rows: LeaderboardRow[] = [
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
  <div className="bg-white text-black rounded-md py-1 px-1 md:py-2 md:px-2 flex">
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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8; // Adjust the number of rows per page as needed

  // Calculate the pagination details
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Leaderboard */}
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
              {currentRows.map((row, index) => (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f5f5f5',
                  }}
                >
                  <TableCell>{row.rank}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={row.user.avatar}
                        alt="avatar"
                        style={{ marginRight: 8 }}
                      />
                      <Typography variant="body2">{row.user.wallet}</Typography>
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
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <Pagination
          className="inline-flex"
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
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
  );
}
