import './foundation.css';
import './wallet.css';
import './folio.css';
import './interaction.css';
import './project-card.css';
import './legibility.css';
import './redesign.css';
import './controls.css';
import './dark.css';
import './vito.css';
import { inject } from '@vercel/analytics';
import gsap from 'gsap';
import { caseView, collectionView, aboutView, contactView, homeMoreView, imageLabel, thumb } from './views';
import { caseStudyFor } from './case-studies';
import { t, getLang, localizeProjects, applyStatic, langSwitch, syncSwitches } from './i18n.js';
import { fullCaseView, EDITING } from './case-view';
import projects from './projects.json';
localizeProjects(projects);
import { createWallet } from './wallet';
import { icon, hydrateIcons } from './icons';
import { mountVito } from './vito';

inject();
hydrateIcons();
import { createWheelNavigation } from './wheel-navigation';

const $ = selector => document.querySelector(selector);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const duration = value => reduced.matches ? 0 : value;
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const email = 'bosch.xavii@gmail.com';
const linkedin = 'https://www.linkedin.com/in/xavier-bosch-galilea-9b3876410';
const github = 'https://github.com/xavibosch';
// The CV in the language the site is showing: /Xavi-Bosch-CV-EN.pdf, -ES, -CA.
// /Xavi-Bosch-CV.pdf keeps all three, for links shared before this existed.
const cvFor = () => `/Xavi-Bosch-CV-${getLang().toUpperCase()}.pdf`;
const syncCvLink = () => $('.footer-cv')?.setAttribute('href', cvFor());
const panel = $('#panel');
const content = $('#panel-content');
let current = 0;
let viewer;
let lastChange = -Infinity;
let currentPanel = '';
let galleryIndex = 0;
let previousFocus;
let toastTimer;

/* ── Tema claro / oscuro ──────────────────────────────────────────────
   Sin elección guardada se sigue al sistema y se reacciona si el sistema
   cambia en caliente. En cuanto el usuario pulsa, su elección manda y deja
   de escucharse al sistema, que es lo que espera quien pulsa un botón. */
const darkQuery = matchMedia('(prefers-color-scheme: dark)');
let themeChoice = null;
try { themeChoice = localStorage.getItem('theme'); } catch { themeChoice = null; }

function isDark(){ return themeChoice ? themeChoice === 'dark' : darkQuery.matches; }

function applyTheme(){
  const dark = isDark();
  /* Always written, even when following the system. Before, a visitor whose
     system was dark got the dark colours but none of the component rules,
     because those all key off this attribute. */
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#15171a' : '#edece5');
  const button = $('#theme-button');
  button.setAttribute('aria-pressed', String(dark));
  button.setAttribute('aria-label', t(dark ? 'theme.toLight' : 'theme.toDark'));
    viewer?.setTheme(dark);
}
$('#theme-button').addEventListener('click', () => {
  themeChoice = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('theme', themeChoice); } catch {}
  applyTheme();
  
});
darkQuery.addEventListener('change', () => { if (!themeChoice) applyTheme(); });
applyTheme();

/* The home holder carries only the three case studies. The rest of the work
   lives in the collection, where it is labelled for what it is. */
const featured=projects.filter(p=>p.featured);
function renderPicker(){$('#featured-picker').innerHTML=featured.map((p,i)=>`<button class="featured-chip" data-feature="${i}" aria-pressed="${projects[current]===p}"><span>${String(i+1).padStart(2,'0')}</span>${escape(p.name)}</button>`).join('');}
renderPicker();

function select(index, direction=1, animate=true){
  current=(index+projects.length)%projects.length;
  const project=projects[current];
  document.documentElement.style.setProperty('--accent',project.color);
  const position=featured.indexOf(project);
  $('#project-number').textContent=String((position<0?current:position)+1).padStart(2,'0');
  $('#project-title').textContent=project.name;
  $('#project-summary').textContent=project.summary;
  $('#current-context').textContent=(project.category||project.context).toUpperCase();
  $('#current-role').textContent=project.role;
  $('#open-project').setAttribute('aria-label',t('home.openLabel',{name:project.name}));
  document.querySelectorAll('.featured-chip').forEach((chip,i)=>chip.setAttribute('aria-pressed',String(i===position)));
  if(position>=0)viewer?.select(position,direction,animate);
  if(animate){
    gsap.fromTo('.caption-copy',{y:14,opacity:0},{y:0,opacity:1,duration:duration(.45),ease:'power2.out',overwrite:true});
    
  }
}
function step(direction,repeat=false){
  if(repeat&&performance.now()-lastChange<180)return;
  lastChange=performance.now();
  select(current+direction,direction);
}
// On the holder, the arrows, the wheel and the side buttons cycle the three.
function homeStep(direction,repeat=false){
  if(repeat&&performance.now()-lastChange<180)return;
  lastChange=performance.now();
  const position=Math.max(0,featured.indexOf(projects[current]));
  select(projects.indexOf(featured[(position+direction+featured.length)%featured.length]),direction);
}
function navigate(path){location.hash=`#/${path}`;}
function openCurrent(){navigate(`work/${projects[current].slug}`);}
$('#prev-project').addEventListener('click',()=>homeStep(-1));
$('#next-project').addEventListener('click',()=>homeStep(1));
$('#open-project').addEventListener('click',openCurrent);
$('#featured-picker').addEventListener('click',e=>{
  const chip=e.target.closest('[data-feature]');
  if(!chip)return;
  const target=projects.indexOf(featured[Number(chip.dataset.feature)]);
  if(target===current)openCurrent();else select(target,target>current?1:-1);
});
$('#index-button').addEventListener('click',()=>navigate('index'));
$('#archive-button').addEventListener('click',()=>navigate('index'));
$('#about-button').addEventListener('click',()=>navigate('about'));
$('#contact-button').addEventListener('click',()=>navigate('contact'));
$('#close-panel').addEventListener('click',()=>navigate(''));
panel.addEventListener('cancel',e=>{if(e.target!==panel)return;e.preventDefault();if(flipped&&panel.dataset.view==='work'){turnCard(false);return;}navigate('');});
panel.addEventListener('close',()=>{viewer?.setActive(true);viewer?.zoomOut();});

const wheelDirection=createWheelNavigation();
document.addEventListener('wheel',e=>{
  // Vito's chat scrolls itself; the wheel only browses cards outside it.
  if(panel.open||e.ctrlKey||e.metaKey||e.target.closest?.('.vito'))return;
  e.preventDefault();
  const direction=wheelDirection(e,performance.now(),innerHeight);
  if(direction)homeStep(direction);
},{passive:false});

document.addEventListener('keydown',e=>{
  if(e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select,[contenteditable="true"]')||panel.querySelector('.lightbox[open]'))return;
  const space=e.code==='Space'||e.key===' ';
  if(!panel.open){
    if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();homeStep(1,e.repeat);}
    if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();homeStep(-1,e.repeat);}
    if(space){e.preventDefault();if(!e.repeat)openCurrent();}
    if(e.key==='Enter'&&document.activeElement===document.body)openCurrent();
  }else if(panel.dataset.view==='work'&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){
    if(e.target.closest('.pcard-track')&&!flipped)return;
    if(e.target.closest('.pcase-story, .cs'))return;
    e.preventDefault();
    if(e.repeat)return;
    const direction=e.key==='ArrowRight'?1:-1;
    // Card turned over: the arrows browse its images. Face up: the projects.
    if(flipped){galleryStep(direction);return;}
    step(direction);
    openCurrent();
  }
});

let caseZoom=[];
function caseTemplate(project){
  const n=projects.length;
  const study=caseStudyFor(project.slug);
  let full='';
  caseZoom=[];
  if(study){
    const next=projects.find(p=>p.slug===study.next.slug);
    ({html:full,zoomable:caseZoom}=fullCaseView(project,study,featured.indexOf(project),next));
  }
  return caseView(project,current,n,[projects[(current-1+n)%n],projects[(current+1)%n]],full);
}

/* The section index follows the reading position. One scroll listener for
   the panel; each rendered case study swaps in its own update. */
let caseSpy;
content.addEventListener('scroll',()=>caseSpy?.(),{passive:true});
function setupFullCase(){
  caseSpy=undefined;
  const toc=content.querySelectorAll('.cs-toc [data-goto]');
  if(!toc.length)return;
  const sections=[...content.querySelectorAll('.cs-section')];
  let frame=0;
  // The current section is the last one whose heading has passed the upper
  // third of the panel.
  const update=()=>{
    frame=0;
    const line=content.getBoundingClientRect().top+content.clientHeight*.34;
    const currentSection=sections.filter(section=>section.getBoundingClientRect().top<line).pop();
    toc.forEach(button=>button.toggleAttribute('aria-current',button.dataset.goto===currentSection?.id));
  };
  caseSpy=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();
  if(reduced.matches)return;
  // Each section settles in as it is reached, once.
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    reveal.unobserve(entry.target);
    gsap.fromTo(entry.target.querySelectorAll('.cs-section-head, .cs-section-body > *'),{y:22,opacity:0},{y:0,opacity:1,duration:.8,stagger:.05,ease:'expo.out',clearProps:'transform,opacity'});
  }),{root:content,rootMargin:'0px 0px -12% 0px'});
  content.querySelectorAll('.cs-section').forEach(section=>reveal.observe(section));
}
const pad=value=>String(value).padStart(2,'0');

/* The back of the card. galleryIndex is the one source of truth: the dots,
   the arrows, the lightbox and a sideways swipe on the track all write it,
   and this puts every other part in step. */
function updateGallery(scroll=true){
  const project=projects[current];
  const track=content.querySelector('.pcard-track');
  if(!track)return;
  const meta=project.imageMeta?.[galleryIndex]||{type:'unknown',caption:''};
  $('#image-counter').textContent=`${pad(galleryIndex+1)} / ${pad(project.images.length)}`;
  const caption=$('#gallery-caption');
  const captionHtml=`<span class="img-tag img-${meta.type}">${escape(imageLabel(meta.type))}</span>${meta.caption?` ${escape(meta.caption)}`:''}`;
  if(caption.innerHTML!==captionHtml){
    caption.innerHTML=captionHtml;
    if(!reduced.matches&&flipped)gsap.fromTo(caption,{opacity:0,y:4},{opacity:1,y:0,duration:.45,ease:'expo.out',overwrite:true});
  }
  content.querySelectorAll('[data-gallery]').forEach(button=>{button.disabled=project.images.length<2;});
  content.querySelectorAll('.pcard-dots [data-image]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.image)===galleryIndex)));
  content.querySelectorAll('.pcard-slide').forEach((slide,i)=>slide.classList.toggle('is-current',i===galleryIndex));
  const slide=track.children[galleryIndex];
  if(scroll&&slide&&track.clientWidth)track.scrollTo({left:slide.offsetLeft-(track.clientWidth-slide.offsetWidth)/2,behavior:scroll==='instant'||reduced.matches?'instant':'smooth'});
}
function galleryStep(direction){
  const length=projects[current].images.length;
  galleryIndex=(galleryIndex+direction+length)%length;
  updateGallery();
}

/* Turning the card is two quarter turns with the faces swapped at the edge,
   where neither is visible. Only one face is ever in the page, so there is
   no backface trick for Safari to get wrong, and the hidden face is out of
   the tab order and the accessibility tree for free. */
let flipped=false;
let turning;
function turnCard(toBack){
  const card=content.querySelector('.pcard');
  if(!card||flipped===toBack)return;
  // A second turn while one is running finishes the first instantly
  // instead of being ignored, so the card can never get stuck half way.
  turning?.progress(1);
  flipped=toBack;
  // On a phone the button that turns it is at the bottom of a tall card.
  // Bring the top back into view so the turn is seen, not just its end.
  const offset=card.getBoundingClientRect().top-content.getBoundingClientRect().top;
  if(offset<0)content.scrollBy({top:offset-12,behavior:reduced.matches?'instant':'smooth'});
  const front=card.querySelector('.pcard-front'), back=card.querySelector('.pcard-back');
  const swap=()=>{
    if(toBack)card.style.minHeight=`${card.offsetHeight}px`;
    front.hidden=toBack;back.hidden=!toBack;card.dataset.side=toBack?'back':'front';
    if(!toBack)card.style.minHeight='';
    if(toBack)updateGallery('instant');
    (toBack?back.querySelector('.pcard-back-turn'):front.querySelector('.pcard-turn')).focus({preventScroll:true});
  };
  if(reduced.matches){swap();return;}
  const direction=toBack?1:-1;
  const timeline=turning=gsap.timeline({onComplete:()=>{turning=undefined;gsap.set(card,{clearProps:'transform'});}});
  // The card lifts as it turns and settles as it lands: a slow start into
  // the edge, then a long deceleration out of it, so it reads as one motion.
  timeline.to(card,{rotateY:90*direction,y:-12,scale:1.02,transformPerspective:1600,duration:.34,ease:'sine.in'})
    .add(()=>{swap();gsap.set(card,{rotateY:-90*direction});})
    .to(card,{rotateY:0,y:0,scale:1,duration:.8,ease:'expo.out'});
  const faceParts=toBack?back.querySelectorAll('.pcard-back-top>*, .pcard-back-foot>*'):front.querySelectorAll('.pcard-top, .pcard-chip, .pcard-title, .pcard-story>div, .pcard-foot');
  if(toBack)timeline.fromTo(back.querySelectorAll('.pcard-slide'),{x:90,opacity:0,rotate:2},{x:0,opacity:1,rotate:0,duration:.9,stagger:.06,ease:'expo.out',clearProps:'transform,opacity'},'<.05');
  timeline.fromTo(faceParts,{y:10,opacity:0},{y:0,opacity:1,duration:.6,stagger:.035,ease:'expo.out',clearProps:'transform,opacity'},toBack?'<.08':'<.12');
}

function setupProjectCard(){
  const track=content.querySelector('.pcard-track');
  const area=content.querySelector('.pcard-area'), hover=content.querySelector('.pcard-hover');
  let frame=0;
  track.addEventListener('scroll',()=>{
    if(frame)return;
    frame=requestAnimationFrame(()=>{
      frame=0;
      if(!track.clientWidth)return;
      const middle=track.scrollLeft+track.clientWidth/2;
      let nearest=0;
      [...track.children].forEach((slide,i)=>{if(Math.abs(slide.offsetLeft+slide.offsetWidth/2-middle)<Math.abs(track.children[nearest].offsetLeft+track.children[nearest].offsetWidth/2-middle))nearest=i;});
      if(nearest!==galleryIndex){galleryIndex=nearest;updateGallery(false);}
    });
  },{passive:true});
  const clamp=value=>Math.max(-.5,Math.min(.5,value));
  area.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse'||reduced.matches)return;
    const r=hover.getBoundingClientRect();
    const x=clamp((e.clientX-r.left)/r.width-.5), y=clamp((e.clientY-r.top)/r.height-.5);
    const strength=flipped?.35:1;
    hover.style.setProperty('--rx',`${(-y*6*strength).toFixed(2)}deg`);
    hover.style.setProperty('--ry',`${(x*8*strength).toFixed(2)}deg`);
    hover.style.setProperty('--mx',`${((x+.5)*100).toFixed(1)}%`);
  });
  area.addEventListener('pointerleave',()=>{for(const v of ['--rx','--ry','--mx'])hover.style.removeProperty(v);});
}

function collectionTemplate(){ return collectionView(projects); }
function revealCollection(){
  const cards=[...content.querySelectorAll('.col-card')];
  if(!cards.length||reduced.matches)return;
  gsap.fromTo(cards,{y:34,opacity:0},{y:0,opacity:1,duration:.8,ease:'expo.out',stagger:.035,overwrite:true,clearProps:'transform,opacity'});
}

function socialLinks(){return `<div class="about-links"><a class="cv-link" href="${cvFor()}" download>${t('links.cv')} <span aria-hidden="true">${icon('arrow-down')}</span></a><a href="${linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn ${icon('arrow-up-right')}</a><a href="${github}" target="_blank" rel="noopener noreferrer">GitHub ${icon('arrow-up-right')}</a><a href="mailto:${email}">${t('links.email')} ${icon('arrow-up-right')}</a></div>`;}
function aboutTemplate(){ return aboutView(socialLinks(),EDITING); }

function setupCard(){
  const stage=$('.card-stage');
  if(!stage||stage.dataset.ready)return;
  stage.dataset.ready='1';
  const card=stage.querySelector('.id-card'), tilt=stage.querySelector('.card-tilt');
  const flip=on=>{card.classList.toggle('is-flipped',on);card.setAttribute('aria-pressed',String(on));};
  // Mouse: hover flips, leaving flips back. Touch and keyboard: a tap or
  // Enter toggles, because there is no hover to rely on.
  // The type of the pointer that pressed decides, because iPhone Safari
  // reports a tap's click as a mouse click and the tap did nothing.
  let pressedWith='';
  card.addEventListener('pointerdown',e=>{pressedWith=e.pointerType;});
  const hover=matchMedia('(hover: hover)');
  card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&hover.matches)flip(true);});
  card.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&hover.matches)flip(false);});
  card.addEventListener('click',()=>{if(pressedWith==='mouse'&&hover.matches)return;flip(!card.classList.contains('is-flipped'));});
  // A div, not a <button>: WebKit wraps a button's contents in an anonymous
  // box that drops preserve-3d, and Safari then drew both faces flat, the
  // photo through the front. So the keyboard behaviour of a button is here.
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip(!card.classList.contains('is-flipped'));}});
  stage.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse'||reduced.matches)return;
    const r=tilt.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    tilt.style.setProperty('--rx',`${(-y*10).toFixed(2)}deg`);
    tilt.style.setProperty('--ry',`${(x*12).toFixed(2)}deg`);
    tilt.style.setProperty('--mx',`${((x+.5)*100).toFixed(1)}%`);
  });
  stage.addEventListener('pointerleave',()=>{for(const v of ['--rx','--ry','--mx'])tilt.style.removeProperty(v);});
}

/* ── The story deck ───────────────────────────────────────────────────
   The long version is a stack of cards instead of a page of text. The top
   card is the one you read; drag it off, use the arrows or pick a chapter,
   and it goes to the back of the stack while the next one rises. One card
   is read at a time, so a long case never turns into a wall. */
let deckState;
function deckSlot(depth,count){
  if(depth===0)return {x:0,y:0,rotate:0,scale:1,opacity:1,zIndex:count};
  return {x:depth*9,y:depth*13,rotate:depth*1.3,scale:1-depth*.035,opacity:depth>3?0:1-depth*.12,zIndex:count-depth};
}
function setupDeck(){
  const root=content.querySelector('.deck');
  if(!root)return;
  const cards=[...root.querySelectorAll('.deck-card')];
  deckState={root,cards,active:0,busy:undefined};
  cards.forEach(card=>{card.hidden=false;});
  const fit=()=>{
    cards.forEach(card=>{card.style.minHeight='';});
    const tallest=Math.max(...cards.map(card=>card.offsetHeight));
    cards.forEach(card=>{card.style.minHeight=`${tallest}px`;});
    root.style.height=`${tallest+52}px`;
    placeDeck(false);
  };
  new ResizeObserver(fit).observe(root);
  fit();
  // The stack deals itself out the first time it scrolls into view.
  const seen=new IntersectionObserver(entries=>{
    if(!entries.some(entry=>entry.isIntersecting))return;
    seen.disconnect();
    if(reduced.matches)return;
    gsap.from(cards,{y:90,rotate:0,opacity:0,duration:.9,stagger:{each:.07,from:'end'},ease:'expo.out'});
  },{root:content,threshold:.25});
  seen.observe(root);
  // Drag the top card away, like dealing it off the pile.
  let drag;
  root.addEventListener('pointerdown',e=>{
    const card=e.target.closest('.deck-card');
    if(!card||Number(card.dataset.deckCard)!==deckState.active||e.target.closest('a,button')||e.button>0)return;
    drag={card,x:e.clientX,y:e.clientY,dx:0,id:e.pointerId,moved:false};
  });
  root.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    drag.dx=e.clientX-drag.x;
    if(!drag.moved){
      if(Math.abs(drag.dx)<6)return;
      if(Math.abs(e.clientY-drag.y)>Math.abs(drag.dx)){drag=undefined;return;}
      drag.moved=true;drag.card.setPointerCapture(e.pointerId);drag.card.classList.add('is-dragging');
    }
    gsap.set(drag.card,{x:drag.dx,rotate:drag.dx*.035,y:-Math.min(Math.abs(drag.dx)*.05,12)});
  });
  const release=e=>{
    if(!drag||e.pointerId!==drag.id)return;
    const {card,dx,moved}=drag;drag=undefined;
    card.classList.remove('is-dragging');
    if(!moved)return;
    if(Math.abs(dx)>90)deckGo(deckState.active+(dx<0?1:-1),dx<0?1:-1,true);
    else gsap.to(card,{x:0,y:0,rotate:0,duration:.6,ease:'elastic.out(1,.65)'});
  };
  root.addEventListener('pointerup',release);
  root.addEventListener('pointercancel',release);
}
function placeDeck(animate=true){
  const {cards,active}=deckState, count=cards.length;
  cards.forEach((card,i)=>{
    const depth=(i-active+count)%count;
    card.inert=depth!==0;
    card.setAttribute('aria-hidden',String(depth!==0));
    // Stacking order changes at once; only the position is animated, so a
    // card sent to the back slides under the pile instead of over it.
    const {zIndex,...slot}=deckSlot(depth,count);
    gsap.set(card,{zIndex});
    if(animate&&!reduced.matches)gsap.to(card,{...slot,duration:.75,delay:depth*.03,ease:'expo.out',overwrite:'auto'});
    else gsap.set(card,slot);
  });
  content.querySelectorAll('[data-deck-to]').forEach(tab=>{
    const selected=Number(tab.dataset.deckTo)===active;
    tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;
  });
  const tab=content.querySelector(`[data-deck-to="${active}"]`), marker=content.querySelector('.deck-marker');
  if(tab&&marker)gsap.to(marker,{y:tab.offsetTop,x:tab.offsetLeft,width:tab.offsetWidth,height:tab.offsetHeight,duration:animate&&!reduced.matches?.6:0,ease:'expo.out'});
  const counter=$('#deck-count');
  if(counter)counter.textContent=`${pad(active+1)} / ${pad(count)}`;
}
function deckGo(to,direction,fromDrag=false){
  if(!deckState)return;
  const {cards}=deckState, count=cards.length;
  const next=(to+count)%count;
  if(next===deckState.active)return;
  direction||=next>deckState.active?1:-1;
  deckState.busy?.progress(1);
  const leaving=cards[deckState.active];
  deckState.active=next;
  if(reduced.matches){placeDeck(false);return;}
  if(direction>0){
    // The top card is dealt off to the left, then slides under the pile.
    deckState.busy=gsap.timeline({onComplete:()=>{deckState.busy=undefined;}})
      .to(leaving,{x:-leaving.offsetWidth*.75,y:-24,rotate:-9,duration:fromDrag?.28:.38,ease:'power2.in'})
      .add(()=>placeDeck(true));
  }else{
    // Going back, the card comes off the bottom of the pile and lands on top.
    const arriving=cards[next];
    gsap.set(arriving,{zIndex:count+1});
    deckState.busy=gsap.timeline({onComplete:()=>{deckState.busy=undefined;}})
      .to(arriving,{x:-arriving.offsetWidth*.75,y:-24,rotate:-9,opacity:1,duration:.3,ease:'power2.out'})
      .add(()=>placeDeck(true));
  }
}

/* The group buttons filter the collection instead of scrolling to a group:
   one group shows on its own, and pressing it again (or All) shows them all. */
function filterCollection(id){
  const current=content.querySelector('.col-jump [aria-pressed="true"]')?.dataset.group;
  if(id===current&&id!=='all')id='all';
  content.querySelectorAll('.col-jump [data-group]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.group===id)));
  const shown=[...content.querySelectorAll('.col-group')].filter(section=>{
    const on=id==='all'||section.id===`group-${id}`;
    section.hidden=!on;
    return on;
  });
  const top=content.querySelector('.col-jump').getBoundingClientRect().top-content.getBoundingClientRect().top+content.scrollTop-16;
  if(content.scrollTop>top)content.scrollTo({top,behavior:reduced.matches?'instant':'smooth'});
  if(!reduced.matches)gsap.fromTo(shown.flatMap(s=>[...s.querySelectorAll('.col-group header, .col-card')]),{opacity:0,y:14},{opacity:1,y:0,duration:.45,stagger:.035,ease:'power3.out',overwrite:true});
}

/* Phone home: the three case studies as a swipeable row, one card at a
   time with the next ones peeking in. It loops: the row starts and ends
   with copies, and landing on a copy jumps, without animation, to the card
   it copies. The dots follow and can be tapped. */
function renderHomeMore(){
  $('#home-more').innerHTML=homeMoreView(featured,{email,linkedin,github,cv:cvFor()});
  const list=$('#home-more .hm-list');
  const cards=[...list.querySelectorAll('.hm-card')];
  const dots=[...document.querySelectorAll('#home-more [data-hm-dot]')];
  const left=slot=>cards[slot].offsetLeft-(list.clientWidth-cards[slot].offsetWidth)/2;
  const nearest=()=>cards.reduce((best,card,slot)=>Math.abs(left(slot)-list.scrollLeft)<Math.abs(left(best)-list.scrollLeft)?slot:best,0);
  const mark=slot=>dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===Number(cards[slot].dataset.slide))));
  let settle;
  const land=()=>{
    const slot=nearest();
    if(slot===0||slot===cards.length-1){
      const real=slot===0?cards.length-2:1;
      list.scrollTo({left:left(real),behavior:'instant'});
    }
  };
  list.addEventListener('scroll',()=>{mark(nearest());clearTimeout(settle);settle=setTimeout(land,140);},{passive:true});
  dots.forEach((dot,i)=>dot.addEventListener('click',()=>list.scrollTo({left:left(i+1),behavior:reduced.matches?'instant':'smooth'})));
  const start=()=>list.scrollTo({left:left(1),behavior:'instant'});
  start();
  new ResizeObserver(start).observe(list);
}

function contactTemplate(){ return contactView(email,socialLinks()); }

/* Moving between views inside the open folio. Neighbouring projects slide
   sideways in the direction you went; everything else rises into place. */
async function swapOut(direction){
  const old=content.firstElementChild;
  if(!panel.open||reduced.matches||!old)return;
  await gsap.to(old,{opacity:0,x:direction*-36,y:direction?0:-10,duration:.22,ease:'power2.in'});
}
function swapIn(direction){
  const fresh=content.firstElementChild;
  if(!panel.open||reduced.matches||!fresh)return;
  gsap.fromTo(fresh,{opacity:0,x:direction*48,y:direction?0:16},{opacity:1,x:0,y:0,duration:.7,ease:'expo.out',clearProps:'transform,opacity'});
}

/* Images are fetched before they are needed: a project's whole set as soon
   as it opens (the back of the card is hidden, so lazy loading would wait
   for the turn), and the three case studies while the home page is idle. */
const preloaded=new Set();
function preloadImages(list){
  for(const src of list){
    if(preloaded.has(src))continue;
    preloaded.add(src);
    const img=new Image();img.decoding='async';img.src=src;
  }
}
(window.requestIdleCallback||(fn=>setTimeout(fn,1200)))(()=>{
  featured.forEach(p=>preloadImages(p.images.slice(0,2)));
  preloadImages(projects.map(p=>thumb(p.images[0])));
});

let routeRevision=0;
async function route(){
  const revision=++routeRevision;
  const parts=location.hash.replace(/^#\/?/,'').split('/');
  const view=parts[0];
  if(!view){
    if(panel.open){
      await gsap.to(panel,{opacity:0,y:reduced.matches?0:22,scale:reduced.matches?1:.975,duration:duration(.3),ease:'power2.in'});
      if(revision!==routeRevision)return;
      panel.close();previousFocus?.focus();
    }
    currentPanel='';document.title=t('title.home');return;
  }
  if(!['index','about','contact','work'].includes(view)){history.replaceState(null,'','#/');return;}
  panel.dataset.view=view;
  panel.querySelectorAll('.panel-nav a').forEach(link=>{
    if(link.dataset.view===view||(view==='work'&&link.dataset.view==='index'))link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  if(view==='work'){
    const index=projects.findIndex(p=>p.slug===parts[1]);
    if(index===-1){navigate('index');return;}
    select(index,1,false);
    const project=projects[index];
    if(currentPanel!==project.slug){
      const previous=projects.findIndex(p=>p.slug===currentPanel), n=projects.length;
      const direction=previous<0?0:(previous+1)%n===index?1:(previous-1+n)%n===index?-1:1;
      await swapOut(direction);
      if(revision!==routeRevision)return;
      preloadImages(project.images);
      turning?.kill();turning=undefined;galleryIndex=0;flipped=false;content.innerHTML=caseTemplate(project);content.scrollTop=0;
      currentPanel=project.slug;setupProjectCard();setupDeck();setupFullCase();updateGallery(false);
      swapIn(direction);
    }
    $('#panel-label').textContent=t('panel.work');
    document.title=`${project.name} — Xavi Bosch`;
  }else{
    const fresh=currentPanel!==view;
    if(fresh){
      await swapOut(0);
      if(revision!==routeRevision)return;
      content.innerHTML=view==='index'?collectionTemplate():view==='about'?aboutTemplate():contactTemplate();content.scrollTop=0;currentPanel=view;
      swapIn(0);
    }
    if(view==='about')setupCard();
    if(view==='index'&&(fresh||!panel.open))requestAnimationFrame(revealCollection);
    $('#panel-label').textContent=t(view==='index'?'panel.index':view==='about'?'panel.about':'panel.contact');
    document.title=`${t(view==='index'?'title.index':view==='about'?'title.about':'title.contact')} — Xavi Bosch`;
  }
  if(!panel.open){
    previousFocus=document.activeElement;
    viewer?.zoomIn();
    panel.showModal();
    gsap.fromTo(panel,{opacity:0,y:reduced.matches?0:40,scale:reduced.matches?1:.965,transformOrigin:'50% 70%'},{opacity:1,y:0,scale:1,duration:duration(.75),ease:'expo.out',clearProps:'transform',onComplete:()=>{if(panel.open)viewer?.setActive(false);}});
    // Focus goes to the folio itself, not to a button: a programmatic focus
    // on the close button drew a keyboard ring after a mouse click. The
    // next Tab still lands on the panel's own controls.
    panel.querySelector('.panel-shell').focus({preventScroll:true});
    
  }else{gsap.to(panel,{opacity:1,y:0,scale:1,duration:.1,clearProps:'transform'});}
}

content.addEventListener('click',async e=>{
  const smooth=reduced.matches?'instant':'smooth';
  const goto=e.target.closest('[data-goto]');
  if(goto){const target=content.querySelector(`#${goto.dataset.goto}`);target?.scrollIntoView({behavior:smooth,block:'start'});target?.querySelector('h3')?.focus({preventScroll:true});return;}
  const group=e.target.closest('[data-group]');
  if(group){filterCollection(group.dataset.group);return;}
  const zoom=e.target.closest('[data-zoom]');
  if(zoom){openLightbox({items:caseZoom,index:Number(zoom.dataset.zoom),source:zoom.querySelector('img')});return;}
  const openProject=e.target.closest('[data-open-project]');
  if(openProject){navigate(`work/${openProject.dataset.openProject}`);return;}
  const action=e.target.closest('[data-action]')?.dataset.action;
  if(action==='collection'){navigate('index');return;}
  if(action==='top'){content.scrollTo({top:0,behavior:smooth});return;}
  if(action==='case'){$('#full-case')?.scrollIntoView({behavior:smooth,block:'start'});$('#cs-title')?.focus({preventScroll:true});return;}
  if(action==='turn'){turnCard(!flipped);return;}
  if(action==='prev-case'){select(current-1,-1);openCurrent();return;}
  if(action==='story'){$('#full-story')?.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});return;}
  // The whole face turns the card, except its own links and buttons.
  if(e.target.closest('.pcard-front')&&!e.target.closest('a,button')){turnCard(true);return;}
  if(e.target.closest('.pcard-slide img')){openLightbox();return;}
  const deckStep=e.target.closest('[data-deck]');
  if(deckStep){deckGo((deckState?.active||0)+Number(deckStep.dataset.deck),Number(deckStep.dataset.deck));return;}
  const deckTab=e.target.closest('[data-deck-to]');
  if(deckTab){deckGo(Number(deckTab.dataset.deckTo));return;}
  const thumbnail=e.target.closest('[data-image]');
  if(thumbnail){galleryIndex=Number(thumbnail.dataset.image);updateGallery();return;}
  const project=e.target.closest('[data-project]');
  if(project){
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();select(Number(project.dataset.project));openCurrent();return;
  }
  const gallery=e.target.closest('[data-gallery]');
  if(gallery){galleryStep(Number(gallery.dataset.gallery));return;}
  if(action==='next-case'){select(current+1);openCurrent();}
  if(action==='expand')openLightbox();
  if(action==='copy'){
    /* El aviso flotante sale abajo del todo y el botón está arriba, así que
       quien pulsa mira al botón y no ve nada. La confirmación tiene que
       ocurrir donde está el dedo: el icono pasa a visto, el botón se pinta
       de color y vuelve solo a los dos segundos. */
    const button=e.target.closest('[data-action="copy"]');
    if(await copyText(email)){
      notify(t('toast.copied'));
      if(button){
        clearTimeout(Number(button.dataset.timer));
        button.classList.add('is-copied');
        button.innerHTML=icon('check');
        button.setAttribute('aria-label',t('copy.done'));
        button.dataset.timer=String(setTimeout(()=>{
          button.classList.remove('is-copied');
          button.innerHTML=icon('copy');
          button.setAttribute('aria-label',t('copy.label'));
        },2000));
      }
    }else{
      notify(t('toast.byHand',{email}));
    }
  }
});
/* The enlarged image is always the whole image: it is sized to whatever the
   window leaves after the bar, never wider or taller, so nothing ever needs
   scrolling to be seen in full. Arrows browse, Escape closes. */
/* Where an object-fit: contain image is actually drawn inside its box. */
function drawnRect(img){
  const box=img.getBoundingClientRect();
  if(!img.naturalWidth)return box;
  const scale=Math.min(box.width/img.naturalWidth,box.height/img.naturalHeight);
  const width=img.naturalWidth*scale, height=img.naturalHeight*scale;
  return {left:box.left+(box.width-width)/2,top:box.top+(box.height-height)/2,width,height};
}

/* The enlarged view grows out of the image you clicked and shrinks back into
   the one you are on when it closes: a window that opens from the card
   (clip-path) with the picture flying inside it (FLIP). */
/* Two sources: the images on the back of the card, or the images inside a
   case study (custom), each with its own caption and evidence label. */
function openLightbox(custom){
  const project=projects[current];
  const items=custom?custom.items.map(item=>({src:item.src,alt:item.alt,caption:item.caption,type:item.evidence}))
    :project.images.map((src,i)=>({src,caption:project.imageMeta?.[i]?.caption||'',type:project.imageMeta?.[i]?.type||'unknown'}));
  let index=custom?custom.index:galleryIndex;
  const box=document.createElement('dialog');
  box.className='lightbox';
  box.setAttribute('aria-label',t('lightbox.label',{name:project.name}));
  box.innerHTML=`<div class="lightbox-bar"><p class="lightbox-caption"></p><span class="lightbox-count"></span><button class="lightbox-close">${t('lightbox.close')} <span aria-hidden="true">${icon('close')}</span></button></div>
    <div class="lightbox-stage"><button class="lightbox-arrow" data-step="-1" aria-label="${t('lightbox.prev')}">${icon('arrow-left')}</button><img alt="" /><button class="lightbox-arrow" data-step="1" aria-label="${t('lightbox.next')}">${icon('arrow-right')}</button></div>`;
  panel.appendChild(box);
  const img=box.querySelector('img');
  const show=(i,dir=0)=>{
    index=(i+items.length)%items.length;
    const item=items[index];
    img.src=item.src;
    img.alt=item.alt||`${project.name}: ${item.caption||t('lightbox.image',{n:index+1})}`;
    box.querySelector('.lightbox-caption').innerHTML=`<span class="img-tag img-${item.type}">${escape(imageLabel(item.type))}</span> ${escape(item.caption||'')}`;
    box.querySelector('.lightbox-count').textContent=`${String(index+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
    if(dir&&!reduced.matches)gsap.fromTo(img,{opacity:0,x:dir*60,scale:.97},{opacity:1,x:0,scale:1,duration:.6,ease:'expo.out',overwrite:true});
    if(!custom){galleryIndex=index;updateGallery();}
  };
  const sourceImage=()=>custom?content.querySelectorAll('[data-zoom] img')[index]:content.querySelector('.pcard-slide.is-current img');
  const windowFrom=rect=>{
    const b=box.getBoundingClientRect();
    return `inset(${rect.top-b.top}px ${b.right-rect.left-rect.width}px ${b.bottom-rect.top-rect.height}px ${rect.left-b.left}px round 12px)`;
  };
  const flight=rect=>{
    const target=img.getBoundingClientRect();
    return {x:rect.left-target.left,y:rect.top-target.top,scale:rect.width/target.width,transformOrigin:'0 0'};
  };
  let closing=false;
  const close=()=>{
    if(closing)return;
    closing=true;
    if(!custom)updateGallery('instant');
    const source=sourceImage();
    if(reduced.matches||!source||!img.naturalWidth){box.close();return;}
    const rect=drawnRect(source);
    gsap.timeline({onComplete:()=>box.close()})
      .to(box.querySelectorAll('.lightbox-bar, .lightbox-arrow'),{opacity:0,duration:.15},0)
      .to(img,{...flight(rect),duration:.45,ease:'expo.inOut'},0)
      .to(box,{clipPath:windowFrom(rect),duration:.45,ease:'expo.inOut'},0)
      .to(box,{'--lightbox-fade':0,duration:.45},0);
  };
  box.querySelectorAll('.lightbox-arrow').forEach(b=>{b.hidden=items.length<2;b.addEventListener('click',()=>{show(index+Number(b.dataset.step),Number(b.dataset.step));});});
  box.querySelector('.lightbox-close').addEventListener('click',close);
  box.addEventListener('cancel',e=>{e.preventDefault();close();});
  box.addEventListener('click',e=>{if(e.target===box||e.target.classList.contains('lightbox-stage'))close();});
  box.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();e.stopPropagation();const d=e.key==='ArrowRight'?1:-1;show(index+d,d);}});
  box.addEventListener('close',()=>{box.remove();(custom?sourceImage()?.closest('button'):content.querySelector('.pcard-back [data-action="expand"]'))?.focus({preventScroll:true});},{once:true});
  const source=sourceImage();
  const from=source?drawnRect(source):null;
  show(index);
  box.tabIndex=-1;
  box.showModal();
  box.focus({preventScroll:true});
  if(reduced.matches)return;
  const grow=()=>{
    if(!from){gsap.fromTo(box,{opacity:0,scale:.97},{opacity:1,scale:1,duration:.5,ease:'expo.out'});return;}
    gsap.timeline()
      .fromTo(box,{clipPath:windowFrom(from),'--lightbox-fade':0},{clipPath:'inset(0px 0px 0px 0px round 19px)','--lightbox-fade':1,duration:.7,ease:'expo.out',clearProps:'clipPath'},0)
      .fromTo(img,flight(from),{x:0,y:0,scale:1,duration:.7,ease:'expo.out',clearProps:'transform'},0)
      .fromTo(box.querySelectorAll('.lightbox-bar>*, .lightbox-arrow'),{opacity:0,y:-6},{opacity:1,y:0,duration:.5,stagger:.04,ease:'expo.out',clearProps:'transform,opacity'},.2);
  };
  if(img.complete&&img.naturalWidth)grow();
  else{gsap.set(img,{opacity:0});img.addEventListener('load',()=>{gsap.set(img,{opacity:1});grow();},{once:true});}
}

let reflectionFrame=0;
let reflectionTarget;
let reflectionPoint;
panel.addEventListener('pointermove',event=>{
  if(reduced.matches||event.pointerType!=='mouse')return;
  const surface=event.target.closest('[data-reflect]');
  if(!surface)return;
  const box=surface.getBoundingClientRect();
  reflectionTarget=surface;
  reflectionPoint={x:(event.clientX-box.left)/box.width*100,y:(event.clientY-box.top)/box.height*100};
  if(!reflectionFrame)reflectionFrame=requestAnimationFrame(()=>{
    reflectionFrame=0;
    if(!reflectionTarget.isConnected)return;
    reflectionTarget.style.setProperty('--reflect-x',reflectionPoint.x+'%');
    reflectionTarget.style.setProperty('--reflect-y',reflectionPoint.y+'%');
  });
});


/* navigator.clipboard es lo correcto pero se cae en más sitios de los que
   parece: sin https, en Safari antiguo y siempre que el documento no tenga
   el foco. El textarea oculto con execCommand está obsoleto y sigue siendo
   la red de seguridad que funciona en todos ellos. Sólo se confirma al
   usuario si una de las dos vías ha copiado de verdad. */
content.addEventListener('keydown',e=>{
  if(!e.target.closest('.pcase-story')||!deckState)return;
  const keys={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1};
  if(!(e.key in keys))return;
  e.preventDefault();
  deckGo(deckState.active+keys[e.key],keys[e.key]);
  if(e.target.closest('[data-deck-to]'))content.querySelector(`[data-deck-to="${deckState.active}"]`)?.focus();
});

async function copyText(text){
  try{ await navigator.clipboard.writeText(text); return true; }catch{}
  try{
    const field=document.createElement('textarea');
    field.value=text;
    field.setAttribute('readonly','');
    field.style.cssText='position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(field);
    field.select();
    field.setSelectionRange(0,text.length);
    const done=document.execCommand('copy');
    field.remove();
    return done;
  }catch{ return false; }
}

function notify(message){
  clearTimeout(toastTimer);$('#toast').textContent=message;
  gsap.to('#toast',{opacity:1,y:0,duration:.2});
  toastTimer=setTimeout(()=>gsap.to('#toast',{opacity:0,y:20,duration:.2}),2500);
}
function updateTime(){$('#local-time').textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Madrid'}).format(new Date());}
updateTime();setInterval(updateTime,30000);
addEventListener('hashchange',route);
viewer=createWallet($('#scene'),featured,{
  onSelect: position => {const index=projects.indexOf(featured[position]);select(index,index>current?1:-1);},
  onOpen: openCurrent,
  onAbout: () => navigate('about'),
  onContact: () => navigate('contact'),
});
renderHomeMore();
select(0,1,false);route();

/* On phones and tablets the headline sits above (or beside) the holder and
   the project caption below it. The holder is drawn at a scale, centred in
   the scene, so how far its cards reach up and its sleeve reaches down is
   proportional to that scale. One measurement gives those two distances
   per unit of scale; from them the largest scale that fits between the
   headline (22px clear) and the caption (14px clear) is worked out, and
   the scene is placed so the holder sits exactly there. One pass, and a
   newer request cancels an older one, so the result never depends on how
   many times it ran. On a Mac-sized window the layout leaves the room. */
const compact=matchMedia('(max-width: 1100px)');
const across=(a,b)=>a.left<b.right&&b.left<a.right;
let fitRequest=0;
function clearHeadline(){
  const request=++fitRequest;
  const scene=$('#scene');
  scene.style.removeProperty('top');scene.style.removeProperty('bottom');
  if(!compact.matches)return;
  setTimeout(()=>{
    if(request!==fitRequest)return;
    const box=scene.getBoundingClientRect(), studio=scene.offsetParent.getBoundingClientRect();
    const scale=parseFloat(getComputedStyle(scene.querySelector('.wallet-fit')).getPropertyValue('--wallet-scale'));
    if(!scale||!box.height)return;
    const note=$('.studio-note').getBoundingClientRect(), caption=$('.selected-project').getBoundingClientRect();
    const cards=[...scene.querySelectorAll('.wallet-card')].map(card=>card.getBoundingClientRect());
    const centre=box.top+box.height/2;
    const above=(centre-Math.min(...cards.map(c=>c.top)))/scale;
    const below=(scene.querySelector('.sleeve-front').getBoundingClientRect().bottom-centre)/scale;
    const ceiling=cards.some(c=>across(c,note))?note.bottom+22:studio.top+8;
    const floor=caption.top-14;
    const fitted=Math.min(box.width/(box.width<600?870:1060),(floor-ceiling)/(above+below),1.16);
    const height=770*fitted, middle=ceiling+above*fitted;
    scene.style.top=`${middle-height/2-studio.top}px`;
    scene.style.bottom=`${studio.bottom-(middle+height/2)}px`;
  },80);
}
clearHeadline();
document.fonts?.ready.then(()=>clearHeadline());
let headlineTimer;
addEventListener('resize',()=>{clearTimeout(headlineTimer);headlineTimer=setTimeout(clearHeadline,120);});
addEventListener('langchange',()=>clearHeadline());
mountVito({panel});

/* The language switch lives in the header (its corner on a Mac or iPad, after the navigation on a phone) and in
   the rim of the open panel, so it is always one tap away. Changing it
   re-renders whatever is on screen in place. */
document.querySelectorAll('[data-lang-slot]').forEach(slot=>{slot.innerHTML=langSwitch();});
applyStatic();
syncCvLink();
addEventListener('langchange',()=>{
  localizeProjects(projects);
  syncCvLink();
  applyStatic();syncSwitches();applyTheme();renderPicker();
  viewer?.retranslate();select(current,0,false);
  renderHomeMore();
  if(panel.open){
    const scroll=content.scrollTop;
    currentPanel='';
    route().then(()=>{content.scrollTop=scroll;});
  }else document.title=t('title.home');
});
document.documentElement.dataset.viewer='ready';
