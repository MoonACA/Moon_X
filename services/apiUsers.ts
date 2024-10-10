import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";

export interface User {
  id?: number;
  walletAddress?: string;
  fullName?: string;
  profilePicture?: string;
  username?: string;
  bio?: string;
}

async function createUser(newUser: User) {
  if (!newUser.walletAddress) throw new Error("Please pass a wallet address");
  const user = await getUserByWalletAddress(newUser.walletAddress);
  if (user) {
    throw new Error(`User already exists`);
  }
  const { error } = await supabase.from("users").insert([newUser]);
  if (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

async function updateUser(user: User, walletAddress: string) {
  console.log(user, "user");

  const { error } = await supabase
    .from("users")
    .update(user)
    .eq("walletAddress", walletAddress);

  if (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

async function getUserByWalletAddress(walletAddress: string): Promise<User> {
  let { data: user, error } = await supabase
    .from("users")
    .select()
    .eq("walletAddress", walletAddress)
    .single();

  if (error) {
    throw new Error(`Error getting user: ${error.message}`);
  }
  return user;
}

async function getUserById(id: number): Promise<User> {
  console.log("userId", id);
  const { data: user, error } = await supabase
    .from("users")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }

  return user;
}

export { createUser, updateUser, getUserByWalletAddress, getUserById };
