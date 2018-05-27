{
    let view = {
        el: "header",
        template: `
             <div class="titleWrapper">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-music"></use>
                </svg>
                <span class="css11cb9313881a2f7">网易云音乐后台管理</span>
            </div>
            <span class="toggleBtn" data-type="song">切换至歌单管理</span>
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
            this.view.render(null)
            this.bindEvents()
        },
        bindEvents() {
            $(this.view.el).on("click", ".toggleBtn", function(e) {
                let $self = $(e.currentTarget)
                if ($self.attr("data-type") === "song") {
                    $self.text("切换至歌曲管理")
                    $(".tabDiv.songManage").removeClass("active")
                    $(".tabDiv.songListManage").addClass("active")
                    $self.attr("data-type", "songList")
                } else {
                    $self.text("切换至歌单管理")
                    $(".tabDiv.songManage").addClass("active")
                    $(".tabDiv.songListManage").removeClass("active")
                    $self.attr("data-type", "song")
                }
            })
        }
    }
    controller.init(view, model)
}