const projectTitle = document.querySelector("[data-project='title']");
const projectNumber = document.querySelector("[data-project='number']");
const imageWrappers = document.querySelectorAll(".project-image_wrapper");
const defaultProjectText = "projects";

const swapProjectDetails = (projectTitleAttribute, projectNumText) => {
  const swapProjectDetailsTl = gsap.timeline({ defaults: { duration: 1 } });

  swapProjectDetailsTl
    .to(projectTitle, {
      y: "150%",
      rotation: 7,
      onComplete: () => (projectTitle.textContent = projectTitleAttribute),
      ease: "power2.in",
    })
    .to(
      projectNumber,
      {
        y: "150%",
        rotation: 7,
        onComplete: () => (projectNumber.textContent = projectNumText),
        ease: "power2.in",
      },
      "-=0.8"
    )
    .to(projectTitle, { y: "0%", ease: "power2.out", rotation: 0 }, 0.95)
    .to(projectNumber, { y: "0%", ease: "power2.out", rotation: 0 }, "-=0.8");
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
