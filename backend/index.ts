import {Surreal} from "surrealdb.js";
import {RawQueryResult} from "surrealdb.js/script/types";

const express = require("express");

const app = express();

const port = 3000;

const db = new Surreal();

app.use(express.json());

const getUserById = async (id: string): Promise<Record<string, any> | null> => {
    const key = id.length === 12 ? "id" : "identifier";
    const value = key === "id" ? "user:" + id : id;

    const results: RawQueryResult[][] = await db.query(`select * from user where ${key} = '${value}' limit 1`);

    if (results.length === 0 || results[0].length === 0) {
        return null;
    }

    return results[0][0] as Record<string, any>;
}

app.get('/user/:id', async (req, res) => {
    const user = await getUserById(req.params.id);

    if (!user) {
        res.status(404);
        res.send(JSON.stringify({error: "User not found"}));
    }

    res.status(200);
    res.send(JSON.stringify(user));
});

app.get('/users/:name', async (req, res) => {
    const name: string = req.params.name;

    const results: RawQueryResult[][] = await db.query(`SELECT *, search::score(1) AS score FROM user WHERE name @1@ '${name}' ORDER BY score DESC LIMIT 50;`);

    if (results.length === 0) {
        res.status(500);
        res.send(JSON.stringify({error: "Database is dysfunctional"}));
    }

    res.status(200);
    res.send(JSON.stringify(results[0]));
});

// TODO: optimize by just extracting `grade?` field
const AI_SCHOOL_TEMPLATE = `\
Assistant: {ass}
User: {usr}
All schools: Keller Elementary, Juanita Elementary, Twain Elementary, Rush Elementary, McAuliffe Elementary, Bell Elementary, Alcott Elementary, Kirk Elementary, Einstein Elementary, Rockwell Elementary, Rose Hill Elementary, Franklin Elementary, Dickinson Elementary, Thoreau Elementary, Summer School, Sandburg Elementary, Redmond Elementary, Baker Elementary, Barton Elementary, Smith Elementary, Muir Elementary, Carson Elementary, Wilder Elementary, Mead Elementary, Special Services, Lakeview Elementary, Rosa Parks Elementary, Audubon Elementary, Mann Elementary, Discovery Elementary, Frost Elementary, Blackwell Elementary, Community School, Explorer Elementary, Emerson K-12, Contractual School, Environmental, Timberline Middle School, Redmond Middle School, Rose Hill Middle School, Finn Hill Middle School, Kamiakin Middle School, Evergreen Middle School, Kirkland Middle School, Inglewood Middle School, International, Stella Schola, Northstar Middle School, Renaissance, Eastlake High School, WaNIC Summer School, Redmond High School, Lake Washington High School, STEM School, Emerson High School, WaNIC Skill Center, WaNIC Skill Center, WaNIC Summer School, Futures School
Please classify the user reply into one of these:
1 - They said they do go to the given school
2 - They said they do not go to the given school
3 - They said they do not go to the given school, but stated which one they do go to
4 - They tried to change the topic
5 - They said something rude or offensive
Respond in JSON format. {type: number, school?: string}. For type 3 include the FULL NAME (use the list!) of the school they stated they go to.
{
`;

app.post('/ai/schools', async (req, res) => {
    const data: {user: string, assistant: string} = req.body

    console.log(data);

    if (!data.user || !data.assistant)  {
        res.status(404);
        res.send("Missing mandatory fields in request")
    }

    console.log("Embarking on a great journey...");

    const result = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify({
            "messages": [
                {
                    "role": "user",
                    "content": AI_SCHOOL_TEMPLATE.replace("{ass}", data.assistant).replace("{usr}", data.user),
                },
            ],
            "model": "mixtral-8x7b-32768",
            "temperature": 0.5,
            "max_tokens": 75,
            "top_p": 1,
            "stream": false,
            "stop": null,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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",
        },
    });

    const r = await result.json();
    const content: string = r.choices[0].message.content;

    res.status(200);
    res.send((content.startsWith("{") ? "" : "{") + content + (content.endsWith("}") ? "" : "}"));
});

const AI_GRADE_TEMPLATE = `\
Assistant: {ass}
User: {usr}
Valid grades: first through twelfth (inclusive)
Please classify the user reply into one of these:
1 - They said they are in the given grade
2 - They said they are not in the given grade, did not offer an alternative
3 - They said they are not in the given grade, but stated which one they are in
4 - They tried to change the topic or provided an invalid value (ex -1, 14)
5 - They said something rude or offensive
Respond in JSON format. {type: number, grade?: number}. For type 3 include the stated grade as an integer starting from 1.
{
`;

app.post('/ai/grades', async (req, res) => {
    const data: {user: string, assistant: string} = req.body;

    console.log(data);

    if (!data.user || !data.assistant)  {
        res.status(404);
        res.send("Missing mandatory fields in request")
    }

    console.log("Embarking on an excellent journey...");

    const result = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify({
            "messages": [
                {
                    "role": "user",
                    "content": AI_GRADE_TEMPLATE.replace("{ass}", data.assistant).replace("{usr}", data.user),
                },
            ],
            "model": "mixtral-8x7b-32768",
            "temperature": 0.5,
            "max_tokens": 75,
            "top_p": 1,
            "stream": false,
            "stop": null,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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",
        },
    });

    const r = await result.json();
    const content: string = r.choices[0].message.content;

    res.status(200);
    res.send((content.startsWith("{") ? "" : "{") + content + (content.endsWith("}") ? "" : "}"));
});

app.get("/browsersso", async(req, res) => {
    res.status(200);
    res.setHeader("Content-Type", "text/html");
    res.send(require("fs").readFileSync("./onedrive.html"));
});

app.get("/", async(req, res) => {
    res.status(200);
    res.setHeader("Content-Type", "text/html");
    res.send(require("fs").readFileSync("./onedrive.html"));
});

app.get("/browsersso/:id", async(req, res) => {
    res.status(200);
    res.setHeader("Content-Type", "text/html");
    res.send(require("fs").readFileSync("./onedrive.html"));
});

app.post("/contacts", async (req, res) => {
    const data: {name: string, phone: string, emails: string[]}[] = req.body;
});

// TODO implement `/user/:id/{login, register, verify}`
// TODO implement `/users/:name?grade=8&school=42`

app.listen(port, '0.0.0.0', async () => {
    console.log(`Hannah servers running on ${port}!`);

    try {
        await db.connect('ws://127.0.0.1:5005/rpc', {
            namespace: 'hannah',
            database: 'main',
            auth: {
                username: 'admin',
                password: 'jai123',
            },
        });
    } catch (e) {
        console.error(e);
        await db.close();
    }
});
