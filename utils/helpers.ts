function truncateAddr(walletAddress: string | undefined) {
  if (!walletAddress) return;
  const len = walletAddress.length;
  const firstPart = walletAddress.slice(0, 5);
  const lastPart = walletAddress.slice(len - 5, len);
  return `${firstPart}...${lastPart}`;
}

export { truncateAddr };
