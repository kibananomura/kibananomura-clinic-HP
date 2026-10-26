---
date: 2026.09.28
cover: /blog/kibana-landscape.png
category_ja: 院長のキャリア
category_en: Director's career
title_ja: 「光でがんを温める」研究に打ち込んでいた頃の話
title_en: Back when I was researching how to heat cancer with light
excerpt_ja: 今年7月、「がん細胞を光の熱で壊す」研究がニュースになりました。実はこの治療、私が大学院時代に打ち込んでいた研究テーマでもあります。
excerpt_en: This July, research on destroying cancer cells with heat from light made the news. As it happens, this was the very treatment I devoted myself to researching in graduate school.
---

## ja

今年（2026年）7月、「がん細胞を熱で破壊する『光熱療法』実現へ新技術」というニュースが、Yahoo!ニュースにも掲載されました（ニュースイッチ／日刊工業新聞社）。東北大学などの研究グループが、光を熱に変える微粒子をがんに届けやすくする新しい技術を開発し、マウスの大腸がんが消失したという内容です。ご覧になった方もいらっしゃるかもしれません。

「がんを光で治す」と聞くと期待が膨らむ一方で、「本当にもう受けられるの？」「どこまで進んでいるの？」と、かえって分からなくなってしまう方も少なくないと思います。

実はこのニュースを見て、懐かしい気持ちになりました。私は外科医としての経験を積んだあと、防衛医科大学校の大学院（医学研究科）で、まさにこの「光を使ってがんを温める治療」の研究に取り組んでいたからです。ニュースをきっかけに、今回はその成果として発表した論文と、日本ハイパーサーミア学会の会報に寄稿した解説をもとに、当時の研究を分かりやすくご紹介します。読み終えるころには、こうしたニュースを見たときに「これは今どの段階の話なのか」を落ち着いて受け止める手がかりになるはずです。

### 結論から言うと

私たちの研究で分かったことを一言でまとめると、**「光の強さや当てる時間よりも、がんの温度を43℃以上に保てたかどうかが、効果を決めていた」**ということです。そこで、照射中のがんの温度を測りながら、光の強さを自動で調整する仕組みを開発しました。

ただし、これは**マウスを使った動物実験の段階の研究**です。人の治療として承認されたものではなく、当院でこの治療を行うこともありません。その前提で、中身をお話しします。

### 「光温熱治療」とはどんな治療か

光温熱治療（PTT：Photothermal Therapy）は、熱でがん細胞を死滅させる治療で、「温熱療法（ハイパーサーミア）」の仲間です。体の中まで届きやすい「近赤外光」という光と、その光を吸収して熱に変える薬剤（光吸収剤）を組み合わせて使います。

仕組みはシンプルです。まず、がんに集まりやすい性質を持たせた光吸収剤を静脈から注射します。薬ががんに集まるのを待ってから、がんのある場所に近赤外光を当てると、光吸収剤が集まったがんの部分が温まります。**「光を当てる場所」と「薬が集まる場所」の二重の狙い撃ち**によって、周りの正常な組織への熱のダメージを抑えられると考えられており、体への負担が少ない治療として期待されてきました。

### 研究で見えてきた課題：「光の量」だけでは効果が読めない

ところが、この治療には悩ましい問題がありました。一般に、光の強さと当てる時間は照射の前に決めておきます。しかし、がんの大きさや中身のばらつき、薬の行き渡り方は一つひとつ違うため、**同じ条件で光を当てても、効くがんと効かないがんが出てしまう**のです。取りこぼしを避けるために光を強め・長めに当てると、今度はがんが50℃を超えるほど熱くなり、周りの組織にやけどや炎症を起こしやすくなります。

私たちは、がんに集まりやすい微小な粒子に、近赤外光を吸収する色素「ICG（インドシアニングリーン）」を組み込んだ「ICGラクトソーム」という薬剤を使い、マウスの大腸がん細胞を背中の皮膚に移植したモデルで実験を行いました。光の強さを4段階、当てる時間を5段階に変えて組み合わせ、照射中のがんの表面温度を測り続けたところ、はっきりした傾向が見えてきました。

- 光の強さや時間と、がんが消えるかどうかの間には、**一貫した関係は見られなかった**
- 一方、照射中にがんの温度が **43℃を超えた** 場合は、光の強さに関係なく、**49個中47個のがんが消失**した（消えなかった2個は、照射時間が最も短い111秒の群でした）

つまり、効くかどうかの分かれ目は「光の量」ではなく「がんの温度」にあり、**狙った温度に届き、それを保てるかどうか**が治療の成否を左右していたのです。

### 温度を測りながら光を調整する仕組み

そこで開発したのが、温度制御型の光温熱治療（寄稿では「tecPTT」と呼んでいます）です。レーザー装置に、赤外線で「触れずに温度を測る装置」をつなぎ、照射している場所の温度を0.1秒ごとに測りながら、**目標の温度を保つように光の強さを自動で調整する**仕組みです。この装置の性能を確かめた最初の論文では、マウスの皮膚に光を当てた際の温度のぶれを、温度制御なしのときの10分の1以下（ばらつき約0.14℃）に抑えられることを示しました。

続いて、この仕組みを使い、目標温度を40℃・41℃・42℃・43℃に設定して、がんの経過を比べました（各5匹）。

- 40℃・41℃：がんが消えたのは **0匹**
- 42℃：**5匹中3匹** で消失
- 43℃：**5匹すべて** で消失

わずか2℃の違いで、結果がまったく変わったのです。また、がんのない場所に光を当てても温度はほとんど上がらず、薬ががん以外にはほとんど集まっていないことも確かめました。温度を「狙って保てる」ようになったことで、必要以上に熱くしなくても確実な効果を得られる可能性が見えてきました。人の治療へと発展させていくための足がかりになると考えています。なお、照射部位の温度を測りながら治療する光治療システムとして、国際特許出願も行いました（WO2018/061201）。

一方で、限界もあります。測っていたのはがんの「表面」の温度で、内部の温度までは確認できていません。また、調べたのはマウスの大腸がん1種類だけで、他のがんでは効く温度が違うかもしれません。

### どんながんに役立つ可能性があるか

光は体の奥深くまでは届きにくいため、この治療が向いているのは、主に**体の表面に近いところや、内視鏡などで光を届けられる場所のがん**だと考えられます。寄稿では、将来の候補として次のような場面を挙げました。

- 放射線治療や化学放射線療法のあとに、局所に残ったり再発したりした食道がん
- 消化管や気管の内側をふさいでしまい、治療器具を通すのが難しいがん
- 大腸がんや卵巣がんがお腹の中に散らばった病変のうち、表面にある限られた病変

今後は、よりがんに集まりやすく、がんだけを狙い撃ちできる光吸収剤の開発が求められています。冒頭のニュースの研究は、まさにこの「薬をがんに届ける」部分と、「光を体の奥に届ける」部分（細い内視鏡を針に収めて、がんの内側から光を当てる方法）に取り組んだものです。同じ分野の研究が着実に前に進んでいることを、うれしく感じています。

ただし、ニュースの研究もマウスでの結果で、人での臨床試験はこれからの段階です。「ニュースになった＝すぐに受けられる」ではない、という点は、ぜひ知っておいていただきたいと思います。

### 院長からのメッセージ

この研究を通じて私が学んだのは、**「なんとなく効いていそう」ではなく、測って確かめることの大切さ**でした。同じ治療でも、温度がわずか2℃違うだけで結果が正反対になる。その経験は、研究の現場を離れた今も、私の診療の土台になっています。

血圧や血糖値、検査の数値、そして患者さんの「いつもと違う」という感覚。日々の診察でも、思い込みで判断せず、きちんと確かめてから一緒に方針を考える。そんな姿勢を、木花の地で大切にしていきたいと思っています。

最近は、新しいがん治療のニュースを目にする機会も増えました。「これって自分にも関係あるの？」「今受けられる治療なの？」と気になったときは、開院後、どうぞ気軽にお尋ねください。今どの段階の研究なのかも含めて、分かりやすくお話しします。

※本記事は、以下の論文・寄稿（いずれも防衛医科大学校の共同研究者と共著）の内容を、一般の方向けに書き直したものです。紹介した結果はすべて動物実験によるもので、人での有効性・安全性が確認された治療ではありません。

- Nomura S, et al. Highly reliable, targeted photothermal cancer therapy combined with thermal dosimetry using a near-infrared absorbent. Scientific Reports. 2020;10:9765.
- Nomura S, et al. Thermal Sensor Circuit Using Thermography for Temperature-Controlled Laser Hyperthermia. Journal of Sensors. 2017;2017:3738046.
- 野村信介ほか「これからの光温熱治療開発の方向性」日本ハイパーサーミア学会ニュース No.150「最近の話題」（2021年）

## en

In July this year (2026), a news story titled, roughly, "New technology brings photothermal therapy — destroying cancer cells with heat — closer to reality" ran on Yahoo! News Japan (originally from Newswitch / Nikkan Kogyo Shimbun). A research group including Tohoku University had developed a new way to deliver light-to-heat particles to tumors more effectively, and colon cancer in mice disappeared. Some of you may have seen it.

Hearing "treating cancer with light" raises hopes — but it can also leave you more confused: "Can I actually get this now?" "How far along is it, really?"

Seeing that story actually made me a little nostalgic. After gaining experience as a surgeon, I went on to the graduate school of medicine at the National Defense Medical College, where I researched exactly this: using light to heat cancer. Prompted by the news, in this post, based on the papers we published and a commentary I contributed to the newsletter of the Japanese Society for Thermal Medicine, I'd like to explain that research in plain terms. By the end, I hope you'll have a better sense of how to read news like this calmly — and how to tell what stage a given treatment is actually at.

### The short version

If I had to sum up what we found in one sentence: **what decided the outcome wasn't the strength or duration of the light, but whether the tumor was kept at 43°C or higher.** So we developed a system that measures the tumor's temperature during treatment and automatically adjusts the strength of the light.

To be clear, though, **this was animal research, carried out in mice.** It is not an approved treatment for people, and it is not something our clinic offers. With that in mind, here's what the research involved.

### What is photothermal therapy?

Photothermal therapy (PTT) kills cancer cells with heat and belongs to the family of hyperthermia treatments. It combines near-infrared light, which can pass into the body relatively easily, with a drug that absorbs that light and turns it into heat (a light absorber).

The idea is simple. First, a light absorber designed to gather in tumors is injected into a vein. After waiting for it to collect in the tumor, near-infrared light is shone on the tumor area, and the part of the tumor where the absorber has gathered heats up. **This double targeting, "where the light goes" and "where the drug gathers,"** is thought to limit heat damage to the surrounding healthy tissue, which is why PTT has been seen as a promising, low-burden treatment.

### The problem we found: the amount of light alone doesn't predict the result

But this treatment had a frustrating problem. Usually, the strength of the light and how long to shine it are decided in advance. Yet every tumor differs in size, internal makeup and how the drug spreads through it, so **the same settings could work on one tumor and fail on another.** Shining the light harder and longer to avoid missing anything can heat the tumor past 50°C, which makes burns and inflammation in the surrounding tissue more likely.

We used a drug called "ICG lactosome" — tiny particles designed to gather in tumors, carrying a near-infrared-absorbing dye called ICG (indocyanine green) — in mice with colon cancer cells implanted in the skin of their backs. We combined four levels of light strength with five irradiation times and kept measuring the tumor's surface temperature during irradiation. A clear pattern emerged:

- There was **no consistent relationship** between light strength or duration and whether the tumor disappeared
- But when the tumor's temperature **rose above 43°C** during irradiation, **47 of 49 tumors disappeared**, regardless of light strength (the two that didn't were both in the shortest, 111-second group)

In other words, the dividing line wasn't the amount of light but the tumor's temperature, and **whether the target temperature could be reached and held** decided whether the treatment worked.

### A system that adjusts the light while measuring the temperature

That's what led us to develop temperature-controlled PTT (called "tecPTT" in the newsletter article). A non-contact infrared temperature sensor is connected to the laser device, so the temperature of the irradiated spot is measured every 0.1 seconds, and **the light's strength is adjusted automatically to hold the target temperature.** In our first paper testing this device, we showed that when irradiating mouse skin, it kept temperature fluctuations to less than one-tenth of those without temperature control (a spread of about 0.14°C).

Next, using this system, we set target temperatures of 40°C, 41°C, 42°C and 43°C and compared what happened to the tumors (five mice each):

- 40°C and 41°C: tumors disappeared in **none** of the mice
- 42°C: tumors disappeared in **3 of 5**
- 43°C: tumors disappeared in **all 5**

A difference of just two degrees changed the result completely. We also confirmed that shining the light on areas without a tumor barely raised the temperature, showing that the drug hardly gathered anywhere other than the tumor. Being able to aim for a temperature and hold it there suggested that reliable results might be possible without heating more than necessary — a foothold, we believe, for developing this into a treatment for people. We also filed an international patent application for a light-therapy system that treats while measuring the temperature of the irradiated area (WO2018/061201).

There are limitations, too. We measured the tumor's surface temperature and couldn't confirm the temperature inside it. And we studied only one type of cancer — colon cancer in mice — so the effective temperature may differ for other cancers.

### Which cancers might it help with?

Because light doesn't travel deep into the body, this approach is thought to suit mainly **cancers near the body's surface, or in places light can be delivered, for example through an endoscope.** In the newsletter article, we listed possible future candidates such as:

- Esophageal cancer that remains or recurs locally after radiation therapy or chemoradiotherapy
- Cancers that block the inside of the digestive tract or airways, making it hard to pass treatment instruments through
- Limited, surface-level lesions among colorectal or ovarian cancer that has spread within the abdomen

Going forward, the field needs light absorbers that gather in tumors even more readily and target cancer alone. The research in the news story tackled exactly this — getting the drug to the tumor — along with getting light deep into the body (by housing a thin endoscope inside a needle and shining light from inside the tumor). I'm genuinely glad to see steady progress in this field.

That said, the research in the news was also done in mice, and clinical trials in people are still ahead. "It made the news" doesn't mean "you can get it right away" — that's something I'd really like you to keep in mind.

### A message from the director

What this research taught me was **the importance of measuring and confirming, rather than settling for "it seems to be working."** The same treatment could produce opposite results with a difference of just two degrees. That experience still underpins how I practice medicine today, long after leaving the lab.

Blood pressure, blood sugar, test results — and a patient's own sense that "something feels different." In everyday care, too, I want to avoid judging by assumption, confirm things properly, and then decide on a plan together with you. That's the approach I hope to carry with me here in Kibana.

News about new cancer treatments seems to come up more and more these days. If you ever find yourself wondering "Does this apply to me?" or "Is this something I can actually get now?", please feel free to ask once we open. I'll explain it clearly — including what stage the research is really at.

※This post is a plain-language rewrite of the following papers and commentary (all co-authored with fellow researchers at the National Defense Medical College). All results described come from animal experiments; this is not a treatment whose effectiveness or safety has been confirmed in people.

- Nomura S, et al. Highly reliable, targeted photothermal cancer therapy combined with thermal dosimetry using a near-infrared absorbent. Scientific Reports. 2020;10:9765.
- Nomura S, et al. Thermal Sensor Circuit Using Thermography for Temperature-Controlled Laser Hyperthermia. Journal of Sensors. 2017;2017:3738046.
- Nomura S, et al. "Direction for development of photothermal therapy." Japanese Society for Thermal Medicine Newsletter No. 150, "Recent Topics" (2021).
