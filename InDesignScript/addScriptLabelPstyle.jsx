Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  var doc = app.activeDocument;
  var conf_obj = {};

  //段落スタイルを取得
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

  var x1, y1, x2, y2;
  x1 = 0;
  y1 = 0;
  x2 = 350;
  y2 = 220;

  //　ダイアログ作成
  var objDlg = new Window("dialog", "同じ内容のセルを連結", [x1, y1, x2, y2]);

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
  objDlg.add("button", [x2 - 145, y2 - 40, x2 - 95, y2 - 15], "実行", { name: "ok" });
  objDlg.add("button", [x2 - 90, y2 - 40, x2 - 10, y2 - 15], "キャンセル", { name: "cancel" });

  //　ダイアログ表示
  objDlg.center();
  var rtType = objDlg.show();
  //　ダイアログボックスの戻り値から条件分岐して、値を表示

  if (rtType == 1) {
    alert("以下の内容でスクリプトラベルを付与します" + "\r\n\r\n" + "段落スタイル ： " + pStyles_names[objTxtbox01.selection.index] + "\r\n" + "付与スクリプトラベル ： " + objTxtbox02.text, "処理終了");
    //const startTime = Date.now(); // 開始時間

    //スクリプトラベルを付与
    pStyleNames01 = pStyles_names[objTxtbox01.selection.index];

    if (pStyleNames01.match("___")) {
      pStyle01Spl = pStyleNames01.split("___");
      pStyle01 = pStyle01Spl[1];
    } else {
      pStyle01 = pStyleNames01;
    }
    var x, xL, txf;
    for (x = 0, xL = doc.textFrames.length; x < xL; x++) {
      txf = doc.textFrames[x];
      if (txf.paragraphs[0].appliedParagraphStyle.name == pStyle01) {
        txf.label = objTxtbox02.text;
      }
    }

    //const endTime = Date.now(); // 終了時間

    //alert(endTime - startTime); // 何ミリ秒かかったかを表示する

    alert("処理が完了しました", "処理終了", true);
  } else if (rtType == 2) {
    alert("キャンセルされました。", "処理終了", true);
  }
}
