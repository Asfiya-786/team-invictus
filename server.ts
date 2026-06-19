/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser for JSON
  app.use(express.json());

  // API Proxy Route for Apex AI Advisor
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { messages, transactions, savingsVaults, balance } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      // Handle unconfigured secret key gracefully with dynamic simulated calculation engine
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        const lastUserMessage = [...(messages || [])].reverse().find((m: any) => m.sender === 'user')?.content || '';
        let reply = '';
        
        const q = lastUserMessage.toLowerCase();
        
        // Define common calculation variables from live payload
        const expensesOnly = (transactions || []).filter((t: any) => t.type === 'expense');
        const incomeOnly = (transactions || []).filter((t: any) => t.type === 'income');
        const totalExpense = expensesOnly.reduce((sum: number, t: any) => sum + t.amount, 0);
        const totalIncome = incomeOnly.reduce((sum: number, t: any) => sum + t.amount, 0);
        const count = transactions?.length || 0;
        
        const totalSaved = savingsVaults?.reduce((sum: number, v: any) => sum + (v.currentAmount || 0), 0) || 0;
        const netWorth = (balance || 0) + totalSaved;

        if (q.includes('spend') || q.includes('expense') || q.includes('ledger') || q.includes('transaction') || q.includes('cost') || q.includes('buy') || q.includes('pay') || q.includes('outflow')) {
          // Find the top 3 expenditures in the actual active ledger
          const sortedExpenses = [...expensesOnly].sort((a: any, b: any) => b.amount - a.amount);
          const topOutliers = sortedExpenses.slice(0, 3).map((t: any) => `**${t.merchant}** (₹${t.amount.toLocaleString()})`).join(', ') || 'None registered';

          // Group expenses by class category dynamically
          const categories: Record<string, number> = {};
          expensesOnly.forEach((t: any) => {
            categories[t.category] = (categories[t.category] || 0) + t.amount;
          });
          const serializedCategories = Object.entries(categories)
            .map(([cat, amt]) => `- **${cat}**: ₹${amt.toLocaleString()}`)
            .join('\n') || '*No class categories recorded yet*';

          reply = `🌸 **Apex AI Advisor Ledger Analysis**

I have carefully audited your active transaction journal to calculate exact analytics:
- **Ledger Records**: Counted **${count} active entries** inside your journal.
- **Combined Outflows**: Spent a total of **₹${totalExpense.toLocaleString()}** across all segments.
- **Top Outlet Outliers**: ${topOutliers}.
- **Categorized Spending Breakdowns**:
${serializedCategories}

I recommend scheduling regular audits and keeping non-discretionary shopping outflows within margins to optimize vault targets!`;
        } else if (q.includes('vault') || q.includes('saving') || q.includes('goal')) {
          const vaultsList = savingsVaults?.map((v: any) => {
            const pct = v.targetAmount > 0 ? Math.min(100, Math.round((v.currentAmount / v.targetAmount) * 100)) : 0;
            return `- **${v.name}**: ₹${v.currentAmount.toLocaleString()} / ₹${v.targetAmount.toLocaleString()} saved (**${pct}%** completed)`;
          }).join('\n') || '*No active saving goal vaults configured*';

          reply = `🌸 **Apex Savings Milestone & Goal Report**

I have analyzed your **Apex Savings Vaults** and active goal allocations:
- **Consolidated Vault Assets**: **₹${totalSaved.toLocaleString()}** in target accounts.
- **Goal Allocations Portfolio**:
${vaultsList}

Your savings rate shows an exceptionally disciplined path. Consider allocating 10% of unassigned credits to help reach goals like **Paris Holiday** or **Electric SUV** even faster!`;
        } else if (q.includes('balance') || q.includes('wealth') || q.includes('much money') || q.includes('liquidity') || q.includes('rich') || q.includes('portfolio') || q.includes('net worth')) {
          reply = `🌸 **Apex Real-Time Wealth & Portfolios Index**

Here is your combined wealth liquidity index:
- **Main Ledger Cash (Wallet)**: **₹${(balance || 0).toLocaleString()}** (Liquid)
- **Consolidated Vault Savings**: **₹${totalSaved.toLocaleString()}** (Target allocations)
- **Aggregated Net Worth Index**: **₹${netWorth.toLocaleString()}** (Primary reserves)

Your financial asset liquidity quotient is evaluated at **9.4 Excellence**, representing peak tier status!`;
        } else {
          // Fallback with detailed help and actual summarized figures
          reply = `🌸 **Apex AI Wealth Advisor Assistant**

Greetings! I am **Apex AI**, your dedicated private finance terminal. I am currently monitoring your balances and transaction sheets in real time.

Here are your live portfolio figures as of today:
- **Available Liquidity**: **₹${(balance || 0).toLocaleString()}**
- **Double-Entry Ledger Logs**: **${count} active records**
- **Savings Vault Reserve**: **₹${totalSaved.toLocaleString()}** (across ${savingsVaults?.length || 0} vaults)

*Ask me questions like:*
- "How much did I spend altogether?"
- "What is my absolute net worth?"
- "Give me a look at my savings goals."
- "What are my top expenses?"`;
        }
        return res.json({ content: reply });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Construct a highly descriptive, professional financial instruction payload
      const systemInstruction = `You are "Apex AI", the elite personal wealth manager at Apex Bank, styled with a baby-pink & off-white sleek, minimalist luxury aesthetic.
Your tone is professional, warm, highly polished, sophisticated, encouraging, and intellectually sharp.
You have secure real-time access to the customer's session state:
- Current Wealth Balance: ₹${balance?.toLocaleString('en-IN') || '1,42,450.75'} INR (represented in Indian Rupees, denoted by ₹)
- Savings Vaults: ${JSON.stringify(savingsVaults || [])}
- Active Transaction History:
${JSON.stringify(transactions || [])}

Ensure all financial transactions, metrics, expenditures, and goals are calculated and presented strictly in Indian Rupees (INR, formatted with the ₹ symbol, e.g. ₹5,000 or ₹1,42,450.75).
Provide mathematically accurate calculations on the transactional records provided when answering user questions.
Keep statements highly scannable and beautiful using simple bullet points (- text) and bold words (**text**).
CRITICAL REQUIREMENT ON FORMATTING: Do NOT use markdown code blocks (such as \`\`\` or \`\`\`json), raw HTML tags, backticks, monospace boxes, programming codes, or technical jargon. Explain everything clearly in simple, clean normal human conversational text format.
CRITICAL REQUIREMENT ON SPEED: Always be extremely precise, concise, and direct with your answers. Avoid long, slow preambles so that the response is generated and delivered instantly to the client.
Never inventory absolute file paths or engineering system configs. Refer to actual merchants such as Blossom Boutiques, Rosewood Fine Dining, Estétique Skincare Lab, etc.
End your advice with a sophisticated, reassuring pastel-themed sign-off if style fits, but maintain top-tier corporate finance rigor.`;

      const contents = messages.map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.65,
        }
      });

      return res.json({ content: response.text });
    } catch (err: any) {
      console.error('Gemini SDK error:', err);
      return res.status(500).json({ error: 'Failed to synchronize with Apex AI: ' + (err.message || err) });
    }
  });

  // Serve static assets in production vs mounting Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Apex Express] Server listening aggressively on http://localhost:${PORT}`);
  });
}

startServer();
