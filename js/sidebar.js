function initSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('sidebar-close');
    const collapseBtn = document.getElementById('sidebar-collapse-desktop');
    const mainContent = document.getElementById('main-content-wrapper');
    const sidebarTexts = document.querySelectorAll('.sidebar-text');
    const bottomBar = document.getElementById('pos-bottom-bar');
    const collapseIcon = collapseBtn?.querySelector('i');

    // Mobile Toggle
    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }

    // Desktop Collapse
    function toggleCollapse() {
        const isCollapsed = sidebar.classList.contains('w-20');

        if (isCollapsed) {
            // Expand
            sidebar.classList.remove('w-20');
            sidebar.classList.add('w-64');
            mainContent.classList.remove('md:ml-20');
            mainContent.classList.add('md:ml-64');
            if (bottomBar) {
                bottomBar.classList.remove('md:ml-20');
                bottomBar.classList.add('md:ml-64');
            }

            // Show Text Elements
            sidebarTexts.forEach(el => {
                el.classList.remove('hidden');
                setTimeout(() => el.classList.remove('opacity-0', 'w-0'), 50);
            });

            collapseIcon?.classList.remove('rotate-180');
            localStorage.setItem('sidebar-collapsed', 'false');
        } else {
            // Collapse
            sidebar.classList.remove('w-64');
            sidebar.classList.add('w-20');
            mainContent.classList.remove('md:ml-64');
            mainContent.classList.add('md:ml-20');
            if (bottomBar) {
                bottomBar.classList.remove('md:ml-64');
                bottomBar.classList.add('md:ml-20');
            }

            // Hide Text Elements
            sidebarTexts.forEach(el => {
                el.classList.add('opacity-0', 'w-0');
                setTimeout(() => el.classList.add('hidden'), 300); // Wait for transition
            });

            collapseIcon?.classList.add('rotate-180');
            localStorage.setItem('sidebar-collapsed', 'true');
        }
    }

    // Init State
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState === 'true') {
        sidebar.classList.remove('w-64');
        sidebar.classList.add('w-20');
        mainContent.classList.remove('md:ml-64');
        mainContent.classList.add('md:ml-20');
        if (bottomBar) {
            bottomBar.classList.remove('md:ml-64');
            bottomBar.classList.add('md:ml-20');
        }

        sidebarTexts.forEach(el => {
            el.classList.add('opacity-0', 'w-0', 'hidden');
        });

        collapseIcon?.classList.add('rotate-180');
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);
    if (collapseBtn) collapseBtn.addEventListener('click', toggleCollapse);
}
