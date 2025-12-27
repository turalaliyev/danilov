import { useState, useRef } from "react";
import { BsPlay, BsPause } from "react-icons/bs";
import { CgMouse } from "react-icons/cg";
import videoBg from "../assets/video_2025-12-24_12-27-14.mp4";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative text-white h-[85vh] min-h-[500px]">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center z-10">
          <div className="text-white relative px-4">
            <h1 className="text-4xl sm:text-4xl md:text-5xl tracking-widest mb-4 uppercase font-bold drop-shadow-lg">
              One step higher
            </h1>
            <a
              href="#collections"
              className="relative inline-block text-sm uppercase tracking-[0.15em] pb-1 border-b border-white hover:text-gray-200 hover:border-gray-200 transition-colors"
            >
              Discover More
            </a>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-10 left-0 right-0 px-8 md:px-12 flex justify-between items-end z-20">
          {/* Play/Pause Button (Left) */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center hover:bg-white/10 transition-colors group relative"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <BsPause size={20} className="text-white ml-" />
            ) : (
              <BsPlay size={24} className="text-white ml-[3px]" />
            )}
          </button>

          {/* Scroll Indicator (Right) */}
          <div className="flex flex-col items-center gap-2 animate-bounce-slow">
             <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
             <div className="w-[1px] h-8 bg-white/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down"></div>
             </div>
             {/* Alternatively use an icon like Santoni often does or just text */}
             <div className="border border-white/30 rounded-full p-2 hidden"> {/* Hidden if preferring the line style */}
                <CgMouse size={20} /> 
             </div>
          </div>
        </div>
        
        {/* Inline Styles for Animation (Tailwind config update would be better but this works directly) */}
        <style>{`
          @keyframes dash {
            from { stroke-dashoffset: 144.5; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes scroll-down {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .animate-scroll-down {
            animation: scroll-down 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
          }
        `}</style>

      </div>
    </section>
  );
}
