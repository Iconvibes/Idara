import { useEffect } from 'react';

export default function Confetti() {
  useEffect(() => {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.fall = Math.random() * 3 + 2;
        this.swing = Math.random() * 2 - 1;
        this.color = ['#ff6b9d', '#ff9a9e', '#fecdd3', '#ffb6c1'][
          Math.floor(Math.random() * 4)
        ];
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      update() {
        this.y += this.fall;
        this.x += this.swing;

        if (this.y > canvas.height) {
          this.y = -this.size;
          this.x = Math.random() * canvas.width;
        }
      }
    }

    // Create initial confetti
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas id="confetti-canvas"></canvas>;
}
