/**
 * AquaLink Customer Dashboard - Logic Controller
 * Senior Front-End Implementation
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SNAPPY ENTRANCE ANIMATION (GSAP) ---
    const runEntranceAnimation = () => {
        // Ensure body is visible
        document.body.style.opacity = '1';

        // Synchronized staggered reveal
        gsap.to(".animate-sync", {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out"
        });
    };

    // Run animation after a tiny delay for smooth rendering
    setTimeout(runEntranceAnimation, 100);


    // --- 2. UNIFIED DROPDOWN SYSTEM ---
    // Handles: Notification Bell, Order List, and Profile Menu
    const dropdownConfigs = [
        { btnId: 'notifBtn', menuId: 'notifDropdown' },
        { btnId: 'orderBtn', menuId: 'orderDropdown' },
        { btnId: 'profileTrigger', menuId: 'profileMenu' },
        { btnId: 'viewOrdersTrigger', menuId: 'orderDropdown' } // Dashboard button also opens orders
    ];

    dropdownConfigs.forEach(config => {
        const btn = document.getElementById(config.btnId);
        const menu = document.getElementById(config.menuId);

        if (btn && menu) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Close all other open dropdowns first
                closeAllDropdowns(menu);

                // Toggle target menu
                const isCurrentlyOpen = menu.style.display === 'flex';
                menu.style.display = isCurrentlyOpen ? 'none' : 'flex';
                
                // Optional: Snap animation for dropdown
                if (!isCurrentlyOpen) {
                    gsap.from(menu, { y: -10, opacity: 0, duration: 0.2 });
                }
            });
        }
    });

    function closeAllDropdowns(exceptThisOne = null) {
        const menus = document.querySelectorAll('.dropdown-panel, .profile-dropdown');
        menus.forEach(m => {
            if (m !== exceptThisOne) {
                m.style.display = 'none';
            }
        });
    }


    // --- 3. CHAT FEATURE LOGIC ---
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = chatWindow.style.display === 'flex';
            chatWindow.style.display = isOpen ? 'none' : 'flex';
            
            if (!isOpen) {
                gsap.from(chatWindow, { y: 20, scale: 0.9, opacity: 0, duration: 0.3, ease: "back.out(1.7)" });
            }
        });

        closeChat.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });
    }


    // --- 4. ORDER MODAL CONTROLLER ---
    const modal = document.getElementById('orderModal');
    const stationLabel = document.getElementById('selectedStation');

    // Attached to global window so 'onclick' in HTML can find it
    window.openOrderModal = (stationName) => {
        if (modal && stationLabel) {
            stationLabel.innerText = stationName;
            modal.style.display = 'flex';
            
            // Premium modal entrance
            gsap.from(".modal-content", { 
                scale: 0.8, 
                opacity: 0, 
                duration: 0.3, 
                ease: "back.out(1.5)" 
            });
        }
    };

    window.closeModal = () => {
        if (modal) modal.style.display = 'none';
    };

    window.confirmOrder = () => {
        // Simulation of a successful order
        const confirmBtn = document.querySelector('.btn-confirm');
        confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            alert('Order placed successfully! Redirecting to tracking...');
            confirmBtn.innerHTML = 'Confirm Order';
            closeModal();
        }, 1500);
    };


    // --- 5. GLOBAL CLICK HANDLER (UX REFINEMENT) ---
    // Closes dropdowns and chat when clicking anywhere else on the screen
    window.addEventListener('click', (e) => {
        // Close Dropdowns
        closeAllDropdowns();

        // Close Chat if clicking outside
        if (chatWindow && !chatWindow.contains(e.target) && !chatToggle.contains(e.target)) {
            chatWindow.style.display = 'none';
        }

        // Close Modal on overlay click
        if (e.target === modal) {
            closeModal();
        }
    });

    // Stop propagation inside menus so they don't close themselves when clicked
    document.querySelectorAll('.dropdown-panel, .profile-dropdown, .chat-window, .modal-content').forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

});