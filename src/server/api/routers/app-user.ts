import { registerAppUserSchema, updateAppUserSchema } from "~/lid/dtos";
import bcrypt from "bcrypt";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import { v2 as cloudinary } from "cloudinary";
import { TRPCError } from "@trpc/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

export const registerAppUser = publicProcedure.input(registerAppUserSchema).mutation(async ({ input, ctx }) => {
    try{
        const { first_name, last_name, phone_number, email, password, profile_picture, date_of_birth } = input;
        
        if (!first_name || !last_name || !email || !password) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Missing required fields',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePictureUrl = null;
        if (profile_picture && typeof profile_picture === 'string' && profile_picture.trim() !== '') {
            const uploadResult = await cloudinary.uploader.upload(profile_picture, {
                upload_preset: "traders-bloc",
                public_id: email,
            });
            profilePictureUrl = uploadResult.secure_url;
        }
        console.log("Profile picture URL:", profilePictureUrl);
        const userData = {
            firstName: first_name,
            lastName: last_name,
            email: email,
            password: hashedPassword,
            phoneNumber: phone_number || null,
            image: profilePictureUrl || null,
            dateOfBirth: date_of_birth || null,
          
        };
        console.log("User data:sss", userData);

      
            const appUser = await ctx.db.appUser.create({
                data: userData
            });

      
        // console.log("App user:", appUser);

        // if(!appUser) {
        //     throw new TRPCError({
        //         code: 'INTERNAL_SERVER_ERROR',
        //         message: 'Failed to register user',
        //     });
        // }

        return {
            success: true,
            user: {
                id: appUser.id,
                email: appUser.email,
                firstName: appUser.firstName,
                lastName: appUser.lastName,
                phoneNumber: appUser.phoneNumber,
                image: appUser.image,
                dateOfBirth: appUser.dateOfBirth
            }
        };

    }catch(error){
        console.error("Here is the error:", error)
    }

})

// export const appUserRouter = createTRPCRouter({
//     registerAppUser: publicProcedure.input(registerAppUserSchema).mutation(async ({ input, ctx }) => {
//         try {
//             const { first_name, last_name, phone_number, email, password, profile_picture, date_of_birth } = input;
//             const hashedPassword = await bcrypt.hash(password, 10);

//             let profilePictureUrl = null;
//             if (profile_picture && typeof profile_picture === 'string' && profile_picture.trim() !== '') {
//                 const uploadResult = await cloudinary.uploader.upload(profile_picture, {
//                     upload_preset: "traders-bloc",
//                     public_id: email,
//                 });
//                 profilePictureUrl = uploadResult.secure_url;
//             }
            
//             const appUser = await prisma.appUser.create({
//                 data: {
//                     firstName: first_name,
//                     lastName: last_name, 
//                     phoneNumber: phone_number,
//                     email: email,
//                     password: hashedPassword as string,
//                     image: profilePictureUrl,
//                     dateOfBirth: date_of_birth
//                 }
//             });

//             return {
//                 success: true,
//                 user: {
//                     id: appUser.id,
//                     email: appUser.email,
//                     firstName: appUser.firstName,
//                     lastName: appUser.lastName,
//                     phoneNumber: appUser.phoneNumber,
//                     image: appUser.image,
//                     dateOfBirth: appUser.dateOfBirth
//                 }
//             };

//         } catch (error) {
//             console.error("Error registering app user:", error);
//             throw new TRPCError({
//                 code: 'INTERNAL_SERVER_ERROR',
//                 message: 'Failed to register user',
//                 cause: error,
//             });
//         }
//     }),


//     getAppUser: protectedProcedure.query(async ({ ctx }) => {
//         const appUser = await ctx.db.appUser.findUnique({
//             where: { id: ctx.session.user.id }
//         });
//         return appUser;
//     }),
// updateAppUser: protectedProcedure.input(updateAppUserSchema).mutation(async ({ input, ctx }) => {
//     const { firstName, lastName, phoneNumber, image, dateOfBirth } = input;
//     let profilePictureUrl = "";
//     if (image) {
//         const uploadResult = await cloudinary.uploader.upload(image, {
//             upload_preset: ctx.session.user.email || "",
//   });
//      profilePictureUrl = uploadResult.secure_url || "";
//     }
//     const appUser = await ctx.db.appUser.update({
//         where: { id: ctx.session.user.id },
//         data: { firstName, lastName, phoneNumber, image: profilePictureUrl || "", dateOfBirth }
//     });
//     return appUser;
// }),
// deleteAppUser: protectedProcedure.mutation(async ({ ctx }) => {
//     await ctx.db.appUser.delete({
//         where: { id: ctx.session.user.id }
//     });
//     return { success: true };
// }),
// });     