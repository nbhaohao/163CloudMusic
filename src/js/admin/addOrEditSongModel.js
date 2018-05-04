{
    let view = {
        el: ".page",
        template: `
       <<div class="addOrEditSongModal-wrapper">
        <div class="addOrEditSongModal">
        <div class="header-wrapper">
        <h4>新增/编辑歌曲</h4>
        <svg class="icon closeModal" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
        </svg>
        </div>
        <div class="body-wrapper">
        <p class="flexwrapper"><span>歌曲名称：</span><input type="text" class="form-control"></p>
        <p class="flexwrapper"><span>歌手：</span><input type="text" class="form-control"></p>
        <p class="flexwrapper"><span>外链：</span><input type="text" class="form-control"></p>
        </div>
        <div class="footer-wrapper">
        <button class="btn btn-success">保存</button>
        <button class="btn btn-secondary">取消</button>
        </div>
        </div>
        </div>          
        `,
        render() {
            $(this.el).append(this.template)
        },
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            window.EVENT_HUB.on("addNewSong", (data) => {

            })
        }
    }
    controller.init(view, model)
}