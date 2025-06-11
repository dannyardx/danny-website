// js/social-media-popup-handler.js

document.addEventListener('DOMContentLoaded', () => {
    // BARU: Elemen untuk Pop-up Media Sosial
    const socialMediaPopupOverlay = document.getElementById('social-media-popup-overlay');
    const socialMediaPopupCloseBtn = document.querySelector('.social-media-popup-close-btn');
    const socialMediaIframe = document.getElementById('social-media-iframe');
    const socialPopupLinks = document.querySelectorAll('.social-popup-link'); // Semua link dengan class ini

    // Dapatkan referensi body untuk mengontrol scroll
    const body = document.body;

    if (socialMediaPopupOverlay && socialMediaPopupCloseBtn && socialMediaIframe && socialPopupLinks.length > 0) {
        socialPopupLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Mencegah perilaku default (membuka di tab baru)
                const url = e.currentTarget.href; // Ambil URL dari link yang diklik

                // Set URL iframe dan tampilkan pop-up
                socialMediaIframe.src = url;
                socialMediaPopupOverlay.classList.add('active'); // Tambahkan kelas 'active' untuk menampilkan
                body.classList.add('no-scroll'); // Mencegah scroll body
            });
        });

        // Event listener untuk tombol tutup
        socialMediaPopupCloseBtn.addEventListener('click', () => {
            socialMediaPopupOverlay.classList.remove('active'); // Sembunyikan pop-up
            socialMediaIframe.src = ''; // Kosongkan src iframe untuk menghentikan pemutaran/loading
            body.classList.remove('no-scroll'); // Izinkan scroll body kembali
        });

        // Event listener untuk mengklik overlay di luar konten pop-up
        socialMediaPopupOverlay.addEventListener('click', (e) => {
            if (e.target === socialMediaPopupOverlay) { // Hanya jika klik langsung pada overlay
                socialMediaPopupOverlay.classList.remove('active');
                socialMediaIframe.src = '';
                body.classList.remove('no-scroll');
            }
        });
    } else {
        console.error("ERROR: One or more social media pop-up elements not found in social-media-popup-handler.js.");
        if (!socialMediaPopupOverlay) console.error("socialMediaPopupOverlay not found.");
        if (!socialMediaPopupCloseBtn) console.error("socialMediaPopupCloseBtn not found.");
        if (!socialMediaIframe) console.error("socialMediaIframe not found.");
        if (socialPopupLinks.length === 0) console.error("No .social-popup-link elements found.");
    }
});