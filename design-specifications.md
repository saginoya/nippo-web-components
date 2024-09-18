# 日報サイト WEB コンポーネント設計書

## Components

- BaseUl リストの外枠（共通）
- BaseLi リストのアイテム（共通）
- DnTag タグ（包装・環境）
- DnTagCat タグ（廃棄物・包装産業などのカテゴリー）
- DnListNew デイリーニュースの新着一覧（両方・包装・環境の切り替え／表示件数指定）
- DnListDefault デイリーニュースの一覧（包装・環境の切り替え／表示期間指定）
- DnListHeader デイリーニュースの詳細一覧のヘッダー（現在表示されている期間を明示）
- DnListDetails デイリーニュースの詳細一覧（包装・環境の切り替え／表示期間指定）
- DnArticle デイリーニュースの記事詳細
- DnSelectMonth デイリーニュースページのプルダウン（表示期間切り替え）
- NpListDefault 新聞の詳細一覧（HT・JKの切り替え／表示期間指定）
- NpArticleDefault 新聞の記事詳細
- NpListPast 新聞の詳細一覧過去（HT・JKの切り替え／表示期間指定）
- NpArticlePast 新聞の記事詳細過去
- NpSelectMonth 新聞の期間指定一覧

## Composable

- useParams URLのパラメータを取得
- useStateDate 日付の状態管理
- useStateMode モードの状態管理
- useJson JSONファイルの取得
- useArticleFilter 記事一覧のフィルター
- useArticleSort 記事一覧のソート
- useFormatDate 日付のフォーマット
- useDailyNews デイリーニュースの独自
- useNewsPaper 新聞の独自

## Types

- dates 年月日についての型
- modes 表示モードについての型
- dailyNews デイリーニュース記事の型
- newsPaper 新聞の記事の型
