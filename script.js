document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("startBtn"),t=document.getElementById("viewWordsBtn"),n=document.getElementById("instructionsBtn"),o=document.getElementById("closeInstructionsBtn"),s=document.getElementById("closeViewWordsBtn"),d=document.getElementById("closeSettingsBtn"),i=document.getElementById("confirmSettingsBtn"),c=document.getElementById("restartBtn"),l=document.getElementById("viewVersionsBtn"),r=document.getElementById("closeViewVersionsBtn"),a=document.getElementById("homeBtn"),m=document.getElementById("openGemStoreBtn"),u=document.getElementById("gemStore"),h=document.getElementById("closeGemStoreBtn"),g=document.querySelectorAll(".buyGemBtn"),E=document.getElementById("settings"),v=document.getElementById("instructions"),L=document.getElementById("viewWords"),y=document.getElementById("viewVersions"),p=document.getElementById("categorySelect"),f=document.getElementById("modeSelect"),B=document.getElementById("wordCountSection"),I=document.getElementById("wordCountInput"),C=document.getElementById("timedSection"),w=document.getElementById("timeLimitInput"),x=document.getElementById("viewWordsCategorySelect"),k=document.getElementById("wordsList"),S=document.getElementById("testArea"),M=document.getElementById("currentEnglish"),T=document.getElementById("currentChinese"),$=document.getElementById("result"),b=document.getElementById("totalTime"),D=document.getElementById("totalAccuracy"),W=document.getElementById("wpm"),A=document.getElementById("wordCount"),H=document.getElementById("timer"),j=document.getElementById("score"),P=document.getElementById("wpmDisplay"),F=document.getElementById("wpmLabel"),V=document.getElementById("inputReminder"),N=document.getElementById("versionsList"),U=document.getElementById("rewardMessage"),q=document.getElementById("englishInput"),O=document.getElementById("coinCount"),G=document.getElementById("gemCount");let z,K={},R=[],Z=null,J=[],Q=0,X=0,Y=0,_=0,ee=0,te=0,ne=null,oe="wordCount",se=ce("coinBalance")?parseInt(ce("coinBalance")):0,de=ce("gemBalance")?parseInt(ce("gemBalance")):0;function ie(e,t,n){let o="";if(n){const e=new Date;e.setTime(e.getTime()+24*n*60*60*1e3),o="; expires="+e.toUTCString()}document.cookie=e+"="+(t||"")+o+"; path=/"}function ce(e){const t=e+"=",n=document.cookie.split(";");for(let e=0;e<n.length;e++){let o=n[e];for(;" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return null}function le(e){if(!e||!K[e])return void(k.innerHTML="<li>無法載入單字庫。</li>");const t=K[e];if(t&&0!==t.length){k.innerHTML="",t.forEach(((e,t)=>{const n=document.createElement("li");n.textContent=`${t+1}. 英文: ${e.english}, 中文: ${e.chinese}`,n.classList.add("word-item"),k.appendChild(n)}));document.querySelectorAll(".word-item").forEach((e=>{e.addEventListener("click",(()=>{const t=e.textContent.match(/英文:\s([^,]+)/);if(t&&t[1]){me(t[1])}}))}))}else k.innerHTML="<li>單字庫是空的。</li>"}function re(e=10,t=null){const n=K[Z];if(n&&0!==n.length){if(t)J=Ee(n),A.textContent=`練習模式：計時 (${t} 秒)`,P.classList.add("hidden"),F.classList.add("hidden"),console.log("Test mode: Timed");else{const t=Math.min(e,n.length),o=Ee(n);J=o.slice(0,t),A.textContent="memory"===oe?`背單字模式: ${t} 單字`:`單字數量: ${t}`,P.classList.remove("hidden"),F.classList.remove("hidden"),console.log("Test mode:",oe)}console.log("Test words:",J),Q=0,X=0,Y=0,_=0,ee=0,H.textContent="時間: 0 秒",j.textContent=ne?`成功輸入單字數量: ${ee}`:"正確率: 0%",P.textContent="打字速度: 0 WPM",$.classList.add("hidden"),S.classList.remove("hidden"),ae(),te=Date.now(),clearInterval(z),z=setInterval(he,1e3)}else alert("請先選擇一個有單字的分類!")}function ae(){q.value="",q.classList.remove("correct","incorrect");const e=J[Q];if(M.innerHTML="",T.innerHTML="","memory"===oe){const t=e.english,n=2;(t.slice(0,n)+"*".repeat(Math.max(0,t.length-n))).split("").forEach((e=>{const t=document.createElement("span");t.textContent=e,t.classList.add("char"),M.appendChild(t)}))}else e.english.split("").forEach((e=>{const t=document.createElement("span");t.textContent=e,t.classList.add("char"),M.appendChild(t)}));T.textContent=e.chinese,q.focus(),ge(),me(e.english)}function me(e){if(!("speechSynthesis"in window))return void console.warn("Web Speech API 不被這個瀏覽器支援。");const t=window.speechSynthesis.getVoices();if(0===t.length)return void(window.speechSynthesis.onvoiceschanged=()=>{me(e)});const n=new SpeechSynthesisUtterance(e);n.lang="en-US";const o=t.find((e=>e.lang.startsWith("en")));o&&(n.voice=o),window.speechSynthesis.speak(n)}function ue(){clearInterval(z),S.classList.add("hidden"),$.classList.remove("hidden");const e=((Date.now()-te)/1e3).toFixed(2);b.textContent=e;const t=X+Y,n=t>0?(X/t*100).toFixed(2):0;if(ne)D.textContent=`成功輸入單字數量: ${ee}`,W.textContent="";else{D.textContent=`正確率: ${n}%`;const t=(X/e*60).toFixed(2);W.textContent=`${t} WPM`}if(console.log("Test ended. Duration:",e,"s, Accuracy:",D.textContent,"WPM:",W.textContent),U.classList.add("hidden"),!ne){const e=parseFloat(n);let t=0;100===e?t=100:e>90?t=70:e>70?t=50:e>50&&(t=30),t>0&&(se+=t,O.textContent=se,ie("coinBalance",se,365),U.textContent=`恭喜！您獲得 ${t} 虛空幣獎勵！`,U.classList.remove("hidden"))}ve()&&(document.getElementById("menu").style.display="none")}function he(){const e=Math.floor((Date.now()-te)/1e3);H.textContent=`時間: ${e} 秒`,ge(e),ne&&e>=ne&&ue()}function ge(e=Math.floor((Date.now()-te)/1e3)){if(ne)j.textContent=`成功輸入單字數量: ${ee}`;else{const t=X+Y,n=t>0?(X/t*100).toFixed(2):0;j.textContent=`正確率: ${n}%`;const o=e>0?(X/e*60).toFixed(2):0;P.textContent=`打字速度: ${o} WPM`}}function Ee(e){let t=e.slice();for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function ve(){return window.innerWidth<=768}function ie(e,t,n){let o="";if(n){const e=new Date;e.setTime(e.getTime()+24*n*60*60*1e3),o="; expires="+e.toUTCString()}document.cookie=e+"="+(t||"")+o+"; path=/"}function ce(e){const t=e+"=",n=document.cookie.split(";");for(let e=0;e<n.length;e++){let o=n[e];for(;" "==o.charAt(0);)o=o.substring(1,o.length);if(0==o.indexOf(t))return o.substring(t.length,o.length)}return null}O.textContent=se,G.textContent=de,"speechSynthesis"in window?console.log("Web Speech API is supported."):alert("抱歉，您的瀏覽器不支援語音合成功能。"),fetch("words.json").then((e=>e.json())).then((n=>{K=n,R=Object.keys(n),console.log("Loaded keys:",R),function(){if(!R||0===R.length)return p.innerHTML='<option value="">沒有可用的分類</option>',e.disabled=!0,t.disabled=!0,void alert("單字庫中沒有任何分類。請在 words.json 中新增分類。");p.innerHTML="",R.forEach((e=>{const t=document.createElement("option");t.value=e,t.textContent=e,p.appendChild(t)})),p.selectedIndex=0,Z=R[0]}(),function(){if(!R||0===R.length)return void(x.innerHTML='<option value="">沒有可用的分類</option>');x.innerHTML="",R.forEach((e=>{const t=document.createElement("option");t.value=e;const n=K[e].length;t.textContent=`${e} (${n} 單字)`,x.appendChild(t)})),x.selectedIndex=0,le(R[0])}()})).catch((e=>{console.error("Error loading words.json:",e),alert("無法載入單字庫。請確保 words.json 存在且格式正確。")})),t.addEventListener("click",(()=>{L.classList.remove("hidden")})),s.addEventListener("click",(()=>{L.classList.add("hidden")})),x.addEventListener("change",(()=>{le(x.value)})),n.addEventListener("click",(()=>{v.classList.remove("hidden")})),o.addEventListener("click",(()=>{v.classList.add("hidden")})),e.addEventListener("click",(()=>{if(!R||0===R.length)return void alert("單字庫中沒有任何分類。請在 words.json 中新增分類。");const e=p.value;if(console.log("StartBtn - Selected key:",e),!e)return void alert("請選擇一個分類開始測試。");Z=e;const t=K[Z];t&&0!==t.length?(E.classList.remove("hidden"),ve()&&(document.getElementById("menu").style.display="none")):alert("選擇的分類中沒有任何單字。")})),d.addEventListener("click",(()=>{E.classList.add("hidden"),document.getElementById("menu").style.display="block"})),f.addEventListener("change",(()=>{oe=f.value,"wordCount"===oe?(B.classList.remove("hidden"),C.classList.add("hidden")):"timed"===oe?(C.classList.remove("hidden"),B.classList.add("hidden")):"memory"===oe&&(B.classList.remove("hidden"),C.classList.add("hidden"))})),i.addEventListener("click",(()=>{if(oe=f.value,"wordCount"===oe||"memory"===oe){const e=parseInt(I.value);if(isNaN(e)||e<1||e>100)return void alert("請輸入有效的單字數量（1-100）。");ne=null,re(e)}else if("timed"===oe){const e=parseInt(w.value);if(isNaN(e)||e<10||e>3600)return void alert("請輸入有效的時間限制（10-3600 秒）。");ne=e,re(null,ne)}E.classList.add("hidden")})),c.addEventListener("click",(()=>{if($.classList.add("hidden"),S.classList.remove("hidden"),clearInterval(z),Q=0,X=0,Y=0,_=0,ee=0,q.value="",q.classList.remove("correct","incorrect"),M.innerHTML="",T.innerHTML="",P.textContent="打字速度: 0 WPM",W.textContent="打字速度: 0 WPM",V.classList.add("hidden"),ne)re(null,ne);else{re(parseInt(I.value),null)}})),a.addEventListener("click",(()=>{window.location.reload(),document.getElementById("menu").style.display="block",document.getElementById("testArea").style.display="none"})),q.addEventListener("input",(()=>{const e=q.value,t=J[Q].english,n=t.toLowerCase(),o=e.toLowerCase(),s=M.querySelectorAll(".char"),d=e.length-1;d>=t.length?q.value=t:(e.length>X+Y&&_++,d>=0&&(o[d]===n[d]?(s[d]?.classList.add("correct"),s[d]?.classList.remove("incorrect"),X++):(s[d]?.classList.add("incorrect"),s[d]?.classList.remove("correct"),Y++,q.value=e.slice(0,d))),s.forEach(((t,n)=>{n===e.length?t.classList.add("current"):t.classList.remove("current")})),function(){const e=q.value,t=J[Q].english;e.trim().toLowerCase()===t.trim().toLowerCase()&&(ne&&ee++,setTimeout((()=>{Q++,Q<J.length?ae():ue()}),300))}())})),q.addEventListener("keydown",(e=>{const t=q.value,n=J[Q].english;if(!e.ctrlKey&&!e.metaKey||"v"!==e.key.toLowerCase())if("Backspace"===e.key){const e=t.length;if(e>0){if(t[e-1]!==n[e-1])return}}else{const t=n.toLowerCase(),o=q.value.toLowerCase();Array.from(o).some(((e,n)=>e!==t[n]))&&e.preventDefault()}else e.preventDefault()})),q.addEventListener("paste",(e=>{e.preventDefault()})),q.addEventListener("drop",(e=>{e.preventDefault()})),q.addEventListener("focus",(()=>{V.classList.remove("hidden")})),q.addEventListener("blur",(()=>{V.classList.add("hidden")})),q.addEventListener("input",(()=>{const e=q.value;/[^a-zA-Z\s]/.test(e)?V.classList.remove("hidden"):V.classList.add("hidden")})),l.addEventListener("click",(()=>{fetch("versions.json").then((e=>{if(!e.ok)throw new Error("Network response was not ok");return e.json()})).then((e=>{const t=e.versions;t&&0!==t.length?(N.innerHTML="",t.forEach((e=>{const t=document.createElement("li"),n=document.createElement("strong");n.textContent=`版本 ${e.version} - 發佈日期: ${e.releaseDate}`,t.appendChild(n);const o=document.createElement("br");if(t.appendChild(o),e.changes&&e.changes.length>0){const n=document.createElement("ul");e.changes.forEach((e=>{const t=document.createElement("li");t.textContent=e,n.appendChild(t)})),t.appendChild(n)}N.appendChild(t);const s=document.createElement("br");N.appendChild(s)}))):N.innerHTML="<li>沒有版本更新內容。</li>",y.classList.remove("hidden"),console.log("Displayed versions:",t)})).catch((e=>{console.error("載入 versions.json 時出錯:",e),alert("無法載入版本更新內容。")}))})),r.addEventListener("click",(()=>{y.classList.add("hidden")})),window.addEventListener("resize",(()=>{ve()||document.getElementById("menu").classList.remove("hidden-on-mobile")})),m.addEventListener("click",(()=>{u.classList.remove("hidden")})),h.addEventListener("click",(()=>{u.classList.add("hidden")})),g.forEach((e=>{e.addEventListener("click",(()=>{!function(e){let t=.33*e,n=0;30===e?n=1:100===e?n=5:300===e&&(n=30);const o=e+n,s=`確定要購買 ${e} 顆鑽石 (${n>0?"送 "+n+" 顆":""})？\n總共獲得 ${o} 顆，需支付 $${t.toFixed(2)} USD`;confirm(s)&&(de+=o,G.textContent=de,ie("gemBalance",de,365),alert(`購買成功！您獲得 ${o} 顆鑽石。`))}(parseInt(e.dataset.quantity))}))})),se=ce("coinBalance")?parseInt(ce("coinBalance")):0,de=ce("gemBalance")?parseInt(ce("gemBalance")):0,O.textContent=se,G.textContent=de}));