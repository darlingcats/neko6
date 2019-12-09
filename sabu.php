<!--{*
/*
 * This file is part of EC-CUBE B2B
 *
 * Copyright(c) 2000-2014 LOCKON CO.,LTD. All Rights Reserved.
 *
 * https://www.lockon.co.jp/
 *
 * This program is NOT free software.
 * LICENSE: See also LICENCE.txt file.
 */
*}-->

<!-- 開発バージョン、便利なコンソールの警告が含まれています -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lity/1.6.6/lity.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/lity/1.6.6/lity.js"></script>
<script src="/user_data/packages/default/js/t.min.js"></script>
<script src="/user_data/packages/default/js/point_tra.js"></script>
<link rel="stylesheet" href="https://www.takumi-probook.jp/user_data/packages/sphone/css/animate.css" />
<link rel="stylesheet" href="/user_data/packages/default/css/magic.css" />
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@asot/glitter/dist/Glitter.umd.min.js"></script>

<link rel="stylesheet" href="https://unpkg.com/[asot/glitter/dist//Glitter.css">

<link href="/user_data/packages/default/css/slick-theme.css" rel="stylesheet" type="text/css" />
<link href="/user_data/packages/default/css/slick.css" rel="stylesheet" type="text/css" />
<link href="/user_data/packages/default/css/point_tra.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/user_data/packages/default/js/slick.min.js"></script>

<script>
  // グローバルに登録する場合:
  Vue.component('glitter', Glitter);
  
  // ローカルに登録する場合
  new Vue({
    components: {
      glitter: Glitter
    }
  })
  </script>

<style>
  <!--
  -->
</style>

<div id="undercolumn">
  <div id="title">
    <h2><span>ポイントについて</span></h2>
  </div>

<div>

  <glitter
  v-bind:images="[
    '/user_data/packages/default/img/picture',
    { src: '/user_data/packages/default/img/picture', caption: 'Hello glitter' },
  ]">
  <p>
    中には任意のマークアップを書いてください。<br />
    ここが表紙として表示されます。
  </p>
</glitter>

  <div id="app">
    {{ message }}
  </div>

  <div id="app-2">
    <span v-bind:title="message">
      Hover your mouse over me for a few seconds to see my dynamically bound title!
    </span>
  </div>

  <div id="app-3">
    <span v-if="seen">Now you see me</span>
  </div>

  <div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>

<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>

<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>

<div id="app-7">
  <ol>
    <!-- 
      各 todo-item の内容を表す todo オブジェクトを与えます。
      これにより内容は動的に変化します。
      また後述する "key" を各コンポーネントに提供する必要があります。
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>

</div>


  <div>
    <div id="point_tra_area">
      <div style="margin-bottom: 15px;">
        <div class="point_tra_copy">
          <p>
            <img src="/user_data/packages/default/img/common/logo4.svg" width="150px" />
            のお好きな商品・景品とポイント交換ができます！
          </p>
        </div>

        <div style="display: flex">
          <div class="point_tra_img">
            <p>1回のご注文金額100円（税抜）につき1ポイント付与されます。</p>
            <img src="/user_data/packages/default/img/picture/point_tra_100_img.png" width="300px" />
          </div>
          <div class="point_tra_img">
            <p>1ポイント=1円相当としてご利用いただけます。</p>
            <img src="/user_data/packages/default/img/picture/point_tra_img.png" width="300px" />
          </div>
        </div>
        <div id="point_contents">
          <ul>
            <li><a href="#shohin_tra">商品交換</a></li>
            <li><a href="#keihin_tra">景品交換</a></li>
            <li><a href="#fax_tra">FAXでのご利用</a></li>
          </ul>
        </div>
      </div>
      <div id="shohin_tra" class="nagare">
        <p>商品交換</p>
      </div>
      <div>
        <p>
          （例）
          <a href="https://www.takumi-probook.jp/products/detail.php?product_id=4418021&parents_code=441-8021" style="font-weight: bold;">タナカ【2倍筋かい <リベロⅡ>】</a>
          を50個（1ケース）をポイント交換する場合
        </p>
      </div>
      <div class="point_tra_start">
        <p>通常通り商品をカートに入れ、購入手続きへ進んでください。</p>
      </div>
      <div id="tri0" class="triangle"></div>
      <div style="height: 1995px">
        <div id="chart_1">
          <div class="box1">
            <div class="bg_gray1" style="display: none;">
              <div class="bg_gray_mask1" style="display: none;"></div>
              <div class="red_border1"></div>
              <div class="point_pay_text1">
                合計金額5,670円をポイントで支払うことが可能です。
                <br />
                <span style="color: #000; font-size: 80%;">※税込価格全額のみ利用可能、金額の一部に利用することは出来ません。</span>
              </div>
            </div>
          </div>
          <div id="tri1" class="triangle"></div>
        </div>
        <div class="chart_todoke">
          <div>
            <p class="todokesaki">お届け先の指定</p>
          </div>
          <div id="tri2" class="triangle"></div>
        </div>
        <div id="chart_shitei">
          <div class="box2">
            <div class="bg_gray2" style="display: none;">
              <div class="bg_gray_mask2" style="display: none;"></div>
              <div class="bg_gray_mask2_1" style="display: none;"></div>
              <div id="js-target" class="typing_text">
                441-8021　リベロⅡ　50個分　ポイント交換
              </div>
              <div class="red_border2">
                <div class="point_pay_text2">
                  「備考・お問い合わせ」欄にポイント交換をする商品と数量を記入し、注文を確定してください。
                </div>
              </div>
              <div class="red_border2_1"></div>
            </div>
          </div>
          <div id="tri3" class="triangle"></div>
        </div>
        <div class="box3">
          <div class="bg_gray3" style="display: none;">
            <div class="bg_gray_mask3" style="display: none;"></div>
            <div class="bg_gray_mask3_1" style="display: none;"></div>
            <div class="point_pay_text_box3">
              <div class="red_border3"></div>
              <div class="point_pay_text3">
                見た目上はポイントを使用していませんが、
                <br />
                注文確認後に申請商品をポイント交換として手続きいたします。
              </div>
            </div>
            <div class="red_border3_1"></div>
          </div>
        </div>
        <!-- <div id="trade_fin" style="display: none;">
        <div class="nagare_u">
          <p>以上でポイント交換が完了となります。</p>
        </div>
      </div> -->
      </div>
      <div style="text-align: left; margin-bottom: 40px;">
        <p>※ポイントの反映は数日かかることがございます。</p>
        <p>
          ※ご注文金額が合計3,000円未満の場合は、別途指定の送料分をお支払いただきます。
        </p>
        <p>※別途送料がかかる商品の場合は、指定の送料分のみお支払いただきます。</p>
      </div>
    </div>
    <div id="keihin_tra" class="nagare">
      <p>景品交換</p>
    </div>

    <div style="text-align: center;">
      <img class="convini" src="https://www.takumi-probook.jp/user_data/apide.jpg" />
    </div>
    <p class="keihin_tra_chart">
      <a href="https://www.takumi-probook.jp/">サイトトップ</a>
      ＞
      <a href="https://www.takumi-probook.jp/mypage/login.php">マイページ</a>
      ＞
      <a href="https://www.takumi-probook.jp/user_data/pointexchange.php">ポイント交換</a>
      からお好みの景品またはカタログギフトとの交換が可能です。
    </p>

    <div class="box4">
      <div class="bg_gray4" style="display: none;">
        <div class="bg_gray_mask4" style="display: none;"></div>
        <div class="red_border4"></div>
        <div class="bg_gray_mask4_1" style="display: none;"></div>
        <div class="red_border4_1"></div>
      </div>
      <div class="point_pay_text4">
        個数を入力すると必要ポイントが自動で計算されます。
      </div>
    </div>
    <div id="tri4" class="triangle"></div>

    <div class="box5">
      <div class="bg_gray5" style="display: none;">
        <div class="bg_gray_mask5" style="display: none;"></div>
        <div class="red_border5"></div>
        <div class="bg_gray_mask5_1" style="display: none;"></div>
        <div class="red_border5_1"></div>
      </div>
      <div class="point_pay_text5">
        必要項目を入力し、「交換する」を押してください。
      </div>
    </div>

    <div>
      <h3>●カタログギフトを選ばれた場合</h3>
      <p>
        後日、郵送でカタログが届きます。お好きな景品を選んでカタログギフトに記載されている専用サイト、
        <br />
        もしくはＦＡＸ・ハガキにて直接お申し込みください。
      </p>
    </div>
    <p>
      ※景品によっては廃番や品切れの場合、別景品に変更させて頂く事もございますので予めご了承ください。
    </p>

    <div id="fax_tra" class="nagare">
      <p>FAXからのご利用</p>
    </div>

    <div>
      <p>
        FAXから申込ご希望の方はカタログ巻末の申込用紙をご利用頂くか、
        <br />
        <a href="https://52.199.68.47/user_data/packages/default/img/pdf/point_trade_fax.pdf" target="blank">コチラ</a>
        からPDFをダウンロードしてご利用ください。
      </p>
    </div>

    <div>
      <h3>●ポイント付与タイミング</h3>
      <p>
        注文日の翌日以降
        <br />
        ※商品の出荷日、売上日付により反映されるタイミングは異なります。
      </p>
    </div>

    <div>
      <h3>●ポイント有効期限</h3>
      <p>
        有効期限がございます。
        <br />
        ※ポイント獲得期間：毎年4月1日～翌年3月31日までの1年間
      </p>
      <p>
        (例)2018年4月1日～2019年3月31日までの獲得ポイントは、2020年4月1日で消滅します。
      </p>
      <font color="#ff0000" size="4">
        ※ポイントによる値引還元は2019年3月31日をもって終了いたしました。
        <br />
        今後は商品・景品交換にのみお使い頂けます。
      </font>
    </div>
    <div>
      <h3>●ポイント付与条件</h3>
      <p>
        複数担当者登録の場合は、ご請求書にてご確認ください（マイページ上には反映されません）
      </p>
    </div>
  </div>
</div>

<link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/css/lightbox.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.7.1/js/lightbox.min.js" type="text/javascript"></script>

<script>
import Glitter from 'glitter'
import 'glitter/dist/Glitter.css'

export default {
  components: {
    Glitter
  }
}
</script>

<script>
    Vue.component('todo-item', {
  // todo-item コンポーネントはカスタム属性のような "プロパティ" で受け取ります。
  // このプロパティは todo と呼ばれます。
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});

  var app = new Vue({
    el: "#app",
    data: {
      message: "Hello Vue!"
    }
  });

  var app2 = new Vue({
    el: "#app-2",
    data: {
      message: "You loaded this page on " + new Date().toLocaleString()
    }
  });

  var app3 = new Vue({
    el: "#app-3",
    data: {
      seen: true
    }
  });

  var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
});

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'あいうえお'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
});

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
});

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
});




function addFigure(str) {
  var num = new String(str).replace(/,/g, "");
  while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
  return num;
}

var target = document.getElementById('recommender_pc111');
function comma_price(){
    $('#recommender_pc111 .dv_rc_price').each(function(){
        $(this).html(addFigure($(this).html()));
    });
    $('#recommender_pc111 .dv_rc_name').each(function(){
      var str = $(this).text().replace(/【/g,'<br>【');
        $(this).html(str);
    });
    $('#recom .rc_name').each(function(){
      var str = $(this).text().replace(/【/g,'<br>【');
        $(this).html(str);
    });

}
var mo = new MutationObserver(comma_price);
mo.observe(target, {childList: true});


</script>
