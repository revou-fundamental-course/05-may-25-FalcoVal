// =================================
// HEADER
// =================================
const headerTop = document.querySelector('.header-top')
const navList = document.getElementById('nav-list')
const bars = document.getElementById('bars')

// Ketika pengguna scroll lebih dari 20px maka tambahkan bg akan blur
window.addEventListener('scroll', () => {
    window.scrollY > 20 ? headerTop.classList.add('header-top-blur') : headerTop.classList.remove('header-top-blur')
})

// Tampilkan menu navigasi ketika hamburger diklik
bars.addEventListener('click', () => {
    navList.classList.toggle('nav-list-active')
})


// =================================
// Slider
// =================================
const sliderWrapper = document.querySelector('.slider-wrapper')
const slides = document.querySelectorAll('.slide')
const prev = document.getElementById('prev')
const next = document.getElementById('next')

let currentIndex = 0
const totalSlides = slides.length

// Geser slide berdasarkan index saat ini
const updateSlide = () => {
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`
}

// Navigasi ke slide sebelumnya, loop ke slide terakhir jika saat ini di slide pertama
prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide()
})

// Navigasi ke slide berikutnya, loop ke slide pertana jika saat ini di slide terakhir
next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides
    updateSlide()
})

// Geser otomatis slide setiap 5 detik
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides
    updateSlide()
}, 5000)



// =================================
// TAMPLATE CARD
// =================================
const packageList = document.getElementById('package-list')

// Fungsi untuk membuat elemen kartu paket dan menambahkannya ke dalam packageList
const tamplateCard = (index, package, price, description, rating) => {
    const cardPackage =  `
        <div class="card-package">
            <div class="card-image">
                <img src="images/travel${index + 1}.jpg" alt="" width="100%" />

                <div class="rating">
                    <i class="fa fa-star"></i>
                    <span>${rating}</span>
                </div>

                <div class="like">
                    <button id="btn-like">
                        <i class="fa fa-heart"></i>
                    </button>
                </div>
            </div>

            <div class="package-price">
                <span style="font-weight: bold;">${package}</span>

                <span>${price.toLocaleString('id-ID', {
                    style: "currency",
                    currency: "IDR"
                })}</span>
            </div>

            <p>${description}</p>

            <button class="btn-card-book-now">Pesan Sekarang</button>
        </div>
    `

    // Tambahkan elemen kartu ke dalam elemen packageList
    packageList.innerHTML += cardPackage
}


// =================================
// OUR PACKAGE 
// =================================

// Data paket travel
const ourPackage = [
    { package: "Bali", price: 350, rating: 4.8, description: "Nikmati keindahan pantai, budaya lokal yang kaya, serta suasana tropis yang memikat di pulau Bali." },
    { package: "Jepang", price: 1800, rating: 4.9, description: "Jelajahi perpaduan tradisi dan teknologi di Jepang, mulai dari kuil kuno hingga kota futuristik seperti Tokyo." },
    { package: "Singapura", price: 1000, rating: 4.7, description: "Temukan pengalaman urban modern di Singapura dengan atraksi ikonik seperti Marina Bay Sands dan Sentosa Island." },
    { package: "Jakarta", price: 400, rating: 4.2, description: "Rasakan hiruk pikuk ibu kota Indonesia dengan kuliner khas, pusat perbelanjaan mewah, dan kehidupan malam yang dinamis." },
    { package: "Surabaya", price: 350, rating: 4.0, description: "Kunjungi Surabaya, kota pahlawan yang menawarkan perpaduan sejarah, wisata kuliner, dan belanja yang menarik." },
    { package: "Swiss", price: 3200, rating: 4.9, description: "Nikmati panorama pegunungan Alpen, danau jernih, serta keindahan kota-kota klasik di Swiss yang menawan." }
];

// Fungsi untuk menampilkan seluruh paket di halaman
const displayOurPackage = () => {
    // Bersikan daftar paket travel sebelumnya
    packageList.innerHTML = ""

    // Iterasi untuk menambahkan setiap card paket
    ourPackage.map((packages, index) => {
        
        const { package, price, description, rating } = packages

        // Panggil fungsi untuk membuat card
        tamplateCard(index, package, price, description, rating)
    })

    // Ambil seluruh tombol like
    const btnLike = document.querySelectorAll('#btn-like')

    // Tambah event untuk seluruh tombol like
    btnLike.forEach((btn, index) => {
        btn.addEventListener('click', () => {
                const faHeart = document.querySelectorAll('.fa-heart')

                // tambah class like-active pada tombol yang diklik
                faHeart[index].classList.toggle('like-active')
            })
        })
}

// Panggil fungsi untuk menampilkan paket saat halaman dimuat
displayOurPackage()


// =================================
// SEARCH BOX
// =================================
const searchBox = document.getElementById('search-box')

// Fungsi untuk mencari paket berdasarkan query
const searchPackage = () => {
    const searchQuery = document.getElementById('input-search').value

    // Cari data travel berdasarkan query yang di ketik pengguna
    const filterPackage = ourPackage.filter(item => item.package.toLowerCase().includes(searchQuery.toLowerCase()))

    // Bersikan daftar paket travel sebelumnya
    packageList.innerHTML = ""

    // Jika query tidak di temukan, tampilkan not found
    if(!filterPackage.length) {
        packageList.innerHTML = '<h1 class="not-found">Paket tidak di temukan</h1>'
    }

    // Iterasi untuk menambahkan card paket
    filterPackage.map((packages, index) => {
        const { package, price, description, rating } = packages
        
        // Panggil fungsi untuk membuat card
        tamplateCard(index, package, price, description, rating)

    })
}

// Tambahkan event submit untuk menagani form
searchBox.addEventListener('submit', (e) => {
    e.preventDefault() // Mencegah refresh otomatis

    // Pangii fungsi dan tampilkan data sesuai dengan query pengunna
    searchPackage() 
})



// =================================
// CONTACT US
// =================================
const contactForm = document.getElementById('contact-form')

// Konfigurasi Notfy
const notyf = new Notyf({
    duration: 3000, 
    position: { x: 'left', y: 'top' }, 
    ripple: true, 
});

// Fungsi untuk memvalidasi form
const contactFormValidation = () => {
    const fullName = document.getElementById("full-name").value
    const email = document.getElementById("email").value
    const interest = document.getElementById("interest").value
    const messages = document.getElementById("message").value

    let isValid = true

    // Regex untuk validasi format email
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Tampilkan pesan error berdasarkan id dan message yang di kirim
    const messageError = (id, message) => {
        document.getElementById(`error-message-${id}`).innerText = message
        const inputElementInId =  document.getElementById(`${id}`)
        inputElementInId.style.border = "1px solid red"
        inputElementInId.style.boxShadow = "0 1px 2px 0px red"
        
    }

    // Bersihkan pesan error
    messageError('full-name', '');
    messageError('email', '');
    messageError('interest', '');
    messageError('message', '');

    // Validasi jika nama pengguna kurang dari 2 karakter, set isValid ke false
    if(fullName.length < 2) {
        messageError('full-name', "Nama lengkap minimal 2 karakter")
        isValid = false
    }
    
    // Validasi jika email tidak sesui format, set isValid ke false
    if(!regexEmail.test(email)) {
        messageError('email', "Email tidak valid")
        isValid = false
    }

    // Validasi jika pengguna tidak memilih 1 opsi, set isValid ke false
    if(!interest) {
        messageError('interest', "Wajib memilih 1 opsi")
        isValid = false
    }

    // Mengembalika true jika valid dan false jika tidak
    return isValid 
}

// Menambahkan event submit untuk menangani form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault() // Mencegah refresh otomatis

    // Jika contactFormValidation() true jalankan alert
    if(contactFormValidation())  {
        notyf.success('Data berhasil dikirim!');
    }
})



// =================================
// TO UP
// =================================

// Jika pengguna scroll lebih dari 20px tampilkan button up
window.addEventListener('scroll', () => {
    const upTo = document.getElementById('to-up')

    window.scrollY > 30 ? upTo.style.display = "flex" : upTo.style.display = "none"

    // Kembali ke posisi paling atas, ketika tombol up-to di klik
    upTo.addEventListener('click', () => {
        window.scrollTo(0, 0) // set ke posisi paling atas (0, 0)
    })
})
