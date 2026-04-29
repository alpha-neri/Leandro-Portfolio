document.addEventListener('DOMContentLoaded', () => {

    // 1. Fill Demo Functionality
    window.fillDemo = (role) => {
        const u = document.getElementById('username');
        const p = document.getElementById('password');
        
        gsap.to([u, p], { x: 5, yoyo: true, repeat: 5, duration: 0.05 });

        if(role === 'customer1') { u.value = 'customer1'; p.value = '123'; }
        else { u.value = 'seller1'; p.value = '123'; }
    };

    // 2. GSAP Entrance Sequence
    const tl = gsap.timeline();

    tl.from(".main-header", { y: -50, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".hero-content h1", { x: -100, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".hero-content p", { x: -50, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-actions button", { y: 20, opacity: 0, stagger: 0.2, duration: 0.5 }, "-=0.4")
      .from(".hero-image-slot", { scale: 0.8, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=1")
      .from(".floating-badge", { y: 30, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.5");

    // 3. Scroll Reveal Logic
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. Parallax Effect for Hero Image
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.005;

        gsap.to(".parallax-wrapper", {
            x: moveX * 2,
            y: moveY * 2,
            duration: 1,
            ease: "power2.out"
        });
    });

    // 5. Login Form Handler
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const u = document.getElementById('username').value;
        const p = document.getElementById('password').value;

        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
        btn.style.opacity = '0.7';

        setTimeout(() => {
            if((u === 'customer1' || u === 'seller1') && p === '123') {
                gsap.to(btn, { backgroundColor: '#22c55e', duration: 0.3 });
                btn.innerHTML = '<i class="fas fa-check"></i> Success';
                alert(`Authenticated as ${u}. Redirecting...`);
            } else {
                gsap.to(form, { x: 10, yoyo: true, repeat: 3, duration: 0.1 });
                btn.innerHTML = 'Error';
                btn.style.backgroundColor = '#ef4444';
                
                setTimeout(() => {
                    btn.innerHTML = '<span>Login</span><i class="fas fa-arrow-right"></i>';
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                }, 2000);
            }
        }, 1000);
    });
});