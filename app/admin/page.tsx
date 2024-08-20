'use client';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { IoCopy } from 'react-icons/io5';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';

import { FaEllipsisV } from 'react-icons/fa';

const rows = [
  {
    Instructor: {
      avatar: '/path-to-avatar1.jpg',
      name: 'Cyntia Boyega',
      handle: '@cyntia',
    },
    courseTitle: 'Introduction to Blockchain',
    category: 'BlockChain',
    dateCreated: {
      date: '12 Jul 2024',
      time: '08:45 AM',
    },
    status: 'active', // or 'pending'
    action: 'viewcourse', // or 'approve course'
  },
  {
    Instructor: {
      avatar: '/path-to-avatar1.jpg',
      name: 'John Oke',
      handle: '@John',
    },
    courseTitle: 'Introduction to Blockchain',
    category: 'BlockChain',
    dateCreated: {
      date: '12 Jul 2024',
      time: '08:45 AM',
    },
    status: 'pending', // or 'pending'
    action: 'viewcourse', // or 'approve course'
  },
  {
    Instructor: {
      avatar: '/path-to-avatar1.jpg',
      name: 'Faith Donatus',
      handle: '@Faith',
    },
    courseTitle: 'Introduction to Blockchain',
    category: 'BlockChain',
    dateCreated: {
      date: '12 Jul 2024',
      time: '08:45 AM',
    },
    status: 'active', // or 'pending'
    action: 'viewcourse', // or 'approve course'
  },
  {
    Instructor: {
      avatar: '/path-to-avatar1.jpg',
      name: 'Cyntia Boyega',
      handle: '@cyntia',
    },
    courseTitle: 'Introduction to Blockchain',
    category: 'BlockChain',
    dateCreated: {
      date: '12 Jul 2024',
      time: '08:45 AM',
    },
    status: 'pending', // or 'pending'
    action: 'viewcourse', // or 'approve course'
  },
  {
    Instructor: {
      avatar: '/path-to-avatar1.jpg',
      name: 'Faith Donatus',
      handle: '@Faith',
    },
    courseTitle: 'Introduction to Blockchain',
    category: 'BlockChain',
    dateCreated: {
      date: '12 Jul 2024',
      time: '08:45 AM',
    },
    status: 'active', // or 'pending'
    action: 'viewcourse', // or 'approve course'
  },
  {
    Instructor: {
      avatar: '/path-to-avatar1.jpg',
      name: 'Faith Donatus',
      handle: '@Faith',
    },
    courseTitle: 'Introduction to Blockchain',
    category: 'BlockChain',
    dateCreated: {
      date: '12 Jul 2024',
      time: '08:45 AM',
    },
    status: 'active', // or 'pending'
    action: 'viewcourse', // or 'approve course'
  },
  {
    Instructor: {
      avatar: '/path-to-avatar1.jpg',
      name: 'Cyntia Boyega',
      handle: '@cyntia',
    },
    courseTitle: 'Introduction to Blockchain',
    category: 'BlockChain',
    dateCreated: {
      date: '12 Jul 2024',
      time: '08:45 AM',
    },
    status: 'pending', // or 'pending'
    action: 'viewcourse', // or 'approve course'
  },
];
export default function Admin() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClick = (event: any, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = () => {
    const textToCopy = '000x1234567890';
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Reset after 2 seconds
      },
      () => {
        setCopySuccess('Failed to copy');
      }
    );
  };
  const [activeTab, setActiveTab] = useState('All Courses');
  const renderContent = () => {
    switch (activeTab) {
      case 'All Courses':
        return 'Hi';
      case 'Active Courses':
        return 'No';
      case 'Pending Courses':
        return 'm';
      default:
        return null;
    }
  };
  return (
    <div className=" bg-[#00122C] py-[10rem] ">
      <div className="w-[80vw] mx-auto max-sm:w-[90vw]">
        {/* card */}
        <div className="bg-[#192A41]  border rounded-xl border-white">
          <div className="p-[1rem] sm:p-[2rem]">
            {/* for menu */}
            <div className="flex items-center justify-between mb-3 sm:mb-7 ">
              <div className="flex items-center justify-between mb-3 sm:mb-7 ">
                <div className="flex gap-4">
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      width: { xs: 40, sm: 56 }, // 40px width for mobile, 56px for larger screens
                      height: { xs: 40, sm: 56 }, // 40px height for mobile, 56px for larger screens
                      border: '2px solid white', // 2px white border
                    }}
                  />
                  <div className="mt-1">
                    <p className="text-white text-sm md:text-lg">Admin</p>
                    <p className="text-white md:text-sm text-xs gap-2">
                      000x1234567890{' '}
                      <span
                        className="inline-flex mr-1"
                        onClick={handleCopy}
                        style={{ cursor: 'pointer' }}
                      >
                        {' '}
                        <IoCopy
                          style={{
                            color: 'transparent', // Makes the inside of the icon transparent
                            stroke: 'white', // Changes the outline color to white
                            strokeWidth: '30',
                          }}
                        />{' '}
                      </span>
                      {copySuccess && (
                        <span className="ml-2">{copySuccess}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* for tab */}
            <div className="flex items-center justify-between gap-2 md:gap-0">
              <div>
                <button
                  onClick={() => setActiveTab('All Courses')}
                  className={`w-24 md:w-64 h-12 md:h-16 text-sm md:text-base rounded-md flex items-center justify-center transition duration-500  ${
                    activeTab === 'All Courses'
                      ? 'bg-[#FFEECB] font-semibold text-black'
                      : 'text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black'
                  }`}
                >
                  All Courses
                  <span
                    className={`ml-1 md:ml-4 inline-flex text-xs font-bold rounded-full w-4 h-4 md:h-6 md:w-6 items-center justify-center ${
                      activeTab === 'All Courses'
                        ? 'bg-[#17315C] text-white '
                        : 'bg-white text-[#17315C]'
                    }`}
                  >
                    5
                  </span>
                </button>
              </div>
              <div>
                <button
                  onClick={() => setActiveTab('Active Courses')}
                  className={`w-24 md:w-64 h-12 md:h-16 text-sm  md:text-base  text-white focus:text-black  rounded-md flex items-center justify-center transition duration-500  ${
                    activeTab === 'Active Courses'
                      ? 'bg-[#FFEECB] font-semibold text-black'
                      : 'text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black'
                  }`}
                >
                  Active Courses
                  <span
                    className={`ml-1 md:ml-4 inline-flex text-xs font-bold rounded-full w-4 h-4 md:h-6 md:w-6 items-center justify-center ${
                      activeTab === 'Active Courses'
                        ? 'bg-[#17315C] text-white '
                        : 'bg-white text-[#17315C]'
                    }`}
                  >
                    5
                  </span>
                </button>
              </div>
              <div>
                <button
                  onClick={() => setActiveTab('Pending Courses')}
                  className={`w-24 md:w-64 h-12 md:h-16 text-sm md:text-base   text-white focus:text-black rounded-md flex items-center justify-center transition duration-500  ${
                    activeTab === 'Pending Courses'
                      ? 'bg-[#FFEECB] font-semibold text-black'
                      : 'text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black'
                  }`}
                >
                  Pending Courses
                  <span
                    className={`ml-1 md:ml-4 inline-flex text-xs font-bold rounded-full w-4 h-4 md:h-6 md:w-6 items-center justify-center ${
                      activeTab === 'Pending Courses'
                        ? 'bg-[#17315C] text-white '
                        : 'bg-white text-[#17315C]'
                    }`}
                  >
                    5
                  </span>
                </button>
              </div>
            </div>
            <hr className="bg-white h-[2px] md:-ml-7 md:-mr-7 mt-2 mb-3 sm:mb-7" />
            {/* table */}
            <div className="mt-4">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Instructor</TableCell>
                      <TableCell>Course Title</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Date Created</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
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
                        <TableCell>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Avatar
                              src={row.Instructor.avatar}
                              alt={row.Instructor.name}
                            />
                            <div style={{ marginLeft: '8px' }}>
                              <Typography variant="body1">
                                {row.Instructor.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {row.Instructor.handle}
                              </Typography>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{row.courseTitle}</TableCell>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>
                          {row.dateCreated.date} <br /> {row.dateCreated.time}
                        </TableCell>
                        <TableCell>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <span
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor:
                                  row.status === 'active'
                                    ? '#28a745'
                                    : '#ffc107',
                                marginRight: '8px',
                              }}
                            />
                            <Typography
                              variant="body2"
                              style={{
                                color:
                                  row.status === 'active'
                                    ? '#28a745'
                                    : '#ffc107',
                              }}
                            >
                              {row.status.charAt(0).toUpperCase() +
                                row.status.slice(1)}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => handleClick(event, row)}
                          >
                            <FaEllipsisV />
                          </IconButton>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl) && selectedRow === row}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={handleClose}>
                              View Course
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              Approve Course
                            </MenuItem>
                          </Menu>
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
