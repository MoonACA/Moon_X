import Web3 from "web3";
import { NextResponse } from "next/server";
import supabase from "@/supabase";
import { createClient } from "@supabase/supabase-js";
import abi from "@/abi/moonx.json";
//import { ethers } from "ethers";

type RequestBody = {
  session_id: any;
  user_address: string;
  _metadataURI: string;
};

export async function POST(req: Request) {
  const { session_id, user_address, _metadataURI }: RequestBody =
    await req.json();
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
        return await createCourse(session_id, user_address, _metadataURI);
      } else {
        // Return an explicit response for the error case
        return { message: "Address not signed in", status: 500 };
      }
    } catch (error) {
      return { message: error || "Error", status: 500 };
    }
  }
  async function createCourse(
    session_id: any,
    user_address: any,
    metadataURI: any
  ) {
    try {
      const web3 = new Web3(process.env.RPC_URL);
      const moonx_abi = abi.abi;
      const moonx_contract = new web3.eth.Contract(
        moonx_abi,
        process.env.MOONX_CONTRACT_ADDRESS
      );
      const postCourse = await moonx_contract.methods
        .createCourse(_metadataURI)
        .call();
      return {
        message: "Course Created",
        status: 200,
      };
    } catch (error) {
      return {
        message: error || "Error creating course",
        status: 500,
      };
    }
  }
}
