#targetengine main

//250203 新規作成　参考：https://gist.github.com/monokano/62a23e8d0a0b5ac8d672a4d451841636#file-jsx を元にChatGPTで改良

//　ダイアログ作成
var x1, y1, x2, y2;
x1 = 0;
y1 = 0;
x2 = 170;
y2 = 50;

//　ダイアログ作成
var objPal = new Window("palette", "コピー元のレイヤー内にペースト", [
    x1,
    y1,
    x2,
    y2,
]);

// 現在の設定取得
var b = app.preferences.getBooleanPreference('layers/pastePreserve');
var status = b ? "✔" : "";
//var buttonText = b ? "OFF" : "ON";

//　テキストボックス
var objResText = objPal.add("statictext", [x1 + 10, y2 - 40, x2 - 90, y2 - 15], "状態: " + status);

//ボタン
var b1 = objPal.add("button", [x2 - 80, y2 - 40, x2 - 10, y2 - 15], "変更", {
    name: "ok",
});
//　ダイアログ表示
objPal.center();

b1.onClick = function () {
    var bt = new BridgeTalk;
    bt.target = BridgeTalk.appSpecifier;
    bt.body = "pPaste()";
    bt.send();
}

function pPaste() {
    b = !b;
    app.preferences.setBooleanPreference('layers/pastePreserve', b);

    // ボタンのテキストを反転
    //buttonText = b ? "OFF" : "ON";
    //b1.text = buttonText; // ボタンのテキストを更新
    
    // 状態を更新
    var newStatus = b ? "✔" : "";
    objResText.text = "状態: " + newStatus;  // statictext の内容を更新
};

objPal.show();
