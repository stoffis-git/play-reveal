import type { Question, Theme } from './types';

// Round 1: 15 questions (as specified in PRD)
export const round1Questions: Question[] = [
  // Conflict (3)
  {
    id: 'r1-conflict-1',
    theme: 'conflict',
    text: 'When plans change last minute...',
    optionA: 'I adapt pretty easily',
    optionB: 'I get stressed or frustrated',
    round: 1,
    example: 'e.g., Dinner reservations fall through, a friend cancels, or weather ruins outdoor plans'
  },
  {
    id: 'r1-conflict-2',
    theme: 'conflict',
    text: "If something's bothering me...",
    optionA: "I'll bring it up quickly",
    optionB: 'I need time to process first',
    round: 1,
    example: 'e.g., Your partner forgot something important or made a comment that stung'
  },
  {
    id: 'r1-conflict-3',
    theme: 'conflict',
    text: 'When my partner and I disagree...',
    optionA: 'I push to reach understanding together',
    optionB: 'I tend to let things go',
    round: 1,
    example: 'e.g., Disagreement about how to spend the weekend or handle a family situation'
  },
  // Emotional Support (3)
  {
    id: 'r1-support-1',
    theme: 'support',
    text: 'After a busy day, I usually want to...',
    optionA: 'Talk and connect with my partner',
    optionB: 'Decompress alone for a bit',
    round: 1,
    example: 'e.g., Coming home after a stressful workday or a long commute'
  },
  {
    id: 'r1-support-2',
    theme: 'support',
    text: "When I'm having a bad day...",
    optionA: 'I want to talk about it',
    optionB: 'I want distraction or space',
    round: 1,
    example: 'e.g., Received bad news, had a conflict with a colleague, or feeling down'
  },
  {
    id: 'r1-support-3',
    theme: 'support',
    text: "I'd describe myself as...",
    optionA: 'Usually optimistic',
    optionB: 'More realistic or cautious',
    round: 1,
    example: 'e.g., When thinking about future plans, challenges, or new opportunities'
  },
  // Daily Life (3)
  {
    id: 'r1-dailyLife-1',
    theme: 'dailyLife',
    text: 'On a typical weekend morning...',
    optionA: 'I like having a plan',
    optionB: 'I prefer to go with the flow',
    round: 1,
    example: 'e.g., Saturday morning—do you have a list of things to do or see what happens?'
  },
  {
    id: 'r1-dailyLife-2',
    theme: 'dailyLife',
    text: 'When houseguests are coming...',
    optionA: "I'm excited about it",
    optionB: "I'm stressed by the prep",
    round: 1,
    example: 'e.g., Family visiting for a weekend or friends staying over'
  },
  {
    id: 'r1-dailyLife-3',
    theme: 'dailyLife',
    text: 'When it comes to household chores...',
    optionA: 'I think they are pretty evenly split',
    optionB: 'I feel one person does more',
    round: 1,
    example: 'e.g., Dishes, laundry, cooking, cleaning—who does what?'
  },
  // Intimacy (2)
  {
    id: 'r1-intimacy-1',
    theme: 'intimacy',
    text: 'Spontaneous affection for me...',
    optionA: 'Happens naturally throughout the day',
    optionB: 'Tends to happen at specific times',
    round: 1,
    example: 'e.g., Random hugs, kisses, or touches during daily moments'
  },
  {
    id: 'r1-intimacy-2',
    theme: 'intimacy',
    text: 'When it comes to making plans together...',
    optionA: 'I initiate as often as my partner',
    optionB: 'One of us takes the lead more often',
    round: 1,
    example: 'e.g., Date nights, weekend activities, or trips together'
  },
  // Future (2)
  {
    id: 'r1-future-1',
    theme: 'future',
    text: 'My big life goals with my partner...',
    optionA: 'Feel very aligned',
    optionB: "I'm still figuring some things out",
    round: 1,
    example: 'e.g., Where to live, career paths, having children, lifestyle choices'
  },
  {
    id: 'r1-future-2',
    theme: 'future',
    text: 'When I imagine us in 10 years...',
    optionA: "I'm excited and confident",
    optionB: "I'm hopeful but uncertain",
    round: 1,
    example: 'e.g., Picturing your life together—home, family, adventures'
  },
  // Growth (2)
  {
    id: 'r1-growth-1',
    theme: 'growth',
    text: 'In this relationship, I feel like...',
    optionA: 'I can fully be myself',
    optionB: 'I hold back sometimes',
    round: 1,
    example: 'e.g., Sharing quirks, fears, dreams, or unpopular opinions'
  },
  {
    id: 'r1-growth-2',
    theme: 'growth',
    text: 'Right now, I think this relationship is...',
    optionA: 'In a really strong place',
    optionB: 'Going through ups and downs',
    round: 1,
    example: 'e.g., Considering recent months—stability, challenges, growth'
  }
];

// Round 2: 180 questions (30 per theme)
const round2ConflictQuestions: Question[] = [
  { id: 'r2-conflict-1', theme: 'conflict', text: 'When tensions are high...', optionA: 'I want to resolve it immediately', optionB: 'I need time to cool down first', round: 2 },
  { id: 'r2-conflict-2', theme: 'conflict', text: 'During an argument, I tend to...', optionA: 'Stay calm and logical', optionB: 'Get emotional and reactive', round: 2 },
  { id: 'r2-conflict-3', theme: 'conflict', text: 'After a fight, I usually feel...', optionA: 'Closer once it is resolved', optionB: 'Drained and need recovery time', round: 2 },
  { id: 'r2-conflict-4', theme: 'conflict', text: 'When my partner criticizes something I did...', optionA: 'I try to understand their perspective', optionB: 'I get defensive at first', round: 2 },
  { id: 'r2-conflict-5', theme: 'conflict', text: 'If the same argument keeps coming up...', optionA: 'I try different approaches', optionB: 'I notice it follows a similar pattern', round: 2 },
  { id: 'r2-conflict-6', theme: 'conflict', text: 'When I need to apologize...', optionA: 'I do it pretty easily', optionB: 'It takes me a while to get there', round: 2 },
  { id: 'r2-conflict-7', theme: 'conflict', text: 'In disagreements, I prioritize...', optionA: 'Being understood', optionB: 'Understanding my partner', round: 2 },
  { id: 'r2-conflict-8', theme: 'conflict', text: 'When something upsets me, I...', optionA: 'Say something right away', optionB: 'Wait for the right moment', round: 2 },
  { id: 'r2-conflict-9', theme: 'conflict', text: 'I think small annoyances should be...', optionA: 'Addressed when they happen', optionB: 'Let go most of the time', round: 2 },
  { id: 'r2-conflict-10', theme: 'conflict', text: 'When my partner and I disagree on something important...', optionA: 'I feel like I compromise fairly well', optionB: 'I feel like one of us usually gives in', round: 2 },
  { id: 'r2-conflict-11', theme: 'conflict', text: 'If I feel hurt, I typically...', optionA: 'Express it clearly', optionB: 'Show it through my behavior', round: 2 },
  { id: 'r2-conflict-12', theme: 'conflict', text: 'During a heated moment, my voice...', optionA: 'Stays relatively calm', optionB: 'Gets louder or more intense', round: 2 },
  { id: 'r2-conflict-13', theme: 'conflict', text: 'After a disagreement, I prefer to...', optionA: 'Talk it through completely', optionB: 'Move on and not dwell', round: 2 },
  { id: 'r2-conflict-14', theme: 'conflict', text: 'When my partner is frustrated with me...', optionA: 'I want to fix it immediately', optionB: 'I give them space first', round: 2 },
  { id: 'r2-conflict-15', theme: 'conflict', text: 'I think problems should be discussed...', optionA: 'As soon as possible', optionB: 'When both people are calm', round: 2 },
  { id: 'r2-conflict-16', theme: 'conflict', text: "If I'm wrong, I...", optionA: 'Admit it pretty quickly', optionB: 'Need time to accept it', round: 2 },
  { id: 'r2-conflict-17', theme: 'conflict', text: 'I think my communication during conflict is...', optionA: 'Something I do well', optionB: 'Something I am working on', round: 2 },
  { id: 'r2-conflict-18', theme: 'conflict', text: 'If my partner and I argue before bed...', optionA: 'I try to resolve it first', optionB: 'I sometimes need to sleep on it', round: 2 },
  { id: 'r2-conflict-19', theme: 'conflict', text: 'Silent treatment in my relationship...', optionA: 'Rarely happens', optionB: 'Happens occasionally', round: 2 },
  { id: 'r2-conflict-20', theme: 'conflict', text: 'When recalling past arguments...', optionA: 'I think my partner and I remember them similarly', optionB: 'I notice different details than my partner', round: 2 },
  { id: 'r2-conflict-21', theme: 'conflict', text: 'Bringing up sensitive topics feels...', optionA: 'Safe and welcomed', optionB: 'A bit risky sometimes', round: 2 },
  { id: 'r2-conflict-22', theme: 'conflict', text: 'When stressed, my communication style...', optionA: 'Stays mostly the same', optionB: 'Changes noticeably', round: 2 },
  { id: 'r2-conflict-23', theme: 'conflict', text: 'I think my biggest communication strength is...', optionA: 'My honesty', optionB: 'My patience', round: 2 },
  { id: 'r2-conflict-24', theme: 'conflict', text: 'When I feel unheard...', optionA: 'I say so directly', optionB: 'I pull back emotionally', round: 2 },
  { id: 'r2-conflict-25', theme: 'conflict', text: 'Saying "I am sorry" for me...', optionA: 'Happens naturally when needed', optionB: 'Can be challenging sometimes', round: 2 },
  { id: 'r2-conflict-26', theme: 'conflict', text: 'During disagreements, I focus more on...', optionA: 'The specific issue at hand', optionB: 'The bigger patterns I notice', round: 2 },
  { id: 'r2-conflict-27', theme: 'conflict', text: 'I think my partner and I fight...', optionA: 'Less than most couples', optionB: 'About as much as most couples', round: 2 },
  { id: 'r2-conflict-28', theme: 'conflict', text: 'When my partner and I cannot agree...', optionA: 'I look for middle ground', optionB: 'I can agree to disagree', round: 2 },
  { id: 'r2-conflict-29', theme: 'conflict', text: 'Discussing money or finances...', optionA: 'Usually goes smoothly for me', optionB: 'Can create tension', round: 2 },
  { id: 'r2-conflict-30', theme: 'conflict', text: 'If my partner needs to vent...', optionA: 'I listen without trying to fix', optionB: 'I naturally try to solve it', round: 2 }
];

const round2SupportQuestions: Question[] = [
  { id: 'r2-support-1', theme: 'support', text: 'When I share about my day...', optionA: 'I mostly want empathy', optionB: 'I want advice or solutions', round: 2 },
  { id: 'r2-support-2', theme: 'support', text: 'When my partner is sad, I usually...', optionA: 'Want to fix it for them', optionB: 'Want to just be present', round: 2 },
  { id: 'r2-support-3', theme: 'support', text: 'I feel most connected when...', optionA: 'My partner and I are talking deeply', optionB: 'My partner and I are doing things together', round: 2 },
  { id: 'r2-support-4', theme: 'support', text: 'My preferred way to receive love is...', optionA: 'Words and affirmations', optionB: 'Actions and quality time', round: 2 },
  { id: 'r2-support-5', theme: 'support', text: 'When I am stressed, I need my partner to...', optionA: 'Check in and talk', optionB: 'Give me space', round: 2 },
  { id: 'r2-support-6', theme: 'support', text: 'In tough times, I tend to...', optionA: 'Lean on my partner more', optionB: 'Handle things independently', round: 2 },
  { id: 'r2-support-7', theme: 'support', text: 'I feel supported when my partner...', optionA: 'Validates my feelings', optionB: 'Takes action to help', round: 2 },
  { id: 'r2-support-8', theme: 'support', text: 'Sharing my vulnerabilities...', optionA: 'Comes naturally with my partner', optionB: 'Still feels a bit scary', round: 2 },
  { id: 'r2-support-9', theme: 'support', text: 'When my partner is having a rough day...', optionA: 'I sense it pretty quickly', optionB: 'They usually need to tell me', round: 2 },
  { id: 'r2-support-10', theme: 'support', text: 'Crying in front of my partner...', optionA: 'Feels completely okay', optionB: 'Is something I try to avoid', round: 2 },
  { id: 'r2-support-11', theme: 'support', text: 'I show love primarily through...', optionA: 'Saying how I feel', optionB: 'Doing things for my partner', round: 2 },
  { id: 'r2-support-12', theme: 'support', text: 'When celebrating wins together...', optionA: 'I like to make a big deal of it', optionB: 'I prefer keeping it low-key', round: 2 },
  { id: 'r2-support-13', theme: 'support', text: 'I feel most appreciated when...', optionA: 'My partner says thank you', optionB: 'My partner returns the gesture', round: 2 },
  { id: 'r2-support-14', theme: 'support', text: 'During big life decisions...', optionA: 'I want constant input from my partner', optionB: 'I process independently first', round: 2 },
  { id: 'r2-support-15', theme: 'support', text: 'I think my partner and I are good at...', optionA: 'Emotional conversations', optionB: 'Practical support', round: 2 },
  { id: 'r2-support-16', theme: 'support', text: "If I'm worried about something...", optionA: 'I share it right away', optionB: 'I wait until I have more clarity', round: 2 },
  { id: 'r2-support-17', theme: 'support', text: 'Physical comfort like hugs when upset...', optionA: 'Is very important to me', optionB: 'Matters less than talking', round: 2 },
  { id: 'r2-support-18', theme: 'support', text: 'I would describe my emotional bond with my partner as...', optionA: 'Deep and secure', optionB: 'Growing and evolving', round: 2 },
  { id: 'r2-support-19', theme: 'support', text: "When my partner doesn't understand me...", optionA: 'I try explaining differently', optionB: 'I feel frustrated', round: 2 },
  { id: 'r2-support-20', theme: 'support', text: 'Asking for help from my partner...', optionA: 'Comes easily to me', optionB: 'Is something I am learning', round: 2 },
  { id: 'r2-support-21', theme: 'support', text: 'When something exciting happens to me...', optionA: 'My partner is the first to know', optionB: 'I share it when I see them later', round: 2 },
  { id: 'r2-support-22', theme: 'support', text: 'I think my partner understands my needs...', optionA: 'Really well', optionB: 'Most of the time', round: 2 },
  { id: 'r2-support-23', theme: 'support', text: 'My partner and I check in emotionally...', optionA: 'Pretty regularly', optionB: 'When something comes up', round: 2 },
  { id: 'r2-support-24', theme: 'support', text: 'When I need reassurance...', optionA: 'I ask for it directly', optionB: 'I hope my partner notices', round: 2 },
  { id: 'r2-support-25', theme: 'support', text: 'The emotional support in my relationship feels...', optionA: 'Balanced and mutual', optionB: 'Sometimes one-sided', round: 2 },
  { id: 'r2-support-26', theme: 'support', text: 'When dealing with external stress (work, family)...', optionA: 'I tackle it with my partner as a team', optionB: 'I handle mine separately', round: 2 },
  { id: 'r2-support-27', theme: 'support', text: 'I think surprise gestures are...', optionA: 'Important for connection', optionB: 'Nice but not essential', round: 2 },
  { id: 'r2-support-28', theme: 'support', text: "When I've had a really long day...", optionA: 'I want to debrief with my partner', optionB: 'I want quiet and rest', round: 2 },
  { id: 'r2-support-29', theme: 'support', text: 'My partner makes me feel...', optionA: 'Safe to be fully myself', optionB: 'Loved even when I hold back', round: 2 },
  { id: 'r2-support-30', theme: 'support', text: 'I express gratitude in my relationship...', optionA: 'Verbally and often', optionB: 'Through actions', round: 2 }
];

const round2DailyLifeQuestions: Question[] = [
  { id: 'r2-dailyLife-1', theme: 'dailyLife', text: 'My morning routine compared to my partner is...', optionA: 'Pretty similar', optionB: 'Quite different', round: 2 },
  { id: 'r2-dailyLife-2', theme: 'dailyLife', text: 'When it comes to cleanliness standards...', optionA: 'I think my partner and I are similar', optionB: 'I think we have different thresholds', round: 2 },
  { id: 'r2-dailyLife-3', theme: 'dailyLife', text: 'Cooking at home...', optionA: 'Is something I enjoy doing together', optionB: 'Is usually handled by one of us', round: 2 },
  { id: 'r2-dailyLife-4', theme: 'dailyLife', text: 'My sleep schedule compared to my partner is...', optionA: 'Pretty aligned', optionB: 'Quite different', round: 2 },
  { id: 'r2-dailyLife-5', theme: 'dailyLife', text: 'Handling finances together...', optionA: 'Works smoothly for me', optionB: 'Has been a learning curve', round: 2 },
  { id: 'r2-dailyLife-6', theme: 'dailyLife', text: 'On weeknights, I typically prefer to...', optionA: 'Spend time with my partner', optionB: 'Do my own thing', round: 2 },
  { id: 'r2-dailyLife-7', theme: 'dailyLife', text: 'When grocery shopping...', optionA: 'I like planning together', optionB: 'I prefer one person handles it', round: 2 },
  { id: 'r2-dailyLife-8', theme: 'dailyLife', text: 'My ideal weekend involves...', optionA: 'Doing activities with my partner', optionB: 'A mix of together and alone time', round: 2 },
  { id: 'r2-dailyLife-9', theme: 'dailyLife', text: 'Decision-making about the home...', optionA: 'I prefer discussing everything', optionB: 'I prefer we each handle different areas', round: 2 },
  { id: 'r2-dailyLife-10', theme: 'dailyLife', text: 'When my partner is sick...', optionA: 'I become full caretaker', optionB: 'I let them handle it independently', round: 2 },
  { id: 'r2-dailyLife-11', theme: 'dailyLife', text: 'My approach to saving money compared to my partner is...', optionA: 'Very similar', optionB: 'Somewhat different', round: 2 },
  { id: 'r2-dailyLife-12', theme: 'dailyLife', text: 'Planning vacations together...', optionA: 'Is exciting and smooth for me', optionB: 'Can cause some friction', round: 2 },
  { id: 'r2-dailyLife-13', theme: 'dailyLife', text: 'My TV and entertainment tastes compared to my partner...', optionA: 'Overlap a lot', optionB: 'Are pretty different', round: 2 },
  { id: 'r2-dailyLife-14', theme: 'dailyLife', text: 'When hosting people at home...', optionA: 'I really enjoy it', optionB: 'I find it stressful', round: 2 },
  { id: 'r2-dailyLife-15', theme: 'dailyLife', text: 'My eating habits compared to my partner are...', optionA: 'Very compatible', optionB: 'A bit different', round: 2 },
  { id: 'r2-dailyLife-16', theme: 'dailyLife', text: 'I think my partner and I spend money on...', optionA: 'Similar priorities', optionB: 'Different priorities', round: 2 },
  { id: 'r2-dailyLife-17', theme: 'dailyLife', text: 'When it comes to organization...', optionA: 'I think my partner and I are aligned', optionB: 'I think we have different systems', round: 2 },
  { id: 'r2-dailyLife-18', theme: 'dailyLife', text: 'My social life as part of a couple...', optionA: 'Feels well-balanced', optionB: 'Could use some attention', round: 2 },
  { id: 'r2-dailyLife-19', theme: 'dailyLife', text: 'When it comes to pets...', optionA: 'My partner and I totally agree', optionB: 'I think we see it a bit differently', round: 2 },
  { id: 'r2-dailyLife-20', theme: 'dailyLife', text: 'My work-life boundaries compared to my partner are...', optionA: 'Similar', optionB: 'Different', round: 2 },
  { id: 'r2-dailyLife-21', theme: 'dailyLife', text: 'When it comes to exercising...', optionA: 'My partner and I motivate each other', optionB: 'I do my own thing', round: 2 },
  { id: 'r2-dailyLife-22', theme: 'dailyLife', text: 'My screen time habits compared to my partner are...', optionA: 'Pretty similar', optionB: 'Different', round: 2 },
  { id: 'r2-dailyLife-23', theme: 'dailyLife', text: 'Running errands with my partner...', optionA: 'Is something that works well', optionB: 'Can test my patience', round: 2 },
  { id: 'r2-dailyLife-24', theme: 'dailyLife', text: 'My thermostat preferences compared to my partner are...', optionA: 'The same', optionB: 'A point of negotiation', round: 2 },
  { id: 'r2-dailyLife-25', theme: 'dailyLife', text: 'When furniture shopping or decorating...', optionA: 'My tastes align with my partner', optionB: 'I usually need to compromise', round: 2 },
  { id: 'r2-dailyLife-26', theme: 'dailyLife', text: 'Managing calendars and schedules with my partner...', optionA: 'Works well', optionB: 'Causes some mix-ups', round: 2 },
  { id: 'r2-dailyLife-27', theme: 'dailyLife', text: 'My approach to health and wellness compared to my partner is...', optionA: 'Pretty aligned', optionB: 'Different in some ways', round: 2 },
  { id: 'r2-dailyLife-28', theme: 'dailyLife', text: 'Dealing with household repairs...', optionA: 'I like figuring it out together', optionB: 'I prefer one of us takes the lead', round: 2 },
  { id: 'r2-dailyLife-29', theme: 'dailyLife', text: 'My attitude about clutter compared to my partner is...', optionA: 'Very similar', optionB: 'Different', round: 2 },
  { id: 'r2-dailyLife-30', theme: 'dailyLife', text: 'Splitting time between families...', optionA: 'Feels balanced and fair to me', optionB: 'Can be a bit tricky', round: 2 }
];

const round2IntimacyQuestions: Question[] = [
  { id: 'r2-intimacy-1', theme: 'intimacy', text: 'Physical touch in my relationship...', optionA: 'Happens very naturally', optionB: 'Could be more frequent', round: 2 },
  { id: 'r2-intimacy-2', theme: 'intimacy', text: 'I feel most desired when...', optionA: 'My partner initiates', optionB: 'My partner responds enthusiastically', round: 2 },
  { id: 'r2-intimacy-3', theme: 'intimacy', text: 'Talking about physical intimacy...', optionA: 'Is comfortable for me', optionB: 'Could be easier', round: 2 },
  { id: 'r2-intimacy-4', theme: 'intimacy', text: 'My preferences for closeness compared to my partner...', optionA: 'Are well matched', optionB: 'Differ somewhat', round: 2 },
  { id: 'r2-intimacy-5', theme: 'intimacy', text: 'Non-sexual physical affection for me...', optionA: 'Happens throughout each day', optionB: 'Happens at certain moments', round: 2 },
  { id: 'r2-intimacy-6', theme: 'intimacy', text: 'I think quality time together...', optionA: 'Is central to my connection with my partner', optionB: 'Is one of many ways I connect', round: 2 },
  { id: 'r2-intimacy-7', theme: 'intimacy', text: 'After being apart from my partner...', optionA: 'Reuniting feels very affectionate', optionB: 'I ease back into togetherness', round: 2 },
  { id: 'r2-intimacy-8', theme: 'intimacy', text: 'Expressing physical attraction to my partner...', optionA: 'I do often', optionB: 'I could do more', round: 2 },
  { id: 'r2-intimacy-9', theme: 'intimacy', text: 'Date nights for me are...', optionA: 'A regular priority', optionB: 'Something I should do more', round: 2 },
  { id: 'r2-intimacy-10', theme: 'intimacy', text: 'I prefer to show affection...', optionA: 'Publicly', optionB: 'Privately', round: 2 },
  { id: 'r2-intimacy-11', theme: 'intimacy', text: 'Romantic gestures in my relationship...', optionA: 'Happen fairly often', optionB: 'Are less frequent than I would like', round: 2 },
  { id: 'r2-intimacy-12', theme: 'intimacy', text: 'Holding hands or cuddling...', optionA: 'Happens regularly for me', optionB: 'Happens sometimes', round: 2 },
  { id: 'r2-intimacy-13', theme: 'intimacy', text: 'I feel most connected after...', optionA: 'Deep conversations', optionB: 'Physical closeness', round: 2 },
  { id: 'r2-intimacy-14', theme: 'intimacy', text: 'My physical relationship with my partner...', optionA: 'Is a strength', optionB: 'Is something I am nurturing', round: 2 },
  { id: 'r2-intimacy-15', theme: 'intimacy', text: 'Being playful and flirty...', optionA: 'Comes naturally to me', optionB: 'Is something I could do more', round: 2 },
  { id: 'r2-intimacy-16', theme: 'intimacy', text: 'I feel my partner finds me attractive...', optionA: 'Absolutely, no doubt', optionB: 'Yes, but I like more reminders', round: 2 },
  { id: 'r2-intimacy-17', theme: 'intimacy', text: 'Morning kisses or greetings...', optionA: 'Are an everyday thing for me', optionB: 'Happen when I remember', round: 2 },
  { id: 'r2-intimacy-18', theme: 'intimacy', text: 'Sharing a bed...', optionA: 'Feels essential to my bond with my partner', optionB: 'Is nice but sleep quality matters more', round: 2 },
  { id: 'r2-intimacy-19', theme: 'intimacy', text: 'When I am not in the mood...', optionA: 'My partner handles it gracefully', optionB: 'It can feel like rejection', round: 2 },
  { id: 'r2-intimacy-20', theme: 'intimacy', text: 'Surprise physical affection...', optionA: 'Always makes me smile', optionB: 'Depends on my mood', round: 2 },
  { id: 'r2-intimacy-21', theme: 'intimacy', text: 'I think romance should be...', optionA: 'Spontaneous and organic', optionB: 'Planned and intentional', round: 2 },
  { id: 'r2-intimacy-22', theme: 'intimacy', text: 'Eye contact during meaningful moments...', optionA: 'Happens naturally for me', optionB: 'Is something I could improve', round: 2 },
  { id: 'r2-intimacy-23', theme: 'intimacy', text: 'I compliment my partner...', optionA: 'Regularly', optionB: 'Less than I should', round: 2 },
  { id: 'r2-intimacy-24', theme: 'intimacy', text: 'My need for physical affection compared to my partner is...', optionA: 'Very similar', optionB: 'A bit different', round: 2 },
  { id: 'r2-intimacy-25', theme: 'intimacy', text: 'Connection rituals (morning coffee, evening walk)...', optionA: 'I have several with my partner', optionB: 'I could create more', round: 2 },
  { id: 'r2-intimacy-26', theme: 'intimacy', text: 'When busy or stressed, intimacy...', optionA: 'Stays a priority for me', optionB: 'Often gets pushed aside', round: 2 },
  { id: 'r2-intimacy-27', theme: 'intimacy', text: 'I feel most romantic when...', optionA: 'My partner and I have uninterrupted time', optionB: 'My partner does something thoughtful', round: 2 },
  { id: 'r2-intimacy-28', theme: 'intimacy', text: 'My comfort with physical vulnerability...', optionA: 'Is very high', optionB: 'Is still growing', round: 2 },
  { id: 'r2-intimacy-29', theme: 'intimacy', text: 'I say "I love you"...', optionA: 'Multiple times daily', optionB: 'At key moments', round: 2 },
  { id: 'r2-intimacy-30', theme: 'intimacy', text: 'Physical affection before sleep...', optionA: 'Is part of my routine', optionB: 'Happens occasionally', round: 2 }
];

const round2FutureQuestions: Question[] = [
  { id: 'r2-future-1', theme: 'future', text: 'My vision for where to live long-term...', optionA: 'Is very aligned with my partner', optionB: 'Has some differences', round: 2 },
  { id: 'r2-future-2', theme: 'future', text: 'When it comes to having children...', optionA: 'I think my partner and I are on the same page', optionB: 'I think there is still discussion needed', round: 2 },
  { id: 'r2-future-3', theme: 'future', text: 'My career ambitions...', optionA: 'Are supported well by my partner', optionB: 'Sometimes compete with relationship priorities', round: 2 },
  { id: 'r2-future-4', theme: 'future', text: 'Retirement dreams...', optionA: 'I have discussed with my partner', optionB: 'Have not come up much yet', round: 2 },
  { id: 'r2-future-5', theme: 'future', text: 'Financial goals for the future...', optionA: 'I share and plan with my partner', optionB: 'I approach independently', round: 2 },
  { id: 'r2-future-6', theme: 'future', text: 'The pace at which my partner and I make big decisions...', optionA: 'Feels right for me', optionB: 'Sometimes feels misaligned', round: 2 },
  { id: 'r2-future-7', theme: 'future', text: 'My travel and adventure goals...', optionA: 'Are very similar to my partner', optionB: 'Differ in some ways', round: 2 },
  { id: 'r2-future-8', theme: 'future', text: 'My involvement with extended family...', optionA: 'Will likely stay as it is', optionB: 'May need to evolve', round: 2 },
  { id: 'r2-future-9', theme: 'future', text: 'Imagining my life with my partner in 5 years...', optionA: 'Excites me', optionB: 'Feels a bit uncertain', round: 2 },
  { id: 'r2-future-10', theme: 'future', text: 'My approach to risk (career, money, moves)...', optionA: 'Is similar to my partner', optionB: 'Differs somewhat', round: 2 },
  { id: 'r2-future-11', theme: 'future', text: 'Marriage (or deeper commitment)...', optionA: 'I feel on the same timeline as my partner', optionB: 'I think we see differently', round: 2 },
  { id: 'r2-future-12', theme: 'future', text: 'My home ownership goals...', optionA: 'Align with my partner', optionB: 'Need more discussion', round: 2 },
  { id: 'r2-future-13', theme: 'future', text: 'My lifestyle preferences long-term...', optionA: 'Match well with my partner', optionB: 'Have some differences', round: 2 },
  { id: 'r2-future-14', theme: 'future', text: 'Planning for emergencies or the unexpected...', optionA: 'I have discussed with my partner', optionB: 'Is not something I have tackled', round: 2 },
  { id: 'r2-future-15', theme: 'future', text: 'I feel secure about my future with my partner...', optionA: 'Absolutely', optionB: 'Mostly, with some uncertainty', round: 2 },
  { id: 'r2-future-16', theme: 'future', text: 'My educational or learning goals...', optionA: 'Are supported by my partner', optionB: 'I pursue independently', round: 2 },
  { id: 'r2-future-17', theme: 'future', text: 'My views on work-life balance long-term...', optionA: 'Are aligned with my partner', optionB: 'May need discussion', round: 2 },
  { id: 'r2-future-18', theme: 'future', text: 'Building wealth with my partner feels...', optionA: 'Like a shared goal', optionB: 'More individual with some overlap', round: 2 },
  { id: 'r2-future-19', theme: 'future', text: 'How involved family will be in my future...', optionA: 'I agree with my partner on', optionB: 'I see differently from my partner', round: 2 },
  { id: 'r2-future-20', theme: 'future', text: 'The legacy or impact I want to leave...', optionA: 'I have talked about with my partner', optionB: 'Is not something I discuss', round: 2 },
  { id: 'r2-future-21', theme: 'future', text: 'If opportunities required relocation...', optionA: 'I think my partner and I could make it work', optionB: 'It would be complicated', round: 2 },
  { id: 'r2-future-22', theme: 'future', text: 'My spiritual or philosophical alignment with my partner...', optionA: 'Is strong', optionB: 'Has room to explore', round: 2 },
  { id: 'r2-future-23', theme: 'future', text: 'How I prioritize career vs relationship...', optionA: 'Feels balanced', optionB: 'Can be challenging', round: 2 },
  { id: 'r2-future-24', theme: 'future', text: 'My shared dreams with my partner...', optionA: 'I discuss regularly', optionB: 'I could talk about more', round: 2 },
  { id: 'r2-future-25', theme: 'future', text: 'Thinking about aging with my partner...', optionA: 'Makes me feel optimistic', optionB: 'Is something I should discuss more', round: 2 },
  { id: 'r2-future-26', theme: 'future', text: 'My expected standard of living...', optionA: 'I agree with my partner on', optionB: 'May differ slightly', round: 2 },
  { id: 'r2-future-27', theme: 'future', text: 'Hobbies or passions I want to pursue...', optionA: 'Are fully supported by my partner', optionB: 'Could create time conflicts', round: 2 },
  { id: 'r2-future-28', theme: 'future', text: 'Community involvement or giving back...', optionA: 'Is a shared value with my partner', optionB: 'Matters differently to each of us', round: 2 },
  { id: 'r2-future-29', theme: 'future', text: 'If I wanted a major career change...', optionA: 'I feel my partner would be supportive', optionB: 'It might cause stress', round: 2 },
  { id: 'r2-future-30', theme: 'future', text: 'My plans with my partner feel...', optionA: 'Like a shared roadmap', optionB: 'More like a general direction', round: 2 }
];

const round2GrowthQuestions: Question[] = [
  { id: 'r2-growth-1', theme: 'growth', text: 'I feel I am becoming a better person through this relationship...', optionA: 'Absolutely', optionB: 'In some ways', round: 2 },
  { id: 'r2-growth-2', theme: 'growth', text: 'My partner challenges me to grow...', optionA: 'In healthy ways', optionB: 'Not as much as I would like', round: 2 },
  { id: 'r2-growth-3', theme: 'growth', text: 'I can share my fears and insecurities...', optionA: 'Very openly', optionB: 'Sometimes with hesitation', round: 2 },
  { id: 'r2-growth-4', theme: 'growth', text: 'This relationship brings out...', optionA: 'The best in me', optionB: 'Mixed things in me', round: 2 },
  { id: 'r2-growth-5', theme: 'growth', text: 'My personal goals and hobbies...', optionA: 'Are encouraged by my partner', optionB: 'Sometimes take a backseat', round: 2 },
  { id: 'r2-growth-6', theme: 'growth', text: 'Giving and receiving constructive feedback...', optionA: 'Works well for me', optionB: 'Can be sensitive', round: 2 },
  { id: 'r2-growth-7', theme: 'growth', text: 'I feel my individuality in this relationship...', optionA: 'Is fully supported', optionB: 'Could use more space', round: 2 },
  { id: 'r2-growth-8', theme: 'growth', text: 'Learning new things with my partner...', optionA: 'Is something I do', optionB: 'Is not a big focus', round: 2 },
  { id: 'r2-growth-9', theme: 'growth', text: 'Past relationship lessons...', optionA: 'I have discussed openly with my partner', optionB: 'Are mostly private to me', round: 2 },
  { id: 'r2-growth-10', theme: 'growth', text: 'I can admit when I am wrong to my partner...', optionA: 'Pretty easily', optionB: 'With some difficulty', round: 2 },
  { id: 'r2-growth-11', theme: 'growth', text: 'This relationship has taught me...', optionA: 'A lot about myself', optionB: 'Mostly about partnership', round: 2 },
  { id: 'r2-growth-12', theme: 'growth', text: 'Space for alone time and self-care...', optionA: 'Is well-respected in my relationship', optionB: 'Could be improved', round: 2 },
  { id: 'r2-growth-13', theme: 'growth', text: 'I feel I can pursue my dreams...', optionA: 'With full support from my partner', optionB: 'With some compromise', round: 2 },
  { id: 'r2-growth-14', theme: 'growth', text: 'I talk about self-improvement with my partner...', optionA: 'Regularly', optionB: 'Individually mostly', round: 2 },
  { id: 'r2-growth-15', theme: 'growth', text: 'When I make mistakes...', optionA: 'I feel safe and accepted', optionB: 'I sometimes fear judgment', round: 2 },
  { id: 'r2-growth-16', theme: 'growth', text: 'My sense of identity in this relationship...', optionA: 'Feels strong and secure', optionB: 'Is something I am navigating', round: 2 },
  { id: 'r2-growth-17', theme: 'growth', text: 'My partner and I celebrate personal wins...', optionA: 'Enthusiastically', optionB: 'In a low-key way', round: 2 },
  { id: 'r2-growth-18', theme: 'growth', text: 'Encouraging each other during tough times...', optionA: 'Is a strength of mine', optionB: 'Is something I am building', round: 2 },
  { id: 'r2-growth-19', theme: 'growth', text: 'I feel heard when I share new ideas...', optionA: 'Always', optionB: 'Most of the time', round: 2 },
  { id: 'r2-growth-20', theme: 'growth', text: 'This relationship helps me...', optionA: 'Feel more confident', optionB: 'Work through insecurities', round: 2 },
  { id: 'r2-growth-21', theme: 'growth', text: 'I handle change in my relationship...', optionA: 'By adapting with my partner as a team', optionB: 'Individually first, then reconnecting', round: 2 },
  { id: 'r2-growth-22', theme: 'growth', text: 'Exploring spirituality or meaning...', optionA: 'Is something I share with my partner', optionB: 'Is more personal for me', round: 2 },
  { id: 'r2-growth-23', theme: 'growth', text: 'Therapy or counseling...', optionA: 'I am open to if needed', optionB: 'Is not something I have considered', round: 2 },
  { id: 'r2-growth-24', theme: 'growth', text: 'I feel my partner accepts...', optionA: 'All of who I am', optionB: 'Most of who I am', round: 2 },
  { id: 'r2-growth-25', theme: 'growth', text: 'Setting goals with my partner...', optionA: 'Is exciting for me', optionB: 'Could happen more', round: 2 },
  { id: 'r2-growth-26', theme: 'growth', text: 'Books, podcasts, or resources about relationships...', optionA: 'I explore with my partner', optionB: 'Are not really my thing', round: 2 },
  { id: 'r2-growth-27', theme: 'growth', text: 'I can be vulnerable without feeling weak...', optionA: 'Definitely', optionB: 'Sometimes', round: 2 },
  { id: 'r2-growth-28', theme: 'growth', text: 'My partner and I inspire each other to...', optionA: 'Try new things', optionB: 'Appreciate what we have', round: 2 },
  { id: 'r2-growth-29', theme: 'growth', text: 'Honest self-reflection in this relationship...', optionA: 'Happens regularly for me', optionB: 'Could be deeper', round: 2 },
  { id: 'r2-growth-30', theme: 'growth', text: 'I feel this relationship is helping me...', optionA: 'Become who I want to be', optionB: 'Figure out what I want', round: 2 }
];

export const round2QuestionsByTheme: Record<Theme, Question[]> = {
  conflict: round2ConflictQuestions,
  support: round2SupportQuestions,
  dailyLife: round2DailyLifeQuestions,
  intimacy: round2IntimacyQuestions,
  future: round2FutureQuestions,
  growth: round2GrowthQuestions
};

export function getQuestionById(id: string): Question | undefined {
  const allRound1 = round1Questions.find(q => q.id === id);
  if (allRound1) return allRound1;
  
  for (const theme of Object.keys(round2QuestionsByTheme) as Theme[]) {
    const found = round2QuestionsByTheme[theme].find(q => q.id === id);
    if (found) return found;
  }
  return undefined;
}

// Round 2 intro text explaining why this question is shown
import type { Card } from './types';
import { themeDisplayNames } from './types';

export function getRound2Intro(_questionId: string, theme: Theme, round1Cards: Card[]): string {
  // Find Round 1 mismatches in this theme
  const themeMismatches = round1Cards.filter(
    c => c.answer.theme === theme && c.answer.matched === false
  );
  
  const themeName = themeDisplayNames[theme];
  
  if (themeMismatches.length > 0) {
    // Reference the Round 1 mismatch
    const introVariants: Record<Theme, string> = {
      conflict: `In Round 1, you had different views on handling conflict. Let's explore this deeper...`,
      support: `You showed different support preferences in Round 1. Let's understand each other better...`,
      dailyLife: `Your daily life perspectives differed in Round 1. Let's dive into the details...`,
      intimacy: `Round 1 revealed different intimacy styles. Let's explore what this means...`,
      future: `You had some different visions for the future. Let's clarify your hopes...`,
      growth: `Your growth perspectives varied in Round 1. Let's understand your individual journeys...`
    };
    return introVariants[theme];
  }
  
  // Generic intro if no mismatch (backup questions)
  return `Exploring more about ${themeName}...`;
}

// Round 2 examples for context (add to individual questions as needed)
export const round2Examples: Record<string, string> = {
  'r2-conflict-1': 'e.g., A disagreement arises—do you want to hash it out now or take a breather?',
  'r2-conflict-2': 'e.g., Think about your last argument—how did you respond emotionally?',
  'r2-conflict-3': 'e.g., After resolving a disagreement, how do you typically feel?',
  'r2-conflict-4': 'e.g., Your partner points out something you forgot—what\'s your initial reaction?',
  'r2-conflict-5': 'e.g., That same topic keeps coming up—how do you approach it each time?',
  'r2-support-1': 'e.g., You\'re telling your partner about a tough meeting—what kind of response helps?',
  'r2-support-2': 'e.g., Your partner seems down—what\'s your instinct?',
  'r2-support-3': 'e.g., Think about when you feel closest—is it talking or doing activities?',
  'r2-support-4': 'e.g., How do you prefer to receive love—words or actions?',
  'r2-support-5': 'e.g., You\'re stressed about work—what do you need from your partner?',
  'r2-dailyLife-1': 'e.g., Compare your wake-up routines—similar or wildly different?',
  'r2-dailyLife-2': 'e.g., How clean does the kitchen need to be for you vs. your partner?',
  'r2-dailyLife-3': 'e.g., Do you cook together or does one person usually take the lead?',
  'r2-dailyLife-4': 'e.g., Are you both night owls, early birds, or mismatched?',
  'r2-dailyLife-5': 'e.g., Managing money together—smooth sailing or learning curve?',
  'r2-intimacy-1': 'e.g., Think about casual touches throughout your day together',
  'r2-intimacy-2': 'e.g., What makes you feel most wanted by your partner?',
  'r2-intimacy-3': 'e.g., Talking about your physical relationship—easy or awkward?',
  'r2-intimacy-4': 'e.g., How much closeness do you each naturally want?',
  'r2-intimacy-5': 'e.g., Random hugs, hand-holding—how often does this happen?',
  'r2-future-1': 'e.g., Where do you each imagine living in 10 years?',
  'r2-future-2': 'e.g., Kids—have you fully aligned on this topic?',
  'r2-future-3': 'e.g., Your career goals—how do they fit with your relationship?',
  'r2-future-4': 'e.g., Have you talked about what retirement might look like?',
  'r2-future-5': 'e.g., Saving for the future—are you on the same page?',
  'r2-growth-1': 'e.g., Has this relationship helped you become a better person?',
  'r2-growth-2': 'e.g., Does your partner push you to grow in positive ways?',
  'r2-growth-3': 'e.g., Can you share your deepest fears with your partner?',
  'r2-growth-4': 'e.g., Does this relationship bring out your best qualities?',
  'r2-growth-5': 'e.g., Are your personal goals supported or sidelined?'
};

// Enhanced getQuestionById that includes Round 2 examples
export function getQuestionWithExample(id: string): Question | undefined {
  const question = getQuestionById(id);
  if (question && question.round === 2 && !question.example && round2Examples[id]) {
    return { ...question, example: round2Examples[id] };
  }
  return question;
}
