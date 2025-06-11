(function () {
    const app = {
        schoolSVGPath: document.querySelector('.school__fond path'),
        yearText: document.querySelector('.school__content'),
        qualityArticles: document.querySelectorAll('.qualities__articles article'),
        qualityImage: document.querySelector('.qualities__aside-image'),
        skillsLiElement: document.querySelectorAll('.skills__slide-articles li'),
        skillMockupImage: document.querySelector('.skills__mockup-image'),
        skillsTitle: document.querySelector('.skills__title'),
        skillsTextElement: document.querySelector('.skills__text'),
        carouselElement: document.querySelector('.values__articles'),
        valuesArticles: document.querySelectorAll('.values__articles article'),
        valuesDivElements: document.querySelectorAll('.values__articles div'),
        scrollBars: document.querySelectorAll('[class*="slider"]'),
        carouselElements: document.querySelectorAll('[class*="articles"]'),
        words1Element: document.querySelector('.personal__words-1'),
        words2Element: document.querySelector('.personal__words-2'),
        arrowOffersPrev: document.querySelector('.offers__prev'),
        arrowOffersNext: document.querySelector('.offers__next'),
        arrowSchoolPrev: document.querySelector('.school__prev'),
        arrowSchoolNext: document.querySelector('.school__next'),
        arrowQualitiesPrev: document.querySelector('.qualities__prev'),
        arrowQualitiesNext: document.querySelector('.qualities__next'),
        offersSkillsElements: document.querySelectorAll('.offers__skills'),
        figuresElements: document.querySelectorAll('.school__figures figure'),
        schoolSection: document.querySelector('.school'),
        currentItem: 0,
        init() {
            this.addEventListeners();
            this.show(this.offersSkillsElements, this.arrowOffersNext, this.arrowOffersPrev, this.currentItem);
            this.show(this.qualityArticles, this.arrowQualitiesNext, this.arrowQualitiesPrev, this.currentItem, this.qualityImage);
            this.show(this.figuresElements, this.arrowSchoolNext, this.arrowSchoolPrev, this.currentItem, this.yearText, this.schoolSection);
        },
        addEventListeners() {
            this.figuresElements.forEach(image => {
                image.addEventListener('mouseenter', (evt) => {
                    this.changeFigure(evt);
                });
            });
            this.figuresElements.forEach(image => {
                image.addEventListener('click', (evt) => {
                    this.changeFigure(evt);
                });
            });
            this.qualityArticles.forEach(quality => {
                quality.addEventListener('mouseenter', (evt) => {
                    this.changeQuality(evt);
                })
            });

            this.qualityArticles.forEach(quality => {
                quality.addEventListener('click', (evt) => {
                    this.changeQuality(evt);
                })
            });
            this.skillsLiElement.forEach(skill => {
                skill.addEventListener('mouseenter', (evt) => {
                    this.changeSkills(evt);
                })
            });
            this.skillsLiElement.forEach(skill => {
                skill.addEventListener('click', (evt) => {
                    this.changeSkills(evt);
                })
            });
            window.addEventListener('scroll', () => {
                this.scrollWords();
            });
            this.carouselElements.forEach(carousel => {
                carousel.addEventListener('scroll', () => {
                    this.displayScrollBar(carousel);
                });
            });
            this.valuesDivElements.forEach(div => {
                div.dataset.state = "first";
                div.addEventListener('click', () => {
                    this.changeValues(div);
                });
            });
            this.carouselElement.addEventListener('scroll', () => {
                this.displayCarousel()
            });
        },
        changeFigure(evt) {
            this.schoolSVGPath.style.fill = evt.currentTarget.dataset.colour;
            this.yearText.textContent = evt.currentTarget.dataset.text;
            this.yearText.style.color = evt.currentTarget.dataset.textColour;
        },
        changeQuality(evt) {
            this.qualityImage.src = evt.currentTarget.dataset.source;
        },
        changeSkills(evt) {
            this.skillMockupImage.src = evt.currentTarget.dataset.source;
            this.skillsTitle.textContent = evt.currentTarget.dataset.title;
            this.skillsTextElement.textContent = evt.currentTarget.dataset.text;
        },
        show(items, nextButton, prevButton, currentItem, target, target2) {
            function showItems(index) {
                items.forEach((item, i) => {
                    item.style.display = i === index ? 'block' : 'none';

                    if (i === index) {
                        item.classList.add('active');
                        if (target) {
                            target.src = item.dataset.source;
                            target.textContent = item.dataset.text;
                            target.style.color = item.dataset.textColour;
                        }
                        if (target2) {
                            target2.style.backgroundImage = `url(${item.dataset.source})`;
                        }
                    } else {
                        item.classList.remove('active');
                    }
                });
            }

            prevButton.addEventListener('click', () => {
                currentItem--;
                if (currentItem < 0) {
                    currentItem = items.length - 1;
                }
                showItems(currentItem);
            })
            nextButton.addEventListener('click', () => {
                currentItem++;
                if (currentItem > items.length - 1) {
                    currentItem = 0;
                }
                showItems(currentItem);
            });
        },
        scrollWords() {
            const scrollY = window.scrollY;
            this.words1Element.style.transform = `translateX(${scrollY * 0.5}px)`;
            this.words2Element.style.transform = `translateX(${scrollY * -0.5}px)`;
        },
        displayScrollBar(carousel) {
            this.scrollBars.forEach(scroll => {
                const scrollPercent = (carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth)) * 100;
                scroll.style.width = `${scrollPercent}%`;
            });
        },
        changeValues(div) {
            const isFirst = div.dataset.state === "first";
            div.style.backgroundImage = isFirst ? `url("${div.dataset.source}")` : `url("${div.dataset.first}")`;
            div.dataset.state = isFirst ? "second" : "first";
        },
        displayCarousel() {
            const carouselRect = this.carouselElement.getBoundingClientRect();
            let carouselCenter = carouselRect.left + carouselRect.width / 2;
            let closestItem = null;
            let closestDistance = Infinity;

            this.valuesArticles.forEach(article => {
                const articleRect = article.getBoundingClientRect();
                const articleCentered = articleRect.left + articleRect.width / 2;
                const distance = Math.abs(carouselCenter - articleCentered);

                if (articleCentered > 420 && distance < closestDistance) {
                    closestDistance = distance;
                    closestItem = article;
                }

            });

            this.valuesArticles.forEach(article => article.classList.remove('active'));
            if (closestItem) {
                closestItem.classList.add('active');
            }
        },
    }

    app.init();
})();
