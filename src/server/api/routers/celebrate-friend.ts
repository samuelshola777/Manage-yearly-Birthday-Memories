import { celebrateFriendSchema } from "~/lid/dtos";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import prisma from "~/lid/prisma";

export const celebrateFriendRouter = createTRPCRouter({
    createCelebrateFriend: protectedProcedure.input(celebrateFriendSchema).mutation(async ({ input, ctx }) => {
        const { contactMethod, contact, message, mediaType, media } = input;
      
        if (!ctx.session.user.id) {
            throw new Error("User not found");
        }
        const mediaMessage = await prisma.media.create({
            data: {
              createdAt: new Date(),
              url: media || "",
              type: mediaType || "",
              message: message || ""
            }
        })
      
        // const celebrateFriend = await prisma.celebrateFriend.create({
        //     data: {
        //         contactMethod, contact, message, mediaType, media, createdById: ctx.session.user.id
        //     }
        })
    })
// })