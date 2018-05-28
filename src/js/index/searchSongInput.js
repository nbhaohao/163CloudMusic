{
    let isPc = window.ViewTools.isPcUser()
    let ControllerTools = window.ControllerTools
    let touchendOrClick = window.ViewTools.getClickEventName()
    let view = {
        el: ".searchSong-Content-main",
        template: `
        <div class="searchSong-Content">
            <div class="input-searchWrapper">
                <svg class="icon searchSvg" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi-"></use>
                </svg>
                <input placeholder="搜索歌曲名称" class="input-searchValue">
                <div class="svgWrapper controlBtns closeSvgWrapper">
                    <svg class="icon closeSvg" aria-hidden="true">
                        <use xlink:href="#icon-close1"></use>
                    </svg>
                </div>
            </div>
        </div>
        <h3 class="h3-c-search-bind oneLine-moreEllipsis"></h3>
        <ul class="ul-search-result"></ul>
        `,
        render(data) {
            $(this.el).html(this.template)
        },
        upDateSearchResult(data) {
            let $ul = $(this.el).find(".ul-search-result")
            if (data.length === 0) {
                $ul.empty()
            } else {
                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    let $newLi = $(`
                    <li class="search-result-item" data-id="${item.id}">
                        <svg class="icon searchSvg" aria-hidden="true">
                            <use xlink:href="#icon-xiaoxi-"></use>
                        </svg>   
                        <div class="name">
                            ${item.attributes.name}
                        </div>                     
                    </li>`)
                    $ul.append($newLi)
                }
            }
        }
    }
    let model = {
        data: [],
        search(name) {
            var query = new AV.Query('Song')
            query.contains('name', name);
            return query.find()
        },
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.betterSearch = _.debounce(this.betterSearch, 500)
            this.view.render(null)
            this.bindEvents()
        },
        betterSearch() {
            let value =  $(this.view.el).find(".input-searchValue").val()
            this.model.search(value).then((data) => {
                this.view.upDateSearchResult(data)
            })
        },
        bindEvents() {
            this.bindSearchInputEvent()
            this.bindEmptyBtnEvent()
            this.bindResultItemClick()
        },
        bindResultItemClick() {
            let flag = true
            if (!isPc) {
                $(this.view.el).on("touchstart", ".search-result-item", (e) => {
                    flag = true
                })
                $(this.view.el).on("touchmove", ".search-result-item", (e) => {
                    flag = false
                })
            }
            $(this.view.el).on(touchendOrClick, ".search-result-item", (e) => {
                if (!isPc && !flag) {
                    return
                }
                window.location.href = `./song.html?id=${e.currentTarget.dataset.id}`
            })
        },
        bindEmptyBtnEvent() {
            $(this.view.el).on(touchendOrClick, ".closeSvgWrapper", (e) => {
                $(this.view.el).find(".input-searchValue").val("")
                this.emptySearchInput()
            })
        },
        bindSearchInputEvent() {
            $(this.view.el).find(".input-searchValue").on("input", (e) => {
                let value = $(e.currentTarget).val()
                if (value === "") {
                    this.emptySearchInput()
                } else {
                    $(this.view.el).find(".closeSvgWrapper").addClass("active")
                    $(this.view.el).find(".h3-c-search-bind").text(`搜索:"${value}"`)
                    $(this.view.el).find(".h3-c-search-bind").addClass("active")
                    this.betterSearch()
                }
            })
        },
        emptySearchInput() {
            $(this.view.el).find(".closeSvgWrapper").removeClass("active")
            $(this.view.el).find(".h3-c-search-bind").removeClass("active")
            this.view.upDateSearchResult([])
        }
    }
    controller.init(view, model)
}