"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { UpdateAppUserSchema } from "~/lid/dtos";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function UpdateProfile() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<UpdateAppUserSchema>>({});
  const [bgColor, setBgColor] = useState("bg-blue-50");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get current user data
  const { data: user, isLoading } = api.appUser.getAppUser.useQuery();
  const updateUser = api.appUser.updateAppUser.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      router.push("/app-user");
    },
    onError: (error) => {
      toast.error(error.message);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateUser.mutateAsync(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Change background color on input
    const colors = ["bg-blue-50", "bg-purple-50", "bg-pink-50", "bg-indigo-50"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setFormData(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${bgColor} transition-colors duration-1000 ease-in-out`}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg"
        >
          <h1 className="mb-8 text-3xl font-bold text-gray-900">Update Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {isSubmitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/80"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <div className="mt-2 flex items-center space-x-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  {(previewImage || user?.image) && (
                    <Image
                      src={previewImage || user?.image || ""}
                      alt="Profile picture"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Change Photo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                defaultValue={user?.firstName || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                defaultValue={user?.lastName || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                defaultValue={user?.phoneNumber || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                defaultValue={user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white shadow-lg transition-colors hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
