const projectTitle = document.querySelector("[data-project='title']");
const projectNumber = document.querySelector("[data-project='number']");
const imageWrappers = document.querySelectorAll(".project-image_wrapper");
const defaultProjectText = "projects";

const projectItemWrapper = gsap.utils.toArray(".project-item_wrapper");
const navItems = gsap.utils.toArray('[data-nav-line="animate"]');
const projectTitles = gsap.utils.toArray('[data-project-line="animate"]');
const hasBottomBorder = gsap.utils.toArray('[data-section-border="animate"]');

const pageLoadTl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" },
});

// Page load animation
const initLoadAnimation = () => {
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

      pageLoadTl
        .to([".c-nav", ".c-main"], {
          autoAlpha: 1,
          delay: reduceMotion ? 1 : 0,
          duration: reduceMotion ? 2 : 0.1,
        })
        .fromTo(
          hasBottomBorder,
          { "--width": reduceMotion ? "100%" : "0%" },
          {
            "--width": reduceMotion ? "100%" : "100%",
            duration: reduceMotion ? 0 : 2.4,
            ease: "power2.inOut",
          },
          reduceMotion ? "0" : "+=1"
        )
        .from(
          navItems,
          {
            y: reduceMotion ? "0%" : "110%",
            rotation: reduceMotion ? 0 : 4,
            clipPath: reduceMotion
              ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
              : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            stagger: {
              amount: reduceMotion ? 0 : 1.6,
            },
            delay: 0,
          },
          "<"
        )
        .from(
          projectTitles,
          {
            y: reduceMotion ? "0%" : "200%",
            rotation: reduceMotion ? 0 : 4,
            clipPath: reduceMotion
              ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
              : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            stagger: {
              amount: reduceMotion ? 0 : 0.6,
            },
          },
          reduceMotion ? "0" : "-=2"
        )
        .from(
          projectItemWrapper,
          {
            opacity: reduceMotion ? 1 : 0,
            y: reduceMotion ? "0%" : "30%",
            stagger: {
              amount: reduceMotion ? 0 : 2.1,
            },
            rotation: reduceMotion ? 0 : 7,
            filter: reduceMotion ? "blur(0px)" : "blur(3px)",
            ease: "power3.inOut",
          },
          "<"
        );
    }
  );
};

// Reveal page load animation after page load
window.addEventListener("load", initLoadAnimation);

// Swap Project Details on hover interaction
const swapProjectDetails = (projectTitleAttribute, projectNumText) => {
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

      const swapProjectDetailsTl = gsap.timeline({
        defaults: { duration: reduceMotion ? 0 : 1 },
      });

      swapProjectDetailsTl
        .to(projectTitle, {
          y: reduceMotion ? "0%" : "150%",
          rotation: reduceMotion ? 0 : 7,
          onComplete: () => (projectTitle.textContent = projectTitleAttribute),
          ease: "power2.in",
        })
        .to(
          projectNumber,
          {
            y: reduceMotion ? "0%" : "150%",
            rotation: reduceMotion ? 0 : 7,
            onComplete: () => (projectNumber.textContent = projectNumText),
            ease: "power2.in",
          },
          reduceMotion ? 0 : "-=0.8"
        )
        .to(
          projectTitle,
          { y: "0%", ease: "power2.out", rotation: 0 },
          reduceMotion ? 0 : 0.95
        )
        .to(
          projectNumber,
          { y: "0%", ease: "power2.out", rotation: 0 },
          reduceMotion ? 0 : "-=0.8"
        );
    }
  );
};

imageWrappers.forEach((imageWrapper) => {
  imageWrapper.addEventListener("mouseenter", () => {
    const projectAttr = imageWrapper.getAttribute("data-project");
    swapProjectDetails(projectAttr, "full case");
  });

  imageWrapper.addEventListener("mouseleave", () => {
    const projectAttr = defaultProjectText;
    swapProjectDetails(projectAttr, "46");
  });
});
