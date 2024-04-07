class StartViewTransition {
  constructor(triggerId) {
    this.triggerBtn = document.querySelector(triggerId);
    this.init();
  }

  init() {
    this.triggerBtn.addEventListener("click", () =>
      this.toggle(this.triggerBtn)
    );
  }

  async toggle(triggerBtn) {
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.documentElement.classList.toggle("dark");
      return;
    }
    await document.startViewTransition(() => {
      document.documentElement.classList.toggle("dark");
    }).ready;

    const { top, left, width, height } = triggerBtn.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 1000,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }
}

const startViewInstance = new StartViewTransition(".toggle-mode");
