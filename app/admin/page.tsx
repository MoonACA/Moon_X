"use client";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { IoCopy, IoCheckmarkSharp } from "react-icons/io5";
import { useClipboard } from "@/hooks/useClipBoard";
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
} from "@mui/material";
import React from "react";
import { useAccount, useWriteContract } from "wagmi";

import { FaEllipsisV } from "react-icons/fa";
import { useCourses } from "@/hooks/course/useCourses";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { truncateAddr } from "@/utils/helpers";
import { useUpdateCourse } from "@/hooks/course/useUpdateCourse";
import { writeToContract } from "@/services/moonXContract";
import { toast } from "react-toastify";

const rows = [
  {
    Instructor: {
      avatar: "/path-to-avatar1.jpg",
      name: "Cyntia Boyega",
      handle: "@cyntia",
    },
    courseTitle: "Introduction to Blockchain",
    category: "BlockChain",
    dateCreated: {
      date: "12 Jul 2024",
      time: "08:45 AM",
    },
    status: "active", // or 'pending'
    action: "viewcourse", // or 'approve course'
  },
  {
    Instructor: {
      avatar: "/path-to-avatar1.jpg",
      name: "John Oke",
      handle: "@John",
    },
    courseTitle: "Introduction to Blockchain",
    category: "BlockChain",
    dateCreated: {
      date: "12 Jul 2024",
      time: "08:45 AM",
    },
    status: "pending", // or 'pending'
    action: "viewcourse", // or 'approve course'
  },
  {
    Instructor: {
      avatar: "/path-to-avatar1.jpg",
      name: "Faith Donatus",
      handle: "@Faith",
    },
    courseTitle: "Introduction to Blockchain",
    category: "BlockChain",
    dateCreated: {
      date: "12 Jul 2024",
      time: "08:45 AM",
    },
    status: "active", // or 'pending'
    action: "viewcourse", // or 'approve course'
  },
  {
    Instructor: {
      avatar: "/path-to-avatar1.jpg",
      name: "Cyntia Boyega",
      handle: "@cyntia",
    },
    courseTitle: "Introduction to Blockchain",
    category: "BlockChain",
    dateCreated: {
      date: "12 Jul 2024",
      time: "08:45 AM",
    },
    status: "pending", // or 'pending'
    action: "viewcourse", // or 'approve course'
  },
  {
    Instructor: {
      avatar: "/path-to-avatar1.jpg",
      name: "Faith Donatus",
      handle: "@Faith",
    },
    courseTitle: "Introduction to Blockchain",
    category: "BlockChain",
    dateCreated: {
      date: "12 Jul 2024",
      time: "08:45 AM",
    },
    status: "active", // or 'pending'
    action: "viewcourse", // or 'approve course'
  },
  {
    Instructor: {
      avatar: "/path-to-avatar1.jpg",
      name: "Faith Donatus",
      handle: "@Faith",
    },
    courseTitle: "Introduction to Blockchain",
    category: "BlockChain",
    dateCreated: {
      date: "12 Jul 2024",
      time: "08:45 AM",
    },
    status: "active", // or 'pending'
    action: "viewcourse", // or 'approve course'
  },
  {
    Instructor: {
      avatar: "/path-to-avatar1.jpg",
      name: "Cyntia Boyega",
      handle: "@cyntia",
    },
    courseTitle: "Introduction to Blockchain",
    category: "BlockChain",
    dateCreated: {
      date: "12 Jul 2024",
      time: "08:45 AM",
    },
    status: "pending", // or 'pending'
    action: "viewcourse", // or 'approve course'
  },
];

export default function Admin() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedId, setSelectedId] = useState<number>();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");
  const [activeTab, setActiveTab] = useState(
    !activeStatus ? "all" : activeStatus
  );

  const { courses, isLoading } = useCourses();

  const [copySuccess, setCopySuccess] = useState("");

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  useEffect(() => {
    if (!activeStatus) return;
    setActiveTab(activeStatus);
  }, [activeStatus]);

  const { address } = useAccount();
  const { writeContract, error } = useWriteContract();
  const { copyToClipboard, copied: hasCopiedKey } = useClipboard();

  const { updateCourse, updatingCourse } = useUpdateCourse();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      updateCourse({ id: selectedId!, updates: { approved: false } });
    }
  }, [error, selectedId, updateCourse]);

  const handleClick = (event: any, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    copyToClipboard(`${address}`);
  };

  const approveStatus = (status: boolean) => {
    if (status) {
      return "active";
    }
    return "pending";
  };

  const formatDate = (date: string) => {
    const dateString = new Date(date).toDateString();
    const localeTime = new Date(date).toLocaleTimeString();

    return { dateString, localeTime };
  };

  const handleApprovingCourse = async (
    courseId: number,
    contractId: number
  ) => {
    setSelectedId(courseId);
    updateCourse(
      { id: courseId, updates: { approved: true } },
      {
        onSuccess: () => toast.success("Course successfully updated"),
      }
    );
    writeToContract(writeContract, {
      functionName: "approveCourse",
      args: [contractId],
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "All Courses":
        return "Hi";
      case "Active Courses":
        return "No";
      case "Pending Courses":
        return "m";
      default:
        return null;
    }
  };

  if (isLoading) return null;
  return (
    courses && (
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
                        border: "2px solid white", // 2px white border
                      }}
                    />
                    <div className="mt-1">
                      <p className="text-white text-sm md:text-lg">Admin</p>
                      <p className="text-white md:text-sm text-xs gap-2">
                        {truncateAddr(address)}
                        <span
                          className="inline-flex mr-1"
                          onClick={handleCopy}
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          <IoCopy
                            style={{
                              color: "transparent", // Makes the inside of the icon transparent
                              stroke: "white", // Changes the outline color to white
                              strokeWidth: "30",
                            }}
                          />{" "}
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
                    onClick={() => {
                      router.push(pathName);
                      setActiveTab("all");
                    }}
                    className={`w-24 md:w-64 h-12 md:h-16 text-sm md:text-base rounded-md flex items-center justify-center transition duration-500  ${
                      activeTab === "all"
                        ? "bg-[#FFEECB] font-semibold text-black"
                        : "text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black"
                    }`}
                  >
                    All Courses
                    {!activeStatus && (
                      <span
                        className={`ml-1 md:ml-4 inline-flex text-xs font-bold rounded-full w-4 h-4 md:h-6 md:w-6 items-center justify-center ${
                          activeTab === "all"
                            ? "bg-[#17315C] text-white "
                            : "bg-white text-[#17315C]"
                        }`}
                      >
                        {courses.length}
                      </span>
                    )}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      router.push(
                        pathName + "?" + createQueryString("status", "active")
                      );
                      setActiveTab("active");
                    }}
                    className={`w-24 md:w-64 h-12 md:h-16 text-sm  md:text-base focus:text-black  rounded-md flex items-center justify-center transition duration-500  ${
                      activeTab === "active"
                        ? "bg-[#FFEECB] font-semibold text-black"
                        : "text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black"
                    }`}
                  >
                    Active Courses
                    {activeStatus == "active" && (
                      <span
                        className={`ml-1 md:ml-4 inline-flex text-xs font-bold rounded-full w-4 h-4 md:h-6 md:w-6 items-center justify-center ${
                          activeTab === "active"
                            ? "bg-[#17315C] text-white "
                            : "bg-white text-[#17315C]"
                        }`}
                      >
                        {courses.length}
                      </span>
                    )}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      router.push(
                        pathName + "?" + createQueryString("status", "pending")
                      );
                      setActiveTab("pending");
                    }}
                    className={`w-24 md:w-64 h-12 md:h-16 text-sm md:text-base    focus:text-black rounded-md flex items-center justify-center transition duration-500  ${
                      activeTab == "pending"
                        ? "bg-[#FFEECB] font-semibold text-black"
                        : "text-white hover:bg-[#ffeecb] hover:font-semibold hover:text-black"
                    }`}
                  >
                    Pending Courses
                    {activeStatus == "pending" && (
                      <span
                        className={`ml-1 md:ml-4 inline-flex text-xs font-bold rounded-full w-4 h-4 md:h-6 md:w-6 items-center justify-center ${
                          activeTab === "pending"
                            ? "bg-[#17315C] text-white "
                            : "bg-white text-[#17315C]"
                        }`}
                      >
                        {courses.length}
                      </span>
                    )}
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
                      {courses.map((row, index) => (
                        <TableRow
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "white" : "#f5f5f5",
                          }}
                        >
                          <TableCell>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Avatar
                                src={"/path-to-avatar1.jpg"}
                                alt={row.creators?.fullName || ""}
                              />
                              <div style={{ marginLeft: "8px" }}>
                                <Typography variant="body1">
                                  {row.creators?.displayName}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {row.creators?.displayName ||
                                    truncateAddr(row.creatorAddress)}
                                </Typography>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{row.category || "Blockchain"}</TableCell>
                          <TableCell>
                            {formatDate(row.created_at!).dateString} <br />{" "}
                            {formatDate(row.created_at!).localeTime}
                          </TableCell>
                          <TableCell>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  backgroundColor: row.approved
                                    ? "#28a745"
                                    : "#ffc107",
                                  marginRight: "8px",
                                }}
                              />
                              <Typography
                                variant="body2"
                                style={{
                                  color: row.approved ? "#28a745" : "#ffc107",
                                }}
                              >
                                {approveStatus(row.approved!)
                                  .charAt(0)
                                  .toUpperCase() +
                                  approveStatus(row.approved!).slice(1)}
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
                              <MenuItem
                                onClick={handleClose}
                                onClickCapture={() =>
                                  router.push(`/courses/${row.id}`)
                                }
                              >
                                View Course
                              </MenuItem>
                              {!row.approved && (
                                <MenuItem
                                  onClick={handleClose}
                                  onClickCapture={() =>
                                    handleApprovingCourse(
                                      row.id!,
                                      row.contractId
                                    )
                                  }
                                >
                                  Approve Course
                                </MenuItem>
                              )}
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
    )
  );
}
