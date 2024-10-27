"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  const self = await getSelf();

  let blockedUser;

  try {
    blockedUser = await blockUser(id);
  } catch {
    // this means user is guest
  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {
    // this means user not in the room
  }

  revalidatePath(`/u/${self.username}/community`);

  return blockedUser;
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
