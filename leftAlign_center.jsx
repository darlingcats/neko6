var sel = app.selection[0];
var col = sel.columns;
sel.leftInset = sel.rightInset = 0;
for (var i = 0, iL = col.length; i < iL; i++) {
  var cel = col[i].cells;
  var colW = col[i].width;
  var cr = [];
  for (var j = 1, jL = cel.length; j < jL; j++) {
    var os_start = cel[j].lines[0].insertionPoints[0].horizontalOffset;
    var os_end = cel[j].lines[0].insertionPoints[-1].horizontalOffset;
    cr.push((colW - (os_end - os_start)) / 2);
    cel[j].paragraphs[0].justification = Justification.leftAlign;
  }
  col[i].textLeftInset = Math.round(cr.sort(function(a, b) {return a - b;})[0] * 100) / 100;
  cel[0].textLeftInset = cel[0].textRightInset = 1;
}
