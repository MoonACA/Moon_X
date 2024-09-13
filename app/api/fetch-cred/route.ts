import Web3 from 'web3';
import { NextResponse } from 'next/server';
import abi from '@/abi/credScoreContractAbi.json'; // Ensure this path is correct

// Define the type for the request body
type RequestBody = {
  reputation_contract_address: string; // Fixed typo in variable name
  rpc_url: string;
  user_address: string;
};

// Handle the POST request
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { rpc_url, reputation_contract_address, user_address }: RequestBody = await req.json();

    // Validate inputs
    if (!rpc_url || !reputation_contract_address || !user_address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize the Web3 instance
    const web3 = new Web3(rpc_url);

    // Access the contract's ABI
    const credibility_contract_abi = abi.abi;

    // Create contract instance
    const credibility_contract = new web3.eth.Contract(credibility_contract_abi, reputation_contract_address);

    // Call contract method to get total reputation
    const totalReputation = await credibility_contract.methods.totalReputation().call();
    const totalReputationString = totalReputation ? totalReputation.toString() : '0';

    // Call contract method to get user's reputation
    const credScore = await credibility_contract.methods.reputation(user_address).call();
    const credScoreString = credScore ? credScore.toString() : '0';

    // Return a JSON response with the results
    return NextResponse.json({
      status: "Success",
      totalReputation: totalReputationString, 
      userReputation: credScoreString,
    });
    
  } catch (error: any) {
    // Handle and return the error in case of failure
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
