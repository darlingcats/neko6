//211105 新規作成　参考：https://qiita.com/sasaki_giraffe/items/3ae16bf7d871284f7434
//211108 グループ化されたオブジェクト、文字も計算出来るよう修正 82～85行
//211109 掛看板追加　32行,56行

//var area = app.selection[1].area; // 選択中のオブジェクトの面積（単位がpt）を取得
//var absolute = Math.abs(area); // 負の数字を引っ張ってくる場合があるので、絶対値を取得して正の数に統一
//var convert = Math.ceil(absolute * 0.12445216049); // 小数点を切り上げしてptからメートル法に変換
//var result = (convert * 0.01 +'㎠');

//　ダイアログ作成
var x1, y1, x2, y2;
x1 = 0;
y1 = 0;
x2 = 240;
y2 = 250;

//　ダイアログ作成
var objDlg = new Window("dialog", "製品コードを選択（7分の1デザイン）", [x1, y1, x2, y2]); //　固定テキスト

var objStText01 = objDlg.add("panel",[x1 + 10, 20, x2 - 10, 110],"巻看板：");
var objStText02 = objDlg.add("panel",[x1 + 10, 120, x2 - 10, 180],"掛看板：");
//　テキストボックス
//　グループ1
var objGrp01 = objDlg.add("group", [20, 50, x2, 300]);
//　ラジオボタン（巻き看板）
var objBtn01 = objGrp01.add("radiobutton", [0, 0, 50, 20], "B");
var objBtn02 = objGrp01.add("radiobutton", [80, 0, 130, 20], "X");
var objBtn03 = objGrp01.add("radiobutton", [160, 0, 210, 20], "A");
var objBtn04 = objGrp01.add("radiobutton", [0, 30, 50, 50], "R");
var objBtn05 = objGrp01.add("radiobutton", [80, 30, 130, 50], "N");
//　ラジオボタン（掛看板）
var objBtn06 = objGrp01.add("radiobutton", [0, 100, 50, 120], "B");
//var objBtn07 = objGrp01.add("radiobutton", [80, 100, 130, 120], "X");
//var objBtn08 = objGrp01.add("radiobutton", [160, 100, 210, 120], "A");
//　ボタン1をオンにする
objBtn01.value = true;
//ボタン
objDlg.add("button", [x2 - 145, y2 - 40, x2 - 95, y2 - 15], "実行", {
  name: "ok",
});
objDlg.add("button", [x2 - 90, y2 - 40, x2 - 10, y2 - 15], "キャンセル", {
  name: "cancel",
});
//　ダイアログ表示
objDlg.center();
var rtType = objDlg.show();
//　ダイアログボックスの戻り値から条件分岐して、値を表示

if (rtType == 1) {
  var mb, mx, ma, mr, mn, dSpace;
  mb = 63454.2249435575; //巻き看板製品コードB
  mx = 52150.7715721274; //巻き看板製品コードX
  ma = 70077.2872369164; //巻き看板製品コードA
  mr = 53648.0522579572; //巻き看板製品コードR
  mn = 44072.5770250142; //巻き看板製品コードN
  ka = 62064.3406060061; //掛け看板製品コードA
  dSpace = 0; //デザインスペース
  if (objBtn01.value == true) {
    dSpace = mb;
    areaRatio(dSpace);
  }
  if (objBtn02.value == true) {
    dSpace = mx;
    areaRatio(dSpace);
  }
  if (objBtn03.value == true) {
    dSpace = ma;
    areaRatio(dSpace);
  }
  if (objBtn04.value == true) {
    dSpace = mr;
    areaRatio(dSpace);
  }
  if (objBtn05.value == true) {
    dSpace = mn;
    areaRatio(dSpace);
  }
  if (objBtn06.value == true) {
    dSpace = ka;
    areaRatio(dSpace);
  }

  function areaRatio(dSpace) {
    var k, i, area, wid, hei, gArea, absolute, result;
    k = 0;
    for (i = 0; i < app.selection.length; i++) {
      area = app.selection[i].area;
      if (isNaN(area)) {
        wid = app.selection[i].width;
        hei = app.selection[i].height;
        gArea = wid * hei;
        k += gArea;
        //alert("計算できませんでした。単体のオブジェクトを選択して再度実行してください。（グループ化されたもの、文字は計算できません）");
        //break;
      } else {
        absolute = Math.abs(area); // 負の数字を引っ張ってくる場合があるので、絶対値を取得して正の数に統一
        k += absolute;
      }
    }
    result = (k / dSpace) * 100; //割合を計算
    alert(result.toFixed(1) + "%");
  }
  //alert("処理が完了しました", "処理終了", true);
} else if (rtType == 2) {
  //alert("キャンセルされました。", "処理終了", true);
}
