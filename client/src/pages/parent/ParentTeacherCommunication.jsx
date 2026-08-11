import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const mockInstructors = [
  {
    id: 1,
    name: 'Mr. Hailemariam Desalegn',
    subject: 'Mathematics (10th Grade)',
    role: 'Homeroom Teacher',
    avatar: '👨‍🏫',
    email: 'hailemariam@azenewube.edu.et',
  },
  {
    id: 2,
    name: 'Mrs. Selamawit Bekele',
    subject: 'Physics (10th Grade)',
    role: 'Subject Instructor',
    avatar: '👩‍🏫',
    email: 'selamawit@azenewube.edu.et',
  },
  {
    id: 3,
    name: 'Dr. Yared Tilahun',
    subject: 'Chemistry (10th Grade)',
    role: 'Subject Instructor',
    avatar: '👨‍🔬',
    email: 'yared@azenewube.edu.et',
  },
  {
    id: 4,
    name: 'Ms. Bethlehem Assefa',
    subject: 'English (10th Grade)',
    role: 'Subject Instructor',
    avatar: '👩‍💼',
    email: 'bethlehem@azenewube.edu.et',
  },
  {
    id: 5,
    name: 'Mr. Dawit Kebede',
    subject: 'Biology (10th Grade)',
    role: 'Subject Instructor',
    avatar: '👨‍🏫',
    email: 'dawit@azenewube.edu.et',
  },
];

const initialMessages = [
  {
    id: 101,
    instructorId: 1,
    instructorName: 'Mr. Hailemariam Desalegn',
    subject: 'Abebe’s Math Test 1 Performance',
    date: '2026-08-08 10:30 AM',
    sender: 'Parent',
    senderName: 'Bikila Abebe (Father)',
    content: 'Good morning Mr. Hailemariam, thank you for guiding Abebe in algebra. Could you please share recommended extra practice worksheets for his final exam preparation?',
    reply: 'Good day Mr. Bikila! Abebe is doing exceptionally well (90%). I have uploaded supplementary practice sets to the Study Materials section.',
    replyDate: '2026-08-08 02:15 PM',
    status: 'Replied',
  },
  {
    id: 102,
    instructorId: 2,
    instructorName: 'Mrs. Selamawit Bekele',
    subject: 'Physics Lab Participation',
    date: '2026-08-09 11:15 AM',
    sender: 'Parent',
    senderName: 'Bikila Abebe (Father)',
    content: 'Hello Mrs. Selamawit, we noticed Abebe’s score in Physics improved to 83%. We appreciate your dedication in encouraging his lab work.',
    reply: 'Thank you Mr. Bikila! Abebe has been very attentive in lab sessions.',
    replyDate: '2026-08-09 04:00 PM',
    status: 'Replied',
  },
];

export default function ParentTeacherCommunication() {
  const { user } = useAuth();
  const parentName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Parent';

  const [selectedInstructor, setSelectedInstructor] = useState(mockInstructors[0]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState(initialMessages);
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setSending(true);

    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        instructorId: selectedInstructor.id,
        instructorName: selectedInstructor.name,
        subject,
        date: new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }),
        sender: 'Parent',
        senderName: parentName,
        content: message,
        reply: null,
        replyDate: null,
        status: 'Sent (Pending Reply)',
      };

      setMessagesList([newMessage, ...messagesList]);
      setSubject('');
      setMessage('');
      setSending(false);
      setSuccessMsg(`Your message has been sent directly to ${selectedInstructor.name}!`);

      setTimeout(() => setSuccessMsg(''), 4000);
    }, 600);
  };

  const filteredMessages = messagesList.filter((m) => m.instructorId === selectedInstructor.id);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-purple-400">
            Direct Parent-Teacher Communication Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Connect with Course Instructors 💬
          </h1>
          <p className="text-slate-300 text-sm">
            Send private comments, academic inquiries, or feedback directly to Abebe's subject teachers.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Instructor Selector Column */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <i className="fas fa-chalkboard-teacher text-purple-500" /> Select Course Instructor
          </h3>

          <div className="space-y-2.5">
            {mockInstructors.map((inst) => {
              const isSelected = selectedInstructor.id === inst.id;
              return (
                <div
                  key={inst.id}
                  onClick={() => setSelectedInstructor(inst)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-400 text-purple-950 dark:text-purple-100 shadow-md ring-2 ring-purple-400/40'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-purple-300'
                  }`}
                >
                  <div className="w-11 h-11 rounded-2xl bg-purple-500/10 text-slate-900 dark:text-white flex items-center justify-center text-2xl shrink-0">
                    {inst.avatar}
                  </div>
                  <div className="flex-1 truncate">
                    <h4 className="font-bold text-sm truncate">{inst.name}</h4>
                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400 block truncate">{inst.subject}</span>
                    <span className="text-[10px] text-slate-400 block">{inst.role}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Form & History Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Instructor Header */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-2xl flex items-center justify-center">
                {selectedInstructor.avatar}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{selectedInstructor.name}</h3>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{selectedInstructor.subject}</p>
              </div>
            </div>
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full font-mono">
              {selectedInstructor.email}
            </span>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-sm font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
              <i className="fas fa-check-circle text-lg" /> {successMsg}
            </div>
          )}

          {/* New Message / Comment Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <i className="fas fa-paper-plane text-purple-500" /> Send Comment / Inquiry to {selectedInstructor.name}
            </h4>

            <div className="space-y-1">
              <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
                Message Subject / Course Topic *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Abebe's Homework & Exam Preparation"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
                Comment / Message Content *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Type your message, feedback, or question for the instructor..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              {sending ? 'Sending...' : 'Send Message to Instructor'} <i className="fas fa-paper-plane" />
            </button>
          </form>

          {/* Conversation History */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <i className="fas fa-history text-purple-500" /> Communication History ({filteredMessages.length})
            </h4>

            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                No messages sent to {selectedInstructor.name} yet. Use the form above to start a conversation.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{msg.subject}</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                        {msg.status}
                      </span>
                    </div>

                    {/* Parent Message */}
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between text-slate-400 font-medium">
                        <span>From: {msg.senderName}</span>
                        <span>{msg.date}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 font-normal">{msg.content}</p>
                    </div>

                    {/* Instructor Reply */}
                    {msg.reply && (
                      <div className="p-3.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/60 text-xs space-y-1 ml-4 border-l-4 border-l-purple-500">
                        <div className="flex justify-between text-purple-700 dark:text-purple-300 font-bold">
                          <span>Instructor Reply ({msg.instructorName}):</span>
                          <span className="font-normal text-slate-400">{msg.replyDate}</span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 font-medium">{msg.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
