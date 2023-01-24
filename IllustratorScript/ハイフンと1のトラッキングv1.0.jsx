//230123 新規作成 

//現在のファイルをfRefとする
fRef = app.activeDocument;

track(fRef);

function track(fRef) {
    srchText = "- 1"; //　トラッキング設定文字
    trackVal1 = [-25, -100]; //　トラッキング値
    trackVal2 = [-110, -100]; //　トラッキング値
    findText = "1"
    denwa = app.textFonts.getByName("ATC-96fb67f15e83544a5f96fb8a71756a53f7");
    kakugo = app.textFonts.getByName("ATC-96fb67f15e83544a5f89d230b430b730c330af");

    sel = fRef.textFrames;
    for (i = 0; i < sel.length; i++) {
        txtRange = sel[i];
        if (sel[i].constructor.name === "TextFrame") {
            for (j = 0; j < txtRange.characters.length; j++) {
                b = txtRange.contents;
                if (b.search(findText) != -1) {
                    try {
                        c = txtRange.characters[j].contents;
                        d = txtRange.characters[j + 1].contents;
                        n = srchText.indexOf(c, 0);
                        if (c === "-" && d === "1") {
                            if (n > -1) {
                                if (sel[i].characters[0].textFont === denwa) {
                                    txtRange.characters[j].tracking = trackVal1[n];
                                }
                                if (sel[i].characters[0].textFont === kakugo) {
                                    txtRange.characters[j].tracking = trackVal2[n];
                                }
                                else {
                                    continue;
                                }
                            }
                        }
                        if (c === "1" && d === "-") {
                            if (n > -1) {
                                if (sel[i].characters[0].textFont === denwa) {
                                    txtRange.characters[j].tracking = trackVal1[n - 1];
                                }
                                if (sel[i].characters[0].textFont === kakugo) {
                                    txtRange.characters[j].tracking = trackVal2[n - 1];
                                }
                                else {
                                    continue;
                                }
                            }
                        }
                    }
                    catch (e) {
                    }
                }
            }
        }
    }
}
