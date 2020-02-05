Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  var doc = app.activeDocument;

  //　ダイアログ作成
  var objDlg = new Window("dialog", "左上のセル内容を検索してスクリプトラベルを付与", [0, 0, 350, 220]);
  //　テキストを追加
  var objStText01 = objDlg.add("statictext", [20, 25, 350, 45], "一番左上のセル内容");
  var objStText02 = objDlg.add("statictext", [20, 95, 350, 115], "付与スクリプトラベル");
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

  if (rtType == 1) {
    alert("以下の内容でスクリプトラベルを付与します" + "\r\n\r\n" +
    "一番左上のセル内容 ： " + objTxtbox01.text + "\r\n" +
    "付与スクリプトラベル ： " + objTxtbox02.text, "処理終了");

    //const startTime = Date.now(); // 開始時間

    var x, xL, y, yL, myTable, w, wL, v, vL, myCellName, myCell;
    for (x = 0, xL = doc.textFrames.length; x < xL; x++) {
      for (y = 0, yL = doc.textFrames[x].tables.length; y < yL; y++) {
        myTable = (app.selection = doc.textFrames[x].tables[y]);
        if (myTable.constructor.name == "Table") {
          for (w = 0, wL = myTable.columns.length; w < wL; w++) {
            for (v = 0, vL = myTable.rows.length; v < vL; v++) {
              myCellName = w + ":" + v; //対象セル座標
              myCell = myTable.cells.itemByName(myCellName); //対象セル名
              if (myTable.cells.itemByName("0:0").contents.search(objTxtbox01.text) != -1) {
                myTable.label = objTxtbox02.text.toString();
              }
            }
          }
        }
      }
    }

    //const endTime = Date.now(); // 終了時間

    //alert(endTime - startTime); // 何ミリ秒かかったかを表示する

    alert("処理が完了しました");
  } else if (rtType == 2) {
    alert("キャンセルされました。", "処理終了", true);
  }
}
