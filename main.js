document.addEventListener("DOMContentLoaded", function () {
    const contactLinesSelect = document.getElementById("contactLines");
    const contactInfos = document.querySelectorAll("#contact-info .contact");

    contactLinesSelect.addEventListener("change", function () {
        const selectedValue = parseInt(contactLinesSelect.value, 10);
        contactInfos.forEach((contact, index) => {
            if (index < selectedValue) {
                contact.style.display = "block";
            } else {
                contact.style.display = "none";
            }
        });
        updateHorizontalLines();
    });

    const fontTypeSelect = document.getElementById("fontType");
    const fontSizeInput = document.getElementById("fontSize");
    const lineSpacingSelect = document.getElementById("lineSpacing");
    const titleStyleSelect = document.getElementById("titleStyle");
    const titlePositionSelect = document.getElementById("titlePosition");

    const resumeElement = document.getElementById("resume");
    const sectionsContainer = document.getElementById("sectionsContainer");

    fontTypeSelect.addEventListener("change", function () {
        resumeElement.style.fontFamily = fontTypeSelect.value;
    });

    fontSizeInput.addEventListener("input", function () {
        resumeElement.style.fontSize = fontSizeInput.value + "px";
    });

    lineSpacingSelect.addEventListener("change", function () {
        resumeElement.style.lineHeight = lineSpacingSelect.value;
    });

    titleStyleSelect.addEventListener("change", function () {
        const sections = resumeElement.querySelectorAll("section");
        sections.forEach(section => {
            if (titleStyleSelect.value === "shaded") {
                section.querySelector("h2").style.backgroundColor = "#f4f4f4";
            } else {
                section.querySelector("h2").style.backgroundColor = "transparent";
            }
        });
    });

    titlePositionSelect.addEventListener("change", function () {
        const sections = resumeElement.querySelectorAll("section");
        sections.forEach(section => {
            const hr = section.nextElementSibling;
            if (hr && hr.classList.contains("section-separator")) {
                if (titlePositionSelect.value === "above") {
                    section.insertAdjacentElement("beforebegin", hr);
                } else {
                    section.insertAdjacentElement("afterend", hr);
                }
            }
        });
    });

    const modal = document.getElementById("sectionsModal");
    const btn = document.getElementById("toggleSectionsButton");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const sectionToggles = sectionsContainer.querySelectorAll("input[type=checkbox]");
    sectionToggles.forEach(toggle => {
        toggle.addEventListener("change", function () {
            const sectionId = toggle.id.replace("toggle", "").toLowerCase();
            const sectionElement = document.getElementById(sectionId);
            sectionElement.style.display = toggle.checked ? "block" : "none";
            updateHorizontalLines();
        });
    });

    function updateHorizontalLines() {
        const sections = resumeElement.querySelectorAll("section");
        sections.forEach(section => {
            const hr = section.nextElementSibling;
            if (hr && hr.classList.contains("section-separator")) {
                if (section.style.display === "none") {
                    hr.style.display = "none";
                } else {
                    hr.style.display = "block";
                }
            }
        });
    }
});

function generatePDF() {
    const element = document.getElementById("resume");
    const opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
}
