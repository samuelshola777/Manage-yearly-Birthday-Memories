'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { api } from '~/trpc/react';
import UpdateProfile from './update-profile';
import DeleteAppUser from './delete-app-user';
import { useState } from 'react';

export default function AppUserDashboard() {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const { data: user, isLoading } = api.appUser.getAppUser.useQuery();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/20"
          variants={itemVariants}
        >
          <div className="p-10">
            <div className="text-center mb-12">
              {user?.image ? (
                <motion.div
                  className="relative w-40 h-40 mx-auto mb-6 ring-4 ring-blue-100 rounded-full overflow-hidden shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={user.image}
                    alt="Profile"
                    className="rounded-full object-cover"
                    fill
                    priority
                  />
                </motion.div>
              ) : (
                <motion.div 
                  className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-xl ring-4 ring-blue-100"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-5xl text-gray-600 font-semibold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </motion.div>
              )}
              <motion.h1 
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Welcome back, {user?.firstName}!
                </motion.span>
                {" "}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  👋
                </motion.span>
                {" "}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  ✨
                </motion.span>
                {" "}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  🎉
                </motion.span>
                {" "}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  🌟
                </motion.span>
              </motion.h1>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={itemVariants}
            >
              <div className="space-y-6">
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-sm"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-sm font-medium text-blue-600 mb-2">Full Name</h3>
                  <p className="text-xl font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-sm"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-sm font-medium text-purple-600 mb-2">Email</h3>
                  <p className="text-xl font-semibold text-gray-800">{user?.email}</p>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div 
                  className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-sm"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-sm font-medium text-indigo-600 mb-2">Phone Number</h3>
                  <p className="text-xl font-semibold text-gray-800">{user?.phoneNumber}</p>
                </motion.div>

                {user?.dateOfBirth && (
                  <motion.div 
                    className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-2xl shadow-sm"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-sm font-medium text-pink-600 mb-2">Date of Birth</h3>
                    <p className="text-xl font-semibold text-gray-800">
                      {new Date(user?.dateOfBirth).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div className="mt-12 space-y-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                onClick={() => setShowUpdateProfile(true)}
              >
                ✏️ Update Profile
              </motion.button>

              <motion.div
                className="border-t-2 border-red-100 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="bg-gradient-to-r from-red-900/10 to-red-950/20 p-8 rounded-2xl border-2 border-red-500/50 shadow-lg backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.03,
                    rotate: [-0.5, 0.5],
                    transition: {
                      rotate: {
                        repeat: Infinity,
                        duration: 0.3,
                        repeatType: "reverse"
                      }
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    boxShadow: ["0px 0px 0px rgba(220,38,38,0.2)", "0px 0px 20px rgba(220,38,38,0.4)", "0px 0px 0px rgba(220,38,38,0.2)"]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity
                    },
                    duration: 0.4
                  }}
                >
                  <motion.h3 
                    className="text-3xl font-black text-red-600 mb-3 flex items-center gap-3"
                    animate={{ 
                      scale: [1, 1.02, 1],
                      color: ["#dc2626", "#ef4444", "#dc2626"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    <motion.div
                      className="flex gap-2"
                      animate={{ rotate: [0, 20, 0, -20, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span>⚠️</span>
                      <span>💀</span>
                      <span>☠️</span>
                    </motion.div>
                    DANGER ZONE
                    <motion.div
                      className="flex gap-2"
                      animate={{ rotate: [0, -20, 0, 20, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span>👻</span>
                      <span>⚰️</span>
                      <span>🔪</span>
                    </motion.div>
                  </motion.h3>
                  <motion.p 
                    className="text-red-500 mb-6 text-lg font-medium flex items-center gap-2"
                    animate={{
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  >
                    <motion.span
                      animate={{ x: [-2, 2, -2] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      🚫
                    </motion.span>
                    Warning: This section contains irreversible actions that will permanently affect your account.
                    <motion.span
                      animate={{ x: [2, -2, 2] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ⛔
                    </motion.span>
                  </motion.p>
                  <DeleteAppUser />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showUpdateProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowUpdateProfile(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <UpdateProfile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
