export type CareerPosition = {
  id: string;
  hidden?: boolean;
  ja: {
    title: string;
    badge: string;
    summary: string;
    duties: string[];
    requirements: string[];
    conditions?: { label: string; value: string }[];
    note?: string;
  };
  en: {
    title: string;
    badge: string;
    summary: string;
    duties: string[];
    requirements: string[];
    conditions?: { label: string; value: string }[];
    note?: string;
  };
};

export const CAREERS_PAGE = {
  ja: {
    eyebrow: "医療関係者向け",
    heading: "採用・求人募集",
    intro:
      "木花診療所では、2027年10月1日の開院に向けて、一緒にクリニックをつくっていただける医療・事務スタッフを募集しています。1日約70名程度の外来を支える体制づくりのため、看護師・事務の各職種でご相談を承ります。",
    overviewHeading: "クリニック概要",
    overviewItems: [
      { label: "開院", value: "2027年10月1日 予定（現在 建設準備中）" },
      { label: "所在地", value: "宮崎市熊野5233-2" },
      { label: "診療科", value: "内科・消化器内科・アレルギー内科・呼吸器内科・外科・小児科" },
      { label: "外来規模", value: "1日 約70名程度 を想定" },
      { label: "勤務時間", value: "月〜金（土日祝休み）" },
    ],
    teamVisionLabel: "採用の想い",
    teamVisionBody:
      "全ては、患者さんとご家族の笑顔のために。木花のむら診療所は、この理念に共感し、職種の垣根なく学び合える仲間を探しています。",
    directorMessageLabel: "院長からのメッセージ",
    directorMessageName: "院長　野村信介",
    directorMessageBody: [
      "木花のむら診療所は「患者さんもスタッフもみんなを笑顔にするクリニック」を理念に掲げています。患者さんの笑顔は、スタッフが安心して働ける環境があってはじめて生まれるものだと考えています。",
      "私の役割は、完璧な経営者としてスタッフを管理することではありません。むしろ、皆さんが患者さんと向き合う時間を大切にできるように現場の環境を整え、判断に迷うときや困難なときには自分が矢面に立つこと——それが院長としての私の務めだと思っています。",
      "内科・消化器内科・アレルギー内科・呼吸器内科・外科・小児科と幅広い診療科を掲げる分、一人ひとりの専門性やこれまでの経験を活かしていただける場面がたくさんあります。新しい診療所を、これから一緒につくっていける方をお待ちしています。",
    ],
    valuesHeading: "大切にしている価値観",
    values: [
      {
        title: "全人的なケア",
        body: "病気だけでなく、患者さんとご家族の暮らし全体に目を向け、寄り添う姿勢を大切にします。",
      },
      {
        title: "職種の垣根を越えて助け合う（半学半教）",
        body: "小さな診療所だからこそ、自分の職種の範囲だけに閉じこもるのではなく、手が空いたときは他の職種の業務にも柔軟にフォローに回れる職場を目指しています。看護師・医療事務・診療放射線技師・臨床検査技師・管理栄養士など、互いに教え合い、支え合いながらチーム全体で医療の質を高めていきます。",
      },
      {
        title: "自己成長を楽しむ姿勢",
        body: "新しい仕組みづくりに前向きに取り組み、自分自身の成長を楽しめる方と働きたいと考えています。",
      },
    ],
    idealHeading: "求める人物像",
    idealIntro:
      "スキルや経験の有無よりも、当院の理念への共感とマインドを大切にしています。面接では「当院で何を成し遂げたいか」「周囲と協力しながら物事に取り組めるか」といった点を丁寧にお聞きしています。",
    idealItems: [
      "素直に学び、意見を受け入れられる方",
      "何事にも前向きに取り組める方",
      "自分の成果だけでなく、チーム全体を大切にできる方",
    ],
    snsNoticeLabel: "SNS等での情報発信について",
    snsNoticeBody:
      "当院では開院に向けてSNS・ホームページ等での情報発信を予定しており、スタッフの写真や日々の様子を紹介させていただくことがあります。写真の使用範囲（顔出しの可否、匿名化の可否等）については、入職前の面談で個別にご希望を伺い、可能な限り配慮いたします。ただし、顔出しでの発信が一切できない場合、業務内容によってはご希望に沿えないことがありますので、あらかじめご了承ください。",
    positionsHeading: "募集職種",
    dutiesLabel: "主な業務",
    requirementsLabel: "応募条件・歓迎",
    conditionsLabel: "募集要項",
    highlightsHeading: "当院の特徴",
    highlights: [
      "CT・胃カメラ・エコー・外科小手術など、検査・処置を院内で完結できる体制を目指しています。",
      "「よろず相談所」のように、気軽に相談できる地域密着型のクリニックを目指しています。",
      "新規開院のため、診療・運営の仕組みづくりに参画いただける方を歓迎します。",
      "勤務日数・時間帯は、ご希望やライフスタイルに合わせてご相談ください。",
    ],
    applyHeading: "お問い合わせ・ご応募",
    applyBody:
      "ご興味のある方は、下記よりお気軽にお問い合わせください。面談の日程や詳細条件は個別にご案内いたします。",
    applyLineButton: "LINE で問い合わせる",
    applyLineNote:
      "※ メッセージに「採用について」とお書き添えいただけるとスムーズです。",
    applyDisclaimer:
      "※ 掲載内容は予告なく変更・終了する場合があります。給与・待遇等の詳細は面談時にご説明いたします。",
  },
  en: {
    eyebrow: "For medical professionals",
    heading: "Recruitment",
    intro:
      "Kibana Medical Office is recruiting medical and administrative staff to help us open in October 2027. We are building a team to support approximately 70 outpatients per day and welcome inquiries from nurses and office staff.",
    overviewHeading: "About the clinic",
    overviewItems: [
      { label: "Opening", value: "Planned October 2027 (currently under construction)" },
      { label: "Location", value: "5233-2 Kumano, Miyazaki City" },
      { label: "Departments", value: "Internal medicine, gastroenterology, allergy, respiratory medicine, surgery, pediatrics" },
      { label: "Outpatient volume", value: "Approx. 70 patients per day" },
      { label: "Working hours", value: "Mon–Fri (closed Sat, Sun & holidays)" },
    ],
    teamVisionLabel: "Why we hire",
    teamVisionBody:
      "Everything for the smiles of our patients and their families. We're looking for teammates who share this philosophy and are willing to learn together across every role.",
    directorMessageLabel: "A message from our director",
    directorMessageName: "Director Shinsuke Nomura",
    directorMessageBody: [
      "Our philosophy is \"a clinic where both patients and staff can smile.\" We believe patients' smiles start with staff who feel safe and supported at work.",
      "My role isn't to manage staff as a flawless executive. It's to protect an environment where you can focus on your patients, and to stand at the front line myself when things get difficult or decisions are hard.",
      "With a broad range of departments — internal medicine, gastroenterology, allergy, respiratory medicine, surgery and pediatrics — there is plenty of room to bring your own expertise and experience to the table. We're looking for people who want to build a new clinic together, from the ground up.",
    ],
    valuesHeading: "What we value",
    values: [
      {
        title: "Whole-person care",
        body: "We look beyond the illness to the patient's and family's whole life, and stay close to them.",
      },
      {
        title: "Helping across roles, not confined to one (Hangaku Hankyo)",
        body: "As a small clinic, we want everyone — nurses, admin staff, radiologic technologists, medical technologists, dietitians and more — to look beyond the boundaries of their own role and step in to support other staff whenever they have a moment to spare. We teach and support each other across roles, raising the quality of care as one team.",
      },
      {
        title: "Enjoying your own growth",
        body: "We want colleagues who take on new challenges positively and enjoy growing along the way.",
      },
    ],
    idealHeading: "Who we're looking for",
    idealIntro:
      "We value your mindset and fit with our philosophy more than skills or experience alone. In interviews, we ask what you'd like to achieve here and how you work with others.",
    idealItems: [
      "Open-minded and willing to learn",
      "Positive about taking on new things",
      "Values the team's success, not just your own",
    ],
    snsNoticeLabel: "A note on social media",
    snsNoticeBody:
      "Ahead of opening, we plan to share updates on social media and our website, and may feature photos of staff and their day-to-day work. We'll ask about your preferences regarding photo use (whether you're comfortable appearing on camera, or would prefer to remain unidentified) individually before you join, and will accommodate this where we can. That said, if you are unable to appear on camera at all, this may limit which roles are a good fit, so please keep this in mind.",
    positionsHeading: "Open positions",
    dutiesLabel: "Main duties",
    requirementsLabel: "Requirements & welcome",
    conditionsLabel: "Employment conditions",
    highlightsHeading: "Why join us",
    highlights: [
      "We aim to complete CT, gastroscopy, ultrasound and minor surgery in-house.",
      "A community clinic where patients feel comfortable asking anything—an all-purpose consultation spot for the neighborhood.",
      "As a new clinic, you can help shape clinical and operational workflows from the start.",
      "Work days and hours can be discussed to fit your schedule.",
    ],
    applyHeading: "Inquiries & applications",
    applyBody:
      "If you are interested, please contact us below. We will arrange an interview and share details individually.",
    applyLineButton: "Contact via LINE",
    applyLineNote:
      '* Please include "Recruitment inquiry" in your message.',
    applyDisclaimer:
      "* Details may change without notice. Compensation and benefits will be explained at interview.",
  },
} as const;

export const CAREER_POSITIONS: CareerPosition[] = [
  {
    id: "nurse",
    ja: {
      title: "看護師",
      badge: "正看護師・准看護師",
      summary:
        "処置のスピードや経験年数だけでなく、『患者様とご家族への寄り添い』を大切にできる方を歓迎します。あなたがこれまで培ってきた医療知識を活かし、内科から小児科まで幅広い診療を支える一員として活躍してください。",
      duties: [
        "外来診療の看護（問診・バイタル・処置補助など）",
        "検査（採血・心電図・内視鏡・エコー等）の補助",
        "患者さん・ご家族への説明、医師・事務との連携",
      ],
      requirements: [
        "看護師免許（正看護師・准看護師）をお持ちの方",
        "クリニック・病院での外来または検査室経験がある方歓迎",
        "経験よりも、素直な学ぶ姿勢・前向きさ・チームワークを重視します",
        "未経験の方も、意欲があればご相談ください",
        "勤務日数・時間帯は応相談",
      ],
      conditions: [
        { label: "雇用形態", value: "常勤（正社員）・パート" },
        {
          label: "給与（常勤・正看護師）",
          value: "月額210,000〜270,000円（基本給＋資格手当＋職務手当）",
        },
        {
          label: "給与（常勤・准看護師）",
          value: "月額175,000〜230,000円（基本給＋資格手当＋職務手当）",
        },
        { label: "給与（パート）", value: "時給1,300〜1,600円（正看護師）／1,100〜1,400円（准看護師）※経験・能力に応じて決定" },
        { label: "賞与", value: "年2回（開業1年目：合計基本給×2.0ヶ月を予定、以降段階的に見直し）" },
        { label: "通勤手当", value: "実費支給（上限あり）" },
        { label: "社会保険", value: "労災保険は全員加入。雇用保険・社会保険は法令基準に基づき加入判定" },
        { label: "休日", value: "土日祝休み（平日診療のみ）。年間休日日数は開院準備状況に応じて確定次第公開" },
      ],
    },
    en: {
      title: "Nurse",
      badge: "RN & LPN welcome",
      summary:
        "We value how you stand beside patients and their families as much as procedural speed or years of experience. Bring the medical knowledge you've built so far and join a team covering a wide range of departments from internal medicine to pediatrics.",
      duties: [
        "Outpatient nursing (vitals, procedures, assistance)",
        "Assisting with blood tests, ECG, endoscopy, ultrasound, etc.",
        "Patient communication; coordination with physicians and admin staff",
      ],
      requirements: [
        "Valid nursing license (RN or LPN)",
        "Outpatient or exam room experience preferred",
        "We value an open, positive mindset and teamwork over experience alone",
        "Motivated learners without experience may apply",
        "Work days and hours negotiable",
      ],
      conditions: [
        { label: "Employment type", value: "Full-time or part-time" },
        {
          label: "Salary (full-time RN)",
          value: "JPY 210,000–270,000/month (base + qualification + duty allowance)",
        },
        {
          label: "Salary (full-time LPN)",
          value: "JPY 175,000–230,000/month (base + qualification + duty allowance)",
        },
        { label: "Salary (part-time)", value: "JPY 1,300–1,600/hr (RN) / JPY 1,100–1,400/hr (LPN), based on experience" },
        { label: "Bonus", value: "Twice a year (Year 1: total 2.0x base salary planned, reviewed thereafter)" },
        { label: "Commuting allowance", value: "Actual cost reimbursed (capped)" },
        { label: "Social insurance", value: "Workers' comp for all staff; employment/health insurance per statutory thresholds" },
        { label: "Holidays", value: "Closed Sat, Sun & public holidays (weekday clinic only). Annual holiday count to be announced once finalized" },
      ],
    },
  },
  {
    id: "admin",
    ja: {
      title: "事務",
      badge: "受付・会計・レセプト",
      summary:
        "受付やパソコン入力だけでなく、患者様の不安を取り除く『おもてなし』の一員として活躍いただきます。開業初期の仕組みづくりから携わっていただけるため、将来はクリニック運営を支えるステップアップの道も見込めます。",
      duties: [
        "受付・会計・待合の案内",
        "レセプト作成、保険請求関連の事務",
        "電話・LINE対応、予約管理（開院後）",
        "医師・看護師との連携",
      ],
      requirements: [
        "医療事務経験者歓迎（レセプト経験がある方優遇）",
        "経験よりも、素直な学ぶ姿勢・前向きさ・チームワークを重視します",
        "未経験の方も、意欲があればご相談ください",
        "患者さんへの丁寧な対応ができる方",
        "勤務日数・時間帯は応相談",
      ],
      conditions: [
        { label: "雇用形態", value: "常勤（正社員）・パート" },
        {
          label: "給与（常勤・目安）",
          value: "未経験：月額19万円〜／経験者（レセプト可）：月額21万円〜／リーダー候補（経験3年以上）：月額23〜24万円",
        },
        { label: "給与（パート）", value: "時給1,250円〜（経験・能力に応じて決定）" },
        { label: "賞与", value: "年2回（開業1年目：合計基本給×2.0ヶ月を予定、以降段階的に見直し）" },
        { label: "通勤手当", value: "実費支給（上限あり）" },
        { label: "社会保険", value: "労災保険は全員加入。雇用保険・社会保険は法令基準に基づき加入判定" },
        { label: "休日", value: "土日祝休み（平日診療のみ）。年間休日日数は開院準備状況に応じて確定次第公開" },
      ],
    },
    en: {
      title: "Administrative staff",
      badge: "Reception, billing & claims",
      summary:
        "Beyond reception and data entry, our admin staff are hospitality professionals who put patients at ease. As a new clinic, you can help shape our workflows from the start, with room to grow into practice management over time.",
      duties: [
        "Reception, billing and waiting-area guidance",
        "Claims processing and insurance-related admin",
        "Phone and LINE support; appointment management (after opening)",
        "Coordination with clinical staff",
      ],
      requirements: [
        "Medical admin experience preferred (claims experience a plus)",
        "We value an open, positive mindset and teamwork over experience alone",
        "Motivated applicants without experience welcome",
        "Friendly, patient-facing communication",
        "Work days and hours negotiable",
      ],
      conditions: [
        { label: "Employment type", value: "Full-time or part-time" },
        {
          label: "Salary (full-time, guide)",
          value: "No experience: from JPY 190,000/month; claims experience: from JPY 210,000/month; team lead (3+ yrs): JPY 230,000–240,000/month",
        },
        { label: "Salary (part-time)", value: "From JPY 1,250/hr, based on experience" },
        { label: "Bonus", value: "Twice a year (Year 1: total 2.0x base salary planned, reviewed thereafter)" },
        { label: "Commuting allowance", value: "Actual cost reimbursed (capped)" },
        { label: "Social insurance", value: "Workers' comp for all staff; employment/health insurance per statutory thresholds" },
        { label: "Holidays", value: "Closed Sat, Sun & public holidays (weekday clinic only). Annual holiday count to be announced once finalized" },
      ],
    },
  },
  {
    id: "radiologicTechnologist",
    ja: {
      title: "診療放射線技師",
      badge: "CT・デジタルX線",
      summary:
        "当院のCT・デジタルX線撮影装置を用いた検査を担当いただきます。撮影のご依頼は1日4〜5件程度と、専門業務はスポット的な頻度になる見込みです。それ以外の時間は受付・ご案内・事務業務を中心に担っていただき、専門性を活かしつつ患者さんの窓口対応にも幅広く関わっていただくポジションです。",
      duties: [
        "CT・デジタルX線の撮影、画像管理（1日4〜5件程度を想定）",
        "検査説明・体位誘導など患者さんへの対応",
        "医師への画像所見の受け渡し、記録管理",
        "受付・ご案内・事務業務（撮影業務以外の時間の中心業務）",
      ],
      requirements: [
        "診療放射線技師免許をお持ちの方",
        "クリニック・病院での撮影業務経験がある方歓迎",
        "経験よりも、患者さんへの丁寧な対応・チームワークを重視します",
        "勤務日数・時間帯は応相談",
      ],
      conditions: [
        { label: "雇用形態", value: "常勤（正社員）を基本としつつ、診療体制・患者数に応じて非常勤・業務委託等も相談可" },
        {
          label: "給与（常勤・目安）",
          value: "月額200,000〜230,000円程度（資格手当込み・経験を考慮のうえ決定）",
        },
        { label: "給与（パート・目安）", value: "時給1,100〜1,300円程度（経験・能力に応じて決定）" },
        { label: "賞与", value: "年2回（開業1年目：合計基本給×2.0ヶ月を予定、以降段階的に見直し）" },
        { label: "通勤手当", value: "実費支給（上限あり）" },
        { label: "社会保険", value: "労災保険は全員加入。雇用保険・社会保険は法令基準に基づき加入判定" },
        { label: "休日", value: "土日祝休み（平日診療のみ）。年間休日日数は開院準備状況に応じて確定次第公開" },
      ],
      note:
        "常勤採用を約束するものではなく、開院当初の診療体制・患者数の状況を踏まえ、非常勤・業務委託等の柔軟な形態も含めて個別にご相談させていただきます。撮影業務が1日4〜5件程度と限られる分、資格・技能を活かしつつ受付・ご案内等の患者対応にも幅広く携わっていただく前向きなポジションです。",
    },
    en: {
      title: "Radiologic Technologist",
      badge: "CT & digital X-ray",
      summary:
        "You will handle imaging with our in-house CT and digital X-ray equipment. Imaging requests are expected at roughly 4–5 per day, so specialized imaging work will be intermittent; the rest of your time will center on reception, patient guidance, and office duties. This role lets you put your technical expertise to use while also engaging broadly with patients at the front desk.",
      duties: [
        "CT and digital X-ray imaging and image management (approx. 4–5 cases/day expected)",
        "Explaining procedures and positioning patients for scans",
        "Sharing imaging findings with physicians and maintaining records",
        "Reception, patient guidance, and office work (the main focus outside of imaging duties)",
      ],
      requirements: [
        "Valid radiologic technologist license",
        "Clinic or hospital imaging experience preferred",
        "We value courteous patient care and teamwork over experience alone",
        "Work days and hours negotiable",
      ],
      conditions: [
        { label: "Employment type", value: "Primarily full-time, with part-time or contract arrangements considered depending on clinic volume" },
        {
          label: "Salary (full-time, guide)",
          value: "Approx. JPY 200,000–230,000/month (including qualification allowance, based on experience)",
        },
        { label: "Salary (part-time, guide)", value: "Approx. JPY 1,100–1,300/hr, based on experience" },
        { label: "Bonus", value: "Twice a year (Year 1: total 2.0x base salary planned, reviewed thereafter)" },
        { label: "Commuting allowance", value: "Actual cost reimbursed (capped)" },
        { label: "Social insurance", value: "Workers' comp for all staff; employment/health insurance per statutory thresholds" },
        { label: "Holidays", value: "Closed Sat, Sun & public holidays (weekday clinic only). Annual holiday count to be announced once finalized" },
      ],
      note:
        "This is not a guarantee of full-time employment; the exact arrangement (full-time, part-time, or contract) will be discussed individually based on our clinical volume at opening. Since imaging work is expected to be around 4–5 cases per day, this is a positive opportunity to apply your technical expertise while also broadly supporting patients at reception.",
    },
  },
  {
    id: "medicalTechnologist",
    ja: {
      title: "臨床検査技師",
      badge: "血液・尿検査／生理検査",
      summary:
        "血液・尿検査や心電図などの生理検査を担当いただきます。検査のご依頼は1日4〜5件程度と、専門業務はスポット的な頻度になる見込みです。それ以外の時間は受付・ご案内・事務業務を中心に担っていただき、検査データを正確に扱う専門性を活かしつつ、患者さんの窓口対応にも幅広く関わっていただくポジションです。",
      duties: [
        "血液・尿検査の採取・検体処理（1日4〜5件程度を想定）",
        "心電図等の生理検査",
        "検査データの管理、医師への報告",
        "受付・ご案内・事務業務（検査業務以外の時間の中心業務）",
      ],
      requirements: [
        "臨床検査技師免許をお持ちの方",
        "クリニック・病院での検査業務経験がある方歓迎",
        "経験よりも、患者さんへの丁寧な対応・チームワークを重視します",
        "勤務日数・時間帯は応相談",
      ],
      conditions: [
        { label: "雇用形態", value: "常勤（正社員）・パートを想定。診療体制・患者数に応じて非常勤中心での採用も相談可" },
        {
          label: "給与（常勤・目安）",
          value: "月額200,000〜230,000円程度（経験・能力を考慮のうえ決定）",
        },
        { label: "給与（パート・目安）", value: "時給1,100〜1,300円程度（経験・能力に応じて決定）" },
        { label: "賞与", value: "年2回（開業1年目：合計基本給×2.0ヶ月を予定、以降段階的に見直し）※パートは勤務形態によって異なる" },
        { label: "通勤手当", value: "実費支給（上限あり）" },
        { label: "社会保険", value: "労災保険は全員加入。雇用保険・社会保険は法令基準に基づき加入判定" },
        { label: "休日", value: "土日祝休み（平日診療のみ）。年間休日日数は開院準備状況に応じて確定次第公開" },
      ],
      note:
        "常勤採用を約束するものではなく、開院当初の診療体制・患者数の状況を踏まえ、非常勤等の柔軟な形態も含めて個別にご相談させていただきます。検査業務が1日4〜5件程度と限られる分、資格・技能を活かしつつ受付・ご案内等の患者対応にも幅広く携わっていただく前向きなポジションです。",
    },
    en: {
      title: "Medical Technologist",
      badge: "Blood/urine & physiological tests",
      summary:
        "You will perform blood and urine tests as well as physiological tests such as ECG. Test requests are expected at roughly 4–5 per day, so specialized testing work will be intermittent; the rest of your time will center on reception, patient guidance, and office duties. This role lets you put your technical expertise to use while also engaging broadly with patients at the front desk.",
      duties: [
        "Blood and urine sample collection and processing (approx. 4–5 cases/day expected)",
        "Physiological tests such as ECG",
        "Managing test data and reporting to physicians",
        "Reception, patient guidance, and office work (the main focus outside of testing duties)",
      ],
      requirements: [
        "Valid medical technologist license",
        "Clinic or hospital laboratory experience preferred",
        "We value courteous patient care and teamwork over experience alone",
        "Work days and hours negotiable",
      ],
      conditions: [
        { label: "Employment type", value: "Full-time or part-time; primarily part-time arrangements considered depending on clinic volume" },
        {
          label: "Salary (full-time, guide)",
          value: "Approx. JPY 200,000–230,000/month (based on experience)",
        },
        { label: "Salary (part-time, guide)", value: "Approx. JPY 1,100–1,300/hr, based on experience" },
        { label: "Bonus", value: "Twice a year (Year 1: total 2.0x base salary planned); varies for part-time roles" },
        { label: "Commuting allowance", value: "Actual cost reimbursed (capped)" },
        { label: "Social insurance", value: "Workers' comp for all staff; employment/health insurance per statutory thresholds" },
        { label: "Holidays", value: "Closed Sat, Sun & public holidays (weekday clinic only). Annual holiday count to be announced once finalized" },
      ],
      note:
        "This is not a guarantee of full-time employment; the exact arrangement will be discussed individually based on our clinical volume at opening. Since testing work is expected to be around 4–5 cases per day, this is a positive opportunity to apply your technical expertise while also broadly supporting patients at reception.",
    },
  },
  {
    id: "communityLiaison",
    hidden: true,
    ja: {
      title: "地域連携相談員",
      badge: "医療ソーシャルワーカー・ケースワーカー相当（非常勤中心）",
      summary:
        "紹介・逆紹介の調整や介護保険に関する相談、患者さん・ご家族の生活面のご相談への対応を担っていただきます。専門知識に加え、患者さん・ご家族に寄り添う真摯な姿勢を大切にします。",
      duties: [
        "他院・介護施設等への紹介・逆紹介の調整",
        "介護保険に関する相談対応",
        "患者さん・ご家族の生活面のご相談への対応",
      ],
      requirements: [
        "医療ソーシャルワーカー（MSW）・社会福祉士等の資格・実務経験がある方",
        "介護保険制度・地域連携に関する知識がある方歓迎",
        "経験よりも、患者さん・ご家族への丁寧な対応を重視します",
      ],
      conditions: [
        { label: "雇用形態", value: "非常勤中心（診療体制・患者数に応じて日数・時間を相談）" },
        {
          label: "給与（目安）",
          value: "月給換算230,000〜280,000円程度（非常勤の場合は勤務日数・時間に応じて応相談）",
        },
        { label: "賞与", value: "勤務形態によって異なる（面談時にご相談）" },
        { label: "通勤手当", value: "実費支給（上限あり）" },
        { label: "社会保険", value: "労災保険は全員加入。雇用保険・社会保険は勤務形態・法令基準に基づき加入判定" },
        { label: "休日", value: "勤務形態によって異なる（面談時にご相談）" },
      ],
      note:
        "外来クリニック単独での常勤採用は想定しておらず、非常勤を中心に、診療体制・患者数の状況に応じて柔軟な勤務形態をご相談させていただきます。",
    },
    en: {
      title: "Community Liaison Coordinator",
      badge: "Medical social worker / caseworker role (mainly part-time)",
      summary:
        "You will coordinate referrals between institutions, advise on long-term care insurance, and support patients and families with life and welfare concerns. We value both professional knowledge and a sincere, patient-centered attitude.",
      duties: [
        "Coordinating referrals and cross-referrals with other clinics and care facilities",
        "Advising on long-term care insurance",
        "Supporting patients and families with life and welfare concerns",
      ],
      requirements: [
        "Experience or qualification as a medical social worker or certified social worker",
        "Knowledge of long-term care insurance and community liaison work preferred",
        "We value attentive support for patients and families over experience alone",
      ],
      conditions: [
        { label: "Employment type", value: "Mainly part-time (days/hours negotiable based on clinic volume)" },
        {
          label: "Salary (guide)",
          value: "Equivalent to approx. JPY 230,000–280,000/month; part-time terms negotiable based on days/hours",
        },
        { label: "Bonus", value: "Varies by employment arrangement (to be discussed at interview)" },
        { label: "Commuting allowance", value: "Actual cost reimbursed (capped)" },
        { label: "Social insurance", value: "Workers' comp for all staff; employment/health insurance per employment type and statutory thresholds" },
        { label: "Holidays", value: "Varies by employment arrangement (to be discussed at interview)" },
      ],
      note:
        "We do not anticipate full-time hiring for this role at a single outpatient clinic; we will discuss a flexible, mainly part-time arrangement based on our clinical volume.",
    },
  },
  {
    id: "dietitian",
    ja: {
      title: "管理栄養士",
      badge: "生活習慣病の栄養指導（非常勤）",
      summary:
        "糖尿病・脂質異常症等の生活習慣病の患者さんへの栄養指導を担当いただきます。専門的な栄養学の知識に加え、患者さんの生活に寄り添った実践的なアドバイスができる方を歓迎します。",
      duties: [
        "生活習慣病（糖尿病・脂質異常症等）の栄養指導",
        "患者さんの食生活に関するヒアリング・アドバイス",
        "医師との連携、指導記録の管理",
      ],
      requirements: [
        "管理栄養士免許をお持ちの方",
        "栄養指導の実務経験がある方歓迎",
        "経験よりも、患者さんへの丁寧な対応を重視します",
      ],
      conditions: [
        { label: "雇用形態", value: "非常勤（栄養指導委託を想定）" },
        {
          label: "給与（目安）",
          value: "非常勤の栄養指導委託が一般的なため、指導実績・勤務日数に応じて応相談",
        },
        { label: "賞与", value: "勤務形態によって異なる（面談時にご相談）" },
        { label: "通勤手当", value: "実費支給（上限あり）" },
        { label: "社会保険", value: "業務委託の場合は対象外。雇用契約の場合は法令基準に基づき加入判定" },
        { label: "休日", value: "勤務形態によって異なる（面談時にご相談）" },
      ],
      note:
        "常勤採用は想定しておらず、非常勤（委託契約を含む）を基本に、指導実績・勤務日数等に応じて条件をご相談させていただきます。",
    },
    en: {
      title: "Registered Dietitian",
      badge: "Lifestyle-disease nutrition guidance (part-time)",
      summary:
        "You will provide nutrition guidance for patients with lifestyle-related diseases such as diabetes and dyslipidemia. We welcome dietitians who combine professional nutrition knowledge with practical, everyday advice tailored to each patient's life.",
      duties: [
        "Nutrition guidance for lifestyle-related diseases (diabetes, dyslipidemia, etc.)",
        "Interviewing patients about diet and providing advice",
        "Coordinating with physicians and maintaining guidance records",
      ],
      requirements: [
        "Valid registered dietitian license",
        "Practical nutrition guidance experience preferred",
        "We value attentive patient care over experience alone",
      ],
      conditions: [
        { label: "Employment type", value: "Part-time (typically as contracted nutrition guidance)" },
        {
          label: "Salary (guide)",
          value: "Negotiable based on guidance record and working days, as part-time contracted arrangements are standard for this role",
        },
        { label: "Bonus", value: "Varies by employment arrangement (to be discussed at interview)" },
        { label: "Commuting allowance", value: "Actual cost reimbursed (capped)" },
        { label: "Social insurance", value: "Not applicable for contracted work; per statutory thresholds if employed directly" },
        { label: "Holidays", value: "Varies by employment arrangement (to be discussed at interview)" },
      ],
      note:
        "We do not anticipate full-time hiring for this role; terms will be discussed individually based mainly on a part-time or contracted arrangement.",
    },
  },
];

export const OBSERVER_PROGRAM = {
  ja: {
    eyebrow: "大学生の方へ",
    heading: "オブザーバー募集（見学・交流プログラム）",
    intro:
      "本枠は雇用契約を伴わない、完全無償の見学・交流プログラムです。給与・パート代のお支払いはございません。宮崎大学をはじめ、医療系学部の学生さんはもちろん、マーケティング・起業に関心のある学生さん、システムエンジニアリング（IT・プログラミング）に関心のある学生さんなど、様々な分野に関心のある学生さんを歓迎します。",
    whatYouSeeHeading: "見ていただける内容",
    whatYouSee: [
      "開業までのリアルな意思決定プロセス（融資交渉・土地契約・建築業者選定など、経営判断が実際にどう進んでいくかを垣間見られます）",
      "院長のキャリアの転換点（防衛医科大学校卒業から災害医療センター、自衛隊病院外科部長を経て開業に至るまでのストーリー）",
      "医療×テクノロジーの舞台裏（AIを活用した事業計画づくり・広報・システム構築支援など、テクノロジーを積極的に活用する当院の姿勢）",
      "建設現場の見学（更地から建物が立ち上がっていく過程）",
      "多職種連携の舞台裏（税理士・建築士・医療機器ベンダーなど、開業プロジェクトを支える専門家チームとの関わり）",
    ],
    formatHeading: "参加のかたち",
    formatBody:
      "ブログでも開業の様子を定期的に発信していく予定です。ブログを読んで興味を持っていただいた方には、少人数での見学会・座談会（対面）にもお声がけします。まずはブログをのぞいてみてください。",
    disclaimer:
      "※ 本枠は雇用・労働ではなく、無償の見学・交流プログラムです。給与・パート代のお支払いは発生しません。参加者の安全・情報管理に配慮した範囲でご案内します。",
  },
  en: {
    eyebrow: "For university students",
    heading: "Observer Program (visit & exchange, no employment)",
    intro:
      "This is a completely unpaid observation and exchange program with no employment contract and no compensation. We welcome students from the University of Miyazaki and beyond who are interested in a variety of fields — medical students, of course, but also students interested in marketing and entrepreneurship, or in systems engineering (IT and programming).",
    whatYouSeeHeading: "What you can see",
    whatYouSee: [
      "A behind-the-scenes look at real decision-making before opening (financing negotiations, land contracts, choosing a builder — how business decisions actually unfold)",
      "The director's career turning points (from the National Defense Medical College, through the Disaster Medical Center and serving as chief of surgery at a Self-Defense Forces hospital, to opening this clinic)",
      "The intersection of healthcare and technology (how we use AI to support business planning, communications and system building)",
      "The construction site as it transforms from vacant land into a building",
      "Behind the scenes of multi-disciplinary collaboration (tax accountants, architects, medical equipment vendors and other experts supporting the project)",
    ],
    formatHeading: "How to join",
    formatBody:
      "We plan to share regular updates on our progress toward opening via our blog. Students who read the blog and are interested may be invited to a small, in-person visit or discussion session. Start by following the blog.",
    disclaimer:
      "* This is not employment or paid work — it is a free observation and exchange program with no compensation. Participation will be arranged with appropriate care for safety and confidentiality.",
  },
} as const;

export const LINE_RECRUIT_URL = "https://line.me/R/ti/p/@337njouw";
