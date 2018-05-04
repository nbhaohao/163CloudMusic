{
    let view = {
        el: ".songList",
        template: `
        <div class="title">
                    <h4>已上传的歌曲</h4>
                    <span class="songsNum">166首音乐</span>
                </div>
                <div class="songTableWrapper">
                    <table class="songListTable">
                        <thead>
                            <tr>
                                <td></td>
                                <td>音乐标题</td>
                                <td>歌手</td>
                                <td>外链</td>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>战争</td>
                            <td>陈冠希</td>
                            <td>https://www.baidu.com</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>战争</td>
                            <td>陈冠希</td>
                            <td>https://www.baidu.com</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>战争</td>
                            <td>陈冠希</td>
                            <td>https://www.baidu.com</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>战争</td>
                            <td>陈冠希</td>
                            <td>https://www.baidu.com</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>战争</td>
                            <td>陈冠希</td>
                            <td>https://www.baidu.com</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>战争</td>
                            <td>陈冠希</td>
                            <td>https://www.baidu.com</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>战争</td>
                            <td>陈冠希</td>
                            <td>https://www.baidu.com</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>战争</td>
                            <td>陈冠希</td>
                            <td>https://www.baidu.com</td>
                        </tr>
                            <tr>
                                <td>1</td>
                                <td>战争</td>
                                <td>陈冠希</td>
                                <td>https://www.baidu.com</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>战争</td>
                                <td>陈冠希</td>
                                <td>https://www.baidu.com</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>战争</td>
                                <td>陈冠希</td>
                                <td>https://www.baidu.com</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>战争</td>
                                <td>陈冠希</td>
                                <td>https://www.baidu.com</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>战争</td>
                                <td>陈冠希</td>
                                <td>https://www.baidu.com</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>战争</td>
                                <td>陈冠希</td>
                                <td>https://www.baidu.com</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>战争</td>
                                <td>陈冠希</td>
                                <td>https://www.baidu.com</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>战争</td>
                                <td>陈冠希</td>
                                <td>https://www.baidu.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        `,
        render() {
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render()
        }
    }
    controller.init(view, model)
}