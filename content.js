
console.log("hello");

items = $(".regulateItem");

$.each( items, function( index, item ){
    console.log(item);
    console.log($(".tab-blank", item));
});
