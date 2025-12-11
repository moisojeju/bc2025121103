// BC Gold - JavaScript

// 금/은 시세 데이터 (더미 데이터, 향후 API 연동 가능)
const goldPrices = [
    { type: '금', weight: '1kg (999.9)', buyPrice: 89500000, sellPrice: 88000000, change: 0.5 },
    { type: '금', weight: '100g (999.9)', buyPrice: 8950000, sellPrice: 8800000, change: 0.5 },
    { type: '금', weight: '37.5g (999.9)', buyPrice: 3356250, sellPrice: 3300000, change: 0.3 },
    { type: '금', weight: '10g (999.9)', buyPrice: 895000, sellPrice: 880000, change: 0.5 },
    { type: '은', weight: '1kg (999.9)', buyPrice: 1250000, sellPrice: 1200000, change: -0.2 },
];

// 상품 데이터
const products = [
    {
        id: 1,
        name: '골드바',
        weight: '1kg',
        purity: '99.99%',
        price: 89500000,
        image: 'images/100g(37.5g)-앞면_결과.jpg',
        badge: '인기',
        rating: 4.9,
        reviews: 234
    },
    {
        id: 2,
        name: '골드바',
        weight: '100g',
        purity: '99.99%',
        price: 8950000,
        image: 'images/100g(37.5g)-앞면_결과.jpg',
        badge: '베스트',
        rating: 4.8,
        reviews: 567
    },
    {
        id: 3,
        name: '골드바',
        weight: '37.5g',
        purity: '99.99%',
        price: 3356250,
        image: 'images/37.5g(27x45mm)_결과.jpg',
        rating: 4.9,
        reviews: 891
    },
    {
        id: 4,
        name: '골드바',
        weight: '10g',
        purity: '99.99%',
        price: 895000,
        image: 'images/7.5g(19x31mm)_결과.jpg',
        badge: '추천',
        rating: 4.7,
        reviews: 445
    },
    {
        id: 5,
        name: '실버바',
        weight: '1kg',
        purity: '99.99%',
        price: 1250000,
        image: 'images/50g(30x50mm)_결과.jpg',
        rating: 4.6,
        reviews: 178
    },
    {
        id: 6,
        name: '돌반지',
        weight: '3.75g',
        purity: '99.99%',
        price: 335000,
        image: 'images/3.75g(18x30mm)_결과.jpg',
        badge: '선물용',
        rating: 4.8,
        reviews: 312
    },
];

// 시간 업데이트 함수
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const updateTimeElement = document.getElementById('updateTime');
    const lastUpdateElement = document.getElementById('lastUpdate');

    if (updateTimeElement) {
        updateTimeElement.textContent = `업데이트: ${timeString}`;
    }
    if (lastUpdateElement) {
        lastUpdateElement.textContent = `최종 업데이트: ${timeString}`;
    }
}

// 시세표 렌더링
function renderPriceTable() {
    const tbody = document.getElementById('priceTableBody');
    if (!tbody) return;

    tbody.innerHTML = goldPrices.map(price => `
        <tr class="hover:bg-gray-50 transition">
            <td class="px-6 py-4">
                <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    price.type === '금'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-200 text-gray-700'
                }">
                    ${price.type}
                </span>
            </td>
            <td class="px-6 py-4 text-gray-700 font-medium">
                ${price.weight}
            </td>
            <td class="px-6 py-4 text-right">
                <span class="text-lg font-bold text-blue-600">
                    ${price.buyPrice.toLocaleString('ko-KR')}
                </span>
                <span class="text-xs text-gray-500 block">VAT 포함</span>
            </td>
            <td class="px-6 py-4 text-right">
                <span class="text-lg font-bold text-red-600">
                    ${price.sellPrice.toLocaleString('ko-KR')}
                </span>
                <span class="text-xs text-gray-500 block">재매입가</span>
            </td>
            <td class="px-6 py-4 text-center">
                <div class="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    price.change >= 0
                        ? 'bg-red-50 text-red-600'
                        : 'bg-blue-50 text-blue-600'
                }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
                            price.change >= 0
                                ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                                : 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'
                        }"/>
                    </svg>
                    <span>${Math.abs(price.change)}%</span>
                </div>
            </td>
        </tr>
    `).join('');
}

// 상품 그리드 렌더링
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-yellow-400 hover:shadow-xl transition group">
            <!-- Product image -->
            <div class="relative bg-gradient-to-br from-yellow-50 to-white p-8 flex items-center justify-center" style="min-height: 250px;">
                ${product.badge ? `
                    <span class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                        ${product.badge}
                    </span>
                ` : ''}
                <img
                    src="${product.image}"
                    alt="${product.name} ${product.weight} - 순도 ${product.purity} 정품 골드바"
                    class="max-w-full h-auto max-h-48 object-contain transform group-hover:scale-110 transition duration-300"
                    onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22%23999%22%3E이미지 없음%3C/text%3E%3C/svg%3E';"
                />
            </div>

            <!-- Product info -->
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-lg font-bold text-gray-900">
                        ${product.name} ${product.weight}
                    </h3>
                    <span class="text-sm text-yellow-600 font-semibold">
                        ${product.purity}
                    </span>
                </div>

                <!-- Rating -->
                <div class="flex items-center space-x-2 mb-4">
                    <div class="flex items-center">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="text-sm text-gray-600">
                        ${product.rating} (${product.reviews})
                    </span>
                </div>

                <!-- Price -->
                <div class="mb-4">
                    <div class="text-2xl font-bold text-gray-900 mb-1">
                        ${product.price.toLocaleString('ko-KR')}원
                    </div>
                    <div class="text-sm text-gray-500">VAT 포함</div>
                </div>

                <!-- Buy button -->
                <button onclick="addToCart(${product.id})" class="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>장바구니 담기</span>
                </button>
            </div>
        </div>
    `).join('');
}

// 별점 렌더링
function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += `<svg class="w-4 h-4 text-yellow-400 fill-current" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>`;
        } else {
            stars += `<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>`;
        }
    }
    return stars;
}

// 시세 새로고침
function refreshPrices() {
    // 실제로는 API 호출로 데이터를 가져옴
    // 여기서는 시뮬레이션으로 약간의 변동을 줌
    goldPrices.forEach(price => {
        const variation = (Math.random() - 0.5) * 0.2; // -0.1 ~ +0.1
        price.change = parseFloat((price.change + variation).toFixed(1));
    });

    renderPriceTable();
    updateTime();

    // 알림 표시
    showNotification('시세가 업데이트되었습니다.');
}

// 장바구니에 추가
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showNotification(`${product.name} ${product.weight}이(가) 장바구니에 추가되었습니다.`);
    }
}

// 알림 표시
function showNotification(message) {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = 'notification fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);

    // 3초 후 자동 제거
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 모바일 메뉴 토글
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// 스크롤 시 헤더 그림자 효과
function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
        header.classList.add('shadow-lg');
    } else {
        header.classList.remove('shadow-lg');
    }
}

// 현재 연도 설정
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 시간 업데이트
    updateTime();
    setInterval(updateTime, 1000);

    // 시세표 렌더링
    renderPriceTable();

    // 상품 그리드 렌더링
    renderProducts();

    // 현재 연도 설정
    setCurrentYear();

    // 모바일 메뉴 버튼 이벤트
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // 스크롤 이벤트
    window.addEventListener('scroll', handleScroll);

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // 모바일 메뉴 닫기
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 페이드인 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 모든 섹션에 옵저버 적용
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    console.log('BC Gold 웹사이트가 로드되었습니다.');
});

// 전역 함수로 노출 (HTML에서 호출)
window.refreshPrices = refreshPrices;
window.addToCart = addToCart;
