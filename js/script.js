document.addEventListener('DOMContentLoaded', function() {
	// 导航栏滚动效果
	const navbar = document.getElementById('navbar');
	window.addEventListener('scroll', function() {
		if (window.scrollY > 50) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}
	});

	// 轮播图功能
	const slider = document.getElementById('slider');
	const sliderItems = document.querySelectorAll('.slider-item');
	const sliderDots = document.querySelectorAll('.slider-dot');
	const prevBtn = document.getElementById('prev-slide');
	const nextBtn = document.getElementById('next-slide');
	let currentSlide = 0;
	const slideCount = sliderItems.length;

	function updateSlider() {
		slider.style.transform = `translateX(-${currentSlide * 100}%)`;

		// 更新指示器
		sliderDots.forEach((dot, index) => {
			if (index === currentSlide) {
				dot.classList.add('active');
			} else {
				dot.classList.remove('active');
			}
		});
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % slideCount;
		updateSlider();
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + slideCount) % slideCount;
		updateSlider();
	}

	prevBtn.addEventListener('click', prevSlide);
	nextBtn.addEventListener('click', nextSlide);

	// 点击指示器切换幻灯片
	sliderDots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			currentSlide = index;
			updateSlider();
		});
	});

	// 自动轮播
	let slideInterval = setInterval(nextSlide, 5000);

	// 鼠标悬停暂停轮播
	const bannerSlider = document.querySelector('.banner-slider');
	bannerSlider.addEventListener('mouseenter', () => {
		clearInterval(slideInterval);
	});

	bannerSlider.addEventListener('mouseleave', () => {
		slideInterval = setInterval(nextSlide, 5000);
	});

	// 评分交互
	document.querySelectorAll('.rating-stars').forEach(starGroup => {
		const stars = starGroup.querySelectorAll('i');

		stars.forEach((star, index) => {
			star.addEventListener('click', function(e) {
				const rect = star.getBoundingClientRect();
				const clickX = e.clientX - rect.left;
				const half = clickX < rect.width / 2;
				const rating = (index * 2) + (half ? 1 : 2);

				// 更新显示
				stars.forEach((s, i) => {
					s.classList.remove('fa-star', 'fa-star-half-o',
						'fa-star-o');

					if ((i + 1) * 2 <= rating) {
						s.classList.add('fa-star');
					} else if ((i * 2) + 1 === rating) {
						s.classList.add('fa-star-half-o');
					} else {
						s.classList.add('fa-star-o');
					}
				});
			});
		});
	});


	// 平滑滚动到锚点
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();

			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 80,
					behavior: 'smooth'
				});

				// 关闭移动端菜单
				if (!mobileMenu.classList.contains('hidden')) {
					mobileMenu.classList.add('hidden');
				}
			}
		});
	});
});