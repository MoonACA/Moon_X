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
                
                await CreateUserData(user_address);

                return { message: "User created", status: 200 };
            } else {
                return { message: "User already exists", status: 200 };
            }
        } catch (error) {
            return { message: error || "Error during user lookup", status: 500 };
        }
    }

    async function CreateUserData(user_address: string) {

        // Generate UUID for user_id
        const user_id = uuidv4();

        // Properly concatenate "moonx_session" with the generated UUID
        const session_id = `moonx_session_${user_id}`;

        const status = "online";

        try {
            const { error } = await supabase
                .from("users")
                .insert({
                    "address": user_address,
                    "user_id": user_id,
                    "session_id": session_id,
                    "status": status,
                });
            if (error) {
                return { message: "Error while creating account", status: 500 };
            }
        } catch (error) {
            return { message: error || "Error during account creation", status: 500 };
        }
    }

    const run_functions = await CheckIfAddressExists(user_address);
    return NextResponse.json(run_functions, { status: 200 });
}
