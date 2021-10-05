class DraggableSlider {
    constructor(sliderImages, slidingArea, containerElement, rightSliderBtn, leftSliderBtn, borderWidth = 0, forWhich = "normal", isDragging = false, currentIndex = 0, startPosition = 0, currentTranslate = 0, prevTranslate = 0, startPoint = 0, prevStartPoint = 0) {
        this.forWhich = forWhich;
        this.sliderImages = sliderImages;
        this.isDragging = isDragging;
        this.currentIndex = currentIndex;
        this.startPosition = startPosition;
        this.currentTranslate = currentTranslate;
        this.prevTranslate = prevTranslate;
        this.startPoint = startPoint;
        this.prevStartPoint = prevStartPoint;
        this.slidingArea = Math.round(slidingArea) * this.sliderImages.length;
        this.rightSliderBtn = rightSliderBtn;
        this.leftSliderBtn = leftSliderBtn;
        this.containerElement = containerElement;
        this.animationID = undefined;
        this.borderWidth = borderWidth;
        // this.sliderImages.forEach( image => {
        //     image.addEventListener("dblclick", e => {
        //         ShowBigImage(e.target.src);
        //     });
        // });
    }
    // method that determines where dragging is start
    setStartPosition(e) {
        return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    }
    // method that provides smoothly sliding
    animation(that) {
        that.sliderImages.forEach(slide => {
            slide.style.transform = `translateX(${this.currentTranslate}px)`;
        }, that);
        if(this.isDragging === true) {
            // setInterval(this.animation, .000000001, that);
            requestAnimationFrame(() => {
                this.animation(that);
            });
        }
    }
    // method that controls buttons appearance
    BtnsManip(max) {
        if(this.currentIndex === max - 1 && this.currentTranslate > this.prevTranslate) {
            this.rightSliderBtn.classList.remove("disabled");
        }
        if(this.currentIndex === 1 && this.prevTranslate > this.currentTranslate) {
            this.leftSliderBtn.classList.remove("disabled");
        }
        if(this.currentIndex === max && this.prevTranslate > this.currentTranslate) {
            this.rightSliderBtn.classList.add("disabled");
        }
        if(this.currentIndex === 0 && this.currentTranslate > this.prevTranslate) {
            this.leftSliderBtn.classList.add("disabled");
        }
    }
    setPositionByIndex() {
        let point = window.getComputedStyle(this.containerElement).width.indexOf("px");
        let string = window.getComputedStyle(this.containerElement).width.substr(0, point);
        const sliderWidth = parseInt(string) - this.borderWidth * 2;
        this.currentTranslate = this.currentIndex * -sliderWidth;
        this.prevTranslate = this.currentTranslate;
        this.sliderImages.forEach(slide => {
            slide.style.transform = `translateX(${this.currentTranslate}px)`;
        });
    }
    // method that filters index inside slider and controls buttons appearance
    FilterIndex(max, direction) {
        if(this.currentIndex === max && direction === "right") return;
        if(this.currentIndex === 0 && direction === "left") return;
        if(this.currentIndex === max - 1 && direction === "right") {
            this.rightSliderBtn.classList.add("disabled");
        }
        if(this.currentIndex === 1 && direction === "left") {
            this.leftSliderBtn.classList.add("disabled");
        }
        if(this.currentIndex === max && direction === "left") {
            this.rightSliderBtn.classList.remove("disabled");
        }
        if(this.currentIndex === 0 && direction === "right") {
            this.leftSliderBtn.classList.remove("disabled");
        }
        if(direction === "left") {
            this.currentIndex--;
            return;
        }
        this.currentIndex++;
        return;
    }
    // method that changes slider images using buttons
    Slide(direction) {
        this.FilterIndex(this.sliderImages.length - 1, direction);
        this.setPositionByIndex();
    }
    // method that occurs on start dragging
    DragStart(index, e) {
        this.currentIndex = index;
        this.isDragging = true;
        this.startPosition = this.setStartPosition(e);
        // this.animationID = setInterval(this.animation, .000000001, this);
        var self = this;
        this.animationID = requestAnimationFrame(() => {
            this.animation(self);
        })
    }
    // method that is active when user is dragging
    Dragging(e) {
        if(this.isDragging === true) {
            const currentPosition = this.setStartPosition(e);
            this.startPoint = 0;
            // checking borders
            if(this.currentIndex === 0 && currentPosition > this.startPosition && this.prevStartPoint >= 0)
            {
                if(this.prevStartPoint === 0 || this.prevStartPoint > 0)
                {
                    this.currentTranslate = 0;
                }
                else {
                    this.currentTranslate = -this.prevTranslate;
                }
            }
            else if(this.currentIndex === this.sliderImages.length - 1 && currentPosition < this.startPosition && this.prevStartPoint <= -this.slidingArea)
            {
                this.currentTranslate = -this.slidingArea;
                // 6210
            }
            else
                this.currentTranslate = this.prevTranslate + currentPosition - this.startPosition;
            // auxiliary comparing
            if(currentPosition > this.startPosition)
                this.startPoint = this.currentTranslate - this.startPoint;
            else
                this.startPoint = this.currentTranslate + this.startPoint;
            this.prevStartPoint = this.startPoint;
        }
    }
    // method that occurs when user stopped dragging
    DragEnd() {
        // console.log(this.animationID);
        this.isDragging = false;
        cancelAnimationFrame(this.animationID);
        const movedOn = this.currentTranslate - this.prevTranslate;
        if(movedOn > 100 && this.currentIndex > 0) {
            this.currentIndex--;
        }
        if(movedOn < -100 && this.currentIndex < this.sliderImages.length - 1) {
            this.currentIndex++;
        }
        this.BtnsManip(this.sliderImages.length - 1);
        this.setPositionByIndex();
    }
    OnRightBtnClick() {
        if(this.currentIndex != this.sliderImages.length - 1)
            this.Slide("right");
    }
    OnLeftBtnClick() {
        if(this.currentIndex != 0)
            this.Slide("left");
    }
    PerformDraggingEvents(slide, index) {
        // touch events
        slide.addEventListener("touchstart", e => {
            this.DragStart(index, e, slide);
            slide.classList.add("grabbing");
        });
        slide.addEventListener("touchmove", e => {
            this.Dragging(e);
        });
        slide.addEventListener("touchend", () => {
            this.DragEnd();
            slide.classList.remove("grabbing");
        });
        // mouse events
        slide.addEventListener("mousedown", e => {
            this.DragStart(index, e, slide);
            slide.classList.add("grabbing");
        });
        slide.addEventListener("mousemove", e => {
            this.Dragging(e);
        });
        slide.addEventListener("mouseup", () => {
            this.DragEnd();
            slide.classList.remove("grabbing");
        });
        this.containerElement.addEventListener("mouseleave", () => {
            this.DragEnd();
            slide.classList.remove("grabbing");
            slide.classList.remove("grab");
        });
        this.containerElement.addEventListener("mouseenter", () => {
            slide.classList.add("grab");
        });
    }
    
    getCurrentIndex() {
        return this.currentIndex;
    }
}