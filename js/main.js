/*===============================================
  FILE: main.js
  DESCRIPTION: JavaScript chính cho Quantum Leap Creative
  AUTHOR: (AI Kỹ sư Full-Stack)
  
  TABLE OF CONTENTS:
  1. DOMContentLoaded: Khởi tạo
  2. Feather Icons
  3. Mobile Menu Toggle
  4. Sticky Header
  5. Scroll Animations (Intersection Observer)
  6. Testimonial Slider (Trang chủ)
  7. Portfolio Filter (Trang Dự án)
  8. Form Validation (Trang Liên hệ)
=================================================*/

document.addEventListener('DOMContentLoaded', () => {

    /**
     * 2. Khởi tạo Feather Icons
     */
    feather.replace();

    /**
     * 3. Mobile Menu Toggle
     */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // Thay đổi icon hamburger/close
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show-menu')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace(); // Vẽ lại icon
        });
    }

    /**
     * 4. Sticky Header
     */
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    /**
     * 5. Scroll Animations (Intersection Observer)
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Ngừng quan sát sau khi đã hiển thị
                }
            });
        }, {
            threshold: 0.1 // Kích hoạt khi 10% phần tử xuất hiện
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * 6. Testimonial Slider (Trang chủ)
     */
    const sliderWrapper = document.querySelector('.testimonial-slider__wrapper');
    if (sliderWrapper) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const nextBtn = document.getElementById('testimonial-next');
        const prevBtn = document.getElementById('testimonial-prev');
        let currentSlide = 0;
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
            // Logic di chuyển slider (nếu dùng translate)
            // sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
            
            // Cập nhật trạng thái slide
            currentSlide = index;
        }

        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentSlide + 1) % totalSlides;
            showSlide(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(prevIndex);
        });

        // Tự động chuyển slide (tùy chọn)
        // setInterval(() => {
        //     nextBtn.click();
        // }, 5000);

        showSlide(0); // Hiển thị slide đầu tiên
    }

    /**
     * 7. Portfolio Filter (Trang Dự án)
     */
    const filterContainer = document.getElementById('portfolio-filter-btns');
    const portfolioGrid = document.getElementById('portfolio-grid');

    if (filterContainer && portfolioGrid) {
        const filterBtns = filterContainer.querySelectorAll('.filter-btn');
        const portfolioItems = portfolioGrid.querySelectorAll('.filter-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Xóa active khỏi tất cả nút
                filterBtns.forEach(b => b.classList.remove('active'));
                // Thêm active cho nút được nhấp
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    /**
     * 8. Form Validation (Trang Liên hệ)
     */
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const formMessage = document.getElementById('form-message');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Hàm kiểm tra email
        function isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        // Hàm hiển thị lỗi
        function showError(input, message) {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            const errorMessage = formGroup.querySelector('.form__error-message');
            if(message) errorMessage.textContent = message;
        }

        // Hàm xóa lỗi
        function clearError(input) {
            const formGroup = input.parentElement;
            formGroup.classList.remove('error');
        }
        
        // Hàm xóa tất cả lỗi
        function clearAllErrors() {
            [nameInput, emailInput, messageInput].forEach(clearError);
            formMessage.style.display = 'none';
        }
        
        // Hàm hiển thị thông báo chung
        function showFormMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`; // 'success' hoặc 'error'
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn form gửi đi
            clearAllErrors();
            
            let isValid = true;

            // 1. Kiểm tra Tên (bắt buộc)
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Vui lòng nhập họ tên.');
            }

            // 2. Kiểm tra Email (bắt buộc, đúng định dạng)
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Vui lòng nhập email.');
            } else if (!isValidEmail(emailInput.value.trim())) {
                isValid = false;
                showError(emailInput, 'Vui lòng nhập email hợp lệ.');
            }

            // 3. Kiểm tra Tin nhắn (bắt buộc, tối thiểu 20 ký tự)
            if (messageInput.value.trim().length < 20) {
                isValid = false;
                showError(messageInput, 'Tin nhắn phải có ít nhất 20 ký tự.');
            }

            // Kết quả
            if (isValid) {
                // Mô phỏng gửi form thành công
                showFormMessage('Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.', 'success');
                contactForm.reset(); // Xóa nội dung form
            } else {
                showFormMessage('Một số trường thông tin bị lỗi. Vui lòng kiểm tra lại.', 'error');
            }
        });
        
        // Xóa lỗi khi người dùng nhập
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', () => clearError(input));
        });
    }

});
