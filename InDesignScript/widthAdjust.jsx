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

    var widths, x, xL, tabs, y, yL, myTable, cols, w, v, myCellName, myCellNamePre, myCell, myCellPre, resul, resulPre;
    for (x = 0, xL = doc.textFrames.length; x < xL; x++) {
      widths = [];
      tabs = doc.textFrames[x].tables;
      for (y = 0, yL = tabs.length; y < yL; y++) {
        if (tabs[y].columns.length > 0) {
          if (tabs[y].label == lab) {
            myTable = app.selection = tabs[y];
            if (myTable.constructor.name == "Table") {
              cols = myTable.columns;
              for (w = 0, wL = cols.length; w < wL; w++) {
                for (v = 0, vL = myTable.rows.length; v < vL; v++) {
                  myCellName = w + ":" + v; //対象セル座標
                  myCellNamePre = w - 1 + ":" + v; //対象セル座標 - 1列
                  myCell = myTable.cells.itemByName(myCellName); //対象セル名
                  myCellPre = myTable.cells.itemByName(myCellNamePre); //対象セル - 1列名
                  resul = myCell.contents;
                  resulPre = myCellPre.contents;
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
              widthAdj(0.25, 0.75, true, true);
              n = myTable.columnCount - 1; //列幅を固定する列が決まっている場合
              widths[0] = "15mm";
              //widths[n] = "21mm";
              fixWid();
            }
          }
          if (tabs[y].label == lab2) {
            myTable = app.selection = tabs[y];
            cols = myTable.columns;
            widthAdj(0.5, 1, true, false);
          }
        }
      }
    }

    //固定列幅
    function fixWid() {
      var txfWidth = (function() {
        var g = myTable.parent.geometricBounds;
        return g[3] - g[1];
      })();
      var fillCells = {
        ary: Array(cols.length),
        sum: 0
      };
      for (k in widths) {
        var kNum = parseInt(k, 10);
        try {
          if (isNaN(kNum) || kNum > cols.length - 1) {
            throw new RangeError("widthsオブジェクトのキーが対象外の列を指定しています");
          }
        } catch (e) {
          alert(e);
          return;
        }
        if (widths[k] && widths[k] !== "fill") {
          cols[k].width = widths[k];
          txfWidth -= cols[k].width;
        } else if (widths[k] === "fill") {
          fillCells.ary[k] = true;
          fillCells.sum++;
        } else {
          txfWidth -= cols[k].width;
        }
      }
      var fillWidth = txfWidth / fillCells.sum;
      for (var i = 0; i < cols.length; i++) {
        if (fillCells.ary[i]) {
          cols[i].width = fillWidth;
        }
      }
    }

    //商品詳細表列幅
    function widthAdj(inset, padd, insertRIghtInset, insertLeftInset) {
      for (var i = 0, iL = cols.length; i < iL; i++) {
        var cels = cols[i].cells;
        var ar = [];
        for (var j = 0, jL = cels.length; j < jL; j++) {
          // if cell has no content
          if (cels[j].texts[0].contents === "") {
            continue;
          }
          // if cell overflows
          if (cels[j].overflows) {
            while (cels[j].overflows) {
              cels[j].width += 1;
              if (cels[j].width > 100) {
                alert("内容に改行が入っている可能性があります");
                return;
              }
              if (cel[j].properties["lines"] !== undefined) {
                break;
              }
            }
          }
          var os_start = cels[j].lines[0].insertionPoints[0].horizontalOffset;
          var os_end = cels[j].lines[0].insertionPoints[-1].horizontalOffset;
          ar.push(os_end - os_start);
        }
        if (insertRIghtInset) {
          cols[i].rightInset = 2 * inset;
        }
        if (insertLeftInset) {
          cols[i].leftInset = 2 * inset;
        }
        var padding = cols[i].rightInset + cols[i].leftInset;
        try {
          cols[i].width = Math.round(
            ar.sort(function(a, b) {
              return b > a;
            })[0] +
              padding +
              padd
          );
        } catch (e) {
          alert(e);
          return;
        }
      }
    }

    const endTime = Date.now(); // 終了時間

    alert(endTime - startTime); // 何ミリ秒かかったかを表示する

    alert("処理が完了しました", "処理終了", true);
  } else if (rtType == 2) {
    alert("キャンセルされました。", "処理終了", true);
  }
}
