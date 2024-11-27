import { PostgrestError } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

export interface User {
  id?: number;
  walletAddress: string;
  fullName?: string;
  profilePicture?: string | File | Blob;
  displayName?: string;
  bio?: string;
  enrolledCourses?: Array<number>;
}

const TABLE_NAME = "creators";

async function createGetUser(newUser: User): Promise<User> {
  if (!newUser.walletAddress) throw new Error("Please pass a wallet address");
  const { user: userData, error: getUserError } = await getUserByWalletAddress(
    newUser.walletAddress
  );

  if (getUserError) {
    console.log(getUserError);
  }

  if (userData) {
    return userData;
  }
  const { data: newUserData, error } = await supabase
    .from(TABLE_NAME)
    .insert([newUser])
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }

  return newUserData;
}

async function updateUser(newUser: User) {
  let ppPath;
  let hasBaseUrl = String(newUser.profilePicture).startsWith(supabaseUrl);
  let ppName;
  if (!hasBaseUrl) {
    const pp = newUser.profilePicture as File;
    ppName = `${Math.random()}-${pp.name
      .replaceAll("/", "")
      .replaceAll(" ", "")}`;
    ppPath = `${supabaseUrl}/storage/v1/object/public/profilePictures/${ppName}`;
  } else {
    ppPath = newUser.profilePicture;
  }

  const { data: user, error } = await supabase
    .from(TABLE_NAME)
    .update({ ...newUser, profilePicture: ppPath })
    .eq("walletAddress", newUser.walletAddress)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }

  if (!hasBaseUrl) {
    await uploadProfilePicture(newUser, ppName!);
  }

  return user;
}

async function getUserByWalletAddress(
  walletAddress: string
): Promise<{ user: User; error: PostgrestError | null }> {
  let { data: user, error } = await supabase
    .from(TABLE_NAME)
    .select()
    .eq("walletAddress", walletAddress)
    .single();
  return { user, error };
}

async function uploadProfilePicture(newUser: User, ppName: string) {
  const { error: storageError } = await supabase.storage
    .from("profilePictures")
    .upload(ppName, newUser.profilePicture!);

  if (storageError) {
    throw new Error("Error uploading profile picture ");
  }
}

export { createGetUser, updateUser, getUserByWalletAddress };
