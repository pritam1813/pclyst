"use client";
import React, { useEffect, useState } from "react";
import asset1 from "@/public/notfoundassets/asset1.svg";
import asset2 from "@/public/notfoundassets/asset2.svg";
import asset3 from "@/public/notfoundassets/asset3.svg";
import Link from "next/link";
import Image from "next/image";
import "./notfoundstyle.css";

const NotFound = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audioObj = new Audio(
      "https://pub-809f9c8ac2b2431fb6b9a607885ffc8d.r2.dev/Stranger%20Things%20%20Title%20Sequence%20%5BHD%5D%20%20Netflix.mp3"
    );
    setAudio(audioObj);
    audioObj.play();
  }, []);

  return (
    <main className="container mx-auto my-10">
      <div className="flex justify-center">
        <Image src={asset1} alt="Error Text" />
      </div>
      <div className="flex justify-center">
        <Image src={asset2} alt="Description" />
      </div>
      <div className="flex justify-center">
        <Link href="/">
          <Image src={asset3} alt="Go Home link" />
        </Link>
      </div>
      <button onClick={toggleAudio}>{isPlaying ? "Mute" : "Unmute"}</button>
    </main>
  );
};

export default NotFound;
