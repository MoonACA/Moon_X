"use client";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";

import { Course } from "@/services/apiCourses";
import { writeToContract } from "@/services/moonXContract";
import { truncateAddr } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { FaEllipsisV } from "react-icons/fa";
import { toast } from "react-toastify";
import Filter from "./Filter";
import { updateCourseAction } from "@/services/adminActions";

export default function AdminBoard({ courses }: { courses: Course[] }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedId, setSelectedId] = useState<number>();

  const router = useRouter();

  const { writeContract, error } = useWriteContract();

  useEffect(() => {
    if (error) {
      toast.error(error.message);

      updateCourseAction(
        JSON.stringify({ approved: false }),
        String(selectedId!)
      );
    }
  }, [error, selectedId]);

  const handleClick = (event: any, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    try {
      await updateCourseAction(
        JSON.stringify({ approved: true }),
        String(courseId)
      );
      writeToContract(writeContract, {
        functionName: "approveCourse",
        args: [contractId],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case "All Courses":
  //       return "Hi";
  //     case "Active Courses":
  //       return "No";
  //     case "Pending Courses":
  //       return "m";
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className=" bg-[#00122C] py-[10rem] ">
      <div className="w-[80vw] mx-auto max-sm:w-[90vw]">
        {/* card */}
        <div className="bg-[#192A41]  border rounded-xl border-white">
          <div className="p-[1rem] sm:p-[2rem]">
            <Filter courses={courses} />
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
                              <Typography variant="body2" color="textSecondary">
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
                                  handleApprovingCourse(row.id!, row.contractId)
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
  );
}
