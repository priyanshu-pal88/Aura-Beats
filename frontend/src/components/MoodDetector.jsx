import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const MoodDetector = ({ setSongs }) => {
  const videoRef = useRef();
  const [mood, setMood] = useState("");


  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
  };


  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Camera error:", err));
  };

  const detectMood = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const detectedMood = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );
      setMood(detectedMood);
      
    } else {
      setMood("No face detected");
    }
  };

  useEffect(() => {
    if (mood && mood !== "No face detected") {

      axios.get(`http://localhost:3000/songs?mood=${mood}`)
    .then((response) => {
      setSongs(response.data.songs);
    })
    .catch((error) => {
      console.error("Error fetching songs:", error);
    });
    }
  }, [mood]);
    
  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

   return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto text-white p-8
                     rounded-3xl   ">
     

    
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          width="320"
          height="320"
          className="rounded-2xl  border-4 border-indigo-400/60 shadow-2xl"
        />
 
        <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/70 animate-pulse"></div>
      </div>

      <button
        onClick={detectMood}
        className="mt-8 mb-6 px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                   hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
                   text-white text-lg font-semibold rounded-xl shadow-lg 
                   transition-all duration-300 transform hover:scale-105"
      >
        Detect Mood
      </button>

   <div className="h-12 flex items-center justify-center">
  {mood && (
    <h3 className="text-2xl font-bold tracking-wide">
      Detected Mood:{" "}
      <span className="text-yellow-400 drop-shadow-lg">{mood}</span>
    </h3>
  )}
</div>

    </div>
  );
};

export default MoodDetector;
