Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  var doc = app.activeDocument;
  var lab = "productTable"; //商品詳細表スクリプトラベル
  var x1, y1, x2, y2;
  x1 = 0;
  y1 = 0;
  x2 = 300;
  y2 = 400;

  //　ダイアログ作成
  var objDlg = new Window("dialog", "同じ内容のセルを連結", [x1, y1, x2, y2]);

  //　ラジオボタン
  var objBtn01 = objDlg.add("radiobutton", [20, 25, 315, 45], "縦セル結合");
  var objBtn02 = objDlg.add("radiobutton", [20, 50, 315, 75], "横セル結合");
  //　ボタン1をオンにする
  objBtn01.value = true;

  //　グループ最大結合数
  var objGrp01= objDlg.add("group", [20, 85, 300, 85 + 60]);
  //　テキストを追加
  var objStText01 = objGrp01.add("statictext", [0, 0, 260, 15], "最大結合数");
  //　テキストボックスを追加
  var objTxtbox01 = objGrp01.add("edittext", [0, 20, 100, 45], "");

  //　グループ結合する文字列
  var objGrp02= objDlg.add("group", [20, 155, 300, 155 + 60]);
  //　テキストを追加
  var objStText04 = objGrp02.add("statictext", [0, 0, 260, 15], "結合する文字列");
  //　テキストボックスを追加
  var objTxtbox04 = objGrp02.add("edittext", [0, 20, 260, 45], "");

  //　グループ結合しない文字列
  var objGrp03= objDlg.add("group", [20, 230, 300, 230 + 230]);
  //　テキストを追加
  var objStText02 = objGrp03.add("statictext", [0, 0, 260, 15], "結合しない文字列①");
  //　テキストボックスを追加
  var objTxtbox02 = objGrp03.add("edittext", [0, 20, 260, 45], "");
  //　テキストを追加
  var objStText03 = objGrp03.add("statictext", [0, 55, 260, 70], "結合しない文字列②");
  //　テキストボックスを追加
  var objTxtbox03 = objGrp03.add("edittext", [0, 75, 260, 100], "");


  //ボタン
  objDlg.add("button", [x2 - 145, y2 - 40, x2 - 95, y2 - 15], "実行", { name: "ok" });
  objDlg.add("button", [x2 - 90, y2 - 40, x2 - 10, y2 - 15], "キャンセル", { name: "cancel" });
  //　ダイアログ表示
  objDlg.center();
  var rtType = objDlg.show();
  //　ダイアログボックスの戻り値から条件分岐して、値を表示

  if (rtType == 1) {
    alert("セルを結合します" + "\r\n\r\n" + 
    "縦結合 ： " + objBtn01.value + "\r\n" + 
    "横結合 ： " + objBtn02.value + "\r\n" + 
    "最大結合数 ： " + objTxtbox01.text + "\r\n" + 
    "結合する文字列 ： " + objTxtbox04.text + "\r\n" + 
    "結合しない文字列1 ： " + objTxtbox02.text + "\r\n" + 
    "結合しない文字列2 ： " + objTxtbox03.text + "\r\n" + "\r\n" +
    "※「結合する文字列」が優先されます", "処理終了");

    //    const startTime = Date.now(); // 開始時間

    var x, xL, y, yL, myTable, w, wL, v, vL, myCellName, myCellNamePreW, myCellNamePreV, myCell, myCellPreW, myCellPreV, resul, resulPreW, resulPreV;
    for (x = 0, xL = doc.textFrames.length; x < xL; x++) {
      for (y = 0, yL = doc.textFrames[x].tables.length; y < yL; y++) {
        if (doc.textFrames[x].tables[y].columns.length > 0) {
          if (doc.textFrames[x].tables[y].label == lab) {
            myTable = app.selection = doc.textFrames[x].tables[y];
            if (myTable.constructor.name == "Table") {
              for (w = 0, wL = myTable.columns.length; w < wL; w++) {
                for (v = 0, vL = myTable.rows.length; v < vL; v++) {
                  myCellName = w + ":" + v; //対象セル座標
                  myCellNamePreW = w - 1 + ":" + v; //対象セル座標 - 1列
                  myCellNamePreV = w + ":" + (v - 1); //対象セル座標 - 1行
                  myCell = myTable.cells.itemByName(myCellName); //対象セル名
                  myCellPreW = myTable.cells.itemByName(myCellNamePreW);
                  myCellPreV = myTable.cells.itemByName(myCellNamePreV);
                  resul = myCell.contents;
                  resulPreW = myCellPreW.contents;
                  resulPreV = myCellPreV.contents;

                  if (objBtn01.value == true) {
                    if (myCell.rowSpan < 2) {
                      if (resul == resulPreV) {
                        if (objTxtbox01.text != "") {
                          if (myCellPreV.rowSpan > objTxtbox01.text - 1) {
                            continue;
                          }
                        }
                        if (objTxtbox04.text == "") {
                          if (objTxtbox02.text != "") {
                            if (resul.search(objTxtbox02.text) != -1) {
                              continue;
                            }
                          }
                          if (objTxtbox03.text != "") {
                            if (resul.search(objTxtbox03.text) != -1) {
                              continue;
                            }
                          }
                          myCell.texts[0].remove();
                          myCell.merge(myCellPreV);
                        } else if (resul.search(objTxtbox04.text) != -1) {
                          myCell.texts[0].remove();
                          myCell.merge(myCellPreV);
                        }
                      }
                    }
                  }
                  if (objBtn02.value == true) {
                    if (myCell.columnSpan < 2) {
                      if (resul == resulPreW) {
                        if (objTxtbox01.text != "") {
                          if (myCellPreW.columnSpan > objTxtbox01.text - 1) {
                            continue;
                          }
                        }
                        if (objTxtbox04.text == "") {
                          if (objTxtbox02.text != "") {
                            if (resul.search(objTxtbox02.text) != -1) {
                              continue;
                            }
                          }
                          if (objTxtbox03.text != "") {
                            if (resul.search(objTxtbox03.text) != -1) {
                              continue;
                            }
                          }
                          myCell.texts[0].remove();
                          myCell.merge(myCellPreV);
                        } else if (resul.search(objTxtbox04.text) != -1) {
                          myCell.texts[0].remove();
                          myCell.merge(myCellPreV);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    //    const endTime = Date.now(); // 終了時間

    //    alert(endTime - startTime); // 何ミリ秒かかったかを表示する

    alert("処理が完了しました", "処理終了", true);
  } else if (rtType == 2) {
    alert("キャンセルされました。", "処理終了", true);
  }
}
