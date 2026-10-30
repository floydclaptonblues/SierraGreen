import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('Sierra admin configured for correct repository',()=>{
 const config=read('admin/config.js'),html=read('admin/index.html'),js=read('admin/admin.js');
 assert.match(config,/repository:\s*'SierraGreen'/);
 assert.match(config,/mode:\s*'sierra'/);
 assert.match(html,/script-src 'self'/);
 assert.match(html,/connect-src https:\/\/api\.github\.com/);
 assert.match(js,/AES-GCM/);
 assert.match(js,/PBKDF2/);
 assert.match(js,/sha:state\.sha/);
});
test('source shows retained and valid',()=>{
 const rows=JSON.parse(read('shows.json')).shows;
 assert.ok(Array.isArray(rows) && rows.length>=3);
 for(const row of rows){
   assert.match(row.date,/^\d{4}-\d{2}-\d{2}$/);
   assert.ok(row.project && row.venue && row.time);
 }
 const home=read('home.js');
 assert.match(home,/fetch\('\.\/shows\.json/);
 assert.match(home,/window\.SIERRA_SHOWS/);
});
