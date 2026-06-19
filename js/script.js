/* ── Theme toggle ────────────────────── */
var root=document.documentElement;
var thBtn=document.getElementById('theme-toggle');
var dark=true;
thBtn.addEventListener('click',function(){
  dark=!dark;
  root.setAttribute('data-theme',dark?'dark':'light');
  thBtn.textContent=dark?'🌙':'☀️';
});

/* ── Typewriter ──────────────────────── */
var phrases=['Backend Developer','Python Engineer','FastAPI Specialist','API Architect','Remote Builder'];
var pi=0,ci=0,del=false;
var typed=document.getElementById('typed');
function tw(){
  var ph=phrases[pi];
  if(!del){typed.textContent=ph.slice(0,++ci);if(ci===ph.length){setTimeout(function(){del=true;tw();},2000);return;}setTimeout(tw,55+Math.random()*35);}
  else{typed.textContent=ph.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length;setTimeout(tw,350);return;}setTimeout(tw,25);}
}
setTimeout(tw,1000);

/* ── Counter animation ───────────────── */
function animCount(el){
  var target=parseInt(el.dataset.target);
  if(isNaN(target))return;
  var start=0,dur=1400,step=dur/target;
  var timer=setInterval(function(){
    start++;el.textContent=start;
    if(start>=target)clearInterval(timer);
  },step<16?16:step);
}

/* ── Scroll reveal ───────────────────── */
var revObs=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting)return;
    var el=entry.target;
    var sibs=el.parentElement.querySelectorAll('.rv,.rvl,.rvr');
    var idx=0;sibs.forEach(function(s,i){if(s===el)idx=i;});
    setTimeout(function(){
      el.classList.add('in');
      el.querySelectorAll('[data-target]').forEach(animCount);
    },idx*90);
    revObs.unobserve(el);
  });
},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.rv,.rvl,.rvr').forEach(function(el){revObs.observe(el);});

/* ── Progress bar ────────────────────── */
var prog=document.getElementById('scroll-prog');
window.addEventListener('scroll',function(){
  var s=document.documentElement.scrollTop;
  var h=document.documentElement.scrollHeight-window.innerHeight;
  prog.style.width=(s/h*100)+'%';
},{passive:true});

/* ── Nav ─────────────────────────────── */
var nav=document.getElementById('nav');
var navAs=document.querySelectorAll('.nl a');
var sects=document.querySelectorAll('section[id]');
window.addEventListener('scroll',function(){
  var sy=window.scrollY;
  nav.classList.toggle('sc',sy>55);
  document.getElementById('btt').classList.toggle('on',sy>400);
  var cur2='';sects.forEach(function(s){if(sy>=s.offsetTop-88)cur2=s.id;});
  navAs.forEach(function(a){a.classList.toggle('ac',a.getAttribute('href')==='#'+cur2);});
},{passive:true});

/* ── Hamburger ───────────────────────── */
var ham=document.getElementById('hamburger');
var mob=document.getElementById('mob-nav');
var mo=false;
ham.addEventListener('click',function(){
  mo=!mo;ham.classList.toggle('open',mo);
  mob.style.display=mo?'flex':'none';
  requestAnimationFrame(function(){mob.classList.toggle('open',mo);});
});
mob.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click',function(){
    mo=false;ham.classList.remove('open');mob.classList.remove('open');
    setTimeout(function(){mob.style.display='none';},300);
  });
});

/* ── Cursor blob ─────────────────────── */
var blob=document.getElementById('cursor-blob');
if(window.innerWidth>900){
  document.addEventListener('mousemove',function(e){
    blob.style.left=e.clientX+'px';blob.style.top=e.clientY+'px';
  },{passive:true});
}else{blob.style.display='none';}

/* ── Back to top ─────────────────────── */
document.getElementById('btt').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});

/* ── Form focus ──────────────────────── */
document.querySelectorAll('.fi,.fta').forEach(function(inp){
  var fg=inp.closest('.fg');
  inp.addEventListener('focus',function(){fg.classList.add('foc');});
  inp.addEventListener('blur',function(){
    fg.classList.remove('foc');
    if(inp.value)vf(fg.id,inp.value);
  });
});

/* ── Char counter ────────────────────── */
var fmsg=document.getElementById('f-msg');
var cc=document.getElementById('charc');
if(fmsg)fmsg.addEventListener('input',function(){
  cc.textContent=this.value.length+' / 500';
  cc.style.color=this.value.length>450?'#f87171':'var(--txt3)';
});

/* ── Validation ──────────────────────── */
var rx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function vf(id,val){
  var fg=document.getElementById(id);
  var bad=false;
  if(id==='fg-email')bad=!rx.test(val);
  else if(id==='fg-msg')bad=val.trim().length<20;
  else bad=!val.trim();
  fg.classList.toggle('err',bad&&!!val);
  fg.classList.toggle('ok',!bad&&!!val);
  return !bad||!val;
}
function vallAll(){
  var ok=true;
  [['fg-name','f-name'],['fg-email','f-email'],['fg-subject','f-subject'],['fg-msg','f-msg']]
  .forEach(function(p){
    var val=document.getElementById(p[1]).value;
    var fg=document.getElementById(p[0]);
    var bad=false;
    if(p[0]==='fg-email')bad=!rx.test(val);
    else if(p[0]==='fg-msg')bad=val.trim().length<20;
    else bad=!val.trim();
    fg.classList.toggle('err',bad);fg.classList.toggle('ok',!bad);
    if(bad)ok=false;
  });
  return ok;
}

/* ── Form submit (Formspree JSON) ────── */
var form=document.getElementById('contact-form');
var bs=document.getElementById('bsend');
var tok=document.getElementById('tok');
var terr=document.getElementById('terr');

if(form)form.addEventListener('submit',function(e){
  e.preventDefault();
  tok.classList.remove('show');terr.classList.remove('show');
  if(!vallAll())return;
  bs.classList.add('ld');bs.disabled=true;
  fetch('https://formspree.io/f/mnjyjddp',{
    method:'POST',
    headers:{'Content-Type':'application/json','Accept':'application/json'},
    body:JSON.stringify({
      name:document.getElementById('f-name').value.trim(),
      email:document.getElementById('f-email').value.trim(),
      subject:document.getElementById('f-subject').value.trim(),
      message:document.getElementById('f-msg').value.trim()
    })
  }).then(function(r){
    bs.classList.remove('ld');bs.disabled=false;
    if(r.ok){
      tok.classList.add('show');
      form.reset();
      ['fg-name','fg-email','fg-subject','fg-msg'].forEach(function(id){
        var g=document.getElementById(id);g.classList.remove('ok','err');
      });
      if(cc)cc.textContent='0 / 500';
    }else{terr.classList.add('show');}
  }).catch(function(){bs.classList.remove('ld');bs.disabled=false;terr.classList.add('show');});
});

/* ── PARTICLES CANVAS ────────────────── */
  (function(){
  var c=document.getElementById('cnv');if(!c)return;
  var ctx=c.getContext('2d');
  var W,H,pts=[];
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize,{passive:true});
  for(var i=0;i<80;i++){
    pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()*1.4+.3,a:Math.random(),da:Math.random()*.008+.003,grow:Math.random()<.5});
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    var dk2=document.documentElement.getAttribute('data-theme')==='dark';
    pts.forEach(function(p){
      if(p.grow)p.a+=p.da;else p.a-=p.da;
      if(p.a>=1)p.grow=false;if(p.a<=0)p.grow=true;
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=dk2?'rgba(0,255,204,'+p.a*.5+')':'rgba(0,140,106,'+p.a*.25+')';
      ctx.fill();
    });
    for(var i=0;i<pts.length;i++)for(var j=i+1;j<pts.length;j++){
      var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<110){
        ctx.beginPath();
        ctx.strokeStyle=dk2?'rgba(0,255,204,'+(1-d/110)*.06+')':'rgba(0,140,106,'+(1-d/110)*.03+')';
        ctx.lineWidth=.5;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

    /* draw connecting lines */
    for(var i=0;i<particles.length;i++){
      for(var j=i+1;j<particles.length;j++){
        var dx=particles[i].x-particles[j].x;
        var dy=particles[i].y-particles[j].y;
        var dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          var a=(1-dist/120)*(isDark?.08:.04);
          ctx.beginPath();
          ctx.strokeStyle=isDark?'rgba(0,245,192,'+a+')':'rgba(0,168,126,'+a+')';
          ctx.lineWidth=.5;
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

function switchSk(index) {
    // Tabs
    document.querySelectorAll('.sk-tab').forEach(tab => {
        tab.classList.remove('act');
    });

    document.querySelector(`.sk-tab[data-sk="${index}"]`)
        .classList.add('act');

    // Panels
    document.querySelectorAll('.sk-pane').forEach(pane => {
        pane.classList.remove('act');
    });

    document.getElementById(`sk-${index}`)
        .classList.add('act');
}
/* ── Counter ── */
function animN(el){
  var t=parseInt(el.dataset.count);if(isNaN(t))return;
  var s=0,d=1200,step=Math.max(16,d/t);
  var tm=setInterval(function(){s++;el.textContent=s;if(s>=t)clearInterval(tm);},step);
}

/* ── Reveal ── */
var obs=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(!entry.isIntersecting)return;
    var el=entry.target;
    var sibs=el.parentElement.querySelectorAll('.rv,.rl,.rr');
    var idx=0;sibs.forEach(function(s,i){if(s===el)idx=i;});
    setTimeout(function(){
      el.classList.add('in');
      el.querySelectorAll('[data-count]').forEach(animN);
    },idx*80);
    obs.unobserve(el);
  });
},{threshold:0.08,rootMargin:'0px 0px -28px 0px'});
document.querySelectorAll('.rv,.rl,.rr').forEach(function(el){obs.observe(el);});

/* ── Back to top ── */
document.getElementById('btt').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
/* ── Skill tabs ── */
window.switchSk=function(i){
  document.querySelectorAll('.sk-tab').forEach(function(t){t.classList.remove('act');});
  document.querySelectorAll('.sk-pane').forEach(function(p){p.classList.remove('act');});
  document.querySelector('[data-sk="'+i+'"]').classList.add('act');
  var pane=document.getElementById('sk-'+i);
  pane.classList.add('act');
  /* re-trigger bars */
  pane.querySelectorAll('.sk-bar-fill').forEach(function(b){
    b.style.transform='scaleX(0)';
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){var wv=b.style.getPropertyValue('--w')||b.getAttribute('style').match(/--w:([0-9.]+)/)?.[1]||'1';b.style.transform='scaleX('+wv+')';});
    });
  });
};