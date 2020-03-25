Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  var doc = app.activeDocument;
  var conf_obj = {};

  //オブジェクトスタイルを取得
  var obStyles_names = "";
  var obStyles = doc.objectStyles;
  for (i = 0; i < obStyles.length; i++) {
    obStyles_names = obStyles_names + obStyles[i].name + ",";
  }
  var obStylesGr = doc.objectStyleGroups;
  for (i = 0; i < obStylesGr.length; i++) {
    var tmpStr = obStylesGr[i].name;
    var obStyles2 = obStylesGr[i].objectStyles;
    for (j = 0; j < obStyles2.length; j++) {
      obStyles_names = obStyles_names + tmpStr + "___" + obStyles2[j].name + ",";
    }
  }
  obStyles_names = "" + "," + obStyles_names;
  obStyles_names = obStyles_names.substring(0, obStyles_names.length - 1);
  obStyles_names = obStyles_names.split(",");

  var x1, y1, x2, y2;
  x1 = 0;
  y1 = 0;
  x2 = 350;
  y2 = 220;

  //　ダイアログ作成
  var objDlg = new Window("dialog", "同じ内容のセルを連結", [x1, y1, x2, y2]);

  //　テキストを追加
  var objStText01 = objDlg.add("statictext", [20, 25, 350, 45], "オブジェクトスタイル");
  var objStText02 = objDlg.add("statictext", [20, 95, 350, 115], "付与スクリプトラベル");
  //　ドロップダウンリストを追加
  var objTxtbox01 = objDlg.add("dropdownlist", [20, 50, 315, 75], obStyles_names);
  objTxtbox01.title = "検索オブジェクトスタイル：";
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
    alert("以下の内容でスクリプトラベルを付与します" + "\r\n\r\n" + "オブジェクトスタイル ： " + obStyles_names[objTxtbox01.selection.index] + "\r\n" + "付与スクリプトラベル ： " + objTxtbox02.text, "処理終了");
    //const startTime = Date.now(); // 開始時間

    //スクリプトラベルを付与
    var obStyleNames01, obStyle01Spl, obStyle01, x, xL, pgItms;

    obStyleNames01 = obStyles_names[objTxtbox01.selection.index];

    if (obStyleNames01.match("___")) {
      obStyle01Spl = obStyleNames01.split("___");
      obStyle01 = obStyle01Spl[1];
    } else {
      obStyle01 = obStyleNames01;
    }
    pgItms = doc.pageItems;
    for (x = 0, xL = pgItms.length; x < xL; x++) {
      if (pgItms[x].appliedObjectStyle.name == obStyle01) {
        pgItms[x].label = objTxtbox02.text;
      }
    }

    //const endTime = Date.now(); // 終了時間

    //alert(endTime - startTime); // 何ミリ秒かかったかを表示する

    alert("処理が完了しました", "処理終了", true);
  } else if (rtType == 2) {
    alert("キャンセルされました。", "処理終了", true);
  }
}
