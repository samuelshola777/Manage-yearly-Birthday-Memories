'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { type AppUser } from '@prisma/client';

interface AppUserDashboardProps {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    image: string | null;
    dateOfBirth: Date | null;
  };
}

export default function AppUserDashboard({ user }: AppUserDashboardProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              {user.image ? (
                <motion.div
                  className="relative w-32 h-32 mx-auto mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
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
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-gray-500">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                </div>
              )}
              <motion.h1 
                className="text-3xl font-bold text-gray-900"
                variants={itemVariants}
              >
                Welcome, {user.firstName}!
              </motion.h1>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <div className="space-y-4">
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="text-lg text-gray-900">{user.firstName} {user.lastName}</p>
                </motion.div>

                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-lg text-gray-900">{user.email}</p>
                </motion.div>
              </div>

              <div className="space-y-4">
                <motion.div 
                  className="bg-gray-50 p-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="text-lg text-gray-900">{user.phoneNumber}</p>
                </motion.div>

                {user.dateOfBirth && (
                  <motion.div 
                    className="bg-gray-50 p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                    <p className="text-lg text-gray-900">
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
