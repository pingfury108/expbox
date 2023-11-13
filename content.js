
function summary() {
  remove_summary();
  items = $(".regulateItem");
  $.each(items, function (index, item) {
    dd = {};
    dd.to = $(".tab-blank > tbody > tr > td:eq(1)", item).text();
    dd.th = $(".tab:eq(0) > tbody > tr > td:eq(1)", item).text();
    dd.du = $(".tab:eq(0) > tbody > tr > td:eq(3)", item).text().replace(/(.*)\((.*?)\)/, "$1");

    dd.fj = {};
    n = $(".tab:eq(1) > tbody > tr", item).length;

    for (i = 1; i < n - 1; i++) {
      ff_item = $(".tab:eq(1) > tbody > tr:eq(" + i + ")", item);
      if ($("td",ff_item).length < 5){
        continue;
      }
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
      text = `${i}日, 用房: ${ft_text.join(" + ")}`;

      fj_text.push(text);
    }

    new_item = $(".tab:eq(1)", item).wrap('<div class="expbox" style="display: flex;"></div>');

    w = ($("body").width() - new_item.width()) / 2 - 40;
    h = new_item.height() - 4.5;

    ff_div = new_item.after(`<div class='expbox-item'>
<textarea style='width: ${w}px; height: ${h}px;'>
团号: ${dd.th}\n导游信息: ${dd.du}\n原订: \n现麻烦变更为:\n\t${fj_text.join("\n\t")}\n确认变更回复，谢谢
</textarea></div>`);

    fb_div = new_item.before(`<div class='expbox-item'>
<textarea style='width: ${w}px; height: ${h}px;'>
用房信息:\n\t${fj_text.join("\n\t")}\n麻烦收到确认回复,谢谢
</textarea></div>`);
    });

}

function remove_summary() {
  items = $(".regulateItem");
  $.each(items, function (index, item) {

    new_item = $(".expbox", item);
    if (new_item.length > 0 ){
      //$(".tab:eq(1)", item).parent().siblings().addBack().remove();
      $(".tab:eq(1)", item).insertAfter($(".tab:eq(1)", item).parent());
    }
  });
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
    text = `${i.split("-").join("月")}日, 用房: ${ft_text.join(" + ")}`;

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
