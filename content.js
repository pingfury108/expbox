
console.log("hello");

items = $(".regulateItem");

$.each(items, function( index, item ){
    $(".tab:eq(1)",item).css({"display": "-webkit-box", "width": "800px"});
    new_item = $(".tab:eq(1) > tbody",item); //.wrap("<div class='expbox'></div>");

    dd = {};
    dd.to = $(".tab-blank > tbody > tr > td:eq(1)", item).text();
    dd.th = $(".tab:eq(0) > tbody > tr > td:eq(1)", item).text();
    dd.du = $(".tab:eq(0) > tbody > tr > td:eq(3)", item).text();

    dd.fj = [];
    n = $(".tab:eq(1) > tbody > tr", item).length;

    for (i = 1; i< n-2; i++){
        ff = {};
        ff_item = $(".tab:eq(1) > tbody > tr:eq(" + i + ")", item);
        ff.ft = $("td:eq(0)", ff_item).text();
        ff.rzTime = $("td:eq(1)", ff_item).text();
        ff.count = $("td:eq(5)", ff_item).text();

        dd.fj.push(ff);
    }

    console.log(dd);

    fj_text = "";

    for (i in dd.fj){
        ff = dd.fj[i];
        text = "入住时间: " + ff.rzTime + "\n\t" +
            ff.ft + ": " + ff.count + " 间\n";

        fj_text = fj_text + text + "\n\t";
    }

    ff_div = new_item.after("<div style='float:right;'>" +
                            "<textarea style='width: 300%;height: 97.5%;'>" +
                            "酒店名称: " + dd.to + "\n" +
                            "团号: " + dd.th + "\n" +
                            "导游信息: " + dd.du + "\n" +
                            "用房信息: " + "\n\t" +
                            fj_text + "\n" +
                            "</textarea>" + "</div>");
});
