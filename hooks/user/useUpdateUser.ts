import { updateUser as updateUserApi, User } from "@/services/apiUsers";
import { useMutation } from "@tanstack/react-query";

function useUpdateUser() {
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: ({
      user,
      walletAddress,
    }: {
      user: User;
      walletAddress: string;
    }) => updateUserApi(user, walletAddress),

    onSuccess: (data) => {
      console.log({ updateData: data });
      console.log("User profile update");
    },

    onError: (error) => {
      console.log(`Error updating user profile: ${error.message}`);
    },
  });

  return { updateUser, isPending };
}

export { useUpdateUser };
