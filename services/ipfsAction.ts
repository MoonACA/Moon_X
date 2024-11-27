"use server";

import { Course } from "./apiCourses";

const JWT = process.env.JWT || "";

export async function uploadToIpfs(data: string) {
  const newMetadata: Course = JSON.parse(data);
  try {
    const data = JSON.stringify({
      pinataContent: {
        ...newMetadata,
      },
      pinataMetadata: {
        name: `${newMetadata.title}.json`,
      },
    });

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      body: data,
    });
    const resData = await res.json();
    console.log(resData.IpfsHash);
    return resData.IpfsHash;
  } catch (error) {
    console.log("Error adding file to IPFS", error);
  }
}
