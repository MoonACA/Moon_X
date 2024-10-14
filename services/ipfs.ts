const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlNGRmNzc0NC1hODRmLTQzZWYtOWI3MS1iZWZjMDM1ODIyOTIiLCJlbWFpbCI6Im1pY2hhZWxqZXJlbWlhaDMxM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzYzZDkwN2I5MzJiYzk1NDE0YTEiLCJzY29wZWRLZXlTZWNyZXQiOiIxZjEzZGNiN2JmMTkyZTA0MzE0NDVhMWEyNWFjNzgyYTVhZTNlZTFhNTMwMGFhZjM4ODQxODRmZGMyMDAxNDQ2IiwiZXhwIjoxNzUzNDQ3ODU5fQ.yEMnN334n1vS5VYUp8vsKuz_EqOcxigaXAWkwb61O8M";

export type MetadataType = {
  courseTitle: string;
  courseSubTitle: string;
  courseTopic: string;
  courseCategory: string;
  courseDuration: string;
  courseDescription: string;
};
export async function uploadToIpfs(newMetadata: MetadataType) {
  try {
    const data = JSON.stringify({
      pinataContent: {
        ...newMetadata,
      },
      pinataMetadata: {
        name: `${newMetadata.courseTitle}.json`,
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
