/* =========================================================
   BLUE LOCK PROJECT — script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons = document.querySelectorAll("button, .btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.add("clicked");

            setTimeout(() => {
                button.classList.remove("clicked");
            }, 200);
        });
    });


    /* =====================================================
       SMOOTH NAVIGATION
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       PLAYER CARD INTERACTION
       ===================================================== */

    const playerCards = document.querySelectorAll(
        ".player-card"
    );

    playerCards.forEach(card => {
        card.addEventListener("click", () => {

            playerCards.forEach(otherCard => {
                otherCard.classList.remove("selected");
            });

            card.classList.add("selected");

            console.log(
                "Selected player:",
                card.querySelector("h3")?.textContent || "Unknown"
            );
        });
    });


    /* =====================================================
       STAT NUMBER ANIMATION
       ===================================================== */

    const statValues = document.querySelectorAll(
        ".stat-value"
    );

    const animateNumber = element => {

        const target = parseInt(
            element.textContent.replace(/\D/g, ""),
            10
        );

        if (isNaN(target)) return;

        let current = 0;

        const duration = 1000;
        const steps = 40;
        const increment = target / steps;

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            element.textContent =
                Math.floor(current);

        }, duration / steps);
    };


    /* =====================================================
       STAT OBSERVER
       ===================================================== */

    const statObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateNumber(entry.target);

                    statObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    statValues.forEach(stat => {
        statObserver.observe(stat);
    });


    /* =====================================================
       PROGRESS BAR ANIMATION
       ===================================================== */

    const progressBars = document.querySelectorAll(
        ".progress-bar"
    );

    progressBars.forEach(bar => {

        const originalWidth =
            bar.style.width ||
            getComputedStyle(bar).width;

        bar.style.width = "0%";

        setTimeout(() => {
            bar.style.width = originalWidth;
        }, 300);
    });


    /* =====================================================
       EGO MESSAGE
       ===================================================== */

    const egoBox = document.querySelector(".ego-box");

    if (egoBox) {

        egoBox.addEventListener("click", () => {

            egoBox.style.transform =
                "scale(1.02)";

            setTimeout(() => {
                egoBox.style.transform =
                    "scale(1)";
            }, 150);
        });
    }


    /* =====================================================
       RANDOM EGO MESSAGE
       ===================================================== */

    const egoMessages = [
        "Your greatest weapon is the one nobody can predict.",
        "Stop waiting for the perfect moment. Create it.",
        "A striker must create their own goal.",
        "Your ego is your weapon. Control it.",
        "Don't copy another player's weapon. Build your own.",
        "The field is where your decisions become reality.",
        "Adapt. Devour. Evolve."
    ];

    const egoText =
        document.querySelector(
            ".ego-box p"
        );

    const egoButton =
        document.querySelector(
            "#egoButton"
        );

    if (egoButton && egoText) {

        egoButton.addEventListener(
            "click",
            () => {

                const randomIndex =
                    Math.floor(
                        Math.random() *
                        egoMessages.length
                    );

                egoText.textContent =
                    egoMessages[randomIndex];
            }
        );
    }


    /* =====================================================
       PLAYER SEARCH
       ===================================================== */

    const searchInput =
        document.querySelector(
            "#playerSearch"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const search =
                    searchInput.value
                        .toLowerCase()
                        .trim();

                playerCards.forEach(card => {

                    const text =
                        card.textContent
                            .toLowerCase();

                    if (text.includes(search)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });
            }
        );
    }


    /* =====================================================
       PLAYER STAT CALCULATOR
       ===================================================== */

    const statInputs =
        document.querySelectorAll(
            "[data-stat]"
        );

    const overallDisplay =
        document.querySelector(
            "#overallRating"
        );

    function calculateOverall() {

        if (
            !statInputs.length ||
            !overallDisplay
        ) {
            return;
        }

        let total = 0;
        let count = 0;

        statInputs.forEach(input => {

            const value =
                Number(input.value);

            if (
                !isNaN(value) &&
                value >= 0
            ) {
                total += value;
                count++;
            }
        });

        if (count === 0) return;

        const overall =
            Math.round(total / count);

        overallDisplay.textContent =
            overall;
    }

    statInputs.forEach(input => {
        input.addEventListener(
            "input",
            calculateOverall
        );
    });


    /* =====================================================
       RATING COLOR / EGO LEVEL
       ===================================================== */

    const rating =
        document.querySelector(
            "#overallRating"
        );

    const ratingLabel =
        document.querySelector(
            "#ratingLabel"
        );

    function updateRating() {

        if (!rating || !ratingLabel) return;

        const value =
            Number(rating.textContent);

        if (value >= 90) {
            ratingLabel.textContent =
                "WORLD CLASS";
        }

        else if (value >= 80) {
            ratingLabel.textContent =
                "ELITE";
        }

        else if (value >= 70) {
            ratingLabel.textContent =
                "STRONG";
        }

        else if (value >= 60) {
            ratingLabel.textContent =
                "DEVELOPING";
        }

        else {
            ratingLabel.textContent =
                "BEGINNER";
        }
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    updateRating();

    console.log(
        "⚽ BLUE LOCK SYSTEM ONLINE"
    );

});
