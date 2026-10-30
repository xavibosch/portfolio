/* The three full case studies. Everything here is written from the project
   READMEs, the code and the notes kept while building, nothing else.

   Editing guide
   - Each section is a list of blocks. A block is one of:
       text(...paragraphs)            plain paragraphs
       claims([status, text], ...)    statements tagged with how sure we are
       media(item) / gallery(...items) images, videos or placeholders
       options(...)                   alternatives that were considered
       decision({...})                the central decision, in six parts
       stack([name, why], ...)        each technology and why it is there
       checks([state, text], ...)     accessibility: done, reviewed, missing
       testPlan({...})                what would be tested next
       note(kind, text)               a reminder for Xavi, never shown live
   - Claim statuses: known, observed, assumed, tested, validated,
     not-validated, planned.
   - A media item is { kind: 'image' | 'video', src, poster?, alt, caption,
     evidence, ratio } or placeholder(ratio, what to produce). Swapping a
     placeholder for the real thing means replacing that one call.
   - Notes and placeholders show in `npm run dev` or with ?edit in the URL,
     and are left out of the public build. */

import { text, claims, media, gallery, options, decision, stack, checks, testPlan, note, placeholder, image } from './case-blocks.js';
import { getLang } from './i18n.js';
import caseStudiesEs from './case-studies.es.js';
import caseStudiesCa from './case-studies.ca.js';

export const caseStudies = {
  'jeffrey-desk': {
    oneLiner: 'A Mac workspace that puts the web services, files, calendar and AI I use every day into one window, with an agent that can act on them.',
    role: 'Product design, interaction design and desktop development',
    type: 'Self-initiated product',
    team: 'Independent project',
    timeline: '',
    timelineNote: 'Add the period: when the projected desk started (Intelligent Environments) and when the Mac version began.',
    status: 'In daily use by me. Product edition in active development, version 0.1.29 ready to publish',
    stack: ['Electron (castLabs)', 'HTML, CSS and JavaScript', 'Python', 'whisper.cpp', 'Widevine'],
    links: [['jeffreydesk.com', 'https://jeffreydesk.com']],
    hero: placeholder('16/9', 'PLACEHOLDER: 20 to 30 second product walkthrough. Open the app, switch panels, ask the AI to do one real task.', 'video'),
    heroFallback: image('/assets/jeffrey-desk-real.webp', 'Jeffrey Desk running: four panels with streaming services, a Codex conversation and a bar of Mac controls along the bottom.', 'The desk running, panels live', 'screenshot'),
    sections: {
      context: [
        text(
          'Jeffrey Desk started as a projected, touchable table for the Intelligent Environments course at La Salle: the day projected onto the desk, with a camera following my hand.',
          'Living with it made something obvious. Nearly everything I valued was the software, not the projection. So I moved the desk onto the Mac, where I could use it every day instead of only in a dark room.',
          'Later I decided to turn it into something other people could install. That is the part of the project that changed it most, and the part this case study spends most time on.',
        ),
        note('content', 'Add one or two sentences on why the course brief led to a desk, and when you decided to move it to the Mac.'),
      ],
      problem: [
        text('My day was spread over a dozen apps and twice as many tabs: the campus, Netflix, an AI, Spotify, the calendar and the mail, all at once. Every switch cost a little attention, the browser treated a film and an exam the same way, and nothing could see the whole day at once to help with it.'),
        text('The AI I used could answer, but not act. It could tell me how to download the first PDF of a course. It could not open the campus and do it.'),
        claims(
          ['observed', 'The friction is my own: switching between the same services every day.'],
          ['not-validated', 'Whether other students feel the same friction strongly enough to change how they work.'],
        ),
      ],
      audience: [
        text('Jeffrey Desk began as a self-initiated product designed around my own workflow. Its technical feasibility is proven, because I use it every day. Broader usability still needs to be validated with other Mac users.'),
        claims(
          ['observed', 'Me: a student whose day is the campus, streaming, an AI, music, the calendar and the mail.'],
          ['assumed', 'Other Mac users who live in many tabs, starting with university students, which is why the campus integration works with any Moodle.'],
          ['not-validated', 'That someone else can set up an empty desk on their own and keep using it.'],
        ),
      ],
      evidence: [
        text('This was not formal user research. It began as an observation of my own behaviour, then as a concept for the course.'),
        gallery(
          image('/assets/jeffrey-desk-idea.webp', 'Concept board of a projected smart desk listing a projector, camera, piezo sensors, Raspberry Pi and ESP32.', 'Concept board for the projected desk. A render, not a photograph', 'concept'),
          placeholder('16/10', 'PLACEHOLDER: screenshot of the fragmented workflow before the desk, the real tabs and apps open on a normal day.', 'photo'),
        ),
        note('evidence', 'A photograph of the real projected prototype, if one exists. The current image is a concept render.'),
      ],
      assumptions: [
        claims(
          ['known', 'An agent can act inside embedded web pages and on the Mac at the same time. Built and in daily use.'],
          ['observed', 'The projection was not what I used. The software was.'],
          ['assumed', 'A new user can understand panels, the service wheel and naming without being shown.'],
          ['assumed', 'People will let an AI read their pages and folders if the permissions are narrow and visible.'],
          ['known', 'Embedding third-party services is where the product could fail: platform terms, encrypted video and WhatsApp’s ban on third-party clients.'],
          ['not-validated', 'Whether anyone will pay for it. Plans exist in the code, but paying has never been tested.'],
        ),
        note('content', 'Confirm the last line: is anything on sale yet, and has anyone installed the product edition?'),
      ],
      exploration: [
        options(
          { title: 'A projected, touchable desk', solving: 'One surface for the whole day, with the hand as the input.', pros: 'Memorable. It used the desk itself.', cons: 'It needs a projector, a camera and a dark room, touch is imprecise, and it cannot be shipped to anyone.', verdict: 'discarded', why: 'Kept the software and moved it to the Mac. Hand tracking survives only in my personal edition.' },
          { title: 'Video through Safari’s Picture in Picture', solving: 'Playing encrypted video inside a panel without a licence.', pros: 'No certification needed.', cons: 'Too many fragile pieces held together.', verdict: 'discarded', why: 'Replaced with Widevine in a certified app, used as designed.' },
          { title: 'Identify as Chrome', solving: 'Getting streaming and WhatsApp to load in the personal desk.', pros: 'It works.', cons: 'It breaks the platforms’ terms and turns that into getting around an access control. Not something to sell.', verdict: 'discarded', why: 'The product identifies honestly as JeffreyDesk/0.1. If a platform wants to block it, it can.' },
          { title: 'One folder for both editions', solving: 'Working on the product without a second copy.', pros: 'Simple.', cons: 'The installed personal app serves files from its folder live, so editing the product rewrote the page it was serving. It broke twice.', verdict: 'discarded', why: 'Two git worktrees of the same repository: shared history, separate files.' },
        ),
        gallery(
          image('/assets/jeffrey-desk-concept-empty.webp', 'Concept render of an empty desk: four panels each saying tap to add an app, with a row of Mac controls below.', 'Visual exploration: the empty state. A concept render, not the shipped interface', 'concept'),
          image('/assets/jeffrey-desk-concept-configured.webp', 'Concept render of a configured desk with Notion, a news site, mail and a calendar in four panels.', 'Visual exploration: a set-up desk. A concept render, not the shipped interface', 'concept'),
        ),
        note('decision', 'Voice commands were removed on 10 October 2026 and only dictation stayed. Explain why: it is a strong decision to show.'),
      ],
      decision: [
        decision({
          title: 'One codebase, two editions',
          situation: 'The personal desk was good and could not be sold as it was. My timetable, my campus, my name and my services were written into it. WhatsApp and pretending to be Chrome were not sellable. Half the interface existed for a projector.',
          options: ['Ship the personal desk with a settings screen to change what was hard-coded.', 'Fork a separate product and let the two drift apart.', 'Keep one codebase and describe each edition in a file, separating what an edition can offer from what the user has put on the desk.'],
          decision: 'The third. The rule I wrote for it: the product must work exactly like the personal one. The only difference is that nothing comes set up.',
          reasoning: 'Improvements still flow between the two with an ordinary git merge, my own desk keeps working while the product changes, and a new install starts empty instead of showing someone else’s life.',
          tradeoff: 'Every feature has to know which edition it is in, and there are two apps to build and test. The automated check now walks the whole app on every plan and compares 86 screens.',
          consequence: 'The product dropped WhatsApp, the Chrome disguise, the hard-coded timetable, my name, hand tracking and the projector controls. It gained a four-step set-up and up to 48 services of your own, each locked to its own domain.',
        }),
      ],
      interaction: [
        text(
          'A row of information along the top (clock, weather, the day’s tasks, a weekly agenda, a timer, Spotify), three large panels with two visible at a time, and a bar along the bottom that controls the Mac itself.',
          'An empty panel shows one large button. It opens a four-step set-up: what each panel is called, what goes in it, and the campus if there is one. Choosing a service is a wheel you turn with the trackpad or by dragging, with each service’s real logo. Afterwards, the plus button on any panel opens the same catalogue, and an organise view lets you drag cards between panels.',
          'The two AI conversations run through the Claude and Codex command-line tools you already have. They can read and edit files only inside folders you have opened, never more than five and never private ones. The remaining quota is always visible, and when one runs out the desk switches to the other.',
          'Course deadlines appear in the day’s list on their own. The desk asks Moodle’s own calendar service instead of reading the screen, so it does not break when the university changes its theme.',
        ),
        gallery(
          image('/assets/jeffrey-desk-setup.webp', 'The widget picker on the product site, with service logos arranged on a wheel.', 'Choosing what goes in a panel', 'screenshot'),
          image('/assets/jeffrey-desk-spotify.webp', 'The Spotify widget inside the desk during a real listening session.', 'Spotify, controlled from the desk', 'screenshot'),
          placeholder('16/10', 'PLACEHOLDER: short recording of the four-step set-up, from an empty panel to a filled one.', 'video'),
          placeholder('16/10', 'PLACEHOLDER: the waiting, error and empty states side by side.', 'screenshot'),
        ),
        note('content', 'Explain how the desk shows waiting, failure and success, for example when a service is blocked or the AI is busy.'),
      ],
      implementation: [
        text('Three pieces: the page, a local bridge and the Electron shell. The split exists so that embedding other people’s websites is not an open door.'),
        stack(
          ['Electron, castLabs build', 'Opens the window, starts the bridge and watches every embedded web view. Each service gets its own sealed session and its own list of allowed domains. The castLabs build is there because it can play Widevine-encrypted video once the app is certified.'],
          ['HTML, CSS and JavaScript, no framework', 'One page with no build step. It started as a single file of about 5,800 lines and was later split into modules without changing a byte of behaviour, checked by a test that rebuilds the page and compares it.'],
          ['Python bridge, standard library only', 'A small server on 127.0.0.1. The page cannot touch the disk or run anything, it has to ask the bridge, which only knows a closed list of actions. It also explains 127.0.0.1 instead of a file: Spotify’s sign-in has to return to a registered address.'],
          ['whisper.cpp', 'Dictation transcribed on the Mac. Nothing is uploaded.'],
          ['Widevine', 'Decrypts streaming video inside Google’s module. The app never sees the key and cannot record. The certification comes from castLabs EVS.'],
        ),
        claims(
          ['known', 'Security is part of the architecture: the bridge checks the Host and Origin headers, every inline script runs only if its hash is in the content security policy, and no renderer has Node.'],
          ['known', 'Not notarised yet. Without a Developer ID signature it will not open on another Mac, and every build resets the macOS Accessibility permission.'],
          ['planned', 'A lawyer’s review of the video and subscription questions before charging.'],
        ),
        text('Two lessons that cost hours. Testing in a browser tab instead of inside Electron silently skips half the app. And an inline error handler, refused by the security policy, once hid 613 errors.'),
        media(placeholder('16/9', 'PLACEHOLDER: architecture diagram of page, bridge and shell, drawn from the README diagram.', 'diagram')),
      ],
      accessibility: [
        checks(
          ['done', 'Keyboard and VoiceOver support in every window, according to the 0.1.29 release notes.'],
          ['done', 'Hand tracking is optional and only exists in the personal edition. Everything works with a mouse, trackpad or keyboard.'],
          ['done', 'Idle energy use cut to a third, which matters on a laptop left open all day.'],
          ['missing', 'No contrast audit yet.'],
          ['missing', 'Reduced motion has not been checked against the system setting.'],
        ),
        note('validation', 'Record a short VoiceOver and keyboard-only pass to back up the first line.'),
      ],
      validation: [
        claims(
          ['tested', 'An automated check walks the whole app on every plan against a temporary bridge and compares 86 screens with a known baseline.'],
          ['observed', 'I use the personal edition every day.'],
          ['not-validated', 'Nobody else has been observed setting up or using the product edition.'],
        ),
        testPlan({
          participants: 'Five Mac-using students who move between a campus, mail, streaming and an AI during the day.',
          tasks: ['Install the app and set up two panels without help.', 'Add a website of your own.', 'Ask the AI to download the first PDF of a course.', 'Find this week’s deadlines.'],
          questions: ['What did you expect to happen when you turned the wheel?', 'What do you think the AI can and cannot touch on your Mac?', 'What would you still keep in a normal browser?'],
          observe: ['Where they hesitate in the set-up.', 'Whether they name panels or leave the defaults.', 'If they trust the AI with a real file.'],
          success: ['Set-up completed without asking me.', 'They can explain the AI’s limits in their own words.', 'They choose to keep it open the next day.'],
          priorities: ['A stranger can set it up alone.', 'People accept an AI acting on their files when the limits are visible.'],
        }),
      ],
      result: [
        claims(
          ['known', 'A working Mac app that I use every day.'],
          ['known', 'An installable product edition with its own website, a set-up flow, plans and an updater. Version 0.1.29 is ready to publish.'],
          ['planned', 'Notarisation, then the first outside users.'],
        ),
        media(image('/assets/jeffrey-desk-web.webp', 'The jeffreydesk.com product website.', 'jeffreydesk.com, the product site', 'screenshot')),
        note('content', 'Add the number of installs or people on the waiting list, if you have them.'),
      ],
      reflection: [
        text(
          'The most important decision was separating what an edition can offer from what someone has put on their desk. Before that, every change for the product risked breaking the desk I depend on.',
          'What I would do differently: build for an empty desk from the start. Every shortcut I took for myself had to be paid back before a stranger could install it.',
          'What did not work: the grid. It is inherited from the projected table, and a Mac app does not need to have the same shape. It is the next thing to rethink.',
          'What I still do not know: whether anyone else will set it up and keep it. That is the question the next round of testing has to answer.',
        ),
      ],
    },
    next: { slug: 'reps', line: 'Where Jeffrey Desk is about product scope, Reps is about one interaction under a hard constraint: hands that are not free.' },
  },

  reps: {
    oneLiner: 'A training screen for a garage gym, driven by pointing at the camera so chalked hands never have to touch it.',
    role: 'Interaction design and frontend development',
    type: 'Personal prototype',
    team: 'Independent project',
    timeline: '',
    timelineNote: 'Add the period you built and used it.',
    status: 'Working prototype, installed as a Mac app and used in my own sessions',
    stack: ['React', 'TypeScript', 'MediaPipe', 'Electron', 'Spotify Connect'],
    links: [['Source on GitHub', 'https://github.com/xavibosch/reps']],
    hero: placeholder('16/9', 'PLACEHOLDER: 20 second video of one real set: point, hold, the ring fills, rest timer starts.', 'video'),
    heroFallback: image('/assets/reps-session.webp', 'Reps mid session: the current exercise, weight and set count with large round controls.', 'Mid session, set in progress', 'screenshot'),
    sections: {
      context: [
        text(
          'I train in a garage: one bench, one barbell, two dumbbells and thirty kilos of plates. Between sets my hands are chalked or still on the bar.',
          'Every training app I tried assumed a free, clean hand. The phone had locked itself by the time I reached for it, and I had lost both the set count and the music.',
        ),
      ],
      problem: [
        text('Logging a set, starting the rest and changing the music all meant touching a screen at exactly the moment my hands were least able to.'),
        claims(
          ['observed', 'In my own sessions the phone had locked itself between sets, and I lost track of both the set count and the music.'],
          ['not-validated', 'Whether other people training at home feel the same.'],
        ),
      ],
      audience: [
        text('Reps is built for one person and one room: me, in my garage. That makes the design decisions concrete and the conclusions narrow.'),
        claims(
          ['observed', 'Me, training at home with a laptop and its camera facing the bench.'],
          ['assumed', 'Anyone training at home with a screen nearby has the same busy-hands problem.'],
          ['not-validated', 'Different bodies, rooms, lighting and camera distances.'],
        ),
      ],
      evidence: [
        text('This was not formal research. It began as an observation of my own behaviour between sets.'),
        gallery(
          placeholder('4/3', 'PLACEHOLDER: photograph of the garage set-up, showing where the screen and camera sit relative to the bench.', 'photo'),
          placeholder('4/3', 'PLACEHOLDER: photograph of chalked hands on the bar, the reason the screen cannot be touched.', 'photo'),
        ),
      ],
      assumptions: [
        claims(
          ['assumed', 'Hand tracking is reliable enough at gym distance and in garage lighting.'],
          ['assumed', 'Holding for a moment is quick enough not to slow a session down.'],
          ['not-validated', 'A swipe would feel natural for changing exercise. It turned out to be wrong, see below.'],
          ['known', 'A browser tab does not keep the camera permission in Safari, so tracking would never start on its own.'],
        ),
      ],
      exploration: [
        options(
          { title: 'Swipe to change exercise', solving: 'A fast way to move on without aiming.', pros: 'Feels natural in theory.', cons: 'The index finger is also the cursor, so a quick move to the right is the same as a swipe to the right. Guards on hand state and direction reduced it but never removed it.', verdict: 'discarded', why: 'Ambiguous by construction, not badly tuned. The on-screen arrows and the keyboard do the job unambiguously.' },
          { title: 'AirPods double tap as a remote', solving: 'A control that needs no hand in front of the camera.', pros: 'Already in my ears.', cons: 'The taps never reach the system as media keys. Claiming the media session worked, but Spotify took it back within milliseconds every time.', verdict: 'discarded', why: 'Three attempts, all guesses about how the event travels. The lesson was to check the real event path in the system log before writing code.' },
          { title: 'A browser tab', solving: 'Running Reps with no install.', pros: 'Nothing to install.', cons: 'Safari asks for the camera every time, so tracking never just starts.', verdict: 'kept as a fallback', why: 'A small Electron shell answers the web permission in code. One macOS prompt, once.' },
          { title: 'Spotify’s web player', solving: 'Music inside the app.', pros: 'Everything in one place.', cons: 'It does not run on iOS and needs a playback device in the page.', verdict: 'discarded', why: 'Spotify Connect controls the client that is already playing, with no backend.' },
        ),
      ],
      decision: [
        decision({
          title: 'Every control is hold to confirm',
          situation: 'A hand-tracked cursor has no click, and on its way to a button it passes over others.',
          options: ['Pinch to click.', 'Swipes and dedicated gestures.', 'Hold to confirm on every control, with a ring that fills before anything fires.'],
          decision: 'Hold to confirm everywhere. The cursor dispatches ordinary pointer events, so the same controls work with the hand, a mouse, a trackpad or touch. A quick tap still works as a shortcut for a mouse.',
          reasoning: 'One interaction contract for every input, and the ring is the feedback that the system has understood before it acts. A hold only starts once the hand has slowed down, so sweeping across the panel presses nothing.',
          tradeoff: 'Every action costs about 0.6 seconds of holding, which is slower than a click.',
          consequence: 'The swipe went. Changing exercise is an arrow you hold, or a key.',
        }),
        note('content', 'Your newer version adds an active and a standby mode (both hands open to wake) and a fingertip touch to complete a set. They are not in the public repository yet. Push them, then describe them here as a second decision.'),
      ],
      interaction: [
        text(
          'Choose a workout, then one screen holds the session: the exercise and set, the rest timer, the queue and the music. You point at a control and hold. The control grows and a ring fills while you hold, and if you move away before it is full nothing happens.',
          'Completing a set starts the rest countdown. The last set moves to the next exercise on its own, and the session ends with a summary of what you actually lifted. A training log keeps a calendar of sessions and a streak, and runs are logged by hand.',
          'Music starts only when a workout is chosen, never when the app opens, and Spotify comes up behind the workout screen instead of taking it over.',
        ),
        gallery(
          image('/assets/reps-home.webp', 'Workout picker with large hold-to-select tiles.', 'Choosing a workout', 'screenshot'),
          image('/assets/reps-rest.webp', 'Rest timer counting down with the current Spotify track below.', 'Rest timer with Spotify', 'screenshot'),
          image('/assets/reps-leave.webp', 'Dialog asking for confirmation before leaving a session.', 'Leaving a session asks first', 'screenshot'),
          image('/assets/reps-summary.webp', 'End of session summary with exercises and weights lifted.', 'Session summary', 'screenshot'),
        ),
        media(placeholder('16/9', 'PLACEHOLDER: 10 second recording of a hold being cancelled by moving away, the recovery from a mistake.', 'video')),
        note('content', 'Describe what the screen shows when the camera fails or no hand is found.'),
      ],
      implementation: [
        stack(
          ['React and TypeScript', 'The interface. Each control shares one hold-to-confirm hook, so the contract cannot drift between buttons.'],
          ['MediaPipe hand landmarks', 'Finds the index fingertip. The hand only covers the middle of the camera frame comfortably, so that middle area is stretched to fill the screen.'],
          ['Direct DOM writes for the cursor', 'The dot is moved by writing its transform inside the tracking loop, not through React state. State renders a frame behind the hit test, so the dot you see and the button being pressed disagreed by tens of pixels.'],
          ['Electron shell', 'Exists only so the camera permission sticks. It loads the deployed site so Spotify’s sign-in returns to the right address.'],
          ['Spotify Connect with PKCE', 'Controls the Spotify app already running, with no server of my own.'],
        ),
        text(
          'A cursor landing a couple of centimetres off was not a tracking problem. An ancestor with a CSS transform becomes the containing block for anything fixed inside it, so the dot was laid out in the scaled frame while the hit test read the real viewport. Rendering it outside that frame fixed it. Most tracking problems I met were coordinate problems.',
          'The worst bug froze the whole Mac. After sleep the camera track ends, and a silent catch around detection retried every frame forever. It now counts failures and stops, checks whether the track has ended, and releases the camera before the Mac sleeps.',
        ),
      ],
      accessibility: [
        checks(
          ['done', 'Gestures are never the only way. Every control also works with a mouse, trackpad or touch, and the keyboard covers the session: Space or Enter completes a set, the arrows move and change weight, Escape closes panels.'],
          ['done', 'Feedback does not rely on colour alone: the control grows and the ring fills as you hold.'],
          ['done', 'Large round targets, sized for an imprecise hand at a distance.'],
          ['missing', 'No screen reader pass. The controls need proper names first.'],
          ['missing', 'No reduced motion option and no contrast audit of the red accent on black.'],
        ),
      ],
      validation: [
        claims(
          ['observed', 'Used in my own sessions in the garage.'],
          ['not-validated', 'Nobody else has trained with it.'],
        ),
        note('content', 'Add how many sessions are in the log and over what period.'),
        testPlan({
          participants: 'Three to five people who train at home with a laptop or screen nearby.',
          tasks: ['Complete a three-exercise session without touching anything.', 'Pause the music during a rest.', 'Recover after holding the wrong control.'],
          questions: ['How did you know the system had understood you?', 'When did you want to touch the screen anyway?', 'Did the hold feel slow?'],
          observe: ['Unintended activations.', 'How they position themselves for the camera.', 'Whether they reach for the keyboard instead.'],
          success: ['A full session with no unintended action.', 'They can say what the filling ring means without being told.'],
          priorities: ['Tracking holds up in other rooms and light.', 'Hold to confirm is fast enough mid workout.'],
        }),
      ],
      result: [
        claims(
          ['known', 'A working prototype, installed as a Mac app, with a web version deployed.'],
          ['known', 'Source public on GitHub.'],
          ['planned', 'Bring the public repository up to date with the standby mode and the freeze fix.'],
        ),
      ],
      reflection: [
        text(
          'The most important decision was letting the hand drive ordinary pointer events. It meant the gesture work never had to touch the interface, and the mouse kept working the whole time.',
          'Cutting the swipe taught me to tell an ambiguous design from a badly tuned one. Guards could only ever reduce it.',
          'What I would do differently: check how an event really travels through the system before building on it. All three AirPods attempts were guesses.',
          'What I do not know yet: whether it works for anyone else’s body, room and light. Everything so far has been tested in one garage.',
        ),
      ],
    },
    next: { slug: 'betsy', line: 'Betsy moves from one person and one room to a group of friends, where the hard part is making a game feel fair.' },
  },

  betsy: {
    oneLiner: 'A private league where friends compete on real football fixtures with virtual points, designed so nobody can game the others.',
    role: 'UX research, interface design, product design and iOS development',
    type: 'University project that became a personal product',
    team: 'Solo',
    teamNote: 'Confirm whether the coursework phase (Interface and Graphic Design) had teammates, and who did what.',
    timeline: '',
    timelineNote: 'Add when the coursework happened and how long you have worked on it since.',
    status: 'Prototype on a real backend. Not on the App Store',
    stack: ['SwiftUI', 'Firebase Auth', 'Firestore rules', 'The Odds API', 'Next.js'],
    links: [['Source on GitHub', 'https://github.com/xavibosch/betsy-ios'], ['Product site', 'https://betsy-web-rho.vercel.app']],
    hero: placeholder('16/9', 'PLACEHOLDER: 20 second walkthrough: join a league, place a pick, see the ranking move.', 'video'),
    heroFallback: image('/assets/betsy-v2-league.webp', 'A Betsy private league on iPhone: standings, balance, rank and the bet button.', 'Private league standings, real build', 'screenshot', '9/16'),
    sections: {
      context: [
        text(
          'My group of friends argues about football every week. The predictions, the screenshots and the “I told you so” moments all live in a WhatsApp chat, and disappear there.',
          'The only products that turn that into a game are betting apps, and they want card details. Betsy started as coursework for Interface and Graphic Design, where I researched who it was for and tested the first interface with them.',
        ),
      ],
      problem: [
        text('Betting apps are built to take money from people who cannot afford to lose it. The part my friends actually want, being right in front of each other, needs none of that. What it does need is structure: rules everyone accepts, results nobody can argue with, and a ranking that means something.'),
        claims(
          ['observed', 'Predictions in my friends’ chat are scattered across messages, with no running score.'],
          ['assumed', 'Virtual points carry enough tension without money.'],
        ),
      ],
      audience: [
        text('Betsy is the one project where I did research with the people it was for before designing the screens: I tested the interface with them, mapped their journey and defined target users.'),
        claims(
          ['observed', 'My own friend group, who follow football and already compete informally.'],
          ['assumed', 'Sports fans who enjoy predicting and want their accuracy measured.'],
          ['assumed', 'Small communities, a university group or a team at work, that want their own league.'],
        ),
        note('content', 'Add how many people took part in the coursework tests and one thing that changed because of them.'),
      ],
      evidence: [
        text('The coursework produced a customer journey, target users and test sessions with the intended audience.'),
        gallery(
          placeholder('16/10', 'PLACEHOLDER: the customer journey map from Interface and Graphic Design.', 'diagram'),
          placeholder('16/10', 'PLACEHOLDER: early wireframes or the first tested interface, next to the current one.', 'screenshot'),
        ),
      ],
      assumptions: [
        claims(
          ['assumed', 'A daily limit on bets makes it strategic rather than spammy.'],
          ['assumed', 'One-to-one duels give people a reason to come back between matchdays.'],
          ['known', 'A game shaped like betting still needs care even without money, so the app carries a responsible gaming sheet and a 17+ rating is planned.'],
          ['not-validated', 'Whether a league stays active for a whole season.'],
        ),
      ],
      exploration: [
        options(
          { title: 'Simulated results first', solving: 'Testing whole matchdays without spending API credits or waiting for real fixtures.', pros: 'Every flow could be tried end to end in minutes.', cons: 'A fake result proves nothing about settling real bets.', verdict: 'kept for testing', why: 'Real settlement from final scores replaced it in the product. Markets with no score source settle by a seeded rule that gives the same answer on every phone.' },
          { title: 'Show the rival’s pick in a duel', solving: 'Transparency between two players.', pros: 'Feels open.', cons: 'The second player could copy the odds and win on a tie.', verdict: 'discarded', why: 'The rival’s pick and odds are never shown.' },
          { title: 'Both win when both are right', solving: 'A generous rule for ties.', pros: 'Nobody loses.', cons: 'Nothing is at stake, so a duel stops meaning anything.', verdict: 'discarded', why: 'Now the higher combined odds win a tie, and if both miss, both get their points back.' },
          { title: 'The same duel match for everyone each day', solving: 'A shared match of the day.', pros: 'Simple and social.', cons: 'A second duel on the same day repeated the same match.', verdict: 'discarded', why: 'Each duel draws a random match, never the previous one.' },
        ),
      ],
      decision: [
        decision({
          title: 'Fairness lives in the rules, not in the screen',
          situation: 'Writing the Firestore rules and the SwiftUI views at the same time exposed it: two phones could settle the same bet and pay it twice, because nothing in a screen says who owns that write.',
          options: ['Trust the app and hope two phones never settle at once.', 'Move settlement to a server, which needs Firebase’s paid plan.', 'Guard every payout now with a database transaction and a record per bet that can never be changed, and move to a server later.'],
          decision: 'The third. The interface can ask to settle a bet, only the rules can decide it.',
          reasoning: 'It closed the double payment without paying for infrastructure while the app has a handful of users.',
          tradeoff: 'Points can still be written from the client, so someone using the raw database tools could cheat the ranking. The real fix needs the server.',
          consequence: 'Tested against the Firestore emulator: every rule test passed, and settling the same bet again and again credited it exactly once.',
        }),
      ],
      interaction: [
        text(
          'You create a league or join one with a code. Each league sets its own rules: competitions, starting balance, bets per day and the betting window. You pick matches, build a slip, choose a stake and confirm. Results update your balance and the ranking.',
          'A duel is a three-step flow ending in a roulette that draws the match. The person challenged sees the rules before accepting: you each stake the same, the rival’s odds stay hidden, if both are right the higher odds win and if both miss the points come back. They have five hours to answer.',
          'A contradictory pick is blocked before it reaches the slip. Before kickoff a bet can be withdrawn by holding a button. Everything exists in Spanish and English.',
        ),
        gallery(
          image('/assets/betsy-v2-create.webp', 'Creating a Betsy league on iPhone: daily round time, starting balance and the round’s rules.', 'Creating a league, real build', 'screenshot', '9/16'),
          image('/assets/betsy-v2-markets.webp', 'Betting markets for a fixture, with the picks that contradict the chosen one outlined in red.', 'Contradictory picks are blocked', 'screenshot', '9/16'),
          image('/assets/betsy-v2-betslip.webp', 'Bet slip with two picks from two matches, stake chips, combined odds, potential payout and the balance after.', 'A two-match bet slip', 'screenshot', '9/16'),
          image('/assets/betsy-v2-history.webp', 'An open two-pick bet in the history, with a hold-to-withdraw button available before kickoff.', 'Withdrawing a bet means holding the button', 'screenshot', '9/16'),
          placeholder('9/16', 'PLACEHOLDER: the incoming duel screen with its rules explained.', 'screenshot'),
        ),
      ],
      implementation: [
        stack(
          ['SwiftUI', 'A native iOS app split by feature: onboarding, home, play, league, bets, duels and profile.'],
          ['Firebase Auth and Firestore', 'Accounts, leagues, members and duels. The security rules are where fairness is enforced.'],
          ['The Odds API', 'Real fixtures, odds and final scores, behind a layer that can swap in simulated data. On the free tier a guard stops automatic requests before the shared monthly budget runs out.'],
          ['Next.js', 'The marketing, support and legal site.'],
        ),
        claims(
          ['known', 'A security review closed an email-enumeration hole: profiles were readable by any signed-in user and are now private.'],
          ['known', 'When the free API credits run out, results stop arriving until the month resets. A second key now takes over automatically.'],
          ['planned', 'Server-side points and settlement, which need the paid Firebase plan.'],
        ),
      ],
      accessibility: [
        checks(
          ['reviewed', 'WCAG 2.2 AA is the stated target for every change, and touch targets have been checked against the minimum size when resized.'],
          ['done', 'Every screen in Spanish and English.'],
          ['missing', 'No recorded VoiceOver or Dynamic Type pass.'],
        ),
        note('validation', 'Run VoiceOver through placing a bet and record it.'),
      ],
      validation: [
        claims(
          ['tested', 'The coursework tests with the intended users.'],
          ['tested', 'Rules and payout logic against the Firestore emulator.'],
          ['observed', 'A real bet settled correctly on a real phone from real scores.'],
          ['not-validated', 'Whether a group keeps playing for a whole season, and whether the duel rules feel fair to the person who loses.'],
        ),
        testPlan({
          participants: 'Two friend groups of four to six people, over one full matchday.',
          tasks: ['Join a league with a code.', 'Place a two-pick bet.', 'Challenge someone to a duel and answer one.'],
          questions: ['Who do you think won the duel and why?', 'Does hiding the rival’s odds feel fair?', 'What made you open the app again?'],
          observe: ['Where people misread the stake or the payout.', 'Disputes the rules did not settle.'],
          success: ['Every duel result is understood without me explaining it.', 'Each group places bets on more than one day.'],
          priorities: ['Virtual points carry enough tension.', 'Duels bring people back between matchdays.'],
        }),
      ],
      result: [
        claims(
          ['known', 'A working iOS prototype on a real Firebase backend, with real fixtures and real settlement.'],
          ['known', 'Public source code and a product site.'],
          ['planned', 'TestFlight and the App Store, which need an Apple developer account.'],
        ),
        note('content', 'Is your friends’ league still running on it? Say how many people and since when.'),
      ],
      reflection: [
        text(
          'The most important decision was treating the rules as part of the interface. Most of what makes Betsy feel fair is invisible: hidden odds, refunds when both miss, a payout that can only happen once.',
          'A wireframe cannot show a race between two phones. Designing the screens and the database rules side by side surfaced product problems no static screen could have shown.',
          'What I do not know yet: whether virtual points keep a group playing past the first weeks, and whether every one of these mechanics belongs in a game about friends.',
        ),
        note('decision', 'You added rewarded ads that give points. Decide whether to talk about it here: it is a real product tension worth owning, or leave it out.'),
      ],
    },
    next: { slug: 'jeffrey-desk', line: 'Back to Jeffrey Desk, the one that went furthest: from a personal tool to something a stranger can install.' },
  },
};

export const SECTIONS = [
  ['context', 'Context'],
  ['problem', 'Problem'],
  ['audience', 'Who it is for'],
  ['evidence', 'Where it started'],
  ['assumptions', 'Assumptions'],
  ['exploration', 'Alternatives'],
  ['decision', 'The decision'],
  ['interaction', 'Interaction'],
  ['implementation', 'Implementation'],
  ['accessibility', 'Accessibility'],
  ['validation', 'Validation'],
  ['result', 'Where it stands'],
  ['reflection', 'Reflection'],
];

const translated = { es: caseStudiesEs, ca: caseStudiesCa };
export const caseStudyFor = slug => translated[getLang()]?.[slug] || caseStudies[slug];
