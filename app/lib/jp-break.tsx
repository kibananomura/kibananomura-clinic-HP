import { Fragment, type ReactNode } from "react";
// budoux のメインエントリは window を参照する DOM 用モジュールも読み込むため、
// サーバー側の静的生成でも動くよう、パーサー本体と日本語モデルだけを直接読み込む。
import { Parser } from "budoux/dist/parser";
import { model as jaModel } from "budoux/dist/data/models/ja";

/**
 * 日本語の見出し・カードタイトル用に、文節の切れ目へ改行候補（<wbr>）を入れる。
 * 文節の判定には BudouX（Google の日本語文節分割ライブラリ）を使う。
 * `.jp-wrap` または見出しの word-break: keep-all と組み合わせると、
 * 「レジオネ／ラ菌」のような単語の途中での改行や、行頭に「？」が来る改行を避けられる。
 */
const parser = new Parser(jaModel);

export function withWbr(text: string): ReactNode[] {
  return parser.parse(text).map((phrase, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {phrase}
    </Fragment>
  ));
}
