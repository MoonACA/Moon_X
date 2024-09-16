import { NextResponse } from 'next/server';
import supabase from '@/supabase';
import { v4 as uuidv4 } from 'uuid';

// Define the type for the request body
type RequestBody = {
    user_address: string;
};

// Handle the POST request
export async function POST(req: Request) {
    // Parse the request body
    const { user_address }: RequestBody = await req.json();

    async function CheckIfAddressExists(user_address: string) {
        try {
            const { data } = await supabase
                .from('users')
                .select('*')
                .eq('address', user_address);

            if (data && data.length > 0) {
                return await UpdateUserSession(user_address);
            } else {
                return await CreateUserData(user_address);
            }
        } catch (error) {
            return { message: error || "Error during user lookup", status: 500 };
        }
    }

    async function CreateUserData(user_address: string) {

        try {

            // Generate UUID for user_id
            const user_id = uuidv4();

            // Properly concatenate "moonx_session" with the generated UUID
            const session_id = `moonx_session_${user_id}`;

            const status = "online";

            const { error } = await supabase
                .from("users")
                .insert({
                    "address": user_address,
                    "user_id": user_id,
                    "session_id": session_id,
                    "status": status,
                });
            if (error) {
                return { message: "Error while updating account", status: 500 };
            }else{
                return { message: "Account created", session_id: session_id,status: 500 }; 
            }
        } catch (error) {
            return { message: error || "Error during account creation", status: 500 };
        }
    }

    async function UpdateUserSession(user_address : string) {

        try {

            // Generate UUID for user_id
            const user_id = uuidv4();

            // Properly concatenate "moonx_session" with the generated UUID
            const session_id = `moonx_session_${user_id}`;

            const { data, error } = await supabase
                .from('users')
                .update({ status: "online", session_id: session_id })
                .eq('address', user_address)
                .select();
            if(error){
                return { message: "Address does not exist", status: 500 };
            }else{
                return { message: "Signed in", session_id: session_id, status: 200 };
            }

        } catch (error) {
            return { message: error || "Address does not exist", status: 500 };
        }

    }

    const run_functions = await CheckIfAddressExists(user_address);
    return NextResponse.json(run_functions, { status: 200 });
}
