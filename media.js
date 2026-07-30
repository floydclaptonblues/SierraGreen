import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js';

const videos=[
 ['r3ebhM1ugy4','Featured Video','Sierra Green & The Giants — Featured Performance'],
 ['csU1UVvtMRs','Live Set','Sierra Green — Live Performance'],
 ['D6iq9N_IOH4','Featured Video','Sierra Green & The Giants — Featured Performance'],
 ['JBULCoq0fKg','Official Video','One Thing — Sierra Green & The Giants'],
 ['ynWOOcs7C4M','Spotlight','Sierra Green Spotlight'],
 ['uTundui-67M','Live Performance','Sierra Green & The Giants — Live'],
 ['G9iDZUpH-h8','Performance Reel','Sierra Green & The Giants Reel'],
 ['MrNuYQbFqM4','Featured Video','Sierra Green & The Giants — Featured Performance'],
 ['G8TbRsOIiJc','Featured Video','Sierra Green & The Giants — Featured Performance']
];
const wall=document.getElementById('video-wall');
for(const [id,label,title] of videos){const card=document.createElement('article');card.className='tv-card';card.innerHTML=`<div class="tv-screen"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><div class="tv-copy"><span class="tv-label">${label}</span><h3>${title}</h3><p>Watch here or open the original video on YouTube.</p><a class="media-button" href="https://youtu.be/${id}" target="_blank" rel="noopener">Open on YouTube</a></div>`;wall.appendChild(card)}

const canvas=document.getElementById('theatre-canvas');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);
const scene=new THREE.Scene();scene.fog=new THREE.Fog(0x05050c,10,40);
const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,100);camera.position.set(0,3.2,12.5);camera.lookAt(0,1.7,0);
scene.add(new THREE.AmbientLight(0x806778,.62));
const spot=new THREE.SpotLight(0xffefd3,4.5,42,Math.PI/6,.48,1.2);spot.position.set(0,9,5);spot.target.position.set(0,1.1,0);scene.add(spot,spot.target);
const blue=new THREE.PointLight(0x74a8ff,.55,30);blue.position.set(-7,2,8);scene.add(blue);
const amber=new THREE.PointLight(0xffaf62,.78,26);amber.position.set(8,1.8,2);scene.add(amber);
const floor=new THREE.Mesh(new THREE.CircleGeometry(17,80),new THREE.MeshPhongMaterial({color:0x110c17,shininess:26,specular:0x2c2035}));floor.rotation.x=-Math.PI/2;floor.position.y=-.36;scene.add(floor);
const stage=new THREE.Mesh(new THREE.SphereGeometry(4.35,72,48,0,Math.PI*2,0,Math.PI/2),new THREE.MeshPhongMaterial({color:0x3a1d16,emissive:0x140906,shininess:58,specular:0x704126}));stage.scale.set(1,.24,1);stage.position.y=.1;scene.add(stage);
const trim=new THREE.Mesh(new THREE.TorusGeometry(4.36,.06,18,120),new THREE.MeshBasicMaterial({color:0xf4c37c}));trim.rotation.x=Math.PI/2;trim.position.y=.14;scene.add(trim);
const metal=new THREE.MeshStandardMaterial({color:0xd3d4db,metalness:.82,roughness:.22}),dark=new THREE.MeshStandardMaterial({color:0x1c1e24,metalness:.62,roughness:.36}),mic=new THREE.Group();
const stand=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,3.25,18),metal);stand.position.y=1.63;mic.add(stand);
const boom=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.82,16),metal);boom.rotation.z=-.55;boom.position.set(.23,3,0);mic.add(boom);
const body=new THREE.Mesh(new THREE.CylinderGeometry(.09,.08,.42,24),dark);body.rotation.z=-.55;body.position.set(.55,3.15,0);mic.add(body);
const head=new THREE.Mesh(new THREE.SphereGeometry(.13,24,24),metal);head.scale.set(1,1.16,1);head.position.set(.68,3.25,0);mic.add(head);
const base=new THREE.Mesh(new THREE.CylinderGeometry(.42,.58,.08,32),dark);base.position.y=.05;mic.add(base);scene.add(mic);
const balconies=new THREE.Group();for(let i=0;i<8;i++){const r=5.7+i*1.12,arc=new THREE.EllipseCurve(0,0,r,r*.43,Math.PI*.05,Math.PI*.95),pts=arc.getPoints(100).map(p=>new THREE.Vector3(p.x,p.y+.15+i*.42,-3.5-i*1.38)),geo=new THREE.BufferGeometry().setFromPoints(pts),mat=new THREE.LineBasicMaterial({color:0x98552e,transparent:true,opacity:.62-i*.055});balconies.add(new THREE.Line(geo,mat))}scene.add(balconies);
const bulbs=new THREE.Group(),bulbGeo=new THREE.SphereGeometry(.06,12,12);for(const side of[-1,1])for(let i=0;i<18;i++){const bulb=new THREE.Mesh(bulbGeo,new THREE.MeshBasicMaterial({color:i%2?0xf4c37c:0x9fc0ff}));bulb.position.set(side*(5.35+i%3*.14),.82+i*.38,-2.15-i*.55);bulbs.add(bulb)}scene.add(bulbs);
const pg=new THREE.BufferGeometry(),count=240,pos=new Float32Array(count*3);for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*26;pos[i*3+1]=Math.random()*12;pos[i*3+2]=-Math.random()*28}pg.setAttribute('position',new THREE.BufferAttribute(pos,3));const dust=new THREE.Points(pg,new THREE.PointsMaterial({color:0xfbe7c6,size:.035,transparent:true,opacity:.56}));scene.add(dust);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2))});
const clock=new THREE.Clock();function animate(){const t=clock.getElapsedTime();balconies.rotation.y=Math.sin(t*.12)*.08;bulbs.rotation.y=Math.sin(t*.15)*.03;dust.rotation.y=t*.02;spot.intensity=4.25+Math.sin(t*1.7)*.2;renderer.render(scene,camera);requestAnimationFrame(animate)}animate();
