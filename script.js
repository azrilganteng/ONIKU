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
        { name: "Azril Firansyah.H", image: "image/4.jpg" },
        { name: "Mario Christopher.I", image: "image/3.jpg" },
        { name: "Laili Risqy.A", image: "image/2.jpg" },
        { name: "Osama Nur.M", image: "image/1.jpg" }
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
    const makananSlider = $('#makanan-slider');
    let autoSlideTimer = null;

    function startAutoSlideMakanan() {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
        
        autoSlideTimer = setInterval(function() {
            if (!makananSlider.length) return;
            
            const cardWidth = makananSlider.find('.card-product').outerWidth(true) || 300;
            const maxScroll = makananSlider[0].scrollWidth - makananSlider[0].clientWidth;

            if (makananSlider.scrollLeft() >= maxScroll - 10) {
                makananSlider.animate({ scrollLeft: 0 }, 100);
            } else {
                makananSlider.animate({ scrollLeft: makananSlider.scrollLeft() + cardWidth }, 600);
            }
        }, 300); 
    }

    function stopAutoSlideMakanan() {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
    }

    // Jalankan auto-slide
    startAutoSlideMakanan();

    // Hentikan sementara saat mouse diarahkan ke kartu (agar mudah diklik)
    makananSlider.on('mouseenter touchstart', stopAutoSlideMakanan);
    makananSlider.on('mouseleave touchend', startAutoSlideMakanan);

});