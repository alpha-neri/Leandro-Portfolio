document.addEventListener('DOMContentLoaded', () => {
    
    // --- Chart Tooltip Logic (New Request) ---
    const chartContainer = document.getElementById('trendChartContainer');
    const tooltip = document.getElementById('chartTooltip');
    const tracker = document.getElementById('chartTracker');
    const svg = document.getElementById('trendSvg');
    const path = document.getElementById('trendPath');

    chartContainer.addEventListener('mousemove', (e) => {
        const rect = chartContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        // Ensure X is within bounds of the SVG viewbox (0 to 400)
        const svgWidth = rect.width;
        const scaleX = 400 / svgWidth;
        const svgX = x * scaleX;

        // Calculate a simulated value based on the SVG path shape
        // Senior tip: In a real app, this would query the path data or an array
        let simulatedValue;
        if (svgX < 100) simulatedValue = 1200 + (svgX * 5);
        else if (svgX < 200) simulatedValue = 1700 - ((svgX - 100) * 8);
        else if (svgX < 300) simulatedValue = 900 + ((svgX - 200) * 12);
        else simulatedValue = 2100 - ((svgX - 300) * 15);

        // Update Tooltip position and content
        tooltip.style.display = 'block';
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${e.clientY - rect.top}px`;
        tooltip.innerHTML = `$${Math.floor(simulatedValue).toLocaleString()}`;

        // Update vertical tracker line
        tracker.style.display = 'block';
        tracker.style.left = `${x}px`;
    });

    chartContainer.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
        tracker.style.display = 'none';
    });

    // --- Dropdown Management ---
    const toggleDropdown = (btnId, menuId) => {
        const btn = document.getElementById(btnId);
        const menu = document.getElementById(menuId);
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = menu.style.display === 'block';
            document.querySelectorAll('.dropdown-content').forEach(d => d.style.display = 'none');
            menu.style.display = isVisible ? 'none' : 'block';
        });
    };

    toggleDropdown('profileBtn', 'profileDropdown');
    toggleDropdown('notifBtn', 'notifDropdown');
    toggleDropdown('msgBtn', 'msgDropdown');

    // --- Modal Logic ---
    const modal = document.getElementById('modal');
    const closeBtns = document.querySelectorAll('.close-modal, .btn-close');

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const rowText = btn.closest('tr').querySelector('td').innerText;
            document.getElementById('modalTitle').innerText = "Edit: " + rowText;
            document.getElementById('modalBodyText').innerText = "Adjusting operational parameters for activity: " + rowText;
            modal.style.display = 'flex';
        });
    });

    closeBtns.forEach(btn => btn.addEventListener('click', () => modal.style.display = 'none'));

    // Global click listener
    window.addEventListener('click', (e) => {
        if (!e.target.matches('.icon-btn') && !e.target.matches('.profile-img')) {
            document.querySelectorAll('.dropdown-content').forEach(d => d.style.display = 'none');
        }
        if (e.target === modal) modal.style.display = 'none';
    });
});