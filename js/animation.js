

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Redirection Infrastructure for Card Actions
    initEnrollmentRedirects();

    // 2. Initialize Statistics Counter Dashboard Rollup
    animatePlatformCounters();
});

/**
 * Intercepts course card button clicks and redirects to the catalog matrix cleanly
 */
function initEnrollmentRedirects() {
    // Select all "Enroll Now" buttons on the homepage
    const enrollButtons = document.querySelectorAll('.btn-card');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Prevent HTML inline onclick actions and JS event bubbling conflicts
            event.preventDefault();
            event.stopPropagation();
            
            /**
             * DIRECTIONAL PATH CHECK:
             * Change this path below to match your directory layout structure:
             * Use '../html/course.html' if index.html is outside the html folder.
             * Use 'course.html' if index.html and course.html are in the same folder.
             */
            window.location.href = '../html/course.html';
        });
    });
}

/**
 * Scans, processes, and rolls numeric layout values up smoothly from zero
 */
function animatePlatformCounters() {
    // Gather statistics nodes from Hero, Floating Collage Badges, and Pre-Footer layouts
    const statNodes = document.querySelectorAll('.stat-item h3, .inline-stat-item h3, .floating-stat-badge p');

    statNodes.forEach(node => {
        const rawText = node.textContent.trim();
        
        // Parse out formatting labels (K, +, %, commas) to isolate the raw target integers
        const targetValue = parseInt(rawText.replace(/[^0-9]/g, ''), 10);
        const suffix = rawText.replace(/[0-9,]/g, ''); // Extract formatting characters like 'K+', '+', or '%'
        
        if (isNaN(targetValue)) return;

        let startValue = 0;
        const animationDuration = 2000; // Total animation execution run-time (2 seconds)
        const frameRate = 1000 / 60; // Target computing interval for 60 FPS refresh rates
        const totalSteps = Math.round(animationDuration / frameRate);
        const incrementalStep = targetValue / totalSteps;

        let currentStep = 0;

        const counterTimer = setInterval(() => {
            currentStep++;
            startValue += incrementalStep;

            if (currentStep >= totalSteps) {
                clearInterval(counterTimer);
                // Hardcode final clean presentation values to completely eliminate decimal drift
                node.textContent = formatFinalOutput(targetValue, suffix);
            } else {
                node.textContent = formatFinalOutput(Math.floor(startValue), suffix);
            }
        }, frameRate);
    });
}

/**
 * Restructures numerical values cleanly back to match presentation layer design configurations
 */
function formatFinalOutput(value, suffix) {
    // Applies local standard localization formatting rules (adds back commas for numbers over 1,000)
    let formattedValue = value.toLocaleString();
    return `${formattedValue}${suffix}`;
}