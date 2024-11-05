("use strict");
gsap.registerPlugin(ScrollTrigger, SplitText);

let mm = gsap.matchMedia(),
  breakPoint = 750;

mm.add(
  {
    isDesktop: `(min-width: ${breakPoint}px)`,
    isMobile: `(max-width: ${breakPoint - 1}px)`,
    reduceMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    let { isDesktop, isMobile, reduceMotion } = context.conditions;

    // Hero Sticky Animation
    const heroStickyAnim = () => {
      gsap.to(".c-container_grow", {
        scale: isDesktop ? 4 : 3,
        duration: 0.1,
        //   delay: 1,
        scrollTrigger: {
          trigger: ".c-hero",
          start: "top top",
          scrub: 1,
          pin: true,
          onLeave: () => {
            gsap.to(".card-flip_front", { opacity: 0 });
          },
        },
      });
    };

    heroStickyAnim();

    // Flower reveal effect
    const flowerRevealAnim = () => {
      const revealFlowersTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".c-birthday_note",
          start: "top top",
          end: "+=800",
          markers: true,
          pin: true,
          scrub: true,
          toggleActions: "play none none none",
          // once: true,
        },
      });

      revealFlowersTl
        .to(".left-flower", {
          yPercent: -60,
          autoAlpha: 1,
          onComplete: () => {
            gsap.to(".left-flower", { autoAlpha: 0 });
          },
        })
        .to(".middle-flower", {
          yPercent: -60,
          autoAlpha: 1,
          onComplete: () => {
            gsap.to(".middle-flower", { autoAlpha: 0 });
          },
        })
        .to(".right-flower", {
          yPercent: -60,
          autoAlpha: 1,
          onComplete: () => {
            gsap.to(".right-flower", { autoAlpha: 0 });
          },
        });
    };

    flowerRevealAnim();

    // Slider rotate Anim
    const sliderRotateAnim = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".c-slider",
          start: "top top",
          // end: "400% top",
          scrub: true,
          markers: true,
          pin: true,
        },
      });

      tl.to(".inner-card_container", {
        rotate: -30,
        xPercent: -51.5,
        yPercent: -7,
        ease: "none",
      }).to(".inner-card_container", {
        rotate: -60,
        xPercent: -98.5,
        yPercent: 41.5,
        ease: "none",
      });
    };

    sliderRotateAnim();

    const letterWrapperReveal = () => {
      gsap.from(".letter-wrapper", {
        rotation: "0",
        y: 100,
        scrollTrigger: {
          trigger: ".c-letter",
          start: "top 50%",
          end: "+=400",
          scrub: 1,
          markers: true,
        },
      });
    };

    letterWrapperReveal();

    // Sticky Images reveal
    const sayCheeseAnim = () => {
      const stickyImages = gsap.utils.toArray(".sticky-image_wrapper");
      const xValues = ["50%", "-50%", "50%", "-50%", "50%"];
      const rotateValues = ["-10deg", "10deg", "-10deg", "10deg", "-10deg"];

      stickyImages.forEach((image, index) => {
        gsap.from(image, {
          rotation: rotateValues[index % rotateValues.length],
          x: xValues[index % xValues.length],
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: image,
            start: "top 90%",
            end: "+=500px",
            scrub: 1,
          },
        });
      });

      // Camera shutter effect
      const cameraShutterEffect = gsap.fromTo(
        ".c-camera",
        { scale: 0, opacity: 0 },
        {
          scale: 1.2,
          opacity: 0.95,
          duration: 0.1,
          ease: "power4.out",
          onComplete: () => {
            gsap.to(".c-camera", {
              scale: 1,
              duration: 0.1,
              opacity: 1,
              ease: "elastic.out(1, 0.5)",
            });
          },
          scrollTrigger: {
            trigger: ".c-gallery_holder",
            start: "top 20%",
          },
        }
      );
    };

    sayCheeseAnim();
  }
);

let paragraphs = [...document.querySelectorAll("[data-opacity-reveal]")];
let spans = [];

paragraphs.forEach((paragraph) => {
  let htmlString = "";
  let pArray = paragraph.textContent.split("");

  for (let i = 0; i < pArray.length; i++) {
    htmlString += `<span>${pArray[i]}</span>`;
  }

  paragraph.innerHTML = htmlString;
});

spans = [...document.querySelectorAll("span")];

function revealSpans() {
  for (let i = 0; i < spans.length; i++) {
    let { left, top } = spans[i].getBoundingClientRect();
    top = top - window.innerHeight * 0.5;

    let opacityValue = 1 - (top * 0.01 + left * 0.001);
    opacityValue =
      opacityValue < 0.1 ? 0.1 : opacityValue > 1 ? 1 : opacityValue.toFixed(3);

    spans[i].style.opacity = opacityValue;
  }
}

window.addEventListener("scroll", revealSpans);
revealSpans();

// Scroll position update
let currentProgress = 0;
let targetProgress = 0;

// Update the progress text with smooth animation
const updateProgressText = (progress) => {
  // Round the progress to whole number
  const roundedProgress = Math.round(progress);

  gsap.to(".scroll-progress_value", {
    innerText: roundedProgress,
    duration: 0.1,
    modifiers: {
      innerText: (value) => `${Math.round(value)}`,
    },
  });
};

// Initialize Lenis scroll listener
lenis.on("scroll", ({ scroll, limit }) => {
  // Calculate and round target progress percentage
  targetProgress = Math.round((scroll / limit) * 100);

  // Smoothly interpolate current progress to target
  gsap.to(
    { value: currentProgress },
    {
      value: targetProgress,
      duration: 0.1,
      ease: "power2.out",
      snap: { value: 1 },
      onUpdate: function () {
        currentProgress = Math.round(this.targets()[0].value);
        updateProgressText(currentProgress);
      },
    }
  );
});

// Update on window resize
window.addEventListener("resize", () => {
  const scrollTop = lenis.scroll;
  const scrollHeight = getScrollHeight();
  targetProgress = Math.round((scrollTop / scrollHeight) * 100);
  updateProgressText(targetProgress);
});
