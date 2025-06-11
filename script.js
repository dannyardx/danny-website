document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const mainPageContent = document.getElementById('main-page-content');
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const heroSection = document.getElementById('hero-after-header');
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    const sidebarToggleDesktop = document.getElementById('sidebar-toggle-desktop');
    // const leftPanelToggle = document.getElementById('left-panel-toggle'); // HAPUS INI, diambil di dynamic-toggles-handler.js

    // --- Smooth Scrolling (untuk nav links) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                if (window.innerWidth <= 991 && sidebarNav && sidebarNav.classList.contains('is-open')) {
                    sidebarNav.classList.remove('is-open');
                    mainPageContent.classList.remove('dim-content');
                    body.classList.remove('no-scroll');
                    sidebarOverlay.classList.remove('is-visible');

                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }, 300);
                } 
                else {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            } else {
                console.warn(`Target element ${targetId} not found for smooth scroll.`);
            }
        });
    });

    // --- Section Fade-In Animation ---
    const sections = document.querySelectorAll('.section');
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(1.875rem)';
        section.style.transition = 'opacity 1s ease-out, transform 1s ease-out, background-color 0.5s ease, border-color 0.5s ease';
        sectionObserver.observe(section);
    });

    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // --- Typing Effect ---
    const typingTextElement = document.getElementById('typing-text');

    if (typingTextElement) {
        const words = JSON.parse(typingTextElement.getAttribute('data-words'));
        let wordIndex = 0;
        const delayBeforeNextWord = 2000;

        function displayNextWord() {
            typingTextElement.textContent = words[wordIndex];
            
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(() => {
                displayNextWord();
            }, delayBeforeNextWord);
        }
        displayNextWord();
    }

    // --- Dynamic Portfolio Projects ---
    const portfolioItems = [
        {
            title: "Desain UI/UX Aplikasi XYZ",
            description: "Proyek desain antarmuka pengguna untuk aplikasi mobile XYZ, berfokus pada kemudahan penggunaan dan estetika modern.",
            link: "https://www.behance.net/yourproject1",
            placeholderText: "Desain UI/UX"
        },
        {
            title: "Website Portofolio Pribadi (V1)",
            description: "Pengembangan website pribadi menggunakan HTML, CSS, dan JavaScript vanilla. Menampilkan keahlian dasar web development.",
            link: "https://github.com/yourproject2",
            placeholderText: "Web Dev"
        },
        {
            title: "Video Promosi Produk Baru",
            description: "Produksi dan editing video promosi untuk peluncuran produk X, termasuk motion graphics dan sound design.",
            link: "https://www.youtube.com/yourproject3",
            placeholderText: "Video Editor"
        },
        {
            title: "Campaign Media Sosial ABC",
            description: "Strategi dan eksekusi konten media sosial untuk kampanye merek ABC, menghasilkan peningkatan engagement 30%.",
            link: "https://www.instagram.com/yourproject4",
            placeholderText: "Konten Kreator"
        }
    ];

    const portfolioContainer = document.getElementById('portfolio-items-container');

    if (portfolioContainer) {
        portfolioItems.forEach(project => {
            const portfolioItemDiv = document.createElement('div');
            portfolioItemDiv.classList.add('portfolio-item');

            const placeholderDiv = document.createElement('div');
            placeholderDiv.textContent = project.placeholderText;

            const titleH3 = document.createElement('h3');
            titleH3.textContent = project.title;

            const descriptionP = document.createElement('p');
            descriptionP.textContent = project.description;

            const linkA = document.createElement('a');
            linkA.href = project.link;
            linkA.target = "_blank";
            linkA.classList.add('btn-link');
            linkA.textContent = "Lihat Proyek";

            portfolioItemDiv.appendChild(placeholderDiv);
            portfolioItemDiv.appendChild(titleH3);
            portfolioItemDiv.appendChild(descriptionP);
            portfolioItemDiv.appendChild(linkA);

            portfolioContainer.appendChild(portfolioItemDiv);
        });
    }

    // --- Mobile Sidebar Toggle & Overlay Logic ---
    if (mobileSidebarToggle && sidebarNav && mainPageContent && sidebarOverlay) {
        mobileSidebarToggle.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                sidebarNav.classList.toggle('is-open');
                mainPageContent.classList.toggle('dim-content');
                body.classList.toggle('no-scroll');
                sidebarOverlay.classList.toggle('is-visible');
            } else {
                console.log("Tombol titik tiga diklik di desktop. Sidebar mobile tidak terbuka.");
            }
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebarNav.classList.remove('is-open');
            mainPageContent.classList.remove('dim-content');
            body.classList.remove('no-scroll');
            sidebarOverlay.classList.remove('is-visible');
        });
    } else {
        console.error("ERROR: One or more sidebar/toggle elements not found.");
        if (!mobileSidebarToggle) console.error("mobileSidebarToggle not found.");
        if (!sidebarNav) console.error("sidebarNav not found.");
        if (!mainPageContent) console.error("mainPageContent not found.");
        if (!sidebarOverlay) console.error("sidebarOverlay not found.");
    }

    // --- Logic untuk Tombol Mobile Sidebar (Titik Tiga) ---
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;
    const showThreshold = heroHeight * 0.5;
    const hideThreshold = heroHeight + 200; 

    const handleMobileToggleVisibility = () => {
        if (!mobileSidebarToggle) return;

        if (window.innerWidth <= 991) {
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;

            if (currentScrollY < showThreshold) {
                mobileSidebarToggle.classList.add('faded-on-hero');
                mobileSidebarToggle.classList.remove('hidden-on-scroll');
            } else if (currentScrollY >= hideThreshold) {
                mobileSidebarToggle.classList.add('hidden-on-scroll');
                mobileSidebarToggle.classList.remove('faded-on-hero');
            } else {
                mobileSidebarToggle.classList.remove('faded-on-hero');
                mobileSidebarToggle.classList.remove('hidden-on-scroll');
            }
        } else {
            mobileSidebarToggle.classList.remove('faded-on-hero');
            mobileSidebarToggle.classList.remove('hidden-on-scroll');
        }
    };

    window.addEventListener('scroll', handleMobileToggleVisibility);
    window.addEventListener('resize', handleMobileToggleVisibility); 
    handleMobileToggleVisibility();

    // --- Logika Tombol Scroll-to-Top ---
    if (scrollToTopBtn) {
        const toggleScrollToTopButton = () => {
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;
            const documentHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight;
            const scrollFromBottom = documentHeight - (currentScrollY + viewportHeight);

            const scrollThresholdToAppear = 300; 
            const scrollThresholdToEnd = 150; 

            if (currentScrollY > scrollThresholdToAppear) {
                scrollToTopBtn.classList.add('transparent-on-scroll');
                scrollToTopBtn.classList.remove('show'); 
                
                if (scrollFromBottom < scrollThresholdToEnd) {
                    scrollToTopBtn.classList.add('show');
                    scrollToTopBtn.classList.remove('transparent-on-scroll');
                }
            } else {
                scrollToTopBtn.classList.remove('show');
                scrollToTopBtn.classList.remove('transparent-on-scroll');
            }
        };

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', toggleScrollToTopButton);
        toggleScrollToTopButton();
    } else {
        console.error("Scroll-to-top button not found.");
    }

    // --- Logika Tombol Toggle Sidebar Desktop ---
    if (sidebarToggleDesktop) {
        sidebarToggleDesktop.addEventListener('click', () => {
            const mainLayout = document.querySelector('.main-layout');
            if (window.innerWidth > 991 && mainLayout && sidebarNav) {
                const isSidebarHidden = mainLayout.classList.toggle('sidebar-hidden-desktop');
                sidebarNav.classList.toggle('hidden-desktop');
                sidebarToggleDesktop.classList.toggle('sidebar-toggled');
                
                if (isSidebarHidden) {
                    sidebarToggleDesktop.style.right = '0px'; 
                } else {
                    sidebarToggleDesktop.style.right = '280px';
                }
            }
        });

        const adjustDesktopTogglePosition = () => {
            const mainLayout = document.querySelector('.main-layout');
            if (window.innerWidth > 991 && mainLayout && sidebarNav) {
                if (mainLayout.classList.contains('sidebar-hidden-desktop')) {
                    sidebarToggleDesktop.style.right = '0px'; 
                    sidebarToggleDesktop.classList.add('sidebar-toggled');
                } else {
                    sidebarToggleDesktop.style.right = '280px';
                    sidebarToggleDesktop.classList.remove('sidebar-toggled');
                }
                sidebarToggleDesktop.style.display = 'flex';
            } else if (sidebarToggleDesktop) {
                sidebarToggleDesktop.style.display = 'none';
            }
        };

        window.addEventListener('resize', adjustDesktopTogglePosition);
        adjustDesktopTogglePosition();
    } else {
        console.error("Desktop sidebar toggle button not found.");
    }
});