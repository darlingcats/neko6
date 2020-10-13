//200929 v1_1 改行に対応 22行目〜34行目&50行目〜52行目

Main();
function Main() {
    app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
    var sel = app.selection[0];
    var overTxt = 0;

    switch (sel.constructor.name) {
        case "Table":
            leftAlCenTab();
            break;
        case "Cell":
            leftAlCenCel();
            break;
        default:
            alert("テーブル又はセルを選択して下さい。");
    }

    function cellWidth(cel) {
        minLineInset = [];
        for (l = 0, lL = cel.lines.length; l < lL; l++) {
            var points_st = cel.lines[l].insertionPoints[0].horizontalOffset;
            if (/[\r\n]$/.test(cel.lines[l].contents)) {
                var points_en = cel.lines[l].insertionPoints[-2].horizontalOffset;
            } else {
                var points_en = cel.lines[l].insertionPoints[-1].horizontalOffset;
            }
            minLineInset.push(points_en - points_st)
        }
        return Math.max.apply(null, minLineInset);
    }

    function leftAlCenTab() {
        var rws = sel.rows[0];
        var cols = rws.columns; // ★colsが複数形って名前でわかるようにしておきたい
        var i, iL, j, jL, cels, colWidth, minCellInset;
        for (i = 0, iL = cols.length; i < iL; i++) {
            cels = cols[i].cells;
            colWidth = cols[i].width;
            minCellInset = Infinity; // ★Infinityは大きな値を示す組込の変数
            for (j = 1, jL = cels.length; j < jL; j++) {
                cels[j].leftInset = cels[j].rightInset = 0;
                if (cels[j].overflows) {
                    overTxt++;
                } else {
                    minCellInset = Math.min(minCellInset, colWidth - cellWidth(cels[j]));
                    for (p = 0, pL = cels[j].paragraphs.length; p < pL; p++) {
                        cels[j].paragraphs[p].justification = Justification.leftAlign;
                    }
                }
            }
            cols[i].textLeftInset = Math.round((minCellInset) * 100) / 100;
            cels[0].textLeftInset = cels[0].textRightInset = 0.5; //ヘッダー
        }
        if (overTxt > 0) {
            alert("オーバーテキストが" + overTxt + "箇所あります", "処理終了", true);
        }
    }
    function leftAlCenCel() {
        var cols = sel.columns; // ★colsが複数形って名前でわかるようにしておきたい
        var i, iL, j, jL, cels, colWidth, minCellInset;
        sel.leftInset = sel.rightInset = 0;
        for (i = 0, iL = cols.length; i < iL; i++) {
            cels = cols[i].cells;
            colWidth = cols[i].width;
            minCellInset = Infinity; // ★Infinityは大きな値を示す組込の変数
            for (j = 1, jL = cels.length; j < jL; j++) {
                if (cels[j].overflows) {
                    overTxt++;
                } else {
                    minCellInset = Math.min(minCellInset, colWidth - cellWidth(cels[j]));
                    for (p = 0, pL = cels[j].paragraphs.length; p < pL; p++) {
                        cels[j].paragraphs[p].justification = Justification.leftAlign;
                    }
                }
            }
            cols[i].textLeftInset = Math.round((minCellInset / 2) * 100) / 100;
            cels[0].textLeftInset = cels[0].textRightInset = 0.5; //ヘッダー
        }
        if (overTxt > 0) {
            alert("オーバーテキストが" + overTxt + "箇所あります", "処理終了", true);
        }
    }
}
