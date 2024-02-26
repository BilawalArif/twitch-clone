"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
  //TODO: Adapt to disconnect from livestream
  //TODO: Allow ability to kick the guest
  try {
    const blockededUser = await blockUser(id);

    revalidatePath("/");

    if (blockededUser) {
      revalidatePath(`/${blockededUser.blocked.username}`);
    }

    return blockededUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onUnBlock = async (id: string) => {
  try {
    const unBlockedUser = await unblockUser(id);

    revalidatePath("/");

    if (unBlockedUser) {
      revalidatePath(`/${unBlockedUser.blocked.username}`);
    }

    return unBlockedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
