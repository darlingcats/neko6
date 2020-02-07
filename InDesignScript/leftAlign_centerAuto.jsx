//@include 'polyfill.js';
Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  function cellWidth(cel) {
    var points = cel.lines[0].insertionPoints;
    return points[-1].horizontalOffset - points[0].horizontalOffset;
  }
  var doc = app.activeDocument;
  var lab = "selec"; //商品詳細表スクリプトラベル

  try {
    if (app.selection[0].constructor.name == "Cell") {
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
  } catch (e) {
    leftCenter();
  }

  function leftCenter() {
    var txtF, x, xL, tabs, y, yL, cols, rwsL, i, iL, j, jL, cels, colWidth, minCellInset, arr;
    txtF = doc.textFrames;
    for (x = 0, xL = txtF.length; x < xL; x++) {
      tabs = txtF[x].tables;
      for (y = 0, yL = tabs.length; y < yL; y++) {
        if (tabs[y].label == lab) {
          cols = tabs[y].columns;
          rwsL = tabs[y].rows.length;
          if (rwsL > 2) {
            for (i = 1, iL = cols.length; i < iL; i++) {
              cels = cols[i].cells;
              colWidth = cols[i].width;
              arr = [];
              if (cels[1].contents.length > 5) {
                minCellInset = Infinity; // ★Infinityは大きな値を示す組込の変数
                for (j = 1, jL = cels.length; j < jL; j++) {
                  var v = cels[j].characters.itemByRange(0, 5).contents;
                  arr.push(v);
                  minCellInset = Math.min(minCellInset, colWidth - cellWidth(cels[j]));
                }
                function uniform(arr, identity) {
                  identity =
                    identity ||
                    function(a, b) {
                      return a === b;
                    };
                  if (!arr) {
                    throw new TypeError("`itmes` は配列で指定してね！");
                  }
                  if (!arr.length) {
                    return true;
                  }
                  var theValue = arr[0];
                  return arr.slice(1).reduce(function(acc, item) {
                    return acc && identity(theValue, item);
                  }, true);
                }
                if (
                  uniform(arr, function(a, b) {
                    return a.toString() === b.toString();
                  })
                ) {
                  for (var k = 1; k < cels.length; k++) {
                    cels[k].paragraphs[0].justification = Justification.leftAlign;
                    cels[k].leftInset = cels[k].rightInset = 0;
                    cels[k].textLeftInset = Math.round((minCellInset / 2) * 100) / 100;
                  }
                  //cels[0].textLeftInset = cels[0].textRightInset = 1; //ヘッダー
                }
              }
            }
          }
        }
      }
    }
  }
}
