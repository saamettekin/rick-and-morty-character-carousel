document.addEventListener("DOMContentLoaded", function() {
    //API
    const apiUrl = 'https://rickandmortyapi.com/api/character';

    // Verinin yerleştirileceği div'in id'si
    const widget = document.getElementById('widget');

    // API'dan veriyi çektiğimiz fonksiyon
    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('başarısız ağ yanıtı: ' + response.statusText);
            }
            const data = await response.json();

            // Verinin yerleştirileceği div
            widget.innerHTML = `
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        ${data.results.map(character => `
                            <div class="swiper-slide">
                                <div class="character">
                                    <img src="${character.image}">
                                    <div class="info">
                                        <h2>${character.name}</h2>
                                        <div class="status">
                                            <div class="status-dot" style="background-color: ${getStatusColor(character.status)};"></div>
                                            <p>${character.status}</p>
                                        </div>
                                        <p>Species: ${character.species}</p>
                                        <p>Gender: ${character.gender}</p>
                                        <p>Origin: ${character.origin.name}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <!-- Pagination -->
                    <div class="swiper-pagination"></div>
                    <!-- Navigation -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            `;

            // Swiper
            initializeSwiper();
        } catch (error) {
            console.error('Fetch error: ', error);
            widget.innerHTML = 'Veri çekilemedi.';
        }
    }

    // Status 
    function getStatusColor(status) {
        switch (status.toLowerCase()) {
            case 'alive':
                return 'green';
            case 'dead':
                return 'red';
            case 'unknown':
                return 'orange';
            default:
                return 'grey';
        }
    }

    // Swiper
    function initializeSwiper() {
        new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    fetchData();
});