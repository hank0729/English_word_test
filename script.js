document.addEventListener("DOMContentLoaded", (() => {
  const e = document.getElementById("startBtn"),
    t = document.getElementById("viewWordsBtn"),
    n = document.getElementById("instructionsBtn"),
    o = document.getElementById("closeInstructionsBtn"),
    s = document.getElementById("closeViewWordsBtn"),
    d = document.getElementById("closeSettingsBtn"),
    c = document.getElementById("confirmSettingsBtn"),
    i = document.getElementById("restartBtn"),
    l = document.getElementById("viewVersionsBtn"),
    a = document.getElementById("closeViewVersionsBtn"),
    r = document.getElementById("homeBtn"),
    m = document.getElementById("openGemStoreBtn"),
    u = document.getElementById("gemStore"),
    h = document.getElementById("closeGemStoreBtn"),
    g = document.querySelectorAll(".buyGemBtn"),
    E = document.getElementById("settings"),
    v = document.getElementById("instructions"),
    L = document.getElementById("viewWords"),
    y = document.getElementById("viewVersions"),
    p = document.getElementById("categorySelect"),
    B = document.getElementById("modeSelect"),
    I = document.getElementById("wordCountSection"),
    f = document.getElementById("wordCountInput"),
    C = document.getElementById("timedSection"),
    w = document.getElementById("timeLimitInput"),
    x = document.getElementById("viewWordsCategorySelect"),
    S = document.getElementById("wordsList"),
    M = document.getElementById("testArea"),
    k = document.getElementById("currentEnglish"),
    $ = document.getElementById("currentChinese"),
    T = document.getElementById("result"),
    A = document.getElementById("totalTime"),
    D = document.getElementById("totalAccuracy"),
    W = document.getElementById("wpm"),
    b = document.getElementById("wordCount"),
    H = document.getElementById("timer"),
    j = document.getElementById("score"),
    P = document.getElementById("wpmDisplay"),
    F = document.getElementById("wpmLabel"),
    V = document.getElementById("inputReminder"),
    z = document.getElementById("versionsList"),
    N = document.getElementById("rewardMessage"),
    q = document.getElementById("englishInput"),
    Z = document.getElementById("coinCount"),
    G = document.getElementById("gemCount");

  let U, K = {},
    O = [],
    R = null,
    J = [],
    Q = 0,
    X = 0,
    Y = 0,
    _ = 0,
    ee = 0,
    te = 0,
    ne = null,
    oe = "wordCount",
    se = ie("coinBalance") ? parseInt(ie("coinBalance")) : 0,
    de = ie("gemBalance") ? parseInt(ie("gemBalance")) : 0;

  function ce(e, t) {
    localStorage.setItem(e, t)
  }

  function ie(e) {
    return localStorage.getItem(e)
  }

  function le(e) {
    if (!e || !K[e])
      return void(S.innerHTML = "<li>無法載入單字庫。</li>");
    const t = K[e];
    if (t && 0 !== t.length) {
      S.innerHTML = "";
      t.forEach(((e, t) => {
        const n = document.createElement("li");
        n.textContent = `${t + 1}. 英文: ${e.english}, 中文: ${e.chinese}`;
        n.classList.add("word-item");
        S.appendChild(n);
      }));
      document.querySelectorAll(".word-item").forEach((e => {
        e.addEventListener("click", (() => {
          const t = e.textContent.match(/英文:\s([^,]+)/);
          if (t && t[1]) {
            me(t[1])
          }
        }))
      }));
    } else S.innerHTML = "<li>單字庫是空的。</li>"
  }

  function ae(e = 10, t = null) {
    const n = K[R];
    if (n && 0 !== n.length) {
      if (t) {
        J = Ee(n);
        b.textContent = `練習模式：計時 (${t} 秒)`;
        P.classList.add("hidden");
        F.classList.add("hidden");
        console.log("Test mode: Timed");
      } else {
        // 使用全部單字數量（取分類內的最小值）
        const totalWords = Math.min(e, n.length);
        const o = Ee(n);
        J = o.slice(0, totalWords);
        b.textContent = "memory" === oe ? `背單字模式: ${totalWords} 單字` : `單字數量: ${totalWords}`;
        P.classList.remove("hidden");
        F.classList.remove("hidden");
        console.log("Test mode:", oe);
      }
      console.log("Test words:", J);
      Q = 0, X = 0, Y = 0, _ = 0, ee = 0;
      H.textContent = "時間: 0 秒";
      j.textContent = ne ? `成功輸入單字數量: ${ee}` : "正確率: 0%";
      P.textContent = "打字速度: 0 WPM";
      T.classList.add("hidden");
      M.classList.remove("hidden");
      re();
      te = Date.now();
      clearInterval(U);
      U = setInterval(he, 1e3);
    } else alert("請先選擇一個有單字的分類!")
  }

  function re() {
    q.value = "";
    q.classList.remove("correct", "incorrect");
    const e = J[Q];
    k.innerHTML = "";
    $.innerHTML = "";
    if ("memory" === oe) {
      const t = e.english.split(""),
        n = t.filter((e => /[a-zA-Z]/.test(e))).length,
        o = Math.max(1, Math.floor(.15 * n)),
        s = Ee(t.map(((e, t) => ({ char: e, index: t }))).filter((e => /[a-zA-Z]/.test(e.char))).map((e => e.index))).slice(0, o);
      t.forEach(((e, t) => {
        const n = document.createElement("span");
        /[a-zA-Z]/.test(e) ? s.includes(t) ? n.textContent = e : n.textContent = "*" : n.textContent = e;
        n.classList.add("char");
        k.appendChild(n);
      }));
    } else {
      e.english.split("").forEach((e => {
        const t = document.createElement("span");
        t.textContent = e;
        t.classList.add("char");
        k.appendChild(t);
      }));
    }
    $.textContent = e.chinese;
    q.focus();
    ge();
    me(e.english);
  }

  function me(e) {
    if (!("speechSynthesis" in window))
      return void console.warn("Web Speech API 不被這個瀏覽器支援。");
    const t = window.speechSynthesis.getVoices();
    if (0 === t.length)
      return void(window.speechSynthesis.onvoiceschanged = () => { me(e) });
    const n = new SpeechSynthesisUtterance(e);
    n.lang = "en-US";
    const o = t.find((e => e.lang.startsWith("en")));
    o && (n.voice = o);
    window.speechSynthesis.speak(n);
  }

  function ue() {
    clearInterval(U);
    M.classList.add("hidden");
    T.classList.remove("hidden");
    const e = ((Date.now() - te) / 1e3).toFixed(2);
    A.textContent = e;
    const t = X + Y,
      n = t > 0 ? (X / t * 100).toFixed(2) : 0;
    if (ne) {
      D.textContent = `成功輸入單字數量: ${ee}`;
      W.textContent = "";
    } else {
      D.textContent = `正確率: ${n}%`;
      const t = (X / e * 60).toFixed(2);
      W.textContent = `${t} WPM`;
    }
    console.log("Test ended. Duration:", e, "s, Accuracy:", D.textContent, "WPM:", W.textContent);
    N.classList.add("hidden");
    if (!ne) {
      const e = parseFloat(n);
      let t = 0;
      100 === e ? t = 100 : e > 90 ? t = 70 : e > 70 ? t = 50 : e > 50 && (t = 30);
      if (t > 0) {
        se += t;
        Z.textContent = se;
        ce("coinBalance", se);
        N.textContent = `恭喜！您獲得 ${t} 虛空幣獎勵！`;
        N.classList.remove("hidden");
      }
    }
    if (ve()) {
      document.getElementById("menu").style.display = "none";
    }
  }

  function he() {
    const e = Math.floor((Date.now() - te) / 1e3);
    H.textContent = `時間: ${e} 秒`;
    ge(e);
    if (ne && e >= ne) ue();
  }

  function ge(e = Math.floor((Date.now() - te) / 1e3)) {
    if (ne)
      j.textContent = `成功輸入單字數量: ${ee}`;
    else {
      const t = X + Y,
        n = t > 0 ? (X / t * 100).toFixed(2) : 0;
      j.textContent = `正確率: ${n}%`;
      const o = e > 0 ? (X / e * 60).toFixed(2) : 0;
      P.textContent = `打字速度: ${o} WPM`;
    }
  }

  function Ee(e) {
    let t = e.slice();
    for (let e = t.length - 1; e > 0; e--) {
      const n = Math.floor(Math.random() * (e + 1));
      [t[e], t[n]] = [t[n], t[e]];
    }
    return t;
  }

  function ve() {
    return window.innerWidth <= 768;
  }

  // （重複定義的 ce 與 ie，保持一致）
  function ce(e, t) {
    localStorage.setItem(e, t)
  }
  function ie(e) {
    return localStorage.getItem(e)
  }

  Z.textContent = se;
  G.textContent = de;
  "speechSynthesis" in window
    ? console.log("Web Speech API is supported.")
    : alert("抱歉，您的瀏覽器不支援語音合成功能。");

  fetch("words.json")
    .then((e) => e.json())
    .then((n) => {
      K = n;
      O = Object.keys(n);
      console.log("Loaded keys:", O);
      (function () {
        if (!O || 0 === O.length)
          return (
            (p.innerHTML = '<option value="">沒有可用的分類</option>'),
            (e.disabled = !0),
            (t.disabled = !0),
            alert("單字庫中沒有任何分類。請在 words.json 中新增分類。")
          );
        p.innerHTML = "";
        O.forEach((e) => {
          const t = document.createElement("option");
          t.value = e;
          t.textContent = e;
          p.appendChild(t);
        });
        p.selectedIndex = 0;
        R = O[0];
      })();
      (function () {
        if (!O || 0 === O.length)
          return void (x.innerHTML = '<option value="">沒有可用的分類</option>');
        x.innerHTML = "";
        O.forEach((e) => {
          const t = document.createElement("option");
          t.value = e;
          const n = K[e].length;
          t.textContent = `${e} (${n} 單字)`;
          x.appendChild(t);
        });
        x.selectedIndex = 0;
        le(O[0]);
      })();
    })
    .catch((e) => {
      console.error("Error loading words.json:", e);
      alert("無法載入單字庫。請確保 words.json 存在且格式正確。");
    });

  t.addEventListener("click", () => {
    L.classList.remove("hidden");
  });

  s.addEventListener("click", () => {
    L.classList.add("hidden");
  });

  x.addEventListener("change", () => {
    le(x.value);
  });

  n.addEventListener("click", () => {
    v.classList.remove("hidden");
  });

  o.addEventListener("click", () => {
    v.classList.add("hidden");
  });

  e.addEventListener("click", () => {
    if (!O || 0 === O.length)
      return void alert("單字庫中沒有任何分類。請在 words.json 中新增分類。");
    const e = p.value;
    console.log("StartBtn - Selected key:", e);
    if (!e) return void alert("請選擇一個分類開始測試。");
    R = e;
    const t = K[R];
    t && 0 !== t.length
      ? (E.classList.remove("hidden"), ve() && (document.getElementById("menu").style.display = "none"))
      : alert("選擇的分類中沒有任何單字。");
  });

  d.addEventListener("click", () => {
    E.classList.add("hidden");
    document.getElementById("menu").style.display = "block";
  });

  B.addEventListener("change", () => {
    oe = B.value;
    if ("wordCount" === oe) {
      I.classList.remove("hidden");
      C.classList.add("hidden");
    } else if ("timed" === oe) {
      C.classList.remove("hidden");
      I.classList.add("hidden");
    } else if ("memory" === oe) {
      I.classList.remove("hidden");
      C.classList.add("hidden");
    }
  });

  // 修改後的設定：自動採用所選分類中全部單字
  c.addEventListener("click", () => {
    if ("wordCount" === oe || "memory" === oe) {
      if (!K[R] || K[R].length === 0) {
        alert("選擇的分類中沒有任何單字。");
        return;
      }
      const totalWords = K[R].length;
      ne = null;
      ae(totalWords);
    } else if ("timed" === oe) {
      const e = parseInt(w.value);
      if (isNaN(e) || e < 10 || e > 3600)
        return alert("請輸入有效的時間限制（10-3600 秒）。");
      ne = e;
      ae(null, ne);
    }
    E.classList.add("hidden");
  });

  i.addEventListener("click", () => {
    T.classList.add("hidden");
    M.classList.remove("hidden");
    clearInterval(U);
    Q = 0;
    X = 0;
    Y = 0;
    _ = 0;
    ee = 0;
    q.value = "";
    q.classList.remove("correct", "incorrect");
    k.innerHTML = "";
    $.innerHTML = "";
    P.textContent = "打字速度: 0 WPM";
    W.textContent = "打字速度: 0 WPM";
    V.classList.add("hidden");
    ne ? ae(null, ne) : ae(parseInt(f.value), null);
  });

  r.addEventListener("click", () => {
    window.location.reload();
    document.getElementById("menu").style.display = "block";
    document.getElementById("testArea").style.display = "none";
  });

  q.addEventListener("input", () => {
    const e = q.value,
      t = J[Q].english,
      n = t.toLowerCase(),
      o = e.toLowerCase(),
      s = k.querySelectorAll(".char"),
      d = e.length - 1;
    if (d >= t.length) {
      q.value = t;
    } else {
      if (e.length > X + Y) _++;
      if (d >= 0) {
        if (o[d] === n[d]) {
          s[d]?.classList.add("correct");
          s[d]?.classList.remove("incorrect");
          X++;
        } else {
          s[d]?.classList.add("incorrect");
          s[d]?.classList.remove("correct");
          Y++;
          q.value = e.slice(0, d);
        }
      }
      s.forEach((t, n) => {
        n === e.length ? t.classList.add("current") : t.classList.remove("current");
      });
      (function () {
        const e = q.value,
          t = J[Q].english;
        if (e.trim().toLowerCase() === t.trim().toLowerCase()) {
          if (ne) ee++;
          setTimeout(() => {
            Q++;
            Q < J.length ? re() : ue();
          }, 300);
        }
      })();
    }
  });

q.addEventListener("keydown", (e) => {
  const currentValue = q.value,
    targetWord = J[Q].english;
  // 如果是 Ctrl+V 或 Command+V，則阻止預設行為
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v") {
    e.preventDefault();
    return;
  }
  // 處理其他按鍵邏輯
  if ("Backspace" === e.key) {
    const len = currentValue.length;
    if (len > 0 && currentValue[len - 1] !== targetWord[len - 1]) {
      return;
    }
  } else {
    const targetLower = targetWord.toLowerCase(),
      currentLower = currentValue.toLowerCase();
    if (Array.from(currentLower).some((char, idx) => char !== targetLower[idx])) {
      e.preventDefault();
    }
  }
});


  q.addEventListener("paste", (e) => {
    e.preventDefault();
  });

  q.addEventListener("drop", (e) => {
    e.preventDefault();
  });

  q.addEventListener("focus", () => {
    V.classList.remove("hidden");
  });

  q.addEventListener("blur", () => {
    V.classList.add("hidden");
  });

  q.addEventListener("input", () => {
    const e = q.value;
    /[^a-zA-Z\s]/.test(e) ? V.classList.remove("hidden") : V.classList.add("hidden");
  });

  l.addEventListener("click", () => {
    fetch("versions.json")
      .then((e) => {
        if (!e.ok) throw new Error("Network response was not ok");
        return e.json();
      })
      .then((e) => {
        const t = e.versions;
        if (t && 0 !== t.length) {
          z.innerHTML = "";
          t.forEach((e) => {
            const t = document.createElement("li"),
              n = document.createElement("strong");
            n.textContent = `版本 ${e.version} - 發佈日期: ${e.releaseDate}`;
            t.appendChild(n);
            const o = document.createElement("br");
            t.appendChild(o);
            if (e.changes && e.changes.length > 0) {
              const n = document.createElement("ul");
              e.changes.forEach((e) => {
                const t = document.createElement("li");
                t.textContent = e;
                n.appendChild(t);
              });
              t.appendChild(n);
            }
            z.appendChild(t);
            const s = document.createElement("br");
            z.appendChild(s);
          });
        } else {
          z.innerHTML = "<li>沒有版本更新內容。</li>";
        }
        y.classList.remove("hidden");
        console.log("Displayed versions:", t);
      })
      .catch((e) => {
        console.error("載入 versions.json 時出錯:", e);
        alert("無法載入版本更新內容。");
      });
  });

  a.addEventListener("click", () => {
    y.classList.add("hidden");
  });

  window.addEventListener("resize", () => {
    if (!ve()) document.getElementById("menu").classList.remove("hidden-on-mobile");
  });

  m.addEventListener("click", () => {
    u.classList.remove("hidden");
  });

  h.addEventListener("click", () => {
    u.classList.add("hidden");
  });

  g.forEach((e) => {
    e.addEventListener("click", () => {
      (function (e) {
        let t = 0.33 * e,
          n = 0;
        30 === e ? n = 1 : 100 === e ? n = 5 : 300 === e && (n = 30);
        const o = e + n,
          s = `確定要購買 ${e} 顆鑽石 (${n > 0 ? "送 " + n + " 顆" : ""})？\n總共獲得 ${o} 顆，需支付 $${t.toFixed(2)} USD`;
        if (confirm(s))
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const success = Math.random() < 0.9;
              resolve(!!success);
            }, 2000);
          })
            .then((success) => {
              if (success) {
                de += o;
                G.textContent = de;
                ce("gemBalance", de);
                alert(`購買成功！您獲得 ${o} 顆鑽石。`);
                u.classList.add("hidden");
              } else {
                alert("購買失敗。請稍後再試。");
              }
            })
            .catch(() => {
              alert("購買過程中發生錯誤。");
            });
      })(parseInt(e.dataset.quantity));
    });
  });

  se = ie("coinBalance") ? parseInt(ie("coinBalance")) : 0;
  de = ie("gemBalance") ? parseInt(ie("gemBalance")) : 0;
  Z.textContent = se;
  G.textContent = de;
}));
