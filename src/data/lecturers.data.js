import Lecturer from "../models/lecturer.model.js";

const LECTURERS = [
  new Lecturer({
    id: "1",
    fullName: "Јана Џеков",
    role: "Главен Предавач",
    photoUrl:
      "https://static.wixstatic.com/media/4800e5_3dbce1d1f2cb45cd8170554ce95dbffc~mv2.png",
    email: "example@email.com",
    linkedInUrl: "https://www.linkedin.com/in/jana-djekov-21815629/",
    biography: `Јана е специјалист за човечки ресурси со долгогодишно искуство во талент менаџмент, регрутација, организациски развој и обука на вработени. Работи како HR специјалист и е одговорна за процесите на вработување, развој на човечкиот капитал и имплементација на HR стратегии за подобрување на ангажираноста и продуктивноста на тимот.

Покрај работата во областа на човечките ресурси, Јана има значајно искуство во образованието и работа со деца. Била професор по англиски јазик во приватното училиште IPS, како и активен предавач и претприемач во семејниот бизнис – Училиште за англиски јазик, каде што работела на наставни методологии и креативни пристапи во учењето.

Јана е магистер по европски студии за интеграција и комуникации на Универзитетот „Св. Кирил и Методиј“ во Скопје, а дополнително се усовршила во областа на дигиталниот маркетинг преку програмата на Semos Digital Marketing Academy. Нејзината кариера претставува уникатна комбинација на човечки ресурси, едукација и комуникација, што ѝ овозможува да даде значаен придонес во развојот на младите кадри, корпоративната комуникација и образовните процеси.`,
    education: [
      {
        period: "2004–2007",
        institution: "Универзитет „Св. Кирил и Методиј“ во Скопје",
        degree: "Диплома, Педагошки факултет",
      },
      {
        period: "2010–2015",
        institution: "Универзитет „Св. Кирил и Методиј“ во Скопје",
        degree:
          "Магистер по европски студии за интеграција и комуникации, социологија",
        notes:
          "Оцена: 10. Магистерска теза: Правна рамка за превенција на малолетничко престапништво во Македонија, Хрватска и Велика Британија",
      },
      {
        period: "2022–2023",
        institution: "Семос - Академија за дигитален маркетинг",
        degree: "Специјалист за дигитален маркетинг, Информатика",
        notes: "Вештини: Пишување веб-содржини · Дигитален маркетинг",
      },
    ],
    career: [
      {
        period: "Ноември 2009 - Септември 2010",
        position: "Професионален предавач",
        company: "JS - училиште за странски јазици и преводи",
      },
      {
        period: "Септември 2010 - Јули 2015",
        position: "Генерален менаџер",
        company: "Компанијата за застапување на Тимак",
      },
      {
        period: "Јули 2015 - Април 2016",
        position: "Професионалец за настава во предучилишно образование",
        company: "ИПС - Меѓународно игралиште на градски градинки Скопје",
      },
      {
        period: "Август 2018 - Декември 2019",
        position: "Проектен асистент",
        company: "Народен правобранител на РСМ / УНХЦР проект",
      },
      {
        period: "Април 2016 - Јануари 2020",
        position: "Административен асистент",
        company: "Промедика Естетика",
      },
      {
        period: "Јануари 2020 - денес",
        position: "Службеник за човечки ресурси",
        company: "Скопски пазар АД",
      },
    ],
    programs: [
      {
        title: "КЛУБ: МАЛИ КРЕАТОРИ",
        ageGroup: "за деца од 6 до 9 години -",
        description:
          "Забавно и креативно патување каде младите умови учат за претприемништво, тимска работа и животни вештини – преку игра, фантазија и свои мини проекти.",
        link: "",
      },
    ],
  }),
  new Lecturer({
    id: "2",
    fullName: "Виктор Митевски",
    role: "Главен Предавач",
    photoUrl:
      "https://static.wixstatic.com/media/4800e5_23d63d3e5b2d4b919751098bf528cd64~mv2.png/v1/fill/w_280,h_275,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4800e5_23d63d3e5b2d4b919751098bf528cd64~mv2.png",
    email: "example@email.com",
    linkedInUrl: "https://www.linkedin.com/in/viktormitevski/",
    biography: `
    Виктор Митевски е економист, стартап коуч и ментор со долгогодишно
    искуство во поддршка на претприемачи и развој на бизнис
    екосистемот. Извршен директор на Здружението за истражување и
    анализи – ЗМАИ и коосновач на Startup Academy, каде што менторирал
    повеќе од 70 млади претприемачи во развојот на нивните бизнис
    идеи. 
    Работел како консултант за Обединетите Нации (UNFPA) и Светска
    банка, фокусирајќи се на економски анализи, јавни финансии и
    политики за одржлив развој. Неговото искуство вклучува работа со
    државни институции во областите на економска стратегија, отворени
    податоци и иновации. Тој е поранешен советник на Министер за
    финансии. 
    Стекнал магистерска диплома по применета економија од Texas A&M
    University и активно придонесува кон создавање претприемничка
    средина преку тренинзи, менторство и стратешки анализи.
  `,
    education: [
      {
        period: "2008-2012",
        institution: "Економски факултет, Универзитет „Св. Кирил и Методиј“",
        degree: "Диплома за завршено високо образование, Финансиски менаџмент",
      },
      {
        period: "2012",
        institution: "Економски факултет, Универзитет „Св. Кирил и Методиј“",
        degree: "Магистерска диплома, Деловна статистика",
        activities:
          "Стекнати практични вештини и знаења за вршење применети макро и микроекономски истражувања со користење на различни статистички и економетриски методи",
      },
      {
        period: "2015-2016",
        institution: "Универзитет Тексас А&М",
        degree: "Магистерска диплома, применета економија",
        activities:
          "Стартап Агиленд, Тексашки тимски ракомет А&М, Здружение на меѓународни студенти-ментори, Здружение на студенти Фулбрајт на Универзитетот Тексас А&М, Здружение за претприемништво на Тексас А&М, Клуб на заедницата за дипломирани студенти и професионалци на Аги (AGPCC)",
      },
      {
        period: "2023",
        institution: "Економски факултет, Универзитет „Св. Кирил и Методиј“",
        degree:
          "Доктор по филозофија - докторат, економија - фискална економија",
      },
    ],
    career: [
      {
        period: "Јули 2013 - денес",
        position: "Коосновач",
        company: "Академија за стартапи",
      },
      {
        period: "Октомври 2014 - денес",
        position: "Извршен директор",
        company: "Здружение за истражување и анализа ZMAI",
      },
      {
        period: "Јануари 2025 - денес",
        position: "Надворешен консултант",
        company: "Вестминстерска фондација за демократија (WFD)",
      },
      {
        period: "Јануари 2025 - денес",
        position: "Надворешен експерт за развој на методологија за следење ",
        company: "Институт за европска политика - Скопје",
      },
      {
        period: "Февруари 2025 - денес",
        position: "Коосновач",
        company: "Datalytix",
      },
    ],
    programs: [
      {
        title: "КЛУБ: МИНИ СТАРТАПЏИИ",
        ageGroup: "за млади од 15 до 18 години -",
        description:
          "Место каде младите учат како да ги претворат своите идеи во реални проекти преку бизнис планирање, дигитален маркетинг, финансиска писменост и лидерство.",
        link: "",
      },
    ],
  }),

  new Lecturer({
    id: "3",
    fullName: "Деспина Стојановска",
    role: "Главен Предавач",
    photoUrl:
      "https://static.wixstatic.com/media/4800e5_b2cb650bf8cf44dba89b14f3d6b8b895~mv2.png/v1/fill/w_284,h_336,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4800e5_b2cb650bf8cf44dba89b14f3d6b8b895~mv2.png",
    email: "example@email.com",
    linkedInUrl: "#",
    biography: `
    Деспина Стојановска е психолог и психотерапевт со долгогодишно
    искуство во работа со деца, родители и ранливи заедници. Нејзината
    практика опфаќа индивидуална, семејна и групна терапија, со фокус
    на личен развој, психолошка поддршка и ментално здравје. Таа е
    носител на најзначајната европска лиценца за психотерапија, што ја
    позиционира како еден од водечките професионалци во својата
    област. Нејзината работа е особено насочена кон превенција и
    интервенција кај децата и младите, а активно соработува со
    родители за подобрување на семејната динамика и родителските
    вештини.

    Деспина е дипломиран психолог на Универзитетот „Св. Кирил и
    Методиј“ и магистрант по Комуникации. Поседува сертификат за
    Професионален обучувач на возрасни издаден од МОН. Во областа на
    психотерапија завршила Интегративен пристап, Трансакциска анализа
    и Системска и семејна психотерапија. Моментално е тренер по СС
    Психотерапија. Таа е редовен гостин во медиумите на теми поврзани
    со психологијата. Во изминатите години работела како
    психотерапевт, обучувач и тренер во организации како Хопс, Прв
    семеен центар на град Скопје, СОС Детско Село, Комора на
    психолози, Нансен дијалог центар, каде што одржува обуки за
    ментално здравје, справување со стрес, личен развој и тимска
    работа. Како дел од кампањата против врсничко насилство, таа се
    залага за подигнување на свеста, едукација и креирање безбедна
    средина за децата. Со својот посветен пристап, широка експертиза и
    долгогодишно искуство, таа активно работи на подобрување на
    менталното здравје, личниот раст и психолошката благосостојба на
    децата, младите и нивните семејства.
  `,
    education: [],
    career: [],

    programs: [],
  }),
  new Lecturer({
    id: "4",
    fullName: "Елена Хаџи Пецова",
    role: "Главен Предавач",
    photoUrl:
      "https://static.wixstatic.com/media/4800e5_6cb74fb4b8f643f3acfc7de6314f6566~mv2.jpeg/v1/fill/w_378,h_352,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/elena%20hp.jpeg",
    email: "example@email.com",
    linkedInUrl: "https://www.linkedin.com/in/elena-hadzi-pecova-b65a9b4/",
    biography: `
    Елена Хаџи Пецова е менаџер на CEED Hub Skopje, координатор на
    CEED Business Angels Club со кој е член на EBAN (European Business
    Angel Network) и член на Извршниот одбор на Фондацијата CEED
    Македонија. Со над 15 години искуство во поддршка на бизниси, таа
    е активен градител на стартап екосистемот во Македонија, води
    програми за инвестициона подготвеност, пред-акцелерација и
    акцелерација, како и процеси за финансиска и нефинансиска поддршка
    на стартапи.

    Покрај тоа, Елена е сертифициран консултант за стартапи од EBRD
    (Cambridge Methodology) и обучувач за Impact Management and
    Measurement методологија (EVPA). Како консултант на Фондот за
    иновации и технолошки развој (ФИТР), таа има работено со повеќе од
    200 компании во областа на корпоративни иновации, пристап до
    финансии и развој на бизнис модели, помагајќи им да обезбедат
    финансиска поддршка за своите иновативни проекти. Иницијатор и
    основач на македонското учество во регионалната мрежа за
    поврзување на стартапи и инвеститори – ADRIATIC INVESTORS.

    Со долгогодишно искуство во управување со проекти, менторство,
    инвестициско посредување и развој на пазарен пристап, Елена
    активно придонесува кон создавање одржлива и динамична
    претприемачка заедница. Како предавач и главен фасилитатор во
    повеќе меѓународни и локални програми, таа соработувала со над 40
    странски експерти, споделувајќи знаење и поттикнувајќи раст на
    нови генерации претприемачи.​​
  `,
    education: [
      {
        period: "1998-2003",
        institution: "Универзитет Св. Кирил и Методиј во Скопје",
        degree: "БА, Политички науки",
      },
      {
        period: "2005-2007",
        institution: "Алма Матер Студиорум – Универзитет во Болоња",
        degree:
          "Магистер по истражување и студии во Југоисточна Европа, MIREES",
      },
    ],
    career: [
      {
        period: "Октомври 2007 - Октомври 2009",
        position: "Координатор",
        company: "на програмата НВО „Заеднички вредности“",
      },
      {
        period: "Ноември 2009 - Март 2017",
        position: "Извршен директор",
        company: "CEED за бизнис информации",
      },
      {
        period: "Март 2017 - Март 2025",
        position: "Менаџер",
        company: "CEED Hub Skopje ЦЕЕД Македонија",
      },
      {
        period: "Март 2017 - денес",
        position: "Менаџер, Консултант за стартапи и растечки компании",
        company: "CEED Бизнис Клуб, Бизнис Ангел Клуб",
      },
    ],

    programs: [
      {
        title: "КЛУБ: ИДНИ ОСНОВАЧИ",
        ageGroup: "за деца од 10 до 14 години -",
        description:
          "Преку реални проекти и тимски предизвици учат да развијат идеи, креираат бизнис планови и ги претстават своите визии – градејќи самодоверба, комуникација и критичко размислување.",
        link: "",
      },
    ],
  }),
];

export default LECTURERS;
