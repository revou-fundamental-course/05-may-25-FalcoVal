// =================================
// HEADER
// =================================
const headerTop = document.querySelector('.header-top')
const navList = document.getElementById('nav-list')
const bars = document.getElementById('bars')

window.addEventListener('scroll', () => {
    window.scrollY > 20 ? headerTop.classList.add('header-top-blur') : headerTop.classList.remove('header-top-blur')
})

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

const updateSlide = () => {
    sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`
}

prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide()
})

next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides
    updateSlide()
})

setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides
    updateSlide()
}, 5000)



// =================================
// TAMPLATE CARD
// =================================
const packageList = document.getElementById('package-list')
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

    packageList.innerHTML += cardPackage
}


// =================================
// OUR PACKAGE 
// =================================
const ourPackage = [
    { package: "Bali", price: 350, rating: 4.8, description: "Nikmati keindahan pantai, budaya lokal yang kaya, serta suasana tropis yang memikat di pulau Bali." },
    { package: "Jepang", price: 1800, rating: 4.9, description: "Jelajahi perpaduan tradisi dan teknologi di Jepang, mulai dari kuil kuno hingga kota futuristik seperti Tokyo." },
    { package: "Singapura", price: 1000, rating: 4.7, description: "Temukan pengalaman urban modern di Singapura dengan atraksi ikonik seperti Marina Bay Sands dan Sentosa Island." },
    { package: "Jakarta", price: 400, rating: 4.2, description: "Rasakan hiruk pikuk ibu kota Indonesia dengan kuliner khas, pusat perbelanjaan mewah, dan kehidupan malam yang dinamis." },
    { package: "Surabaya", price: 350, rating: 4.0, description: "Kunjungi Surabaya, kota pahlawan yang menawarkan perpaduan sejarah, wisata kuliner, dan belanja yang menarik." },
    { package: "Swiss", price: 3200, rating: 4.9, description: "Nikmati panorama pegunungan Alpen, danau jernih, serta keindahan kota-kota klasik di Swiss yang menawan." }
];

const displayOurPackage = () => {

    packageList.innerHTML = ""
    ourPackage.map((packages, index) => {
        const { package, price, description, rating } = packages
        
        tamplateCard(index, package, price, description, rating)
    })
    
    const btnLike = document.querySelectorAll('#btn-like')
    
    btnLike.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const faHeart = document.querySelectorAll('.fa-heart')
            
                faHeart[index].classList.toggle('like-active')
            })
        })
}

displayOurPackage()



// =================================
// SEARCH BOX
// =================================
const searchBox = document.getElementById('search-box')

const searchPackage = () => {
    const searchQuery = document.getElementById('input-search').value
    const filterPackage = ourPackage.filter(item => item.package.toLowerCase().includes(searchQuery.toLowerCase()))
    
    packageList.innerHTML = ""
    if(!filterPackage.length) {
        packageList.innerHTML = '<h1 class="not-found">Paket tidak di temukan</h1>'
    }

    filterPackage.map((packages, index) => {
        const { package, price, description, rating } = packages

        tamplateCard(index, package, price, description, rating)

    })
}

searchBox.addEventListener('submit', (e) => {
    e.preventDefault()
    searchPackage()
})



// =================================
// CONTACT US
// =================================
const contactForm = document.getElementById('contact-form')
const notyf = new Notyf({
    duration: 3000, 
    position: { x: 'left', y: 'top' }, 
    ripple: true, 
});

const contactFormValidation = () => {
    const fullName = document.getElementById("full-name").value
    const email = document.getElementById("email").value
    const interest = document.getElementById("interest").value
    const messages = document.getElementById("message").value

    let isValid = true
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const messageError = (id, message) => {
        document.getElementById(`error-message-${id}`).innerText = message
    }

    messageError('full-name', '');
    messageError('email', '');
    messageError('interest', '');
    messageError('message', '');

    if(fullName.length < 2) {
        messageError('full-name', "Nama lengkap minimal 2 karakter")
        isValid = false
    }
    
    if(!regexEmail.test(email)) {
        messageError('email', "Email tidak valid")
        isValid = false
    }
    
    if(!interest) {
        messageError('interest', "Wajib memilih 1 opsi")
        isValid = false
    }

    return isValid 
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(contactFormValidation())  {
        notyf.success('Data berhasil disimpan!');
    }
})