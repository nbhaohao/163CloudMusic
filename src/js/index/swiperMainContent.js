{
    let view = {
        el: "main",
        template: `
                    <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><div class="recommendMusicList"></div><div class="newSongList"></div></div>
                    <div class="swiper-slide">456</div>
                    <div class="swiper-slide">777</div>
                </div>
                <div class="swiper-scrollbar index0"></div>
            </div>
        `,
        render(data) {
            $(this.el).html(this.template)
        },
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.listenerToClickToSlide()
            this.initSwiper()
            this.setMarginTopAndSlideMinHeight()
        },
        setMarginTopAndSlideMinHeight() {
            let headerHeight = $("header .title").height() + $("header .slidebar").height()
            $(this.view.el).css("margin-top", String(headerHeight) + "px")
            let restHeight = document.documentElement.clientHeight - headerHeight
            $(this.view.el).find(".swiper-slide").each((index, element) => {
                $(element).css("min-height", String(restHeight) + "px")
            })
        },
        initSwiper() {
            this.mySwiper = new Swiper ('main .swiper-container', {
                direction: 'horizontal',
                // 如果需要滚动条
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
                on: {
                    slideChangeTransitionEnd: function () {
                        window.EVENT_HUB.emit("slidechange", this.activeIndex)
                        $("main .swiper-scrollbar").removeClass("index0 index1 index2").addClass(`index${this.activeIndex}`)
                    },
                    init: function() {
                        window.EVENT_HUB.emit("slidechange", "0")
                    },
                }
            })
        },
        listenerToClickToSlide() {
            window.EVENT_HUB.on("clickToSlide", (data) => {
                this.mySwiper.slideTo(data)
            })
        },
    }
    controller.init(view, model)
}