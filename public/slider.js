let questions = document.querySelectorAll('.question');

        for (let i = 0; i < questions.length; i++) {
            questions[i].addEventListener('click', function() {
            let panel = questions[i].querySelector('.panel');
            let rp = questions[i].querySelector('.r-plus');
            rp.classList.toggle('r-min')
            panel.classList.toggle('act');
        });
        }


        let btn = document.querySelector('.burger');
        let list = document.querySelector('header .inner-wrapper ul');
        let i = document.querySelectorAll('.burger i');
        
        btn.addEventListener('click', function() {
            list.classList.toggle('show');
            list.classList.toggle('close');
            i[1].classList.toggle('hide');
            i[0].classList.toggle('rotateL');
            i[2].classList.toggle('rotateR');
        });

        let timerId;

        let slideIndex = 0;
        
        clickButtons();
        showSlides(slideIndex);
        timerId = setInterval(() => {
            showSlides(slideIndex);
        }, 5000);

        function clickButtons() {
            let dots = document.querySelectorAll('.dot');

            for (let i = 0; i < dots.length; i++) {
                dots[i].addEventListener('click', function() {
                        clearInterval(timerId);
                        showSlides(i);
                        slideIndex = i;
                        timerId = setInterval(() => {
                            showSlides(slideIndex);
                        }, 5000);
                }); 
            }
        }
        
        function currentSlides(slide) {
            showSlides(slide);
        }

        function showSlides(slideIndexes) {
            slideIndex = slideIndexes
            let slides = document.querySelectorAll('.slide');
            let dots = document.querySelectorAll('.dot');
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove('active');
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            slides[slideIndex - 1].style.display = 'block';
            
            dots[slideIndex - 1].classList.add('active');
        }