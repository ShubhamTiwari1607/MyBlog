import { useMemo } from "react";

function random(max) {
  return Math.floor(Math.random() * max);
}

function makeStarPairs(count, width, height) {
  return Array.from({ length: count }, () => {
    return `${random(width)}px ${random(height)}px #FFF, ${random(width)}px ${random(height)}px #FFF`;
  });
}

export default function RisingStar({
  size = 512,
  width = 1920,
  height = 1080,
  className = "",
}) {
  const smallStars = useMemo(
    () => makeStarPairs(size, width, height),
    [size, width, height]
  );

  const mediumStars = useMemo(
    () => makeStarPairs(Math.max(1, Math.floor(size / 2)), width, height),
    [size, width, height]
  );

  const largeStars = useMemo(
    () => makeStarPairs(Math.max(1, Math.floor(size / 4)), width, height),
    [size, width, height]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-indigo-900 to-black" />

      <div
        className="absolute inset-0 w-px h-px bg-transparent animate-[risingstar_333s_linear_infinite]"
        style={{ boxShadow: smallStars.join(",") }}
      />

      <div
        className="absolute inset-0 w-[2px] h-[2px] bg-transparent animate-[risingstar_666s_linear_infinite]"
        style={{ boxShadow: mediumStars.join(",") }}
      />

      <div
        className="absolute inset-0 w-[3px] h-[3px] bg-transparent animate-[risingstar_999s_linear_infinite]"
        style={{ boxShadow: largeStars.join(",") }}
      />

      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}