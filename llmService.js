// llmService.js

const OpenAI = require('openai');
const { getContext, pushContext } = require('./memoryStore');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.handleQuery = async (userId, query, mode) => {
  console.log('LLM Service: handleQuery', mode, 'for user', userId);

  // 1. Retrieve past interactions for context
  const history = getContext(userId);  // array of { query, answer }
  console.log('LLM Service: retrieved history length =', history.length);

  // 2. Build the prompt messages
  const systemPrompt = mode === 'summarize'
    ? 'Summarize the following into 3 concise bullets.'
    : 'Answer the following query based on the user\'s context.';
  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  // include each past QA pair
  history.forEach(item => {
    messages.push({ role: 'user', content: item.query });
    messages.push({ role: 'assistant', content: item.answer });
  });

  // finally, the new user query
  messages.push({ role: 'user', content: query });
  console.log('LLM Service: prompt messages =', messages);

  // 3. Call the Chat Completion API
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    temperature: 0.3
  });

  const answer = response.choices[0].message.content.trim();
  console.log('LLM Service: answer =', answer);

  // 4. Save this QA back into memory
  pushContext(userId, { query, answer });

  return answer;
};
