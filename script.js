document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const mainPageContent = document.getElementById('main-page-content');
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const heroSection = document.getElementById('hero-after-header');
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    const sidebarToggleDesktop = document.getElementById('sidebar-toggle-desktop'); // Dapatkan referensi tombol desktop baru

    // --- Smooth Scrolling (untuk nav links) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Tutup sidebar mobile jika terbuka (hanya di mobile)
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
                // Gulir halaman jika di desktop atau sidebar mobile tidak terbuka
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
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const delayBeforeDeleting = 1500;
        const delayBeforeTyping = 750;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let timeoutDelay = typingSpeed;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                timeoutDelay = delayBeforeDeleting;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                timeoutDelay = delayBeforeTyping;
            } else {
                timeoutDelay = isDeleting ? deletingSpeed : typingSpeed;
            }

            setTimeout(type, timeoutDelay);
        }
        type();
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
            placeholderDiv.classList.add('portfolio-placeholder');
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
            // Hanya aktifkan sidebar mobile di tampilan mobile
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

        if (window.innerWidth <= 991) { // Logika ini hanya berlaku untuk mobile
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
            // Di desktop: mobileSidebarToggle selalu display: none (di CSS)
            mobileSidebarToggle.classList.remove('faded-on-hero');
            mobileSidebarToggle.classList.remove('hidden-on-scroll');
        }
    };

    window.addEventListener('scroll', handleMobileToggleVisibility);
    window.addEventListener('resize', handleMobileToggleVisibility); 
    handleMobileToggleVisibility(); // Panggil sekali saat load

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
            // Pastikan operasi hanya di desktop
            if (window.innerWidth > 991 && mainLayout && sidebarNav) {
                const isSidebarHidden = mainLayout.classList.toggle('sidebar-hidden-desktop'); // Toggle kelas di main-layout
                sidebarNav.classList.toggle('hidden-desktop'); // Toggle kelas di sidebar-nav
                sidebarToggleDesktop.classList.toggle('sidebar-toggled'); // Toggle kelas di tombol untuk rotasi ikon
                
                // Menyesuaikan posisi 'right' tombol toggle
                if (isSidebarHidden) {
                    // Sidebar tersembunyi: tombol di ujung kanan viewport (0px dari kanan)
                    sidebarToggleDesktop.style.right = '0px'; /* BARU: Posisi di ujung kanan */
                } else {
                    // Sidebar terlihat: tombol di samping sidebar (280px dari kanan)
                    sidebarToggleDesktop.style.right = '280px';
                }
            }
        });

        // Panggil saat load dan resize untuk memastikan posisi tombol sudah benar
        const adjustDesktopTogglePosition = () => {
            const mainLayout = document.querySelector('.main-layout');
            if (window.innerWidth > 991 && mainLayout && sidebarNav) {
                if (mainLayout.classList.contains('sidebar-hidden-desktop')) {
                    sidebarToggleDesktop.style.right = '0px'; /* BARU: Di ujung kanan viewport */
                    sidebarToggleDesktop.classList.add('sidebar-toggled');
                } else {
                    sidebarToggleDesktop.style.right = '280px';
                    sidebarToggleDesktop.classList.remove('sidebar-toggled');
                }
                sidebarToggleDesktop.style.display = 'flex'; // Pastikan terlihat di desktop
            } else if (sidebarToggleDesktop) {
                sidebarToggleDesktop.style.display = 'none'; // Sembunyikan di mobile
            }
        };

        window.addEventListener('resize', adjustDesktopTogglePosition);
        adjustDesktopTogglePosition(); // Panggil sekali saat load
    } else {
        console.error("Desktop sidebar toggle button not found.");
    }
});