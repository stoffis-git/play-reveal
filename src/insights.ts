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
    matchConversation: "Think of a time when last-minute plans changed—how did we both adapt together?",
    mismatchConversation: "When plans change at the last minute, what specific support do you need from me—space to process or help problem-solving?",
    nextStep: "Next time plans change, check in with each other before reacting."
  },
  'r1-conflict-2': {
    whyItMatters: "The timing of addressing issues shapes how conflicts unfold. Some people need to process internally first, while others think out loud.",
    matchConversation: "What makes it feel safe for you to bring up something that's bothering you right away?",
    mismatchConversation: "When something's bothering you, do you need me to give you space to process first, or would you prefer I check in and ask about it?",
    nextStep: "Create a signal word for 'I need to talk about something' that works for both of you."
  },
  'r1-conflict-3': {
    whyItMatters: "How disagreements resolve shows your conflict patterns. Mutual understanding feels different than one person consistently yielding.",
    matchConversation: "Can you think of a disagreement where we both pushed to understand each other—how did that feel?",
    mismatchConversation: "When we disagree, do you feel like you're the one who usually lets things go, or do I? Let's talk about that pattern.",
    nextStep: "After your next disagreement, check in: 'Did that resolution feel fair to both of us?'"
  },
  // Support questions
  'r1-support-1': {
    whyItMatters: "How you recharge after a long day affects your availability for connection. Knowing each other's needs prevents misreading withdrawal as rejection.",
    matchConversation: "After we've both had busy days, what's our ideal way to reconnect—do we both want the same thing?",
    mismatchConversation: "When I want to talk after a busy day but you need to decompress alone, how can we honor both needs?",
    nextStep: "Establish a 'recharge ritual' that honors both your needs."
  },
  'r1-support-2': {
    whyItMatters: "What you need during tough times isn't always obvious. Some want to process verbally, others want distraction or solitude.",
    matchConversation: "When you're having a bad day, what's the most helpful thing I've done to support you?",
    mismatchConversation: "On a bad day, do you want me to ask you about it, or would you prefer I give you space or distract you?",
    nextStep: "Create a simple code: 'I need talk support' vs 'I need quiet support.'"
  },
  'r1-support-3': {
    whyItMatters: "Your general outlook affects how you approach challenges together. Optimists and realists can complement each other beautifully.",
    matchConversation: "How does our similar outlook (optimistic/realistic) help us tackle challenges together?",
    mismatchConversation: "When I'm optimistic but you're more cautious, how can we use both perspectives instead of clashing?",
    nextStep: "When facing a challenge, ask: 'Do you want hope or a reality check right now?'"
  },
  // Daily Life questions
  'r1-dailyLife-1': {
    whyItMatters: "Weekend rhythms reveal your lifestyle preferences. Planners and spontaneous people can thrive together with mutual understanding.",
    matchConversation: "What makes our weekend mornings work so well—is it the planning or the spontaneity?",
    mismatchConversation: "On weekend mornings, how can we balance your need for a plan with my preference to go with the flow?",
    nextStep: "Alternate between planned and spontaneous weekend mornings."
  },
  'r1-dailyLife-2': {
    whyItMatters: "Hosting styles affect your social life as a couple. Understanding stress triggers helps you support each other during social events.",
    matchConversation: "What makes hosting together enjoyable for both of us—what's working?",
    mismatchConversation: "When houseguests are coming, how can we divide the prep so the excited person takes the lead and the stressed person gets support?",
    nextStep: "Before your next gathering, discuss who handles what."
  },
  'r1-dailyLife-3': {
    whyItMatters: "Household balance is one of the most common sources of relationship friction. Perception matters as much as reality here.",
    matchConversation: "What household tasks do you think we split most fairly?",
    mismatchConversation: "When it comes to chores, do you think they're evenly split or does one person do more? Let's compare our actual lists.",
    nextStep: "List all household tasks and redistribute together."
  },
  // Intimacy questions
  'r1-intimacy-1': {
    whyItMatters: "Physical affection patterns vary widely between people. Understanding when and how you connect physically strengthens your bond.",
    matchConversation: "What are your favorite moments of spontaneous affection throughout our day?",
    mismatchConversation: "For spontaneous affection, would you prefer it happens more naturally throughout the day, or at specific times that feel right?",
    nextStep: "Identify three daily moments for intentional physical connection."
  },
  'r1-intimacy-2': {
    whyItMatters: "Initiative patterns in planning reflect how you share emotional labor. Balance here prevents one person from always 'managing' the relationship.",
    matchConversation: "How do we both contribute to making plans together—what's our balance?",
    mismatchConversation: "When it comes to making plans, would you like me to initiate more often? What kind of plans would you love me to suggest?",
    nextStep: "Take turns being the 'plan maker' each week."
  },
  // Future questions
  'r1-future-1': {
    whyItMatters: "Alignment on life goals provides a shared direction. It's okay to still be figuring things out—what matters is doing it together.",
    matchConversation: "What big life goal are we most aligned on, and what excites you about pursuing it together?",
    mismatchConversation: "Which of your life goals would you like us to explore more deeply together—where do you want more alignment?",
    nextStep: "Schedule a 'dreams date' to discuss your visions for the future."
  },
  'r1-future-2': {
    whyItMatters: "How you feel about your shared future reflects your security in the relationship. Both excitement and uncertainty are valid.",
    matchConversation: "When you picture us in 10 years, what makes you most excited and confident?",
    mismatchConversation: "When you imagine us in 10 years, what feels uncertain, and what would help you feel more confident?",
    nextStep: "Share one specific thing you're looking forward to in your future together."
  },
  // Growth questions
  'r1-growth-1': {
    whyItMatters: "Feeling free to be yourself is fundamental to relationship health. Holding back often signals areas where you need more safety.",
    matchConversation: "What helps you feel so free to be completely yourself with me?",
    mismatchConversation: "What parts of yourself do you hold back in this relationship, and what would make it safer to share them?",
    nextStep: "Share one thing about yourself you've never told your partner."
  },
  'r1-growth-2': {
    whyItMatters: "Acknowledging your relationship's current state helps you grow together. Strong places deserve celebration; challenges deserve attention.",
    matchConversation: "What's made our relationship feel so strong lately—what should we celebrate?",
    mismatchConversation: "Right now, what's one thing we could do to strengthen our relationship and move through these ups and downs?",
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
  // Batch 2: Round 2 Conflict questions 1-15
  'r2-conflict-1': {
    whyItMatters: "Your immediate response to tension sets the tone for resolution. Understanding each other's cool-down needs prevents escalation.",
    matchConversation: "When tensions are high, what helps us both want to resolve it immediately?",
    mismatchConversation: "When tensions are high, I want to resolve it immediately but you need time to cool down—what signal can we use to pause?",
    nextStep: "Create a 'time-out' gesture both of you agree on."
  },
  'r2-conflict-2': {
    whyItMatters: "Emotional vs logical approaches aren't right or wrong—they're just different. Knowing your partner's default helps you meet them there.",
    matchConversation: "During arguments, how does our similar approach (both calm/logical or both emotional/reactive) help us resolve things?",
    mismatchConversation: "When I stay calm and logical during an argument but you get emotional and reactive, what would help you feel more heard?",
    nextStep: "Before your next disagreement, name your mode: 'I'm in feelings mode' or 'I'm in logic mode.'"
  },
  'r2-conflict-3': {
    whyItMatters: "How you feel after conflict reveals your emotional recovery needs. Some people feel closer after resolution, others need time to recover.",
    matchConversation: "After we fight, what helps us both feel closer once it's resolved?",
    mismatchConversation: "After a fight, I feel closer once it's resolved but you feel drained and need recovery time—how can we honor both needs?",
    nextStep: "After your next conflict, check in about how you each feel—closer or drained?"
  },
  'r2-conflict-4': {
    whyItMatters: "How you receive criticism shows your defensive patterns. Understanding triggers helps you respond with curiosity instead of defensiveness.",
    matchConversation: "When I criticize something you did, what helps you try to understand my perspective?",
    mismatchConversation: "When I criticize something you did, do you get defensive at first? What would help you feel less attacked?",
    nextStep: "Next time criticism comes up, pause and ask: 'What are you really trying to tell me?'"
  },
  'r2-conflict-5': {
    whyItMatters: "Repeating arguments signal deeper patterns. Some people try new approaches, others notice the pattern but struggle to break it.",
    matchConversation: "When the same argument keeps coming up, how do we both try different approaches?",
    mismatchConversation: "If the same argument keeps coming up, do you try different approaches or notice it follows a similar pattern? What's underneath this?",
    nextStep: "Identify one recurring argument and explore what deeper need isn't being met."
  },
  'r2-conflict-6': {
    whyItMatters: "Apology ease reveals your relationship with vulnerability. Some apologize easily, others need time to process their role.",
    matchConversation: "When you need to apologize, what makes it easy for you to do it?",
    mismatchConversation: "When you need to apologize, does it come easily or does it take you a while? What makes it hard?",
    nextStep: "Practice: 'I'm sorry for [specific thing]. How did that make you feel?'"
  },
  'r2-conflict-7': {
    whyItMatters: "What you prioritize in disagreements reveals your communication values. Being understood vs understanding your partner are both valid needs.",
    matchConversation: "In disagreements, how do we both balance wanting to be understood and wanting to understand each other?",
    mismatchConversation: "In disagreements, do you prioritize being understood or understanding me? How can we meet both needs?",
    nextStep: "Try: 'I want to understand you first, then I want you to understand me.'"
  },
  'r2-conflict-8': {
    whyItMatters: "Timing of addressing upsets affects conflict outcomes. Some need to speak immediately, others wait for the right moment.",
    matchConversation: "When something upsets you, what helps you bring it up right away?",
    mismatchConversation: "When something upsets you, do you say something right away or wait for the right moment? How can I help you feel safe to speak up?",
    nextStep: "Create a safe phrase: 'I need to talk about something that's bothering me.'"
  },
  'r2-conflict-9': {
    whyItMatters: "How you handle small annoyances affects relationship harmony. Some address them immediately, others let most things go.",
    matchConversation: "When it comes to small annoyances, how do we both decide whether to address them or let them go?",
    mismatchConversation: "For small annoyances, I think they should be addressed when they happen but you prefer to let them go—how do we decide which ones matter?",
    nextStep: "Agree: address annoyances that happen 3+ times, let go of one-offs."
  },
  'r2-conflict-10': {
    whyItMatters: "Compromise patterns reveal power dynamics. Fair compromise feels different than one person consistently giving in.",
    matchConversation: "When we disagree on something important, how do we both feel about our ability to compromise fairly?",
    mismatchConversation: "When we disagree on something important, do you feel like you compromise fairly or like one of us usually gives in?",
    nextStep: "Track your next important disagreement—did the resolution feel balanced?"
  },
  'r2-conflict-11': {
    whyItMatters: "How you express hurt affects conflict resolution. Direct expression vs behavioral signals require different responses.",
    matchConversation: "When you feel hurt, how do you express it clearly to me?",
    mismatchConversation: "When you feel hurt, do you express it clearly or show it through your behavior? How can I better notice and respond?",
    nextStep: "Practice: 'I feel hurt when [specific thing].'"
  },
  'r2-conflict-12': {
    whyItMatters: "Voice intensity during conflict affects escalation. Calm voices de-escalate; louder voices can trigger defensive responses.",
    matchConversation: "During heated moments, how do we both keep our voices relatively calm?",
    mismatchConversation: "During heated moments, my voice stays calm but yours gets louder—what triggers that, and how can we both stay calmer?",
    nextStep: "Agree: if voices get loud, take a 10-minute break."
  },
  'r2-conflict-13': {
    whyItMatters: "Post-conflict processing needs vary. Some need to talk it through completely, others prefer to move on quickly.",
    matchConversation: "After a disagreement, how do we both process it—talking it through or moving on?",
    mismatchConversation: "After a disagreement, I want to talk it through completely but you prefer to move on—how can we honor both needs?",
    nextStep: "Try: 'I need 10 more minutes to process, then we can move on.'"
  },
  'r2-conflict-14': {
    whyItMatters: "How you respond to your partner's frustration reveals your support style. Fixers vs space-givers need different approaches.",
    matchConversation: "When you're frustrated with me, what helps me respond in a way that works for you?",
    mismatchConversation: "When you're frustrated with me, I want to fix it immediately but you need space first—how can I know which you need?",
    nextStep: "Ask: 'Do you want me to fix this now or give you space?'"
  },
  'r2-conflict-15': {
    whyItMatters: "Timing of problem discussions affects outcomes. Immediate discussion vs waiting for calm both have their place.",
    matchConversation: "When we have problems, how do we both decide when to discuss them—as soon as possible or when we're calm?",
    mismatchConversation: "I think problems should be discussed as soon as possible, but you prefer when both people are calm—how do we find the right timing?",
    nextStep: "Agree: urgent problems get discussed immediately, others wait until both are calm."
  },
  'r2-conflict-16': {
    whyItMatters: "Admitting you're wrong requires vulnerability. Some do it easily, others need time to process and accept their mistake.",
    matchConversation: "When you're wrong, what makes it easy for you to admit it pretty quickly?",
    mismatchConversation: "When you're wrong, does it take you time to accept it? What would help you get there faster?",
    nextStep: "Practice: 'I was wrong about [specific thing]. I'm sorry.'"
  },
  'r2-conflict-17': {
    whyItMatters: "Self-awareness about communication skills affects growth. Recognizing strengths vs areas for improvement both matter.",
    matchConversation: "What do you think you do well in communication during conflict?",
    mismatchConversation: "Do you think your communication during conflict is something you do well or something you're working on? What would help?",
    nextStep: "Ask each other: 'What's one thing I do well in conflict, and one thing I could improve?'"
  },
  'r2-conflict-18': {
    whyItMatters: "Bedtime arguments affect sleep and next-day connection. Some need resolution before sleep, others need to sleep on it.",
    matchConversation: "If we argue before bed, how do we both handle it—resolving it first or sleeping on it?",
    mismatchConversation: "If we argue before bed, I try to resolve it first but you need to sleep on it—how can we handle this better?",
    nextStep: "Agree: if it's late, pause and revisit in the morning."
  },
  'r2-conflict-19': {
    whyItMatters: "Silent treatment patterns reveal communication breakdowns. Rare silent treatment vs occasional use signal different dynamics.",
    matchConversation: "In our relationship, how do we avoid silent treatment when we're upset?",
    mismatchConversation: "Does silent treatment happen in our relationship? When it does, what's really going on underneath?",
    nextStep: "Replace silent treatment with: 'I need space, let's talk in [time].'"
  },
  'r2-conflict-20': {
    whyItMatters: "How you remember past arguments reveals perspective differences. Similar memories vs different details affect resolution.",
    matchConversation: "When we recall past arguments, do you think we remember them similarly?",
    mismatchConversation: "When recalling past arguments, do you notice we remember different details? What does that tell us?",
    nextStep: "After your next argument, each write down what happened and compare."
  },
  'r2-conflict-21': {
    whyItMatters: "Safety in bringing up sensitive topics affects relationship depth. Feeling safe vs risky changes what gets discussed.",
    matchConversation: "What makes bringing up sensitive topics feel safe and welcomed between us?",
    mismatchConversation: "When you bring up sensitive topics, does it feel safe or a bit risky? What would make it safer?",
    nextStep: "Create a safe space ritual: 'I want to share something sensitive. Can you just listen first?'"
  },
  'r2-conflict-22': {
    whyItMatters: "Stress affects communication consistency. Stable communication vs noticeable changes under stress require different support.",
    matchConversation: "When you're stressed, how does your communication style stay mostly the same?",
    mismatchConversation: "When you're stressed, does your communication style change noticeably? How can I support you during those times?",
    nextStep: "Notice: when stressed, check in about communication needs."
  },
  'r2-conflict-23': {
    whyItMatters: "Recognizing your communication strengths builds confidence. Honesty vs patience are both valuable in different situations.",
    matchConversation: "What do you think is your biggest communication strength—honesty or patience?",
    mismatchConversation: "Do you think your biggest communication strength is your honesty or your patience? How can we use both?",
    nextStep: "Use your strength: if honest, balance with patience; if patient, balance with honesty."
  },
  'r2-conflict-24': {
    whyItMatters: "How you respond to feeling unheard affects conflict escalation. Direct communication vs emotional withdrawal need different responses.",
    matchConversation: "When you feel unheard, how do you say so directly?",
    mismatchConversation: "When you feel unheard, do you say so directly or pull back emotionally? How can I help you feel heard?",
    nextStep: "Practice: 'I feel unheard when [specific thing]. Can you repeat back what you heard?'"
  },
  'r2-conflict-25': {
    whyItMatters: "Apology ease reveals relationship safety. Natural apologies vs challenging ones signal different comfort levels with vulnerability.",
    matchConversation: "When you need to say 'I'm sorry,' what makes it happen naturally?",
    mismatchConversation: "When you need to say 'I'm sorry,' does it happen naturally or can it be challenging? What makes it hard?",
    nextStep: "Make apologies easier: 'I'm sorry for [specific thing]. I see how that hurt you.'"
  },
  'r2-conflict-26': {
    whyItMatters: "Focus during disagreements reveals problem-solving styles. Issue-focused vs pattern-focused approaches both have value.",
    matchConversation: "During disagreements, how do we both focus—on the specific issue or the bigger patterns?",
    mismatchConversation: "During disagreements, I focus on the specific issue but you notice bigger patterns—how can we address both?",
    nextStep: "Try: address the specific issue first, then explore the pattern."
  },
  'r2-conflict-27': {
    whyItMatters: "Perception of fight frequency affects relationship satisfaction. Less than most vs about average both need validation.",
    matchConversation: "Do you think we fight less than most couples or about as much? What's our normal?",
    mismatchConversation: "I think we fight less than most couples, but you think it's about average—what's a healthy amount for us?",
    nextStep: "Track: how often do you actually disagree vs how often it feels like conflict?"
  },
  'r2-conflict-28': {
    whyItMatters: "Resolution strategies when you can't agree reveal conflict maturity. Middle ground vs agree-to-disagree both have their place.",
    matchConversation: "When we can't agree, how do we both find middle ground or agree to disagree?",
    mismatchConversation: "When we can't agree, I look for middle ground but you can agree to disagree—when is each approach right?",
    nextStep: "Decide: which disagreements need middle ground, which can we agree to disagree on?"
  },
  'r2-conflict-29': {
    whyItMatters: "Financial discussions reveal conflict triggers. Smooth money talks vs tension-creating ones signal different money relationship dynamics.",
    matchConversation: "When we discuss money or finances, what makes it go smoothly for us?",
    mismatchConversation: "When we discuss money, does it usually go smoothly or create tension? What's the tension really about?",
    nextStep: "Schedule regular money check-ins when you're both calm."
  },
  'r2-conflict-30': {
    whyItMatters: "How you respond to venting reveals support styles. Listening vs problem-solving are both valid but need to match the need.",
    matchConversation: "When I need to vent, how do you listen without trying to fix it?",
    mismatchConversation: "When I need to vent, do you listen without trying to fix it, or do you naturally try to solve it? What do I actually need?",
    nextStep: "Ask before responding: 'Do you want me to listen or help solve this?'"
  },
  // Batch 4: Round 2 Support questions 1-15
  'r2-support-1': {
    whyItMatters: "The difference between wanting empathy and wanting solutions is huge. Getting this wrong can make support feel like criticism.",
    matchConversation: "When I share about my day, how does our shared preference (both want empathy or both want advice) make it easier?",
    mismatchConversation: "When I share about my day, I mostly want empathy but you want to give advice—can you ask first what I need?",
    nextStep: "Start tough conversations with: 'I need to vent' or 'I need help solving this.'"
  },
  'r2-support-2': {
    whyItMatters: "Your instinct when your partner is sad reveals your love language. Fixers and presence-givers can learn from each other.",
    matchConversation: "When you're sad, what's a time my approach really helped you?",
    mismatchConversation: "When you're sad, I want to fix it for you but you just want me to be present—how can I do that better?",
    nextStep: "Ask each other: 'What does ideal comfort look like for you?'"
  },
  'r2-support-3': {
    whyItMatters: "Connection styles vary. Some feel closest through deep talk, others through shared activities. Both are valid paths to intimacy.",
    matchConversation: "When do we both feel most connected—talking deeply or doing things together?",
    mismatchConversation: "I feel most connected when we're talking deeply, but you feel it when we're doing things together—how can we do both?",
    nextStep: "Plan: one deep conversation and one activity together this week."
  },
  'r2-support-4': {
    whyItMatters: "Love languages affect how you receive support. Words vs actions both express love but need to match your partner's preference.",
    matchConversation: "What's your preferred way to receive love—words and affirmations or actions and quality time?",
    mismatchConversation: "My preferred way to receive love is words, but yours is actions—how can we speak each other's language?",
    nextStep: "This week: give love in your partner's preferred language."
  },
  'r2-support-5': {
    whyItMatters: "Stress support needs vary. Some want check-ins and talk, others need space. Matching the need prevents support from feeling like pressure.",
    matchConversation: "When I'm stressed, what do I need from you—check in and talk or give me space?",
    mismatchConversation: "When I'm stressed, I need you to check in and talk, but you prefer to give me space—how can we meet in the middle?",
    nextStep: "Create a signal: 'I need space' or 'I need you to check in.'"
  },
  'r2-support-6': {
    whyItMatters: "Independence vs interdependence in tough times reveals your support patterns. Leaning in vs handling independently both are healthy.",
    matchConversation: "In tough times, how do we both balance leaning on each other and handling things independently?",
    mismatchConversation: "In tough times, I tend to lean on you more, but you handle things independently—how can we find balance?",
    nextStep: "Check in: 'Do you want me to help with this, or do you need to handle it yourself?'"
  },
  'r2-support-7': {
    whyItMatters: "What makes you feel supported reveals your emotional needs. Validation vs action both matter but serve different purposes.",
    matchConversation: "What makes you feel most supported—when I validate your feelings or when I take action to help?",
    mismatchConversation: "I feel supported when you validate my feelings, but you take action to help—how can we do both?",
    nextStep: "Try: validate first, then ask if action would help."
  },
  'r2-support-8': {
    whyItMatters: "Vulnerability comfort affects relationship depth. Natural sharing vs scary sharing signal different levels of safety.",
    matchConversation: "What makes sharing your vulnerabilities come naturally with me?",
    mismatchConversation: "Sharing vulnerabilities comes naturally for me, but it still feels a bit scary for you—what would make it safer?",
    nextStep: "Share one small vulnerability this week and see how it feels."
  },
  'r2-support-9': {
    whyItMatters: "Emotional attunement affects support timing. Sensing vs being told reveals different levels of connection and awareness.",
    matchConversation: "When you're having a rough day, how do I sense it pretty quickly?",
    mismatchConversation: "When you're having a rough day, I usually need you to tell me—how can I get better at sensing it?",
    nextStep: "Practice: notice small changes in mood, energy, or behavior."
  },
  'r2-support-10': {
    whyItMatters: "Comfort with crying reveals emotional safety. Crying freely vs avoiding it signals different comfort levels with emotional expression.",
    matchConversation: "What makes crying in front of me feel completely okay for you?",
    mismatchConversation: "Crying in front of you feels completely okay for me, but you try to avoid it—what would make it safer?",
    nextStep: "Normalize: 'It's okay to cry. I'm here.'"
  },
  'r2-support-11': {
    whyItMatters: "How you show love reveals your love language. Words vs actions both express love but need to match your partner's needs.",
    matchConversation: "How do you show love primarily—saying how you feel or doing things for me?",
    mismatchConversation: "I show love by saying how I feel, but you do things for me—how can we appreciate each other's style?",
    nextStep: "Notice: when your partner shows love, even if it's not your style."
  },
  'r2-support-12': {
    whyItMatters: "Celebration styles affect how you feel seen. Big celebrations vs low-key ones both honor wins but serve different needs.",
    matchConversation: "When we celebrate wins together, how do we both like to do it—big deal or low-key?",
    mismatchConversation: "When celebrating wins, I like to make a big deal of it, but you prefer keeping it low-key—how can we honor both?",
    nextStep: "Ask: 'How do you want to celebrate this win?'"
  },
  'r2-support-13': {
    whyItMatters: "What makes you feel appreciated reveals your appreciation language. Words vs gestures both matter but need to match your needs.",
    matchConversation: "What makes you feel most appreciated—when I say thank you or when I return the gesture?",
    mismatchConversation: "I feel most appreciated when you say thank you, but you prefer when I return the gesture—how can we do both?",
    nextStep: "Try: say thank you AND return the gesture."
  },
  'r2-support-14': {
    whyItMatters: "Decision-making support needs vary. Constant input vs independent processing both are valid approaches to big decisions.",
    matchConversation: "During big life decisions, how do we both want to involve each other—constant input or independent processing first?",
    mismatchConversation: "During big life decisions, I want constant input from you, but you process independently first—how can we balance this?",
    nextStep: "Agree: big decisions get discussed, but allow independent thinking time first."
  },
  'r2-support-15': {
    whyItMatters: "Support strengths vary. Emotional conversations vs practical support both matter but serve different needs.",
    matchConversation: "What are we both good at—emotional conversations or practical support?",
    mismatchConversation: "I think we're good at emotional conversations, but you think we're better at practical support—how can we strengthen both?",
    nextStep: "Practice: have one emotional conversation and do one practical support gesture this week."
  },
  'r2-support-16': {
    whyItMatters: "Sharing timing affects support effectiveness. Immediate sharing vs waiting for clarity both have their place.",
    matchConversation: "When you're worried about something, how do you decide whether to share it right away or wait?",
    mismatchConversation: "If I'm worried about something, I share it right away, but you wait until you have more clarity—how can we meet in the middle?",
    nextStep: "Try: share worries early, but say 'I'm still processing this.'"
  },
  'r2-support-17': {
    whyItMatters: "Physical comfort preferences vary. Hugs vs talking both provide support but serve different emotional needs.",
    matchConversation: "When you're upset, how important is physical comfort like hugs compared to talking?",
    mismatchConversation: "When I'm upset, physical comfort like hugs is very important, but you prefer talking—how can we do both?",
    nextStep: "Offer: a hug first, then ask if they want to talk."
  },
  'r2-support-18': {
    whyItMatters: "Emotional bond depth affects relationship security. Deep and secure vs growing and evolving both are healthy states.",
    matchConversation: "How would you describe our emotional bond—deep and secure or growing and evolving?",
    mismatchConversation: "I'd describe our emotional bond as deep and secure, but you see it as growing and evolving—what does that mean to you?",
    nextStep: "Discuss: what does a deep emotional bond look like to each of you?"
  },
  'r2-support-19': {
    whyItMatters: "Response to being misunderstood affects relationship dynamics. Explaining differently vs feeling frustrated reveal different communication patterns.",
    matchConversation: "When I don't understand you, how do you try explaining differently?",
    mismatchConversation: "When I don't understand you, you try explaining differently, but I just feel frustrated—how can I help you feel heard?",
    nextStep: "Practice: 'Let me make sure I understand—you're saying...'"
  },
  'r2-support-20': {
    whyItMatters: "Asking for help comfort reveals relationship safety. Easy asking vs learning to ask signal different comfort levels with vulnerability.",
    matchConversation: "What makes asking for help from me come easily to you?",
    mismatchConversation: "Asking for help comes easily for me, but it's something you're learning—what would make it easier?",
    nextStep: "Practice: ask for help with one small thing this week."
  },
  'r2-support-21': {
    whyItMatters: "Sharing timing for good news reveals connection patterns. Immediate sharing vs waiting both show different ways of including your partner.",
    matchConversation: "When something exciting happens, how do you decide whether to tell me right away or wait?",
    mismatchConversation: "When something exciting happens, you're the first to know, but I share it when I see you later—does that feel different?",
    nextStep: "Try: share exciting news as soon as possible, even via text."
  },
  'r2-support-22': {
    whyItMatters: "Feeling understood affects relationship satisfaction. Really well vs most of the time signal different levels of attunement.",
    matchConversation: "How well do you think I understand your needs—really well or most of the time?",
    mismatchConversation: "I think you understand my needs really well, but you think it's most of the time—what would make it better?",
    nextStep: "Ask: 'What's one need of mine you want me to understand better?'"
  },
  'r2-support-23': {
    whyItMatters: "Emotional check-in frequency affects connection. Regular check-ins vs when something comes up serve different relationship needs.",
    matchConversation: "How often do we check in emotionally—pretty regularly or when something comes up?",
    mismatchConversation: "I think we check in pretty regularly, but you think it's when something comes up—how can we do it more?",
    nextStep: "Schedule: one emotional check-in per week, even when things are good."
  },
  'r2-support-24': {
    whyItMatters: "Reassurance seeking patterns reveal security needs. Direct asking vs hoping they notice show different comfort levels with needs.",
    matchConversation: "When you need reassurance, how do you ask for it directly?",
    mismatchConversation: "When I need reassurance, I ask for it directly, but you hope I notice—how can I get better at noticing?",
    nextStep: "Practice: 'I need reassurance about [specific thing].'"
  },
  'r2-support-25': {
    whyItMatters: "Support balance affects relationship health. Balanced and mutual vs sometimes one-sided signal different support dynamics.",
    matchConversation: "How balanced does the emotional support in our relationship feel—mutual or sometimes one-sided?",
    mismatchConversation: "The emotional support feels balanced to me, but you think it's sometimes one-sided—how can we balance it better?",
    nextStep: "Track: who gives support more often? Aim for balance."
  },
  'r2-support-26': {
    whyItMatters: "External stress handling reveals teamwork patterns. Tackling together vs handling separately both are valid but affect connection.",
    matchConversation: "When dealing with external stress like work or family, how do we both approach it—together as a team or separately?",
    mismatchConversation: "When dealing with external stress, I tackle it with you as a team, but you handle yours separately—how can we find balance?",
    nextStep: "Ask: 'Do you want to handle this yourself or together?'"
  },
  'r2-support-27': {
    whyItMatters: "Surprise gesture importance reveals connection needs. Important vs nice but not essential show different values on spontaneity.",
    matchConversation: "How important are surprise gestures to you—important for connection or nice but not essential?",
    mismatchConversation: "I think surprise gestures are important for connection, but you think they're nice but not essential—how can we meet in the middle?",
    nextStep: "Try: one surprise gesture this month, even if small."
  },
  'r2-support-28': {
    whyItMatters: "Long day recovery needs vary. Debriefing vs quiet and rest both are valid ways to recharge after exhaustion.",
    matchConversation: "When you've had a really long day, what do you need—to debrief with me or quiet and rest?",
    mismatchConversation: "After a really long day, I want to debrief with you, but you want quiet and rest—how can we honor both?",
    nextStep: "Try: 30 minutes of quiet, then check in about debriefing."
  },
  'r2-support-29': {
    whyItMatters: "Feeling safe to be yourself reveals relationship security. Fully yourself vs holding back signal different levels of acceptance.",
    matchConversation: "What makes you feel safe to be fully yourself with me?",
    mismatchConversation: "You make me feel safe to be fully myself, but I feel loved even when I hold back—what would help me hold back less?",
    nextStep: "Share: one thing you've been holding back and why."
  },
  'r2-support-30': {
    whyItMatters: "Gratitude expression styles vary. Verbal and often vs through actions both express appreciation but in different ways.",
    matchConversation: "How do you express gratitude in our relationship—verbally and often or through actions?",
    mismatchConversation: "I express gratitude verbally and often, but you do it through actions—how can we appreciate each other's style?",
    nextStep: "Try: express gratitude both verbally AND through actions this week."
  },
  // Batch 6: Round 2 Daily Life questions 1-15
  'r2-dailyLife-1': {
    whyItMatters: "Morning routines set the tone for your entire day together. Clashing rhythms can create unnecessary friction.",
    matchConversation: "What do you love most about our similar morning routines?",
    mismatchConversation: "My morning routine is pretty similar to yours, but you think it's quite different—what specific differences cause friction?",
    nextStep: "Design your ideal shared morning routine together."
  },
  'r2-dailyLife-2': {
    whyItMatters: "Cleanliness standards affect daily harmony. Similar thresholds vs different ones can create ongoing tension if not addressed.",
    matchConversation: "When it comes to cleanliness standards, how similar do you think we are?",
    mismatchConversation: "I think our cleanliness standards are similar, but you think we have different thresholds—what's the biggest difference?",
    nextStep: "Discuss: what's 'clean enough' for each of you in each room?"
  },
  'r2-dailyLife-3': {
    whyItMatters: "Cooking together vs separately affects connection and household balance. Both approaches work but serve different needs.",
    matchConversation: "What do you love about how we handle cooking at home—together or separately?",
    mismatchConversation: "Cooking at home is something I enjoy doing together, but you think it's usually handled by one of us—how can we share it more?",
    nextStep: "Plan: one meal you cook together this week."
  },
  'r2-dailyLife-4': {
    whyItMatters: "Sleep schedule alignment affects daily connection and intimacy. Aligned vs different schedules require different approaches.",
    matchConversation: "How aligned are our sleep schedules, and what works well about that?",
    mismatchConversation: "My sleep schedule is pretty aligned with yours, but you think it's quite different—how does that affect our connection?",
    nextStep: "Find: one time each day when your schedules naturally align."
  },
  'r2-dailyLife-5': {
    whyItMatters: "Financial management affects relationship security. Smooth handling vs learning curve both are normal but need communication.",
    matchConversation: "When it comes to handling finances together, what works smoothly for us?",
    mismatchConversation: "Handling finances works smoothly for me, but it's been a learning curve for you—what would make it easier?",
    nextStep: "Schedule: one monthly money check-in when you're both calm."
  },
  'r2-dailyLife-6': {
    whyItMatters: "Weeknight preferences affect daily connection. Together time vs alone time both are needed but require balance.",
    matchConversation: "On weeknights, how do we balance spending time together and doing our own thing?",
    mismatchConversation: "On weeknights, I typically prefer to spend time with you, but you prefer to do your own thing—how can we find balance?",
    nextStep: "Agree: some weeknights together, some for individual activities."
  },
  'r2-dailyLife-7': {
    whyItMatters: "Grocery shopping approach affects household management. Planning together vs one person handling it both work but serve different needs.",
    matchConversation: "When grocery shopping, how do we both prefer to handle it—planning together or one person?",
    mismatchConversation: "When grocery shopping, I like planning together, but you prefer one person handles it—how can we make it work?",
    nextStep: "Try: one person shops, but both contribute to the list."
  },
  'r2-dailyLife-8': {
    whyItMatters: "Weekend ideal affects relationship satisfaction. Activities together vs mix of together and alone time both are healthy.",
    matchConversation: "What's your ideal weekend—doing activities with me or a mix of together and alone time?",
    mismatchConversation: "My ideal weekend involves doing activities with you, but you prefer a mix of together and alone time—how can we plan for both?",
    nextStep: "Plan: one weekend activity together, plus individual time."
  },
  'r2-dailyLife-9': {
    whyItMatters: "Home decision-making affects household harmony. Discussing everything vs handling different areas both work but need clarity.",
    matchConversation: "When it comes to decision-making about the home, how do we both prefer to handle it?",
    mismatchConversation: "I prefer discussing everything about the home, but you prefer we each handle different areas—how can we find balance?",
    nextStep: "Divide: which decisions need both input, which can be individual?"
  },
  'r2-dailyLife-10': {
    whyItMatters: "Caregiving when sick affects relationship support. Full caretaker vs independent handling both are valid but need communication.",
    matchConversation: "When you're sick, how do you want me to help—full caretaker or let you handle it independently?",
    mismatchConversation: "When you're sick, I become full caretaker, but you prefer to handle it independently—how can I support without overwhelming?",
    nextStep: "Ask when sick: 'What kind of help do you want—full caretaker or space?'"
  },
  'r2-dailyLife-11': {
    whyItMatters: "Saving money approach affects financial security. Similar vs different approaches can create tension if not aligned.",
    matchConversation: "How similar is our approach to saving money, and what works well about that?",
    mismatchConversation: "My approach to saving money is very similar to yours, but you think it's somewhat different—what's the difference?",
    nextStep: "Discuss: what are your individual saving goals and how do they align?"
  },
  'r2-dailyLife-12': {
    whyItMatters: "Vacation planning affects relationship harmony. Exciting and smooth vs friction-creating planning reveal different travel dynamics.",
    matchConversation: "When planning vacations together, what makes it exciting and smooth for us?",
    mismatchConversation: "Planning vacations is exciting and smooth for me, but it causes some friction for you—what's the friction about?",
    nextStep: "Try: one person plans, the other approves—or divide planning tasks."
  },
  'r2-dailyLife-13': {
    whyItMatters: "Entertainment tastes affect daily connection. Overlapping vs different tastes both work but require compromise.",
    matchConversation: "How much do our TV and entertainment tastes overlap, and what do we both enjoy?",
    mismatchConversation: "I think our TV and entertainment tastes overlap a lot, but you think they're pretty different—how can we find common ground?",
    nextStep: "Create: a shared watchlist with both your preferences."
  },
  'r2-dailyLife-14': {
    whyItMatters: "Hosting comfort affects social life. Enjoying vs finding stressful both are valid but need support strategies.",
    matchConversation: "When hosting people at home, what makes it really enjoyable for you?",
    mismatchConversation: "When hosting, I really enjoy it, but you find it stressful—how can we divide hosting duties to play to our strengths?",
    nextStep: "Divide: who handles what when hosting—play to each other's strengths."
  },
  'r2-dailyLife-15': {
    whyItMatters: "Eating habits affect daily life compatibility. Compatible vs different habits both work but require flexibility.",
    matchConversation: "How compatible are our eating habits, and what works well about that?",
    mismatchConversation: "I think our eating habits are very compatible, but you think they're a bit different—what's the biggest difference?",
    nextStep: "Plan: meals that work for both your preferences."
  },
  'r2-dailyLife-16': {
    whyItMatters: "Spending priorities affect financial harmony. Similar vs different priorities can create ongoing tension if not discussed.",
    matchConversation: "When it comes to spending money, how similar are our priorities?",
    mismatchConversation: "I think we spend money on similar priorities, but you think they're different—what's the biggest difference?",
    nextStep: "List: your top 3 spending priorities and compare."
  },
  'r2-dailyLife-17': {
    whyItMatters: "Organization systems affect daily efficiency. Aligned vs different systems both work but need coordination.",
    matchConversation: "When it comes to organization, how aligned do you think our systems are?",
    mismatchConversation: "I think our organization systems are aligned, but you think we have different systems—how can we coordinate better?",
    nextStep: "Discuss: what organization system works best for shared spaces?"
  },
  'r2-dailyLife-18': {
    whyItMatters: "Social life balance affects relationship satisfaction. Well-balanced vs needing attention both need ongoing work.",
    matchConversation: "How well-balanced does our social life as a couple feel to you?",
    mismatchConversation: "Our social life feels well-balanced to me, but you think it could use some attention—what needs attention?",
    nextStep: "Plan: one couple social activity and one individual social time this month."
  },
  'r2-dailyLife-19': {
    whyItMatters: "Pet perspectives affect household decisions. Agreement vs different views both are valid but need discussion.",
    matchConversation: "When it comes to pets, how much do we agree on our approach?",
    mismatchConversation: "I think we totally agree on pets, but you think we see it a bit differently—what's the difference?",
    nextStep: "Discuss: if you got a pet, what would each of you want?"
  },
  'r2-dailyLife-20': {
    whyItMatters: "Work-life boundaries affect relationship availability. Similar vs different boundaries can create tension if not respected.",
    matchConversation: "How similar are our work-life boundaries, and what works well about that?",
    mismatchConversation: "My work-life boundaries are similar to yours, but you think they're different—how does that affect us?",
    nextStep: "Share: what are your ideal work-life boundaries?"
  },
  'r2-dailyLife-21': {
    whyItMatters: "Exercise approach affects health and connection. Motivating each other vs doing your own thing both work but serve different needs.",
    matchConversation: "When it comes to exercising, how do we both approach it—motivating each other or individually?",
    mismatchConversation: "I think we motivate each other to exercise, but you do your own thing—how can we support each other better?",
    nextStep: "Try: one workout together this week, or share your individual goals."
  },
  'r2-dailyLife-22': {
    whyItMatters: "Screen time habits affect daily connection. Similar vs different habits can create distance if not managed.",
    matchConversation: "How similar are our screen time habits, and what works well about that?",
    mismatchConversation: "I think our screen time habits are pretty similar, but you think they're different—how does that affect our connection?",
    nextStep: "Agree: one screen-free hour together each day."
  },
  'r2-dailyLife-23': {
    whyItMatters: "Errand running together affects daily connection. Working well vs testing patience reveal different preferences for togetherness.",
    matchConversation: "When running errands together, what makes it work well for us?",
    mismatchConversation: "Running errands together works well for me, but it can test your patience—how can we make it better?",
    nextStep: "Try: divide errands—some together, some separate."
  },
  'r2-dailyLife-24': {
    whyItMatters: "Thermostat preferences affect daily comfort. Same vs negotiation reveal different temperature needs.",
    matchConversation: "How similar are our thermostat preferences, and what works well?",
    mismatchConversation: "I think our thermostat preferences are the same, but you think it's a point of negotiation—what's your ideal temperature?",
    nextStep: "Find: a temperature compromise that works for both."
  },
  'r2-dailyLife-25': {
    whyItMatters: "Furniture and decorating tastes affect home harmony. Aligned vs needing compromise both work but require communication.",
    matchConversation: "When furniture shopping or decorating, how well do our tastes align?",
    mismatchConversation: "I think our decorating tastes align, but you usually need to compromise—how can we find more common ground?",
    nextStep: "Create: a shared Pinterest board of styles you both like."
  },
  'r2-dailyLife-26': {
    whyItMatters: "Calendar management affects daily coordination. Working well vs causing mix-ups reveal different organization needs.",
    matchConversation: "When managing calendars and schedules, what makes it work well for us?",
    mismatchConversation: "Managing calendars works well for me, but it causes some mix-ups for you—how can we coordinate better?",
    nextStep: "Use: a shared calendar app or weekly schedule check-in."
  },
  'r2-dailyLife-27': {
    whyItMatters: "Health and wellness approach affects lifestyle compatibility. Aligned vs different approaches both work but need respect.",
    matchConversation: "How aligned is our approach to health and wellness?",
    mismatchConversation: "I think our health approach is pretty aligned, but you think it's different in some ways—what's the difference?",
    nextStep: "Discuss: what does 'healthy' mean to each of you?"
  },
  'r2-dailyLife-28': {
    whyItMatters: "Household repair approach affects problem-solving dynamics. Figuring out together vs one taking lead both work.",
    matchConversation: "When dealing with household repairs, how do we both prefer to handle them?",
    mismatchConversation: "I like figuring out repairs together, but you prefer one of us takes the lead—how can we divide this?",
    nextStep: "Agree: who handles what types of repairs?"
  },
  'r2-dailyLife-29': {
    whyItMatters: "Clutter attitude affects daily harmony. Similar vs different attitudes can create ongoing tension if not addressed.",
    matchConversation: "When it comes to clutter, how similar are our attitudes?",
    mismatchConversation: "I think our attitude about clutter is very similar, but you think it's different—what's your threshold?",
    nextStep: "Discuss: what's 'too cluttered' for each of you?"
  },
  'r2-dailyLife-30': {
    whyItMatters: "Family time splitting affects relationship harmony. Balanced and fair vs tricky reveals different family dynamics.",
    matchConversation: "When splitting time between families, how balanced does it feel to you?",
    mismatchConversation: "Splitting time between families feels balanced to me, but you think it can be tricky—what makes it tricky?",
    nextStep: "Plan: how to split family time for the next 3 months."
  },
  // Batch 8: Round 2 Intimacy questions 1-15
  'r2-intimacy-1': {
    whyItMatters: "Touch frequency reveals underlying needs for connection. It's not about quantity—it's about understanding what each of you needs.",
    matchConversation: "What physical moments throughout the day mean the most to you?",
    mismatchConversation: "Physical touch happens very naturally for me, but you think it could be more frequent—how can we find a rhythm that works?",
    nextStep: "Identify three touch moments you'd both enjoy throughout your typical day."
  },
  'r2-intimacy-2': {
    whyItMatters: "What makes you feel desired reveals your intimacy needs. Initiation vs enthusiastic response both show desire but in different ways.",
    matchConversation: "When do you feel most desired—when I initiate or when I respond enthusiastically?",
    mismatchConversation: "I feel most desired when you initiate, but you feel it when I respond enthusiastically—how can we both feel desired?",
    nextStep: "This week: both initiate AND respond enthusiastically."
  },
  'r2-intimacy-3': {
    whyItMatters: "Comfort talking about physical intimacy affects relationship depth. Comfortable vs could be easier reveal different communication levels.",
    matchConversation: "What makes talking about physical intimacy comfortable for you?",
    mismatchConversation: "Talking about physical intimacy is comfortable for me, but it could be easier for you—what would make it easier?",
    nextStep: "Practice: share one thing about physical intimacy you'd like to discuss."
  },
  'r2-intimacy-4': {
    whyItMatters: "Closeness preferences affect intimacy satisfaction. Well matched vs differing needs both are normal but require communication.",
    matchConversation: "How well matched are our preferences for closeness?",
    mismatchConversation: "I think our closeness preferences are well matched, but you think they differ somewhat—what's the difference?",
    nextStep: "Discuss: what does 'enough closeness' mean to each of you?"
  },
  'r2-intimacy-5': {
    whyItMatters: "Non-sexual physical affection patterns affect daily connection. Throughout day vs certain moments both work but serve different needs.",
    matchConversation: "When does non-sexual physical affection happen for you—throughout each day or at certain moments?",
    mismatchConversation: "Non-sexual affection happens throughout each day for me, but at certain moments for you—how can we find balance?",
    nextStep: "Identify: three moments each day for non-sexual affection."
  },
  'r2-intimacy-6': {
    whyItMatters: "Quality time importance affects connection depth. Central vs one of many ways both are valid but reveal different intimacy needs.",
    matchConversation: "How central is quality time to your connection with me?",
    mismatchConversation: "Quality time is central to my connection, but it's one of many ways for you—how can we honor both perspectives?",
    nextStep: "Plan: one quality time activity this week that feels meaningful to both."
  },
  'r2-intimacy-7': {
    whyItMatters: "Reunion after being apart affects reconnection. Very affectionate vs easing back both are valid but show different comfort levels.",
    matchConversation: "After being apart, how do you prefer to reunite—very affectionate or easing back?",
    mismatchConversation: "After being apart, reuniting feels very affectionate for me, but you ease back into togetherness—how can we meet in the middle?",
    nextStep: "Try: a warm greeting, then allow space to ease back in."
  },
  'r2-intimacy-8': {
    whyItMatters: "Expressing physical attraction affects partner confidence. Often vs could do more reveal different comfort levels with expressing desire.",
    matchConversation: "How often do you express physical attraction to me?",
    mismatchConversation: "I express physical attraction often, but you think I could do more—what would you like to hear more?",
    nextStep: "Practice: one genuine compliment about physical attraction each day."
  },
  'r2-intimacy-9': {
    whyItMatters: "Date night priority affects relationship maintenance. Regular priority vs should do more reveal different values on intentional connection.",
    matchConversation: "How much of a priority are date nights for you?",
    mismatchConversation: "Date nights are a regular priority for me, but you think we should do more—how can we make them happen?",
    nextStep: "Schedule: one date night this month, even if simple."
  },
  'r2-intimacy-10': {
    whyItMatters: "Public vs private affection affects comfort levels. Both preferences are valid but reveal different comfort with public displays.",
    matchConversation: "How do you prefer to show affection—publicly or privately?",
    mismatchConversation: "I prefer to show affection publicly, but you prefer privately—how can we respect both preferences?",
    nextStep: "Agree: what level of public affection feels comfortable for both?"
  },
  'r2-intimacy-11': {
    whyItMatters: "Romantic gesture frequency affects relationship satisfaction. Fairly often vs less frequent reveal different needs for romance.",
    matchConversation: "How often do romantic gestures happen in our relationship?",
    mismatchConversation: "Romantic gestures happen fairly often for me, but you think they're less frequent than you'd like—what would you like more of?",
    nextStep: "Plan: one romantic gesture this week, even if small."
  },
  'r2-intimacy-12': {
    whyItMatters: "Holding hands and cuddling frequency affects daily connection. Regularly vs sometimes reveal different needs for physical closeness.",
    matchConversation: "How often does holding hands or cuddling happen for you?",
    mismatchConversation: "Holding hands or cuddling happens regularly for me, but only sometimes for you—how can we find a frequency that works?",
    nextStep: "Try: one intentional cuddle or hand-hold each day."
  },
  'r2-intimacy-13': {
    whyItMatters: "What makes you feel most connected reveals your intimacy style. Deep conversations vs physical closeness both create connection.",
    matchConversation: "When do you feel most connected—after deep conversations or physical closeness?",
    mismatchConversation: "I feel most connected after deep conversations, but you feel it after physical closeness—how can we do both?",
    nextStep: "Combine: one deep conversation followed by physical closeness."
  },
  'r2-intimacy-14': {
    whyItMatters: "Physical relationship satisfaction affects overall relationship health. Strength vs nurturing reveal different relationship stages.",
    matchConversation: "How would you describe our physical relationship—a strength or something we're nurturing?",
    mismatchConversation: "I think our physical relationship is a strength, but you think it's something we're nurturing—what would help nurture it?",
    nextStep: "Discuss: what would make the physical relationship feel stronger?"
  },
  'r2-intimacy-15': {
    whyItMatters: "Playfulness and flirting affect relationship fun. Natural vs could do more reveal different comfort levels with playfulness.",
    matchConversation: "How naturally does being playful and flirty come to you?",
    mismatchConversation: "Being playful and flirty comes naturally to me, but you think you could do more—what would make it easier?",
    nextStep: "Try: one playful or flirty moment each day, even if small."
  },
  'r2-intimacy-16': {
    whyItMatters: "Feeling attractive to your partner affects self-confidence. Absolutely vs wanting more reminders reveal different security levels.",
    matchConversation: "How confident do you feel that I find you attractive?",
    mismatchConversation: "I feel you find me attractive absolutely, but you'd like more reminders—how can I show that more?",
    nextStep: "Practice: one specific compliment about attractiveness each day."
  },
  'r2-intimacy-17': {
    whyItMatters: "Morning greetings affect daily connection. Everyday vs when remembered reveal different values on daily rituals.",
    matchConversation: "How often do morning kisses or greetings happen for you?",
    mismatchConversation: "Morning kisses are an everyday thing for me, but they happen when you remember—how can we make them more consistent?",
    nextStep: "Create: a morning greeting ritual you both enjoy."
  },
  'r2-intimacy-18': {
    whyItMatters: "Sharing a bed affects intimacy and connection. Essential vs sleep quality matters more reveal different priorities.",
    matchConversation: "How important is sharing a bed to your bond with me?",
    mismatchConversation: "Sharing a bed feels essential to my bond, but sleep quality matters more to you—how can we balance both?",
    nextStep: "Discuss: what would make sharing a bed work better for both?"
  },
  'r2-intimacy-19': {
    whyItMatters: "Handling rejection affects intimacy safety. Gracefully vs feeling like rejection reveal different comfort levels with boundaries.",
    matchConversation: "When I'm not in the mood, how do you handle it?",
    mismatchConversation: "When I'm not in the mood, you handle it gracefully, but it can feel like rejection to me—how can we reframe this?",
    nextStep: "Practice: 'Not right now, but I love you' instead of just 'no.'"
  },
  'r2-intimacy-20': {
    whyItMatters: "Surprise physical affection affects relationship spontaneity. Always makes smile vs depends on mood reveal different receptivity.",
    matchConversation: "How do you feel about surprise physical affection?",
    mismatchConversation: "Surprise physical affection always makes me smile, but it depends on your mood—how can I know when it's welcome?",
    nextStep: "Create: a signal for when surprise affection is welcome."
  },
  'r2-intimacy-21': {
    whyItMatters: "Romance style affects relationship satisfaction. Spontaneous and organic vs planned and intentional both work but serve different needs.",
    matchConversation: "How do you think romance should be—spontaneous and organic or planned and intentional?",
    mismatchConversation: "I think romance should be spontaneous, but you prefer it planned and intentional—how can we do both?",
    nextStep: "Try: one spontaneous romantic moment and one planned one this month."
  },
  'r2-intimacy-22': {
    whyItMatters: "Eye contact during meaningful moments affects connection depth. Natural vs could improve reveal different comfort levels with vulnerability.",
    matchConversation: "How naturally does eye contact during meaningful moments happen for you?",
    mismatchConversation: "Eye contact happens naturally for me, but you think you could improve—what would make it easier?",
    nextStep: "Practice: intentional eye contact during one meaningful conversation this week."
  },
  'r2-intimacy-23': {
    whyItMatters: "Compliment frequency affects partner confidence. Regularly vs less than should reveal different values on verbal affirmation.",
    matchConversation: "How often do you compliment me?",
    mismatchConversation: "I compliment you regularly, but you think you do it less than you should—what would you like to compliment more?",
    nextStep: "Practice: one genuine compliment each day."
  },
  'r2-intimacy-24': {
    whyItMatters: "Physical affection needs affect intimacy satisfaction. Very similar vs a bit different reveal different needs for closeness.",
    matchConversation: "How similar are our needs for physical affection?",
    mismatchConversation: "I think our need for physical affection is very similar, but you think it's a bit different—what's the difference?",
    nextStep: "Discuss: what does 'enough physical affection' mean to each of you?"
  },
  'r2-intimacy-25': {
    whyItMatters: "Connection rituals affect relationship stability. Having several vs could create more reveal different values on daily rituals.",
    matchConversation: "What connection rituals do we have together?",
    mismatchConversation: "I have several connection rituals with you, but you think we could create more—what would you like to add?",
    nextStep: "Create: one new connection ritual together this week."
  },
  'r2-intimacy-26': {
    whyItMatters: "Intimacy priority during stress affects relationship maintenance. Stays priority vs gets pushed aside reveal different values on connection.",
    matchConversation: "When busy or stressed, how do you keep intimacy a priority?",
    mismatchConversation: "When busy or stressed, intimacy stays a priority for me, but it often gets pushed aside for you—how can we keep it important?",
    nextStep: "Agree: even when stressed, one small intimacy moment each day."
  },
  'r2-intimacy-27': {
    whyItMatters: "What makes you feel romantic reveals your intimacy triggers. Uninterrupted time vs thoughtful gestures both create romance.",
    matchConversation: "When do you feel most romantic—uninterrupted time or thoughtful gestures?",
    mismatchConversation: "I feel most romantic when we have uninterrupted time, but you feel it when I do something thoughtful—how can we do both?",
    nextStep: "Plan: one uninterrupted time together and one thoughtful gesture this week."
  },
  'r2-intimacy-28': {
    whyItMatters: "Physical vulnerability comfort affects intimacy depth. Very high vs still growing reveal different comfort levels with physical openness.",
    matchConversation: "How comfortable are you with physical vulnerability?",
    mismatchConversation: "My comfort with physical vulnerability is very high, but yours is still growing—what would make it easier?",
    nextStep: "Practice: one small step toward more physical vulnerability this week."
  },
  'r2-intimacy-29': {
    whyItMatters: "Saying 'I love you' frequency affects relationship security. Multiple times daily vs key moments reveal different expression needs.",
    matchConversation: "How often do you say 'I love you'?",
    mismatchConversation: "I say 'I love you' multiple times daily, but you say it at key moments—does the frequency matter to you?",
    nextStep: "Notice: when your partner says 'I love you' and how it makes you feel."
  },
  'r2-intimacy-30': {
    whyItMatters: "Physical affection before sleep affects bedtime connection. Part of routine vs occasionally reveal different values on end-of-day connection.",
    matchConversation: "How often does physical affection before sleep happen for you?",
    mismatchConversation: "Physical affection before sleep is part of my routine, but it happens occasionally for you—would you like it more often?",
    nextStep: "Create: a bedtime affection ritual you both enjoy."
  },
  // Batch 10: Round 2 Future questions 1-15
  'r2-future-1': {
    whyItMatters: "Where you live shapes your lifestyle, community, and opportunities. Alignment here is about more than geography—it's about values.",
    matchConversation: "What excites you most about where we picture ourselves living long-term?",
    mismatchConversation: "My vision for where to live is very aligned with yours, but you think there are some differences—what matters most to you?",
    nextStep: "Each write down your top 3 priorities for where to live and compare."
  },
  'r2-future-2': {
    whyItMatters: "Children decision affects life trajectory. Being on same page vs needing discussion reveal different readiness levels.",
    matchConversation: "When it comes to having children, how on the same page do you think we are?",
    mismatchConversation: "I think we're on the same page about children, but you think there's still discussion needed—what needs to be discussed?",
    nextStep: "Schedule: one dedicated conversation about children—timing, number, approach."
  },
  'r2-future-3': {
    whyItMatters: "Career ambition support affects relationship satisfaction. Supported well vs competing with relationship reveal different priorities.",
    matchConversation: "How well supported do your career ambitions feel by me?",
    mismatchConversation: "My career ambitions are supported well by you, but you think they sometimes compete with relationship priorities—how can we balance this?",
    nextStep: "Discuss: how to support career goals while prioritizing the relationship."
  },
  'r2-future-4': {
    whyItMatters: "Retirement planning affects long-term security. Discussed vs not come up reveal different levels of future planning.",
    matchConversation: "Have we discussed retirement dreams together?",
    mismatchConversation: "I've discussed retirement dreams with you, but they haven't come up much for you—what are your retirement dreams?",
    nextStep: "Plan: one conversation about retirement dreams and goals."
  },
  'r2-future-5': {
    whyItMatters: "Financial goal sharing affects financial security. Sharing and planning vs approaching independently reveal different financial dynamics.",
    matchConversation: "How do we both approach financial goals for the future—together or independently?",
    mismatchConversation: "I share and plan financial goals with you, but you approach them independently—how can we align our financial goals?",
    nextStep: "Create: one shared financial goal and one individual goal."
  },
  'r2-future-6': {
    whyItMatters: "Decision-making pace affects relationship harmony. Feeling right vs misaligned reveal different comfort levels with speed.",
    matchConversation: "When making big decisions, how does the pace feel to you?",
    mismatchConversation: "The pace at which we make big decisions feels right to me, but you think it's sometimes misaligned—what feels off?",
    nextStep: "Discuss: what's the right pace for big decisions for each of you?"
  },
  'r2-future-7': {
    whyItMatters: "Travel and adventure goals affect lifestyle compatibility. Very similar vs differing reveal different adventure needs.",
    matchConversation: "How similar are our travel and adventure goals?",
    mismatchConversation: "I think our travel goals are very similar, but you think they differ in some ways—what are the differences?",
    nextStep: "Create: a shared travel/adventure bucket list."
  },
  'r2-future-8': {
    whyItMatters: "Extended family involvement affects relationship boundaries. Staying as is vs needing to evolve reveal different family dynamics.",
    matchConversation: "How do you see our involvement with extended family in the future?",
    mismatchConversation: "I think our family involvement will stay as it is, but you think it may need to evolve—what needs to change?",
    nextStep: "Discuss: what boundaries do you want with extended family?"
  },
  'r2-future-9': {
    whyItMatters: "5-year vision affects relationship security. Exciting vs uncertain reveal different confidence levels in the relationship.",
    matchConversation: "When you imagine us in 5 years, what excites you?",
    mismatchConversation: "Imagining us in 5 years excites me, but you feel a bit uncertain—what would help you feel more confident?",
    nextStep: "Share: one specific thing you're excited about for the next 5 years."
  },
  'r2-future-10': {
    whyItMatters: "Risk approach affects major life decisions. Similar vs differing reveal different comfort levels with uncertainty.",
    matchConversation: "How similar is our approach to risk in career, money, and moves?",
    mismatchConversation: "My approach to risk is similar to yours, but you think it differs somewhat—what's the difference?",
    nextStep: "Discuss: one major risk you're each considering and how to approach it."
  },
  'r2-future-11': {
    whyItMatters: "Marriage timeline affects relationship security. Same timeline vs seeing differently reveal different commitment readiness.",
    matchConversation: "How aligned are we on marriage or deeper commitment timeline?",
    mismatchConversation: "I feel on the same timeline as you for marriage, but you think we see it differently—what's your timeline?",
    nextStep: "Have: one honest conversation about commitment timeline and readiness."
  },
  'r2-future-12': {
    whyItMatters: "Home ownership goals affect financial planning. Aligned vs needing discussion reveal different housing priorities.",
    matchConversation: "How aligned are our home ownership goals?",
    mismatchConversation: "My home ownership goals align with yours, but you think we need more discussion—what needs to be discussed?",
    nextStep: "Research: what home ownership would look like for both of you."
  },
  'r2-future-13': {
    whyItMatters: "Lifestyle preferences long-term affect compatibility. Matching well vs having differences reveal different lifestyle visions.",
    matchConversation: "How well do our lifestyle preferences match for the long-term?",
    mismatchConversation: "I think our lifestyle preferences match well, but you think there are some differences—what are they?",
    nextStep: "Describe: your ideal lifestyle in 10 years and compare."
  },
  'r2-future-14': {
    whyItMatters: "Emergency planning affects relationship security. Discussed vs not tackled reveal different levels of future preparation.",
    matchConversation: "Have we discussed planning for emergencies or the unexpected?",
    mismatchConversation: "I've discussed emergency planning with you, but you haven't tackled it—what would you like to plan for?",
    nextStep: "Create: one emergency plan together—financial, health, or practical."
  },
  'r2-future-15': {
    whyItMatters: "Future security affects relationship confidence. Absolutely vs mostly with uncertainty reveal different confidence levels.",
    matchConversation: "How secure do you feel about our future together?",
    mismatchConversation: "I feel absolutely secure about our future, but you feel mostly secure with some uncertainty—what would help?",
    nextStep: "Share: one thing that would make you feel more secure about the future."
  },
  'r2-future-16': {
    whyItMatters: "Educational goals support affects personal growth. Supported vs pursuing independently reveal different approaches to learning.",
    matchConversation: "How supported do your educational or learning goals feel?",
    mismatchConversation: "My educational goals are supported by you, but I pursue them independently—how can we involve each other more?",
    nextStep: "Share: one learning goal and how your partner can support it."
  },
  'r2-future-17': {
    whyItMatters: "Work-life balance views affect long-term compatibility. Aligned vs needing discussion reveal different lifestyle priorities.",
    matchConversation: "How aligned are our views on work-life balance long-term?",
    mismatchConversation: "I think our work-life balance views are aligned, but you think they may need discussion—what needs to be discussed?",
    nextStep: "Describe: your ideal work-life balance in 10 years."
  },
  'r2-future-18': {
    whyItMatters: "Wealth building approach affects financial partnership. Shared goal vs individual with overlap reveal different financial dynamics.",
    matchConversation: "How does building wealth feel to you—shared goal or individual?",
    mismatchConversation: "Building wealth feels like a shared goal to me, but you see it as more individual with some overlap—how can we align?",
    nextStep: "Create: one shared wealth-building goal together."
  },
  'r2-future-19': {
    whyItMatters: "Family involvement in future affects relationship boundaries. Agreeing vs seeing differently reveal different family relationship needs.",
    matchConversation: "How do we both see family involvement in our future?",
    mismatchConversation: "I agree with you on how involved family will be, but you see it differently—what's your vision?",
    nextStep: "Discuss: what role do you each want family to play in your future?"
  },
  'r2-future-20': {
    whyItMatters: "Legacy discussion affects relationship depth. Talked about vs not discussing reveal different values on meaning and impact.",
    matchConversation: "Have we talked about the legacy or impact we want to leave?",
    mismatchConversation: "I've talked about legacy with you, but you haven't discussed it—what legacy do you want to leave?",
    nextStep: "Share: what impact do you each want to make in the world?"
  },
  'r2-future-21': {
    whyItMatters: "Relocation flexibility affects career and life opportunities. Making it work vs complicated reveal different flexibility levels.",
    matchConversation: "If opportunities required relocation, how do you think we'd handle it?",
    mismatchConversation: "I think we could make relocation work, but you think it would be complicated—what makes it complicated?",
    nextStep: "Discuss: under what circumstances would relocation be possible?"
  },
  'r2-future-22': {
    whyItMatters: "Spiritual alignment affects relationship depth. Strong vs room to explore reveal different levels of spiritual connection.",
    matchConversation: "How strong is our spiritual or philosophical alignment?",
    mismatchConversation: "I think our spiritual alignment is strong, but you think there's room to explore—what would you like to explore?",
    nextStep: "Share: one spiritual or philosophical belief that's important to you."
  },
  'r2-future-23': {
    whyItMatters: "Career vs relationship priority affects life balance. Balanced vs challenging reveal different approaches to life priorities.",
    matchConversation: "How do you prioritize career vs relationship?",
    mismatchConversation: "How I prioritize career vs relationship feels balanced to me, but you think it can be challenging—what's challenging?",
    nextStep: "Reflect: when has career competed with relationship, and how did you handle it?"
  },
  'r2-future-24': {
    whyItMatters: "Shared dreams discussion affects relationship connection. Discussing regularly vs could talk more reveal different communication levels.",
    matchConversation: "How often do we discuss our shared dreams?",
    mismatchConversation: "I discuss shared dreams regularly, but you think we could talk about them more—what dreams would you like to discuss?",
    nextStep: "Schedule: one 'dreams date' to discuss shared aspirations."
  },
  'r2-future-25': {
    whyItMatters: "Aging together vision affects long-term security. Optimistic vs should discuss more reveal different comfort levels with aging.",
    matchConversation: "When you think about aging with me, how does it make you feel?",
    mismatchConversation: "Thinking about aging with you makes me optimistic, but you think we should discuss it more—what concerns you?",
    nextStep: "Share: one thing you're looking forward to about aging together."
  },
  'r2-future-26': {
    whyItMatters: "Standard of living expectations affect financial planning. Agreeing vs differing slightly reveal different lifestyle goals.",
    matchConversation: "How aligned are we on our expected standard of living?",
    mismatchConversation: "I agree with you on expected standard of living, but you think it may differ slightly—what's the difference?",
    nextStep: "Describe: your ideal standard of living in 10 years."
  },
  'r2-future-27': {
    whyItMatters: "Hobby and passion support affects personal fulfillment. Fully supported vs creating time conflicts reveal different support levels.",
    matchConversation: "How supported do your hobbies and passions feel?",
    mismatchConversation: "My hobbies are fully supported by you, but you think they could create time conflicts—how can we balance this?",
    nextStep: "Plan: how to support each other's hobbies while maintaining couple time."
  },
  'r2-future-28': {
    whyItMatters: "Community involvement values affect lifestyle choices. Shared value vs matters differently reveal different values on giving back.",
    matchConversation: "How do we both value community involvement or giving back?",
    mismatchConversation: "Community involvement is a shared value for me, but it matters differently to each of us—how can we honor both?",
    nextStep: "Find: one way to give back together that aligns with both your values."
  },
  'r2-future-29': {
    whyItMatters: "Career change support affects relationship security. Supportive vs might cause stress reveal different comfort levels with change.",
    matchConversation: "If I wanted a major career change, how do you think you'd respond?",
    mismatchConversation: "I feel you'd be supportive of a major career change, but you think it might cause stress—what would be stressful?",
    nextStep: "Discuss: how would you handle a major career change together?"
  },
  'r2-future-30': {
    whyItMatters: "Plans feeling affects relationship security. Shared roadmap vs general direction reveal different levels of planning and alignment.",
    matchConversation: "How do our plans together feel to you—like a shared roadmap or general direction?",
    mismatchConversation: "Our plans feel like a shared roadmap to me, but you see them as more of a general direction—how can we align more?",
    nextStep: "Create: one concrete plan together for the next year."
  },
  // Batch 12: Round 2 Growth questions 1-15
  'r2-growth-1': {
    whyItMatters: "A relationship that helps you grow is one that will last. If you're not becoming better together, it's worth exploring why.",
    matchConversation: "In what ways have we both grown since being together?",
    mismatchConversation: "I feel I'm becoming a better person through this relationship absolutely, but you think it's in some ways—what ways?",
    nextStep: "Share one personal growth goal and discuss how to support each other."
  },
  'r2-growth-2': {
    whyItMatters: "Partner challenges affect personal growth. Healthy challenges vs not as much as wanted reveal different growth support levels.",
    matchConversation: "How does your partner challenge you to grow in healthy ways?",
    mismatchConversation: "You challenge me to grow in healthy ways, but I'd like more—what kind of challenges would help me grow?",
    nextStep: "Ask: 'What's one way you'd like me to challenge you to grow?'"
  },
  'r2-growth-3': {
    whyItMatters: "Sharing fears and insecurities affects relationship depth. Very openly vs with hesitation reveal different comfort levels with vulnerability.",
    matchConversation: "How openly can you share your fears and insecurities with me?",
    mismatchConversation: "I can share fears very openly, but you sometimes hesitate—what would make it easier to share?",
    nextStep: "Share: one fear or insecurity you've been holding back."
  },
  'r2-growth-4': {
    whyItMatters: "What the relationship brings out affects personal development. Best in you vs mixed things reveal different relationship impacts.",
    matchConversation: "What does this relationship bring out in you?",
    mismatchConversation: "This relationship brings out the best in me, but you think it brings out mixed things—what are the mixed things?",
    nextStep: "Reflect: what does this relationship bring out in you, both positive and challenging?"
  },
  'r2-growth-5': {
    whyItMatters: "Personal goals support affects individual fulfillment. Encouraged vs taking backseat reveal different support levels.",
    matchConversation: "How encouraged do your personal goals and hobbies feel?",
    mismatchConversation: "My personal goals are encouraged by you, but you think they sometimes take a backseat—how can we balance this?",
    nextStep: "Share: one personal goal and how your partner can support it."
  },
  'r2-growth-6': {
    whyItMatters: "Constructive feedback comfort affects relationship growth. Works well vs can be sensitive reveal different communication patterns.",
    matchConversation: "How comfortable are you giving and receiving constructive feedback?",
    mismatchConversation: "Giving and receiving feedback works well for me, but it can be sensitive for you—what would make it easier?",
    nextStep: "Practice: one piece of constructive feedback using 'I' statements."
  },
  'r2-growth-7': {
    whyItMatters: "Individuality support affects relationship health. Fully supported vs could use more space reveal different needs for independence.",
    matchConversation: "How supported does your individuality feel in this relationship?",
    mismatchConversation: "I feel my individuality is fully supported, but you think you could use more space—what kind of space do you need?",
    nextStep: "Plan: one activity or time that's just for your individual self."
  },
  'r2-growth-8': {
    whyItMatters: "Learning together affects relationship connection. Doing it vs not a big focus reveal different values on shared growth.",
    matchConversation: "How often do we learn new things together?",
    mismatchConversation: "Learning new things with you is something I do, but you think it's not a big focus—what would you like to learn together?",
    nextStep: "Choose: one thing you'd both like to learn together this month."
  },
  'r2-growth-9': {
    whyItMatters: "Past relationship lessons sharing affects relationship depth. Discussed openly vs mostly private reveal different comfort levels.",
    matchConversation: "Have we discussed past relationship lessons openly?",
    mismatchConversation: "I've discussed past relationship lessons openly with you, but they're mostly private to you—what would make it easier to share?",
    nextStep: "Share: one lesson from a past relationship that affects this one."
  },
  'r2-growth-10': {
    whyItMatters: "Admitting wrong affects relationship health. Pretty easily vs with difficulty reveal different comfort levels with vulnerability.",
    matchConversation: "How easily can you admit when you're wrong to me?",
    mismatchConversation: "I can admit when I'm wrong pretty easily, but it's with some difficulty for you—what makes it hard?",
    nextStep: "Practice: 'I was wrong about [specific thing].'"
  },
  'r2-growth-11': {
    whyItMatters: "What the relationship teaches affects personal development. A lot about yourself vs mostly about partnership reveal different growth areas.",
    matchConversation: "What has this relationship taught you?",
    mismatchConversation: "This relationship has taught me a lot about myself, but you think it's mostly about partnership—what have you learned?",
    nextStep: "Reflect: what has this relationship taught you about yourself vs partnership?"
  },
  'r2-growth-12': {
    whyItMatters: "Alone time and self-care space affects relationship health. Well-respected vs could be improved reveal different needs for independence.",
    matchConversation: "How well-respected is space for alone time and self-care in our relationship?",
    mismatchConversation: "Space for alone time is well-respected for me, but you think it could be improved—what would help?",
    nextStep: "Agree: one regular time each week that's just for self-care."
  },
  'r2-growth-13': {
    whyItMatters: "Dream pursuit support affects personal fulfillment. Full support vs some compromise reveal different support levels.",
    matchConversation: "How supported do you feel pursuing your dreams?",
    mismatchConversation: "I feel I can pursue my dreams with full support from you, but you think it's with some compromise—what's the compromise?",
    nextStep: "Share: one dream and discuss how to support it together."
  },
  'r2-growth-14': {
    whyItMatters: "Self-improvement discussion affects relationship growth. Regularly vs individually mostly reveal different communication patterns.",
    matchConversation: "How often do we talk about self-improvement together?",
    mismatchConversation: "I talk about self-improvement regularly with you, but you do it individually mostly—would you like to share more?",
    nextStep: "Share: one self-improvement goal and how your partner can support it."
  },
  'r2-growth-15': {
    whyItMatters: "Mistake safety affects relationship security. Safe and accepted vs sometimes fearing judgment reveal different comfort levels.",
    matchConversation: "When you make mistakes, how safe and accepted do you feel?",
    mismatchConversation: "When I make mistakes, I feel safe and accepted, but you sometimes fear judgment—what would make you feel safer?",
    nextStep: "Practice: responding to mistakes with 'I'm here, we'll figure this out together.'"
  },
  // Batch 13: Round 2 Growth questions 16-30
  'r2-growth-16': {
    whyItMatters: "Identity sense in relationship affects personal security. Strong and secure vs navigating reveal different comfort levels with self.",
    matchConversation: "How strong and secure does your sense of identity feel in this relationship?",
    mismatchConversation: "My sense of identity feels strong and secure, but you're navigating it—what would help you feel more secure?",
    nextStep: "Reflect: what parts of your identity feel strongest in this relationship?"
  },
  'r2-growth-17': {
    whyItMatters: "Personal win celebration affects relationship support. Enthusiastically vs low-key reveal different celebration needs.",
    matchConversation: "How do we celebrate personal wins together?",
    mismatchConversation: "We celebrate personal wins enthusiastically, but you prefer keeping it low-key—how can we honor both?",
    nextStep: "Ask: 'How would you like me to celebrate your next win?'"
  },
  'r2-growth-18': {
    whyItMatters: "Encouragement during tough times affects relationship support. Strength vs building reveal different support levels.",
    matchConversation: "How do you encourage each other during tough times?",
    mismatchConversation: "Encouraging each other during tough times is a strength of mine, but you're building it—what would help?",
    nextStep: "Practice: one specific encouragement when your partner is struggling."
  },
  'r2-growth-19': {
    whyItMatters: "Feeling heard affects relationship security. Always vs most of the time reveal different communication satisfaction levels.",
    matchConversation: "How often do you feel heard when you share new ideas?",
    mismatchConversation: "I feel heard always when I share new ideas, but you think it's most of the time—what would make it always?",
    nextStep: "Practice: 'Let me make sure I understand your idea—you're saying...'"
  },
  'r2-growth-20': {
    whyItMatters: "Relationship impact on confidence affects personal development. More confident vs working through insecurities reveal different growth paths.",
    matchConversation: "How does this relationship help you feel about yourself?",
    mismatchConversation: "This relationship helps me feel more confident, but you're working through insecurities—how can I support that?",
    nextStep: "Share: one insecurity you're working through and how your partner can help."
  },
  'r2-growth-21': {
    whyItMatters: "Change handling affects relationship adaptability. Adapting as team vs individually first reveal different approaches to change.",
    matchConversation: "How do we both handle change in our relationship?",
    mismatchConversation: "I handle change by adapting with you as a team, but you do it individually first—how can we find balance?",
    nextStep: "Discuss: how to handle the next big change together."
  },
  'r2-growth-22': {
    whyItMatters: "Spirituality sharing affects relationship depth. Sharing vs more personal reveal different comfort levels with meaning.",
    matchConversation: "How do we share exploring spirituality or meaning?",
    mismatchConversation: "Exploring spirituality is something I share with you, but it's more personal for you—would you like to share more?",
    nextStep: "Share: one spiritual or meaningful belief that's important to you."
  },
  'r2-growth-23': {
    whyItMatters: "Therapy openness affects relationship growth. Open to if needed vs not considered reveal different values on professional help.",
    matchConversation: "How open are we to therapy or counseling if needed?",
    mismatchConversation: "I'm open to therapy if needed, but you haven't considered it—what are your thoughts on it?",
    nextStep: "Discuss: what would make therapy feel like a helpful option?"
  },
  'r2-growth-24': {
    whyItMatters: "Partner acceptance affects relationship security. All of who you are vs most of who you are reveal different acceptance levels.",
    matchConversation: "How accepted do you feel by your partner?",
    mismatchConversation: "I feel you accept all of who I am, but you think it's most of who you are—what parts don't feel accepted?",
    nextStep: "Share: one part of yourself you want to feel more accepted."
  },
  'r2-growth-25': {
    whyItMatters: "Goal setting together affects relationship growth. Exciting vs could happen more reveal different values on shared planning.",
    matchConversation: "How often do we set goals together?",
    mismatchConversation: "Setting goals with you is exciting for me, but you think it could happen more—what goals would you like to set?",
    nextStep: "Set: one shared goal together for the next 3 months."
  },
  'r2-growth-26': {
    whyItMatters: "Relationship resources exploration affects relationship growth. Exploring together vs not really my thing reveal different values on learning.",
    matchConversation: "How do we explore books, podcasts, or resources about relationships?",
    mismatchConversation: "I explore relationship resources with you, but they're not really your thing—would you be open to trying one together?",
    nextStep: "Try: one relationship book, podcast, or resource together this month."
  },
  'r2-growth-27': {
    whyItMatters: "Vulnerability without feeling weak affects relationship depth. Definitely vs sometimes reveal different comfort levels with vulnerability.",
    matchConversation: "How comfortable are you being vulnerable without feeling weak?",
    mismatchConversation: "I can be vulnerable without feeling weak definitely, but you think it's sometimes—what would make it always?",
    nextStep: "Practice: one vulnerable share and notice how it feels."
  },
  'r2-growth-28': {
    whyItMatters: "Partner inspiration affects relationship growth. Try new things vs appreciate what we have reveal different growth approaches.",
    matchConversation: "How do we inspire each other?",
    mismatchConversation: "We inspire each other to try new things, but you prefer appreciating what we have—how can we do both?",
    nextStep: "Try: one new thing together and appreciate one thing you already have."
  },
  'r2-growth-29': {
    whyItMatters: "Self-reflection honesty affects relationship growth. Regularly vs could be deeper reveal different reflection levels.",
    matchConversation: "How often do you do honest self-reflection in this relationship?",
    mismatchConversation: "Honest self-reflection happens regularly for me, but you think it could be deeper—what would make it deeper?",
    nextStep: "Practice: one honest self-reflection and share it with your partner."
  },
  'r2-growth-30': {
    whyItMatters: "Relationship helping you become who you want affects personal fulfillment. Become who you want vs figure out what you want reveal different growth stages.",
    matchConversation: "How is this relationship helping you grow?",
    mismatchConversation: "This relationship is helping me become who I want to be, but you're figuring out what you want—how can I support that?",
    nextStep: "Share: who do you want to become, and how can your partner support that?"
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

