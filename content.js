
function summary() {
    items = $(".regulateItem");
    $.each(items, function( index, item ){
        $(".tab:eq(1)",item).css({"display": "-webkit-box", "width": "800px"});
        new_item = $(".tab:eq(1) > tbody",item); //.wrap("<div class='expbox'></div>");

        w = ($("body").width() - new_item.width()) / 2 - 15;
        h = new_item.height() - 4.5;

        dd = {};
        dd.to = $(".tab-blank > tbody > tr > td:eq(1)", item).text();
        dd.th = $(".tab:eq(0) > tbody > tr > td:eq(1)", item).text();
        dd.du = $(".tab:eq(0) > tbody > tr > td:eq(3)", item).text().replace(/(.*)\((.*?)\)/, "$1");

        dd.fj = {};
        n = $(".tab:eq(1) > tbody > tr", item).length;

        for (i = 1; i< n-2; i++){
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

        for (i in dd.fj){
            ff = dd.fj[i];
            ft_text = [];
            for (t in ff){
                ft_text.push(`${ff[t].count} ${ff[t].ft}`);
            }
            text = `${i}日, 用房: ${ft_text.join(" + ")}`;

            fj_text.push(text);
        }

        ff_div = new_item.after(`<div class='expbox' style='position: absolute; left: ${w+800+28}px;'>
<textarea style='width: ${w}px; height: ${h}px;'>
团号: ${dd.th}\n导游信息: ${dd.du}\n原订: \n现麻烦变更为:\n\t${fj_text.join("\n\t")}\n确认变更回复，谢谢
</textarea></div>`);

        fb_div = new_item.before(`<div class='expbox' style='position: absolute; left: 10px;'>
<textarea style='width: ${w}px; height: ${h}px;'>
用房信息:\n\t${fj_text.join("\n\t")}\n麻烦收到确认回复,谢谢
</textarea></div>`);
    });

}

function remove_summary(){
    $(".expbox").remove();
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "expbox") {
        if (message.data.type ==  "summary"){
            summary();
        }
        if (message.data.type == "remove_summary"){
            remove_summary();
        }
    }
});
