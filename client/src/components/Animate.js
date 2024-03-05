import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export const leftTextIntro = (element) => {
  gsap.from(element, {
    xPercent: -100,
    opacity: 0,
    stagger: 0.2,
    duration: 3,
    ease: "back",
  });
};

export const rightTextIntro = (element) => {
  gsap.from(element, {
    xPercent: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 3,
    ease: "back",
  });
};

export const fadeInIntro = (element) => {
  let underline = document.querySelector(".underline");
  let comma = document.querySelectorAll(".comma");
  let fade = document.querySelectorAll(".fade");

  gsap
    .timeline()
    //, mySplitText = new SplitText(element, {type: "words, chars"}), chars = mySplitText.chars;

    .from(
      element,
      {
        opacity: 0,
        // scale: 0,
        duration: 2,
        delay: 3,
      },
      "<"
    )
    .fromTo(underline, { width: "0%" }, { width: "100%" })
    .fromTo(comma, { opacity: 0 }, { opacity: 1, duration: 2 }, "<");
};

export const pulseInfinite = (element) => {
  gsap
    .timeline({ repeat: -1 })
    .fromTo(
      element,
      {
        y: 0,
      },
      {
        y: 5,
      }
    )
    .to(element, {
      y: 0,
    });
};

export const fadeIn = (element, delay) => {
  let fade = element;

  gsap.timeline().fromTo(
    fade,
    {
      opacity: 0,
    },
    { opacity: 1, duration: 2, delay: delay }
  );
};

export const ballAnimation = () => {
  const ball = document.querySelector("#ballImg");
  const ww = window.innerWidth;
  const wh = window.innerHeight;
  let requestId;

  const path01 = [{ x: ww / 2 - 75, y: 0 }];

  var action = gsap
    .timeline({ paused: true })
    .set(ball, { x: -ww / 2 - 50, autoAlpha: 1 })
    .to(ball, {
      motionPath: {
        path: path01,
        start: 0.1,
      },
      duration: 1,
      rotation: 360 * 4,
    });

  const startY = 0;
  const finishDistance = (wh / 2) * 1.5;
  document.addEventListener("scroll", function () {
    if (!requestId) {
      requestId = requestAnimationFrame(update);
    }
  });

  update();

  function update() {
    action.progress((scrollY - startY) / finishDistance);
    requestId = null;
  }
};

export const signupAnimation = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#signUpDiv",
      // scrub: true,
      // pin: true,
      // markers: true,
      start: "top center",
      end: "+=100"
    },
  });
  tl.from("#gameHeader", { opacity:0, duration: 4});
};
