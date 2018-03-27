const isClient = process.browser

const scrollFunc = (() => {
    if (!isClient) {
        return {}
    }
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60)
            }
    })()

    function scroll(top, time = 600) {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let dire = scrollTop > top ? 1 : -1 // 滚动方向，向上或向下
        let start
        function scrollTo(timestamp) {
            if (start === undefined) start = timestamp
            let progress = timestamp - start
            let offset = (scrollTop - top) * progress / time
            scrollTop -= offset
            if (dire * (scrollTop - top) > 0) {
                window.scrollTo(0, scrollTop)
                requestAnimationFrame(scrollTo)
            } else {
                window.scrollTo(0, top)
            }
        }

        requestAnimationFrame(scrollTo)
    }

    function scrollToElement(el, time) {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        let top = el.getBoundingClientRect().top
        scroll(scrollTop + top, time)
    }

    function scrollToTop(time) {
        scroll(0, time)
    }

    return {
        scroll,
        scrollToElement,
        scrollToTop
    }
})()

export default scrollFunc
