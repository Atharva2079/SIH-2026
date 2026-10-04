import { PageHeader, StatusBadge } from './SharedComponents';
import { Search, Filter, Send, User, Bot, Plus, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

// --- DATA TABLE TEMPLATE ---
export function DataTableTemplate({ title, subtitle, columns, data }: { title: string, subtitle: string, columns: string[], data: any[][] }) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full">
      <PageHeader title={title} subtitle={subtitle} actions={
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-[var(--muted)] rounded-lg text-sm font-medium flex items-center gap-2 border border-[var(--border)]"><Filter className="w-4 h-4"/> Filter</button>
           <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4"/> Add New</button>
        </div>
      } />
      
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-sm overflow-hidden flex-1 flex flex-col">
         <div className="p-4 border-b border-[var(--border)] flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
               <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
               <input type="text" placeholder="Search records..." className="w-full pl-9 pr-4 py-2 bg-[var(--muted)] rounded-lg text-sm border border-transparent focus:border-primary outline-none" />
            </div>
         </div>
         <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left whitespace-nowrap">
               <thead className="bg-[var(--muted)] text-[var(--muted-foreground)]">
                  <tr>
                     {columns.map((col, i) => <th key={i} className="p-4 font-semibold">{col}</th>)}
                     <th className="p-4 w-10"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[var(--border)]">
                  {data.map((row, i) => (
                     <tr key={i} className="hover:bg-[var(--muted)]/30 transition-colors">
                        {row.map((cell, j) => (
                           <td key={j} className="p-4">
                              {typeof cell === 'string' && (cell.toLowerCase() === 'active' || cell.toLowerCase() === 'completed' || cell.toLowerCase() === 'pending' || cell.toLowerCase() === 'error') ? (
                                 <StatusBadge status={cell.toLowerCase()} />
                              ) : cell}
                           </td>
                        ))}
                        <td className="p-4 text-right">
                           <button className="text-[var(--muted-foreground)] hover:text-primary"><MoreVertical className="w-4 h-4" /></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

// --- CHATBOT TEMPLATE ---
export function ChatbotTemplate({ title, subtitle, welcomeMsg }: { title: string, subtitle: string, welcomeMsg: string }) {
   const [msgs, setMsgs] = useState([{ sender: 'bot', text: welcomeMsg }]);
   const [input, setInput] = useState('');

   const send = () => {
      if(!input.trim()) return;
      setMsgs([...msgs, { sender: 'user', text: input }, { sender: 'bot', text: "I'm a prototype AI. In the real system, I would process this request contextually." }]);
      setInput('');
   };

   return (
      <div className="max-w-4xl mx-auto flex flex-col h-[80vh]">
         <PageHeader title={title} subtitle={subtitle} />
         <div className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
               {msgs.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                     {m.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Bot className="w-4 h-4 text-primary" /></div>}
                     <div className={`p-3 rounded-2xl max-w-[70%] text-sm ${m.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-[var(--muted)] rounded-bl-none border border-[var(--border)]'}`}>
                        {m.text}
                     </div>
                     {m.sender === 'user' && <div className="w-8 h-8 rounded-full bg-saffron/20 flex items-center justify-center shrink-0"><User className="w-4 h-4 text-saffron" /></div>}
                  </div>
               ))}
            </div>
            <div className="p-4 border-t border-[var(--border)] bg-[var(--muted)]/30 flex gap-2">
               <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} type="text" placeholder="Type your message..." className="flex-1 p-3 rounded-xl border border-[var(--border)] outline-none focus:border-primary bg-[var(--card)]" />
               <button onClick={send} className="px-5 bg-primary text-white rounded-xl hover:bg-primary-light transition-colors"><Send className="w-5 h-5" /></button>
            </div>
         </div>
      </div>
   );
}

// --- FORM TEMPLATE ---
export function FormTemplate({ title, subtitle, fields }: { title: string, subtitle: string, fields: { label: string, type: string, placeholder?: string }[] }) {
   return (
      <div className="max-w-3xl mx-auto">
         <PageHeader title={title} subtitle={subtitle} />
         <div className="card-elevated p-8">
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
               {fields.map((f, i) => (
                  <div key={i}>
                     <label className="block text-sm font-medium mb-2">{f.label}</label>
                     {f.type === 'textarea' ? (
                        <textarea className="w-full p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] outline-none focus:border-primary resize-none h-32" placeholder={f.placeholder}></textarea>
                     ) : f.type === 'select' ? (
                        <select className="w-full p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] outline-none focus:border-primary">
                           <option>Select an option...</option>
                           <option>Option 1</option>
                           <option>Option 2</option>
                        </select>
                     ) : (
                        <input type={f.type} className="w-full p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] outline-none focus:border-primary" placeholder={f.placeholder} />
                     )}
                  </div>
               ))}
               <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-3">
                  <button className="px-6 py-2.5 rounded-lg border border-[var(--border)] font-medium hover:bg-[var(--muted)] transition-colors">Cancel</button>
                  <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary-light transition-colors">Submit Form</button>
               </div>
            </form>
         </div>
      </div>
   );
}

// --- KANBAN TEMPLATE ---
export function KanbanTemplate({ title, subtitle, columns }: { title: string, subtitle: string, columns: { name: string, color: string, cards: string[] }[] }) {
   return (
      <div className="max-w-7xl mx-auto h-full flex flex-col">
         <PageHeader title={title} subtitle={subtitle} actions={<button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2"><Plus className="w-4 h-4"/> Add Card</button>} />
         <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
            {columns.map((col, i) => (
               <div key={i} className="min-w-[300px] flex-1 bg-[var(--muted)]/50 rounded-xl p-4 border border-[var(--border)] flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-bold flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${col.color}`} /> {col.name}
                     </h3>
                     <span className="text-xs font-bold bg-[var(--card)] px-2 py-1 rounded-md border border-[var(--border)]">{col.cards.length}</span>
                  </div>
                  <div className="space-y-3 flex-1">
                     {col.cards.map((card, j) => (
                        <motion.div key={j} layoutId={`card-${i}-${j}`} className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-sm cursor-pointer hover:border-primary/50 transition-colors">
                           <p className="font-medium text-sm mb-2">{card}</p>
                           <div className="flex justify-between items-center text-xs text-[var(--muted-foreground)]">
                              <span>ID: #{Math.floor(Math.random() * 9000) + 1000}</span>
                              <div className="w-6 h-6 rounded-full bg-saffron/20 text-saffron flex items-center justify-center font-bold">U</div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

// --- ARTICLE TEMPLATE (For Public routes) ---
export function ArticleTemplate({ title, subtitle, paragraphs }: { title: string, subtitle: string, paragraphs: string[] }) {
   return (
      <div className="max-w-4xl mx-auto">
         <PageHeader title={title} subtitle={subtitle} />
         <div className="card-elevated p-8 space-y-6 text-lg leading-relaxed text-[var(--foreground)]/90">
            {paragraphs.map((p, i) => (
               <p key={i}>{p}</p>
            ))}
            <div className="my-8 w-full h-64 bg-[var(--muted)] rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] italic">
               [ Infographic / Illustration Placeholder ]
            </div>
         </div>
      </div>
   );
}
