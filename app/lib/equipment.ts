export type Equipment = {
  image: string;
  ja: { name: string; body: string };
  en: { name: string; body: string };
};

export const equipment: Equipment[] = [
  {
    image: "/equipment/ct.png",
    ja: {
      name: "16列CT",
      body: "体の断面を撮影し、頭部からおなかまで詳しく調べられる検査です。放射線を遮断する専用の検査室で安全に撮影します。装置自体は開放的な造りで、トンネルのように長く囲まれることがありません。狭いところが苦手・不安という方も、写真のとおり開口部が広いため、リラックスして検査を受けていただけます。撮影自体はわずかな時間で終わります。",
    },
    en: {
      name: "16-row CT",
      body: "A scan that images cross-sections of the body, allowing detailed examination from the head to the abdomen. Imaging is performed safely in a dedicated, radiation-shielded room. The scanner itself has an open design and does not enclose you in a long tunnel. Even if small spaces make you anxious, the wide opening shown in the photo lets you relax during the scan. The scan itself takes only a short time.",
    },
  },
  {
    image: "/equipment/endoscope.png",
    ja: {
      name: "経鼻内視鏡（胃カメラ）",
      body: "鼻から挿入できる細いカメラで、のどや胃の中を観察します。鼻から入れるため「オエッ」となりにくく、会話をしながら比較的楽に受けられるのが特長です。",
    },
    en: {
      name: "Transnasal endoscopy (gastroscopy)",
      body: "A thin camera inserted through the nose to observe the throat and stomach. Because it goes through the nose, it triggers less gagging, and you can take it relatively comfortably while talking.",
    },
  },
  {
    image: "/equipment/ultrasound.png",
    ja: {
      name: "腹部エコー（超音波）",
      body: "おなかにあてるだけで、肝臓・胆のう・腎臓などの様子を観察できる検査です。痛みも被ばくもなく、お子さんからご高齢の方まで安心して受けていただけます。",
    },
    en: {
      name: "Abdominal ultrasound (echo)",
      body: "Simply placed on the abdomen to observe organs such as the liver, gallbladder and kidneys. With no pain and no radiation, it can be taken with peace of mind by everyone from children to the elderly.",
    },
  },
  {
    image: "/equipment/xray.png",
    ja: {
      name: "デジタルX線（レントゲン）",
      body: "胸やおなか、骨などを撮影します。デジタル化により、少ない被ばく量で、その場ですぐに画像を確認できます。",
    },
    en: {
      name: "Digital X-ray",
      body: "Images the chest, abdomen, bones and more. Being digital, it uses a low radiation dose and lets us check the images on the spot.",
    },
  },
  {
    image: "/equipment/feno.png",
    ja: {
      name: "FENO（呼気NO検査・喘息診断）",
      body: "息を吐くだけで、気道の炎症の程度を数値で調べられる検査です。せきが長引く方や、喘息が疑われる方の診断・経過の確認に役立ちます。痛みはなく、数分で終わります。",
    },
    en: {
      name: "FeNO (exhaled NO test, asthma diagnosis)",
      body: "By simply breathing out, this test measures the degree of airway inflammation as a number. It helps diagnose and monitor those with a lingering cough or suspected asthma. It is painless and takes just a few minutes.",
    },
  },
  {
    image: "/equipment/surgery.png",
    ja: {
      name: "処置室（外科小手術）",
      body: "粉瘤や脂肪腫の切除、巻き爪の処置、きずの縫合など、日帰りでの小手術・処置に対応します。清潔な処置室で、外科専門医が丁寧に行います。",
    },
    en: {
      name: "Treatment room (minor surgery)",
      body: "We handle day-surgery procedures such as removing cysts and lipomas, treating ingrown nails, and suturing wounds. They are performed carefully by a board-certified surgeon in a clean treatment room.",
    },
  },
];
