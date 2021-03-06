{
    let isPc = window.ViewTools.isPcUser()
    let ControllerTools = window.ControllerTools
    let touchendOrClick = window.ViewTools.getClickEventName()
    let view = {
        el: ".popularSongsList",
        template: ``,
        render(data) {
            let $ul = $(this.el)
            for (let i = 0; i < data.length; i++) {
                let item = data[i]
                let $newLi = $(`<li class="li-c-playSongItem" data-id="${item.id}">
                    <div class="index">${i + 1 < 10 ? "0" + String(i + 1) : i + 1}</div>
                    <div class="info-wrapper">
                        <div class="info">
                            <p class="title oneLine-moreEllipsis">${item.name}</p>
                            <p class="singer oneLine-moreEllipsis">${item.singer}</p>
                        </div>
                        <div class="playSvg">
                           <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bofang"></use>
                           </svg>
                        </div>
                    </div>
                </li>`)
                $ul.append($newLi)
            }
        },
    }
    let model = {
        data: [],
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            window.ControllerTools.EVENT_HUB.on("get-all-songs", (data) => {
                this.view.render(data)
            })
            this.bindEvents()
        },
        bindEvents() {
            this.bindLiItemClickEvent()
        },
        bindLiItemClickEvent() {
            let flag = true
            if (!isPc) {
                $(this.view.el).on("touchstart", ".li-c-playSongItem", (e) => {
                    flag = true
                })
                $(this.view.el).on("touchmove", ".li-c-playSongItem", (e) => {
                    flag = false
                })
            }
            $(this.view.el).on(touchendOrClick, ".li-c-playSongItem", (e) => {
                if (!isPc && !flag) {
                    return
                }
                window.location.href = `./song.html?id=${e.currentTarget.dataset.id}`
            })
        }
    }
    controller.init(view, model)
}