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

async function createGetUser(newUser: User) {
  if (!newUser.walletAddress) throw new Error("Please pass a wallet address");
  const { user: userData, error: getUserError } = await getUserByWalletAddress(
    newUser.walletAddress
  );
  if (userData) {
    return userData;
  }
  const { data: newUserData, error } = await supabase
    .from("creators")
    .insert([newUser])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }

  return newUserData;
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

async function getUserByWalletAddress(
  walletAddress: string
): Promise<{ user: User; error: PostgrestError | null }> {
  let { data: user, error } = await supabase
    .from("users")
    .select()
    .eq("walletAddress", walletAddress)
    .single();

  return { user, error };
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

export { createGetUser, updateUser, getUserByWalletAddress, getUserById };
