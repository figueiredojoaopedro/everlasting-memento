export type Language = "en" | "pt-BR";

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "pt-BR", label: "Português" },
];

const en = {
  // Navbar
  "navbar.signIn": "Sign in",

  // HeroSection
  "hero.headline1": "Turn your moments into a,",
  "hero.headline2": "story that lasts...",
  "hero.subtext":
    "Create beautiful private pages with photos, stories, voice notes and moments you never want to lose.",
  "hero.cta": "Build your story",
  "hero.tagline": "It only takes a minute",

  // MementoSection
  "memento.title": "A digital memory space",
  "memento.description":
    "Create a beautiful timeline for a relationship, trip, wedding, anniversary or any meaningful moment.",
  "memento.feature.photos": "Photos",
  "memento.feature.stories": "Stories",
  "memento.feature.voiceNotes": "Voice notes",
  "memento.feature.dates": "Dates",
  "memento.feature.messages": "Messages",
  "memento.shareText":
    "Then privately share it with the people you love.",
  "memento.cta": "See an example memento",

  // PrivacyGateSection
  "privacy.badge": "Privacy first",
  "privacy.title1": "A door that only opens",
  "privacy.title2": "for who you choose",
  "privacy.description":
    "Your memento is invisible until your guest proves they belong. No content renders before they pass the gate.",
  "privacy.password.title": "Password protection",
  "privacy.password.description":
    "Set a single password for your memento. Anyone with the link and the password can see it. Simple, personal, effective.",
  "privacy.preview": "Preview",
  "privacy.password.placeholder": "Enter password",
  "privacy.password.unlock": "Unlock",
  "privacy.password.hidden": "Content hidden until unlocked",
  "privacy.email.title": "Email whitelist",
  "privacy.email.description":
    "Create a list of approved emails. Only those whose email is on the whitelist can access the memento. Everyone else sees the gate.",
  "privacy.email.placeholder": "your@email.com",
  "privacy.email.check": "Check if you have access",
  "privacy.email.approved": "Only approved emails pass through",
  "privacy.callout.title": "No content leaks.",
  "privacy.callout.text":
    "Unlike a private YouTube link or a hidden Instagram account, unauthenticated visitors see absolutely nothing — not even a preview.",

  // WhyNotSocialMedia
  "social.title": "Why not social media?",
  "social.description":
    "We're not competing with apps. We're competing with attention, noise, and forgotten moments.",
  "social.header.everlasting": "Everlasting",
  "social.header.socialMedia": "Social Media",
  "social.private.default": "Private by default",
  "social.public.default": "Public by default",
  "social.made.memories": "Made for memories",
  "social.made.attention": "Made for attention",
  "social.calm.timeless": "Calm & timeless",
  "social.fast.disposable": "Fast & disposable",
  "social.no.ads": "No ads, no algorithms",
  "social.algorithm": "Algorithm driven",
  "social.emotional": "Emotional storytelling",
  "social.scrolling": "Endless scrolling",
  "social.bottomText":
    "You don't need another social network. You need a place where the moments that matter can breathe.",
  "social.tagline": "That's what Everlasting is.",

  // HowItWorks
  "how.title": "How it works",
  "how.description":
    "Three simple steps. No clutter, no learning curve.",
  "how.step1.title": "Create your memento",
  "how.step1.description":
    "Give it a title, pick a date, and upload a cover image. It takes less than a minute.",
  "how.step2.title": "Add your memories",
  "how.step2.description":
    "Photos, descriptions, dates, and what each moment means to you. Build your story one memory at a time.",
  "how.step3.title": "Share with who matters",
  "how.step3.description":
    "Send the private link. They see a beautiful timeline — no ads, no algorithms, no noise.",

  // PricingSection
  "pricing.title": "Choose your plan",
  "pricing.description":
    "Preserve your moments. One payment, no recurring fees.",
  "pricing.weekly.badge": "7 days",
  "pricing.yearly.badge": "1 year",
  "pricing.oneTime": "One-time payment",
  "pricing.bestValue": "Best value",
  "pricing.cta": "Get Started",
  "pricing.footer": "One payment. Your memento lives forever.",
  "pricing.feature.photos": "Up to 5 photos",
  "pricing.feature.password": "Password or email whitelist",
  "pricing.feature.voiceNotes": "Voice notes",
  "pricing.feature.messages": "Messages",
  "pricing.feature.dates": "Dates",
  "pricing.feature.qrcode": "Shareable QR code",

  // FeatureGrid
  "feature.emotional.title": "Emotional Focus",
  "feature.emotional.description":
    "Not just photos. Turn your moments into a story that lives on.",
  "feature.private.title": "Private by Default",
  "feature.private.description":
    "Your memento is private. You decide when and who to share it with. No social media noise.",
  "feature.sharing.title": "Beautiful Sharing",
  "feature.sharing.description":
    "Share a clean, read-only timeline that looks like a digital art gallery of your moments.",

  // FooterSection
  "footer.tagline": "Built for the moments that matter.",
} as const;

const ptBR: Record<string, string> = {
  // Navbar
  "navbar.signIn": "Entrar",

  // HeroSection
  "hero.headline1": "Transforme seus momentos em uma,",
  "hero.headline2": "história que dura...",
  "hero.subtext":
    "Crie páginas privadas bonitas com fotos, histórias, notas de voz e momentos que você nunca quer perder.",
  "hero.cta": "Monte sua história",
  "hero.tagline": "Leva apenas um minuto",

  // MementoSection
  "memento.title": "Um espaço digital de memórias",
  "memento.description":
    "Crie uma linda linha do tempo para um relacionamento, viagem, casamento, aniversário ou qualquer momento significativo.",
  "memento.feature.photos": "Fotos",
  "memento.feature.stories": "Histórias",
  "memento.feature.voiceNotes": "Notas de voz",
  "memento.feature.dates": "Datas",
  "memento.feature.messages": "Mensagens",
  "memento.shareText":
    "Compartilhe-o privadamente com quem você ama.",
  "memento.cta": "Veja um exemplo de memento",

  // PrivacyGateSection
  "privacy.badge": "Privacidade primeiro",
  "privacy.title1": "Uma porta que só abre",
  "privacy.title2": "para quem você escolher",
  "privacy.description":
    "Seu memento é invisível até que seu convidado prove que pertence. Nenhum conteúdo é renderizado antes que ele passe pelo portão.",
  "privacy.password.title": "Proteção por senha",
  "privacy.password.description":
    "Defina uma senha para seu memento. Qualquer pessoa com o link e a senha pode vê-lo. Simples, pessoal, eficaz.",
  "privacy.preview": "Prévia",
  "privacy.password.placeholder": "Digite a senha",
  "privacy.password.unlock": "Desbloquear",
  "privacy.password.hidden": "Conteúdo oculto até desbloquear",
  "privacy.email.title": "Lista de e-mails",
  "privacy.email.description":
    "Crie uma lista de e-mails aprovados. Apenas aqueles cujo e-mail está na lista podem acessar o memento. Todos os outros veem o portão.",
  "privacy.email.placeholder": "seu@email.com",
  "privacy.email.check": "Verifique se você tem acesso",
  "privacy.email.approved": "Apenas e-mails aprovados passam",
  "privacy.callout.title": "Sem vazamento de conteúdo.",
  "privacy.callout.text":
    "Diferente de um link privado do YouTube ou uma conta oculta do Instagram, visitantes não autenticados não veem absolutamente nada — nem mesmo uma prévia.",

  // WhyNotSocialMedia
  "social.title": "Por que não redes sociais?",
  "social.description":
    "Não estamos competindo com aplicativos. Estamos competindo com atenção, barulho e momentos esquecidos.",
  "social.header.everlasting": "Everlasting",
  "social.header.socialMedia": "Redes Sociais",
  "social.private.default": "Privado por padrão",
  "social.public.default": "Público por padrão",
  "social.made.memories": "Feito para memórias",
  "social.made.attention": "Feito para atenção",
  "social.calm.timeless": "Calmo e atemporal",
  "social.fast.disposable": "Rápido e descartável",
  "social.no.ads": "Sem anúncios, sem algoritmos",
  "social.algorithm": "Guiado por algoritmos",
  "social.emotional": "Contação emocional",
  "social.scrolling": "Rolagem infinita",
  "social.bottomText":
    "Você não precisa de outra rede social. Você precisa de um lugar onde os momentos que importam possam respirar.",
  "social.tagline": "É para isso que o Everlasting serve.",

  // HowItWorks
  "how.title": "Como funciona",
  "how.description":
    "Três passos simples. Sem complicação, sem curva de aprendizado.",
  "how.step1.title": "Crie seu memento",
  "how.step1.description":
    "Dê um título, escolha uma data e envie uma imagem de capa. Leva menos de um minuto.",
  "how.step2.title": "Adicione suas memórias",
  "how.step2.description":
    "Fotos, descrições, datas e o que cada momento significa para você. Monte sua história uma memória de cada vez.",
  "how.step3.title": "Compartilhe com quem importa",
  "how.step3.description":
    "Envie o link privado. Eles veem uma linda linha do tempo — sem anúncios, sem algoritmos, sem barulho.",

  // PricingSection
  "pricing.title": "Escolha seu plano",
  "pricing.description":
    "Preserve seus momentos. Um pagamento, sem taxas recorrentes.",
  "pricing.weekly.badge": "Semanal",
  "pricing.yearly.badge": "Anual",
  "pricing.oneTime": "Pagamento único",
  "pricing.bestValue": "Melhor valor",
  "pricing.cta": "Começar",
  "pricing.footer": "Pagamento único. Seu memento vive para sempre.",
  "pricing.feature.photos": "Até 5 fotos",
  "pricing.feature.password": "Senha ou lista de e-mails",
  "pricing.feature.voiceNotes": "Notas de voz",
  "pricing.feature.messages": "Mensagens",
  "pricing.feature.dates": "Datas",
  "pricing.feature.qrcode": "QR code compartilhável",

  // FeatureGrid
  "feature.emotional.title": "Foco Emocional",
  "feature.emotional.description":
    "Não apenas fotos. Transforme seus momentos em uma história que continua.",
  "feature.private.title": "Privado por Padrão",
  "feature.private.description":
    "Seu memento é privado. Você decide quando e com quem compartilhar. Sem o barulho das redes sociais.",
  "feature.sharing.title": "Compartilhamento Bonito",
  "feature.sharing.description":
    "Compartilhe uma linha do tempo limpa e somente leitura que parece uma galeria de arte digital dos seus momentos.",

  // FooterSection
  "footer.tagline": "Feito para os momentos que importam.",
};

export const translations: Record<Language, Record<string, string>> = {
  en: en as unknown as Record<string, string>,
  "pt-BR": ptBR,
};
