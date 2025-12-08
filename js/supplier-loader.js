// Supplier Component Loader & Sidebar Logic

async function loadSupplierSidebar(activePageName) {
    try {
        const res = await fetch('../components/supplier-sidebar.html');
        const html = await res.text();
        document.getElementById('supplier-sidebar-container').innerHTML = html;
        initSupplierSidebar();
        
        // Highlight Active Menu
        if (activePageName) {
            setTimeout(() => {
                const links = document.querySelectorAll('#supplier-sidebar nav a');
                links.forEach(link => {
                    const linkText = link.querySelector('.supplier-sidebar-text')?.textContent.trim();
                    if (linkText === activePageName || link.href.includes(activePageName)) {
                        link.classList.add('bg-emerald-50', 'dark:bg-emerald-900/20', 'text-emerald-600', 'dark:text-emerald-400');
                        link.classList.remove('text-slate-500', 'dark:text-slate-400');
                        link.querySelector('i')?.classList.remove('opacity-70');
                        link.querySelector('i')?.classList.add('opacity-100');
                    }
                });
            }, 50);
        }
    } catch (error) {
        console.error("Error loading sidebar:", error);
    }
}

function initSupplierSidebar() {
    const sidebar = document.getElementById('supplier-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('supplier-sidebar-close');
    const collapseBtn = document.getElementById('supplier-sidebar-collapse');
    const mainContent = document.getElementById('main-content');
    const sidebarTexts = document.querySelectorAll('.supplier-sidebar-text');
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
        const isCollapsed = sidebar.classList.contains('w-[70px]');
        const header = document.getElementById('supplier-sidebar-header');
        const navItems = document.querySelectorAll('.supplier-nav-item');
        const collapseContainer = document.getElementById('supplier-sidebar-collapse');
        const userProfile = document.getElementById('supplier-user-profile');
        
        if (isCollapsed) {
            // Expand
            sidebar.classList.replace('w-[70px]', 'w-[180px]');
            mainContent.classList.replace('md:ml-[70px]', 'md:ml-[180px]');
            sidebarTexts.forEach(el => el.classList.remove('hidden'));
            collapseIcon?.classList.remove('rotate-180');
            
            // Remove centering
            header?.classList.remove('justify-center');
            navItems?.forEach(el => el.classList.remove('justify-center'));
            collapseContainer?.classList.remove('justify-center');
            userProfile?.classList.remove('justify-center');

            localStorage.setItem('supplier-sidebar-collapsed', 'false');
        } else {
            // Collapse
            sidebar.classList.replace('w-[180px]', 'w-[70px]');
            mainContent.classList.replace('md:ml-[180px]', 'md:ml-[70px]');
            sidebarTexts.forEach(el => el.classList.add('hidden'));
            collapseIcon?.classList.add('rotate-180');
            
            // Add centering
            header?.classList.add('justify-center');
            navItems?.forEach(el => el.classList.add('justify-center'));
            collapseContainer?.classList.add('justify-center');
            userProfile?.classList.add('justify-center');

            localStorage.setItem('supplier-sidebar-collapsed', 'true');
        }
    }

    // Init State from localStorage
    const savedState = localStorage.getItem('supplier-sidebar-collapsed');
    if (savedState === 'true') {
        sidebar.classList.replace('w-[180px]', 'w-[70px]');
        mainContent.classList.replace('md:ml-[180px]', 'md:ml-[70px]');
        sidebarTexts.forEach(el => el.classList.add('hidden'));
        collapseIcon?.classList.add('rotate-180');
        
        const header = document.getElementById('supplier-sidebar-header');
        const navItems = document.querySelectorAll('.supplier-nav-item');
        const collapseContainer = document.getElementById('supplier-sidebar-collapse');
        const userProfile = document.getElementById('supplier-user-profile');
        
        header?.classList.add('justify-center');
        navItems?.forEach(el => el.classList.add('justify-center'));
        collapseContainer?.classList.add('justify-center');
        userProfile?.classList.add('justify-center');
    }

    if(toggleBtn) toggleBtn.addEventListener('click', openSidebar);
    if(closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if(overlay) overlay.addEventListener('click', closeSidebar);
    if(collapseBtn) collapseBtn.addEventListener('click', toggleCollapse);
}
