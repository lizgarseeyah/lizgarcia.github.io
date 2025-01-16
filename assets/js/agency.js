document.addEventListener("DOMContentLoaded", () => {
    console.log("Website is fully loaded and operational.");

    const navLinks = document.querySelectorAll("header nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute("href").substring(1);
            const section = document.getElementById(sectionId);

            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
