import { useState, useRef, useEffect } from "react";

// ─── Pamela Reif profile photo (embedded base64) ───
const PAMELA_IMG = "data:image/jpeg;base64,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";

// ─── Wedding banner (embedded base64) ───
const WEDDING_IMG = "data:image/jpeg;base64,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";

const PAMELA_BG = "data:image/jpeg;base64,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";

// ─── Color Palette ───
const W = {
  bg: "#131316", bgDeep: "#0D0D10",
  card: "#1C1C22", cardInner: "#222229", cardBorder: "#28282F",
  text: "#FFFFFF", textSec: "#A3A0AB", textMuted: "#6D6A75", textDim: "#45434C",
  green: "#00D26A", greenBg: "#00D26A12", greenBorder: "#00D26A28",
  yellow: "#F5C842", yellowBg: "#F5C84212", yellowBorder: "#F5C84228",
  red: "#FF4D4D", redBg: "#FF4D4D10",
  blue: "#3DAEF5", blueBg: "#3DAEF518",
  violet: "#8B6FFF", violetBg: "#8B6FFF12",
  orange: "#FF9100", orangeBg: "#FF910012",
  coral: "#FF8A80", coralBg: "#FF8A8010", coralBorder: "#FF8A8028", coralSoft: "#FF8A8088",
  sleepRing: "#8BA4C4", recoveryRing: "#F5C842", strainRing: "#3DAEF5",
  navBg: "#18181D", navBorder: "#222228",
};

// ─── Pamela Avatar Component ───
function PamelaAvatar({ size = 52 }) {
  return (
    <img src={PAMELA_IMG} alt="Pamela" style={{
      width: size, height: size, borderRadius: size > 30 ? 14 : 8,
      objectFit: "cover", border: `2px solid ${W.coral}55`, flexShrink: 0,
    }} />
  );
}

// ─── Status Bar ───
function StatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 22px 4px", alignItems: "center" }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: W.text, fontFamily: "'Bricolage Grotesque', sans-serif" }}>6:45</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 1.5, alignItems: "flex-end", height: 12 }}>
          {[5, 7, 9, 11].map((h, i) => <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i < 3 ? W.text : W.textDim }} />)}
        </div>
        <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 1C5 1 2.8 2.3 1.5 4.2l1.3 1.3C4 3.8 5.6 3 7.5 3s3.5.8 4.7 2.5l1.3-1.3C12.2 2.3 10 1 7.5 1z" fill={W.text}/><circle cx="7.5" cy="9" r="1.8" fill={W.text}/></svg>
        <div style={{ width: 25, height: 12, borderRadius: 3, border: `1.5px solid ${W.textMuted}`, padding: 1.5, marginLeft: 2 }}>
          <div style={{ width: "82%", height: "100%", background: W.green, borderRadius: 1.5 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Top Bar ───
function TopBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 20px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${W.textDim}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke={W.textSec} strokeWidth="1.8"/><path d="M5 20c0-3.5 3.1-6.5 7-6.5s7 3 7 6.5" stroke={W.textSec} strokeWidth="1.8"/></svg>
        </div>
        <span style={{ fontSize: 13, color: W.text, fontWeight: 500 }}>🔥 8</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: W.card, borderRadius: 20, padding: "5px 16px" }}>
        <span style={{ color: W.textMuted, fontSize: 14, cursor: "pointer" }}>‹</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: W.text, letterSpacing: 1, fontFamily: "'Bricolage Grotesque', sans-serif" }}>TODAY</span>
        <span style={{ color: W.textMuted, fontSize: 14, cursor: "pointer" }}>›</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ fontSize: 12, color: W.text, fontWeight: 500 }}>82%</span>
        <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${W.textDim}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: W.green }} />
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// SECTION 1: GOAL — Wedding
// ════════════════════════════════════════
function GoalSection() {
  const score = 81;
  const color = W.green;
  return (
    <div style={{ margin: "0 16px 12px" }}>
      <div style={{ background: W.card, borderRadius: 16, border: `1px solid ${color}22`, overflow: "hidden" }}>
        {/* Banner image — visible, not covered by text */}
        <div style={{ position: "relative", height: 130 }}>
          <img src={WEDDING_IMG} alt="" style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block",
          }} />
          {/* Bottom fade into card background */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 50,
            background: `linear-gradient(180deg, transparent 0%, ${W.card} 100%)`,
          }} />
        </div>

        {/* Green accent line */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${color}00, ${color}, ${color}00)`, marginTop: -3 }} />

        {/* Content below image */}
        <div style={{ padding: "12px 16px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, color: W.textMuted, letterSpacing: 2, fontFamily: "'Bricolage Grotesque', sans-serif" }}>MY GOAL</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: W.text, marginTop: 4, lineHeight: 1.2, fontFamily: "'Bricolage Grotesque', sans-serif" }}>Feel Amazing on{"\n"}My Wedding Day</div>
              <div style={{ fontSize: 12, color: W.textSec, marginTop: 4 }}>Week 6 of 12 · 6 lbs lost · 9 to go</div>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ position: "relative", width: 68, height: 68 }}>
                <svg width={68} height={68} style={{ transform: "rotate(-90deg)" }}>
                  <circle cx={34} cy={34} r={28} fill="none" stroke={W.cardInner} strokeWidth={6} />
                  <circle cx={34} cy={34} r={28} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round"
                    strokeDasharray={176} strokeDashoffset={176 * (1 - score / 100)}
                    style={{ filter: `drop-shadow(0 0 6px ${color}55)`, transition: "stroke-dashoffset 1s ease" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{score}</div>
                </div>
              </div>
              <div style={{ fontSize: 8, color: W.textMuted, letterSpacing: 1.2, marginTop: 2, fontWeight: 600 }}>ON TRACK</div>
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <span style={{ fontSize: 10, color: W.textMuted, fontWeight: 600 }}>WEIGHT</span>
              <span style={{ fontSize: 11, color: W.text, fontWeight: 700 }}>176 lbs <span style={{ color: W.textMuted }}>→</span> 167 lbs goal</span>
            </div>
            <div style={{ height: 5, background: W.cardInner, borderRadius: 3 }}>
              <div style={{ height: "100%", width: "60%", background: color, borderRadius: 3, transition: "width 1s ease" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {[
              { label: "THIS WEEK", value: "-1.2 lbs", accent: true },
              { label: "WEDDING: Aug 15", value: null, accent: false },
              { label: "DAYS: 57", value: null, accent: false },
            ].map((s, i) => (
              <div key={i} style={{
                flex: s.accent ? "none" : 1, padding: "6px 10px", borderRadius: 8, textAlign: "center",
                background: s.accent ? `${W.green}18` : W.bgDeep,
                border: s.accent ? `1px solid ${W.green}30` : "1px solid transparent",
              }}>
                {s.value ? (
                  <>
                    <div style={{ fontSize: 7, color: s.accent ? W.green : W.textDim, letterSpacing: 1.2, fontWeight: 700 }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: s.accent ? W.green : W.textSec, fontWeight: 600, marginTop: 2 }}>{s.value}</div>
                  </>
                ) : (
                  <div style={{ fontSize: 10, color: W.textMuted, fontWeight: 600 }}>{s.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// SECTION 2: STATUS
// ════════════════════════════════════════
function StatusSection() {
  return (
    <div style={{ margin: "0 16px 12px" }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: W.textDim, letterSpacing: 2, marginBottom: 8, paddingLeft: 2, fontFamily: "'Bricolage Grotesque', sans-serif" }}>TODAY'S STATUS</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {[
          { pct: 68, display: "68%", label: "SLEEP", color: W.sleepRing, note: "Hunger hormone control" },
          { pct: 52, display: "52%", label: "RECOVERY", color: W.recoveryRing, note: "Stress eating risk" },
          { pct: 40, display: "8.4", label: "STRAIN", color: W.strainRing, note: "Target: 10-12" },
        ].map((g) => (
          <div key={g.label} style={{ flex: 1, background: W.card, borderRadius: 14, padding: "14px 8px 10px", textAlign: "center" }}>
            <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto" }}>
              <svg width={56} height={56} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={28} cy={28} r={22} fill="none" stroke={W.cardInner} strokeWidth={5} />
                <circle cx={28} cy={28} r={22} fill="none" stroke={g.color} strokeWidth={5} strokeLinecap="round"
                  strokeDasharray={138} strokeDashoffset={138 * (1 - g.pct / 100)} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: W.text, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{g.display}</span>
              </div>
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: W.textMuted, letterSpacing: 1.2, marginTop: 6 }}>{g.label}</div>
            <div style={{ fontSize: 8, color: g.color, marginTop: 2, fontWeight: 500 }}>{g.note}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, background: W.card, borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: W.textMuted, letterSpacing: 0.8 }}>HEALTH MONITOR</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
            <span style={{ color: W.green, fontSize: 13 }}>✓</span>
            <span style={{ fontSize: 12, color: W.green, fontWeight: 600 }}>All in range</span>
          </div>
        </div>
        <div style={{ flex: 1, background: W.card, borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: W.textMuted, letterSpacing: 0.8 }}>STRESS</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
            <span style={{ fontSize: 13, color: W.yellow, fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif" }}>2.1</span>
            <span style={{ fontSize: 12, color: W.yellow, fontWeight: 600 }}>Elevated</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// MEAL LOGGER
// ════════════════════════════════════════
function MealLogger({ label, onClose }) {
  const [stage, setStage] = useState("prompt");
  return (
    <div style={{ marginTop: 8, borderRadius: 10, overflow: "hidden", border: `1px solid ${W.orange}25`, background: W.bgDeep }}>
      {stage === "prompt" && (
        <div style={{ padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: W.orange, fontWeight: 600, marginBottom: 8 }}>📸 LOG YOUR {label.toUpperCase()}</div>
          <div onClick={() => { setStage("scanning"); setTimeout(() => setStage("result"), 2500); }} style={{
            padding: "18px 12px", borderRadius: 10, cursor: "pointer",
            border: `1.5px dashed ${W.orange}40`, background: `${W.orange}08`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>📷</div>
            <div style={{ fontSize: 12, color: W.textSec }}>Tap to snap a photo of your meal</div>
            <div style={{ fontSize: 10, color: W.textDim, marginTop: 4 }}>AI will estimate calories & macros in seconds</div>
          </div>
          <div onClick={onClose} style={{ fontSize: 10, color: W.textDim, marginTop: 8, cursor: "pointer" }}>Skip for now</div>
        </div>
      )}
      {stage === "scanning" && (
        <div style={{ padding: "16px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 6, animation: "pulseScan 1.2s infinite" }}>🔍</div>
          <div style={{ fontSize: 12, color: W.orange, fontWeight: 600 }}>Analyzing your meal...</div>
        </div>
      )}
      {stage === "result" && (
        <div style={{ padding: "12px", animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: `${W.orange}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🥗</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: W.text, fontWeight: 700 }}>Greek Salad with Grilled Chicken</div>
              <div style={{ fontSize: 10, color: W.textMuted }}>Lettuce, chicken, feta, olives, dressing</div>
            </div>
            <div style={{ fontSize: 9, color: W.green, fontWeight: 600, background: W.greenBg, padding: "3px 8px", borderRadius: 5 }}>✓ Logged</div>
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            {[
              { l: "Cal", v: "480", c: W.text },
              { l: "Protein", v: "38g", c: W.green },
              { l: "Carbs", v: "22g", c: W.blue },
              { l: "Fat", v: "18g", c: W.yellow },
            ].map((n) => (
              <div key={n.l} style={{ flex: 1, padding: "6px 4px", background: W.cardInner, borderRadius: 6, textAlign: "center" }}>
                <div style={{ fontSize: 7, color: W.textDim, letterSpacing: 0.8, fontWeight: 700 }}>{n.l}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: n.c, marginTop: 1, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{n.v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "8px 10px", background: W.coralBg, borderRadius: 8, border: `1px solid ${W.coral}15`, display: "flex", alignItems: "flex-start", gap: 8 }}>
            <PamelaAvatar size={18} />
            <div style={{ fontSize: 10, color: W.coralSoft, lineHeight: 1.5 }}>
              Love this — 38g protein will keep you full all afternoon. Clean and simple. ♥️
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════
// PAMELA CHAT (Full-screen overlay)
// ════════════════════════════════════════
function PamelaChat({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "pamela", text: "Hey Sarah! ♥️ Ask me anything — workouts, meals, stress, sleep. I'm here for you. 💕" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  const RESPONSES = {
    default: "You're doing amazing, Sarah. 6 lbs in 6 weeks is real progress. Stay consistent and trust the process — the results will follow. ♥️",
    sleep: "Your deep sleep has been averaging 5.8 hours — you need closer to 7 for proper hunger hormone regulation. The stretch + breathwork tonight will help. Try to be in bed by 11. ♥️",
    eat: "For tonight, I'd suggest something simple — grilled salmon with roasted vegetables. High protein, anti-inflammatory, and you can prep it in 20 minutes. Keep it clean and nourishing.",
    stress: "I see your stress score has been elevated for 2 weeks. That's your body holding onto weight regardless of what you eat. The 10-min breathwork tonight is not optional — it's the most important thing on your plan today.",
    workout: "Based on your recovery today, I'd pick my 20-minute full body sculpt — no equipment, moderate intensity, focused on toning. It's perfect for a yellow recovery day.",
    cravings: "Cravings are your body's way of asking for something — usually it's stress or low protein. Have a small piece of dark chocolate if you need it, no guilt. Then make sure dinner has 35g+ protein. ♥️",
  };

  const getResponse = (msg) => {
    const l = msg.toLowerCase();
    if (l.includes("sleep") || l.includes("tired") || l.includes("bed")) return RESPONSES.sleep;
    if (l.includes("eat") || l.includes("food") || l.includes("dinner") || l.includes("lunch")) return RESPONSES.eat;
    if (l.includes("stress") || l.includes("anxious") || l.includes("overwhelm")) return RESPONSES.stress;
    if (l.includes("workout") || l.includes("exercise") || l.includes("train")) return RESPONSES.workout;
    if (l.includes("crav") || l.includes("sweet") || l.includes("chocolate") || l.includes("snack")) return RESPONSES.cravings;
    return RESPONSES.default;
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => { setMessages((m) => [...m, { role: "pamela", text: getResponse(userMsg) }]); setTyping(false); }, 1500);
  };

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, background: W.bg, display: "flex", flexDirection: "column", maxWidth: 393, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ padding: "12px 16px", background: W.card, borderBottom: `1px solid ${W.cardBorder}`, display: "flex", alignItems: "center", gap: 12 }}>
        <div onClick={onClose} style={{ fontSize: 18, color: W.textSec, cursor: "pointer", padding: "4px" }}>←</div>
        <PamelaAvatar size={36} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: W.coral, fontFamily: "'Bricolage Grotesque', sans-serif" }}>Pamela Reif</div>
          <div style={{ fontSize: 10, color: W.textDim }}>Online · Fitness Coach</div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: W.green }} />
      </div>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative",
            backgroundImage: `url(${PAMELA_BG})`,
            backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(19,19,22,0.82)", pointerEvents: "none" }} />
        <div style={{ position: "relative", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10, minHeight: "100%" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", display: "flex", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
            {m.role === "pamela" && <PamelaAvatar size={28} />}
            <div style={{
              padding: "10px 14px", fontSize: 13, color: W.textSec, lineHeight: 1.65,
              borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.role === "user" ? `${W.coral}15` : W.card,
              border: `1px solid ${m.role === "user" ? W.coral + "25" : W.coral + "12"}`,
            }}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", gap: 8, alignSelf: "flex-start" }}>
            <PamelaAvatar size={28} />
            <div style={{ padding: "12px 16px", background: W.card, borderRadius: "14px 14px 14px 4px", border: `1px solid ${W.coral}12` }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((d) => <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: W.coral, opacity: 0.4, animation: `pulseScan 1.2s infinite ${d * 0.2}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
        </div>
      </div>
      {/* Quick prompts */}
      <div style={{ padding: "8px 16px 0", background: W.card, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["What should I eat tonight?", "I'm craving sweets — help", "Pick a workout for me"].map((q) => (
          <div key={q} onClick={() => { setInput(q); }} style={{ padding: "6px 10px", borderRadius: 16, background: W.cardInner, border: `1px solid ${W.cardBorder}`, fontSize: 10, color: W.textSec, cursor: "pointer" }}>{q}</div>
        ))}
      </div>
      {/* Input */}
      <div style={{ padding: "10px 16px 24px", background: W.card, borderTop: `1px solid ${W.cardBorder}`, display: "flex", gap: 8, alignItems: "center" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask Pamela..." style={{ flex: 1, padding: "10px 14px", borderRadius: 20, background: W.cardInner, border: `1px solid ${W.cardBorder}`, color: W.text, fontSize: 13, outline: "none" }} />
        <div onClick={send} style={{
          width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
          background: input.trim() ? `${W.coral}25` : W.cardInner,
          border: `1px solid ${input.trim() ? W.coral + "44" : W.cardBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 14, color: input.trim() ? W.coral : W.textDim }}>↑</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// SECTION 3: COACH — Pamela Reif
// ════════════════════════════════════════
function CoachSection() {
  const [expanded, setExpanded] = useState(true);
  const [openMeal, setOpenMeal] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const PLAN = [
    { id: "water", time: "NOW", icon: "🥤", action: "Start with a big glass of water", reason: "Hydration reduces false hunger signals", color: W.green, meal: false, voice: false },
    { id: "lunch", time: "12:00 PM", icon: "🥗", action: "Lunch: high-protein, moderate carbs", reason: "Target 35g+ protein to stay full. Snap a photo!", color: W.orange, meal: true, voice: false },
    { id: "walk", time: "2:00 PM", icon: "🚶‍♀️", action: "15-min walk — Elm Street Pocket Park", reason: "New park 4 min from your office — 4.6★ on Google Maps. Cortisol reset ☀️", color: W.blue, meal: false, voice: false },
    { id: "workout", time: "5:30 PM", icon: "💪", action: "20-min Pamela Reif home workout", reason: "No equipment needed. I'll pick the right one for your recovery level.", color: W.coral, meal: false, voice: false },
    { id: "dinner", time: "7:00 PM", icon: "🍽", action: "Dinner by 7pm — lean protein + veggies", reason: "Keep it clean. Snap a photo!", color: W.orange, meal: true, voice: false },
    { id: "stretch", time: "9:30 PM", icon: "🧘", action: "Stretch + breathwork + voice check-in", reason: "Wind down AND log your day — hold the mic ♥️", color: W.violet, meal: false, voice: true },
    { id: "sleep", time: "11:00 PM", icon: "🌙", action: "Lights out → Wake 7:00 AM", reason: "8h window. Sleep = hunger hormone control.", color: W.textDim, meal: false, voice: false },
  ];

  return (
    <div style={{ margin: "0 16px 12px" }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: W.textDim, letterSpacing: 2, marginBottom: 8, paddingLeft: 2, fontFamily: "'Bricolage Grotesque', sans-serif" }}>YOUR COACH</div>
      <div style={{ background: W.card, borderRadius: 16, border: `1px solid ${W.coralBorder}`, overflow: "hidden" }}>
        {/* Coach Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: `linear-gradient(135deg, ${W.coralBg} 0%, transparent 60%)` }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <PamelaAvatar size={52} />
            <div style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: W.green, border: `2px solid ${W.card}` }} />
          </div>
          <div onClick={() => setExpanded(!expanded)} style={{ flex: 1, minWidth: 0, cursor: "pointer" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: W.coral, fontFamily: "'Bricolage Grotesque', sans-serif" }}>Pamela Reif</div>
            <div style={{ fontSize: 10, color: W.coralSoft, marginTop: 1 }}>Home Fitness & Clean Eating Coach</div>
            <div style={{ fontSize: 11, color: W.textSec, marginTop: 4, lineHeight: 1.3 }}>
              {expanded ? "Here's your wellness plan for today ♥️" : "Your stress is up — I've adjusted today's plan ›"}
            </div>
          </div>
          <div onClick={() => setChatOpen(true)} style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: W.coralBg, border: `1.5px solid ${W.coral}33`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <span style={{ fontSize: 18 }}>💬</span>
          </div>
        </div>

        {expanded && (
          <div style={{ padding: "0 16px 16px" }}>
            {/* Pamela's personalized message */}
            <div style={{ padding: "14px 16px", background: W.bgDeep, borderRadius: 14, border: `1px solid ${W.coral}12`, marginBottom: 12, position: "relative" }}>
              <div style={{ position: "absolute", top: 6, left: 12, fontSize: 30, color: W.coral, opacity: 0.1, lineHeight: 1 }}>"</div>
              <div style={{ fontSize: 13, color: W.textSec, lineHeight: 1.8, paddingLeft: 4 }}>
                Good morning, Sarah ♥️ Week 6 and you're ahead of schedule — 6 lbs down already. That's amazing. I noticed your stress has been elevated for 2 weeks, and <span style={{ color: W.coral, fontWeight: 600 }}>that's what's been slowing your progress — cortisol tells your body to hold onto weight.</span> So today we're not cutting calories. We're bringing that stress down. Small steps, every day.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, paddingTop: 10, borderTop: `1px solid ${W.cardBorder}` }}>
                <PamelaAvatar size={22} />
                <div style={{ fontSize: 10, color: W.coralSoft, fontStyle: "italic" }}>Pamela · based on your last 42 days of data</div>
              </div>
            </div>

            {/* Calendar note */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, padding: "6px 10px", background: W.cardInner, borderRadius: 8 }}>
              <span style={{ fontSize: 12 }}>📅</span>
              <span style={{ fontSize: 10, color: W.textMuted }}>Fitted to your calendar — every action lands in a free slot</span>
            </div>

            {/* Timeline */}
            <div style={{ fontSize: 9, fontWeight: 700, color: W.textDim, letterSpacing: 1.8, marginBottom: 8 }}>TODAY'S WELLNESS PLAN</div>
            {PLAN.map((item, i) => (
              <div key={item.id}>
                <div style={{
                  display: "flex", gap: 12, padding: "10px 12px",
                  background: i === 0 ? `${item.color}10` : "transparent",
                  borderRadius: 10, marginBottom: openMeal === item.id ? 0 : 2,
                  border: i === 0 ? `1px solid ${item.color}22` : "1px solid transparent",
                }}>
                  <div style={{ width: 48, flexShrink: 0, textAlign: "right", paddingTop: 2 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: item.color }}>{item.time}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 12, flexShrink: 0, paddingTop: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, boxShadow: `0 0 6px ${item.color}44` }} />
                    {i < PLAN.length - 1 && <div style={{ width: 1, flex: 1, background: W.cardBorder, marginTop: 4 }} />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 6 }}>
                    <div style={{ fontSize: 13, color: W.text, fontWeight: 600 }}>
                      <span style={{ marginRight: 6 }}>{item.icon}</span>{item.action}
                    </div>
                    <div style={{ fontSize: 10, color: W.textMuted, marginTop: 2 }}>{item.reason}</div>
                    {item.meal && openMeal !== item.id && (
                      <div onClick={() => setOpenMeal(item.id)} style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        marginTop: 6, padding: "5px 10px", borderRadius: 7,
                        background: W.orangeBg, border: `1px solid ${W.orange}25`, cursor: "pointer",
                      }}>
                        <span style={{ fontSize: 12 }}>📸</span>
                        <span style={{ fontSize: 10, color: W.orange, fontWeight: 600 }}>Log meal photo</span>
                      </div>
                    )}
                    {item.voice && (
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        marginTop: 6, padding: "5px 10px", borderRadius: 7,
                        background: W.violetBg, border: `1px solid ${W.violet}25`,
                      }}>
                        <span style={{ fontSize: 12 }}>🎙</span>
                        <span style={{ fontSize: 10, color: W.violet, fontWeight: 600 }}>Voice check-in available</span>
                      </div>
                    )}
                  </div>
                </div>
                {item.meal && openMeal === item.id && (
                  <div style={{ marginLeft: 72, marginBottom: 6 }}>
                    <MealLogger label={item.id} onClose={() => setOpenMeal(null)} />
                  </div>
                )}
              </div>
            ))}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button style={{ flex: 1, padding: "11px", borderRadius: 10, background: `${W.green}15`, border: `1px solid ${W.greenBorder}`, color: W.green, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Bricolage Grotesque', sans-serif" }}>✓ Let's Go</button>
              <button style={{ flex: 1, padding: "11px", borderRadius: 10, background: W.cardInner, border: `1px solid ${W.cardBorder}`, color: W.textSec, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Adjust Plan →</button>
            </div>
          </div>
        )}
      </div>
      {chatOpen && <PamelaChat onClose={() => setChatOpen(false)} />}
    </div>
  );
}

// ════════════════════════════════════════
// SECTION 4: MY LOG
// ════════════════════════════════════════
function MyLogSection() {
  const days = ["TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"];
  const filled = [false, false, false, false, true, false, false];
  const [voiceState, setVoiceState] = useState("idle");
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const [waveHeights, setWaveHeights] = useState(Array.from({ length: 24 }, () => 6));

  useEffect(() => {
    if (voiceState === "recording") {
      const waveInterval = setInterval(() => {
        setWaveHeights(Array.from({ length: 24 }, () => Math.max(4, 4 + Math.random() * 20)));
      }, 120);
      return () => clearInterval(waveInterval);
    }
  }, [voiceState]);

  const handleVoice = () => {
    if (voiceState === "idle") {
      setVoiceState("recording");
      setTimer(0);
      intervalRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
      setTimeout(() => {
        clearInterval(intervalRef.current);
        setVoiceState("processing");
      }, 3500);
      setTimeout(() => setVoiceState("done"), 5500);
    } else if (voiceState === "recording") {
      clearInterval(intervalRef.current);
      setVoiceState("processing");
      setTimeout(() => setVoiceState("done"), 1500);
    } else if (voiceState === "done") {
      setVoiceState("idle");
    }
  };

  return (
    <div style={{ margin: "0 16px 12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: W.text, fontFamily: "'Bricolage Grotesque', sans-serif" }}>My Log</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${W.textMuted}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <span style={{ color: W.textSec, fontSize: 16 }}>+</span>
        </div>
      </div>
      <div style={{ background: W.card, borderRadius: 14, padding: "14px", marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: W.textMuted, letterSpacing: 1, marginBottom: 8 }}>TODAY'S ACTIVITIES</div>
        {/* Sleep card */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "#8BA4C418", marginBottom: 8 }}>
          <div style={{ padding: "5px 12px", borderRadius: 8, background: "#8BA4C430", fontWeight: 700, color: W.text, fontSize: 14, minWidth: 50, textAlign: "center", fontFamily: "'Bricolage Grotesque', sans-serif" }}>7:12</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: W.text }}>SLEEP</div>
          </div>
          <div style={{ fontSize: 10, color: W.textMuted, textAlign: "right", lineHeight: 1.4 }}>
            <div>11:30 PM</div><div>6:42 AM</div>
          </div>
        </div>

        {/* Voice logged activities */}
        {voiceState === "done" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8, animation: "fadeIn 0.4s ease" }}>
            {[
              { icon: "☕", name: "Latte + Croissant", detail: "8:15 AM · 420 cal", color: W.orange },
              { icon: "🏋️", name: "Ab Workout (Pamela)", detail: "12:30 PM · Strain 6.2 · 15 min", color: W.coral },
            ].map((a) => (
              <div key={a.name} style={{ padding: "8px 12px", borderRadius: 8, background: `${a.color}10`, border: `1px solid ${a.color}18`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: W.text }}>{a.name}</div>
                    <div style={{ fontSize: 9, color: W.textMuted }}>{a.detail}</div>
                  </div>
                </div>
                <span style={{ fontSize: 8, color: W.green, fontWeight: 600, background: W.greenBg, padding: "2px 6px", borderRadius: 4 }}>✓ Logged</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px", background: W.coralBg, borderRadius: 8, border: `1px solid ${W.coral}15` }}>
              <PamelaAvatar size={18} />
              <div style={{ fontSize: 10, color: W.coralSoft, lineHeight: 1.5 }}>Great start — the croissant is fine, don't stress it. The ab workout at lunch is perfect for keeping your metabolism up. ♥️</div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          <button style={{ flex: 1, padding: "9px", background: W.cardInner, border: `1px solid ${W.cardBorder}`, borderRadius: 10, color: W.textSec, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>+ ADD ACTIVITY</button>
          <button style={{ flex: 1, padding: "9px", background: W.cardInner, border: `1px solid ${W.cardBorder}`, borderRadius: 10, color: W.textSec, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>⏱ START ACTIVITY</button>
        </div>

        {/* Voice Logger */}
        <div onClick={handleVoice} style={{
          padding: voiceState === "recording" ? "14px 16px" : "11px 16px",
          borderRadius: 12, cursor: "pointer", transition: "all 0.3s ease",
          background: voiceState === "recording" ? `${W.green}18` : W.cardInner,
          border: `1.5px solid ${voiceState === "recording" ? W.green + "55" : voiceState === "done" ? W.green + "33" : W.cardBorder}`,
          boxShadow: voiceState === "recording" ? `0 0 20px ${W.green}22` : "none",
          textAlign: "center", marginBottom: 12,
        }}>
          {voiceState === "idle" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>🎙</span>
              <span style={{ fontSize: 12, color: W.green, fontWeight: 600 }}>Hold to tell me about your day</span>
            </div>
          )}
          {voiceState === "recording" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: W.red, animation: "pulseScan 0.8s infinite" }} />
                <span style={{ fontSize: 12, color: W.green, fontWeight: 700 }}>Listening...</span>
                <span style={{ fontSize: 11, color: W.textMuted }}>0:{timer.toString().padStart(2, "0")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, height: 24, marginBottom: 8 }}>
                {waveHeights.map((h, i) => (
                  <div key={i} style={{ width: 3, borderRadius: 2, background: W.coral, height: h, opacity: 0.4 + Math.random() * 0.6, transition: "height 0.12s ease" }} />
                ))}
              </div>
              <div style={{ padding: "8px 12px", background: W.bgDeep, borderRadius: 8, fontSize: 12, color: W.textSec, textAlign: "left", fontStyle: "italic" }}>
                "I had a latte and a croissant this morning on the way to work, then I did Pamela's 15-minute ab workout at lunch."
              </div>
              <div style={{ fontSize: 10, color: W.textDim, marginTop: 6 }}>Tap again to finish</div>
            </div>
          )}
          {voiceState === "processing" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "4px 0" }}>
              <div style={{ fontSize: 16, animation: "pulseScan 1s infinite" }}>🔍</div>
              <span style={{ fontSize: 12, color: W.textSec }}>Analyzing your input...</span>
            </div>
          )}
          {voiceState === "done" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>✅</span>
              <span style={{ fontSize: 12, color: W.green, fontWeight: 600 }}>2 items logged — tap to reset</span>
            </div>
          )}
        </div>

        {/* Journal */}
        <div style={{ borderTop: `1px solid ${W.cardBorder}`, paddingTop: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: W.textMuted, letterSpacing: 1, marginBottom: 8 }}>JOURNAL</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            {days.map((d, i) => (
              <div key={d} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 9, color: W.textMuted, marginBottom: 3 }}>{d}</div>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: `1.5px solid ${filled[i] ? W.green : W.textDim}`,
                  background: filled[i] ? W.green : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{filled[i] && <span style={{ color: W.bg, fontSize: 10, fontWeight: 700 }}>✓</span>}</div>
              </div>
            ))}
          </div>
          <button style={{ width: "100%", padding: "9px", background: W.cardInner, border: `1px solid ${W.cardBorder}`, borderRadius: 10, color: W.textSec, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>✨ RECOVERY INSIGHTS</button>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───
function BottomNav() {
  return (
    <div style={{ position: "sticky", bottom: 0, background: W.navBg, borderTop: `1px solid ${W.navBorder}`, display: "flex", justifyContent: "space-around", alignItems: "center", padding: "8px 0 20px" }}>
      {[
        { label: "Home", icon: "⌂", active: true },
        { label: "Health", icon: "♡" },
        { label: "Community", icon: "⫶" },
        { label: "More", icon: "≡" },
      ].map((t) => (
        <div key={t.label} style={{ textAlign: "center", cursor: "pointer" }}>
          <div style={{ fontSize: 18, color: t.active ? W.text : W.textDim }}>{t.icon}</div>
          <div style={{ fontSize: 8, color: t.active ? W.text : W.textDim, marginTop: 1 }}>{t.label}</div>
        </div>
      ))}
      <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #1A2E3D, #162638)", border: `1.5px solid #00BFA544`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <span style={{ fontSize: 15, fontWeight: 800, color: W.blue, fontFamily: "'Bricolage Grotesque', sans-serif" }}>W</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════
export default function App() {
  return (
    <div style={{ background: W.bg, minHeight: "100vh", maxWidth: 393, margin: "0 auto", fontFamily: "'Nunito Sans', sans-serif", color: W.text, border: `1px solid ${W.cardBorder}`, position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Nunito+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulseScan { 0%,100% { opacity:0.6; transform:scale(1) } 50% { opacity:1; transform:scale(1.1) } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }
        input::placeholder { color: ${W.textDim}; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
      <div style={{ height: "100vh", overflowY: "auto", paddingBottom: 70 }}>
        <StatusBar />
        <TopBar />
        <GoalSection />
        <StatusSection />
        <CoachSection />
        <MyLogSection />
      </div>
      <BottomNav />
    </div>
  );
}
