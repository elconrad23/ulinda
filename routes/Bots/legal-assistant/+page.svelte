<!-- src/routes/bots/legal-assistant/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { Send, Bot, User } from 'lucide-svelte';

  let messages: { role: 'user' | 'bot'; content: string }[] = [];
  let input = '';
  let isLoading = false;

  async function sendMessage() {
    if (!input.trim() || isLoading) return;

    messages = [...messages, { role: 'user', content: input }];
    const userMsg = input;
    input = '';
    isLoading = true;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await res.json();
      messages = [...messages, { role: 'bot', content: data.answer || 'Sorry, no response.' }];
    } catch (err) {
      messages = [...messages, { role: 'bot', content: '❌ Connection error. Is the backend running?' }];
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    // Optional: load chat history from localStorage or backend
  });
</script>

<div class="max-w-3xl mx-auto h-screen flex flex-col bg-zinc-950 text-white">
  <header class="p-4 border-b flex items-center gap-3 bg-zinc-900">
    <Bot class="w-8 h-8 text-emerald-400" />
    <h1 class="text-2xl font-semibold">Ulinda Legal Assistant</h1>
  </header>

  <div class="flex-1 overflow-y-auto p-6 space-y-6" id="chat">
    {#each messages as msg}
      <div class="flex gap-4 {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[75%]">
          <div class="flex items-center gap-2 mb-1">
            {#if msg.role === 'bot'}
              <Bot class="w-5 h-5 text-emerald-400" />
            {:else}
              <User class="w-5 h-5" />
            {/if}
            <span class="text-sm font-medium">{msg.role === 'user' ? 'You' : 'Ulinda'}</span>
          </div>
          <div class="rounded-2xl px-5 py-3 {msg.role === 'user' ? 'bg-emerald-600' : 'bg-zinc-800'}">
            {msg.content}
          </div>
        </div>
      </div>
    {/each}
    {#if isLoading}
      <div class="flex justify-start gap-4">
        <Bot class="w-5 h-5 text-emerald-400" />
        <div class="bg-zinc-800 rounded-2xl px-5 py-3">Thinking...</div>
      </div>
    {/if}
  </div>

  <div class="p-4 border-t bg-zinc-900">
    <form on:submit|preventDefault={sendMessage} class="flex gap-3">
      <input
        bind:value={input}
        type="text"
        placeholder="Ask Ulinda anything about Ugandan law..."
        class="flex-1 bg-zinc-800 rounded-3xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="submit"
        disabled={isLoading}
        class="bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 px-8 rounded-3xl flex items-center gap-2 transition"
      >
        <Send class="w-5 h-5" />
        Send
      </button>
    </form>
  </div>
</div>

<style>
  #chat { scrollbar-width: thin; }
</style>