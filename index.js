module.exports = function(bp) {
    bp.middlewares.load()

    bp.hear(/hello/i, (event, next) => { // We use a regex instead of a hardcoded string
        const first_name = event.user.first_name
        console.log('==========', event.user)

        bp.messenger.sendText(event.user.id, 'Hello, ' + first_name, { typing: true })
    })

    bp.hear(/help/i, (event, next) => {
        const options = {
            quick_replies: [{
                content_type: "text",
                title: "Đẹp",
                payload: "HELP_OPTION_1"
            }, {
                content_type: "text",
                title: "Rất đẹp",
                payload: "HELP_OPTION_2"
            }],
            typing: true,
            waitRead: true // `waitDelivery` or `waitRead` options
        }

        const text = 'Duyệt có đẹp trai không?'
        bp.messenger.sendText(event.user.id, text, options)
            .then(() => {
                // Do `waitRead` nên nội dung trong đây sẽ được thực thi khi user read.  
                // bp.messenger.sendText(event.user.id, 'Biết mà :v', { typing: true })
            })
    })

    bp.hear(/meo/i, event => {
        const type = 'image' // 'audio', 'file', 'image' or 'video'
        const img_url = 'https://avatars0.githubusercontent.com/u/5009534?v=3&s=460'
        bp.messenger.sendAttachment(event.user.id, type, img_url)
    })

bp.hear(/duyetdev/i, event => {
    const payload = {
        template_type: "button",
        text: "duyetdev profile",
        buttons: [
            {
                type: "web_url",
                url: "https://duyetdev.com",
                title: "duyetdev.com"
            },
            {
                type: "web_url",
                url: "https://duyetdev.com",
                title: "Profile"
            },{
                type: "web_url",
                url: "https://facebook.com/duyetdev",
                title: "Facebook"
            },
        ]
    }

    bp.messenger.sendTemplate(event.user.id, payload, { typing: true })
})
}
