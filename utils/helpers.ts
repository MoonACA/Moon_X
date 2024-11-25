function truncateAddr(walletAddress: string | undefined) {
  if (!walletAddress) return;
  const len = walletAddress.length;
  const firstPart = walletAddress.slice(0, 5);
  const lastPart = walletAddress.slice(len - 5, len);
  return `${firstPart}...${lastPart}`;
}

function fileToBlob(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(new Blob([reader.result || ""], { type: file.type }));
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export { truncateAddr, fileToBlob, sleep };
