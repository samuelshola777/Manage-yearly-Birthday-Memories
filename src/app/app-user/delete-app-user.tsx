"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function DeleteAccount() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = api.appUser.deleteAppUser.useMutation({
    onSuccess: () => {
      toast.success("Account deleted successfully. We'll miss you!");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
      setIsDeleting(false);
    },
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteUser.mutateAsync();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { 
      scale: isHovering ? 0.95 : 1.05,
      rotate: isHovering ? [-1, 1, -1] : 0,
      transition: { duration: 0.3 }
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } },
    exit: { opacity: 0, y: -50 },
  };

  const sadEmojis = ["😢", "😭", "🥺", "😿", "💔"];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 px-4 py-16"
    >
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-xl bg-white p-8 shadow-lg"
        >
          <motion.h1 
            className="mb-6 text-center text-3xl font-bold text-gray-900"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            We'll Be Sad To See You Go {sadEmojis[0]}
          </motion.h1>

          <div className="mb-8 space-y-4 text-center text-gray-600">
            <p>Are you sure you want to delete your account?</p>
            <p>This action cannot be undone and all your data will be permanently deleted.</p>
          </div>

          <div className="flex justify-center">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              onClick={() => setShowModal(true)}
              className="rounded-lg bg-red-500 px-6 py-3 text-white shadow-lg transition-colors hover:bg-red-600"
            >
              Delete Account
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
            >
              {modalStep === 1 && (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mb-4 text-6xl"
                  >
                    {sadEmojis[Math.floor(Math.random() * sadEmojis.length)]}
                  </motion.div>
                  <h3 className="mb-4 text-xl font-bold">Please Don't Go!</h3>
                  <p className="mb-6 text-gray-600">
                    We value your presence in our community. Is there anything we can do to make your experience better?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push("/app-user")}
                      className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      Give Another Chance
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setModalStep(2)}
                      className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                    >
                      Continue Deletion
                    </motion.button>
                  </div>
                </div>
              )}

              {modalStep === 2 && (
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4 text-6xl"
                  >
                    💔
                  </motion.div>
                  <h3 className="mb-4 text-xl font-bold">Final Confirmation</h3>
                  <p className="mb-6 text-gray-600">
                    Are you absolutely sure you want to delete your account? This action cannot be undone.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowModal(false)}
                      className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                      disabled={isDeleting}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDelete}
                      className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ⏳
                        </motion.span>
                      ) : (
                        "Confirm Delete"
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
