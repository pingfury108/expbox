import $ from 'jquery';

function getTableHead() {
  var talbeHead = [];
  $('table thead tr').each(function () {
    $(this)
      .find('th')
      .each(function () {
        talbeHead.push($(this).text());
      });
  });
  return talbeHead;
}

function getTableRowData() {
  var tableData = [];
  $('table tbody').each(function () {
    $(this)
      .find('tr')
      .each(function () {
        var rowData = [];
        $(this)
          .find('td')
          .each(function () {
            rowData.push($(this).text());
          });
        tableData.push(rowData);
      });
  });
  return tableData;
}

function parseOperationLogs(){

    var tableHead = getTableHead();
    var tableRowData = getTableRowData();

    var rows = [];
    for (var i in tableRowData) {
        var row = {};
        for (var r in tableRowData[i]){
            row[tableHead[r]] = $.trim(tableRowData[i][r]);
        }
        rows.push(row);
    }

    parseOperationDetail(rows);

    return rows;
}

function parseOperationDetail(rows){
    for (var i in rows){
        var row = rows[i];
        var text = row["操作"].split(" ").filter((w)=> w != "");

        //row.text = text;
        row.type = text[0].replace(/\r?\n|\r/g,"");
        row.describe = text[1].replace(/\r?\n|\r/g,"");
        row.hotel = function(){
            const regx = /酒店名称：(.*?)，/;
            const name = text[2].match(regx);

            if (name) {
                return name[1];
            }else {
                return "";
            }
        }();
    }
}

console.log(parseOperationLogs());
