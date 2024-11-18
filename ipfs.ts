export type MetadataType = {
  Title: any;
  Thumbnail: any;
  Notes: any;
  Video: any;
};
export async function uploadToIpfs(newMetadata: MetadataType) {
  try {
    const data = JSON.stringify({
      pinataContent: {
        ...newMetadata,
      },
      pinataMetadata: {
        name: `${newMetadata.Title}.json`,
      },
    });

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.JWT}`,
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

export async function uploadToIpfsFile(file: File) {
  const formData = new FormData();
  formData.append("file", file); // Attach the file to FormData

  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.JWT}`, // Pinata JWT for authorization
      },
      body: formData, // FormData object containing the file
    });

    const resData = await res.json();

    // Check if IPFS hash is returned and construct the URI
    if (resData.IpfsHash) {
      return `https://gateway.pinata.cloud/ipfs/${resData.IpfsHash}`; // Full IPFS URI
    } else {
      throw new Error("Error uploading file to IPFS");
    }
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw new Error("Error uploading file to IPFS");
  }
}

//is the IPFS hash the metadata URI?
