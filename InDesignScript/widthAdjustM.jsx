//210209 ヘッダーが1行の場合rows[0]をremoveしない。本文内の改行に対応。

//@include 'polyfill.js';
Main();
function Main() {
	app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
	var doc = app.activeDocument;
	var lab = "productTable"; //商品詳細表スクリプトラベル
	var overtxf = 0;

	var x1, y1, x2, y2;
	x1 = 0;
	y1 = 0;
	x2 = 350;
	y2 = 220;

	//　ダイアログ作成
	var objDlg = new Window("dialog", "同じ内容のセルを連結", [x1, y1, x2, y2]);

	//　テキストを追加
	var objStText01 = objDlg.add("statictext", [20, 25, 350, 45], "検索する文字列");
	var objStText02 = objDlg.add("statictext", [20, 95, 350, 115], "列幅の数値");
	//　テキストボックスを追加
	var objTxtbox01 = objDlg.add("edittext", [20, 50, 315, 75], "");
	var objTxtbox02 = objDlg.add("edittext", [20, 120, 315, 145], "");
	//ボタン
	objDlg.add("button", [x2 - 145, y2 - 40, x2 - 95, y2 - 15], "実行", { name: "ok" });
	objDlg.add("button", [x2 - 90, y2 - 40, x2 - 10, y2 - 15], "キャンセル", { name: "cancel" });
	//　ダイアログ表示
	objDlg.center();
	var rtType = objDlg.show();
	//　ダイアログボックスの戻り値から条件分岐して、値を表示

	var searchLabel01 = "あたりの価格"; //「あたりの価格」は無視

	if (rtType == 1) {
		alert("検索した文字列の列幅を変更します" + "\r\n\r\n" + "検索する文字列 ： " + objTxtbox01.text + "\r\n" + "列幅 ： " + objTxtbox02.text, "処理終了");

		//const startTime = Date.now(); // 開始時間

		var x, xL, y, yL, myTable, w, wL, v, vL, i, iL, myCellName, myCellNameL, tabs, myCellNameU, myCell, myCellL, myCellU, resul, resulL, resulU;
		for (x = 0, xL = doc.textFrames.length; x < xL; x++) {
			widths = {};
			tabs = doc.textFrames[x].tables;
			for (y = 0, yL = tabs.length; y < yL; y++) {
				if (tabs[y].columns.length > 0) {
					if (tabs[y].label == lab) {
						for (i = 0, iL = tabs[y].cells.length; i < iL; i++) {
							tabs[y].cells[i].unmerge();
						}
						myTable = app.selection = tabs[y];
						if (myTable.constructor.name == "Table") {
							cols = myTable.columns;
							rws = myTable.rows;
							for (w = 0, wL = cols.length; w < wL; w++) {
								for (v = 0, vL = rws.length; v < vL; v++) {
									myCellName = w + ":" + v; //対象セル座標
									myCellNameL = w - 1 + ":" + v; //対象セル座標 - 1列
									myCellNameU = w + ":" + (v - 1); //対象セル座標 - 1行
									myCell = myTable.cells.itemByName(myCellName); //対象セル名
									myCellL = myTable.cells.itemByName(myCellNameL);
									myCellU = myTable.cells.itemByName(myCellNameU);
									resul = myCell.contents;
									resulL = myCellL.contents;
									resulU = myCellU.contents;

									if (myCell.contents == "") {
										widthAdj(0.25, 0.75, true, true);
										myCell.contents = myCellU.contents;
									}
									if (myCell.contents.search("バラ購入") != -1) {
										myCell.contents = "定価";
									}

									if (objTxtbox01.text == "") {
										//空欄だった場合
										continue;
									}
									if (resul.search(objTxtbox01.text) != -1) {
										if (resul != resulL) {
											//横結合セルだった場合（左隣の内容と同じだったら無視）
											widths[w] = objTxtbox02.text;
										}
									}
								}
							}
							if (myTable.rows[0].rowType === RowTypes.headerRow && myTable.rows[1].rowType === RowTypes.headerRow) {
								myTable.rows[0].remove();
							}
							widthAdj(0.25, 0.75, true, true);
							n = myTable.columnCount - 1; //列幅を固定する列が決まっている場合
							widths[0] = "15mm";
							//widths[n] = "21mm";
							fixWid();
							TableResize();
						}
					}
				}
			}
		}

		//固定列幅
		function fixWid() {
			var txfWidth = (function () {
				var g = myTable.parent.geometricBounds;
				return g[3] - g[1];
			})();
			var fillCells = {
				ary: Array(cols.length),
				sum: 0
			};
			for (k in widths) {
				var kNum = parseInt(k, 10);
				try {
					if (isNaN(kNum) || kNum > cols.length - 1) {
						throw new RangeError("widthsオブジェクトのキーが対象外の列を指定しています");
					}
				} catch (e) {
					alert(e);
					return;
				}
				if (widths[k] && widths[k] !== "fill") {
					cols[k].width = widths[k];
					txfWidth -= cols[k].width;
				} else if (widths[k] === "fill") {
					fillCells.ary[k] = true;
					fillCells.sum++;
				} else {
					txfWidth -= cols[k].width;
				}
			}
			var fillWidth = txfWidth / fillCells.sum;
			for (var i = 0; i < cols.length; i++) {
				if (fillCells.ary[i]) {
					cols[i].width = fillWidth;
				}
			}
		}

		//商品詳細表列幅
		function widthAdj(inset, padd, insertRIghtInset, insertLeftInset) {
			var i, iL, cels, ar, j, jL, os_start, os_end, padding;
			for (i = 0, iL = cols.length; i < iL; i++) {
				cels = cols[i].cells;
				ar = [];
				for (j = 0, jL = cels.length; j < jL; j++) {
					// if cell has no content
					if (cels[j].texts[0].contents === "") {
						continue;
					}
					// if cell overflows
					if (cels[j].overflows) {
						while (cels[j].overflows) {
							cels[j].width += 1;
							cels[j].recompose(); //★ここ
							if (cels[j].width > 175) {
								if (cels[j].lines.length > 1) {
									while (cels[j].overflows) {
										cels[j].height += 2.5;
										if (cels[j].height > 8) {
											break;
										}
									}
								}
							}
							if (cels[j].properties["lines"] !== undefined) {
								break;
							}
						}
					}
					var os_lins = cels[j].lines;
					for (cL = 0, cLL = os_lins.length; cL < cLL; cL++) {
						var os_start = os_lins[cL].horizontalOffset;
						var os_end = os_lins[cL].endHorizontalOffset;
						var os_diff = os_end - os_start;
						ar.push(os_diff);
					}
				}
				if (insertRIghtInset) {
					cols[i].rightInset = 2 * inset;
				}
				if (insertLeftInset) {
					cols[i].leftInset = 2 * inset;
				}
				padding = cols[i].rightInset + cols[i].leftInset;
				try {
					cols[i].width = Math.round(
						ar.sort(function (a, b) {
							return b > a;
						})[0] +
						padding +
						padd
					);
				} catch (e) {
					alert(e);
					return;
				}
			}
		}

		//テキストフレームとテーブルの差を取得して列幅を振り分け
		function cellWidth(cel) {
			var points = cel.lines[0].insertionPoints;
			return points[-1].horizontalOffset - points[0].horizontalOffset;
		}
		function TableResize() {
			var txfWidth, txfWidth2, g, tabWidth, tabWidth2, diffWidth, diffWidth2, y, h, q, o;
			txfWidth = (function () {
				g = myTable.parent.geometricBounds;
				return g[3] - g[1];
			})();
			tabWidth = myTable.width;
			diffWidth = Math.round(txfWidth - tabWidth);
			if (diffWidth <= 0) {
				overtxf++;
				if (diffWidth <= -10) {
					for (var ovW = 0; ovW < myTable.columns.length; ovW++) {
						var att = [];
						for (ovC = 1; ovC < myTable.columns[ovW].cells.length; ovC++) {
							att.push(myTable.columns[ovW].width - cellWidth(myTable.columns[ovW].cells[ovC]));
						}
						celSpa = Math.min.apply(null, att)
						if (celSpa > 10) {
							myTable.columns[ovW].width -= Math.round(celSpa) - 2;
							break;
						}
					}
					if (celSpa > 10) {
						myTable.rows[0].height = "6mm";
					}
				}
			} else {
				y = parseInt(diffWidth / n);
				for (h = 1; h < n + 1; h++) {
					cols[h].width += y;
				}
				//テキストフレームとテーブルの差を再計算
				txfWidth2 = (function () {
					g = myTable.parent.geometricBounds;
					return g[3] - g[1];
				})();
				tabWidth2 = myTable.width;
				diffWidth2 = Math.round(txfWidth2 - tabWidth2);
				if (diffWidth2 > 0) {
					for (q = 0; q < diffWidth2; q++) {
						o = n - q;
						cols[o].width += 1;
					}
				}
			}
		}

		//const endTime = Date.now(); // 終了時間

		//alert(endTime - startTime); // 何ミリ秒かかったかを表示する

		if (overtxf > 0) {
			alert("処理が完了しました" + "\r\n" + "テキストフレームに収まらないテーブルが" + overtxf + "個あります", "処理終了", true);
		} else {
			alert("処理が完了しました", "処理終了", true);
		}
	} else if (rtType == 2) {
		alert("キャンセルされました。", "処理終了", true);
	}
}
