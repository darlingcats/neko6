<script>
function addFigure(str) {
  var num = new String(str).replace(/,/g, "");
  while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
  return num;
}

var target = document.getElementById('recommender_pc111');
function comma_price(){
    $('#recommender_pc111 .dv_rc_price').each(function(){
        $(this).html(addFigure($(this).html()));
    });
}
var mo = new MutationObserver(comma_price);
mo.observe(target, {childList: true});
</script>
