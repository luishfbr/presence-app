import React from "react";

interface CountProps {
  countdown: number;
  loading: boolean;
}

export default function Count({ countdown, loading }: CountProps) {
  return (
    <div className="flex text-center items-center gap-[1vh] justify-center">
      <div
        className={`w-[9vw] h-[5vh] flex items-center bg-white/10 backdrop-blur-lg justify-center rounded-full border-[0.4vw] ${
          countdown <= 5
            ? "border-red-400 text-red-400"
            : "border-gray-400 text-gray-400"
        } ${
          loading === true
            ? "border-gray-900 text-gray-900"
            : "border-white/80 text-white/80"
        }`}
      >
        <p className="text-[3vw]">{countdown}</p>
      </div>
    </div>
  );
}
