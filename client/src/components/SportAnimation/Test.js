const backLines = anime({
  targets: ".soccer1_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function(el, i) {
    return 1000 + i * 50;
  },
  autoplay: false
});

const bodyLines = anime({
  targets: ".soccer1_line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function(el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});

const ballLines = anime({
  targets: ".soccer1ball > .soccer1ball-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function(el, i) {
    return 1000 + i * 140;
  },
  autoplay: false
});

function step1_ballTL() {
  const ball = gsap.timeline({
    onStart: function () {
      ballLines.play();
    },
  });
  ball
    .fromTo(
      ".soccer1ball > g:nth-child(1) > *",

      { scale: 0, stagger: { each: 0.5 } },
      { scale: 1, stagger: { each: 0.2 } }
    )
    .to(".soccer1ball", {
      duration: 3,
      rotation: 760,
      x: 2000,
      transformOrigin: "50% 50%",
      ease: "power1.out",
      delay: 1,
    })
    .to(".soccer1ball", { duration: 1, autoAlpha: 0 }, "-=1");
  return ball;
}


const bodyLines = gsap.timeline({
  delay: 0.5,
});

bodyLines.fromTo(
  ".soccer_line > *",
  { scale: 0, opacity: 0 },
  { duration: 2, stagger: 0.1, opacity: 1, autoAlpha: 1, ease: "sine.inOut" }
);