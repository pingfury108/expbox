
items = $(".regulateItem");
$.each(items, function( index, item ){
    $(".tab:eq(1)",item).css({"display": "-webkit-box", "width": "800px"});
    new_item = $(".tab:eq(1) > tbody",item); //.wrap("<div class='expbox'></div>");

    dd = {};
    dd.to = $(".tab-blank > tbody > tr > td:eq(1)", item).text();
    dd.th = $(".tab:eq(0) > tbody > tr > td:eq(1)", item).text();
    dd.du = $(".tab:eq(0) > tbody > tr > td:eq(3)", item).text();

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

    fj_text = "";

    for (i in dd.fj){
        ff = dd.fj[i];
        ft_text = "";
        for (t in ff){
            ft_text = `${ft_text}${ff[t].ft}: ${ff[t].count} 间;  `;
        }
        text = `\n\t入住时间: ${i}\n\t  ${ft_text}\n`;

        fj_text = fj_text + text;
    }

    ff_div = new_item.after(`<div class='expbox' style='float:right;'> <textarea style='width: 300%;height: 97.5%;'>酒店名称: ${dd.to}\n团号: ${dd.th}\n导游信息: ${dd.du}\n用房信息: ${fj_text}</textarea></div>`);
});
