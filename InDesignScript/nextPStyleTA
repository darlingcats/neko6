Main();
function Main() {
  app.doScript("doMain()", ScriptLanguage.JAVASCRIPT, [], UndoModes.fastEntireScript);
}
function doMain() {
  var doc = app.activeDocument;
  var i, iL, j, jL, k, kL, l, lL, txFs, tabs, cels, paphs, styleTokucho, styleChui, styleFuzoku;
  
  styleTokucho = app.activeDocument.paragraphStyleGroups.itemByName("02_用途/特長/注意").paragraphStyles.itemByName("02_特長2");
  styleChui = app.activeDocument.paragraphStyleGroups.itemByName("02_用途/特長/注意").paragraphStyles.itemByName("02_注意2");
  styleFuzoku = app.activeDocument.paragraphStyleGroups.itemByName("03_商品情報").paragraphStyles.itemByName("付属品/材質/表面処理2");

  txFs = doc.textFrames;
  for (i = 0, iL = txFs.length; i < iL; i++) {
    tabs = txFs[i].tables;
    for (j = 0, jL = tabs.length; j < jL; j++) {
      cels = tabs[j].cells;
      for (k = 0, kL = cels.length; k < kL; k++) {
        paphs = cels[k].paragraphs;
        for (l = 1, lL = paphs.length; l < lL; l++) {
          if (paphs[0].appliedParagraphStyle.name == "02_特長") {
            paphs[l].applyParagraphStyle(styleTokucho);
          } else if (paphs[0].appliedParagraphStyle.name == "02_注意") {
            paphs[l].applyParagraphStyle(styleChui);
          } else if (paphs[0].appliedParagraphStyle.name == "付属品/材質/表面処理") {
            paphs[l].applyParagraphStyle(styleFuzoku);
          }
        }
      }
    }
  }
}
