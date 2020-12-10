//長体をかける

Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  //const startTime = Date.now(); // 開始時間

  var doc = app.activeDocument;
  var minSca = 70; //最小水平比率
  var adjAmo = 1; //調整量（%）
  var overTxt = 0; //収まらないテキスト数

  //長体をかけていく
  function choutai(obj) {
    var scaAmo = 0;
    while (obj.overflows) {
      obj.paragraphs[0].horizontalScale -= adjAmo;
      scaAmo++;
      obj.recompose(); //再読み込み
      if (obj.paragraphs[0].horizontalScale < minSca) {
        overTxt++;
        obj.paragraphs[0].horizontalScale = minSca + scaAmo - 1;
        break;
      }
    }
  }

  var i, iL, txtF, j, jL, tabs, k, kL, cels;
  //テキストフレーム
  txtF = doc.textFrames;
  for (i = 0, iL = txtF.length; i < iL; i++) {
    choutai(txtF[i]);
    //セル
    tabs = txtF[i].tables;
    for (j = 0, jL = tabs.length; j < jL; j++) {
      cels = tabs[j].cells;
      for (k = 0, kL = cels.length; k < kL; k++) {
        choutai(cels[k]);
      }
    }
  }
  //const endTime = Date.now(); // 終了時間

  //alert(endTime - startTime); // 何ミリ秒かかったかを表示する
  if (overTxt > 0) {
    alert("処理が完了しました" + "\r\n" + minSca + "%で収まらないテキストが" + overTxt + "箇所あります");
  } else {
    alert("処理が完了しました");
  }
}
