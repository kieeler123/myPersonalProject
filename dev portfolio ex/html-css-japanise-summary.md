📘 HTML & CSS チートシート（開発者ポートフォリオ向け / 日本語版）

本ドキュメントは、HTML と CSS の基礎から実務で頻繁に使用する要素までを体系的にまとめた学習・参照用の資料です。
コード例・役割・使用シーン・類似要素との比較などを含め、基本知識を確実に理解し、面接・技術説明の場でアピールできる構成となっています。

1. HTML 実務例：ポートフォリオページ

以下は、セマンティック HTML、テーブル、リスト、フォーム、メディア、レスポンシブ対応など
フロントエンドの基本要素を一度に理解できるサンプルコードです。

2. HTML タグ一覧（役割別）
   ■ 2.1 文書構造 / メタ情報
   タグ 役割
   <!DOCTYPE html>	HTML5宣言（ブラウザに標準モードでレンダリングさせる）
   html 文書のルート要素、lang="ja" など言語指定
   head メタ情報、タイトル、スタイル、外部リソース
   meta 文字コード、説明、viewport 設定
   title ブラウザタブのタイトル
   style 文書内の CSS
   body 画面に表示されるコンテンツ全体
   ■ 2.2 セマンティック構造
   タグ 役割
   header ページまたはセクションのヘッダー領域
   nav ナビゲーションリンク
   main 文書の主要コンテンツ（1 ページに 1 つが理想）
   section テーマ単位の区切り
   article 独立したコンテンツ（ブログ記事、カードなど）
   footer フッター、著作権、補足情報
   ■ 2.3 テキスト要素
   タグ 役割
   h1〜h3 見出し階層
   p 段落
   strong 重要性の強調（意味を持つ強調）
   em 文脈上の強調（語調）
   mark ハイライト
   code コード・キーワードの表示
   time 日付・時刻
   abbr 略語に対する補足説明
   ■ 2.4 リスト・テーブル
   タグ 役割
   ul 箇条書きリスト
   ol 番号付きリスト
   li リスト項目
   table データ表
   thead 表ヘッダー
   tbody 表本体
   tr 表の行
   th 見出しセル
   td データセル
   ■ 2.5 メディア・インタラクション
   タグ 役割
   figure 画像・メディアのまとまり
   figcaption 説明キャプション
   img 画像
   video 自前の動画再生
   source 動画/音声のソース
   iframe YouTube や外部サービス埋め込み
   details 折りたたみ UI
   summary details の要約行
   ■ 2.6 フォーム
   タグ 役割
   form 入力フォーム全体
   label 入力項目のラベル
   input 単一行入力（text/email など）
   select ドロップダウン
   option 選択肢
   textarea 複数行入力
   button 送信ボタン
3. CSS プロパティ一覧（役割別）
   ■ 3.1 レイアウト
   ● display
   値 説明
   block 行全体を占有
   inline コンテンツ幅のみ。枠が設定できない
   inline-block inline + width/height 可能
   flex 1 次元レイアウト
   grid 2 次元レイアウト
   none 非表示
   ● position
   値 基準 説明
   static 文書フロー デフォルト
   relative 自身 基準点のみ移動
   absolute relative 祖先 自由配置
   fixed 画面 スクロール固定
   sticky 画面 一定位置で固定
   ● Flexbox の基本
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   gap: 16px;

● Grid の基本
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 20px;

■ 3.2 ボックスモデル
プロパティ 説明
width / height 要素サイズ
margin 外側の余白
padding 内側の余白
border 枠線
border-radius 角丸
box-sizing border-box 推奨
■ 3.3 タイポグラフィ
プロパティ 説明
font-size 文字サイズ
font-weight 太さ
line-height 行間
font-family フォント
text-align left, center, right
text-decoration 下線、取り消し線
color 文字色
■ 3.4 背景・色
プロパティ 説明
background / background-color 背景色
background-image 背景画像
background-size cover/contain
background-position 位置
■ 3.5 シャドウ & インタラクション
box-shadow: 0 2px 8px rgba(0,0,0,0.12);
transition: 0.2s ease;
transform: translateY(-2px);

■ 3.6 フォームスタイル

outline: none

:focus, :hover, :active

box-shadow を使ったアクセシビリティ強化

■ 3.7 レスポンシブ（Media Query）
@media (max-width: 640px) {
...
}

4. よくある比較（面接で話しやすいポイント）
   ● div vs section vs article
   要素 役割 使いどころ
   div 意味なし（スタイル用） 汎用コンテナ
   section テーマ区分 “紹介 / スキル” など
   article 独立可能な内容 ブログ記事/カード
   ● video vs iframe
   video iframe
   自前の動画再生 外部サービス埋め込み
   カスタマイズ可能 UI は外部依存
   ● inline / inline-block / block
   値 行を占有 サイズ変更 用途
   inline ✕ ✕ テキスト
   inline-block ✕ ○ ボタン
   block ○ ○ セクション要素
   ● margin vs padding
   margin padding
   外側の余白 内側の余白
   要素同士の距離 コンテンツと枠線の距離
