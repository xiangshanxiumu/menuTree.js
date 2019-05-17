// MenuTree构造函数
class MenuTree {
    constructor(ele, menuTree, callback) {
        this.ele = ele;
        this.menuTree = menuTree;
        this.HTML = "";
        this.callback = callback;

        this.HtmlStr(this.menuTree); // 导航树Dom结构HTML字符串生成

        this.ele.html(this.HTML); // 导航树Dom创建

        this.init(); // 初始化

        this.event(); // 加载事件
    }
    HtmlStr(opts) {
        for (let i = 0; i < opts.length; i++) {
            let htmlStr = "";
            if (opts[i].lists) {
                htmlStr =
                    `<div class="menuWrap"><li class="menuItem"><a href=${opts[i].url} class="menuTitle">${opts[i].name}</a></li><ul>`;
                this.HTML += htmlStr;
                this.HtmlStr(opts[i]['lists']); // 递归
                this.HTML += `</ul></div>`;
            } else {
                htmlStr =
                    `<div class="menuWrap"><li><a href=${opts[i].url} class="menuTitle">${opts[i].name}</a></li>`;
                this.HTML += htmlStr;
                this.HTML += `</div>`;
            }
        }
        return this.HTML; // 返回
    }
    init() {
        // 默认创建时隐藏
        this.ele.hide();
        // 默认样式
        this.ele.css("margin-left", "-2rem");
        //当前页面 导航栏 根据当前页面title 自动锁定到目标导航条 并突出底色
        let current_title = document.title
        $('.menuTitle').each((index, element) => {
            if ($(element).text() == current_title) {
                $(element).addClass('menuActive') // 激活样式
                /*$(element).css({
                    "background-color": "#99CCFF"
                })*/
            }
        })
        //给有子lists的元素加[-]初始标签
        //所有有ul 的div
        $('#menuTree ul').parents('.menuWrap')
        //所有ul siblings
        //$('#menuTree ul').siblings().find('a').before('<span class="meunLabel"><span>');
        $('#menuTree ul').siblings().prepend('<span class="menuLabel"><span>');

    }
    event() {
        // [-] 点击子菜单收起来 [+]点击展开
        $('#menuTree ul').siblings().click(function () {
            let _this = $(this).siblings()
            // 判断当前导航栏是否隐藏状态 
            if (_this.is(":hidden")) {
                _this.fadeIn(300)
                $(this).children(":first").css({
                    "background-image": "url(./img/reduce-square.png)" // [+]
                });
                return false; // 阻止事件冒泡
            } else {
                _this.fadeOut(300)
                $(this).children(":first").css({
                    "background-image": "url(./img/plus-square.png)" // [-]
                });
                return false; // 阻止事件冒泡
            }
        })
        let that = this;
        // 所有的 导航标题 点击事件 背景色突出
        $('.menuTitle').click(function () {
            /*$('.menuTitle').css({
                "background-color": "#fff"
            })
            $(this).css({
                "background-color": "#99CCFF"
            })*/
            $('.menuTitle').removeClass('menuActive');
            $(this).addClass('menuActive');
            that.callback(this);
        })
    }
}