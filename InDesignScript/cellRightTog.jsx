//右セルの結合数に合わせてセルを連結

//@include 'polyfill.js';
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
  y2 = 350;

  //　ダイアログ作成
  var objDlg = new Window("dialog", "右セルの結合数に合わせてセルを連結", [x1, y1, x2, y2]);

  //　ラジオボタン
  var objBtn01 = objDlg.add("radiobutton", [20, 25, 315, 45], "縦セル結合");
  var objBtn02 = objDlg.add("radiobutton", [20, 50, 315, 75], "横セル結合");
  //　ボタン1をオンにする
  objBtn01.value = true;

  //　グループ最大結合数
  //  var objGrp01= objDlg.add("group", [20, 85, 300, 85 + 60]);
  //　テキストを追加
  //  var objStText01 = objGrp01.add("statictext", [0, 0, 260, 15], "最大結合数");
  //　テキストボックスを追加
  //  var objTxtbox01 = objGrp01.add("edittext", [0, 20, 100, 45], "");

  //　グループ結合する文字列
  var objGrp02 = objDlg.add("group", [20, 85, 300, 155 + 60]);
  //　テキストを追加
  var objStText04 = objGrp02.add("statictext", [0, 0, 260, 15], "結合する文字列");
  //　テキストボックスを追加
  var objTxtbox04 = objGrp02.add("edittext", [0, 20, 260, 45], "");

  //　グループ結合しない文字列
  var objGrp03 = objDlg.add("group", [20, 155, 300, 230 + 230]);
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
    alert(
      "右セルの結合数に合わせてセルを結合します" +
        "\r\n\r\n" +
        "縦結合 ： " +
        objBtn01.value +
        "\r\n" +
        "横結合 ： " +
        objBtn02.value +
        "\r\n" +
        //    "最大結合数 ： " + objTxtbox01.text + "\r\n" +
        "結合する文字列 ： " +
        objTxtbox04.text +
        "\r\n" +
        "結合しない文字列1 ： " +
        objTxtbox02.text +
        "\r\n" +
        "結合しない文字列2 ： " +
        objTxtbox03.text +
        "\r\n" +
        "\r\n" +
        "※「結合する文字列」が優先されます",
      "処理終了"
    );

    //    const startTime = Date.now(); // 開始時間

    var x, xL, y, yL, myTable, w, wL, v, vL, myCellName, myCellNameL, myCellNameR, myCellNameU, myCellNameD, myCellNameUR, myCell, myCellL, myCellR, myCellU, myCellD, myCellUR, resul, resulL, resulU, resulD, rRS, myCellNameDZ, myCellDZ, DD, myCellNameDD, myCellDD, arr;
    for (x = 0, xL = doc.textFrames.length; x < xL; x++) {
      for (y = 0, yL = doc.textFrames[x].tables.length; y < yL; y++) {
        if (doc.textFrames[x].tables[y].columns.length > 0) {
          if (doc.textFrames[x].tables[y].label == lab) {
            myTable = app.selection = doc.textFrames[x].tables[y];
            if (myTable.constructor.name == "Table") {
              for (w = 0, wL = myTable.columns.length - 1; w < wL; w++) {
                for (v = 0, vL = myTable.rows.length - 1; v < vL; v++) {
                  myCellName = w + ":" + v; //対象セル座標
                  myCellNameL = w - 1 + ":" + v; //対象セル座標 - 1列
                  myCellNameR = w + 1 + ":" + v; //対象セル座標 - 1列
                  myCellNameU = w + ":" + (v - 1); //対象セル座標 - 1行
                  myCellNameD = w + ":" + (v + 1); //対象セル座標 - 1行
                  myCellNameUR = w + 1 + ":" + (v - 1); //対象セル座標の右上
                  myCell = myTable.cells.itemByName(myCellName); //対象セル名
                  myCellL = myTable.cells.itemByName(myCellNameL);
                  myCellR = myTable.cells.itemByName(myCellNameR);
                  myCellU = myTable.cells.itemByName(myCellNameU);
                  myCellD = myTable.cells.itemByName(myCellNameD);
                  myCellUR = myTable.cells.itemByName(myCellNameUR);
                  resul = myCell.contents;
                  resulL = myCellL.contents;
                  resulU = myCellU.contents;
                  resulD = myCellD.contents;

                  //縦結合
                  if (objBtn01.value == true) {
                    if (myCell.rowSpan < 2) {
                      if (myCellR != myCellUR) {
                        //右セルと右上セルの座標が違ったら（結合セルの頭）
                        rRS = myCellR.rowSpan;
                        if (myCell.rowSpan < rRS) {
                          //右のセルより結合数が少なかったら
                          myCellNameDZ = w + ":" + (v + (rRS - 1));
                          myCellDZ = myTable.cells.itemByName(myCellNameDZ);
                          arr = [];
                          for (DD = 0; DD < rRS; DD++) {
                            //配列に入れる
                            myCellNameDD = w + ":" + (v + DD);
                            myCellDD = myTable.cells.itemByName(myCellNameDD);
                            arr.push(myCellDD.contents);
                          }
                          function uniform(arr, identity) {
                            //配列の中が全部同じか
                            identity =
                              identity ||
                              function(a, b) {
                                return a === b;
                              };
                            if (!arr) {
                              throw new TypeError("`arr` は配列で指定してね！");
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
                              for (DD = 1; DD < rRS; DD++) {
                                //結合する内容を1行にする
                                myCellNameDD = w + ":" + (v + DD);
                                myCellDD = myTable.cells.itemByName(myCellNameDD);
                                myCellDD.texts[0].remove();
                              }
                              myCell.merge(myCellDZ);
                            } else if (resul.search(objTxtbox04.text) != -1) {
                              for (DD = 1; DD < rRS; DD++) {
                                //結合する内容を1行にする
                                myCellNameDD = w + ":" + (v + DD);
                                myCellDD = myTable.cells.itemByName(myCellNameDD);
                                myCellDD.texts[0].remove();
                              }
                              myCell.merge(myCellDZ);
                            }
                          }
                        }
                      }
                    }
                  }

                  //横結合（とりあえず今は無視）
                  if (objBtn02.value == true) {
                    if (myCell.columnSpan < 2) {
                      if (resul == resulL) {
                        if (objTxtbox01.text != "") {
                          if (myCellL.columnSpan > objTxtbox01.text - 1) {
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
                          myCell.merge(myCellU);
                        } else if (resul.search(objTxtbox04.text) != -1) {
                          myCell.texts[0].remove();
                          myCell.merge(myCellU);
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
