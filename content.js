
function summary() {
    // 设置 body 为定位参考
    $("body").css({ "position": "relative", "width": "100%", "overflow-x": "hidden" });

    items = $(".regulateItem");
    $.each(items, function (index, item) {
        $(".tab", item).css("display", "");
        new_item = $(".tab:eq(1) > tbody", item);

        // 按原始逻辑计算宽度
        w = ($("body").width() - new_item.width()) / 2 - 15;

        dd = {};
        dd.to = $(".tab-blank > tbody > tr > td:eq(1)", item).text();
        dd.th = $(".tab:eq(0) > tbody > tr > td:eq(1)", item).text();
        dd.du = $(".tab:eq(0) > tbody > tr > td:eq(3)", item).text().replace(/(.*)\((.*?)\)/, "$1");
        dd.from = $(".tab-blank > tbody > tr:eq(1) > td:eq(1)", item).text().trim();

        dd.fj = {};
        n = $(".tab:eq(1) > tbody > tr", item).length;

        for (i = 1; i < n - 1; i++) {
            ff_item = $(".tab:eq(1) > tbody > tr:eq(" + i + ")", item);
            rzTime = $("td:eq(1)", ff_item).text();
            fj_t = [];

            if (dd.fj[rzTime])
                fj_t = dd.fj[rzTime];

            ff = {};
            ff.ft = $("td:eq(0)", ff_item).text();
            ff.count = $("td:eq(5)", ff_item).text();
            ff.price = $("td:eq(4)", ff_item).text();
            ff.payment = $("td:eq(9)", ff_item).text();
            ff.free = $("td:eq(6)", ff_item).text();
            fj_t.push(ff);

            dd.fj[rzTime] = fj_t;
        }

        fj_text = [];

        for (i in dd.fj) {
            ff = dd.fj[i];
            ft_text = [];
            for (t in ff) {
                ft_text.push(`${ff[t].count} ${ff[t].ft}`);
            }
            // 日期格式：3月7日
            var dateParts = i.split("-");
            if (dateParts.length === 3) {
                var month = parseInt(dateParts[1]);
                var day = parseInt(dateParts[2]);
                text = `${month}月${day}日, 用房: ${ft_text.join(" + ")}`;
            } else {
                text = `${i}, 用房: ${ft_text.join(" + ")}`;
            }

            fj_text.push(text);
        }

        // 右侧摘要文本
        right_blocks = [];
        for (var date in dd.fj) {
            var rooms = dd.fj[date];
            var count_parts = [];
            var hasFree = false;
            for (var r in rooms) {
                var roomType = rooms[r].ft.replace(/间$|房$/, '');
                if (roomType === '标准') roomType = '标';
                count_parts.push(`${rooms[r].count}${roomType}`);
                if (parseInt(rooms[r].free) > 0) {
                    count_parts.push(`${rooms[r].free}司陪`);
                    hasFree = true;
                }
            }
            var countStr = count_parts.join("+");

            var dateParts = date.split("-");
            var dateStr = date;
            if (dateParts.length === 3) {
                dateStr = `${parseInt(dateParts[1])}月${parseInt(dateParts[2])}日`;
            }

            var payment = rooms[0].payment.trim();
            var price = rooms[0].price.trim();

            var block = `预定：${dd.to.trim()}\n入住日期：${dateStr}\n团号：${dd.th.trim()}\n导游：${dd.du.trim()}\n数量：${countStr}`;

            if (payment !== '签单') {
                var priceStr = price;
                if (hasFree) priceStr += '，免司陪';
                block += `\n房价：${priceStr}`;
            }

            block += `\n付款方式：${payment}\n预定单位：${dd.from}`;

            right_blocks.push(block);
        }

        // 基于 item 的位置计算（相对于 body）
        var item_offset = $(item).offset();
        var item_top = item_offset.top;
        var item_left = item_offset.left;

        // 假设内容在页面中居中，计算左右两侧的位置
        var center_x = $("body").width() / 2;
        var left_box_left = 10;  // 左侧固定 left: 10px
        var right_box_left = center_x + 400 + 10;  // 右侧不偏移

        // 根据内容行数计算高度
        var lineH = 20;
        var leftContent = `${dd.to}:\n\t${fj_text.join("\n\t")}\n麻烦收到确认回复,谢谢`;
        var leftH = leftContent.split("\n").length * lineH;
        var rightContent = right_blocks.join("\n\n");
        var rightH = rightContent.split("\n").length * lineH;

        // 左侧（暂不显示）
        // $("body").append(`<div class='expbox' style='position: absolute; top: ${item_top + 149}px; left: ${left_box_left}px;'>
// <textarea style='width: ${w}px; height: ${leftH}px;'>
// ${dd.to}:
// \t${fj_text.join("\n\t")}
// 麻烦收到确认回复,谢谢
// </textarea></div>`);

        // 右侧
        $("body").append(`<div class='expbox' style='position: absolute; top: ${item_top + 149}px; left: ${right_box_left}px;'>
<textarea style='width: ${w}px; height: ${rightH}px;'>
${right_blocks.join("\n\n")}
</textarea></div>`);
    });

}

function remove_summary() {
    $(".expbox").remove();
}

function summary_hket() {
    var iframe = $('#sharedRpt');
    var cc = $("#parent-iframe-control > #div1 > #printDiv", iframe.contents());
    var team_info = $("table:eq(2)", cc);
    dd = {};
  dd.th = $("tbody > tr > td:eq(1)", team_info).text();
  dd.du = $("tbody > tr > td:eq(3)", team_info).text().replaceAll("\n", "").replaceAll(" ", "");

  var items = $("#tbQuo > tbody > tr:gt(0)", cc);
  dd.fj = {};

  for (i = 0; i < items.length; i++) {
    item = items[i];
    rzTime = $("td:eq(0)", item).text();

    fj_t = []
    if (dd.fj[rzTime]) {
      fj_t = dd.fj[rzTime];
    }
    ff = {};
    ff.ft = $("td:eq(1)", item).text().split("|")[1].replaceAll(" ", "");
    ff.count = $("td:eq(4)", item).text();
    fj_t.push(ff);

    dd.fj[rzTime] = fj_t;
  }

  fj_text = [];

  for (i in dd.fj) {
    ff = dd.fj[i];
    ft_text = [];
    for (t in ff) {
      ft_text.push(`${ff[t].count} ${ff[t].ft}`);
    }
    text = `${i}日, 用房: ${ft_text.join(" + ")}`;

    fj_text.push(text);
  }
  var new_item = $("#parent-iframe-control > #div1", iframe.contents());//.wrap("<div class='expbox'></div>");
  var offset = 60;
  w = ($("#parent-iframe-control", iframe.contents()).width() - new_item.width()) / 2 - offset;
  h = new_item.height() - 4.5;

  text_1 = `<div class='expbox' style='position: absolute; left: ${w + offset + 50 + new_item.width()}px; margin: 60px auto auto;'>
                            <textarea style='width: ${w}px; height: ${h}px;'>团号: ${dd.th}\n导游信息: ${dd.du}\n原订: \n现麻烦变更为:\n\t${fj_text.join("\n\t")}\n确认变更回复，谢谢</textarea></div>`
  text_2 = `<div class='expbox' style='position: absolute; left: 10px; margin: 60px auto auto;'>
<textarea style='width: ${w}px; height: ${h}px;'>用房信息:\n\t${fj_text.join("\n\t")}\n麻烦收到确认回复,谢谢</textarea></div>`

  remove_summary_hket();
    $("#parent-iframe-control", iframe.contents()).css({ "display": "-webkit-box" });
    ff_div = new_item.after(text_1);
    fb_div = new_item.before(text_2);
}

function remove_summary_hket() {
    var iframe = $('#sharedRpt');
    $("#parent-iframe-control", iframe.contents()).css({ "display": "" });
    $(".expbox", iframe.contents()).remove();
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === "expbox") {
        if (message.data.type == "summary") {
            if (/^.*\.et818.com$/.test(window.location.hostname)) {
                summary_hket();
            } else {
                summary();
            }
        }
        if (message.data.type == "remove_summary") {
            if (/^.*\.et818.com$/.test(window.location.hostname)) {
                remove_summary_hket();
            } else {
                remove_summary();
            }
        }
    }
});
