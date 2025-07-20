import { Hono } from 'hono';
import { BIndings } from './types';

const app = new Hono<{ Bindings: BIndings }>().basePath('/api');

app.get('/', (c) => c.json({ message: 'Hello CloudFlare!' }));

// 全権取得
app.get('/todos', async (c) => {
	try {
		const { results } = await c.env.DB.prepare('SELECT * FROM todos').all();

		return c.json(results);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

// 特定のIDを取得
app.get('/todos/:id', async (c) => {
	const id = c.req.param('id');

	try {
		const { results } = await c.env.DB.prepare('SELECT * FROM todos WHERE id =?').bind(id).all();

		return c.json(results);
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

// データ作成
app.post('/todos', async (c) => {
	const { title, content } = await c.req.json();

	try {
		await c.env.DB.prepare('INSERT INTO todos (title, content) VALUES (?, ?)').bind(title, content).run();

		return c.json({ message: 'Success', status: 201 });
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

// 特定のIDを更新
app.put('/todos/:id', async (c) => {
	const id = c.req.param('id');
	const { title, content } = await c.req.json();

	try {
		await c.env.DB.prepare('UPDATE todos SET title=?, content=? where id=? ').bind(title, content, id).run();

		return c.json({ message: 'Success', status: 201 });
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

// 特定のIDを削除
app.delete('/todos/:id', async (c) => {
	const id = c.req.param('id');

	try {
		await c.env.DB.prepare('DELETE FROM todos where id=?').bind(id).all();

		return c.json({message: 'DELETE Success', status: 201});
	} catch (e) {
		return c.json({ err: e }, 500);
	}
});

export default app;
