"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, Crown, ExternalLink, Globe2, LoaderCircle, MessageCircle, ShieldCheck, Sparkles, Trash2 } from "lucide-react";

type Citation = { title?: string; url: string };
type Message = { role: "user" | "assistant"; content: string; citations?: Citation[] };

const suggestions = [
  "¿Qué dice la Constitución de Akenco?",
  "¿Cómo se construye una máquina de Create?",
  "¿Cómo funcionan las elecciones?",
  "¿Qué trabajos y empresas hay?"
];

const welcome: Message = {
  role: "assistant",
  content: "¡Saludos, ciudadano! 👑 Soy AkenIA, la asistente del Reino de Akenco. Puedo ayudarte con la Constitución, el Gobierno, los trabajos, la economía y los mods de Minecraft 1.21.1 NeoForge. ¿Qué necesitas saber?"
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function sendMessage(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;
    const next = [...messages, { role: "user" as const, content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12).map(({ role, content }) => ({ role, content })) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo obtener una respuesta.");
      setMessages([...next, { role: "assistant", content: data.answer, citations: data.citations || [] }]);
    } catch (error) {
      setMessages([...next, {
        role: "assistant",
        content: error instanceof Error ? error.message : "Ha ocurrido un error. Inténtalo de nuevo."
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  function clearChat() {
    if (!loading) setMessages([welcome]);
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="https://akenco.aprblox.es/" target="_blank" rel="noreferrer">
          <span className="brand-mark"><Crown size={23} /></span>
          <span><strong>AKENIA</strong><small>REINO DE AKENCO</small></span>
        </a>
        <div className="top-actions">
          <span className="online"><i /> Asistente en línea</span>
          <a className="site-link" href="https://akenco.aprblox.es/" target="_blank" rel="noreferrer">Web de Akenco <ExternalLink size={14} /></a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="hero-content">
          <div className="eyebrow"><Sparkles size={14} /> INTELIGENCIA DEL REINO</div>
          <h1>El conocimiento de<br /><span>Akenco</span>, a tu alcance.</h1>
          <p>Soy AkenIA. Pregúntame sobre las leyes, el Gobierno, la economía o los mods de nuestro mundo.</p>
          <div className="hero-pills"><span><ShieldCheck size={14}/> Asistente del Reino</span><span><Globe2 size={14}/> Minecraft 1.21.1 NeoForge</span></div>
        </div>
        <div className="crest"><Crown size={48} strokeWidth={1.2}/><span>AKENCO</span><small>DESDE 2022</small></div>
      </section>

      <section className="chat-layout">
        <aside className="sidebar">
          <div className="side-card">
            <div className="side-icon"><MessageCircle size={19}/></div>
            <h3>¿En qué puedo ayudarte?</h3>
            <p>Estoy especializada en el servidor y sus mods instalados.</p>
          </div>
          <div className="side-section">
            <span className="side-label">TEMAS QUE CONOZCO</span>
            {["Constitución · 37 artículos", "Gobierno y elecciones", "Trabajos y empresas", "Terrenos alquilables", "Mods y crafteos", "Vehículos y maquinaria"].map((item) => <div className="topic" key={item}><span className="topic-dot"/>{item}</div>)}
          </div>
          <a className="official-card" href="https://akenco.aprblox.es/" target="_blank" rel="noreferrer">
            <Globe2 size={17}/><span><b>Portal oficial</b><small>akenco.aprblox.es</small></span><ExternalLink size={13}/>
          </a>
        </aside>

        <section className="chat-card">
          <div className="chat-heading">
            <div className="assistant-avatar"><Crown size={19}/></div>
            <div><b>AkenIA</b><small>Tu asistente del Reino</small></div>
            <button className="clear-button" onClick={clearChat} title="Limpiar conversación" aria-label="Limpiar conversación"><Trash2 size={16}/></button>
          </div>
          <div className="messages">
            {messages.map((message, index) => (
              <div className={`message-row ${message.role}`} key={index}>
                {message.role === "assistant" && <div className="mini-avatar"><Crown size={14}/></div>}
                <div className="bubble">
                  <div className="message-text">{message.content}</div>
                  {!!message.citations?.length && <div className="citations"><span>Fuentes consultadas</span>{message.citations.map((citation, i) => <a key={`${citation.url}-${i}`} href={citation.url} target="_blank" rel="noreferrer">{citation.title || new URL(citation.url).hostname}<ExternalLink size={11}/></a>)}</div>}
                </div>
              </div>
            ))}
            {loading && <div className="message-row assistant"><div className="mini-avatar"><Crown size={14}/></div><div className="bubble typing"><LoaderCircle size={15} className="spin"/> AkenIA está consultando sus conocimientos...</div></div>}
            <div ref={bottomRef}/>
          </div>
          {messages.length === 1 && <div className="suggestions"><span>PRUEBA A PREGUNTAR</span><div>{suggestions.map((suggestion) => <button key={suggestion} onClick={() => void sendMessage(suggestion)}>{suggestion}</button>)}</div></div>}
          <form className="composer" onSubmit={handleSubmit}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escribe tu pregunta sobre Akenco..." maxLength={2000} disabled={loading} aria-label="Tu pregunta"/>
            <button type="submit" disabled={!input.trim() || loading} aria-label="Enviar pregunta"><ArrowUp size={19}/></button>
          </form>
          <div className="privacy-note">AkenIA puede cometer errores. Comprueba las leyes y decisiones importantes en las fuentes oficiales.</div>
        </section>
      </section>
      <footer><span>© Reino de Akenco · Fundado el 26 de agosto de 2022</span><span>Una herramienta para la comunidad</span></footer>
    </main>
  );
}
