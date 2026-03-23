import { siteContent } from "./content.js";

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navScrim = document.getElementById("nav-scrim");
const navAnchors = [...document.querySelectorAll(".nav-links a")];
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const startedAt = document.getElementById("started-at");
const cursorTooltip = document.getElementById("cursor-tooltip");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");
const prominentTech = new Set(["C#", ".NET", "ASP.NET Core", "Angular", "Docker"]);
const socialIcons = {
  GitHub: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.75a9.25 9.25 0 0 0-2.93 18.03c.46.08.63-.19.63-.44v-1.56c-2.57.56-3.11-1.09-3.11-1.09-.42-1.05-1.03-1.34-1.03-1.34-.84-.56.07-.55.07-.55.92.07 1.4.94 1.4.94.83 1.39 2.17.99 2.69.76.08-.59.33-.99.58-1.22-2.05-.23-4.21-1.01-4.21-4.53 0-1 .36-1.81.94-2.45-.09-.23-.4-1.16.09-2.41 0 0 .77-.24 2.53.94A8.8 8.8 0 0 1 12 7.35c.78 0 1.57.11 2.31.33 1.75-1.18 2.52-.94 2.52-.94.5 1.25.18 2.18.09 2.41.59.64.94 1.45.94 2.45 0 3.52-2.17 4.29-4.24 4.51.33.28.63.84.63 1.71v2.52c0 .25.17.52.64.43A9.25 9.25 0 0 0 12 2.75Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  `,
  LinkedIn: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.25 9.5v8.25M8.25 6.5h.01M12.75 17.75V13c0-1.4.85-2.5 2.25-2.5S17.25 11.6 17.25 13v4.75" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.25 3.75h13.5a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5Z" stroke="currentColor" stroke-width="1.5"/>
    </svg>
  `,
  YouTube: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.25 8.63a2.6 2.6 0 0 0-1.84-1.84C16.82 6.38 12 6.38 12 6.38s-4.82 0-6.41.41A2.6 2.6 0 0 0 3.75 8.63c-.42 1.6-.42 3.37-.42 3.37s0 1.77.42 3.37a2.6 2.6 0 0 0 1.84 1.84c1.59.41 6.41.41 6.41.41s4.82 0 6.41-.41a2.6 2.6 0 0 0 1.84-1.84c.42-1.6.42-3.37.42-3.37s0-1.77-.42-3.37Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="m10.25 14.72 4.5-2.72-4.5-2.72v5.44Z" fill="currentColor"/>
    </svg>
  `,
  Email: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 6.75h15A1.75 1.75 0 0 1 21.25 8.5v7A1.75 1.75 0 0 1 19.5 17.25h-15A1.75 1.75 0 0 1 2.75 15.5v-7A1.75 1.75 0 0 1 4.5 6.75Z" stroke="currentColor" stroke-width="1.5"/>
      <path d="m4 8 8 5 8-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
};

function setRevealDelay(element, delay) {
  element.style.setProperty("--reveal-delay", `${delay}ms`);
}

function withRevealStyle(delay) {
  return `style="--reveal-delay: ${delay}ms"`;
}

function annotateRevealSequence(containerSelector, childSelector, startDelay = 0, step = 70) {
  const container = document.querySelector(containerSelector);
  if (!container) {
    return;
  }

  const elements = container.querySelectorAll(childSelector);
  elements.forEach((element, index) => {
    element.setAttribute("data-reveal", "");
    if (!element.style.getPropertyValue("--reveal-delay")) {
      setRevealDelay(element, startDelay + index * step);
    }
  });
}

function renderLinkAttributes(url) {
  if (url.startsWith("http")) {
    return ' target="_blank" rel="noreferrer"';
  }

  return "";
}

function renderHeroSocials() {
  const container = document.getElementById("hero-socials");
  if (!container) {
    return;
  }

  container.innerHTML = siteContent.heroSocials
    .map(
      (item, index) =>
        `<a class="social-link interactive-icon" href="${item.href}"${renderLinkAttributes(item.href)} aria-label="${item.label}" data-reveal ${withRevealStyle(
          360 + index * 60
        )}>
          <span class="social-link-icon" aria-hidden="true">
            ${socialIcons[item.label] || socialIcons.Email}
          </span>
          <span class="social-link-label">${item.label}</span>
        </a>`
    )
    .join("");
}

function renderTerminalLines() {
  const container = document.getElementById("terminal-lines");
  if (!container) {
    return;
  }

  container.innerHTML = siteContent.terminalLines
    .map(
      (item) =>
        `<p class="terminal-line"><strong>$ ${item.label}</strong> ${item.value}</p>`
    )
    .join("");
}

function renderHeroSignalCards() {
  const container = document.getElementById("hero-signal-cards");
  if (!container) {
    return;
  }

  container.innerHTML = siteContent.heroSignalCards
    .map((card, index) => {
      const body = card.bullets
        ? `<ul>${card.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>`
        : `<p>${card.text}</p>`;

      const title = card.title ? `<h3>${card.title}</h3>` : "";

      return `
        <article class="signal-card interactive-card" data-reveal ${withRevealStyle(520 + index * 70)}>
          <p class="card-label">${card.label}</p>
          ${title}
          ${body}
        </article>
      `;
    })
    .join("");
}

function renderAboutCards() {
  const container = document.getElementById("about-cards");
  if (!container) {
    return;
  }

  container.innerHTML = siteContent.aboutCards
    .map(
      (card, index) => `
        <article class="about-card interactive-card" data-reveal ${withRevealStyle(80 + index * 70)}>
          <p class="card-label">${card.label}</p>
          <h3>${card.title}</h3>
          <p>${card.text}</p>
        </article>
      `
    )
    .join("");
}

function renderSkills() {
  const container = document.getElementById("skills-grid");
  if (!container) {
    return;
  }

  container.innerHTML = siteContent.skills
    .map(
      (group, groupIndex) => `
        <article class="skill-card interactive-card" data-reveal ${withRevealStyle(groupIndex * 80)}>
          <p class="card-label">${group.label}</p>
          <h3>${group.title}</h3>
          <div class="chip-row">
            ${group.items
              .map((item, itemIndex) => {
                const isKeyTech = prominentTech.has(item);
                return `<span class="chip interactive-chip${isKeyTech ? " is-key-tech" : ""}" data-reveal ${withRevealStyle(
                  110 + groupIndex * 60 + itemIndex * 38
                )}>${item}</span>`;
              })
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderWork() {
  const container = document.getElementById("work-grid");
  if (!container) {
    return;
  }

  container.innerHTML = siteContent.work
    .map(
      (item, index) => `
        <article class="work-card interactive-card${item.featured ? " is-featured" : ""}" data-reveal ${withRevealStyle(
          index * 80
        )}>
          <div class="work-card-header">
            <div class="work-meta">
              ${item.tags.map((tag) => `<span class="meta-chip interactive-chip">${tag}</span>`).join("")}
            </div>
            <h3>${item.title}</h3>
          </div>
          <p>${item.description}</p>
          <ul class="work-highlights">
            ${item.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
          </ul>
          <div class="work-links">
            ${item.actions
              .map(
                (action) =>
                  `<a class="work-link" href="${action.href}"${renderLinkAttributes(action.href)}>${action.label}</a>`
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderJourney() {
  const container = document.getElementById("journey-timeline");
  if (!container) {
    return;
  }

  container.innerHTML = siteContent.journey
    .map(
      (item, index) => `
        <article class="timeline-item" data-reveal ${withRevealStyle(index * 90)}>
          <span class="timeline-time">${item.time}</span>
          <div class="timeline-card interactive-card">
            <p class="card-label">${item.label}</p>
            <h3>${item.title}</h3>
            <p class="timeline-copy">${item.text}</p>
            <div class="timeline-detail-grid">
              <section class="timeline-detail">
                <p class="timeline-detail-label">Focus</p>
                <ul class="timeline-list">
                  ${item.focus.map((entry) => `<li>${entry}</li>`).join("")}
                </ul>
              </section>
              <section class="timeline-detail">
                <p class="timeline-detail-label">Key Work</p>
                <ul class="timeline-list">
                  ${item.keyWork.map((entry) => `<li>${entry}</li>`).join("")}
                </ul>
              </section>
              <section class="timeline-detail">
                <p class="timeline-detail-label">Impact</p>
                <ul class="timeline-list">
                  ${item.impact.map((entry) => `<li>${entry}</li>`).join("")}
                </ul>
              </section>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  container.setAttribute("data-line-reveal", "");
}

function renderContactCards() {
  const container = document.getElementById("contact-cards");
  if (!container) {
    return;
  }

  container.innerHTML = siteContent.contactCards
    .map((card, index) => {
      if (card.mode === "email") {
        return `
          <button
            class="contact-card interactive-card primary is-email-card"
            type="button"
            data-copy-email="${card.value}"
            data-reveal
            ${withRevealStyle(index * 70)}
            aria-label="Copy email address ${card.value}"
          >
            <span class="card-label">${card.title}</span>
            <strong class="contact-card-value">${card.value}</strong>
            <span>${card.subtext}</span>
            <p class="contact-card-feedback" aria-live="polite"></p>
          </button>
        `;
      }

      return `
        <a
          class="contact-card interactive-card${card.primary ? " primary" : ""}"
          href="${card.href}"
          ${card.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}
          data-reveal
          ${withRevealStyle(index * 70)}
        >
          <span class="card-label">${card.title}</span>
          <strong class="contact-card-value">${card.value}</strong>
          <span>${card.subtext}</span>
        </a>
      `;
    })
    .join("");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  document.body.removeChild(helper);
}

function setupContactCardActions() {
  const copyButtons = document.querySelectorAll("[data-copy-email]");

  copyButtons.forEach((button) => {
    let resetTimer;
    let pointerX = 0;
    let pointerY = 0;

    const updateTooltipPosition = (x, y) => {
      if (!cursorTooltip) {
        return;
      }

      cursorTooltip.style.setProperty("--tooltip-x", `${x}px`);
      cursorTooltip.style.setProperty("--tooltip-y", `${y}px`);
    };

    const showTooltip = (label) => {
      if (!cursorTooltip) {
        return;
      }

      cursorTooltip.textContent = label;
      cursorTooltip.classList.add("is-visible");
    };

    const hideTooltip = () => {
      if (!cursorTooltip) {
        return;
      }

      cursorTooltip.classList.remove("is-visible");
    };

    button.addEventListener("pointerenter", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      updateTooltipPosition(pointerX, pointerY);
      showTooltip(button.classList.contains("is-copied") ? "Copied" : "Copy email");
    });

    button.addEventListener("pointermove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      updateTooltipPosition(pointerX, pointerY);
    });

    button.addEventListener("pointerleave", () => {
      hideTooltip();
    });

    button.addEventListener("focus", () => {
      const rect = button.getBoundingClientRect();
      updateTooltipPosition(rect.left + rect.width / 2, rect.top);
      showTooltip(button.classList.contains("is-copied") ? "Copied" : "Copy email");
    });

    button.addEventListener("blur", () => {
      hideTooltip();
    });

    button.addEventListener("click", async () => {
      const email = button.getAttribute("data-copy-email");
      const card = button.closest(".is-email-card");
      const feedback = card ? card.querySelector(".contact-card-feedback") : null;

      if (!email || !feedback || !card) {
        return;
      }

      try {
        await copyText(email);
        window.clearTimeout(resetTimer);
        card.classList.add("is-copied");
        feedback.textContent = "Email copied to clipboard.";
        showTooltip("Copied");
        resetTimer = window.setTimeout(() => {
          card.classList.remove("is-copied");
          feedback.textContent = "";
          if (document.activeElement === button) {
            showTooltip("Copy email");
          } else {
            hideTooltip();
          }
        }, 2200);
      } catch (error) {
        feedback.textContent = "Could not copy automatically.";
        showTooltip("Copy failed");
      }
    });
  });
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Ignore persistence errors and keep the in-memory theme.
  }

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  if (themeMeta) {
    themeMeta.setAttribute("content", theme === "light" ? "#f2eee7" : "#0b1016");
  }
}

function setupThemeToggle() {
  const initialTheme = root.getAttribute("data-theme") || "dark";
  applyTheme(initialTheme);

  if (!themeToggle) {
    return;
  }

  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  });
}

function setupNavigation() {
  if (navToggle && navLinks) {
    const setNavOpen = (isOpen) => {
      navLinks.classList.toggle("is-open", isOpen);
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
      if (navScrim) {
        navScrim.classList.toggle("is-visible", isOpen);
      }
    };

    navToggle.addEventListener("click", () => {
      const isOpen = !navLinks.classList.contains("is-open");
      setNavOpen(isOpen);
    });

    navAnchors.forEach((anchor) => {
      anchor.addEventListener("click", () => {
        setNavOpen(false);
      });
    });

    if (navScrim) {
      navScrim.addEventListener("click", () => {
        setNavOpen(false);
      });
    }

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!navLinks.contains(target) && !navToggle.contains(target)) {
        setNavOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setNavOpen(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 780) {
        setNavOpen(false);
      }
    });
  }

  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navAnchors.forEach((anchor) => {
          anchor.classList.toggle(
            "is-active",
            anchor.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function setupHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll("[data-reveal]");
  const lineRevealElements = document.querySelectorAll("[data-line-reveal]");

  if (reducedMotion.matches) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    lineRevealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
  lineRevealElements.forEach((element) => revealObserver.observe(element));
}

function setupSpotlight() {
  if (reducedMotion.matches) {
    return;
  }

  window.addEventListener("pointermove", (event) => {
    root.style.setProperty("--spotlight-x", `${event.clientX}px`);
    root.style.setProperty("--spotlight-y", `${event.clientY}px`);
  });
}

function setupInteractiveSurfaces() {
  if (reducedMotion.matches || !supportsHover.matches) {
    return;
  }

  const surfaces = document.querySelectorAll(
    [
      ".interactive-button",
      ".interactive-icon",
      ".interactive-card",
      ".interactive-chip",
      ".theme-toggle",
      ".nav-toggle"
    ].join(", ")
  );

  surfaces.forEach((surface) => {
    surface.addEventListener("pointermove", (event) => {
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
      surface.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    });
  });
}

function annotateStaticReveals() {
  annotateRevealSequence(
    ".hero-copy",
    ".hero-pill, .hero-label, h1, .hero-intro, .hero-actions, .social-row",
    0,
    70
  );
  annotateRevealSequence(".hero-panel", ".terminal-card", 430, 60);
  document.querySelectorAll(".section-heading").forEach((heading) => {
    [...heading.children].forEach((element, index) => {
      element.setAttribute("data-reveal", "");
      if (!element.style.getPropertyValue("--reveal-delay")) {
        setRevealDelay(element, index * 70);
      }
    });
  });
  document.querySelectorAll(".form-card").forEach((card) => {
    const elements = card.querySelectorAll(".form-heading, .field, .form-actions, .form-status");
    elements.forEach((element, index) => {
      element.setAttribute("data-reveal", "");
      if (!element.style.getPropertyValue("--reveal-delay")) {
        setRevealDelay(element, 70 + index * 55);
      }
    });
  });
}

const validationRules = {
  name: (value) => {
    if (!value.trim()) {
      return "Please enter your name.";
    }

    if (value.trim().length < 2) {
      return "Name should be at least 2 characters.";
    }

    return "";
  },
  email: (value) => {
    if (!value.trim()) {
      return "Please enter your email address.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value.trim())) {
      return "Please use a valid email address.";
    }

    return "";
  },
  context: (value) => {
    if (value.trim().length > 0 && value.trim().length < 2) {
      return "Add a bit more detail or leave this field empty.";
    }

    return "";
  },
  message: (value) => {
    if (!value.trim()) {
      return "Please include a short message.";
    }

    if (value.trim().length < 20) {
      return "A little more detail will help provide a useful reply.";
    }

    return "";
  }
};

function setFieldError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);

  if (!field || !error) {
    return;
  }

  const wrapper = field.closest(".field");
  if (wrapper) {
    wrapper.classList.toggle("is-invalid", Boolean(message));
  }

  field.setAttribute("aria-invalid", message ? "true" : "false");
  error.textContent = message;
}

function validateForm(formData) {
  let isValid = true;

  Object.keys(validationRules).forEach((fieldName) => {
    const validator = validationRules[fieldName];
    const value = String(formData.get(fieldName) || "");
    const errorMessage = validator(value);
    setFieldError(fieldName, errorMessage);

    if (errorMessage) {
      isValid = false;
    }
  });

  return isValid;
}

function updateFormStatus(message, statusType = "") {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.classList.remove("is-success", "is-error");

  if (statusType) {
    formStatus.classList.add(statusType);
  }
}

function setupContactForm() {
  if (!form) {
    return;
  }

  if (startedAt) {
    startedAt.value = String(Date.now());
  }

  ["name", "email", "context", "message"].forEach((fieldName) => {
    const field = document.getElementById(fieldName);

    if (!field) {
      return;
    }

    field.addEventListener("blur", () => {
      const validator = validationRules[fieldName];
      setFieldError(fieldName, validator(field.value));
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const submittedTooFast =
      startedAt && startedAt.value
        ? Date.now() - Number(startedAt.value) < 2500
        : false;
    const honeypotValue = String(formData.get("_honey") || "").trim();

    if (honeypotValue || submittedTooFast) {
      form.reset();
      if (startedAt) {
        startedAt.value = String(Date.now());
      }
      updateFormStatus("Message sent successfully. Stefan will receive it by email shortly.", "is-success");
      return;
    }

    const isValid = validateForm(formData);
    if (!isValid) {
      updateFormStatus("Please fix the highlighted fields and try again.", "is-error");
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    form.classList.add("is-submitting");
    if (submitButton) {
      submitButton.setAttribute("disabled", "true");
    }
    updateFormStatus("Sending your message...", "");

    try {
      const response = await fetch("https://formsubmit.co/ajax/shterjoski.stefan@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Network response was not successful.");
      }

      const result = await response.json();
      if (result.success !== true && result.success !== "true") {
        throw new Error("Unexpected response from email delivery service.");
      }

      form.reset();
      if (startedAt) {
        startedAt.value = String(Date.now());
      }
      ["name", "email", "context", "message"].forEach((fieldName) => setFieldError(fieldName, ""));
      updateFormStatus("Message sent successfully. Stefan will receive it by email shortly.", "is-success");
    } catch (error) {
      updateFormStatus(
        "Something went wrong while sending. Please try again or use the Email Me button.",
        "is-error"
      );
    } finally {
      form.classList.remove("is-submitting");
      if (submitButton) {
        submitButton.removeAttribute("disabled");
      }
    }
  });
}

function init() {
  renderHeroSocials();
  renderTerminalLines();
  renderHeroSignalCards();
  renderAboutCards();
  renderSkills();
  renderWork();
  renderJourney();
  renderContactCards();
  annotateStaticReveals();
  setupContactCardActions();
  setupThemeToggle();
  setupHeaderState();
  setupNavigation();
  setupRevealAnimations();
  setupInteractiveSurfaces();
  setupSpotlight();
  setupContactForm();
}

init();
