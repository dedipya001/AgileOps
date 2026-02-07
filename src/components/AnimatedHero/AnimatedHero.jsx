import { useEffect, useRef } from "react";
import "./AnimatedHero.css";

export default function AnimatedDashboardBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    let t = 0;

    const resize = () => {
      const parentHeight =
        canvas.parentElement?.clientHeight || 400;
      width = canvas.width = window.innerWidth;
      height = canvas.height = parentHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // background glow
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0a0a1a");
      gradient.addColorStop(1, "#200040");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // animated lines
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();

        for (let x = 0; x < width; x++) {
          const y =
            height / 2 +
            Math.sin(x * 0.01 + t + j) * 30 +
            j * 20;

          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(153, 51, 255, ${0.3 + j * 0.2})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#9933ff";
        ctx.stroke();
      }

      t += 0.03;
      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="dashboard-bg"
    />
  );
}
