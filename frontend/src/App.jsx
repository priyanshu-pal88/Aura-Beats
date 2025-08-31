import React, { useState } from "react";
import MoodDetector from "./components/MoodDetector";
import MoodSongs from "./components/MoodSongs";

const App = () => {
  const [Songs, setSongs] = useState([]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-ping"></div>


      <div className="relative z-10 w-full max-w-4xl mx-auto p-6 md:p-10 
                      bg-white/10 backdrop-blur-lg border border-white/20 
                      rounded-3xl shadow-2xl flex flex-col items-center space-y-10">


        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
          Aura Beats 🎶
        </h1>


        <MoodDetector setSongs={setSongs} />


        <MoodSongs Songs={Songs} />
      </div>
    </div>
  );
};

export default App;
