
// ========================================
// EMMANUEL OLUM — DEVELOPER PORTFOLIO
// File: script.js
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    // Update this email if your contact address changes.
    const contactEmail = "kingtailan40@gmail.com";

    // Certificate links
    const certificates = {
        aws: "https://skillbuilder.aws/learn/FU5WCYVGKY/aws-cloud-quest-cloud-practitioner/JF9TKU68GT",
        agile: "https://www.life-global.org/certificate/bfc2ecbd-79f4-4965-84b4-9eca3052dd18"
    };

    // ----------------------------------------
    // 1. MOBILE NAVIGATION
    // ----------------------------------------

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (menuToggle && nav) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function () {
            const isOpen =
                nav.classList.contains("open") ||
                nav.classList.contains("active") ||
                nav.classList.contains("show");

            nav.classList.toggle("open", !isOpen);
            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Open navigation menu" : "Close navigation menu"
            );
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open", "active", "show");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });

        document.addEventListener("click", function (event) {
            if (
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                nav.classList.remove("open", "active", "show");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // ----------------------------------------
    // 2. INTERACTIVE TECHNOLOGY STACK
    // ----------------------------------------

    const skillDetails = {
        html: {
            title: "HTML",
            icon: "🌐",
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
            icon: "🎨",
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
            icon: "⚡",
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
            icon: "🐍",
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
            icon: "☁️",
            description:
                "I have explored AWS cloud concepts through AWS Skill Builder and Cloud Quest learning activities.",
            tags: ["Cloud fundamentals", "AWS Skill Builder", "Cloud Quest"],
            resourceTitle: "AWS Cloud Quest certificate",
            resourceDescription:
                "Open my AWS Skill Builder learning achievement.",
            resourceLink: certificates.aws
        },

        agile: {
            title: "Agile Project Management",
            icon: "📋",
            description:
                "I completed HP LIFE's Agile Project Management course to learn about organizing work, collaboration, and iterative project delivery.",
            tags: ["Agile", "Planning", "Teamwork", "HP LIFE"],
            resourceTitle: "HP LIFE certificate",
            resourceDescription:
                "View my Agile Project Management course certificate.",
            resourceLink: certificates.agile
        }
    };

    const skillButtons = document.querySelectorAll(
        "[data-skill], .tech-button, .skill-button, .stack-item, .tech-item"
    );

    const skillDetail = document.getElementById("skillDetail");
    const detailIcon = document.getElementById("detailIcon");
    const detailTitle = document.getElementById("detailTitle");
    const detailDescription = document.getElementById("detailDescription");
    const detailTags = document.getElementById("detailTags");
    const resourceTitle = document.getElementById("resourceTitle");
    const resourceDescription = document.getElementById("resourceDescription");
    const resourceLink = document.getElementById("resourceLink");

    function identifySkill(button) {
        const explicitSkill = button.dataset.skill;

        if (explicitSkill) {
            const normalized = explicitSkill.toLowerCase().replace(/[^a-z]/g, "");

            if (skillDetails[normalized]) {
                return normalized;
            }
        }

        const text = (
            button.textContent +
            " " +
            (button.getAttribute("aria-label") || "")
        ).toLowerCase();

        if (text.includes("javascript") || text.includes("java script")) {
            return "javascript";
        }

        if (text.includes("python")) {
            return "python";
        }

        if (text.includes("html")) {
            return "html";
        }

        if (text.includes("css")) {
            return "css";
        }

        if (
            text.includes("aws") ||
            text.includes("cloud quest") ||
            text.includes("cloud practitioner")
        ) {
            return "aws";
        }

        if (
            text.includes("agile") ||
            text.includes("hp life") ||
            text.includes("project management")
        ) {
            return "agile";
        }

        return null;
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

        if (detailIcon) {
            detailIcon.textContent = skill.icon;
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
            resourceLink.href = skill.resourceLink;
            resourceLink.target = "_blank";
            resourceLink.rel = "noopener noreferrer";
            resourceLink.textContent =
                skillName === "aws" || skillName === "agile"
                    ? "View certificate ↗"
                    : "Explore documentation ↗";
        }

        if (skillDetail) {
            skillDetail.hidden = false;
        }
    }

    skillButtons.forEach(function (button) {
        const skillName = identifySkill(button);

        if (!skillName) {
            return;
        }

        button.setAttribute("aria-pressed", "false");

        if (!button.hasAttribute("role") && button.tagName !== "BUTTON") {
            button.setAttribute("role", "button");
            button.setAttribute("tabindex", "0");
        }

        button.addEventListener("click", function () {
            showSkill(skillName, button);
        });

        // Support keyboard activation for non-button elements.
        if (button.tagName !== "BUTTON") {
            button.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    showSkill(skillName, button);
                }
            });
        }
    });

    // Make the initial selection match the first recognized technology.
    const firstSkillButton = Array.from(skillButtons).find(function (button) {
        return identifySkill(button) !== null;
    });

    if (firstSkillButton) {
        showSkill(identifySkill(firstSkillButton), firstSkillButton);
    }

    // ----------------------------------------
    // 3. CERTIFICATE LINKS
    // ----------------------------------------

    // These links open the actual certificate pages in a new tab.
    document.querySelectorAll(".certificate-link, .certificate-card a").forEach(
        function (link) {
            if (link.tagName === "A" && link.href) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
        }
    );

    // ----------------------------------------
    // 4. CERTIFICATE MODAL
    // ----------------------------------------

    const certificateModal = document.getElementById("certificateModal");
    const modalClose = document.getElementById("modalClose");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const modalOpenLink = document.getElementById("modalOpenLink");
    const modalDone = document.getElementById("modalDone");

    function closeCertificateModal() {
        if (!certificateModal) {
            return;
        }

        certificateModal.classList.remove("open", "show");
        certificateModal.setAttribute("aria-hidden", "true");
    }

    function openCertificateModal(title, message, url) {
        if (!certificateModal) {
            if (url) {
                window.open(url, "_blank", "noopener,noreferrer");
            }
            return;
        }

        if (modalTitle) {
            modalTitle.textContent = title;
        }

        if (modalMessage) {
            modalMessage.textContent = message;
        }

        if (modalOpenLink && url) {
            modalOpenLink.href = url;
            modalOpenLink.target = "_blank";
            modalOpenLink.rel = "noopener noreferrer";
        }

        certificateModal.classList.add("open");
        certificateModal.setAttribute("aria-hidden", "false");

        if (modalClose) {
            modalClose.focus();
        }
    }

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
            if (
                event.key === "Escape" &&
                (certificateModal.classList.contains("open") ||
                    certificateModal.classList.contains("show"))
            ) {
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
            const emailField = contactForm.querySelector(
                '[name="senderEmail"]'
            );
            const messageField = contactForm.querySelector(
                '[name="message"]'
            );

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

            const subject = encodeURIComponent(
                "Portfolio enquiry from " + name
            );

            const body = encodeURIComponent(
                "Hello Emmanuel,\n\n" +
                message +
                "\n\nFrom: " +
                name +
                "\nReply email: " +
                senderEmail
            );

            const mailtoLink =
                "mailto:" +
                contactEmail +
                "?subject=" +
                subject +
                "&body=" +
                body;

            // Opens the visitor's email app; it does not send automatically.
            window.location.href = mailtoLink;
        });
    }

    // ----------------------------------------
    // 6. CURRENT YEAR IN FOOTER
    // ----------------------------------------

    const yearElements = document.querySelectorAll(
        "#currentYear, .current-year"
    );

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });
});
