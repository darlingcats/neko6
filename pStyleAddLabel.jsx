Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  var doc = app.activeDocument;
  var conf_obj = {};

  var pStyles_names = "";
  var pStyles = doc.paragraphStyles;
  for (i = 0; i < pStyles.length; i++) {
    pStyles_names = pStyles_names + pStyles[i].name + ",";
  }
  var pStylesGr = doc.paragraphStyleGroups;
  for (i = 0; i < pStylesGr.length; i++) {
    var tmpStr = pStylesGr[i].name;
    var pStyles2 = pStylesGr[i].paragraphStyles;
    for (j = 0; j < pStyles2.length; j++) {
      pStyles_names = pStyles_names + tmpStr + "___" + pStyles2[j].name + ",";
    }
  }
  pStyles_names = "" + "," + pStyles_names;
  pStyles_names = pStyles_names.substring(0, pStyles_names.length - 1);
  pStyles_names = pStyles_names.split(",");

  //　ダイアログ作成
  var objDlg = new Window("dialog", "段落スタイルを検索してスクリプトラベルを付与", [0, 0, 350, 220]);
  //　テキストを追加
  var objStText01 = objDlg.add("statictext", [20, 25, 350, 45], "段落スタイル");
  var objStText02 = objDlg.add("statictext", [20, 95, 350, 115], "付与スクリプトラベル");
  //　ドロップダウンリストを追加
  var objTxtbox01 = objDlg.add("dropdownlist", [20, 50, 315, 75], pStyles_names);
  objTxtbox01.title = "検索段落スタイル：";
  objTxtbox01.selection = conf_obj["place"] === undefined ? 0 : conf_obj["place"]; //何番目を初期表示とするか（らしい）
  //　テキストボックスを追加
  var objTxtbox02 = objDlg.add("edittext", [20, 120, 315, 145], "");
  //ボタン
  objDlg.add("button", [340 - 145, 220 - 40, 340 - 95, 220 - 15], "実行", { name: "ok" });
  objDlg.add("button", [340 - 90, 220 - 40, 340 - 10, 220 - 15], "キャンセル", { name: "cancel" });
  //　ダイアログ表示
  objDlg.center();
  var rtType = objDlg.show();
  //　ダイアログボックスの戻り値から条件分岐して、値を表示

  if (rtType == 1) {
    alert("以下の内容でスクリプトラベルを付与します" + "\r\n\r\n" + "段落スタイル ： " + pStyles_names[objTxtbox01.selection.index] + "\r\n" + "付与スクリプトラベル ： " + objTxtbox02.text, "処理終了");
    //const startTime = Date.now(); // 開始時間
    var x, xL, txf;
    for (x = 0, xL = doc.textFrames.length; x < xL; x++) {
      txf = doc.textFrames[x];
      if (txf.paragraphs[0].appliedParagraphStyle.name == pStyles_names[objTxtbox01.selection.index]) {
        txf.label = objTxtbox02.text;
      }
    }

    //const endTime = Date.now(); // 終了時間

    //alert(endTime - startTime); // 何ミリ秒かかったかを表示する

    alert("処理が完了しました");
  } else if (rtType == 2) {
    alert("キャンセルされました。", "処理終了", true);
  }
}
