/* Central content layer for Auralis ENT Clinic.
   Both service-details.html and blog-details.html render from this file
   using the ?id= query parameter. */
window.AURALIS = (function () {
  var icons = {
    ear: '<path d="M6 9a6 6 0 1 1 12 0c0 3-1.7 4.5-3.1 5.7-1.2 1-1.9 2-1.9 3.3a3 3 0 0 1-6 0"></path><path d="M9 9a3 3 0 0 1 6 0c0 1.6-1 2.4-1.9 3.2"></path>',
    nose: '<path d="M10 3v5.5c0 1.2-.4 2.2-1.2 3.1L6 15a4 4 0 0 0 3 6h6a4 4 0 0 0 3-6l-2.8-3.4c-.8-.9-1.2-1.9-1.2-3.1V3"></path><path d="M8 20h8"></path>',
    throat: '<path d="M8 3v6a4 4 0 0 0 8 0V3"></path><path d="M12 13v8"></path><path d="M9 21h6"></path>',
    allergy: '<path d="M12 21c-4 0-7-3-7-7 0-3 2-5 4-7 2-2 3-4 3-4s1 2 3 4c2 2 4 4 4 7 0 4-3 7-7 7Z"></path><path d="M12 21v-6"></path>',
    sleep: '<path d="M21 12.8A8.5 8.5 0 1 1 10 2.5a7 7 0 0 0 11 10.3Z"></path><path d="M3 20h6l-6-4h6"></path>',
    child: '<circle cx="12" cy="7" r="4"></circle><path d="M5 21v-2a7 7 0 0 1 14 0v2"></path><path d="M9 7h.01M15 7h.01"></path>',
    balance: '<circle cx="12" cy="12" r="9"></circle><path d="M12 3v18M3 12h18"></path><path d="M8 8l8 8"></path>',
    hearing: '<path d="M4 14v-2a8 8 0 0 1 16 0c0 3-2 4-3.5 5.5S14 20 14 21"></path><path d="M8 14v-2a4 4 0 0 1 8 0"></path>',
    scope: '<circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path><path d="M11 8v6M8 11h6"></path>',
    wave: '<path d="M2 12h3l2-6 3 12 3-9 2 6 2-3h5"></path>',
    lungs: '<path d="M12 4v9"></path><path d="M8 8c-3 0-5 2-5 5v4a3 3 0 0 0 3 3h2V8Z"></path><path d="M16 8c3 0 5 2 5 5v4a3 3 0 0 0-3 3h-2V8Z"></path>',
    check: '<path d="M20 6 9 17l-5-5"></path>',
    star: '<path d="m12 2 3 6.5 7 .9-5 4.8 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.8 7-.9L12 2Z"></path>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M8 2v4M16 2v4M3 9h18"></path>',
    clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>',
    user: '<circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path>',
    search: '<circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"></path>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z"></path>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 6-10 7L2 6"></path>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path><path d="m9 12 2 2 4-4"></path>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"></path>',
    leaf: '<path d="M11 20A7 7 0 0 1 4 13V9a7 7 0 0 1 7-7h8v8a7 7 0 0 1-7 7h-1"></path><path d="M4 21c0-5 3-9 8-11"></path>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"></path>',
    share: '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 10.6 6.8-4.2M8.6 13.4l6.8 4.2"></path>',
    lock: '<rect x="3" y="11" width="18" height="10" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"></path>',
    play: '<circle cx="12" cy="12" r="9"></circle><path d="m10 8 6 4-6 4V8Z"></path>',
    smile: '<circle cx="12" cy="12" r="9"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"></path>'
  };

  function icon(name, className) {
    var paths = icons[name] || icons.spark;
    return (
      '<svg class="' + (className || "icon") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      paths +
      "</svg>"
    );
  }

  var services = [
    {
      id: "ear-hearing",
      number: "01",
      category: "Ear",
      title: "Ear & Hearing Care",
      short: "From hearing assessments to recurring ear infections and balance concerns, with clear next steps.",
      icon: "ear",
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=2000&q=85",
      price: "From $95",
      duration: "45 minute assessment",
      tagline: "Clearer hearing. Confident decisions.",
      description: "A complete picture of your ear and hearing health, explained in plain language and followed by a plan that fits your life.",
      intro: "Hearing changes are rarely sudden. They arrive as small adjustments — asking people to repeat themselves, turning the television up, or finding busy rooms tiring. Our ear and hearing service begins by listening carefully to what you have noticed, then uses modern assessments to understand why. You leave with clear answers, practical options and a written summary you can share with family.",
      features: [
        "Adult and paediatric hearing assessments",
        "Microsuction and gentle ear wax removal",
        "Treatment for outer and middle ear infections",
        "Tinnitus assessment and management advice",
        "Balance and vestibular screening",
        "Hearing aid guidance without pressure"
      ],
      included: [
        { icon: "scope", title: "Detailed examination", text: "Otoscopy, tympanometry and pure-tone audiometry as appropriate." },
        { icon: "wave", title: "Plain-language results", text: "Your audiogram explained visually, without jargon or rush." },
        { icon: "book", title: "Written care plan", text: "A summary of findings, next steps and follow-up timing." },
        { icon: "hearing", title: "Hearing aid advice", text: "Independent guidance on devices, budgets and realistic outcomes." },
        { icon: "shield", title: "Aftercare support", text: "A direct contact for questions after your appointment." },
        { icon: "heart", title: "Family involvement", text: "We welcome a relative or friend in your consultation." }
      ],
      steps: [
        { title: "Listen first", text: "A relaxed conversation about your symptoms, history and daily impact." },
        { title: "Assess gently", text: "Focused examination and hearing tests in a quiet, calibrated room." },
        { title: "Explain clearly", text: "We show you the results and discuss every realistic option." },
        { title: "Plan together", text: "A written plan, follow-up timing and direct support if things change." }
      ],
      faqs: [
        { q: "How long does a hearing assessment take?", a: "Plan for around 45 minutes. We include history, examination, testing and a full explanation of your results in a single visit." },
        { q: "Do I need to prepare before my appointment?", a: "Please bring a list of medicines and any previous hearing tests. Avoid loud environments for 24 hours before testing where possible." },
        { q: "Can ear wax be removed at the same appointment?", a: "Often, yes. If the ear canal is inflamed or you have had recent ear surgery, we may recommend a follow-up appointment instead." },
        { q: "Do you sell hearing aids?", a: "We provide independent advice and fitting support. We are not tied to a single manufacturer, so recommendations are based on your needs." },
        { q: "Is a referral required?", a: "No referral is needed for a private assessment. If your insurer requires one, our team can guide you through the paperwork." }
      ],
      plans: [
        { name: "Hearing Assessment", price: "$95", note: "45 minutes · one visit", features: ["Full ear examination", "Pure-tone hearing test", "Written results summary", "15-minute follow-up call"], featured: false },
        { name: "Complete Ear Care", price: "$240", note: "Assessment + treatment", features: ["Everything in Assessment", "Wax removal if suitable", "Infection treatment plan", "6-week review included", "Priority appointment access"], featured: true },
        { name: "Hearing Aid Journey", price: "$390", note: "3-month programme", features: ["Everything in Complete Care", "Two fitting sessions", "Real-ear verification", "Trial devices available", "Unlimited adjustments"], featured: false }
      ]
    },
    {
      id: "nose-sinus",
      number: "02",
      category: "Nose",
      title: "Nose & Sinus Care",
      short: "Relief for sinusitis, nasal blockage, allergies and the daily fatigue they can cause.",
      icon: "nose",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=2000&q=85",
      price: "From $110",
      duration: "40 minute consultation",
      tagline: "Breathe easier. Sleep better.",
      description: "Specialist assessment for persistent nasal symptoms, with medical and procedural options discussed honestly.",
      intro: "A blocked nose is more than a nuisance. It affects sleep, concentration, exercise and mood. Our nose and sinus service looks for the underlying cause — inflammation, allergy, structural narrowing or infection — rather than simply treating the symptom. Where surgery may help, we explain the evidence, the recovery and the alternatives before you decide.",
      features: [
        "Chronic and recurrent sinusitis assessment",
        "Nasal endoscopy and airway examination",
        "Allergic and non-allergic rhinitis care",
        "Nasal polyps and congestion management",
        "Septum and turbinate assessment",
        "Post-operative sinus follow-up"
      ],
      included: [
        { icon: "scope", title: "Nasal endoscopy", text: "A comfortable, high-definition look inside the nasal passages." },
        { icon: "leaf", title: "Allergy review", text: "A focused history and testing recommendations where useful." },
        { icon: "lungs", title: "Airway plan", text: "Medical, rinse and lifestyle strategies tailored to your symptoms." },
        { icon: "book", title: "Surgical discussion", text: "Honest advice on when an operation is — and is not — helpful." },
        { icon: "calendar", title: "Seasonal strategy", text: "Ahead-of-season planning for predictable allergy flares." },
        { icon: "shield", title: "Ongoing review", text: "Simple review points so treatment stays effective." }
      ],
      steps: [
        { title: "Map the pattern", text: "When symptoms appear, what triggers them and how they affect sleep." },
        { title: "Look closely", text: "Targeted examination, including endoscopy when appropriate." },
        { title: "Treat precisely", text: "A stepped plan using rinses, medicines or procedural care." },
        { title: "Review progress", text: "We adjust the plan based on real-life response, not guesswork." }
      ],
      faqs: [
        { q: "Is nasal endoscopy uncomfortable?", a: "Most people describe it as strange rather than painful. We use a very fine camera and a lubricating anaesthetic spray where needed." },
        { q: "How do I know if I need sinus surgery?", a: "Surgery is usually considered when symptoms persist despite good medical treatment, or when there is a structural problem. We discuss this only after a thorough trial of alternatives." },
        { q: "Can allergies be treated without testing?", a: "Sometimes. A clear history can guide treatment. Testing is most useful when triggers are unclear or immunotherapy is being considered." },
        { q: "Are nasal rinses safe every day?", a: "Yes, when prepared correctly with sterile or boiled cooled water. We will show you the technique and the right solution strength." },
        { q: "How quickly will I notice improvement?", a: "Many people notice partial relief within one to two weeks, but full benefit from medical treatment can take six to eight weeks." }
      ],
      plans: [
        { name: "Sinus Consultation", price: "$110", note: "40 minutes · one visit", features: ["Focused history and examination", "Nasal endoscopy if needed", "Personalised treatment plan", "Written summary"], featured: false },
        { name: "Sinus Relief Plan", price: "$260", note: "Consultation + review", features: ["Everything in Consultation", "6-week review", "Rinse and medicine coaching", "Allergy guidance"], featured: true },
        { name: "Complex Airway Care", price: "$420", note: "Extended programme", features: ["Everything in Relief Plan", "CT review coordination", "Surgical opinion if appropriate", "12-week support"], featured: false }
      ]
    },
    {
      id: "throat-voice",
      number: "03",
      category: "Throat",
      title: "Throat & Voice Care",
      short: "Thoughtful evaluation for throat discomfort, voice change, hoarseness and swallowing concerns.",
      icon: "throat",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=2000&q=85",
      price: "From $115",
      duration: "40 minute consultation",
      tagline: "A voice that feels like yours again.",
      description: "For teachers, singers, speakers and anyone whose voice or swallow is asking for attention.",
      intro: "Your voice carries your work, your identity and your connection to others. When it becomes hoarse, tired or painful, a careful examination matters. We assess the larynx and throat with a flexible camera when needed, then build a plan around vocal hygiene, therapy, medication or specialist procedures.",
      features: [
        "Persistent hoarseness and voice change",
        "Vocal cord assessment and video review",
        "Professional voice user support",
        "Chronic sore throat and globus sensation",
        "Swallowing difficulty evaluation",
        "Reflux-related throat symptoms"
      ],
      included: [
        { icon: "wave", title: "Voice analysis", text: "A structured listening and history session focused on how you use your voice." },
        { icon: "scope", title: "Laryngoscopy", text: "A clear view of the vocal cords where clinically indicated." },
        { icon: "book", title: "Vocal hygiene plan", text: "Practical routines for hydration, rest and warm-ups." },
        { icon: "user", title: "Therapy referral", text: "Coordinated referral to a speech and language therapist." },
        { icon: "lungs", title: "Reflux review", text: "Assessment of throat symptoms linked to acid or silent reflux." },
        { icon: "shield", title: "Follow-up", text: "A clear review point to confirm improvement or escalate care." }
      ],
      steps: [
        { title: "Hear the story", text: "How your voice has changed and what makes it better or worse." },
        { title: "Examine the larynx", text: "Gentle endoscopy when needed, with images explained on screen." },
        { title: "Protect the voice", text: "A plan combining technique, hydration and medical treatment." },
        { title: "Review and refine", text: "We check progress and adjust therapy or referrals." }
      ],
      faqs: [
        { q: "When should hoarseness be checked?", a: "If your voice has changed for more than three weeks, or you have pain, difficulty swallowing or a neck lump, please book an assessment." },
        { q: "Is a camera examination painful?", a: "The flexible camera passes through the nose after a numbing spray. It is quick and most people tolerate it well." },
        { q: "Do singers need a different approach?", a: "Yes. Professional voice users benefit from detailed vocal load assessment and coordinated work with a voice therapist." },
        { q: "Can acid reflux cause throat symptoms?", a: "It can contribute to throat clearing, a lump sensation and morning hoarseness. We assess this alongside other causes." },
        { q: "Will I need voice rest?", a: "Complete voice rest is rarely recommended. We usually suggest targeted voice care and reduced strain rather than silence." }
      ],
      plans: [
        { name: "Voice Consultation", price: "$115", note: "40 minutes · one visit", features: ["Throat and voice history", "Laryngoscopy if needed", "Written advice", "Therapy referral guidance"], featured: false },
        { name: "Voice Recovery Plan", price: "$280", note: "Consultation + review", features: ["Everything in Consultation", "6-week review", "Vocal hygiene programme", "Therapy coordination"], featured: true },
        { name: "Professional Voice Care", price: "$450", note: "3-month programme", features: ["Everything in Recovery Plan", "Performance load review", "Two therapy check-ins", "Priority access"], featured: false }
      ]
    },
    {
      id: "allergy-care",
      number: "04",
      category: "Allergy",
      title: "Allergy & Immunology",
      short: "Identify triggers and build a calm, workable plan for seasonal and year-round allergies.",
      icon: "allergy",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=2000&q=85",
      price: "From $120",
      duration: "45 minute consultation",
      tagline: "Know your triggers. Take back your season.",
      description: "Evidence-led allergy assessment for nasal, eye and airway symptoms that keep coming back.",
      intro: "Allergies can feel unpredictable, but the right assessment makes them manageable. We combine a careful symptom history with targeted testing and a realistic avoidance plan. The goal is not a life without exposure — it is a life where exposure no longer runs your week.",
      features: [
        "Seasonal and perennial rhinitis assessment",
        "Skin prick and specific IgE coordination",
        "Food and environmental trigger review",
        "Allergic eye symptom management",
        "Immunotherapy suitability discussion",
        "School and workplace allergy planning"
      ],
      included: [
        { icon: "search", title: "Trigger mapping", text: "A structured history of timing, places and exposures." },
        { icon: "scope", title: "Testing plan", text: "Targeted testing only where it will change your care." },
        { icon: "leaf", title: "Avoidance strategy", text: "Practical steps for home, work and travel." },
        { icon: "book", title: "Medicine plan", text: "A clear, stepwise plan with correct inhaler or spray technique." },
        { icon: "shield", title: "Safety advice", text: "Action plans for more significant reactions where relevant." },
        { icon: "calendar", title: "Season prep", text: "Start treatment before your known trigger season begins." }
      ],
      steps: [
        { title: "Understand the pattern", text: "When symptoms occur and what seems to bring them on." },
        { title: "Test with purpose", text: "Focused testing that answers a specific question." },
        { title: "Build the plan", text: "Treatment, avoidance and an agreed review point." },
        { title: "Prepare ahead", text: "Seasonal calendars and school or work documentation." }
      ],
      faqs: [
        { q: "Do I need allergy testing?", a: "Not always. Testing is most valuable when the trigger is unclear, symptoms are persistent, or immunotherapy is being considered." },
        { q: "Can allergies develop in adulthood?", a: "Yes. It is common for allergic rhinitis to appear or worsen in adulthood, even without a childhood history." },
        { q: "Are antihistamines enough?", a: "For mild symptoms they can be. Persistent nasal blockage usually needs a nasal steroid spray used correctly and consistently." },
        { q: "What is immunotherapy?", a: "It is a structured course of exposure designed to reduce sensitivity over time. It suits selected patients and requires commitment." },
        { q: "Can I get a school letter?", a: "Yes. We can provide practical documentation for schools or workplaces once your plan is agreed." }
      ],
      plans: [
        { name: "Allergy Consultation", price: "$120", note: "45 minutes · one visit", features: ["Detailed trigger history", "Examination", "Treatment plan", "Testing recommendations"], featured: false },
        { name: "Allergy Action Plan", price: "$290", note: "Consultation + review", features: ["Everything in Consultation", "Test result review", "6-week follow-up", "School or work letter"], featured: true },
        { name: "Seasonal Programme", price: "$460", note: "6-month support", features: ["Everything in Action Plan", "Pre-season planning", "Two reviews", "Immunotherapy assessment"], featured: false }
      ]
    },
    {
      id: "sleep-breathing",
      number: "05",
      category: "Sleep",
      title: "Sleep & Breathing",
      short: "Assessment for snoring, nasal obstruction and breathing patterns that interrupt rest.",
      icon: "sleep",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=2000&q=85",
      price: "From $130",
      duration: "50 minute consultation",
      tagline: "Rest that actually restores you.",
      description: "A joined-up look at the nose, throat and sleep habits behind snoring and daytime tiredness.",
      intro: "Poor sleep is rarely just about the pillow. Snoring, mouth breathing and repeated nightly interruptions can leave you tired even after eight hours in bed. Our sleep and breathing clinic assesses the upper airway carefully and works alongside sleep physicians when a sleep study is needed.",
      features: [
        "Snoring and mouth-breathing assessment",
        "Nasal obstruction and sleep quality review",
        "Sleep apnoea screening and referral",
        "Tonsil and soft palate examination",
        "CPAP tolerance support",
        "Lifestyle and positional therapy advice"
      ],
      included: [
        { icon: "sleep", title: "Sleep history", text: "A detailed review of sleep quality, snoring and daytime symptoms." },
        { icon: "scope", title: "Airway examination", text: "Assessment of the nose, palate and throat." },
        { icon: "wave", title: "Screening tools", text: "Validated questionnaires to guide onward referral." },
        { icon: "book", title: "Practical plan", text: "Positional, nasal and lifestyle strategies that make a difference." },
        { icon: "user", title: "Partner input", text: "We welcome a bed partner's observations — they often notice most." },
        { icon: "shield", title: "Coordinated care", text: "Referral to sleep medicine when a study is appropriate." }
      ],
      steps: [
        { title: "Review the night", text: "Sleep patterns, snoring, waking and daytime energy." },
        { title: "Examine the airway", text: "A focused nose, throat and palate assessment." },
        { title: "Screen and refer", text: "Evidence-based screening for sleep apnoea when indicated." },
        { title: "Treat and track", text: "A practical plan with measurable review points." }
      ],
      faqs: [
        { q: "Do I need a sleep study?", a: "If we suspect obstructive sleep apnoea, we will discuss a sleep study. Not everyone who snores needs one." },
        { q: "Can snoring be treated without surgery?", a: "Often, yes. Nasal treatment, weight management, positional therapy and dental devices can all help selected patients." },
        { q: "Is snoring always harmless?", a: "No. Simple snoring is common, but snoring with witnessed pauses, gasping or severe daytime sleepiness needs assessment." },
        { q: "Does nasal blockage affect sleep?", a: "Yes. A blocked nose increases mouth breathing and can worsen snoring. Treating it is often a useful first step." },
        { q: "Can children have sleep breathing problems?", a: "Yes. Enlarged tonsils and adenoids are common causes. We assess children in our paediatric clinic." }
      ],
      plans: [
        { name: "Sleep Consultation", price: "$130", note: "50 minutes · one visit", features: ["Full sleep history", "Upper airway examination", "Screening questionnaire", "Written advice"], featured: false },
        { name: "Sleep Care Plan", price: "$320", note: "Consultation + review", features: ["Everything in Consultation", "Sleep study coordination", "6-week review", "CPAP support guidance"], featured: true },
        { name: "Airway Programme", price: "$510", note: "3-month support", features: ["Everything in Care Plan", "Two reviews", "Dental device liaison", "Surgical opinion if needed"], featured: false }
      ]
    },
    {
      id: "pediatric-ent",
      number: "06",
      category: "Paediatric",
      title: "Paediatric ENT",
      short: "Gentle, unhurried care for little ears, noses and throats — and the parents who worry.",
      icon: "child",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1400&q=85",
      heroImage: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=2000&q=85",
      price: "From $100",
      duration: "40 minute consultation",
      tagline: "Big care for small patients.",
      description: "A calm, child-led approach to recurring ear infections, tonsils, glue ear and breathing concerns.",
      intro: "Children rarely describe ENT symptoms the way adults do. They tug at ears, breathe through their mouths, or seem tired and irritable. We take the time to hear the whole story from both child and parent, examine gently, and explain the options without pressure. Where watchful waiting is safe, we will say so clearly.",
      features: [
        "Recurrent ear infections and glue ear",
        "Tonsil and adenoid assessment",
        "Childhood hearing and speech concerns",
        "Mouth breathing and snoring",
        "Nosebleeds and nasal obstruction",
        "Second opinions on grommets or surgery"
      ],
      included: [
        { icon: "child", title: "Child-led consultation", text: "A relaxed pace, with play and reassurance where needed." },
        { icon: "ear", title: "Gentle ear checks", text: "Otoscopy and tympanometry sized for children." },
        { icon: "book", title: "Parent summary", text: "A clear written plan you can revisit at home." },
        { icon: "scope", title: "Surgical discussion", text: "Honest advice on grommets, tonsils and when to wait." },
        { icon: "user", title: "School liaison", text: "Letters and guidance for school or nursery when needed." },
        { icon: "shield", title: "Warm follow-up", text: "Review appointments that fit around family life." }
      ],
      steps: [
        { title: "Settle in", text: "A calm start so your child feels safe and you can talk freely." },
        { title: "Examine gently", text: "Child-sized equipment and a pause whenever it is needed." },
        { title: "Explain simply", text: "What we found, what usually happens next and what to watch for." },
        { title: "Agree the plan", text: "Watchful waiting, medical treatment or referral — clearly documented." }
      ],
      faqs: [
        { q: "At what age should my child have a hearing test?", a: "Newborn screening catches many issues, but concerns at any age deserve assessment. We see children from early childhood upward." },
        { q: "Are grommets always needed for glue ear?", a: "No. Many children improve with time. Grommets are considered when hearing is affected or symptoms persist." },
        { q: "How many ear infections are too many?", a: "There is no single number. We consider frequency, severity, hearing impact and response to treatment." },
        { q: "Can my child be seen without a referral?", a: "Yes, private paediatric appointments are available directly. We are happy to coordinate with your GP." },
        { q: "What should we bring?", a: "Any previous clinic letters, hearing results and a list of medicines. A favourite toy is always welcome." }
      ],
      plans: [
        { name: "Child ENT Consultation", price: "$100", note: "40 minutes · one visit", features: ["Parent and child history", "Gentle examination", "Written parent plan", "School guidance"], featured: false },
        { name: "Child Care Package", price: "$250", note: "Consultation + review", features: ["Everything in Consultation", "6-week review", "Hearing test coordination", "Priority contact"], featured: true },
        { name: "Surgical Pathway", price: "$390", note: "Assessment + planning", features: ["Everything in Care Package", "Second opinion", "Pre-op planning", "Post-op review"], featured: false }
      ]
    }
  ];

  var posts = [
    {
      id: "sinus-relief-guide",
      title: "A calmer approach to sinus relief",
      category: "Sinus Health",
      date: "2026-11-12",
      dateLabel: "12 Nov 2026",
      author: "Dr. Elena Marsh",
      role: "Consultant Rhinologist",
      read: "6 min read",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1400&q=85",
      excerpt: "Steam, sprays and supplements all promise quick relief. Here is what actually helps when sinus symptoms settle in for weeks.",
      tags: ["sinusitis", "nasal care", "breathing"],
      content: [
        { type: "p", text: "Sinus symptoms are stubborn for a simple reason: the sinus openings are narrow, and inflammation makes them narrower still. When mucus cannot drain, pressure builds and the cycle continues. The goal of good sinus care is not to dry everything out — it is to reduce inflammation and help the natural drainage pathways work again." },
        { type: "h2", text: "Start with the basics that work" },
        { type: "p", text: "Saline rinses remain one of the most reliable home measures. Use sterile or boiled-and-cooled water, the correct salt concentration, and a bottle or pot that you clean properly. A rinse removes irritants and thins mucus, giving the sinus lining a chance to settle." },
        { type: "ul", items: ["Use a saline rinse once or twice daily during a flare.", "Keep the room humid but not damp; dry air irritates the nose.", "Stay hydrated — thick mucus is harder to clear.", "Avoid smoke and strong fragrances while symptoms are active."] },
        { type: "quote", text: "If symptoms have lasted more than ten weeks, or keep returning, it is worth looking for the underlying cause rather than adding another over-the-counter product." },
        { type: "h2", text: "Where nasal sprays fit" },
        { type: "p", text: "Nasal steroid sprays are effective for persistent inflammation, but technique matters. Aim the nozzle toward the outer wall of the nose, not the septum, and breathe in gently. Decongestant sprays should be used for only a few days; longer use causes rebound congestion that feels worse than the original problem." },
        { type: "h2", text: "When to seek a specialist opinion" },
        { type: "p", text: "Book an assessment if you have facial pain or pressure lasting more than ten days, repeated courses of antibiotics, loss of smell, or symptoms that interfere with sleep and work. A nasal endoscopy can identify polyps, structural narrowing or infection that simple treatment will not resolve." },
        { type: "h3", text: "A note on surgery" },
        { type: "p", text: "Surgery is not a first-line treatment for most sinusitis. It is considered when good medical care has not worked, or when there is a structural problem that keeps blocking drainage. A careful conversation about likely benefit, recovery and alternatives should always come first." }
      ]
    },
    {
      id: "hearing-check-signs",
      title: "Five signs it is time for a hearing check",
      category: "Hearing Health",
      date: "2026-11-06",
      dateLabel: "06 Nov 2026",
      author: "Dr. Noah Bennett",
      role: "Consultant Audiologist",
      read: "5 min read",
      image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=1400&q=85",
      excerpt: "Hearing loss usually arrives slowly. These everyday signals are easy to dismiss and worth taking seriously.",
      tags: ["hearing", "hearing test", "audiology"],
      content: [
        { type: "p", text: "Most hearing loss develops gradually, which is precisely why it is easy to miss. The brain adapts, conversations get shorter, and background noise becomes something to avoid. Recognising the pattern early gives you more options." },
        { type: "h2", text: "1. You ask people to repeat themselves" },
        { type: "p", text: "Occasional repetition is normal. Needing it in most conversations, especially with soft voices or when there is background noise, is a useful signal. So is the feeling that people are mumbling." },
        { type: "h2", text: "2. The television volume keeps rising" },
        { type: "p", text: "If family members complain about the volume, or you need subtitles for programmes you used to follow easily, your hearing may have shifted. A simple audiogram gives a clear answer." },
        { type: "h2", text: "3. Busy places feel exhausting" },
        { type: "p", text: "Hearing in noise is one of the first things to suffer. Restaurants, family gatherings and open-plan offices demand rapid processing, and that effort is tiring when hearing is reduced." },
        { type: "h2", text: "4. You hear ringing or buzzing" },
        { type: "p", text: "Tinnitus is common and not always a sign of serious disease, but it should be assessed — especially when it is one-sided, pulsatile, or accompanied by hearing change." },
        { type: "quote", text: "A hearing test is quick, painless and gives you information you can act on. Waiting rarely makes the decision easier." },
        { type: "h2", text: "5. You avoid social situations" },
        { type: "p", text: "Withdrawal is a quiet symptom. If you are declining dinners or meetings because listening feels hard, that is a health signal, not a personality change." },
        { type: "h3", text: "What happens next" },
        { type: "p", text: "A private assessment includes a conversation, ear examination, hearing tests and a clear explanation of the results. If hearing aids are an option, you will hear about realistic benefits as well as limitations — no pressure, no obligation." }
      ]
    },
    {
      id: "sleep-and-snoring",
      title: "Snoring, sleep and your health",
      category: "Sleep Health",
      date: "2026-10-29",
      dateLabel: "29 Oct 2026",
      author: "Dr. Priya Raman",
      role: "ENT & Sleep Physician",
      read: "7 min read",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1400&q=85",
      excerpt: "Not all snoring is harmless, and not all tiredness is just a busy week. Here is how to tell the difference.",
      tags: ["sleep", "snoring", "airway"],
      content: [
        { type: "p", text: "Snoring is the sound of turbulent airflow through a narrowed upper airway. It can be simple and harmless, or it can sit on a spectrum that includes obstructive sleep apnoea — a condition where breathing repeatedly pauses during sleep." },
        { type: "h2", text: "When snoring deserves a closer look" },
        { type: "ul", items: ["Witnessed pauses in breathing or gasping", "Severe daytime sleepiness despite enough time in bed", "Morning headaches or a dry mouth", "High blood pressure that is difficult to control", "Frequent waking or unrefreshing sleep"] },
        { type: "p", text: "These features do not diagnose apnoea on their own, but they are a reason to assess the airway and consider a sleep study." },
        { type: "h2", text: "The nose matters" },
        { type: "p", text: "A blocked nose increases mouth breathing and can make snoring worse. Treating nasal inflammation, allergies or a structural blockage is often part of the plan. It is rarely the whole answer, but it can make other treatments more effective." },
        { type: "quote", text: "The best treatment for snoring depends on why it is happening. A one-size-fits-all device or spray is unlikely to be the answer." },
        { type: "h2", text: "Options that can help" },
        { type: "p", text: "Positional therapy, weight management, nasal treatment and dental devices all have a role for selected people. CPAP remains the most effective treatment for moderate to severe sleep apnoea. Surgery is reserved for specific anatomical problems after careful assessment." },
        { type: "h3", text: "What a consultation includes" },
        { type: "p", text: "We review sleep history, examine the nose and throat, use validated screening questionnaires, and coordinate a sleep study when indicated. The aim is a plan that fits your health, your bed partner and your life." }
      ]
    },
    {
      id: "allergy-season",
      title: "Navigating allergy season without dread",
      category: "Allergies",
      date: "2026-10-21",
      dateLabel: "21 Oct 2026",
      author: "Dr. Sofia Alvarez",
      role: "Allergy Specialist",
      read: "6 min read",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1400&q=85",
      excerpt: "A practical, evidence-led routine for itchy eyes, blocked noses and the weeks you used to lose to hay fever.",
      tags: ["allergies", "hay fever", "rhinitis"],
      content: [
        { type: "p", text: "Allergy season is predictable, which is good news: it means you can prepare before symptoms take over. The people who cope best are rarely using more medicine. They are starting earlier and using the right treatment consistently." },
        { type: "h2", text: "Begin before the season" },
        { type: "p", text: "Nasal steroid sprays work best when started one to two weeks before your usual trigger period. If you wait until symptoms are severe, the spray has more inflammation to overcome." },
        { type: "h2", text: "Treat the nose and eyes together" },
        { type: "p", text: "A blocked nose often drives eye symptoms through congestion and drainage. A consistent nasal spray, plus antihistamine eye drops when needed, frequently works better than tablets alone." },
        { type: "ul", items: ["Shower and change clothes after high-pollen outdoor time.", "Keep windows closed on windy, high-count days.", "Dry laundry indoors during peak season.", "Use a saline rinse to clear pollen from the nose."] },
        { type: "quote", text: "The aim is not a life without pollen. It is a life where pollen no longer decides whether you can work, sleep or enjoy being outside." },
        { type: "h2", text: "When testing is worthwhile" },
        { type: "p", text: "Testing helps when the trigger is unclear, symptoms persist year-round, or immunotherapy is being considered. It should answer a question that changes your plan — not simply provide a list of positives." },
        { type: "h3", text: "A word on immunotherapy" },
        { type: "p", text: "For the right patient, allergen immunotherapy can reduce sensitivity over time. It requires commitment, and not everyone is eligible. We discuss the realistic benefits and the time involved before starting." }
      ]
    },
    {
      id: "voice-care",
      title: "Protecting your voice when you talk for a living",
      category: "Voice & Throat",
      date: "2026-10-14",
      dateLabel: "14 Oct 2026",
      author: "Dr. Elena Marsh",
      role: "Consultant Laryngologist",
      read: "5 min read",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=85",
      excerpt: "Teachers, trainers and performers share one occupational risk: voice strain. Small routines make a real difference.",
      tags: ["voice", "throat", "vocal health"],
      content: [
        { type: "p", text: "Your voice is a muscular instrument that deserves warm-up, recovery and sensible load management. When it becomes hoarse or tired by Friday, that is usually a sign of strain rather than a need to simply push through." },
        { type: "h2", text: "Warm up before heavy voice use" },
        { type: "p", text: "A few minutes of gentle humming, lip trills and light glides can prepare the vocal folds. The same principle applies to a gym session: cold muscles under sudden load are more likely to complain." },
        { type: "h2", text: "Hydration is not a myth" },
        { type: "p", text: "Vocal folds vibrate hundreds of times per second. Adequate hydration supports the mucosal layer that keeps that movement efficient. Water throughout the day is more useful than a large drink just before speaking." },
        { type: "quote", text: "If your voice has changed for more than three weeks, especially with pain or difficulty swallowing, book an assessment rather than waiting for it to pass." },
        { type: "h2", text: "Manage the room, not just the voice" },
        { type: "p", text: "Background noise drives people to speak louder than they realise. A microphone, a quieter room or a seating arrangement can reduce vocal load more effectively than willpower. For teachers, amplification can be transformative." },
        { type: "h3", text: "Recovery matters" },
        { type: "p", text: "Alternate demanding voice days with lighter ones where possible. Avoid whispering as a substitute for rest — it can increase strain. If symptoms persist, a laryngoscopy and voice therapy assessment can identify what is happening." }
      ]
    },
    {
      id: "child-ear-infections",
      title: "Ear infections in children: when to wait, when to act",
      category: "Paediatric ENT",
      date: "2026-10-02",
      dateLabel: "02 Oct 2026",
      author: "Dr. Noah Bennett",
      role: "Paediatric ENT Consultant",
      read: "6 min read",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1400&q=85",
      excerpt: "A calm guide for parents navigating recurring ear infections, glue ear and the grommet conversation.",
      tags: ["children", "ear infection", "glue ear"],
      content: [
        { type: "p", text: "Ear infections are common in early childhood, and most improve without antibiotics. The harder question for parents is what to do when they keep coming back, or when hearing seems affected between episodes." },
        { type: "h2", text: "What is happening in the ear" },
        { type: "p", text: "The Eustachian tube connects the middle ear to the back of the nose. In young children it is shorter and more horizontal, making it easier for fluid to collect after a cold. That fluid can become infected, or simply sit there and reduce hearing — the latter is often called glue ear." },
        { type: "h2", text: "Reassurance for most episodes" },
        { type: "p", text: "Many acute infections settle within a few days with pain relief and time. Antibiotics are sometimes needed, especially in very young children or more severe illness. Persistent fluid is different from acute infection and should not be treated with repeated antibiotic courses alone." },
        { type: "quote", text: "The decision about grommets is not about how many infections a child has had. It is about hearing, speech, comfort and the impact on daily life." },
        { type: "h2", text: "Signs that deserve a specialist opinion" },
        { type: "ul", items: ["Hearing concerns or delayed speech", "Frequent infections over several months", "Persistent fluid on examination", "Mouth breathing, snoring or sleep disruption", "Behaviour or attention changes at home or school"] },
        { type: "h2", text: "The grommet conversation" },
        { type: "p", text: "Grommets are small tubes that ventilate the middle ear. They can improve hearing in selected children with persistent glue ear, but they are not right for every case. We discuss the evidence, the anaesthetic, the aftercare and the alternatives before any decision." },
        { type: "h3", text: "What parents can bring" },
        { type: "p", text: "A short diary of episodes, any hearing test results and observations from nursery or school are genuinely useful. So is your child's favourite toy. A calm child is easier to examine and a calmer parent hears the plan more clearly." }
      ]
    }
  ];

  function getService(id) {
    if (!id) return null;
    return services.filter(function (item) {
      return item.id === id;
    })[0] || null;
  }

  function getPost(id) {
    if (!id) return null;
    return posts.filter(function (item) {
      return item.id === id;
    })[0] || null;
  }

  function formatDate(value) {
    var date = new Date(value);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
  }

  return {
    icon: icon,
    services: services,
    posts: posts,
    getService: getService,
    getPost: getPost,
    formatDate: formatDate
  };
})();
