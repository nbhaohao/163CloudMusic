{
    let view = {
        el: ".slidebar",
        template: `
                    <li>
            <div class="nav-slide-item" data-index="0">
                <span class="text">推荐音乐</span>
            </div>
        </li>
        <li>
            <div class="nav-slide-item" data-index="1">
                <span class="text">热歌榜</span>
            </div>
        </li>
        <li>
            <div class="nav-slide-item" data-index="2">
                <span class="text">搜索</span>
            </div>
        </li>
        <div class="swiper-scrollbar index0"></div>
        `,
        render(data) {
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.initFakeClass()
            this.bindEvents()
            this.listenerToSlideChange()
        },
        initFakeClass() {
            $(this.view.el).find(".nav-slide-item").each(function(index, element) {
                $("style").append(`nav .swiper-scrollbar.index${index} .swiper-scrollbar-drag::after {width:${element.clientWidth}px;}`)
            })
        },
        bindEvents() {
            this.bindLiHighLight()
        },
        bindLiHighLight() {
            $(this.view.el).find(".nav-slide-item").on("touchend", (e) => {
                window.ControllerTools.EVENT_HUB.emit("clickToSlide", $(e.currentTarget).attr("data-index"))
            })
        },
        listenerToSlideChange() {
            window.ControllerTools.EVENT_HUB.on("slidechange", (data) => {
                $(this.view.el).find(".nav-slide-item.active").removeClass("active")
                let $targetLi = $(this.view.el).find(`[data-index='${data}']`)
                $targetLi.addClass("active")
            })
        }
    }
    controller.init(view, model)
}