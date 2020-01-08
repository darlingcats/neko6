var sel = app.activeWindow.activeLayer;
var lab = "selec"; //データ結合元の削除予定のフレームにスクリプトラベル当てておく。
//var sel = app.selection;
//alert(sel);
var n = 0;
//alert("列数は"+n+"です");
var widths = [];
for (x = 0; x < sel.textFrames.length; x++) {
  for (y = 0; y < sel.textFrames[x].tables.length; y++) {
    if (sel.textFrames[x].tables[y].columns.length > 0) {
      if (sel.textFrames[x].tables[y].label == lab) {
        app.selection = sel.textFrames[x].tables[y];
        for (z = 0; z < sel.textFrames[x].tables[y].cells.length; z++) {
            var resul = sel.textFrames[x].tables[y].cells[z].contents;
            if(resul.search('あたりの価格') != -1){
                widths[z] = "12mm";
            }
            if(resul.search(/\rケース/) != -1){
                widths[z] = "8mm";
            }
            //alert(sel.textFrames[x].tables[y].cells[z].contents);
          main(sel.textFrames[x].tables[y].cells[z], 2);
        }
        n = sel.textFrames[x].tables[y].columnCount - 1;
        widths[0] = "15mm";
        //widths[n-2] = "11mm";
        //widths[n-1] = "12mm";
        //widths[n] = "21mm";
        autoWid(widths);
      }
    }
  }
}
//var widths = {
//        0: "15mm",
//        3: "10mm",
//     };

function autoWid(widths) {
  if (!app.documents.length || !app.selection.length) {
    alert("ドキュメントを開き、表かセルを選択してから実行してください");
    return;
  }
  var doc = app.activeDocument;
  var sel = doc.selection[0];

  if (sel.constructor.name !== "Table" && sel.constructor.name !== "Cell") {
    alert("表かセルを選択してください");
    return;
  }

  if (sel.constructor.name === "Cell") {
    sel = sel.parent;
  }
  app
    .doScript(function () {
      var C = sel.columns;
      var txfWidth = (function () {
        var g = sel.parent.geometricBounds;
        return g[3] - g[1];
      })();
      var fillCells = {
        ary: Array(C.length),
        sum: 0
      };
      for (k in widths) {
        var kNum = parseInt(k, 10);
        try {
          if (isNaN(kNum) || kNum > C.length - 1) {
            throw new RangeError("widthsオブジェクトのキーが対象外の列を指定しています");
          }
        } catch (e) {
          alert(e);
          return;
        }
        if (widths[k] && widths[k] !== "fill") {
          C[k].width = widths[k];
          txfWidth -= C[k].width;
        } else if (widths[k] === "fill") {
          fillCells.ary[k] = true;
          fillCells.sum++;
        } else {
          txfWidth -= C[k].width;
        }
      }
      var fillWidth = txfWidth / fillCells.sum;
      for (var i = 0; i < C.length; i++) {
        if (fillCells.ary[i]) {
          C[i].width = fillWidth;
        }
      }
      //alert("終了しました");
    }, ScriptLanguage.JAVASCRIPT, null, UndoModes.ENTIRE_SCRIPT);
}
function main(sel, margin) {
  var col = sel.columns;
  for (var i = 0, iL = col.length; i < iL; i++) {
    var cel = col[i].cells;
    var ar = [];
    for (var j = 0, jL = cel.length; j < jL; j++) {
      // if cell has no content
      if (cel[j].texts[0].contents === "") {
        continue
      };
      // if cell overflows
      if (cel[j].overflows) {
        while (cel[j].overflows) {
          cel[j].width += 1;
          if (cel[j].properties['lines'] !== undefined) {
            break;
          };
        }
      };
      var os_start = cel[j].lines[0].insertionPoints[0].horizontalOffset;
      var os_end = cel[j].lines[0].insertionPoints[-1].horizontalOffset;
      ar.push(os_end - os_start);
    };
    col[i].rightInset = col[i].leftInset = margin * 0.25;
    var padding = col[i].rightInset + col[i].leftInset;
    col[i].width = Math.round(ar.sort(function (a, b) {
      return b > a
    })[0] + padding + 0.75);
  };
}
