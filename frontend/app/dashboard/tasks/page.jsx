'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, Clock, Plus } from 'lucide-react';

const INITIAL_TASKS = [
  { id: 1, title: 'File GSTR-1 for Monthly Output Sales', deadline: '11 Aug 2026', priority: 'High', done: false },
  { id: 2, title: 'Reconcile Bank Receipts & Invoices', deadline: '05 Aug 2026', priority: 'Medium', done: true },
  { id: 3, title: 'Deposit Monthly TDS Liability (Section 194J/192)', deadline: '07 Aug 2026', priority: 'High', done: false },
  { id: 4, title: 'Review Advance Tax Estimate for Q2', deadline: '15 Sep 2026', priority: 'Low', done: false },
];

export default function TasksPage() {
  const [taskList, setTaskList] = useState(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('2026-08-31');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [showForm, setShowForm] = useState(false);

  const toggleTask = (id) => {
    setTaskList(taskList.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      deadline: newTaskDeadline,
      priority: newTaskPriority,
      done: false
    };
    setTaskList([newTask, ...taskList]);
    setNewTaskTitle('');
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-7 h-7 text-emerald-500" /> Compliance Calendar & Task Manager
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Track statutory tax deadlines, GSTR filing schedules, and internal accounting tasks.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-1" /> Add Compliance Task
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 border-slate-200 dark:border-slate-800 bg-slate-900 text-white space-y-4">
          <h3 className="font-bold text-lg">Add New Compliance Task</h3>
          <form onSubmit={handleAddTask} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs text-slate-300 font-semibold">Task Title</label>
              <Input
                placeholder="e.g. Deposit Advance Tax Q2"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-semibold">Priority</label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
            <div className="sm:col-span-3 flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" variant="emerald">Save Task</Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Statutory & Accounting Task List</h3>
        <div className="space-y-3">
          {taskList.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                task.done
                  ? 'bg-slate-100/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60 line-through'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 ${task.done ? 'text-emerald-500' : 'text-slate-400'}`} />
                <span className="font-semibold text-sm text-slate-900 dark:text-white">{task.title}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Due: {task.deadline}
                </span>
                <Badge variant={task.priority === 'High' ? 'rose' : 'secondary'}>{task.priority}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
