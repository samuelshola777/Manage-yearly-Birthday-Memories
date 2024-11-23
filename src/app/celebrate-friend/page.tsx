'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { v2 as cloudinary } from 'cloudinary';
export default function CelebrateFriend() {
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [mediaType, setMediaType] = useState<'text' | 'voice' | 'media'>('text');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);


  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const uploadMedia = async (file: File) => {
    const uploadResult = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
      upload_preset: form.,
    });
    return uploadResult.secure_url;
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.4,
        type: "spring",
        bounce: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        bounce: 0.6,
        duration: 0.8
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-[url('/celebration-confetti.jpg')] bg-cover bg-center bg-fixed relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-blue-900/40" />
      <motion.div 
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          backgroundSize: ['100% 100%', '120% 120%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <div className="min-h-screen backdrop-blur-sm bg-white/10 py-16 px-4 relative">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50"
            variants={itemVariants}
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            <motion.div
              className="text-center mb-16"
              variants={itemVariants}
            >
              <motion.div
                className="text-7xl mb-6 flex justify-center gap-4"
                animate={floatingAnimation}
              >
                <motion.span whileHover={{ scale: 1.3, rotate: 360 }}>🎉</motion.span>
                <motion.span whileHover={{ scale: 1.3, rotate: -360 }}>🎂</motion.span>
                <motion.span whileHover={{ scale: 1.3, rotate: 360 }}>🎈</motion.span>
              </motion.div>
              <motion.h1 
                className="text-5xl font-black"
                animate={{
                  backgroundImage: [
                    'linear-gradient(to right, #4f46e5, #e11d48)',
                    'linear-gradient(to right, #7c3aed, #db2777)',
                    'linear-gradient(to right, #4f46e5, #e11d48)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ WebkitBackgroundClip: 'text', color: 'transparent' }}
              >
                Celebrate Your Friend!
              </motion.h1>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex justify-center space-x-6 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
                    contactMethod === 'email' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                  onClick={() => setContactMethod('email')}
                >
                  <motion.span animate={floatingAnimation}>✉️</motion.span> Email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
                    contactMethod === 'phone' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                  onClick={() => setContactMethod('phone')}
                >
                  <motion.span animate={floatingAnimation}>📱</motion.span> WhatsApp
                </motion.button>
              </div>

              <motion.div
                className="relative"
                initial={false}
                animate={{ height: 'auto' }}
              >
                <input
                  type={contactMethod === 'email' ? 'email' : 'tel'}
                  placeholder={contactMethod === 'email' ? "Enter friend's email" : "Enter WhatsApp number"}
                  className="w-full px-8 py-5 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-500 outline-none text-lg shadow-inner transition-all duration-300 hover:shadow-lg"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex justify-center space-x-6">
                {['text', 'voice', 'media'].map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-2xl font-semibold shadow-lg transition-all duration-300 ${
                      mediaType === type 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                    onClick={() => setMediaType(type as any)}
                  >
                    {type === 'text' && '✍️ Write Message'}
                    {type === 'voice' && '🎤 Voice Note'}
                    {type === 'media' && '📸 Photo/Video'}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {mediaType === 'text' && (
                  <motion.textarea
                    key="text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    placeholder="Write your heartfelt birthday message here... 🎂✨"
                    className="w-full h-48 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 focus:border-purple-500 outline-none text-lg shadow-inner transition-all duration-300 hover:shadow-lg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                )}

                {mediaType === 'voice' && (
                  <motion.div
                    key="voice"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200 shadow-lg"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                      whileTap={{ scale: 0.9 }}
                      animate={isRecording ? { scale: [1, 1.1, 1], transition: { repeat: Infinity } } : {}}
                      className={`p-10 rounded-full ${isRecording ? 'bg-red-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'} text-white text-5xl shadow-xl`}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? '⏹️' : '🎤'}
                    </motion.button>
                    <motion.p 
                      className="mt-6 text-lg font-medium text-purple-800"
                      animate={isRecording ? { opacity: [1, 0.5, 1], transition: { repeat: Infinity } } : {}}
                    >
                      {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
                    </motion.p>
                  </motion.div>
                )}

                {mediaType === 'media' && (
                  <motion.div
                    key="media"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200 shadow-lg"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl text-xl font-semibold shadow-xl"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <motion.span animate={floatingAnimation}>📸</motion.span> Upload Photo/Video
                    </motion.button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*,video/*"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => {
                  toast.success('Birthday wishes sent with love! 🎉', {
                    icon: '🎂',
                    style: {
                      borderRadius: '1rem',
                      background: '#fff',
                      color: '#4c1d95',
                    },
                  });
                }}
              >
                <motion.span animate={floatingAnimation}>
                  Send Birthday Wishes 🎈
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
