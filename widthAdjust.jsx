var sel = app.activeDocument;
var lab = "selec"; //商品詳細表スクリプトラベル
var lab2 = "makerName"; //メーカー名、商品名スクリプトラベル
var n = 0;

//　ダイアログ作成
var objDlg = new Window("dialog", "検索文字列で列幅変更", [0, 0, 350, 220]);
//　テキストを追加
var objStText01 = objDlg.add("statictext", [20, 25, 350, 45], "検索する文字列");
var objStText02 = objDlg.add("statictext", [20, 95, 350, 115], "列幅の数値");
//　テキストボックスを追加
var objTxtbox01 = objDlg.add("edittext", [20, 50, 315, 75], "");
var objTxtbox02 = objDlg.add("edittext", [20, 120, 315, 145], "");
//ボタン
objDlg.add("button", [340 - 145, 220 - 40, 340 - 95, 220 - 15], "実行", {name: "ok"});
objDlg.add("button", [340 - 90, 220 - 40, 340 - 10, 220 - 15], "キャンセル", {name: "cancel"});
//　ダイアログ表示
objDlg.center();
var rtType = objDlg.show();
//　ダイアログボックスの戻り値から条件分岐して、値を表示

var searchLabel01 = 'あたりの価格'; //あたりの価格
var searchLabel01val = '12mm';
var searchLabel02 = /入数\/\r/; //入数+改行
var searchLabel02val = '8mm';

if (rtType == 1) {
  alert("検索した文字列の列幅を変更します" + "\r\n\r\n" +
  "検索する文字列 ： " + objTxtbox01.text + "\r\n" +
  "列幅 ： " + objTxtbox02.text, "処理終了");

  for (x = 0; x < sel.textFrames.length; x++) {
    var widths = [];
    for (y = 0; y < sel.textFrames[x].tables.length; y++) {
      if (sel.textFrames[x].tables[y].columns.length > 0) {
        if (sel.textFrames[x].tables[y].label == lab) {
          app.selection = sel.textFrames[x].tables[y];
          var R0 = sel.textFrames[x].tables[y].rows[0].cells.length; //ヘッダ1行目
          var R1 = sel.textFrames[x].tables[y].rows[1].cells.length; //ヘッダ2行目
          var R2 = sel.textFrames[x].tables[y].rows[2].cells.length; //データ行のつもり
          for (z = 0; z < sel.textFrames[x].tables[y].cells.length; z++) {
            var resul = sel.textFrames[x].tables[y].cells[z].contents;
            if (resul.search(searchLabel01) != -1) {
              widths[z] = searchLabel01val;
            }
            if (resul.search(searchLabel02) != -1) {
              widths[z] = searchLabel02val;
            }
            main(sel.textFrames[x].tables[y].cells[z], 2);

            if (objTxtbox01.text == "") { //空欄だった場合
              continue;
            }
            if (resul.search(objTxtbox01.text) != -1) {
              if (R0 != R1 && z > R0 - R1) {
                var zz = z - 1;
                widths[zz] = objTxtbox02.text;
              } else {
                widths[z] = objTxtbox02.text;
              }
            }
          }
          n = sel.textFrames[x].tables[y].columnCount - 1;
          widths[0] = "15mm";
          //widths[n] = "21mm";
          autoWid(widths);
        }
      }
    }
  }

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

  //メーカー名、商品名列幅
  var n = 0;
  var widths = [];
  for (x = 0; x < sel.textFrames.length; x++) {
    for (y = 0; y < sel.textFrames[x].tables.length; y++) {
      if (sel.textFrames[x].tables[y].columns.length > 0) {
        if (sel.textFrames[x].tables[y].label == lab2) {
          app.selection = sel.textFrames[x].tables[y];
          for (z = 0; z < sel.textFrames[x].tables[y].cells.length; z++) {
            main2(sel.textFrames[x].tables[y].cells[z], 2);
          }
        }
      }
    }
  }

  function main2(sel, margin) {
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
      col[i].rightInset = margin * 0.5;
      var padding = col[i].rightInset;
      col[i].width = Math.round(ar.sort(function (a, b) {
        return b > a
      })[0] + padding + 1);
    };
  }

  alert("処理が完了しました")
} else if (rtType == 2) {
  alert("キャンセルされました。", "処理終了", true);
}