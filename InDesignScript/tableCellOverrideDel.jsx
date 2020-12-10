//表スタイルとセルスタイルのオーバーライドを消去
//v1_1 201119 スタイルを選択できるようにした

Main();
function Main() {
    app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
    var doc = app.activeDocument;
    var txtfs = doc.textFrames;
    var conf_obj = {};

    //表スタイルを取得
    var tStyles_names = "";
    var tStyles = doc.tableStyles;
    for (i = 0; i < tStyles.length; i++) {
        tStyles_names = tStyles_names + tStyles[i].name + ",";
    }
    var tStylesGr = doc.tableStyleGroups;
    for (i = 0; i < tStylesGr.length; i++) {
        var tmpStr = tStylesGr[i].name;
        var tStyles2 = tStylesGr[i].tableStyles;
        for (j = 0; j < tStyles2.length; j++) {
            tStyles_names = tStyles_names + tmpStr + "___" + tStyles2[j].name + ",";
        }
    }
    tStyles_names = "ALL" + "," + tStyles_names;
    tStyles_names = tStyles_names.substring(0, tStyles_names.length - 1);
    tStyles_names = tStyles_names.split(",");

    //セルスタイルを取得
    var cStyles_names = "";
    var cStyles = doc.cellStyles;
    for (i = 0; i < cStyles.length; i++) {
        cStyles_names = cStyles_names + cStyles[i].name + ",";
    }
    var cStylesGr = doc.cellStyleGroups;
    for (i = 0; i < cStylesGr.length; i++) {
        var tmpStr = cStylesGr[i].name;
        var cStyles2 = cStylesGr[i].cellStyles;
        for (j = 0; j < cStyles2.length; j++) {
            cStyles_names = cStyles_names + tmpStr + "___" + cStyles2[j].name + ",";
        }
    }
    cStyles_names = "ALL" + "," + cStyles_names;
    cStyles_names = cStyles_names.substring(0, cStyles_names.length - 1);
    cStyles_names = cStyles_names.split(",");

    var x1, y1, x2, y2;
    x1 = 0;
    y1 = 0;
    x2 = 335;
    y2 = 230;

    //　ダイアログ作成
    var objDlg = new Window("dialog", "オーバーライドを消去", [x1, y1, x2, y2]);

    //　テキストを追加
    //var objStText01 = objDlg.add("statictext", [20, 25, 350, 45], "検索する文字列");
    //var objStText02 = objDlg.add("statictext", [20, 95, 350, 115], "列幅の数値");

    //　ドロップダウンリストを追加
    var objTxtbox01 = objDlg.add("dropdownlist", [20, 50, 315, 75], tStyles_names);
    objTxtbox01.title = "検索段落スタイル：";
    objTxtbox01.selection = conf_obj["place"] === undefined ? 0 : conf_obj["place"]; //何番目を初期表示とするか（らしい）

    var objTxtbox02 = objDlg.add("dropdownlist", [20, 110, 315, 75], cStyles_names);
    objTxtbox02.title = "検索段落スタイル：";
    objTxtbox02.selection = conf_obj["place"] === undefined ? 0 : conf_obj["place"]; //何番目を初期表示とするか（らしい）
    //　テキストボックスを追加
    var cb01 = objDlg.add("checkbox", [20, 30, 315, 75], "表スタイル");
    var cb02 = objDlg.add("checkbox", [20, 90, 315, 105], "セルスタイル");
    var cb03 = objDlg.add("checkbox", [20, 150, 315, 175], "セル内段落スタイル");

    cb01.value = true;
    cb02.value = true;
    cb03.value = true;
    //ボタン
    objDlg.add("button", [x2 - 145, y2 - 40, x2 - 95, y2 - 15], "実行", { name: "ok" });
    objDlg.add("button", [x2 - 90, y2 - 40, x2 - 10, y2 - 15], "キャンセル", { name: "cancel" });
    //　ダイアログ表示
    objDlg.center();
    var rtType = objDlg.show();
    //　ダイアログボックスの戻り値から条件分岐して、値を表示
    if (rtType == 1) {
        if (cb01.value === true) {
            var tSword = cb01.value + "/" + objTxtbox01.selection.text;
        } else {
            var tSword = cb01.value;
        }
        if (cb02.value === true) {
            var cSword = cb02.value + "/" + objTxtbox02.selection.text;
        } else {
            var cSword = cb02.value;
        }
        alert("オーバーライドを消去します" + "\r\n\r\n" + "表スタイル ： " + tSword + "\r\n" + "セルスタイル ： " + cSword + "\r\n" + "セル内段落スタイル ： " + cb03.value, "処理終了");

        tStyleNames01 = tStyles_names[objTxtbox01.selection.index];
        cStyleNames01 = cStyles_names[objTxtbox02.selection.index];

        if (tStyleNames01.match("___")) {
            tStyle01Spl = tStyleNames01.split("___");
            tStyle01 = tStyle01Spl[1];
        } else {
            tStyle01 = tStyleNames01;
        }

        if (cStyleNames01.match("___")) {
            cStyle01Spl = cStyleNames01.split("___");
            cStyle01 = cStyle01Spl[1];
        } else {
            cStyle01 = cStyleNames01;
        }
        for (var f = 0; f < txtfs.length; f++) {
            var tbls = txtfs[f].tables;
            for (var i = 0; i < tbls.length; i++) {
                if (cb01.value === true) {
                    if (objTxtbox01.selection.text === "ALL") {
                        tbls[i].clearTableStyleOverrides();
                    }
                    if (tbls[i].appliedTableStyle.name === tStyle01) {
                        tbls[i].clearTableStyleOverrides();
                    }
                }
                var cells = tbls[i].cells;
                for (var j = 0; j < cells.length; j++) {
                    if (cb02.value === true) {
                        if (objTxtbox02.selection.text === "ALL") {
                            cells[j].clearCellStyleOverrides();
                        }
                        if (cells[j].appliedCellStyle.name === cStyle01) {
                            cells[j].clearCellStyleOverrides();
                        }
                    }
                    var prgs = cells[j].paragraphs;
                    for (var k = 0; k < prgs.length; k++) {
                        if (cb03.value === true) {
                            prgs[k].clearOverrides();
                        }
                    }
                }
            }
        }
        alert("処理が完了しました", "処理終了", true);
    } else if (rtType == 2) {
        alert("キャンセルされました。", "処理終了", true);
    }
}
