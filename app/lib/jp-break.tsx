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

// iPhone の Safari は <wbr> だけでは「（」の直後などで改行してしまうことがあるため、
// 文節ごとに折り返し禁止の span で包む。ただし長すぎる文節を包むと
// 狭い画面ではみ出すおそれがあるので、一定の長さ以下の文節だけを包む。
const MAX_NOWRAP_LENGTH = 12;

const OPEN_BRACKETS = "（「『【";
const CLOSE_BRACKETS = "）」』】";
const PARTICLE_ONLY = /^[はがをにのとでもへやか]$/;

/**
 * BudouX の文節を、見出し向けに次のルールで手直しする。
 * - かっこの内側では改行しない（「（」の直後や「レジオネ／ラ菌」で切れないように）
 * - ただし長いかっこ書きは「・」の直後でだけ改行できるようにする
 * - 「へ」「が」など助詞1文字だけの文節は前につなげる（行頭に助詞が来ないように）
 */
function segment(text: string): string[] {
  const merged: string[] = [];
  let depth = 0;
  for (const phrase of parser.parse(text)) {
    const last = merged[merged.length - 1];
    const joinToPrev =
      last !== undefined && ((depth > 0 && !last.endsWith("・")) || PARTICLE_ONLY.test(phrase));
    if (joinToPrev) merged[merged.length - 1] = last + phrase;
    else merged.push(phrase);
    for (const ch of phrase) {
      if (OPEN_BRACKETS.includes(ch)) depth++;
      else if (CLOSE_BRACKETS.includes(ch) && depth > 0) depth--;
    }
  }
  return merged.flatMap((phrase) =>
    phrase.length > MAX_NOWRAP_LENGTH ? phrase.split(/(?<=・)/) : [phrase]
  );
}

export function withWbr(text: string): ReactNode[] {
  return segment(text).map((phrase, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {phrase.length <= MAX_NOWRAP_LENGTH ? (
        <span className="whitespace-nowrap">{phrase}</span>
      ) : (
        phrase
      )}
    </Fragment>
  ));
}
