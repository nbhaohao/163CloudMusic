{
    let view = {
        el: ".recommendMusicList",
        template: `
            <h2 class="content-title">推荐歌单</h2>
            <ul class="songList">
                <li>
                    <div class="maskdiv">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-musicicon"></use>
                        </svg>
                    </div>
                    <img src="./img/test1.jpg" class="songPhoto">
                    <p class="songIntroduction">呵呵我呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈哈哈</p>
                </li>
               <li>
                    <div class="maskdiv">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-musicicon"></use>
                        </svg>
                    </div>
                    <img src="./img/test1.jpg" class="songPhoto">
                    <p class="songIntroduction">呵呵我呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈哈哈</p>
                </li>
                <li>
                    <div class="maskdiv">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-musicicon"></use>
                        </svg>
                    </div>
                    <img src="./img/test1.jpg" class="songPhoto">
                    <p class="songIntroduction">呵呵我呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈哈哈</p>
                </li>
                <li>
                    <div class="maskdiv">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-musicicon"></use>
                        </svg>
                    </div>
                    <img src="./img/test1.jpg" class="songPhoto">
                    <p class="songIntroduction">呵呵我呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈哈哈</p>
                </li>
               <li>
                    <div class="maskdiv">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-musicicon"></use>
                        </svg>
                    </div>
                    <img src="./img/test1.jpg" class="songPhoto">
                    <p class="songIntroduction">呵呵我呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈哈哈</p>
                </li>
                <li>
                    <div class="maskdiv">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-musicicon"></use>
                        </svg>
                    </div>
                    <img src="./img/test1.jpg" class="songPhoto">
                    <p class="songIntroduction">呵呵我呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈呵呵我哈哈哈哈</p>
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