//左揃えでセンター_ドキュメント対象
//201013 v1_2 改行に対応 9行目〜21行目&77行目
//210610 v1_4 キャンセル処理 30行目〜34行目。ヘッダー行の数により分岐 45行目〜54行目

//@include 'polyfill.js';
Main();
function Main() {
    app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
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

    var doc = app.activeDocument;
    var lab = "productTable"; //商品詳細表スクリプトラベル

    var someWord = prompt("頭から同じ文字数", 5)
    var s = eval(someWord); //頭から何文字同じか

    if (someWord === "") {
        alert("文字数を入れてください", "処理終了", true);
    } else if (someWord === null) {
        alert("キャンセルされました。", "処理終了", true);
    } else {

        var overTxt = 0;
        var txtF, x, xL, tabs, y, yL, cols, rwsL, h, i, iL, j, jL, k, cels, colWidth, minCellInset, arr;
        txtF = doc.textFrames;
        for (x = 0, xL = txtF.length; x < xL; x++) {
            tabs = txtF[x].tables;
            for (y = 0, yL = tabs.length; y < yL; y++) {
                if (tabs[y].label == lab) {
                    cols = tabs[y].columns;
                    rwsL = tabs[y].rows.length;
                    if (tabs[y].rows[0].cells[0].rowType && tabs[y].rows[1].cells[0].rowType === RowTypes.HEADER_ROW) {
                        k = 3;
                        h = 2;
                    } else if (tabs[y].rows[0].cells[0].rowType === RowTypes.HEADER_ROW) {
                        k = 2;
                        h = 1;
                    } else {
                        k = 3;
                        h = 2;
                    }
                    if (rwsL > k) {
                        for (i = 1, iL = cols.length; i < iL; i++) {
                            cels = cols[i].cells;
                            colWidth = cols[i].width;
                            arr = [];
                            if (cels[h].contents.length && cels[h + 1].contents.length && cels[h + 2].contents.length > s) {
                                minCellInset = Infinity; // ★Infinityは大きな値を示す組込の変数
                                for (j = h, jL = cels.length; j < jL; j++) {
                                    if (cels[j].overflows) {
                                        overTxt++;
                                    } else {
                                        var v = cels[j].characters.itemByRange(0, s).contents;
                                        arr.push(v);
                                        minCellInset = Math.min(minCellInset, colWidth - cellWidth(cels[j]));
                                    }
                                }
                                function uniform(arr, identity) {
                                    identity =
                                        identity ||
                                        function (a, b) {
                                            return a === b;
                                        };
                                    if (!arr) {
                                        throw new TypeError("`arr` は配列で指定してね！");
                                    }
                                    if (!arr.length) {
                                        return true;
                                    }
                                    var theValue = arr[0];
                                    return arr.slice(1).reduce(function (acc, item) {
                                        return acc && identity(theValue, item);
                                    }, true);
                                }
                                if (
                                    uniform(arr, function (a, b) {
                                        return a.toString() === b.toString();
                                    })
                                ) {
                                    for (var k = 1; k < cels.length; k++) {
                                        for (p = 0, pL = cels[k].paragraphs.length; p < pL; p++) {
                                            cels[k].paragraphs[p].justification = Justification.leftAlign;
                                            cels[k].leftInset = cels[k].rightInset = 0;
                                            cels[k].textLeftInset = Math.round((minCellInset / 2) * 100) / 100;
                                        }
                                    }
                                    //cels[0].textLeftInset = cels[0].textRightInset = 1; //ヘッダー
                                }
                            }
                        }
                    }
                }
            }
        }
        if (overTxt > 0) {
            alert("処理が完了しました" + "\r\n" + "オーバーテキストが" + overTxt + "箇所あります", "処理終了", true);
        } else {
            alert("処理が完了しました", "処理終了", true);
        }
    }
}
