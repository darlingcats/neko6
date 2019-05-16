<!--{*
/*
 * This file is part of EC-CUBE B2B
 *
 * Copyright(c) 2000-2014 LOCKON CO.,LTD. All Rights Reserved.
 *
 * http://www.lockon.co.jp/
 *
 * This program is NOT free software.
 * LICENSE: See also LICENCE.txt file.
 */
*}-->

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

<style type="text/css">
	<!--

	.info_bar {
		width: 1200px;
		height: 50px;
		display: flex;
		margin: 0 auto;
	}

	#header .fa,.far,.fas {
		width: 28px;
		float: left;
		margin-right: 3px;
		/*font-weight: normal;
        font-style: normal;*/
		text-align: center;
		font-size: 23px;
		line-height: 1.8em;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
	}

	div.poplink {
		z-index: 9998;
	}
	div.poplink.pc022 {
		width:680px;
	}
	div.poplink.pc022 div.poplink_suggest {
		width:188px;
	}
	div.poplink.pc022 div.poplink_search {
		width:486px;
	}

	#head_menu_mypage .fav_arrow {
		width: 10px;
		height: 10px;
		margin: -10px auto 5px auto;
		border: 5px double;
		border-color: transparent transparent #009844 #009844;
		transform: rotate(-45deg);
	}
	#head_menu_mypage .fav_link {
		display: block;
		width: 396px;
		height: auto;
		margin: 5px;
		padding: 0;
		text-align: center;
		text-decoration: underline;
		text-decoration-color: #ff6405;
		box-sizing: border-box;
		transition: .8s;
	}

	#head_menu_mypage span.spec {
		display: inline-block;
		/*color: #000;*/
		text-align: left;
		font-size: 70%;
		line-height: 0.75;
	}
	#head_menu_mypage span.spec:hover {
		color: #fff;
	}

	/*fixedsticky*/
	.fixedsticky {
		position: -webkit-sticky;
		position: -moz-sticky;
		position: -ms-sticky;
		position: -o-sticky;
		position: sticky;
	}
	/* When position: sticky is supported but native behavior is ignored */
	.fixedsticky-withoutfixedfixed .fixedsticky-off,
	.fixed-supported .fixedsticky-off {
		position: static;
	}
	.fixedsticky-withoutfixedfixed .fixedsticky-on,
	.fixed-supported .fixedsticky-on {
		position: fixed;
	}
	.fixedsticky-dummy {
		display: none;
	}
	.fixedsticky-on + .fixedsticky-dummy {
		display: block;
	}


	.entry a:link {color:#ffffff;} /*未訪問のリンクの色*/
	.entry a:visited {color:#ffffff;} /*訪問済みのリンクの色*/
	.entry a:hover {color:#ffffff; background:#d22e19;} /*カーソルが乗っているリンクの色*/
	.entry a:active {color:#ffffff;} /*クリック中のリンクの色*/




	-->

</style>
<!-- <script src="<!--{$smarty.const.HTTPS_URL}-->user_data/packages/default/js/fixedfixed.js"></script>
<script>
$( '#header' ).fixedsticky();
</script> -->
<script>
    $(function() {
        var nav = $('#head_menu_mypage');
        $('li', nav).mouseover(function(e) {
            $('ul', this).stop().slideDown('fast');
        })
            .mouseout(function(e) {
                $('ul', this).stop().slideUp(100);
            });
    });

    $(window).load(function() {
        $('#head_menu_mypage>li').hover(
            function(){
                $(this).addClass('current');
                /*$(this).children('ul').addClass('visible');*/
            },
            function(){
                $(this).removeClass('current');
                /*$(this).children('ul').removeClass('visible');*/
            }
        );
    });

</script>


<!--▼HEADER-->
<div id="header" class="fixedsticky">
	<div class="h_top" itemscope="" itemtype="http://schema.org/Organization">
		<div class="logo left" itemscope="" itemtype="http://schema.org/Organization" style="min-width:190px;">
			<a href="<!--{$smarty.const.HTTPS_URL}-->" itemprop="url">
				<img itemprop="logo" src="/user_data/packages/default/img/common/logo2.svg" alt="匠の一冊" height="85">
			</a>
		</div>
		<div class="h_right" id="header_login_area">
			<div class="takumi_copy">
				建築関連専門通販サイト　施工業者（プロ）に選ばれて続けて20年！商品点数約<span style="font-weight:bold;">26,000</span>点！
				<span style="float:right; padding-right:5px;">15:00までのご注文で即日発送！</span>
			</div>
			<div class="h_right_under">
				<div class="user_name">
					<p><span><!--{$company_name}--></span></p>
					<p style="border-bottom:none;"><span><!--{$login_name}--></span>
					</p>
				</div>

				<ul id="head_menu_login" <!--{if $tpl_login == 1 }-->style="display:none;"<!--{/if}--> >
				<li>
					<a href="<!--{$smarty.const.HTTPS_URL}-->entry/kiyaku.php" class="menu_shinki">
						<p>初めてのお客様は</p>
						<span>新規登録</span>
					</a>
				</li>
				<li>
					<a href="<!--{$smarty.const.HTTPS_URL}-->mypage/login.php" class="menu_login">
						<p>登録済のお客様は</p>
						<span>ログイン</span>
					</a>
				</li>
				</ul>

				<div class="menu_point" <!--{if $tpl_login != 1 }-->style="display:none;"<!--{/if}--> >
				<p><span>所持ポイント</span></p>
				<p style="border-bottom:none;"><a href="/user_data/pointexchange.php" style="color: #000;"><span class="point"><!--{$point|number_format}--></span></a>pt

					<a href="/frontparts/login_check.php?mode=logout" class="logout">ログアウト</a>

					<!--{if !$tpl_disable_logout}-->
					<!-- <span class="btn">
                <input type="image" class="hover_change_image" src="<!--{$TPL_URLPATH}-->img/button/btn_bloc_logout.jpg" onclick="eccube.fnFormModeSubmit('login_form', 'logout', '', ''); return false;" alt="ログアウト" />
					</span> -->
					<!--{/if}-->

				</p>
			</div>

			<ul id="head_menu_mypage">
				<li>
					<a href="<!--{$smarty.const.HTTPS_URL}-->mypage/login.php" class="menu_mypage mypage_bg">
						<span>マイページ</span>
					</a>
					<ul class="child mypage_list" style="height:274px;">
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->mypage/"><i class="material-icons">history</i>購入履歴・再注文</a></li>
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->mypage/estimate_list.php"><i class="material-icons">view_list</i>お見積書一覧</a></li>
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->mypage/change.php"><i class="material-icons">create</i>会員登録内容変更</a></li>
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->mypage/delivery.php"><i class="material-icons">local_shipping</i>お届け先追加・変更</a></li>
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->contact/payc.php"><i class="material-icons">payment</i>お支払情報変更申込</a></li>
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->user_data/pointexchange.php"><i class="material-icons">card_giftcard</i>ポイント交換</a></li>
					</ul>
				</li>
				<li>
					<a href="/user_data/FAQ.php" class="menu_mypage support_bg">
						<span>サポート</span>
					</a>
					<ul class="child support_list" style="height:229px;">
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->first/"><i class="fas fa-info-circle"></i>初めての方</a></li>
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->abouts/"><i class="far fa-building"></i>会社案内</a></li>
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->pay/"><i class="fas fa-coins"></i>お支払い方法</a></li>
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->contact/"><i class="far fa-envelope"></i>問い合わせ</a></li>
						<li><a href="<!--{$smarty.const.HTTPS_URL}-->user_data/FAQ.php"><i class="far fa-question-circle"></i>よくある質問</a></li>
					</ul>
				</li>
				<li>
					<a href="/mypage/favorite.php/" class="menu_mypage favorite_bg">
						<span>お気に入り</span>
					</a>
					<ul class="child favorite_list">

						<!--{if $tpl_login == 1 && $tpl_linemax > 0}-->
						<!--<p><span class="attention"><!--{$tpl_linemax}-->件</span>のお気に入りがあります。</p>-->
						<div class="paging">
							<!--▼ページナビ-->
							<!--{$tpl_strnavi}-->
							<!--▲ページナビ-->
						</div>
						<!--{section name=cnt loop=$arrFavorite_head}-->
						<!--{assign var=product_id value="`$arrFavorite_head[cnt].product_id`"}-->
						<li>
							<a href="<!--{$smarty.const.P_DETAIL_URLPATH}--><!--{$product_id|u}-->&parents_code=<!--{$arrFavorite_head[cnt].parents_code|u}-->">
								<img src="<!--{$smarty.const.IMAGE_SAVE_URLPATH}--><!--{$arrFavorite_head[cnt].main_large_image|sfNoImageMainList|h}-->" style="max-width: 45px;max-height: 45px;" alt="<!--{$arrFavorite_head[cnt].name|h}-->" />
								<strong><!--{$arrFavorite_head[cnt].name|h}--></strong>
							</a>
						</li>
						<!--{/section}-->
						<!--{if $tpl_linemax > 5}-->
							<div class="fav_arrow"></div>
						<!--{/if}-->
						<a href="/mypage/favorite.php/" class="fav_link"><span class="attention"><!--{$tpl_linemax}--></span><span style="text-decoration:none; color:#ff6405;">件のお気に入りを全て見る</span></a>
						<!--{else}-->
						<!--{if $tpl_login == 1}-->
						<p>お気に入りが登録されておりません。</p>
						<!--{else}-->
						<p style="text-align: center; margin: 5px; font-size: 100%; line-height: 2;"><a href="/mypage/login.php">ログインしてください</a></p>
						<!--{/if}-->
						<!--{/if}-->
					</ul>
				</li>
				<li>
					<a href="<!--{$smarty.const.HTTPS_URL}-->cart/" class="menu_cart">
						<p class="cart_num">
							<!--{if $cart_item_count ==''}-->
							0
							<!--{else}-->
							<!--{$cart_item_count}-->
							<!--{/if}-->
						</p>
						<span>カート</span>
					</a>
					<ul class="child cart_list" id="header_cart_list">
						<!-- カート内商品をここに表示 -->
						<!--{if $cart_item_html == '' }-->
							<li>
								<p style="text-align: center; margin: 5px; height: 25px; font-size: 100%; line-height: 2;">
									現在カート内に商品はございません
								</p>
							</li>
						<!--{else}-->
							<!--{$cart_item_html}-->
						<!--{/if}-->
					</ul>
				</li>
			</ul>
		</div>
	</div>
</div>

<div id="gnavi" style=" margin-bottom: 10px;">
	<div class="info_bar">
		<a href="<!--{$smarty.const.HTTPS_URL}-->quickorder/index.php" style="min-width:224px;">
			<img src="<!--{$smarty.const.HTTPS_URL}-->user_data/packages/default/img/button/btn_kantan.png" class="overimg">
		</a>
		<a href="<!--{$smarty.const.HTTPS_URL}-->products/list.php?mode=search" style="min-width:124px;">
			<img src="<!--{$smarty.const.HTTPS_URL}-->user_data/packages/default/img/button/btn_shousai.png" alt="詳細検索"" class="overimg">
		</a>

		<form action="/products/list.php" name="search_form" method="get" style="display:flex; width:100%;">
			<div class="input-group-addon navbar_select">
				<label>
					<select name="category_id" class="form-control">
						<option value="">カテゴリ指定なし</option>
						<option value="1" <!--{if $header_search_category == 1 }-->selected <!--{/if}--> >基礎関連</option>
						<option value="15" <!--{if $header_search_category == 15 }-->selected <!--{/if}--> >構造金物</option>
						<option value="56" <!--{if $header_search_category == 56 }-->selected <!--{/if}--> >耐震・制震</option>
						<option value="59" <!--{if $header_search_category == 59 }-->selected <!--{/if}--> >釘・ネジ</option>
						<option value="87" <!--{if $header_search_category == 87 }-->selected <!--{/if}--> >機械打用釘・ビス</option>
						<option value="101" <!--{if $header_search_category == 101 }-->selected <!--{/if}--> >接着剤</option>
						<option value="117" <!--{if $header_search_category == 117 }-->selected <!--{/if}--> >養生・保護材</option>
						<option value="109" <!--{if $header_search_category == 109 }-->selected <!--{/if}--> >防水材</option>
						<option value="233" <!--{if $header_search_category == 233 }-->selected <!--{/if}--> >手摺</option>
						<option value="1084" <!--{if $header_search_category == 1084 }-->selected <!--{/if}--> >棚柱・収納</option>
						<option value="127" <!--{if $header_search_category == 127 }-->selected <!--{/if}--> >内装部材</option>
						<option value="600" <!--{if $header_search_category == 600 }-->selected <!--{/if}--> >水廻り</option>
						<option value="145" <!--{if $header_search_category == 145 }-->selected <!--{/if}--> >物干し</option>
						<option value="147" <!--{if $header_search_category == 147 }-->selected <!--{/if}--> >外装部材</option>
						<option value="1094" <!--{if $header_search_category == 1094 }-->selected <!--{/if}--> >アルミ型材</option>
						<option value="1028" <!--{if $header_search_category == 1028 }-->selected <!--{/if}--> >照明</option>
						<option value="1024" <!--{if $header_search_category == 1024 }-->selected <!--{/if}--> >表札</option>
						<option value="1019" <!--{if $header_search_category == 1019 }-->selected <!--{/if}--> >ポスト</option>
						<option value="155" <!--{if $header_search_category == 155 }-->selected <!--{/if}--> >換気部材</option>
						<option value="171" <!--{if $header_search_category == 171 }-->selected <!--{/if}--> >水切り・防鼠付水切り</option>
						<option value="179" <!--{if $header_search_category == 179 }-->selected <!--{/if}--> >現場用品</option>
						<option value="230" <!--{if $header_search_category == 230 }-->selected <!--{/if}--> >断熱材</option>
						<option value="300" <!--{if $header_search_category == 300 }-->selected <!--{/if}--> >充電工具</option>
						<option value="350" <!--{if $header_search_category == 350 }-->selected <!--{/if}--> >エアー工具</option>
						<option value="400" <!--{if $header_search_category == 400 }-->selected <!--{/if}--> >電動工具</option>
						<option value="420" <!--{if $header_search_category == 420 }-->selected <!--{/if}--> >電動工具刃物</option>
						<option value="440" <!--{if $header_search_category == 440 }-->selected <!--{/if}--> >電動工具アクセサリ</option>
						<option value="470" <!--{if $header_search_category == 470 }-->selected <!--{/if}--> >エンジン工具</option>
						<option value="460" <!--{if $header_search_category == 460 }-->selected <!--{/if}--> >墨出器・距離計</option>
						<option value="1035" <!--{if $header_search_category == 1035 }-->selected <!--{/if}--> >測定・検査</option>
						<option value="1049" <!--{if $header_search_category == 1049 }-->selected <!--{/if}--> >大工道具</option>
						<option value="1060" <!--{if $header_search_category == 1060 }-->selected <!--{/if}--> >電設工具</option>
						<option value="490" <!--{if $header_search_category == 490 }-->selected <!--{/if}--> >作業工具</option>
						<option value="480" <!--{if $header_search_category == 480 }-->selected <!--{/if}--> >作業用品</option>
					</select>
				</label>
			</div>

			<dl class="search">
				<dt>
					<input id="search_target" type="text" name="keyword" value="<!--{$header_search_keyword}-->" placeholder="キーワード入力" autocomplete="off" class="searchbox">
					<div class="poplink pc022 poplink_invisible" style="position: absolute; left: 0px; visibility:hidden;">
						<div class="poplink_suggest poplink_invisible">
							<div class="word poplink_invisible"></div>
							<div class="word poplink_invisible"></div>
							<div class="word poplink_invisible"></div>
							<div class="word poplink_invisible"></div>
							<div class="word poplink_invisible"></div>
						</div>
						<div class="poplink_search poplink_invisible">
							<div class="header">商品検索</div>
							<div class="item">
								<a>
									<div class="item_left">
										<div class="image_box"><img></div>
									</div>
									<div class="item_right">
										<div class="title"></div>
										<div class="summary"></div>
										<div class="any1"></div>
										<div class="any2"></div>
										<div class="any3"></div>
									</div>
									<div class="clear"></div>
								</a>
								<div class="userarea"></div>
							</div>
							<div class="item">
								<a>
									<div class="item_left">
										<div class="image_box"><img></div>
									</div>
									<div class="item_right">
										<div class="title"></div>
										<div class="summary"></div>
										<div class="any1"></div>
										<div class="any2"></div>
										<div class="any3"></div>
									</div>
									<div class="clear"></div>
								</a>
								<div class="userarea"></div>
							</div>
							<div class="item">
								<a>
									<div class="item_left">
										<div class="image_box"><img></div>
									</div>
									<div class="item_right">
										<div class="title"></div>
										<div class="summary"></div>
										<div class="any1"></div>
										<div class="any2"></div>
										<div class="any3"></div>
									</div>
									<div class="clear"></div>
								</a>
								<div class="userarea"></div>
							</div>
						</div>
						<div class="poplink_recommend poplink_invisible">
							<div class="header">おすすめ</div>
							<div class="item">
								<a>
									<div class="item_left">
										<div class="image_box"><img></div>
									</div>
									<div class="item_right">
										<div class="title"></div>
										<div class="summary"></div>
										<div class="any1"></div>
										<div class="any2"></div>
										<div class="any3"></div>
									</div>
									<div class="clear"></div>
								</a>
								<div class="userarea"></div>
							</div>
							<div class="item">
								<a>
									<div class="item_left">
										<div class="image_box"><img></div>
									</div>
									<div class="item_right">
										<div class="title"></div>
										<div class="summary"></div>
										<div class="any1"></div>
										<div class="any2"></div>
										<div class="any3"></div>
									</div>
									<div class="clear"></div>
								</a>
								<div class="userarea"></div>
							</div>
							<div class="item">
								<a>
									<div class="item_left">
										<div class="image_box"><img></div>
									</div>
									<div class="item_right">
										<div class="title"></div>
										<div class="summary"></div>
										<div class="any1"></div>
										<div class="any2"></div>
										<div class="any3"></div>
									</div>
									<div class="clear"></div>
								</a>
								<div class="userarea"></div>
							</div>
						</div>
					</div>
				</dt>
				<dd class="searchicon">
					<input type="submit" value="" class="search_btn">
				</dd>
			</dl>
			<input type="hidden" name="so" value="header" />
		</form>
	</div>
</div>
</div>
<!--
<div>
<table id="QuickOrder" data-row-number="10">
        <tbody><tr>
            <th width="20%" class="alignC">注文番号</th>
            <th width="15%" class="alignC quantityAmount">数量</th>
            <th width="65%" class="alignC">商品名</th>
        </tr>
        <tr class="quickOrderTemplate">
            <td class="productCodeInput">
                <input type="tel" name="product[row-number][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[row-number][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[row-number][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input" onblur="">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[1][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[1][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[1][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[2][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[2][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[2][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[3][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[3][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[3][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[4][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[4][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[4][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[5][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[5][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[5][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[6][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[6][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[6][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[7][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[7][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[7][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[8][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[8][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[8][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[9][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[9][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[9][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
                <tr>
            <td class="productCodeInput">
                <input type="tel" name="product[10][code]" pattern="[0-9]*" value="" class="alignR productCode quickorder-input">
                <input type="hidden" name="product[10][id]" value="">
            </td>
            <td class="numberInput">
                <input name="product[10][quantity]" type="tel" pattern="[0-9]*" value="" class="alignR productQuantity quickorder-input">
            </td>
            <td>
                <div class="productInfoArea"></div>
                <div style="clear: both"></div>
                <label class="productCodeErrorArea errorArea"></label>
                <label class="quantityErrorArea errorArea"></label>
            </td>
        </tr>
            </tbody></table>
</div>
            -->
<!--
<div id="takumi_itsutsu">
<a href="https://www.takumi-probook.jp/user_data/takumi5.php" class="itsutsu">
        <span style="color:#009844;">
            <img src="/user_data/packages/default/img/banner/banner_top_2.svg" alt="【建築資材の通信販売!「匠の一冊」5つのポイント】1.すぐに届く! 2.バラで買える! 3.送料無料! 4.現場に送れる! 5.土曜日出荷OK！" style="width:900px;">
            <p class="point5_click">詳しくはクリック！</p>
        </span>
        <span>
            <img src="/user_data/packages/default/img/banner/banner_top_1.svg" alt="【建築資材の通信販売!「匠の一冊」5つのポイント】1.すぐに届く! 2.バラで買える! 3.送料無料! 4.現場に送れる! 5.土曜日出荷OK！" style="width:530px;">
        </span>
    </a>
</div>
-->

<!--▲HEADER-->

<script>
    // カート内アイテムを取得
    /*
    function getcartitems(){
        $.ajax({
            url:'<!--{$smarty.const.HTTPS_URL}-->/user_data/headerapi.php?mode=cart',
            type: 'GET',
            beforeSend: function(){
                $('#header_cart_list').html('取得中...');
            }
        })
            .done( (data) => {
                $('#header_cart_list').html(data);
                //Log_start
                //console.log(data);
                //Log_end
            })
            .fail( (data) => {
                console.log(data);
            });
    }
    */
</script>
