Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  //const startTime = Date.now(); // 開始時間

  var doc = app.activeDocument;
  var minSca = 70; //最小水平比率
  var overTxt = 0; //収まらないテキスト数

	//長体をかけていく
  function choutai(obj) {
    while (obj.overflows) {
      obj.paragraphs[0].horizontalScale -= 1;
      obj.recompose(); //再読み込み
      if (obj.paragraphs[0].horizontalScale <= minSca) {
        overTxt++;
        break;
      }
      if (!obj.overflows) {
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
  alert(minSca + "%で収まらないテキストが" + overTxt + "箇所あります");
}
