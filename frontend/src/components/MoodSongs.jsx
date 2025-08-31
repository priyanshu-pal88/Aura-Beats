import React, { useState } from "react";

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div className="w-full text-white px-6 py-10 flex flex-col items-center gap-6 mt-10 
                    bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-xl">
      
      {/* Heading */}
      <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Songs Based on Your Mood
      </h2>
      <p className="text-sm text-gray-300 italic mb-6">
        Curated just for how you’re feeling ✨
      </p>

      {/* Song List */}
      <div className="w-full flex flex-col gap-4">
        {Songs?.length > 0 ? (
          Songs.map((song, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-2xl 
                         bg-gradient-to-r from-gray-800/60 to-gray-900/40 
                         border border-white/10 shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Song Info */}
              <div>
                <h1 className="text-lg font-semibold">{song.title}</h1>
                <h2 className="text-sm text-gray-400">{song.artist}</h2>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {isPlaying === index && (
                  <audio
                    src={song.audio}
                    controls
                    className="hidden"
                    autoPlay
                  ></audio>
                )}
                <button
                  onClick={() => handlePlayPause(index)}
                  className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition 
                             shadow-lg hover:scale-110 transform"
                >
                  {isPlaying === index ? (
                    <i className="ri-pause-fill text-xl"></i>
                  ) : (
                    <i className="ri-play-fill text-xl"></i>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic text-center">
            🎵 No songs to show yet. Detect a mood first!
          </p>
        )}
      </div>
    </div>
  );
};

export default MoodSongs;
