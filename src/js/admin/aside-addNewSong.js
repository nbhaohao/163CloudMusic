{
    let view = {
        el: ".page aside",
        template: `
            <button type="button" class="btn btn-danger addNewSongBtn">新建歌曲</button>
            <div class="dragFileArea">
                将文件拖曳到此处，即可开始上传
            </div>            
        `,
        render() {
          $(this.el).html(this.template)
        },
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view, model)

}