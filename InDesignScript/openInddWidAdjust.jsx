//フォルダ内のinddを開いて列幅を自動で整える

var F = Folder.selectDialog("フォルダを選択してください");
main(F, true);

function main(F, closeFile) {
  var txtFil = new File(F + "/overSetText.txt");
  var inddFiles = F.getFiles("*.indd");
  var resAry = ["以下のファイルを正しく処理できませんでした"];
  var indd, flag;
  txtFil.encoding = "UTF8";
  if (!inddFiles) {
    exit();
  }
  var ovtf = [];
  for (var i = inddFiles.length - 1; i >= 0; i--) {
    flag = false;
    try {
      indd = app.open(inddFiles[i]);
      celWid(txtFil, ovtf);
      flag = true;
    } catch (e) {
      resAry.push("File: " + inddFiles[i].name + "\r　" + e);
    } finally {
      if (flag && closeFile) {
        indd.close(SaveOptions.YES, inddFiles.fullName);
      }
    }
  }
  var flg = txtFil.open("w");
  if (flg == true) {
    txtFil.writeln(ovtf.join("\r"));
  }
  if (resAry.length > 1) {
    alert(resAry.join("\r"));
  }
  alert("処理が完了しました", "処理終了", true);
}

function celWid(txtFil, ovtf) {
  var doc = app.activeDocument;
  var lab = "productTable"; //商品詳細表スクリプトラベル
  var lab2 = "makerName"; //メーカー名、商品名スクリプトラベル
  //var docPath = app.activeDocument.filePath;

  var searchLabel01 = "あたりの価格"; //「あたりの価格」は無視

  var widths, x, xL, tabs, y, yL, myTable, cols, w, v, myCellName, myCellNamePre, myCell, myCellPre, resul, resulPre;
  for (x = 0, xL = doc.textFrames.length; x < xL; x++) {
    widths = {};
    tabs = doc.textFrames[x].tables;
    for (y = 0, yL = tabs.length; y < yL; y++) {
      if (tabs[y].columns.length > 0) {
        if (tabs[y].label == lab) {
          myTable = app.selection = tabs[y];
          if (myTable.constructor.name == "Table") {
            if (myTable.parent.overflows) {
              //現在操作しているInDesignファイルの名前
              var docNam = app.activeDocument.name;
              ovtf.push(docNam);
              break;
            }
            cols = myTable.columns;
            for (w = 0, wL = cols.length; w < wL; w++) {
              for (v = 0, vL = myTable.rows.length; v < vL; v++) {
                myCellName = w + ":" + v; //対象セル座標
                myCellNamePre = w - 1 + ":" + v; //対象セル座標 - 1列
                myCell = myTable.cells.itemByName(myCellName); //対象セル名
                myCellPre = myTable.cells.itemByName(myCellNamePre); //対象セル - 1列名
                resul = myCell.contents;
                resulPre = myCellPre.contents;
              }
            }
            widthAdj(0.25, 0.75, true, true);
            n = myTable.columnCount - 1; //列幅を固定する列が決まっている場合
            widths[0] = "15mm";
            //widths[n] = "21mm";
            fixWid();
          }
        }
        if (tabs[y].label == lab2) {
          myTable = app.selection = tabs[y];
          cols = myTable.columns;
          widthAdj(0.5, 1, true, false);
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
      sum: 0,
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
    for (var i = 0, iL = cols.length; i < iL; i++) {
      var cels = cols[i].cells;
      var ar = [];
      for (var j = 0, jL = cels.length; j < jL; j++) {
        // if cell has no content
        if (cels[j].texts[0].contents === "") {
          continue;
        }
        if (cels[j].texts[0].contents.search(searchLabel01) != -1) {
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
        for (cL = 0, cLL = cels[j].lines.length; cL < cLL; cL++) {
          var os_start = cels[j].lines[cL].insertionPoints[0].horizontalOffset;
          var os_end = cels[j].lines[cL].insertionPoints[-1].horizontalOffset;
          ar.push(os_end - os_start);
        }
      }
      if (insertRIghtInset) {
        cols[i].rightInset = 2 * inset;
      }
      if (insertLeftInset) {
        cols[i].leftInset = 2 * inset;
      }
      var padding = cols[i].rightInset + cols[i].leftInset;
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
}
