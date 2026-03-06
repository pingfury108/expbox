
function summary() {
    // 设置 body 为定位参考
    $("body").css({ "position": "relative", "width": "100%", "overflow-x": "hidden" });

    items = $(".regulateItem");
    $.each(items, function (index, item) {
        $(".tab", item).css("display", "");
        new_item = $(".tab:eq(1) > tbody", item);

        // 按原始逻辑计算宽度
        w = ($("body").width() - new_item.width()) / 2 - 15;
        h = new_item.height() - 4.5;

        dd = {};
        dd.to = $(".tab-blank > tbody > tr > td:eq(1)", item).text();
        dd.th = $(".tab:eq(0) > tbody > tr > td:eq(1)", item).text();
        dd.du = $(".tab:eq(0) > tbody > tr > td:eq(3)", item).text().replace(/(.*)\((.*?)\)/, "$1");

        dd.fj = {};
        n = $(".tab:eq(1) > tbody > tr", item).length;

        for (i = 1; i < n - 2; i++) {
            ff_item = $(".tab:eq(1) > tbody > tr:eq(" + i + ")", item);
            rzTime = $("td:eq(1)", ff_item).text();
            fj_t = [];

            if (dd.fj[rzTime])
                fj_t = dd.fj[rzTime];

            ff = {};
            ff.ft = $("td:eq(0)", ff_item).text();
            ff.count = $("td:eq(5)", ff_item).text();
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

        // 基于 item 的位置计算（相对于 body）
        var item_offset = $(item).offset();
        var item_top = item_offset.top;
        var item_left = item_offset.left;

        // 假设内容在页面中居中，计算左右两侧的位置
        var center_x = $("body").width() / 2;
        var left_box_left = 10;  // 左侧固定 left: 10px
        var right_box_left = center_x + 400 + 10;  // 右侧不偏移

        // 左侧
        $("body").append(`<div class='expbox' style='position: absolute; top: ${item_top + 149}px; left: ${left_box_left}px;'>
<textarea style='width: ${w}px; height: ${h}px;'>
${dd.to}:
\t${fj_text.join("\n\t")}
麻烦收到确认回复,谢谢
</textarea></div>`);

        // 右侧
        $("body").append(`<div class='expbox' style='position: absolute; top: ${item_top + 149}px; left: ${right_box_left}px;'>
<textarea style='width: ${w}px; height: ${h}px;'>
${dd.to}:
团号: ${dd.th}
导游: ${dd.du}
原订:
现麻烦变更为:
\t${fj_text.join("\n\t")}
确认变更回复，谢谢
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
