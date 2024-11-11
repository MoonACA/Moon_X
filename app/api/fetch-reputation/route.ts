import Web3 from "web3";
import { NextResponse } from "next/server";
import supabase from "@/services/supabase";
import abi from "@/abi/credScoreContractAbi.json";

// Define the type for the request body
type RequestBody = {
  session_id: any;
  user_address: string;
};

// Handle the POST request
export async function POST(req: Request) {
  // Parse the request body
  const { session_id, user_address }: RequestBody = await req.json();

  // Validate inputs
  if (!session_id || !user_address) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  async function authBridge(session_id: any, user_address: any) {
    try {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("session_id", session_id);

      if (data && data.length > 0) {
        return await fetchReputation(user_address);
      } else {
        // Return an explicit response for the error case
        return { message: "Address not signed in", status: 500 };
      }
    } catch (error) {
      return { message: error || "Error", status: 500 };
    }
  }

  async function fetchReputation(user_address: any) {
    try {
      // Initialize the Web3 instance
      const web3 = new Web3(process.env.RPC_URL);

      // Access the contract's ABI
      const credibility_contract_abi = abi.abi;

      // Create contract instance
      const reputation_contract = new web3.eth.Contract(
        credibility_contract_abi,
        process.env.REPUTATION_CONTRACT_ADDRESS
      );

      // Call contract method to get total reputation
      const totalReputation = await reputation_contract.methods
        .totalReputation()
        .call();
      const totalReputationString = totalReputation
        ? totalReputation.toString()
        : "0";

      // Call contract method to get user's reputation
      const user_reputation = await reputation_contract.methods
        .reputation(user_address)
        .call();
      const user_reputation_String = user_reputation
        ? user_reputation.toString()
        : "0";
      const cRED = parseFloat(user_reputation_String) / 100;

      return {
        message: "Reputation fetched",
        total_mande_reputation: totalReputationString,
        user_mande_reputation: cRED,
      };
    } catch (error) {
      return {
        message: error || "Error while fetching reputation",
        status: 500,
      };
    }
  }

  const run_functions = await authBridge(session_id, user_address);

  // Return a response with the appropriate status code
  return NextResponse.json(
    {
      message: run_functions.message,
      total_mande_reputation: run_functions.total_mande_reputation,
      user_mande_reputation: run_functions.user_mande_reputation,
    },
    { status: run_functions.status }
  );
}
