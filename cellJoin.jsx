Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  var sel = app.activeDocument;
  var lab = "selec"; //商品詳細表スクリプトラベル

  //　ダイアログ作成
  var objDlg = new Window("dialog", "同じ内容のセルを連結", [0, 0, 350, 120]);
  //　ラジオボタン
  var objBtn01 = objDlg.add("radiobutton", [20, 25, 315, 45], "縦セル連結");
  var objBtn02 = objDlg.add("radiobutton", [20, 50, 315, 75], "横セル連結");
  //　ボタン1をオンにする
  objBtn01.value = true;
  //ボタン
  objDlg.add("button", [340 - 145, 120 - 40, 340 - 95, 120 - 15], "実行", { name: "ok" });
  objDlg.add("button", [340 - 90, 120 - 40, 340 - 10, 120 - 15], "キャンセル", { name: "cancel" });
  //　ダイアログ表示
  objDlg.center();
  var rtType = objDlg.show();
  //　ダイアログボックスの戻り値から条件分岐して、値を表示

  if (rtType == 1) {
//    alert("セルを結合します" + "\r\n\r\n" +
//    "縦結合 ： " + objBtn01.value + "\r\n" +
//    "横結合 ： " + objBtn02.value, "処理終了");

//    const startTime = Date.now(); // 開始時間

    for (x = 0; x < sel.textFrames.length; x++) {
      for (y = 0; y < sel.textFrames[x].tables.length; y++) {
        if (sel.textFrames[x].tables[y].columns.length > 0) {
          if (sel.textFrames[x].tables[y].label == lab) {
            var myTable = (app.selection = sel.textFrames[x].tables[y]);
            if (myTable.constructor.name == "Table") {
              for (w = 0; w < myTable.columns.length; w++) {
                for (v = 0; v < myTable.rows.length; v++) {
                  var myCellName = w + ":" + v; //対象セル座標
                  var myCellNamePreW = (w - 1) + ":" + v; //対象セル座標 - 1列
                  var myCellNamePreV = w + ":" + (v - 1); //対象セル座標 - 1行
                  var myCell = myTable.cells.itemByName(myCellName); //対象セル名
                  var myCellPreW = myTable.cells.itemByName(myCellNamePreW);
                  var myCellPreV = myTable.cells.itemByName(myCellNamePreV);
                  var resul = myCell.contents;
                  var resulPreW = myCellPreW.contents;
                  var resulPreV = myCellPreV.contents;

                  if (objBtn01.value == true) {
                    if (myCell.rowSpan > 1) {
                    } else if (resul == resulPreV) {
                      myCell.texts[0].remove();
                      myCell.merge(myCellPreV);
                    }
                  }
                  if (objBtn02.value == true) {
                    if (myCell.columnSpan > 1) {
                    } else if (resul == resulPreW) {
                      myCell.texts[0].remove();
                      myCell.merge(myCellPreW);
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

    alert("処理が完了しました");
  } else if (rtType == 2) {
    alert("キャンセルされました。", "処理終了", true);
  }
}
