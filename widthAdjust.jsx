Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  var doc = app.activeDocument;
  var lab = "selec"; //商品詳細表スクリプトラベル
  var lab2 = "makerName"; //メーカー名、商品名スクリプトラベル

  //　ダイアログ作成
  var objDlg = new Window("dialog", "検索文字列で列幅変更", [0, 0, 350, 220]);
  //　テキストを追加
  var objStText01 = objDlg.add("statictext", [20, 25, 350, 45], "検索する文字列");
  var objStText02 = objDlg.add("statictext", [20, 95, 350, 115], "列幅の数値");
  //　テキストボックスを追加
  var objTxtbox01 = objDlg.add("edittext", [20, 50, 315, 75], "");
  var objTxtbox02 = objDlg.add("edittext", [20, 120, 315, 145], "");
  //ボタン
  objDlg.add("button", [340 - 145, 220 - 40, 340 - 95, 220 - 15], "実行", { name: "ok" });
  objDlg.add("button", [340 - 90, 220 - 40, 340 - 10, 220 - 15], "キャンセル", { name: "cancel" });
  //　ダイアログ表示
  objDlg.center();
  var rtType = objDlg.show();
  //　ダイアログボックスの戻り値から条件分岐して、値を表示

  var searchLabel01 = "あたりの価格"; //固定列幅用キーワード01
  var searchLabel01val = "12mm"; //固定列用列幅01
  var searchLabel02 = /入数\/\r/; //固定列幅用キーワード02
  var searchLabel02val = "8mm"; //固定列用列幅02

  if (rtType == 1) {
    alert("検索した文字列の列幅を変更します" + "\r\n\r\n" + "検索する文字列 ： " + objTxtbox01.text + "\r\n" + "列幅 ： " + objTxtbox02.text, "処理終了");

    const startTime = Date.now(); // 開始時間

    for (x = 0; x < doc.textFrames.length; x++) {
      var widths = [];
      for (y = 0; y < doc.textFrames[x].tables.length; y++) {
        if (doc.textFrames[x].tables[y].columns.length > 0) {
          if (doc.textFrames[x].tables[y].label == lab) {
            var myTable = (app.selection = doc.textFrames[x].tables[y]);
            if (myTable.constructor.name == "Table") {
              for (w = 0; w < myTable.columns.length; w++) {
                for (v = 0; v < myTable.rows.length; v++) {
                  var myCellName = w + ":" + v; //対象セル座標
                  var myCellNamePre = w - 1 + ":" + v; //対象セル座標 - 1列
                  var myCell = myTable.cells.itemByName(myCellName); //対象セル名
                  var myCellPre = myTable.cells.itemByName(myCellNamePre); //対象セル - 1列名
                  var resul = myCell.contents;
                  var resulPre = myCellPre.contents;
                  if (resul.search(searchLabel01) != -1) {
                    if (resul != resulPre) {
                      //横結合セルだった場合（左隣の内容と同じだったら無視）
                      widths[w] = searchLabel01val;
                    }
                  }
                  if (resul.search(searchLabel02) != -1) {
                    if (resul != resulPre) {
                      //横結合セルだった場合（左隣の内容と同じだったら無視）
                      widths[w] = searchLabel02val;
                    }
                  }

                  if (objTxtbox01.text == "") {
                    //空欄だった場合
                    continue;
                  }
                  if (resul.search(objTxtbox01.text) != -1) {
                    if (resul != resulPre) {
                      //横結合セルだった場合（左隣の内容と同じだったら無視）
                      widths[w] = objTxtbox02.text;
                    }
                  }
                }
              }
              for (z = 0; z < myTable.cells.length; z++) {
                main(myTable.cells[z], 2);
              }
              n = doc.textFrames[x].tables[y].columnCount - 1; //列幅を固定する列が決まっている場合
              widths[0] = "15mm";
              //widths[n] = "21mm";
              fixWid(widths);
            }
          }
          if (doc.textFrames[x].tables[y].label == lab2) {
            var myTable = (app.selection = doc.textFrames[x].tables[y]);
            for (z = 0; z < myTable.cells.length; z++) {
              main2(myTable.cells[z], 2);
            }
          }
        }
      }
    }

    //固定列幅
    function fixWid(widths) {
      var sel = doc.selection[0];
      if (sel.constructor.name === "Cell") {
        sel = sel.parent;
      }
      var C = sel.columns;
      var txfWidth = (function() {
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
    }

    //商品詳細表列幅
    function main(doc, margin) {
      var col = doc.columns;
      for (var i = 0, iL = col.length; i < iL; i++) {
        var cel = col[i].cells;
        var ar = [];
        for (var j = 0, jL = cel.length; j < jL; j++) {
          // if cell has no content
          if (cel[j].texts[0].contents === "") {
            continue;
          }
          // if cell overflows
          if (cel[j].overflows) {
            while (cel[j].overflows) {
              cel[j].width += 1;
              if (cel[j].properties["lines"] !== undefined) {
                break;
              }
            }
          }
          var os_start = cel[j].lines[0].insertionPoints[0].horizontalOffset;
          var os_end = cel[j].lines[0].insertionPoints[-1].horizontalOffset;
          ar.push(os_end - os_start);
        }
        col[i].rightInset = col[i].leftInset = margin * 0.25;
        var padding = col[i].rightInset + col[i].leftInset;
        col[i].width = Math.round(
          ar.sort(function(a, b) {
            return b > a;
          })[0] +
            padding +
            0.75
        );
      }
    }

    //メーカー名、商品名列幅
    function main2(doc, margin) {
      var col = doc.columns;
      for (var i = 0, iL = col.length; i < iL; i++) {
        var cel = col[i].cells;
        var ar = [];
        for (var j = 0, jL = cel.length; j < jL; j++) {
          // if cell has no content
          if (cel[j].texts[0].contents === "") {
            continue;
          }
          // if cell overflows
          if (cel[j].overflows) {
            while (cel[j].overflows) {
              cel[j].width += 1;
              if (cel[j].properties["lines"] !== undefined) {
                break;
              }
            }
          }
          var os_start = cel[j].lines[0].insertionPoints[0].horizontalOffset;
          var os_end = cel[j].lines[0].insertionPoints[-1].horizontalOffset;
          ar.push(os_end - os_start);
        }
        col[i].rightInset = margin * 0.5;
        var padding = col[i].rightInset;
        col[i].width = Math.round(
          ar.sort(function(a, b) {
            return b > a;
          })[0] +
            padding +
            1
        );
      }
    }

    const endTime = Date.now(); // 終了時間

    alert(endTime - startTime); // 何ミリ秒かかったかを表示する

    alert("処理が完了しました");
  } else if (rtType == 2) {
    alert("キャンセルされました。", "処理終了", true);
  }
}
