("use strict");
gsap.registerPlugin(ScrollTrigger, SplitText);

const homePageAnimations = () => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const pageLoadAnim = () => {
    const landingPageContainer = document.querySelector(
      ".landing-main_container"
    );
    gsap.set(landingPageContainer, { autoAlpha: 0 });

    const pageloadTl = gsap.timeline();

    pageloadTl
      .set(landingPageContainer, { autoAlpha: 1 })
      .to("[data-text-reveal]", {
        opacity: 1,
        y: 0,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
        duration: 1,
      })
      .from(
        "[data-image-reveal]",
        {
          autoAlpha: 0,
          stagger: 0.1,
        },
        "-=0.45"
      );
  };

  pageLoadAnim();
};

const cardReceivePageAnimations = () => {
  const cardReceivePageLoad = () => {
    const cardReceiveTl = gsap.timeline();

    cardReceiveTl
      .to("[data-left-sticky='image'], [data-right-sticky='image']", {
        scale: 1,
        delay: 0.3,
        duration: 1,
      })
      .to("[data-reveal-text]", {
        opacity: 1,
        y: 0,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        stagger: 0.2,
        ease: "power3.out",
        duration: 1,
      });
  };

  cardReceivePageLoad();

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
            pin: true,
            scrub: true,
            toggleActions: "play none none none",
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
            scrub: true,
            pin: true,
            onLeave: () => {
              if (
                document.querySelector(".c-slider").getBoundingClientRect()
                  .top < 0
              ) {
                confetti({
                  spread: 3000,
                  particleCount: 2000,
                });
              }
            },
          },
        });

        tl.to(".inner-card_container", {
          rotate: -30,
          xPercent: -51.5,
          yPercent: -7,
          ease: "none",
        }).to(".inner-card_container", {
          rotate: -60,
          xPercent: isDesktop ? -98.5 : -107,
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

      console.log("working now for me what about you");
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
        opacityValue < 0.1
          ? 0.1
          : opacityValue > 1
          ? 1
          : opacityValue.toFixed(3);

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
    targetProgress = Math.round((scroll / limit) * 100);

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
};

function pageTransition() {
  const tl = gsap.timeline();

  // Slide in from top
  tl.fromTo(
    ".c-page_transition",
    { top: "100%" },
    { top: "0", duration: 1, ease: "expo.inOut" }
  );

  tl.fromTo(
    "[data-transition-text]",
    {
      y: "100%",
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      ease: "power4.out",
    },
    {
      y: "0%",
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      stagger: 0.2,
      duration: 0.6,
    }
  ),
    "-=0.9";

  // Hold for content switch
  tl.to(".c-page_transition", { top: "0", duration: 0.2 });

  // Slide out to bottom
  tl.to(".c-page_transition", {
    top: "-100%",
    duration: 1,
    ease: "power4.in",
  });

  // Reset position after animation
  tl.set(".c-page_transition", { top: "-100%" });
  tl.set("[data-transition-text]", {
    y: "100%",
  });

  return tl;
}

// Function to initialize animations for the incoming page
function initAnimations(namespace) {
  if (namespace === "home") {
    // Home page animations
    homePageAnimations();
  } else if (namespace === "card-receive") {
    // About page animations
    cardReceivePageAnimations();
  }
}

// Barba.js initialization
barba.init({
  transitions: [
    {
      name: "default-transition",
      async leave(data) {
        const done = this.async();

        // Fade out current page
        await gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.3,
        });

        // Run page transition overlay
        await pageTransition();

        done();
      },

      enter(data) {
        gsap.set(data.next.container, {
          opacity: 0,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
        });

        // Fade in new page
        gsap.to(data.next.container, {
          opacity: 1,
          duration: 0.3,
          onComplete: () => {
            // Clean up positioning
            gsap.set(data.next.container, {
              position: "relative",
            });

            // Initialize page-specific animations
            initAnimations(data.next.namespace);
          },
        });
      },

      once(data) {
        // Initialize animations on first load
        initAnimations(data.next.namespace);
      },
    },
  ],
});

// Add CSS to ensure smooth transitions
const style = document.createElement("style");
style.textContent = `
  .barba-container {
    position: relative;
    width: 100%;
  }
  
  .c-page_transition {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100vw;
    height: 100svh;
    background-color: var(--noise-whiite);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    will-change: transform;
  }
`;
document.head.appendChild(style);
