// Course data source + UI logic for course-details.html
const courseDatabase = {
    "python": {
        title: "Mastering Python: From Basics to Advanced",
        instructor: "talim.com Team",
        price: "NPR 1,000",
        oldPrice: "NPR 3,000",
        rating: "4.9",
        students: "12450",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
        desc: "Master Python programming from absolute ground zero. Learn backend scripting logic structures, algorithms, object-oriented concepts, and clean production architecture optimization frameworks standard across elite tech teams.",
        hours: "48 hours of comprehensive instruction"
    },
    "ai-fundamentals": {
        title: "AI Fundamentals: Your First Neural Network",
        instructor: "talim.com Team",
        price: "NPR 8,500",
        oldPrice: "NPR 12,000",
        rating: "4.8",
        students: "8920",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        desc: "Master the foundations of Artificial Intelligence and Machine Learning. From understanding classic mathematical mechanics to coding baseline mathematical configurations using TensorFlow, discover how data models make logical classifications.",
        hours: "32 hours of interactive learning blocks"
    },
    "seo-strategies": {
        title: "Advanced SEO Strategies For Teams",
        instructor: "Broadway Infosys",
        price: "NPR 2,000",
        oldPrice: "NPR 5,000",
        rating: "4.7",
        students: "5400",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        desc: "Elevate your enterprise rank positions across search engine parameters. Learn indexing pipelines, dynamic keyword data mappings, programmatic speed enhancements, and technical architecture configuration optimizations for cross-functional teams.",
        hours: "24 hours of technical strategy coaching"
    },
    "uiux-masterclass": {
        title: "UI/UX Design Masterclass",
        instructor: "talim.com Team",
        price: "NPR 1,800",
        oldPrice: "NPR 4,500",
        rating: "4.9",
        students: "15200",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
        desc: "Deep dive into visual interaction hierarchies, design systems, modern typography standards, wireframe validation tracking, testing modules, and pixel-perfect high-fidelity interface prototyping setups inside modern collaboration ecosystems.",
        hours: "60 hours of interface layout labs"
    },
    "fullstack-javascript": {
        title: "Full Stack JavaScript: Modern Stack",
        instructor: "Web Devs Group",
        price: "NPR 2,700",
        oldPrice: "NPR 7,500",
        rating: "4.8",
        students: "22100",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        desc: "Become a proficient, self-contained cloud application engineer. Cover reactive visual client mechanics, asynchronous logical data systems, non-relational storage architectures, validation configurations, and server deployments.",
        hours: "120 hours of end-to-end cloud development"
    },
    "blockchain-solidity": {
        title: "Solidity & Smart Contracts Mastery",
        instructor: "Core Engineers",
        price: "NPR 3,000",
        oldPrice: "NPR 9,000",
        rating: "4.6",
        students: "2800",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
        desc: "Unlock cryptography transaction capabilities. Program gas-optimized logic rules, execute programmatic parameter validations, compile secure protocol blocks, map variable dependencies, and defend against vector exploits.",
        hours: "40 hours of advanced cryptographic coding"
    }
};

// Course details page logic.
document.addEventListener('DOMContentLoaded', () => {
    // Extract course key from the URL query string (e.g., ?course=python)
    const urlParams = new URLSearchParams(window.location.search);
    const courseKey = urlParams.get('course') || 'python';

    // Find the matching course from the in-file database.
    const selectedData = courseDatabase[courseKey];

    // Populate the course details section; show a fallback message if not found.
    if (selectedData) {
        document.getElementById('course-title').innerText = selectedData.title;
        document.getElementById('breadcrumb-current').innerText = selectedData.title;
        document.getElementById('course-instructor').innerText = selectedData.instructor;
        document.getElementById('course-rating').innerText = selectedData.rating;
        document.getElementById('course-students').innerText = Number(selectedData.students).toLocaleString();
        document.getElementById('course-cover').src = selectedData.image;
        document.getElementById('course-description').innerText = selectedData.desc;
        document.getElementById('panel-price').innerText = selectedData.price;
        document.getElementById('panel-old-price').innerText = selectedData.oldPrice;
        document.getElementById('inc-hours').innerText = selectedData.hours;

        document.getElementById('course-main-video').src = `../assets/coding.mp4`;

        document.getElementById('modal-summary-title').innerText = selectedData.title;
        document.getElementById('modal-summary-price').innerText = selectedData.price;
    } else {
        document.getElementById('course-title').innerText = "Course Profile Not Found";
    }

    // Video controls
    const previewBoxContainer = document.getElementById('preview-box-container');
    const triggerPlayVideo = document.getElementById('trigger-play-video');
    const courseMainVideo = document.getElementById('course-main-video');

    triggerPlayVideo.addEventListener('click', () => {
        previewBoxContainer.classList.add('playing');
        courseMainVideo.play();
    });

    // Modal controls
    const enrollmentModal = document.getElementById('enrollment-modal');
    const successModal = document.getElementById('success-modal');
    const openEnrollBtn = document.getElementById('open-enroll-modal');
    const closeEnrollBtn = document.getElementById('close-enroll-modal');
    const enrollForm = document.getElementById('enroll-form');
    const closeSuccessBtn = document.getElementById('btn-success-close');

    openEnrollBtn.addEventListener('click', () => enrollmentModal.classList.add('active'));
    closeEnrollBtn.addEventListener('click', () => enrollmentModal.classList.remove('active'));

    enrollForm.addEventListener('submit', (e) => {
        e.preventDefault();
        enrollmentModal.classList.remove('active');
        successModal.classList.add('active');
    });

    closeSuccessBtn.addEventListener('click', () => {
        window.location.href = "dashboard.html";
    });

    window.addEventListener('click', (e) => {
        if (e.target === enrollmentModal) enrollmentModal.classList.remove('active');
    });
});
