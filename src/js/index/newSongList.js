{
    let view = {
        el: ".newSongList",
        template: `
            <h2 class="content-title">最新音乐</h2>
            <ul class="ul-newSongItemList">
               <li class="li-songItem">
                    <div class="songInfomation oneLine-moreEllipsis">
                        <div class="songTitle oneLine-moreEllipsis">Can't Breathe</div>
                        <div class="subTitle oneLine-moreEllipsis">
                            <svg class="icon sqIcon" aria-hidden="true">
                                <use xlink:href="#icon-sq"></use>
                            </svg>
                          Eddie Supa / 王嘉尔 / Stan Sono
                      </div>
                    </div>
                    <div class="playBtnWrapper">
                        <svg class="icon playbtn" aria-hidden="true">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </div>
               </li>
               <li class="li-songItem">
                    <div class="songInfomation oneLine-moreEllipsis">
                        <div class="songTitle oneLine-moreEllipsis">Can't Breathe</div>
                        <div class="subTitle oneLine-moreEllipsis">
                            <svg class="icon sqIcon" aria-hidden="true">
                                <use xlink:href="#icon-sq"></use>
                            </svg>
                          Eddie Supa / 王嘉尔 / Stan Sono
                      </div>
                    </div>
                    <div class="playBtnWrapper">
                        <svg class="icon playbtn" aria-hidden="true">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </div>
               </li>
               <li class="li-songItem">
                    <div class="songInfomation oneLine-moreEllipsis">
                        <div class="songTitle oneLine-moreEllipsis">Can't Breathe</div>
                        <div class="subTitle oneLine-moreEllipsis">
                            <svg class="icon sqIcon" aria-hidden="true">
                                <use xlink:href="#icon-sq"></use>
                            </svg>
                          Eddie Supa / 王嘉尔 / Stan Sono
                      </div>
                    </div>
                    <div class="playBtnWrapper">
                        <svg class="icon playbtn" aria-hidden="true">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </div>
               </li>
               <li class="li-songItem">
                    <div class="songInfomation oneLine-moreEllipsis">
                        <div class="songTitle oneLine-moreEllipsis">Can't Breathe</div>
                        <div class="subTitle oneLine-moreEllipsis">
                            <svg class="icon sqIcon" aria-hidden="true">
                                <use xlink:href="#icon-sq"></use>
                            </svg>
                          Eddie Supa / 王嘉尔 / Stan Sono
                      </div>
                    </div>
                    <div class="playBtnWrapper">
                        <svg class="icon playbtn" aria-hidden="true">
                            <use xlink:href="#icon-play"></use>
                        </svg>
                    </div>
               </li>               
            </ul>
        `,
        render(data) {
            $(this.el).html(this.template)
        },
    }
    let model = {
        data: "",
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view, model)
}