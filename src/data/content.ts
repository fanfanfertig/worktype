import { Question, Archetype } from '../types';

export const QUESTIONS: Question[] = [
  // 维度1：工作节奏 — 稳扎稳打(S) vs 灵光乍现(I)
  {
    id: 1,
    dimension: 'rhythm',
    text: '周一早上打开办公工具，你更可能：',
    options: [
      { text: '先看本周日程，按优先级排好每一天的任务', value: 'A', trait: 'S' },
      { text: '先处理最紧迫的事，其余看心情和状态推进', value: 'B', trait: 'I' }
    ]
  },
  {
    id: 2,
    dimension: 'rhythm',
    text: '收到一个两周后的项目需求，你会：',
    options: [
      { text: '立刻拆解成里程碑，在日历上锁定关键节点', value: 'A', trait: 'S' },
      { text: '先记下来，等灵感来了集中突击完成', value: 'B', trait: 'I' }
    ]
  },
  {
    id: 3,
    dimension: 'rhythm',
    text: '下班前的最后10分钟，你通常在：',
    options: [
      { text: '复盘今日完成项，写下明天的三条重点', value: 'A', trait: 'S' },
      { text: '突然想到一个新点子，赶紧记下来免得忘了', value: 'B', trait: 'I' }
    ]
  },
  // 维度2：信息处理 — 条分缕析(A) vs 自由生长(F)
  {
    id: 4,
    dimension: 'info',
    text: '收到一份50页的行业报告，你的第一反应是：',
    options: [
      { text: '先扫目录，按章节找到关键部分精读', value: 'A', trait: 'A' },
      { text: '翻到哪页读哪页，觉得有意思的就标记一下', value: 'B', trait: 'F' }
    ]
  },
  {
    id: 5,
    dimension: 'info',
    text: '你电脑里的文件整理方式更接近：',
    options: [
      { text: '按项目/日期/类型分好文件夹，命名规范统一', value: 'A', trait: 'A' },
      { text: '桌面堆了几个临时文件夹，但总能在需要时找到', value: 'B', trait: 'F' }
    ]
  },
  {
    id: 6,
    dimension: 'info',
    text: '用搜索找东西时，你更习惯：',
    options: [
      { text: '用精确的关键词组合，缩小范围快速命中', value: 'A', trait: 'A' },
      { text: '用模糊的自然语言描述，让系统帮我理解意图', value: 'B', trait: 'F' }
    ]
  },
  // 维度3：协作倾向 — 独当一面(L) vs 八方联动(C)
  {
    id: 7,
    dimension: 'collab',
    text: '遇到一个需要跨部门配合的问题，你倾向于：',
    options: [
      { text: '自己先研究清楚，拿着方案去找人确认', value: 'A', trait: 'L' },
      { text: '先拉个群把相关人聚齐，边讨论边推进', value: 'B', trait: 'C' }
    ]
  },
  {
    id: 8,
    dimension: 'collab',
    text: '完成了一份重要文档，你的习惯是：',
    options: [
      { text: '自己确认无误后直接提交，减少不必要的打扰', value: 'A', trait: 'L' },
      { text: '分享给相关同事征求意见，集思广益再定稿', value: 'B', trait: 'C' }
    ]
  },
  {
    id: 9,
    dimension: 'collab',
    text: '关于"团队知识库"，你更认同的说法是：',
    options: [
      { text: '"我的资料我自己管好就行，团队共享容易乱"', value: 'A', trait: 'L' },
      { text: '"大家把资料放一起，互相启发反而更有价值"', value: 'B', trait: 'C' }
    ]
  },
  // 维度4：知识取向 — 深耕细作(D) vs 广泛涉猎(B)
  {
    id: 10,
    dimension: 'knowledge',
    text: '过去半年，你关注的新话题/新领域大概有几个：',
    options: [
      { text: '1-2个方向，但要研究到能写报告的程度', value: 'A', trait: 'D' },
      { text: '5个以上，每个了解核心逻辑就转向下一个', value: 'B', trait: 'B' }
    ]
  },
  {
    id: 11,
    dimension: 'knowledge',
    text: '看到一篇与你领域相关但不直接有用的文章，你会：',
    options: [
      { text: '大概率跳过，专注当前方向的深度资料', value: 'A', trait: 'D' },
      { text: '收藏起来，跨领域的碰撞常常带来新想法', value: 'B', trait: 'B' }
    ]
  },
  {
    id: 12,
    dimension: 'knowledge',
    text: '如果要你向别人介绍你的专业领域，你更擅长：',
    options: [
      { text: '把一个细分方向讲得非常透彻深入', value: 'A', trait: 'D' },
      { text: '把多个方向串联起来讲一个完整的图景', value: 'B', trait: 'B' }
    ]
  }
];

export const ARCHETYPES: Record<string, Archetype> = {
  ARCHITECT: {
    id: 'ARCHITECT',
    name: '指挥官',
    title: '架构师',
    emoji: '🏗️',
    description: '秩序是你效率的基石。你擅长规划、结构化思维，并能独立深耕复杂项目。',
    celebrity: '类似钢铁侠的 JARVIS 管理风格',
    behavior: '规划驱动、结构化、独立深耕',
    percentage: 23,
    hooks: '节省30%协调时间',
    recommendations: [
      '日程概览 + 待办优先级排序',
      '自动生成项目文件夹结构模板',
      '每日早间推送"今日三件事"摘要'
    ]
  },
  MINER: {
    id: 'MINER',
    name: '学者',
    title: '掘矿者',
    emoji: '⛏️',
    description: '深挖知识的价值。你追求深度，喜欢建立严密的逻辑体系，并能在海量信息中挖掘洞见。',
    celebrity: '顾问或研究员级别的深度洞察',
    behavior: '结构化深耕、独立深度检索',
    percentage: 18,
    hooks: '检索命中率提升60%',
    recommendations: [
      '最近检索历史 + 知识关联图谱入口',
      '建立标签体系，支持自定义分类规则',
      '基于语义关联推送"你可能遗漏的相关资料"'
    ]
  },
  NET_WEAVER: {
    id: 'NET_WEAVER',
    name: '连接者',
    title: '织网人',
    emoji: '🕸️',
    description: '协作是你的超能力。你擅长跨界联动，能够有效地聚合资源和人才，让团队协作无缝衔接。',
    celebrity: '销售/行政领域的资源整合高手',
    behavior: '协作导向、广泛触达',
    percentage: 32,
    hooks: '团队知识复用率提升3倍',
    recommendations: [
      '团队动态 + 共享文档更新',
      '默认开启团队空间，一键共享',
      '同事上传了相关资料时主动通知'
    ]
  },
  SURFER: {
    id: 'SURFER',
    name: '探险家',
    title: '冲浪者',
    emoji: '🏄‍♂️',
    description: '灵感驱动的先行者。你反应敏捷，喜欢广泛涉猎新奇领域，擅长在碎片信息中发现新机会。',
    celebrity: '极具爆发力的创业者姿态',
    behavior: '灵感驱动、自由生长、广泛涉猎',
    percentage: 27,
    hooks: 'AI帮你把零散灵感变成可执行方案',
    recommendations: [
      '灵感速记入口 + AI关联推荐',
      '语音/截图一键入库，AI自动归类',
      '灵感关联推送——"你上周的想法和这篇文章有关"'
    ]
  }
};
