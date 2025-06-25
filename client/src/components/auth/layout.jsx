import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-800"></div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex items-center justify-center w-1/2 relative z-10"
      >
        <motion.div className="max-w-md space-y-6 text-center text-white p-1 rounded-3xl shadow-2xl bg-opacity-20 backdrop-blur-lg ">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">
            Welcome to ClickCollect
          </h1>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl border border-gray-200"
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AuthLayout;
