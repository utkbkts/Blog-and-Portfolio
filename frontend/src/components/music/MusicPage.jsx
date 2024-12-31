import { useEffect, useRef } from "react";

const MusicPage = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const playMusic = () => {
      audioRef.current.play().catch(() => {
        console.log("Müzik başlatılamadı. Kullanıcı etkileşimi gerekebilir.");
      });
    };

    playMusic();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/jingle.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPage;
