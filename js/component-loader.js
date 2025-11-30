async function loadComponents(sidebarPath, navbarPath, activePageTitle) {
    try {
        // Load Sidebar
        if (sidebarPath) {
            const sidebarResponse = await fetch(sidebarPath);
            const sidebarHtml = await sidebarResponse.text();
            const sidebarContainer = document.getElementById('sidebar-container');
            if (sidebarContainer) {
                sidebarContainer.innerHTML = sidebarHtml;
                // Initialize Sidebar Logic
                initSidebar();
                // Highlight Active Menu
                if (activePageTitle) {
                    highlightActiveMenu(activePageTitle);
                }
            }
        }

        // Load Navbar
        if (navbarPath) {
            const navbarResponse = await fetch(navbarPath);
            const navbarHtml = await navbarResponse.text();
            const navbarContainer = document.getElementById('navbar-container');
            if (navbarContainer) {
                navbarContainer.innerHTML = navbarHtml;
                // Initialize Navbar Logic
                initNavbar();
            }
        }

    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function initSidebar() {
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('sidebar-toggle'); // In Navbar
    const closeBtn = document.getElementById('sidebar-close'); // In Sidebar
    const collapseBtn = document.getElementById('sidebar-collapse-desktop'); // In Sidebar footer
    
    // Handle both ID conventions
    const mainContent = document.getElementById('main-content-wrapper') || document.getElementById('main-content');
    
    const sidebarTexts = document.querySelectorAll('.sidebar-text');
    const collapseIcon = collapseBtn?.querySelector('i');

    if (!sidebar || !mainContent) return;

    // Mobile Toggle
    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        if (overlay) {
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        }
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        if (overlay) {
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
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
            
            // Show Text Elements
            sidebarTexts.forEach(el => {
                el.classList.remove('hidden');
                setTimeout(() => el.classList.remove('opacity-0', 'w-0'), 50);
            });

            if (collapseIcon) collapseIcon.classList.remove('rotate-180');
            localStorage.setItem('sidebar-collapsed', 'false');
        } else {
            // Collapse
            sidebar.classList.remove('w-64');
            sidebar.classList.add('w-20');
            
            mainContent.classList.remove('md:ml-64');
            mainContent.classList.add('md:ml-20');
            
            // Hide Text Elements
            sidebarTexts.forEach(el => {
                el.classList.add('opacity-0', 'w-0');
                setTimeout(() => el.classList.add('hidden'), 300);
            });

            if (collapseIcon) collapseIcon.classList.add('rotate-180');
            localStorage.setItem('sidebar-collapsed', 'true');
        }
    }

    // Init State from LocalStorage
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState === 'true') {
         sidebar.classList.remove('w-64');
         sidebar.classList.add('w-20');
         mainContent.classList.remove('md:ml-64');
         mainContent.classList.add('md:ml-20');
         
         sidebarTexts.forEach(el => {
            el.classList.add('opacity-0', 'w-0', 'hidden');
         });
         
         if (collapseIcon) collapseIcon.classList.add('rotate-180');
    }

    if(toggleBtn) toggleBtn.addEventListener('click', openSidebar);
    if(closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if(overlay) overlay.addEventListener('click', closeSidebar);
    if(collapseBtn) collapseBtn.addEventListener('click', toggleCollapse);
}

function highlightActiveMenu(title) {
    const links = document.querySelectorAll('#main-sidebar nav a');
    links.forEach(link => {
        const span = link.querySelector('span.sidebar-text');
        if (span && span.textContent.trim() === title) {
            link.classList.add('bg-indigo-50', 'dark:bg-indigo-500/10', 'text-primary', 'dark:text-indigo-400');
            link.classList.remove('text-slate-500', 'dark:text-slate-400');
            
            // Update icon opacity if needed
            const icon = link.querySelector('i');
            if (icon) {
                icon.classList.remove('opacity-70');
                icon.classList.add('opacity-100');
            }
        }
    });
}

function initNavbar() {
    // Re-attach sidebar toggle if it's in the navbar
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
             const sidebar = document.getElementById('main-sidebar');
             const overlay = document.getElementById('sidebar-overlay');
             if (sidebar) sidebar.classList.remove('-translate-x-full');
             if (overlay) {
                overlay.classList.remove('hidden');
                setTimeout(() => overlay.classList.remove('opacity-0'), 10);
             }
        });
    }
}