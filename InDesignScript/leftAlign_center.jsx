Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  function cellWidth(cel) {
    var points = cel.lines[0].insertionPoints;
    return points[-1].horizontalOffset - points[0].horizontalOffset;
  }
  var sel = app.selection[0];
  var cols = sel.columns; // ★colsが複数形って名前でわかるようにしておきたい
  sel.leftInset = sel.rightInset = 0;

  var i, iL, j, jL, cels, colWidth, minCellInset;
  for (i = 0, iL = cols.length; i < iL; i++) {
    cels = cols[i].cells;
    colWidth = cols[i].width;
    minCellInset = Infinity; // ★Infinityは大きな値を示す組込の変数
    for (j = 1, jL = cels.length; j < jL; j++) {
      minCellInset = Math.min(minCellInset, colWidth - cellWidth(cels[j]));
      cels[j].paragraphs[0].justification = Justification.leftAlign;
    }
    cols[i].textLeftInset = Math.round((minCellInset / 2) * 100) / 100;
    cels[0].textLeftInset = cels[0].textRightInset = 1; //ヘッダー
  }
}
