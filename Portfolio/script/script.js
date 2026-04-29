// Tailwind Configuration
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#3b82f6',
                secondary: '#6366f1',
                darkBg: '#09090b', 
                darkCard: '#18181b',
            }
        }
    }
}

// 1. TOP Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) { progressBar.style.width = scrolled + "%"; }
});

// 2. ENHANCED PARALLAX Project & Award Cards Logic
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Gentle tilt rotation
        const rotateX = (y - centerY) / 25; 
        const rotateY = (centerX - x) / 25;
        
        // Image offset pan
        const shiftX = (x - centerX) / 15;
        const shiftY = (y - centerY) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        
        const img = card.querySelector('.project-image');
        if (img) { 
            img.style.transform = `scale(1.15) translate(${shiftX}px, ${shiftY}px)`; 
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        const img = card.querySelector('.project-image');
        if (img) { 
            img.style.transform = `scale(1) translate(0px, 0px)`; 
        }
    });
});

// 3. Scroll Reveal Logic
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) { 
            reveals[i].classList.add("active"); 
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// 4. Dark/Light Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    if(themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });
}

// 5. MODAL LOGIC FOR AWARDS & CERTIFICATES
const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('modal-img');
const closeModalBtn = document.getElementById('close-modal');
const triggers = document.querySelectorAll('.cert-trigger');

function openModal(imgSrc) {
    if(!modal || !modalImg) return;
    modalImg.src = imgSrc;
    modal.classList.remove('hidden');
    void modal.offsetWidth; // Force Reflow
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeModal() {
    if(!modal) return;
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const imgElement = trigger.querySelector('img');
        if(imgElement) openModal(imgElement.src);
    });
});

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modal) {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });