export interface Skill {
  name_zh: string;
  name_en: string;
  level: number; // 0 - 100
  badge_zh: string;
  badge_en: string;
}

export interface SkillCategory {
  id: string;
  iconText: string;
  title_zh: string;
  title_en: string;
  desc_zh: string;
  desc_en: string;
  stats_zh: { label: string; value: string }[];
  stats_en: { label: string; value: string }[];
  skills: Skill[];
}

export interface Project {
  id: string;
  title_zh: string;
  title_en: string;
  tags: string[];
  desc_zh: string;
  desc_en: string;
  period: string;
}

export interface CollabItem {
  id: string;
  title_zh: string;
  title_en: string;
  desc_zh: string;
  desc_en: string;
  buttonText_zh: string;
  buttonText_en: string;
  icon: 'lightbulb' | 'rocket' | 'megaphone';
}

export const NAV_LINKS = [
  { id: 'about', label_zh: '关于', label_en: 'About' },
  { id: 'skills', label_zh: '技能', label_en: 'Skills' },
  { id: 'projects', label_zh: '项目', label_en: 'Projects' },
  { id: 'collab', label_zh: '合作', label_en: 'Collab' },
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'ai-agent',
    iconText: 'AG',
    title_zh: 'LLM&Agent',
    title_en: 'AI & Agent Orchestration',
    desc_zh: '大模型应用、智能体编排与RAG检索增强',
    desc_en: 'Large language model apps, agent workflows, and RAG architectures',
    stats_zh: [
      { label: '多场景经验', value: '5+' },
      { label: '高频答疑覆盖', value: '85%' },
      { label: '智能体能力', value: '熟练' }
    ],
    stats_en: [
      { label: 'Scenarios', value: '5+' },
      { label: 'RAG Coverage', value: '85%' },
      { label: 'Capability', value: 'Proficient' }
    ],
    skills: [
      { name_zh: 'AI 工作流编排 (LangChain / Coze / DAG)', name_en: 'AI Workflow Design (LangChain / Coze / DAG)', level: 95, badge_zh: '熟练', badge_en: 'Proficient' },
      { name_zh: 'RAG 知识库切分与向量检索 (pgvector)', name_en: 'RAG Partitioning & Vector DB (pgvector)', level: 92, badge_zh: '熟练', badge_en: 'Proficient' },
      { name_zh: 'AIGC 图像/视频流水线 (SD / ComfyUI)', name_en: 'AIGC Image/Video Pipelines (SD / ComfyUI)', level: 90, badge_zh: '熟练', badge_en: 'Proficient' },
      { name_zh: '多模态参考解析 & Prompt 体系设计', name_en: 'Multi-modal Vision & Prompt Engineering', level: 92, badge_zh: '熟练', badge_en: 'Proficient' },
    ]
  },
  {
    id: 'product-delivery',
    iconText: 'PD',
    title_zh: 'AI 产品落地与协同',
    title_en: 'Product Delivery & SOP',
    desc_zh: '高价值、低成本、可衡量的 AI 落地方法论',
    desc_en: 'High-value, cost-efficient, & measurable AI delivery concepts',
    stats_zh: [
      { label: '业务提效', value: '5倍+' },
      { label: '零门槛赋能', value: '100%' },
      { label: '运营成本', value: '-95%' }
    ],
    stats_en: [
      { label: 'Asset Speedup', value: '5x+' },
      { label: 'Team Empow.', value: '100%' },
      { label: 'Cost Cut', value: '-95%' }
    ],
    skills: [
      { name_zh: '业务流程拆解与 SOP 自动化设计', name_en: 'Business Flow Decoupling & SOP Automation', level: 94, badge_zh: '熟练', badge_en: 'Proficient' },
      { name_zh: 'AI 效果评估、对齐指标与合规边界控制', name_en: 'AI Goal Aligning, Evaluation & Guardrails', level: 91, badge_zh: '熟练', badge_en: 'Proficient' },
      { name_zh: '跨团队敏捷协同与从0到1产品体系构建', name_en: 'Cross-functional Collaboration & Product Launch', level: 93, badge_zh: '熟练', badge_en: 'Proficient' },
      { name_zh: 'RPA 自动化协作流程 (影刀RPA / API 串联)', name_en: 'RPA Robotic Automation (Yingdao & APIs)', level: 88, badge_zh: '熟练', badge_en: 'Proficient' },
    ]
  },
  {
    id: 'engineering-testing',
    iconText: 'ET',
    title_zh: '测试与底层算力适配',
    title_en: 'Engineering & Computing',
    desc_zh: '从硬件算力底层到应用层软件的全链条掌控',
    desc_en: 'Full-stack understanding from metal to interface layers',
    stats_zh: [
      { label: '推理显卡适配', value: '4090系' },
      { label: '测试流程规范', value: 'SOP' },
      { label: '自动化框架', value: 'Python' }
    ],
    stats_en: [
      { label: 'GPU Adapter', value: 'RTX 4090s' },
      { label: 'Test Standard', value: 'SOP' },
      { label: 'Automation', value: 'Python' }
    ],
    skills: [
      { name_zh: 'AI 服务器性能与兼容性测试 (CUDA/Linux)', name_en: 'AI Server Performance & Compatibility Check', level: 85, badge_zh: '熟练', badge_en: 'Proficient' },
      { name_zh: 'API 接口/车载/大数据中台自动化测试', name_en: 'API / Vehicle / Big Data Automation Testing', level: 82, badge_zh: '熟练', badge_en: 'Proficient' },
      { name_zh: 'Python-Django / Vue.js 基础开发与选型', name_en: 'Python Django / Vue.js Framework Selection', level: 80, badge_zh: '良好', badge_en: 'Good' },
    ]
  },
  {
    id: 'licensing',
    iconText: 'CT',
    title_zh: '资质与综合素质',
    title_en: 'Licenses & Credentials',
    desc_zh: '国家职业认证与计算机基础背景',
    desc_en: 'State certified expertise and robust technical backplane',
    stats_zh: [
      { label: '职业资格', value: '高工三级' },
      { label: '英语能力', value: 'CET-4' }
    ],
    stats_en: [
      { label: 'Credential', value: 'Level-3' },
      { label: 'Language', value: 'CET-4' }
    ],
    skills: [
      { name_zh: '人工智能训练师 高级工 (国家职业资格三级)', name_en: 'Certified Senior AI Trainer (National Lvl-3)', level: 96, badge_zh: '高工', badge_en: 'Senior' },
      { name_zh: '大学英语四级 (CET-4 & 科技前沿检索)', name_en: 'CET-4 (English Paper & Tech Documents)', level: 85, badge_zh: '良好', badge_en: 'Good' },
      { name_zh: '物联网工程 (C/C++, Python, SQL, 智能数据处理)', name_en: 'IoT Engineering (C/C++, Python, SQL, Networks)', level: 90, badge_zh: '本科', badge_en: 'Bachelor' }
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: '01',
    title_zh: 'AI 数字客服/行政员工系统',
    title_en: 'RAG Smart Customer Service & Admin Employee System',
    tags: ['RAG', 'LangGraph', 'Vue.js', 'PostgreSQL+pgvector'],
    desc_zh: '内部OA系统中嵌入的AI知识助手，为一线员工提供即时的知识检索、订单信息查询与智能建议能力，日均承接500+内部查询，可解决约85%的高频重复问题，缩短客服新人培养周期60%',
    desc_en: 'Reconstructed the Q&A workflows for corporate customer support and HR. Built using LangChain frameworks, pgvector databases, and custom DAG workpaths. Saved 70% of repetitive workflows while boosting pre-sales transaction rate by 12%.',
    period: '2025'
  },
  {
    id: '02',
    title_zh: 'AIGC 图文营销素材生产流水线',
    title_en: 'AIGC Digital Commercial Material Engine',
    tags: ['Stable Diffusion', 'ComfyUI', 'Gemini Multi-modal', 'ControlNet'],
    desc_zh: '面向小红书爆款图文的高效内容生产品牌底座。依靠 Stable Diffusion / ComfyUI 技术选型与 Gemini 多模态参考解析，实现了品牌素材高保真精准批量产出 2000+，将每张耗时缩短为数小时，素材生成成本降低 95%。',
    desc_en: 'A fully controllable digital product marketing generator. Combined ComfyUI workflows, ControlNet architecture, and Gemini-based prompts. Lowered production expenditure to 5% of traditional photo studios, adding 20% sales volume boosts.',
    period: '2025'
  },
  {
    id: '03',
    title_zh: 'AI 爆款内容拆解复刻 & 差评监控 Agent',
    title_en: 'AI Viral Content Analyzer & Reputation Intelligence Bots',
    tags: ['Coze', '影刀 RPA', '飞书多维表格 API', 'Sentiment Analysis'],
    desc_zh: '构建了多项高实效性的 AI Agent：AI爆款拆解工具帮助内容制作团队将单篇拆解耗时压缩从 30 分钟降低至 5 分钟以内，实现爆款复制；AI差评监控Agent进行7x24不间断情感分析并对高危投诉极速预警，维护品牌美誉。',
    desc_en: 'Designed dual-agent systems using RPA triggers and Multidimensional Sheets APIs. Shortened competitor analysis times by 80% and minimized potential PR incidents through real-time emotional analysis and immediate bot alarms.',
    period: '2025'
  }
];

export const COLLAB_DATA: CollabItem[] = [
  {
    id: 'consulting',
    title_zh: 'AI 落地咨询',
    title_en: 'AI Integration Consulting',
    desc_zh: '深度诊断业务流程痛点，帮助企业量身编写 AI Agent 落地实施报告与技术底脚设计，拒绝“为了AI而AI”。',
    desc_en: 'Deep audit of operation painpoints. Tailor specialized Agent paths for businesses while designing realistic ROI targets.',
    buttonText_zh: '了解更多 ->',
    buttonText_en: 'Learn More ->',
    icon: 'lightbulb'
  },
  {
    id: 'development',
    title_zh: 'AIGC 或智能体项目交付',
    title_en: 'AIGC & Agent Project Turnkey',
    desc_zh: '承揽企业知识库、客服数字人、ComfyUI 素材流水线以及飞书 RPA 流程自动化系统的全流程产品研发设计及技术协同。',
    desc_en: 'Enterprise knowledge Bases, Customer Service Bots, ComfyUI product asset engines and Feishu/Yingdao RPA systems design.',
    buttonText_zh: '了解更多 ->',
    buttonText_en: 'Learn More ->',
    icon: 'rocket'
  },
  {
    id: 'sharing',
    title_zh: '技术沙龙及 SOP 培训',
    title_en: 'Tech Grooming & Training',
    desc_zh: '为内容创造或售后支持团队，提供低代码 Agent 工具与 AIGC 批量生图的标准化操作流程(SOP)讲解辅导，提升团队内容产能高阶技能。',
    desc_en: 'Empower non-technical teams with low-code workflow components and high-efficiency standard operation SOP handbooks and live lectures.',
    buttonText_zh: '了解更多 ->',
    buttonText_en: 'Learn More ->',
    icon: 'megaphone'
  }
];

export const TRANSLATIONS = {
  zh: {
    about: '关于',
    skills: '技能',
    projects: '项目',
    collab: '合作',
    role: 'AI 产品经理 / AIGC 智能体专家',
    location: '浙江 杭州',
    exploreTip: '移动探索镜聚焦极简镜像 • 滚动下方探索完整履历',
    skillsTitle: '专业技能储备',
    skillsBadge: 'SKILLS',
    projectsTitle: '智能体 & AI 落地案例',
    projectsBadge: 'AI IMPLEMENTATIONS',
    collabTitle: '业务赋能与携手共创',
    collabSubtitle: '以业务价值为中心，绝不做单纯概念。我主导的 AI 项目均实现了成本、效率及结果的可量化改进。',
    contactTitle: '与我联系',
    contactSubtitle: '期望结合最前沿大模型与 Agent 工作流技术，持续深耕 AI 应用，探求真正的企业商业效益。',
    coor: '工作坐标',
    coorVal: '浙江 杭州',
    career: '核心角色',
    careerVal: 'AI 产品经理',
    quickContact: '留下您的联络信息及业务诉求',
    yourName: '您的称呼',
    emailAddr: '电子邮箱',
    message: '具体合作设想 / 咨询详情',
    sendMessage: '即刻发送',
    sending: '正在传输...',
    successTitle: '留言递交成功！',
    successMsg: '很荣幸能与您取得联系！您的消息我已经收到，我会尽快配合您的需求进行回复。',
    close: '关闭',
    emailLabel: '首选联络邮箱',
    emailVal: '15970345141@163.com',
    emailAction: '一键发起工作邮件',
    githubLabel: 'GitHub',
    githubVal: 'lwh5141',
    githubAction: '浏览我的技术脚印与开源脚本',
    wechatLabel: '微信微信 (工作及合作专用)',
    wechatVal: '15970345141',
    wechatAction: '复制电话 & 微信账号',
    copied: '已复制账号！您可以通过此手机号快捷添加我的微信。',
  },
  en: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    collab: 'Collab',
    role: 'AI Product Manager / AIGC Prompt-flow Expert',
    location: 'Hangzhou, Zhejiang',
    exploreTip: 'Hover clean lens for mirrored translation • Scroll for dynamic details',
    skillsTitle: 'Technical & Business Competencies',
    skillsBadge: 'SKILLS Matrix',
    projectsTitle: 'AI Core Project Portfolios',
    projectsBadge: 'REAL CASES',
    collabTitle: 'Value Delivery & Team Cooperation',
    collabSubtitle: 'Firm believer in delivering real ROI rather than buzzwords. All projects quantify performance, speed boosts, and content quality.',
    contactTitle: 'Drop Me A Line',
    contactSubtitle: 'Let\'s collaborate on pushing GenAI, complex agents, automated pipelines, or high-performance hardware installations.',
    coor: 'Current Cities',
    coorVal: 'Hangzhou, Zhejiang',
    career: 'Profession',
    careerVal: 'AI Product Manager',
    quickContact: 'Leave message or cooperation queries',
    yourName: 'Your Name',
    emailAddr: 'Email Address',
    message: 'Describe your requirements or questions',
    sendMessage: 'Send to Leo',
    sending: 'Broadcasting...',
    successTitle: 'Message Transmitted!',
    successMsg: 'Thank you for stretching out! I have received your request and will follow up shortly.',
    close: 'Dismiss',
    emailLabel: 'Primary Workplace Mailbox',
    emailVal: '15970345141@163.com',
    emailAction: 'Click to launch mailto',
    githubLabel: 'GitHub Repo',
    githubVal: 'lwh5141',
    githubAction: 'Browse my repositories',
    wechatLabel: 'WeChat / Phone (Business Primary)',
    wechatVal: '15970345141',
    wechatAction: 'Copy Phone/WeChat ID',
    copied: 'Copied successfully! Use this phone number to add me on WeChat.',
  }
};
