import confetti from 'canvas-confetti';

// 胜利时庆祝的礼花效果
export function wonEffect() {
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const timer = setInterval(() => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(100, 200),
      origin: { y: 0.6 },
    });
  }, 800);

  setTimeout(() => {
    clearInterval(timer);
  }, 3000);
}
