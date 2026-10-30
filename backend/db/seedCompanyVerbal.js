// Company-Specific Verbal Ability Question Bank Generator
// Analyzed placement patterns:
// - Companies with dedicated Verbal rounds: TCS (NQT Verbal), Infosys, Wipro (NLTH English), Accenture (Cognitive English), Cognizant (GenC Verbal), Capgemini, Deloitte (Business English).
// - Companies without Verbal rounds: Amazon, Microsoft, Google (Technical OA focuses exclusively on coding & algorithmic problem solving).

function generateVerbalForCompany(companySlug) {
  const compUpper = companySlug.toUpperCase();

  const questionsByCompany = {
    tcs: [
      {
        q: "[TCS NQT Verbal] Spot the error in the sentence:\nNeither the project manager nor the software developers (A) / was willing to take responsibility (B) / for the deployment failure on Friday. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Easy",
        exp: "According to the rule of proximity for 'neither...nor', the verb agrees with the nearer subject ('software developers', plural). Therefore, it should be 'were willing' instead of 'was willing'. Error is in (B)."
      },
      {
        q: "[TCS NQT Verbal] Fill in the blank with the most appropriate preposition:\nThe newly hired engineer was completely unaccustomed ______ the fast-paced agile development lifecycle.",
        opts: ["with", "for", "to", "by"],
        ans: 2,
        diff: "Easy",
        exp: "The adjective 'unaccustomed' is conventionally followed by the preposition 'to' (unaccustomed to something)."
      },
      {
        q: "[TCS NQT Verbal] Select the correct passive voice transformation:\n'The security analyst audited twenty microservices before the release.'",
        opts: [
          "Twenty microservices were audited by the security analyst before the release.",
          "Twenty microservices had been audited by the security analyst before the release.",
          "Twenty microservices were being audited by the security analyst before the release.",
          "Twenty microservices are audited by the security analyst before the release."
        ],
        ans: 0,
        diff: "Easy",
        exp: "Simple past passive takes 'was/were + past participle'. For plural 'twenty microservices', the correct form is 'were audited'."
      },
      {
        q: "[TCS NQT Verbal] Sentence Rearrangement:\nP: to build scalable distributed systems\nQ: modern software architectures\nR: cloud-native technologies\nS: increasingly leverage",
        opts: ["Q S R P", "R P Q S", "Q P S R", "S R Q P"],
        ans: 0,
        diff: "Medium",
        exp: "The logical order is: 'Modern software architectures (Q) increasingly leverage (S) cloud-native technologies (R) to build scalable distributed systems (P)' -> Q S R P."
      },
      {
        q: "[TCS NQT Verbal] Identify the meaning of the idiom: 'To cut corners'",
        opts: ["To take a shortcut around a physical building", "To do something quickly or cheaply at the expense of quality", "To delete unnecessary lines of source code", "To negotiate a lower project estimate"],
        ans: 1,
        diff: "Easy",
        exp: "'Cutting corners' is a common workplace idiom meaning doing something in the easiest, quickest, or cheapest way while compromising quality or standards."
      },
      {
        q: "[TCS NQT Verbal] Choose the word that best expresses the synonym of: METICULOUS",
        opts: ["Careless", "Thorough", "Hasty", "Arbitrary"],
        ans: 1,
        diff: "Medium",
        exp: "Meticulous means showing great attention to detail; very careful and precise. Synonym: Thorough."
      },
      {
        q: "[TCS NQT Verbal] Spot the error in the sentence:\nScarcely had the tech lead finished explaining the architecture (A) / than the power supply in the office (B) / abruptly failed. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Medium",
        exp: "Correlative conjunctions: 'Scarcely' and 'Hardly' must pair with 'when' (not 'than'). 'No sooner' pairs with 'than'. Error is in (B)."
      },
      {
        q: "[TCS NQT Verbal] Select the correct antonym of: CANDID",
        opts: ["Frank", "Guarded", "Honest", "Direct"],
        ans: 1,
        diff: "Easy",
        exp: "Candid means straightforward, open, and sincere. The antonym is Guarded (cautious, secretive, or reserved)."
      },
      {
        q: "[TCS NQT Verbal] Fill in the blank with appropriate tense:\nBy the time the client reviews the demonstration tomorrow, our engineers ______ all edge cases.",
        opts: ["will resolve", "will have resolved", "resolved", "have resolved"],
        ans: 1,
        diff: "Medium",
        exp: "Future perfect tense ('will have + past participle') describes an action completed prior to a designated future milestone."
      },
      {
        q: "[TCS NQT Verbal] Choose the correctly spelled technical word:",
        opts: ["Hierarchical", "Heirarchical", "Hierarcial", "Hierachical"],
        ans: 0,
        diff: "Easy",
        exp: "The correct spelling is 'Hierarchical' (derived from hierarchy: h-i-e-r-a-r-c-h-y)."
      },
      {
        q: "[TCS NQT Verbal] One-word substitution:\n'An official statement or declaration of the intentions, motives, or views of an issuer or organization'",
        opts: ["Manifesto", "Affidavit", "Protocol", "Directive"],
        ans: 0,
        diff: "Medium",
        exp: "A public declaration of policy, goals, and aims is called a 'Manifesto'."
      },
      {
        q: "[TCS NQT Verbal] Reading Comprehension Inference:\n'Automation does not simply eliminate headcount; it shifts engineering demands toward cognitive problem-solving, architectural design, and resilience testing.'\nWhat does the passage imply?",
        opts: [
          "Automation renders software developers completely obsolete.",
          "Engineering roles transform toward higher-level strategic and architectural skills.",
          "Manual testing remains the highest priority for technology enterprises.",
          "Resilience testing cannot be executed with automation tools."
        ],
        ans: 1,
        diff: "Medium",
        exp: "The sentence explicitly highlights that automation shifts demands toward higher-order cognitive, design, and resilience responsibilities."
      },
      {
        q: "[TCS NQT Verbal] Choose the correct idiom meaning:\n'To burn bridges'",
        opts: ["To delete git repositories permanently", "To destroy relationships or options making retreat impossible", "To change programming languages mid-project", "To work extra hours during the weekend"],
        ans: 1,
        diff: "Easy",
        exp: "'Burning bridges' means destroying one's path of return or alienating former colleagues/employers irreversibly."
      },
      {
        q: "[TCS NQT Verbal] Identify the correct modal verb:\nSecurity compliance regulations dictate that all customer credentials ______ be hashed using salt algorithms.",
        opts: ["might", "shall", "must", "could"],
        ans: 2,
        diff: "Easy",
        exp: "'Must' conveys a mandatory obligation or statutory compliance requirement."
      },
      {
        q: "[TCS NQT Verbal] Spot the error:\nEach of the junior developers (A) / have been assigned a senior mentor (B) / for the duration of the probation period. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Medium",
        exp: "'Each' is an indefinite pronoun that takes a singular verb. The correct verb is 'has been assigned' instead of 'have been assigned'. Error is in (B)."
      },
      {
        q: "[TCS NQT Verbal] Synonym of: UBIQUITOUS",
        opts: ["Omnipresent", "Scarce", "Transient", "Localized"],
        ans: 0,
        diff: "Medium",
        exp: "Ubiquitous means present, appearing, or found everywhere. Synonym: Omnipresent."
      },
      {
        q: "[TCS NQT Verbal] Antonym of: STRINGENT",
        opts: ["Rigid", "Lenient", "Severe", "Binding"],
        ans: 1,
        diff: "Easy",
        exp: "Stringent means strict, precise, and exacting. Antonym is Lenient (permissive or tolerant)."
      },
      {
        q: "[TCS NQT Verbal] Sentence Improvement:\n'If he *would have worked* harder, he would have cleared the technical interview.'",
        opts: ["had worked", "has worked", "worked", "No improvement needed"],
        ans: 0,
        diff: "Hard",
        exp: "Third conditional structure: 'If + past perfect (had worked)... would have + past participle'. Using 'would have' in the if-clause is a common grammatical error."
      },
      {
        q: "[TCS NQT Verbal] Choose the sentence with parallel structure:",
        opts: [
          "The engineer enjoys coding algorithms, designing databases, and to test APIs.",
          "The engineer enjoys coding algorithms, designing databases, and testing APIs.",
          "The engineer enjoys to code algorithms, database design, and testing APIs.",
          "The engineer enjoys coding algorithms, to design databases, and test APIs."
        ],
        ans: 1,
        diff: "Medium",
        exp: "Parallelism requires consistent grammatical forms in a series: gerunds 'coding', 'designing', and 'testing' are parallel."
      },
      {
        q: "[TCS NQT Verbal] Fill in the blank:\nThe product manager's presentation was so ______ that even non-technical stakeholders grasped the complex system flow easily.",
        opts: ["lucid", "convoluted", "abstruse", "pedantic"],
        ans: 0,
        diff: "Medium",
        exp: "'Lucid' means expressed clearly and easy to understand."
      }
    ],

    infosys: [
      {
        q: "[Infosys Verbal] Sentence Correction:\nBeing an experienced architect, (A) / the database migration was planned (B) / with zero downtime by Rohit. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Hard",
        exp: "Dangling modifier: 'Being an experienced architect' grammatically modifies the subject that follows ('the database migration'), which makes no sense. It should be: 'Being an experienced architect, Rohit planned the database migration...'. Error is in (B)."
      },
      {
        q: "[Infosys Verbal] Choose the correct option for Subject-Verb Agreement:\nThe committee ______ divided in their opinions regarding the microservices adoption strategy.",
        opts: ["was", "were", "is", "has been"],
        ans: 1,
        diff: "Medium",
        exp: "When a collective noun ('committee') acts as individual members with differing viewpoints (indicated by 'their opinions'), it takes a plural verb: 'were divided'."
      },
      {
        q: "[Infosys Verbal] Critical Reasoning:\nStatement: 'Companies that adopt automated testing release software 40% faster than those relying solely on manual testing.'\nWhich assumption is implicit?",
        opts: [
          "Manual testing is completely useless in modern development.",
          "Testing efficiency has a direct impact on overall software release velocity.",
          "All automated tests pass on the first attempt.",
          "Manual testers can be replaced entirely within one month."
        ],
        ans: 1,
        diff: "Medium",
        exp: "The claim directly links automated testing speed to overall release time, which logically assumes testing efficiency directly influences release velocity."
      },
      {
        q: "[Infosys Verbal] Find the synonym of: INGENUOUS",
        opts: ["Artful", "Candid / Innocent", "Crafty", "Deceitful"],
        ans: 1,
        diff: "Hard",
        exp: "'Ingenuous' means innocent, sincere, and candid. (Do not confuse with 'ingenious', which means clever)."
      },
      {
        q: "[Infosys Verbal] Find the antonym of: MITIGATE",
        opts: ["Alleviate", "Exacerbate", "Assuage", "Diminish"],
        ans: 1,
        diff: "Medium",
        exp: "Mitigate means to make less severe or serious. Exacerbate means to make a problem or bad situation worse."
      },
      {
        q: "[Infosys Verbal] Select the correct idiom meaning:\n'To take with a grain of salt'",
        opts: ["To eat seasoned food", "To accept something with skepticism or reservation", "To accept advice unconditionally", "To criticize someone harshly"],
        ans: 1,
        diff: "Easy",
        exp: "'Take with a grain of salt' means to maintain skepticism regarding the truth or accuracy of a statement."
      },
      {
        q: "[Infosys Verbal] Spot the error in the sentence:\nNo sooner did the incident commander (A) / join the bridge when (B) / the root cause was identified. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Medium",
        exp: "'No sooner... than' is the mandatory correlative pair. Using 'when' with 'no sooner' is grammatically incorrect. Error is in (B)."
      },
      {
        q: "[Infosys Verbal] Fill in the blank:\nThe research team was commended for their ______ investigation into the memory leak.",
        opts: ["exhaustive", "exhausting", "negligent", "perfunctory"],
        ans: 0,
        diff: "Medium",
        exp: "'Exhaustive' means thorough, comprehensive, and complete."
      },
      {
        q: "[Infosys Verbal] Choose the correctly spelled word:",
        opts: ["Surreptitious", "Sureptitious", "Surrepticious", "Surreptitous"],
        ans: 0,
        diff: "Hard",
        exp: "The correct spelling is 'Surreptitious' (meaning kept secret, especially because it would not be approved of)."
      },
      {
        q: "[Infosys Verbal] One-word substitution:\n'Fear of confined or enclosed spaces'",
        opts: ["Agoraphobia", "Claustrophobia", "Acrophobia", "Hydrophobia"],
        ans: 1,
        diff: "Easy",
        exp: "Claustrophobia is the extreme or irrational fear of confined places."
      },
      {
        q: "[Infosys Verbal] Sentence Improvement:\n'He has been studying in this university *since three years*.'",
        opts: ["for three years", "from three years", "in three years", "No improvement needed"],
        ans: 0,
        diff: "Easy",
        exp: "'For' is used to denote a duration of time ('for three years'), whereas 'since' denotes a specific starting point in the past ('since 2021')."
      },
      {
        q: "[Infosys Verbal] Fill in the blank with appropriate preposition:\nThe legacy system was phased out ______ favor of the new cloud CRM platform.",
        opts: ["in", "on", "with", "at"],
        ans: 0,
        diff: "Easy",
        exp: "The idiomatic phrase is 'in favor of'."
      },
      {
        q: "[Infosys Verbal] Select the correct Indirect Speech:\nThe mentor said, 'Hard work always yields positive outcomes.'",
        opts: [
          "The mentor said that hard work always yielded positive outcomes.",
          "The mentor said that hard work always yields positive outcomes.",
          "The mentor told that hard work had yielded positive outcomes.",
          "The mentor asked whether hard work yields positive outcomes."
        ],
        ans: 1,
        diff: "Medium",
        exp: "When direct speech expresses a universal truth, habitual action, or permanent fact, the tense of the reported speech does not change to past tense."
      },
      {
        q: "[Infosys Verbal] Synonym of: PROLIFIC",
        opts: ["Barren", "Unproductive", "Highly productive", "Sparse"],
        ans: 2,
        diff: "Medium",
        exp: "'Prolific' means producing much fruit or foliage or many works; highly productive."
      },
      {
        q: "[Infosys Verbal] Antonym of: ALTRUISTIC",
        opts: ["Benevolent", "Selfish", "Magnanimous", "Charitable"],
        ans: 1,
        diff: "Easy",
        exp: "Altruistic means showing disinterested and selfless concern for the well-being of others. Antonym: Selfish."
      },
      {
        q: "[Infosys Verbal] Para Jumbles:\nP: which accelerates product delivery cycles\nQ: DevOps fosters cross-functional collaboration\nR: by removing organizational silos\nS: between software developers and IT operations",
        opts: ["Q R S P", "Q S R P", "R S P Q", "P Q R S"],
        ans: 1,
        diff: "Medium",
        exp: "Logical sequence: 'DevOps fosters cross-functional collaboration (Q) between software developers and IT operations (S) by removing organizational silos (R) which accelerates product delivery cycles (P)' -> Q S R P."
      },
      {
        q: "[Infosys Verbal] Spot the error:\nSupposing if the server crashes (A) / during peak traffic, (B) / do we have a fallback cluster ready? (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 0,
        diff: "Medium",
        exp: "'Supposing' and 'if' have redundant conditional meanings. Use either 'Supposing the server crashes' or 'If the server crashes', never both together. Error is in (A)."
      },
      {
        q: "[Infosys Verbal] Fill in the blank:\nHis explanation was both succinct and ______; everyone understood the core premise immediately.",
        opts: ["pellucid", "obscure", "verbose", "pedantic"],
        ans: 0,
        diff: "Hard",
        exp: "'Pellucid' means translucently clear, easily understood, and lucid."
      },
      {
        q: "[Infosys Verbal] Idiom meaning: 'Barking up the wrong tree'",
        opts: ["Making a noise in a forest", "Pursuing a mistaken line of thought or course of action", "Training an animal poorly", "Blaming nature for human errors"],
        ans: 1,
        diff: "Easy",
        exp: "'Barking up the wrong tree' means pursuing a mistaken inquiry or blaming the wrong cause."
      },
      {
        q: "[Infosys Verbal] Sentence Correction:\n'The staff was instructed to leave *their* workstations by 6 PM.'",
        opts: ["leave his workstation", "leave their workstations", "leave its workstations", "No improvement needed"],
        ans: 1,
        diff: "Medium",
        exp: "When individual actions of staff members are highlighted, using plural pronoun 'their workstations' is grammatically standard."
      }
    ],

    wipro: [
      {
        q: "[Wipro NLTH English] Spot the error:\nOne of my colleagues (A) / have received an invitation (B) / to speak at the national AI summit. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Easy",
        exp: "The subject 'One' of 'One of my colleagues' is singular and requires the singular verb 'has received' rather than 'have received'. Error is in (B)."
      },
      {
        q: "[Wipro NLTH English] Choose the correct active voice:\n'The bug was successfully patched by our senior developer within an hour.'",
        opts: [
          "Our senior developer successfully patched the bug within an hour.",
          "Our senior developer had successfully patched the bug within an hour.",
          "Our senior developer was patching the bug successfully within an hour.",
          "Our senior developer patches the bug successfully within an hour."
        ],
        ans: 0,
        diff: "Easy",
        exp: "Simple past passive ('was patched') translates directly to simple past active ('patched')."
      },
      {
        q: "[Wipro NLTH English] Fill in the blank:\nThe team members worked ______ concert to meet the rigorous sprint deadline.",
        opts: ["in", "at", "by", "for"],
        ans: 0,
        diff: "Easy",
        exp: "The idiomatic prepositional phrase is 'in concert', meaning acting together with a common purpose."
      },
      {
        q: "[Wipro NLTH English] Synonym of: ACUMEN",
        opts: ["Ignorance", "Sharpness / Insight", "Sluggishness", "Hesitation"],
        ans: 1,
        diff: "Medium",
        exp: "Acumen refers to the ability to make good judgments and take quick decisions, typically in a particular domain. Synonym: Insight / Sharpness."
      },
      {
        q: "[Wipro NLTH English] Antonym of: BENEVOLENT",
        opts: ["Compassionate", "Malevolent", "Generous", "Altruistic"],
        ans: 1,
        diff: "Easy",
        exp: "Benevolent means well-meaning and kindly. Malevolent means having or showing a wish to do evil to others."
      },
      {
        q: "[Wipro NLTH English] Spot the error:\nAlthough she worked very hard (A) / but she could not (B) / secure the top certification grade. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Medium",
        exp: "'Although' is a subordinating conjunction and should not be paired with coordinate conjunction 'but' in the same sentence. Use either a comma or omit 'but'. Error is in (B)."
      },
      {
        q: "[Wipro NLTH English] Meaning of the idiom: 'Bite the bullet'",
        opts: ["To eat ammunition", "To face a painful situation with courage and fortitude", "To refuse an assignment", "To surrender in battle"],
        ans: 1,
        diff: "Easy",
        exp: "'To bite the bullet' means to face a grim or inevitable reality with fortitude."
      },
      {
        q: "[Wipro NLTH English] Choose the correctly spelled word:",
        opts: ["Maintenance", "Maintainance", "Maintanance", "Maintenence"],
        ans: 0,
        diff: "Medium",
        exp: "The correct spelling is 'Maintenance' (m-a-i-n-t-e-n-a-n-c-e)."
      },
      {
        q: "[Wipro NLTH English] One-word substitution:\n'A speech delivered without any prior preparation'",
        opts: ["Extempore", "Monologue", "Soliloquy", "Oration"],
        ans: 0,
        diff: "Easy",
        exp: "An unscripted, impromptu speech is called an 'Extempore' or 'Impromptu'."
      },
      {
        q: "[Wipro NLTH English] Sentence Rearrangement:\nP: to optimize application performance\nQ: database indexing is vital\nR: on high-throughput servers\nS: by reducing query execution latency",
        opts: ["Q P S R", "Q S P R", "P Q R S", "S R Q P"],
        ans: 0,
        diff: "Medium",
        exp: "'Database indexing is vital (Q) to optimize application performance (P) by reducing query execution latency (S) on high-throughput servers (R)' -> Q P S R."
      },
      {
        q: "[Wipro NLTH English] Fill in the blank:\nThe CEO's speech was remarkable for its brevity and ______.",
        opts: ["clarity", "confusion", "obscurity", "tedium"],
        ans: 0,
        diff: "Easy",
        exp: "In positive context ('remarkable for its brevity and...'), 'clarity' fits both grammatically and contextually."
      },
      {
        q: "[Wipro NLTH English] Spot the error:\nThe furniture in the new campus (A) / are exceptionally modern (B) / and ergonomically designed. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Medium",
        exp: "'Furniture' is an uncountable noun and always takes a singular verb. It should be 'is exceptionally modern'. Error is in (B)."
      },
      {
        q: "[Wipro NLTH English] Identify the correct article:\nHe is ______ honorable member of the technical advisory council.",
        opts: ["a", "an", "the", "no article"],
        ans: 1,
        diff: "Easy",
        exp: "The word 'honorable' begins with a silent 'h' and vowel sound /ɒ/, requiring the indefinite article 'an'."
      },
      {
        q: "[Wipro NLTH English] Synonym of: ZEALOUS",
        opts: ["Apathetic", "Enthusiastic", "Reluctant", "Indifferent"],
        ans: 1,
        diff: "Easy",
        exp: "Zealous means having or showing zeal; passionate and enthusiastic."
      },
      {
        q: "[Wipro NLTH English] Antonym of: VAGUE",
        opts: ["Nebulous", "Ambiguous", "Precise", "Unclear"],
        ans: 2,
        diff: "Easy",
        exp: "Vague means uncertain or indefinite. Antonym is Precise."
      },
      {
        q: "[Wipro NLTH English] Fill in the blank with appropriate phrasal verb:\nWe need to ______ with a viable fallback strategy before deploying to production.",
        opts: ["come up", "come down", "come across", "come into"],
        ans: 0,
        diff: "Easy",
        exp: "'To come up with' means to produce or suggest an idea or plan."
      },
      {
        q: "[Wipro NLTH English] Spot the error:\nUnless you do not submit (A) / the KYC documentation on time, (B) / your account will be suspended. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 0,
        diff: "Medium",
        exp: "'Unless' already contains a negative meaning ('if not'). Using 'do not' with 'unless' creates a double negative. It should be 'Unless you submit'. Error is in (A)."
      },
      {
        q: "[Wipro NLTH English] Idiom meaning: 'Hit the nail on the head'",
        opts: ["To injure oneself with tools", "To state or identify something with absolute accuracy", "To complete a carpenter task", "To make a careless mistake"],
        ans: 1,
        diff: "Easy",
        exp: "'Hit the nail on the head' means to describe exactly what is causing a situation or state something accurately."
      },
      {
        q: "[Wipro NLTH English] Choose the correct tense:\nThey ______ in this technology incubator since January last year.",
        opts: ["are working", "have been working", "were working", "worked"],
        ans: 1,
        diff: "Easy",
        exp: "Present perfect continuous ('have been working') is required for an ongoing action starting in the past with 'since'."
      },
      {
        q: "[Wipro NLTH English] Select the correct antonym of: TRANSPARENT",
        opts: ["Lucid", "Opaque", "Clear", "Evident"],
        ans: 1,
        diff: "Easy",
        exp: "Transparent means permitting light to pass through / clear. Antonym is Opaque."
      }
    ],

    accenture: [
      {
        q: "[Accenture English Ability] Sentence Correction:\nNeither of the candidate's proposed solutions (A) / were acceptable (B) / to the enterprise client. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Easy",
        exp: "'Neither of' takes a singular verb ('was acceptable') because it refers to not one nor the other individually. Error is in (B)."
      },
      {
        q: "[Accenture English Ability] Fill in the blank:\nThe security audit revealed that the encryption keys had been ______ compromised.",
        opts: ["inadvertently", "inadvertent", "inadvertence", "inadvertency"],
        ans: 0,
        diff: "Medium",
        exp: "The verb 'compromised' requires an adverb to modify it. 'Inadvertently' (meaning unintentionally) is the correct adverbial form."
      },
      {
        q: "[Accenture English Ability] Sentence Rearrangement:\nP: across distributed enterprise environments\nQ: ensuring secure identity management\nR: is a critical requirement\nS: for cloud migration initiatives",
        opts: ["Q P R S", "Q R S P", "R S Q P", "P Q S R"],
        ans: 0,
        diff: "Medium",
        exp: "'Ensuring secure identity management (Q) across distributed enterprise environments (P) is a critical requirement (R) for cloud migration initiatives (S)' -> Q P R S."
      },
      {
        q: "[Accenture English Ability] Meaning of the idiom: 'A blessing in disguise'",
        opts: ["A religious benediction", "An apparent misfortune that eventually results in good fortune", "A deceptive sales pitch", "A hidden cost in software procurement"],
        ans: 1,
        diff: "Easy",
        exp: "'A blessing in disguise' refers to something that seems bad or unlucky at first, but produces good results later."
      },
      {
        q: "[Accenture English Ability] Synonym of: PRISTINE",
        opts: ["Tainted", "Immaculate / Unspoiled", "Dilapidated", "Corrupted"],
        ans: 1,
        diff: "Medium",
        exp: "Pristine means in its original condition; unspoiled or clean. Synonym: Immaculate."
      },
      {
        q: "[Accenture English Ability] Antonym of: TACITURN",
        opts: ["Silent", "Reserved", "Loquacious / Talkative", "Introverted"],
        ans: 2,
        diff: "Hard",
        exp: "Taciturn means saying very little; reserved in speech. Antonym is Loquacious (tending to talk a great deal)."
      },
      {
        q: "[Accenture English Ability] Spot the error:\nHe told to me (A) / that the deployment would proceed (B) / without any further delays. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 0,
        diff: "Easy",
        exp: "'Told' is a transitive verb and takes a direct object without preposition 'to'. It should be 'He told me' or 'He said to me'. Error is in (A)."
      },
      {
        q: "[Accenture English Ability] Fill in the blank:\nThe cloud architect was praised for her ______ approach to cost optimization.",
        opts: ["frugal", "wasteful", "negligent", "extravagant"],
        ans: 0,
        diff: "Medium",
        exp: "'Frugal' means economical and prudent with regard to money or resources."
      },
      {
        q: "[Accenture English Ability] Choose the correctly spelled word:",
        opts: ["Privilege", "Privelege", "Priviledge", "Privlege"],
        ans: 0,
        diff: "Medium",
        exp: "The correct spelling is 'Privilege' (p-r-i-v-i-l-e-g-e)."
      },
      {
        q: "[Accenture English Ability] One-word substitution:\n'A person who is indifferent to pleasure or pain'",
        opts: ["Stoic", "Hedonist", "Epicurean", "Cynic"],
        ans: 0,
        diff: "Easy",
        exp: "A Stoic is a person who can endure pain or hardship without showing feelings or complaining."
      },
      {
        q: "[Accenture English Ability] Spot the error:\nMany a student (A) / have failed to meet (B) / the rigorous cutoff criteria. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Medium",
        exp: "'Many a' is followed by a singular noun and a singular verb: 'Many a student has failed' (not 'have failed'). Error is in (B)."
      },
      {
        q: "[Accenture English Ability] Choose the correct passive form:\n'They are conducting a penetration test on the staging server.'",
        opts: [
          "A penetration test is being conducted on the staging server.",
          "A penetration test was conducted on the staging server.",
          "A penetration test has been conducted on the staging server.",
          "A penetration test is conducted on the staging server."
        ],
        ans: 0,
        diff: "Easy",
        exp: "Present continuous passive takes 'is/are being + past participle': 'is being conducted'."
      },
      {
        q: "[Accenture English Ability] Synonym of: ENIGMATIC",
        opts: ["Straightforward", "Mysterious", "Obvious", "Transparent"],
        ans: 1,
        diff: "Medium",
        exp: "Enigmatic means difficult to interpret or understand; mysterious."
      },
      {
        q: "[Accenture English Ability] Antonym of: METICULOUS",
        opts: ["Fastidious", "Precise", "Careless", "Methodical"],
        ans: 2,
        diff: "Easy",
        exp: "Meticulous means showing great attention to detail. Antonym: Careless."
      },
      {
        q: "[Accenture English Ability] Sentence Improvement:\n'The team leader insisted *on me doing* the unit testing.'",
        opts: ["on my doing", "at me doing", "in my doing", "No improvement needed"],
        ans: 0,
        diff: "Hard",
        exp: "A gerund ('doing') is modified by a possessive pronoun ('my'): 'insisted on my doing'."
      },
      {
        q: "[Accenture English Ability] Idiom meaning: 'The ball is in your court'",
        opts: ["You are playing tennis", "It is your responsibility to make the next decision or step", "You have lost an opportunity", "A sports match has concluded"],
        ans: 1,
        diff: "Easy",
        exp: "'The ball is in your court' means it is up to you to make the next move."
      },
      {
        q: "[Accenture English Ability] Fill in the blank with appropriate preposition:\nThe startup succeeded ______ spite of intense market competition.",
        opts: ["in", "on", "by", "with"],
        ans: 0,
        diff: "Easy",
        exp: "The idiomatic prepositional phrase is 'in spite of'."
      },
      {
        q: "[Accenture English Ability] Spot the error:\nHardly had the meeting started (A) / than the client raised (B) / major scope objections. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Medium",
        exp: "'Hardly' must pair with 'when', not 'than'. Error is in (B)."
      },
      {
        q: "[Accenture English Ability] Choose the correct indirect question:\n'She asked, \"Can you configure the firewall?\"'",
        opts: [
          "She asked if I could configure the firewall.",
          "She asked that can I configure the firewall.",
          "She asked could I configure the firewall.",
          "She asked whether can I configure the firewall."
        ],
        ans: 0,
        diff: "Easy",
        exp: "In yes/no indirect questions, 'if/whether' is used followed by statement word order and past modal 'could'."
      },
      {
        q: "[Accenture English Ability] Synonym of: RESILIENT",
        opts: ["Fragile", "Elastic / Adaptable", "Rigid", "Brittle"],
        ans: 1,
        diff: "Easy",
        exp: "Resilient means able to withstand or recover quickly from difficult conditions. Synonym: Adaptable."
      }
    ],

    cognizant: [
      {
        q: "[Cognizant Verbal] Spot the error in the sentence:\nThe quality assurance lead (A) / together with his colleagues (B) / are inspecting the build artifacts. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 2,
        diff: "Medium",
        exp: "When a subject is joined with other nouns using 'together with', 'as well as', or 'along with', the verb agrees with the primary subject ('lead', singular). It should be 'is inspecting'. Error is in (C)."
      },
      {
        q: "[Cognizant Verbal] Fill in the blank:\nThe consultant delivered a ______ critique of the legacy codebase, pointing out both strengths and vulnerabilities.",
        opts: ["balanced", "biased", "lopsided", "prejudiced"],
        ans: 0,
        diff: "Easy",
        exp: "Since the critique pointed out 'both strengths and vulnerabilities', the adjective 'balanced' is contextually appropriate."
      },
      {
        q: "[Cognizant Verbal] Sentence Rearrangement:\nP: to detect anomalies in real time\nQ: machine learning algorithms\nR: by analyzing streaming event logs\nS: empower site reliability engineers",
        opts: ["Q S R P", "Q S P R", "S R Q P", "P Q R S"],
        ans: 1,
        diff: "Medium",
        exp: "'Machine learning algorithms (Q) empower site reliability engineers (S) to detect anomalies in real time (P) by analyzing streaming event logs (R)' -> Q S P R."
      },
      {
        q: "[Cognizant Verbal] Identify the meaning of the idiom: 'See eye to eye'",
        opts: ["To look directly into someone's face", "To agree fully with someone", "To engage in a physical fight", "To monitor someone closely"],
        ans: 1,
        diff: "Easy",
        exp: "'To see eye to eye' means to be in complete agreement."
      },
      {
        q: "[Cognizant Verbal] Synonym of: COGNIZANT",
        opts: ["Unaware", "Conscious / Mindful", "Oblivious", "Ignorant"],
        ans: 1,
        diff: "Easy",
        exp: "Cognizant means having knowledge or being aware of something. Synonym: Mindful / Aware."
      },
      {
        q: "[Cognizant Verbal] Antonym of: DISPARATE",
        opts: ["Different", "Similar / Homogeneous", "Divergent", "Distinct"],
        ans: 1,
        diff: "Medium",
        exp: "Disparate means essentially different in kind; not able to be compared. Antonym is Similar."
      },
      {
        q: "[Cognizant Verbal] Spot the error:\nHe is senior than me (A) / by two years (B) / in this engineering department. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 0,
        diff: "Easy",
        exp: "Comparative adjectives ending in '-ior' (senior, junior, prior, superior, inferior) are followed by 'to', not 'than'. It should be 'senior to me'. Error is in (A)."
      },
      {
        q: "[Cognizant Verbal] Fill in the blank:\nShe has an extraordinary aptitude ______ algorithmic data structures.",
        opts: ["for", "in", "at", "to"],
        ans: 0,
        diff: "Easy",
        exp: "The noun 'aptitude' takes the preposition 'for' ('aptitude for mathematics/coding')."
      },
      {
        q: "[Cognizant Verbal] Choose the correctly spelled word:",
        opts: ["Liaison", "Liason", "Liasion", "Liazon"],
        ans: 0,
        diff: "Hard",
        exp: "The correct spelling is 'Liaison' (l-i-a-i-s-o-n)."
      },
      {
        q: "[Cognizant Verbal] One-word substitution:\n'One who looks on the bright side of things'",
        opts: ["Pessimist", "Optimist", "Pacifist", "Realist"],
        ans: 1,
        diff: "Easy",
        exp: "An Optimist is someone who tends to see the positive side of life."
      },
      {
        q: "[Cognizant Verbal] Sentence Improvement:\n'If I *was* the CTO, I would immediately refactor the monolith into microservices.'",
        opts: ["were", "had been", "am", "No improvement needed"],
        ans: 0,
        diff: "Medium",
        exp: "Subjunctive mood expressing a hypothetical or counterfactual condition requires 'were' ('If I were you', 'If I were the CTO')."
      },
      {
        q: "[Cognizant Verbal] Choose the active voice:\n'The customer issue has been resolved by our support desk.'",
        opts: [
          "Our support desk has resolved the customer issue.",
          "Our support desk resolved the customer issue.",
          "Our support desk is resolving the customer issue.",
          "Our support desk had resolved the customer issue."
        ],
        ans: 0,
        diff: "Easy",
        exp: "Present perfect passive ('has been resolved') converts to present perfect active ('has resolved')."
      },
      {
        q: "[Cognizant Verbal] Synonym of: EXACERBATE",
        opts: ["Worsen / Aggravate", "Soothe", "Alleviate", "Pacify"],
        ans: 0,
        diff: "Medium",
        exp: "Exacerbate means to make a problem, situation, or negative feeling worse. Synonym: Worsen."
      },
      {
        q: "[Cognizant Verbal] Antonym of: METICULOUS",
        opts: ["Slapdash / Careless", "Precise", "Thorough", "Scrupulous"],
        ans: 0,
        diff: "Easy",
        exp: "Antonym of meticulous is Slapdash or Careless."
      },
      {
        q: "[Cognizant Verbal] Spot the error:\nThe manager asked the team (A) / that why they were delayed (B) / in submitting the progress report. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Medium",
        exp: "In indirect questions starting with wh-words ('why', 'what', 'where'), conjunction 'that' should never be used before the wh-word. It should be 'asked the team why they were delayed'. Error is in (B)."
      },
      {
        q: "[Cognizant Verbal] Fill in the blank:\nThe speaker was so ______ that the audience remained captivated throughout the keynote.",
        opts: ["eloquent", "monotonous", "incoherent", "lethargic"],
        ans: 0,
        diff: "Easy",
        exp: "'Eloquent' means fluent or persuasive in speaking or writing."
      },
      {
        q: "[Cognizant Verbal] Idiom meaning: 'Throw in the towel'",
        opts: ["To clean up a workstation", "To give up or admit defeat", "To take a shower", "To challenge a coworker"],
        ans: 1,
        diff: "Easy",
        exp: "'To throw in the towel' is an idiom from boxing meaning to surrender or admit defeat."
      },
      {
        q: "[Cognizant Verbal] Choose the correct conditional form:\n'Had the team verified the staging environment, the downtime ______.'",
        opts: ["would be avoided", "would have been avoided", "will be avoided", "had been avoided"],
        ans: 1,
        diff: "Medium",
        exp: "Inverted third conditional ('Had + subject + past participle') requires 'would have been avoided' in the main clause."
      },
      {
        q: "[Cognizant Verbal] Synonym of: CANDID",
        opts: ["Frank / Outspoken", "Deceptive", "Secretive", "Artful"],
        ans: 0,
        diff: "Easy",
        exp: "Candid means truthful and straightforward; frank."
      },
      {
        q: "[Cognizant Verbal] Antonym of: AFFLUENT",
        opts: ["Wealthy", "Opulent", "Impoverished", "Prosperous"],
        ans: 2,
        diff: "Easy",
        exp: "Affluent means having a great deal of money; wealthy. Antonym is Impoverished (poor)."
      }
    ],

    capgemini: [
      {
        q: "[Capgemini Verbal] Spot the error in the sentence:\nHe is one of the brightest engineers (A) / who has ever contributed (B) / to our open-source codebase. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Hard",
        exp: "In 'one of the [plural noun] who [verb]', the relative pronoun 'who' refers to the plural antecedent 'engineers', requiring the plural verb 'have ever contributed' (not 'has'). Error is in (B)."
      },
      {
        q: "[Capgemini Verbal] Fill in the blank:\nThe architect gave a ______ overview of the security protocol before diving into technical configurations.",
        opts: ["cursory", "meticulous", "exhaustive", "tedious"],
        ans: 0,
        diff: "Medium",
        exp: "'Cursory' means hasty and therefore not thorough or detailed; a quick introductory look."
      },
      {
        q: "[Capgemini Verbal] Para Jumbles:\nP: which ensures high availability\nQ: Kubernetes orchestrates containerized workloads\nR: across scalable cluster nodes\nS: and automatic failover handling",
        opts: ["Q R P S", "Q P R S", "R S Q P", "S P Q R"],
        ans: 0,
        diff: "Medium",
        exp: "'Kubernetes orchestrates containerized workloads (Q) across scalable cluster nodes (R) which ensures high availability (P) and automatic failover handling (S)' -> Q R P S."
      },
      {
        q: "[Capgemini Verbal] Meaning of the idiom: 'Beat around the bush'",
        opts: ["To clear vegetation", "To avoid coming to the main point of a discussion", "To complain about work", "To investigate thoroughly"],
        ans: 1,
        diff: "Easy",
        exp: "'Beat around the bush' means to discuss a topic without arriving at the point, often to avoid an uncomfortable issue."
      },
      {
        q: "[Capgemini Verbal] Synonym of: DILIGENT",
        opts: ["Industrious / Hardworking", "Lazy", "Neglectful", "Careless"],
        ans: 0,
        diff: "Easy",
        exp: "Diligent means having or showing care and conscientiousness in one's work. Synonym: Industrious."
      },
      {
        q: "[Capgemini Verbal] Antonym of: OBSOLETE",
        opts: ["Outdated", "Archaic", "Contemporary / Modern", "Antiquated"],
        ans: 2,
        diff: "Easy",
        exp: "Obsolete means no longer produced or used; out of date. Antonym is Contemporary."
      },
      {
        q: "[Capgemini Verbal] Spot the error:\nBetween you and I, (A) / the new product launch (B) / will be delayed by two months. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 0,
        diff: "Medium",
        exp: "'Between' is a preposition, and prepositions govern the objective case of pronouns ('between you and me', not 'between you and I'). Error is in (A)."
      },
      {
        q: "[Capgemini Verbal] Fill in the blank:\nShe complied ______ all the company policies during the internal audit.",
        opts: ["with", "to", "for", "by"],
        ans: 0,
        diff: "Easy",
        exp: "The verb 'comply' takes the preposition 'with' (comply with rules)."
      },
      {
        q: "[Capgemini Verbal] Choose the correctly spelled word:",
        opts: ["Millennium", "Millenium", "Milennium", "Milennum"],
        ans: 0,
        diff: "Hard",
        exp: "The correct spelling is 'Millennium' (double l, double n)."
      },
      {
        q: "[Capgemini Verbal] One-word substitution:\n'A person who writes code of laws or compiles a dictionary'",
        opts: ["Lexicographer", "Bibliophile", "Cartographer", "Calligrapher"],
        ans: 0,
        diff: "Medium",
        exp: "A Lexicographer is a person who compiles dictionaries."
      },
      {
        q: "[Capgemini Verbal] Sentence Improvement:\n'The manager ordered that everyone *must be* in the conference room by 9 AM.'",
        opts: ["be", "should be", "is", "No improvement needed"],
        ans: 0,
        diff: "Hard",
        exp: "Subjunctive mood after verbs of demand/order ('ordered that...') uses the base form of the verb: 'that everyone be'."
      },
      {
        q: "[Capgemini Verbal] Choose the correct active voice:\n'The notification had been dispatched by the server before the outage.'",
        opts: [
          "The server had dispatched the notification before the outage.",
          "The server dispatched the notification before the outage.",
          "The server has dispatched the notification before the outage.",
          "The server was dispatching the notification before the outage."
        ],
        ans: 0,
        diff: "Easy",
        exp: "Past perfect passive ('had been dispatched') converts to past perfect active ('had dispatched')."
      },
      {
        q: "[Capgemini Verbal] Synonym of: PARADIGM",
        opts: ["Model / Standard Pattern", "Anomaly", "Exception", "Deviation"],
        ans: 0,
        diff: "Medium",
        exp: "A paradigm is a typical example, pattern, or model of something."
      },
      {
        q: "[Capgemini Verbal] Antonym of: GARRULOUS",
        opts: ["Talkative", "Reticent / Quiet", "Voluble", "Loquacious"],
        ans: 1,
        diff: "Hard",
        exp: "Garrulous means excessively talkative. Antonym is Reticent or Taciturn."
      },
      {
        q: "[Capgemini Verbal] Spot the error:\nEither the backend lead or the devops engineers (A) / is responsible (B) / for setting up CI/CD pipelines. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 1,
        diff: "Easy",
        exp: "In 'either...or', the verb agrees with the closer subject ('engineers', plural). It must be 'are responsible'. Error is in (B)."
      },
      {
        q: "[Capgemini Verbal] Fill in the blank:\nHis reasoning was so ______ that nobody in the committee could refute his claims.",
        opts: ["cogent", "fallacious", "spurious", "flimsy"],
        ans: 0,
        diff: "Medium",
        exp: "'Cogent' means clear, logical, and convincing."
      },
      {
        q: "[Capgemini Verbal] Idiom meaning: 'Cry over spilled milk'",
        opts: ["To waste beverages", "To worry or regret over past events that cannot be changed", "To clean up an accident", "To apologize sincerely"],
        ans: 1,
        diff: "Easy",
        exp: "'To cry over spilled milk' means to dwell on a past mistake or misfortune that cannot be undone."
      },
      {
        q: "[Capgemini Verbal] Choose the correct adverb:\nShe completed the security assessment ______ than her peer.",
        opts: ["more thoroughly", "most thoroughly", "thoroughly", "as thorough"],
        ans: 0,
        diff: "Easy",
        exp: "Comparative form of multi-syllable adverb 'thoroughly' is 'more thoroughly'."
      },
      {
        q: "[Capgemini Verbal] Synonym of: LUCID",
        opts: ["Clear / Comprehensible", "Vague", "Murky", "Incomprehensible"],
        ans: 0,
        diff: "Easy",
        exp: "Lucid means expressed clearly; easy to understand."
      },
      {
        q: "[Capgemini Verbal] Antonym of: EXTRAVAGANT",
        opts: ["Frugal / Economical", "Prodigal", "Lavish", "Wasteful"],
        ans: 0,
        diff: "Easy",
        exp: "Extravagant means lacking restraint in spending resources. Antonym is Frugal."
      }
    ],

    deloitte: [
      {
        q: "[Deloitte Business English] Spot the error in the sentence:\nThe advisory committee comprise of (A) / five senior partners and (B) / three technology consultants. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 0,
        diff: "Medium",
        exp: "The verb 'comprise' means 'consist of' or 'be composed of'. It is never followed by 'of' in active voice. It should be 'The advisory committee comprises five senior partners...' or 'is composed of'. Error is in (A)."
      },
      {
        q: "[Deloitte Business English] Fill in the blank:\nThe audit findings will be presented to the board ______ the executive committee meeting on Monday.",
        opts: ["during", "while", "along", "throughout"],
        ans: 0,
        diff: "Easy",
        exp: "'During' is a preposition followed by a noun phrase ('the executive committee meeting'). 'While' is a conjunction followed by a clause."
      },
      {
        q: "[Deloitte Business English] Sentence Rearrangement:\nP: to mitigate compliance vulnerabilities\nQ: global risk advisory firms\nR: comprehensive audit frameworks\nS: routinely implement",
        opts: ["Q S R P", "Q R S P", "R S P Q", "P Q S R"],
        ans: 0,
        diff: "Medium",
        exp: "'Global risk advisory firms (Q) routinely implement (S) comprehensive audit frameworks (R) to mitigate compliance vulnerabilities (P)' -> Q S R P."
      },
      {
        q: "[Deloitte Business English] Meaning of the business idiom: 'Touch base'",
        opts: ["To physically tap a baseball plate", "To make brief contact with someone to update or consult", "To finalize a legal contract", "To cancel a scheduled meeting"],
        ans: 1,
        diff: "Easy",
        exp: "'Touch base' is a common corporate idiom meaning to briefly communicate or confer with someone."
      },
      {
        q: "[Deloitte Business English] Synonym of: DISCREPANCY",
        opts: ["Inconsistency / Variance", "Agreement", "Harmony", "Concurrence"],
        ans: 0,
        diff: "Easy",
        exp: "A discrepancy is a lack of compatibility or similarity between two or more facts. Synonym: Inconsistency."
      },
      {
        q: "[Deloitte Business English] Antonym of: RECTIFY",
        opts: ["Correct", "Worsen / Corrupt", "Amend", "Remedy"],
        ans: 1,
        diff: "Easy",
        exp: "Rectify means to put right; correct. Antonym is to worsen or corrupt."
      },
      {
        q: "[Deloitte Business English] Spot the error:\nDespite of the rigorous audit, (A) / the financial statements were approved (B) / by the regulatory body. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 0,
        diff: "Easy",
        exp: "'Despite' is a preposition and is never followed by 'of'. It should be 'Despite the rigorous audit' or 'In spite of the rigorous audit'. Error is in (A)."
      },
      {
        q: "[Deloitte Business English] Fill in the blank:\nThe consultant's recommendations were based ______ comprehensive empirical market research.",
        opts: ["on", "in", "at", "with"],
        ans: 0,
        diff: "Easy",
        exp: "The verb 'base' is followed by the preposition 'on' ('based on')."
      },
      {
        q: "[Deloitte Business English] Choose the correctly spelled business term:",
        opts: ["Fiduciary", "Fidutiary", "Fiducary", "Fidusiary"],
        ans: 0,
        diff: "Medium",
        exp: "The correct spelling is 'Fiduciary' (involving trust, especially regarding the relationship between a trustee and a beneficiary)."
      },
      {
        q: "[Deloitte Business English] One-word substitution:\n'A detailed systematic examination of the financial records of an organization'",
        opts: ["Audit", "Appraisal", "Inventory", "Census"],
        ans: 0,
        diff: "Easy",
        exp: "An official financial inspection and verification is an 'Audit'."
      },
      {
        q: "[Deloitte Business English] Sentence Improvement:\n'The CFO asked the analysts *if they could* expedite the fiscal forecast report.'",
        opts: ["that could they", "whether could they", "if could they", "No improvement needed"],
        ans: 3,
        diff: "Medium",
        exp: "The indirect clause 'if they could expedite...' correctly follows standard statement word order."
      },
      {
        q: "[Deloitte Business English] Choose the correct active voice:\n'The risk assessment matrix was drafted by the senior consultant.'",
        opts: [
          "The senior consultant drafted the risk assessment matrix.",
          "The senior consultant has drafted the risk assessment matrix.",
          "The senior consultant was drafting the risk assessment matrix.",
          "The senior consultant drafts the risk assessment matrix."
        ],
        ans: 0,
        diff: "Easy",
        exp: "Simple past passive ('was drafted') converts to simple past active ('drafted')."
      },
      {
        q: "[Deloitte Business English] Synonym of: SCRUTINY",
        opts: ["Critical observation / Inspection", "Neglect", "Disregard", "Carelessness"],
        ans: 0,
        diff: "Easy",
        exp: "Scrutiny means critical observation or examination."
      },
      {
        q: "[Deloitte Business English] Antonym of: SUBSTANTIATE",
        opts: ["Disprove / Refute", "Validate", "Corroborate", "Authenticate"],
        ans: 0,
        diff: "Medium",
        exp: "Substantiate means provide evidence to support or prove the truth of. Antonym is to disprove or refute."
      },
      {
        q: "[Deloitte Business English] Spot the error:\nNot only the CEO (A) / but also the department heads (B) / was in favor of the cloud transformation. (C) / No error (D)",
        opts: ["A", "B", "C", "D"],
        ans: 2,
        diff: "Medium",
        exp: "In 'Not only... but also', the verb agrees with the closer subject ('department heads', plural). It should be 'were in favor of'. Error is in (C)."
      },
      {
        q: "[Deloitte Business English] Fill in the blank:\nThe client was impressed by the team's ______ communication and transparent milestone updates.",
        opts: ["proactive", "reactive", "passive", "sluggish"],
        ans: 0,
        diff: "Easy",
        exp: "'Proactive' means taking action by anticipating future events rather than reacting after the fact."
      },
      {
        q: "[Deloitte Business English] Idiom meaning: 'Get down to brass tacks'",
        opts: ["To sell hardware supplies", "To focus on the basic facts or essentials of a situation", "To assemble office furniture", "To abandon a project"],
        ans: 1,
        diff: "Medium",
        exp: "'Get down to brass tacks' means to start talking about the most important or basic facts of a situation."
      },
      {
        q: "[Deloitte Business English] Choose the correct preposition:\nAll deliverables must be in accordance ______ the Master Services Agreement.",
        opts: ["with", "to", "for", "by"],
        ans: 0,
        diff: "Easy",
        exp: "The idiomatic phrase is 'in accordance with'."
      },
      {
        q: "[Deloitte Business English] Synonym of: PRUDENT",
        opts: ["Wise / Cautious", "Reckless", "Rash", "Foolhardy"],
        ans: 0,
        diff: "Easy",
        exp: "Prudent means acting with or showing care and thought for the future. Synonym: Wise / Cautious."
      },
      {
        q: "[Deloitte Business English] Antonym of: ARBITRARY",
        opts: ["Reasoned / Rational", "Random", "Capricious", "Erratic"],
        ans: 0,
        diff: "Medium",
        exp: "Arbitrary means based on random choice or personal whim rather than reason. Antonym is Reasoned or Rational."
      }
    ]
  };

  return questionsByCompany[companySlug] || null;
}

module.exports = { generateVerbalForCompany };
