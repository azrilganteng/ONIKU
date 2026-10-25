$(document).ready(function () {
    // Efek Klik pada Card Produk (Menampilkan Modal Detail)
    $('.card-product').on('click', function () {
        const category = $(this).attr('data-category') || 'Produk';
        const title = $(this).attr('data-title') || $(this).find('h3').text();
        const price = $(this).attr('data-price') || 'Hubungi Kami';
        const desc = $(this).attr('data-desc') || 'Deskripsi lengkap produk tidak tersedia.';
        const imgSrc = $(this).find('img').attr('src');

        // Update isi modal
        $('#modal-product-category').text(category);
        $('#modal-product-title').text(title);
        $('#modal-product-price').text(price);
        $('#modal-product-desc').text(desc);
        $('#modal-product-img').attr('src', imgSrc);

        // Tampilkan modal (flex) dan buat transisi masuk
        $('#product-modal').removeClass('hidden');
        setTimeout(function () {
            $('#product-modal .relative').removeClass('scale-95 opacity-0').addClass('scale-100 opacity-100');
        }, 10);
    });

    // Fungsi Menutup Modal
    function closeModal() {
        $('#product-modal .relative').removeClass('scale-100 opacity-100').addClass('scale-95 opacity-0');
        setTimeout(function () {
            $('#product-modal').addClass('hidden');
        }, 300);
    }

    // Klik tombol close atau area backdrop untuk menutup modal
    $('#modal-close, #modal-backdrop').on('click', closeModal);

    // Klik tombol pesanan di dalam modal (mengarah ke Google Form)
    $('#modal-order-btn').on('click', function () {
        closeModal();
        window.open('https://forms.gle/YOUR_GOOGLE_FORM_ID', '_blank');
    });


    const teamMembers = [
        { name: "Azril Firansyah.H", image: "image/1.jpg" },
        { name: "Mario Christopher.I", image: "image/4.jpg" },
        { name: "Laili Risqy.A", image: "image/2.jpg" },
        { name: "Osama Nur.M", image: "image/3.png" }
    ];

    let currentIndex = 0;

    function renderSlider(direction = 'next') {
        const total = teamMembers.length;
        const leftIndex = (currentIndex - 1 + total) % total;
        const centerIndex = currentIndex;
        const rightIndex = (currentIndex + 1) % total;
        const moveClass = (direction === 'next') ? '-translate-x-8' : 'translate-x-8';

        // Efek Pudar Sederhana Tanpa Merusak Layout Class
        $('.avatar-card').addClass('opacity-0 ' + moveClass);

        setTimeout(function () {
            // Update Isi Teks
            $('#avatar-left .name-tag ').text(teamMembers[leftIndex].name);
            $('#avatar-center .name-tag').text(teamMembers[centerIndex].name);
            $('#avatar-right .name-tag').text(teamMembers[rightIndex].name);

            $('#avatar-left .avatar-img').attr('src', teamMembers[leftIndex].image);
            $('#avatar-center .avatar-img').attr('src', teamMembers[centerIndex].image);
            $('#avatar-right .avatar-img').attr('src', teamMembers[rightIndex].image);

            $('#character-title').text(`MEMBER ${centerIndex + 1} OF ${total}`);

            $('.avatar-card').removeClass('-translate-x-8 translate-x-8 opacity-0');

            $('#avatar-left, #avatar-right').addClass('opacity-40');
            $('#avatar-center').addClass('opacity-100');
        }, 200);
    }

    $('#btn-next').on('click', function () {
        currentIndex = (currentIndex + 1) % teamMembers.length;
        renderSlider('next');
    });

    $('#btn-prev').on('click', function () {
        currentIndex = (currentIndex - 1 + teamMembers.length) % teamMembers.length;
        renderSlider('prev');
    });

    $('#avatar-left').on('click', function () { $('#btn-prev').click(); });
    $('#avatar-right').on('click', function () { $('#btn-next').click(); });

    renderSlider();
        // --- Auto-Slide Super Mulus untuk Section Makanan (Native JS) ---
    const sliderEl = document.getElementById('makanan-slider');
    let autoSlideTimer = null;

    function startAutoSlideMakanan() {
        stopAutoSlideMakanan();
        
        autoSlideTimer = setInterval(function() {
            if (!sliderEl) return;
            
            // Hitung lebar 1 kartu + gap antar kartu
            const firstCard = sliderEl.querySelector('.card-product');
            const cardWidth = firstCard ? firstCard.offsetWidth + 20 : 300; // 20 adalah estimasi gap-5
            const maxScroll = sliderEl.scrollWidth - sliderEl.clientWidth;

            // Jika sudah di ujung kanan, kembali mulus ke awal
            if (sliderEl.scrollLeft >= maxScroll - 15) {
                sliderEl.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                sliderEl.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        }, 3500); // Geser setiap 3.5 detik (lebih nyaman di mata)
    }

    function stopAutoSlideMakanan() {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
    }

    // Jalankan auto-slide awal
    startAutoSlideMakanan();

    // Event interaksi:
    if (sliderEl) {
        // Laptop: jeda saat kursor di atas slider
        sliderEl.addEventListener('mouseenter', stopAutoSlideMakanan);
        sliderEl.addEventListener('mouseleave', startAutoSlideMakanan);
        
        // HP: Saat jari menyentuh, matikan auto-slide
        sliderEl.addEventListener('touchstart', stopAutoSlideMakanan, { passive: true });
        
        // HP: Beri jeda 4 detik setelah jari diangkat sebelum auto-slide aktif lagi
        sliderEl.addEventListener('touchend', function() {
            stopAutoSlideMakanan();
            setTimeout(startAutoSlideMakanan, 4000);
        }, { passive: true });
    }

});