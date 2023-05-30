
console.log("hello");

items = $(".regulateItem");

$.each( items, function( index, item ){
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
});
