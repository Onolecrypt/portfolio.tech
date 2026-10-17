// ========================================
// EMMANUEL OLUM — DEVELOPER PORTFOLIO
// File: script.js
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    // Update this email if your contact address changes.
    const contactEmail = "kingtailan40@gmail.com";

    // ----------------------------------------
    // 1. MOBILE NAVIGATION
    // ----------------------------------------

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    function closeMenu() {
        if (!nav || !menuToggle) {
            return;
        }

        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            const willOpen = !nav.classList.contains("open");

            nav.classList.toggle("open", willOpen);
            menuToggle.setAttribute("aria-expanded", String(willOpen));
            menuToggle.setAttribute(
                "aria-label",
                willOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", function (event) {
            if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    // ----------------------------------------
    // 2. ACTIVE NAV LINK WHILE SCROLLING
    // ----------------------------------------

    const navLinks = document.querySelectorAll("#nav a[href^='#']");
    const sections = [];

    navLinks.forEach(function (link) {
        const section = document.querySelector(link.getAttribute("href"));

        if (section) {
            sections.push({ link: link, section: section });
        }
    });

    function setActiveLink(activeLink) {
        navLinks.forEach(function (link) {
            link.classList.toggle("active", link === activeLink);
        });
    }

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 140;
        let current = sections.length ? sections[0] : null;

        sections.forEach(function (item) {
            if (item.section.offsetTop <= scrollPosition) {
                current = item;
            }
        });

        // At the very bottom of the page, highlight the last section.
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4 && sections.length) {
            current = sections[sections.length - 1];
        }

        if (current) {
            setActiveLink(current.link);
        }
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    window.addEventListener("resize", updateActiveLink);
    updateActiveLink();

    // ----------------------------------------
    // 3. INTERACTIVE TECHNOLOGY STACK
    // ----------------------------------------

    // "cert" links a skill to a certificate (data-cert in index.html).
    const skillDetails = {
        html: {
            title: "HTML",
            description:
                "I use HTML to structure web pages with clear content, accessible elements, links, forms, and semantic markup.",
            tags: ["Web structure", "Semantic HTML", "Forms"],
            resourceTitle: "HTML learning resource",
            resourceDescription:
                "Explore the official documentation for HTML elements and web page structure.",
            resourceLink: "https://developer.mozilla.org/en-US/docs/Web/HTML"
        },

        css: {
            title: "CSS",
            description:
                "I use CSS to style websites, create responsive layouts, build interactive visual effects, and improve the experience on mobile devices.",
            tags: ["Responsive design", "Flexbox", "Grid", "Animations"],
            resourceTitle: "CSS learning resource",
            resourceDescription:
                "Explore CSS guides, layout techniques, and examples.",
            resourceLink: "https://developer.mozilla.org/en-US/docs/Web/CSS"
        },

        javascript: {
            title: "JavaScript",
            description:
                "I use JavaScript to add interactivity, handle user input, update page content, and build browser-based applications.",
            tags: ["DOM", "Events", "Functions", "Interactive apps"],
            resourceTitle: "JavaScript learning resource",
            resourceDescription:
                "Explore JavaScript concepts and practical examples.",
            resourceLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
        },

        python: {
            title: "Python",
            description:
                "I use Python for programming fundamentals, problem solving, automation, and building small applications. I have also completed CS50's Introduction to Programming with Python.",
            tags: ["Programming", "Problem solving", "Automation", "CS50P"],
            resourceTitle: "Python learning resource",
            resourceDescription:
                "Explore Python's official tutorial and language documentation.",
            resourceLink: "https://docs.python.org/3/tutorial/"
        },

        aws: {
            title: "AWS Cloud",
            description:
                "I have explored AWS cloud concepts through AWS Skill Builder and Cloud Quest learning activities.",
            tags: ["Cloud fundamentals", "AWS Skill Builder", "Cloud Quest"],
            resourceTitle: "AWS certificate",
            resourceDescription: "View my AWS learning achievement.",
            cert: "aws"
        },

        agile: {
            title: "Agile Project Management",
            description:
                "I completed HP LIFE's Agile Project Management course to learn about organizing work, collaboration, and iterative project delivery.",
            tags: ["Agile", "Planning", "Teamwork", "HP LIFE"],
            resourceTitle: "HP LIFE certificate",
            resourceDescription:
                "View my Agile Project Management course certificate.",
            cert: "hp"
        }
    };

    const skillButtons = document.querySelectorAll(".skill-button");
    const detailIcon = document.getElementById("detailIcon");
    const detailTitle = document.getElementById("detailTitle");
    const detailDescription = document.getElementById("detailDescription");
    const detailTags = document.getElementById("detailTags");
    const resourceTitle = document.getElementById("resourceTitle");
    const resourceDescription = document.getElementById("resourceDescription");
    const resourceLink = document.getElementById("resourceLink");

    function findCertificateLink(certKey) {
        return document.querySelector(
            '.certificate-link[data-cert="' + certKey + '"]'
        );
    }

    function showSkill(skillName, selectedButton) {
        const skill = skillDetails[skillName];

        if (!skill) {
            return;
        }

        skillButtons.forEach(function (button) {
            const selected = button === selectedButton;

            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        // Show the same logo as the selected button.
        const logo = selectedButton.querySelector(".tech-logo");

        if (detailIcon && logo) {
            const logoClass = Array.from(logo.classList).find(function (name) {
                return name.indexOf("logo-") === 0;
            });

            detailIcon.textContent = logo.textContent;
            detailIcon.className = "detail-icon" + (logoClass ? " " + logoClass : "");
        }

        if (detailTitle) {
            detailTitle.textContent = skill.title;
        }

        if (detailDescription) {
            detailDescription.textContent = skill.description;
        }

        if (detailTags) {
            detailTags.replaceChildren();

            skill.tags.forEach(function (tagText) {
                const tag = document.createElement("span");
                tag.textContent = tagText;
                detailTags.appendChild(tag);
            });
        }

        if (resourceTitle) {
            resourceTitle.textContent = skill.resourceTitle;
        }

        if (resourceDescription) {
            resourceDescription.textContent = skill.resourceDescription;
        }

        if (resourceLink) {
            if (skill.cert) {
                // Opens the certificate PNG in the popup (see section 4).
                const certLink = findCertificateLink(skill.cert);

                resourceLink.dataset.cert = skill.cert;
                resourceLink.removeAttribute("target");
                resourceLink.removeAttribute("rel");

                if (certLink) {
                    resourceLink.href = certLink.getAttribute("href");
                }

                resourceLink.textContent = "View certificate ↗";
            } else {
                delete resourceLink.dataset.cert;
                resourceLink.href = skill.resourceLink;
                resourceLink.target = "_blank";
                resourceLink.rel = "noopener noreferrer";
                resourceLink.textContent = "Explore documentation ↗";
            }
        }
    }

    skillButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            showSkill(button.dataset.skill, button);
        });
    });

    const initialButton =
        document.querySelector(".skill-button.active") || skillButtons[0];

    if (initialButton) {
        showSkill(initialButton.dataset.skill, initialButton);
    }

    // ----------------------------------------
    // 4. CERTIFICATE POPUP (PNG VIEWER)
    // ----------------------------------------

    const certificateModal = document.getElementById("certificateModal");
    const modalClose = document.getElementById("modalClose");
    const modalDone = document.getElementById("modalDone");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalMessage = document.getElementById("modalMessage");
    const modalOpenLink = document.getElementById("modalOpenLink");

    let lastFocusedElement = null;

    function closeCertificateModal() {
        if (!certificateModal) {
            return;
        }

        certificateModal.classList.remove("open");
        certificateModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (modalImage) {
            modalImage.removeAttribute("src");
        }

        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    function openCertificateModal(title, imageUrl) {
        // Without the popup markup, just open the image in a new tab.
        if (!certificateModal || !modalImage) {
            window.open(imageUrl, "_blank", "noopener,noreferrer");
            return;
        }

        lastFocusedElement = document.activeElement;

        modalTitle.textContent = title;
        modalMessage.hidden = true;
        modalMessage.textContent = "";

        modalImage.hidden = false;
        modalImage.alt = title + " certificate";

        modalImage.onload = function () {
            modalImage.hidden = false;
            modalMessage.hidden = true;
        };

        modalImage.onerror = function () {
            modalImage.hidden = true;
            modalMessage.textContent =
                "This certificate image isn't available right now.";
            modalMessage.hidden = false;
        };

        modalImage.src = imageUrl;

        if (modalOpenLink) {
            modalOpenLink.href = imageUrl;
            modalOpenLink.hidden = false;
        }

        certificateModal.classList.add("open");
        certificateModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        if (modalClose) {
            modalClose.focus();
        }
    }

    // One click handler covers the logo icons, the "View certificate"
    // links, and the link in the tech stack panel.
    document.addEventListener("click", function (event) {
        const trigger = event.target.closest("[data-cert]");

        if (!trigger || !trigger.dataset.cert) {
            return;
        }

        const certLink = findCertificateLink(trigger.dataset.cert);

        if (!certLink) {
            return;
        }

        event.preventDefault();

        openCertificateModal(
            certLink.dataset.title || "Certificate",
            certLink.getAttribute("href")
        );
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeCertificateModal);
    }

    if (modalDone) {
        modalDone.addEventListener("click", closeCertificateModal);
    }

    if (certificateModal) {
        certificateModal.addEventListener("click", function (event) {
            if (event.target === certificateModal) {
                closeCertificateModal();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && certificateModal.classList.contains("open")) {
                closeCertificateModal();
            }
        });
    }

    // ----------------------------------------
    // 5. CONTACT FORM
    // ----------------------------------------

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameField = contactForm.querySelector('[name="name"]');
            const emailField = contactForm.querySelector('[name="senderEmail"]');
            const messageField = contactForm.querySelector('[name="message"]');

            const name = nameField ? nameField.value.trim() : "";
            const senderEmail = emailField ? emailField.value.trim() : "";
            const message = messageField ? messageField.value.trim() : "";

            if (!name || !senderEmail || !message) {
                alert("Please complete all fields before sending your message.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(senderEmail)) {
                alert("Please enter a valid email address.");

                if (emailField) {
                    emailField.focus();
                }

                return;
            }

            const subject = encodeURIComponent("Portfolio enquiry from " + name);

            const body = encodeURIComponent(
                "Hello Emmanuel,\n\n" +
                message +
                "\n\nFrom: " +
                name +
                "\nReply email: " +
                senderEmail
            );

            // Opens the visitor's email app; it does not send automatically.
            window.location.href =
                "mailto:" + contactEmail + "?subject=" + subject + "&body=" + body;
        });
    }
});
