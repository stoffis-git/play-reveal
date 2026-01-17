import type { Theme } from './types';

interface QuestionInsight {
  whyItMatters: string;
  matchConversation: string;
  mismatchConversation: string;
  nextStep: string;
}

// Insights for each Round 1 question
export const questionInsights: Record<string, QuestionInsight> = {
  // Conflict questions
  'r1-conflict-1': {
    whyItMatters: "How you handle unexpected changes reveals your stress response patterns. Understanding each other's flexibility helps you navigate life's surprises together.",
    matchConversation: "What's a recent time when plans changed and we handled it well together?",
    mismatchConversation: "When plans change, what would help you feel more supported by me?",
    nextStep: "Next time plans change, check in with each other before reacting."
  },
  'r1-conflict-2': {
    whyItMatters: "The timing of addressing issues shapes how conflicts unfold. Some people need to process internally first, while others think out loud.",
    matchConversation: "What helps you feel safe bringing up difficult topics with me?",
    mismatchConversation: "How can I give you the space or engagement you need when something's bothering you?",
    nextStep: "Create a signal word for 'I need to talk about something' that works for both of you."
  },
  'r1-conflict-3': {
    whyItMatters: "How disagreements resolve shows your conflict patterns. Mutual understanding feels different than one person consistently yielding.",
    matchConversation: "What's an example of a disagreement we resolved in a way that felt good?",
    mismatchConversation: "Do you ever feel like you give in more than I do? Let's talk about balance.",
    nextStep: "After your next disagreement, check in: 'Did that resolution feel fair to both of us?'"
  },
  // Support questions
  'r1-support-1': {
    whyItMatters: "How you recharge after a long day affects your availability for connection. Knowing each other's needs prevents misreading withdrawal as rejection.",
    matchConversation: "What's your ideal evening together after we've both had busy days?",
    mismatchConversation: "How can we balance my need for connection with your need for space after busy days?",
    nextStep: "Establish a 'recharge ritual' that honors both your needs."
  },
  'r1-support-2': {
    whyItMatters: "What you need during tough times isn't always obvious. Some want to process verbally, others want distraction or solitude.",
    matchConversation: "What's the most supported you've ever felt when having a hard day?",
    mismatchConversation: "When you're having a bad day, what's one thing I could do differently?",
    nextStep: "Create a simple code: 'I need talk support' vs 'I need quiet support.'"
  },
  'r1-support-3': {
    whyItMatters: "Your general outlook affects how you approach challenges together. Optimists and realists can complement each other beautifully.",
    matchConversation: "How does our shared outlook help us face challenges?",
    mismatchConversation: "How can my perspective support yours rather than clash with it?",
    nextStep: "When facing a challenge, ask: 'Do you want hope or a reality check right now?'"
  },
  // Daily Life questions
  'r1-dailyLife-1': {
    whyItMatters: "Weekend rhythms reveal your lifestyle preferences. Planners and spontaneous people can thrive together with mutual understanding.",
    matchConversation: "What's your ideal weekend morning look like with me?",
    mismatchConversation: "How can we create weekends that give us both what we need?",
    nextStep: "Alternate between planned and spontaneous weekend mornings."
  },
  'r1-dailyLife-2': {
    whyItMatters: "Hosting styles affect your social life as a couple. Understanding stress triggers helps you support each other during social events.",
    matchConversation: "What makes hosting together enjoyable for us?",
    mismatchConversation: "How can we divide hosting duties to play to our strengths?",
    nextStep: "Before your next gathering, discuss who handles what."
  },
  'r1-dailyLife-3': {
    whyItMatters: "Household balance is one of the most common sources of relationship friction. Perception matters as much as reality here.",
    matchConversation: "What's working well in how we share responsibilities?",
    mismatchConversation: "Let's look at our actual division of tasks—what would feel more fair?",
    nextStep: "List all household tasks and redistribute together."
  },
  // Intimacy questions
  'r1-intimacy-1': {
    whyItMatters: "Physical affection patterns vary widely between people. Understanding when and how you connect physically strengthens your bond.",
    matchConversation: "What are your favorite small moments of affection between us?",
    mismatchConversation: "What would help affection feel more natural throughout our day?",
    nextStep: "Identify three daily moments for intentional physical connection."
  },
  'r1-intimacy-2': {
    whyItMatters: "Initiative patterns in planning reflect how you share emotional labor. Balance here prevents one person from always 'managing' the relationship.",
    matchConversation: "How do we inspire each other to plan things together?",
    mismatchConversation: "Would you like me to initiate more? What kind of plans would you love?",
    nextStep: "Take turns being the 'plan maker' each week."
  },
  // Future questions
  'r1-future-1': {
    whyItMatters: "Alignment on life goals provides a shared direction. It's okay to still be figuring things out—what matters is doing it together.",
    matchConversation: "What shared goal are you most excited about pursuing together?",
    mismatchConversation: "What's one life goal you'd like us to explore more deeply together?",
    nextStep: "Schedule a 'dreams date' to discuss your visions for the future."
  },
  'r1-future-2': {
    whyItMatters: "How you feel about your shared future reflects your security in the relationship. Both excitement and uncertainty are valid.",
    matchConversation: "What makes you most excited about our future together?",
    mismatchConversation: "What would help you feel more certain about our future?",
    nextStep: "Share one specific thing you're looking forward to in your future together."
  },
  // Growth questions
  'r1-growth-1': {
    whyItMatters: "Feeling free to be yourself is fundamental to relationship health. Holding back often signals areas where you need more safety.",
    matchConversation: "What helps you feel so free to be yourself with me?",
    mismatchConversation: "What parts of yourself do you hold back, and what would help you share them?",
    nextStep: "Share one thing about yourself you've never told your partner."
  },
  'r1-growth-2': {
    whyItMatters: "Acknowledging your relationship's current state helps you grow together. Strong places deserve celebration; challenges deserve attention.",
    matchConversation: "What's made our relationship feel so strong lately?",
    mismatchConversation: "What's one thing we could do to strengthen our relationship right now?",
    nextStep: "Celebrate what's working and pick one area to focus on together."
  }
};

// Generic insights by theme for Round 2 questions
export const themeInsights: Record<Theme, { whyItMatters: string; matchConversation: string; mismatchConversation: string; nextStep: string }> = {
  conflict: {
    whyItMatters: "How you handle disagreements shapes the long-term health of your relationship. Different conflict styles aren't bad—they just need understanding.",
    matchConversation: "What's working well in how we handle disagreements?",
    mismatchConversation: "When we disagree, what's one thing I could do to help you feel more heard?",
    nextStep: "After your next conflict, check in about how it felt for both of you."
  },
  support: {
    whyItMatters: "Emotional support is how we feel truly known by our partner. Understanding each other's needs prevents feeling alone in the relationship.",
    matchConversation: "What makes you feel most supported by me?",
    mismatchConversation: "When you need support, what does ideal support from me look like?",
    nextStep: "Create a 'support menu' of what helps each of you feel cared for."
  },
  dailyLife: {
    whyItMatters: "Daily rhythms add up over time. Small alignments in routines can prevent friction and create shared rituals that strengthen your bond.",
    matchConversation: "What daily routine or habit do you love sharing with me?",
    mismatchConversation: "What's one daily habit we could adjust to work better for both of us?",
    nextStep: "Pick one shared daily ritual to establish or improve."
  },
  intimacy: {
    whyItMatters: "Physical and emotional closeness keeps your bond strong. Different needs are normal—what matters is finding a rhythm that works for both.",
    matchConversation: "What makes you feel closest to me?",
    mismatchConversation: "How can we create more moments of connection that work for both of us?",
    nextStep: "Schedule regular time for undistracted connection."
  },
  future: {
    whyItMatters: "A shared vision creates shared motivation. Understanding where your futures align—and differ—helps you build toward common goals.",
    matchConversation: "What excites you most about building our future together?",
    mismatchConversation: "What's one dream you have that you'd like us to explore together?",
    nextStep: "Create a shared 'bucket list' of things you want to experience together."
  },
  growth: {
    whyItMatters: "A healthy relationship helps both partners become better versions of themselves. Feeling safe to grow and be vulnerable is essential.",
    matchConversation: "How has our relationship helped you grow as a person?",
    mismatchConversation: "Is there something you want to explore or change that you'd like my support with?",
    nextStep: "Share one personal goal and discuss how you can support each other."
  }
};

// Additional Round 2 specific insights (for personalized follow-ups)
export const round2QuestionInsights: Record<string, QuestionInsight> = {
  'r2-conflict-1': {
    whyItMatters: "Your immediate response to tension sets the tone for resolution. Understanding each other's cool-down needs prevents escalation.",
    matchConversation: "What helps us stay calm when things get tense?",
    mismatchConversation: "When tensions rise, what signal can we use to pause and regroup?",
    nextStep: "Create a 'time-out' gesture both of you agree on."
  },
  'r2-conflict-2': {
    whyItMatters: "Emotional vs logical approaches aren't right or wrong—they're just different. Knowing your partner's default helps you meet them there.",
    matchConversation: "How does our similar arguing style help us resolve things?",
    mismatchConversation: "When I get emotional/logical, what would help you feel more connected to me?",
    nextStep: "Before your next disagreement, name your mode: 'I'm in feelings mode' or 'I'm in logic mode.'"
  },
  'r2-support-1': {
    whyItMatters: "The difference between wanting empathy and wanting solutions is huge. Getting this wrong can make support feel like criticism.",
    matchConversation: "How does our shared preference make sharing easier?",
    mismatchConversation: "Before I share something, should I ask if you want empathy or advice?",
    nextStep: "Start tough conversations with: 'I need to vent' or 'I need help solving this.'"
  },
  'r2-support-2': {
    whyItMatters: "Your instinct when your partner is sad reveals your love language. Fixers and presence-givers can learn from each other.",
    matchConversation: "What's a time my approach to your sadness really helped?",
    mismatchConversation: "When you're sad, do you want me to try to fix it or just be there?",
    nextStep: "Ask each other: 'What does ideal comfort look like for you?'"
  },
  'r2-dailyLife-1': {
    whyItMatters: "Morning routines set the tone for your entire day together. Clashing rhythms can create unnecessary friction.",
    matchConversation: "What do you love most about our mornings together?",
    mismatchConversation: "How can we honor both our morning needs without stepping on each other's routines?",
    nextStep: "Design your ideal shared morning routine together."
  },
  'r2-intimacy-1': {
    whyItMatters: "Touch frequency reveals underlying needs for connection. It's not about quantity—it's about understanding what each of you needs.",
    matchConversation: "What physical moments throughout the day mean the most to you?",
    mismatchConversation: "How can we find a rhythm of touch that feels natural for both of us?",
    nextStep: "Identify three touch moments you'd both enjoy throughout your typical day."
  },
  'r2-future-1': {
    whyItMatters: "Where you live shapes your lifestyle, community, and opportunities. Alignment here is about more than geography—it's about values.",
    matchConversation: "What excites you most about where we picture ourselves?",
    mismatchConversation: "What matters most to you about where we live, and how can we find common ground?",
    nextStep: "Each write down your top 3 priorities for where to live and compare."
  },
  'r2-growth-1': {
    whyItMatters: "A relationship that helps you grow is one that will last. If you're not becoming better together, it's worth exploring why.",
    matchConversation: "In what ways have we both grown since being together?",
    mismatchConversation: "What's one way this relationship could help you grow more?",
    nextStep: "Share one personal growth goal and discuss how to support each other."
  }
};

export function getInsightForQuestion(questionId: string, theme: Theme): QuestionInsight {
  // First try to get specific insight for this question (Round 1)
  if (questionInsights[questionId]) {
    return questionInsights[questionId];
  }
  // Then try Round 2 specific insights
  if (round2QuestionInsights[questionId]) {
    return round2QuestionInsights[questionId];
  }
  // Fall back to theme-based insight
  return themeInsights[theme];
}

