// import Web3 from "web3";
// import { NextResponse } from "next/server";
// import supabase from "@/supabase";
// import abi from "@/abi/moonx.json";
// import { uploadToIpfs } from "@/ipfs";
// import { uploadToIpfsFile } from "@/ipfs";

// type RequestBody = {
//   session_id: string;
//   user_address: string;
//   title: string;
//   thumbnail: File; // Treating these as File objects
//   notes: string;
//   video: File;
// };

// async function fileToBuffer(file: File): Promise<Buffer> {
//   const arrayBuffer = await file.arrayBuffer();
//   return Buffer.from(arrayBuffer);
// }

// export async function POST(req: Request) {
//   try {
//     // Parse request body
//     const {
//       session_id,
//       user_address,
//       title,
//       thumbnail,
//       notes,
//       video,
//     }: RequestBody = await req.json();

//     // Validate required fields
//     if (!session_id || !user_address || !title || !thumbnail || !notes) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Step 1: Authenticate user session
//     const authResponse = await authBridge(session_id, user_address);
//     if (authResponse.status !== 200) {
//       return NextResponse.json(authResponse, { status: authResponse.status });
//     }

//     // Step 2: Upload metadata (thumbnail, video) to IPFS and get the URI
//     const metadataURI = await uploadMetadataToIPFS({
//       title,
//       thumbnail,
//       notes,
//       video,
//     });

//     // Step 3: Call the createCourse function on-chain using the metadata URI
//     const courseCreationResponse = await createCourseOnChain(
//       user_address,
//       metadataURI
//     );
//     if (courseCreationResponse.status !== 200) {
//       return NextResponse.json(courseCreationResponse, {
//         status: courseCreationResponse.status,
//       });
//     }

//     // Step 4: Save the course data to Supabase after successful on-chain creation
//     const dbResponse = await saveCourseToDB(user_address, metadataURI);
//     return NextResponse.json(dbResponse, { status: dbResponse.status });
//   } catch (error) {
//     return NextResponse.json(
//       { message: error || "Server error" },
//       { status: 500 }
//     );
//   }
// }

// // Authenticate user session using Supabase
// async function authBridge(session_id: string, user_address: string) {
//   try {
//     const { data } = await supabase
//       .from("users")
//       .select("*")
//       .eq("session_id", session_id)
//       .eq("user_address", user_address);

//     if (data && data.length > 0) {
//       return { message: "User authenticated", status: 200 };
//     } else {
//       return { message: "User not authenticated", status: 401 };
//     }
//   } catch (error) {
//     return {
//       message: error || "Error authenticating user",
//       status: 500,
//     };
//   }
// }

// // Upload course metadata to IPFS and return metadata URI
// async function uploadMetadataToIPFS(metadata: {
//   title: string;
//   thumbnail: File;
//   notes: string;
//   video: File;
// }) {
//   try {
//     // Step 1: Upload the thumbnail and video files to IPFS

//     // Convert File objects to Buffer
//     const thumbnailURI = await uploadToIpfsFile(metadata.thumbnail);
//     const videoURI = await uploadToIpfsFile(metadata.video);

//     // Step 2: Create the metadata object
//     const metadataObject = {
//       Title: metadata.title,
//       Thumbnail: thumbnailURI,
//       Notes: metadata.notes,
//       Video: videoURI,
//     };

//     // Step 3: Upload the metadata object to IPFS
//     const ipfsResponse = await uploadToIpfs(metadataObject);

//     // Return metadata URI from IPFS
//     return ipfsResponse.uri;
//   } catch (error) {
//     throw new Error("Error uploading metadata to IPFS");
//   }
// }

// // Call the contract to create a course on-chain using the metadata URI
// async function createCourseOnChain(user_address: string, metadataURI: string) {
//   try {
//     const web3 = new Web3(process.env.RPC_URL);
//     const moonx_abi = abi.abi;
//     const moonx_contract = new web3.eth.Contract(
//       moonx_abi,
//       process.env.MOONX_CONTRACT_ADDRESS
//     );

//     // Estimate gas and create course on-chain
//     const txResponse = await moonx_contract.methods
//       .createCourse(metadataURI)
//       .send({ from: user_address }); // or .call

//     return {
//       message: "Course successfully created on-chain",
//       status: 200,
//       txHash: txResponse.transactionHash,
//     };
//   } catch (error) {
//     return {
//       message: error || "Error creating course on-chain",
//       status: 500,
//     };
//   }
// }

// // Save
