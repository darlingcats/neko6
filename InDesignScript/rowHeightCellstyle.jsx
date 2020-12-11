//セルスタイルを指定して行の高さを変更

Main();
function Main() {
    app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
    var doc = app.activeDocument;
    var conf_obj = {};

    //オブジェクトスタイルを取得
    var clStyles_names = "";
    var clStyles = doc.cellStyles;
    for (i = 0; i < clStyles.length; i++) {
        clStyles_names = clStyles_names + clStyles[i].name + ",";
    }
    var clStylesGr = doc.cellStyleGroups;
    for (i = 0; i < clStylesGr.length; i++) {
        var tmpStr = clStylesGr[i].name;
        var clStyles2 = clStylesGr[i].cellStyles;
        for (j = 0; j < clStyles2.length; j++) {
            clStyles_names = clStyles_names + tmpStr + "___" + clStyles2[j].name + ",";
        }
    }
    clStyles_names = "" + "," + clStyles_names;
    clStyles_names = clStyles_names.substring(0, clStyles_names.length - 1);
    clStyles_names = clStyles_names.split(",");

    var x1, y1, x2, y2;
    x1 = 0;
    y1 = 0;
    x2 = 350;
    y2 = 220;

    //　ダイアログ作成
    var objDlg = new Window("dialog", "同じ内容のセルを連結", [x1, y1, x2, y2]);

    //　テキストを追加
    var objStText01 = objDlg.add("statictext", [20, 25, 350, 45], "セルスタイル");
    var objStText02 = objDlg.add("statictext", [20, 95, 350, 115], "拡大縮小比率");
    //　ドロップダウンリストを追加
    var objTxtbox01 = objDlg.add("dropdownlist", [20, 50, 315, 75], clStyles_names);
    objTxtbox01.title = "検索セルスタイル：";
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
        alert("以下の内容で行の高さを変更します" + "\r\n\r\n" + "セルスタイル ： " + clStyles_names[objTxtbox01.selection.index] + "\r\n" + "行高さ ： " + objTxtbox02.text + "㎜", "処理終了");
        //PageItemの変形
        var myScale = objTxtbox02.text;
        if (!myScale) alert("比率（半角数字3桁）を入力してください。");
        chgScale(myScale);
        function chgScale(myScale) {
            var clStyleNames01, clStyle01Spl, clStyle01, clStyle01, i, iL, pgItms;

            clStyleNames01 = clStyles_names[objTxtbox01.selection.index];

            if (clStyleNames01.match("___")) {
                clStyle01Spl = clStyleNames01.split("___");
                clStyle01 = clStyle01Spl[1];
            } else {
                clStyle01 = clStyleNames01;
            }

            var obj = app.activeDocument.selection; //選択されているオブジェクト
            var x, xL, tabs, y, yL;
            for (x = 0, xL = doc.textFrames.length; x < xL; x++) {
                tabs = doc.textFrames[x].tables;
                for (y = 0, yL = tabs.length; y < yL; y++) {
                    if (tabs[y].cells[0].appliedCellStyle.name == clStyle01) {
                        tabs[y].cells[0].autoGrow = false;
                        tabs[y].cells[0].height = myScale;
                    }
                }
            }
        }
        alert("処理が完了しました", "処理終了", true);
    } else if (rtType == 2) {
        alert("キャンセルされました。", "処理終了", true);
    }
}
