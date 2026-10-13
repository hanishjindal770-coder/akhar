/* ---------- Gurmukhi INSCRIPT layout (Windows "Punjabi" keyboard, used with Raavi in Punjab exams) ---------- */
// [code, english label, normal, shift]
const ROWS = [
  [['Backquote','`','`','੍ਹ'],['Digit1','1','੧','੍ਵ'],['Digit2','2','੨','੍ਯ'],['Digit3','3','੩','੍ਰ'],['Digit4','4','੪','ੱ'],['Digit5','5','੫',''],['Digit6','6','੬',''],['Digit7','7','੭',''],['Digit8','8','੮',''],['Digit9','9','੯','('],['Digit0','0','੦',')'],['Minus','-','-','ਃ'],['Equal','=','=','+']],
  [['KeyQ','Q','ੌ','ਔ'],['KeyW','W','ੈ','ਐ'],['KeyE','E','ਾ','ਆ'],['KeyR','R','ੀ','ਈ'],['KeyT','T','ੂ','ਊ'],['KeyY','Y','ਬ','ਭ'],['KeyU','U','ਹ','ਙ'],['KeyI','I','ਗ','ਘ'],['KeyO','O','ਦ','ਧ'],['KeyP','P','ਜ','ਝ'],['BracketLeft','[','ਡ','ਢ'],['BracketRight',']','਼','ਞ'],['Backslash','\\','\\','|']],
  [['KeyA','A','ੋ','ਓ'],['KeyS','S','ੇ','ਏ'],['KeyD','D','੍','ਅ'],['KeyF','F','ਿ','ਇ'],['KeyG','G','ੁ','ਉ'],['KeyH','H','ਪ','ਫ'],['KeyJ','J','ਰ','ੜ'],['KeyK','K','ਕ','ਖ'],['KeyL','L','ਤ','ਥ'],['Semicolon',';','ਚ','ਛ'],['Quote',"'",'ਟ','ਠ']],
  [['KeyZ','Z','',''],['KeyX','X','ੰ','ਂ'],['KeyC','C','ਮ','ਣ'],['KeyV','V','ਨ',''],['KeyB','B','ਵ','ੲ'],['KeyN','N','ਲ','ਲ਼'],['KeyM','M','ਸ','ਸ਼'],['Comma',',',',','<'],['Period','.','.','।'],['Slash','/','ਯ','?']]
];

// finger index: 0 L-little 1 L-ring 2 L-middle 3 L-index 4 R-index 5 R-middle 6 R-ring 7 R-little 8 thumb
const FINGER = {Backquote:0,Digit1:0,KeyQ:0,KeyA:0,KeyZ:0,ShiftLeft:0,Tab:0,CapsLock:0,
  Digit2:1,KeyW:1,KeyS:1,KeyX:1, Digit3:2,KeyE:2,KeyD:2,KeyC:2,
  Digit4:3,Digit5:3,KeyR:3,KeyT:3,KeyF:3,KeyG:3,KeyV:3,KeyB:3,
  Digit6:4,Digit7:4,KeyY:4,KeyU:4,KeyH:4,KeyJ:4,KeyN:4,KeyM:4,
  Digit8:5,KeyI:5,KeyK:5,Comma:5, Digit9:6,KeyO:6,KeyL:6,Period:6,
  Digit0:7,Minus:7,Equal:7,KeyP:7,BracketLeft:7,BracketRight:7,Backslash:7,Semicolon:7,Quote:7,Slash:7,ShiftRight:7,Enter:7,Backspace:7,
  Space:8};
const FINGER_NAME = ['Left little · ਖੱਬੀ ਚੀਚੀ','Left ring · ਖੱਬੀ ਅਨਾਮਿਕਾ','Left middle · ਖੱਬੀ ਵਿਚਕਾਰਲੀ','Left index · ਖੱਬੀ ਪਹਿਲੀ ਉਂਗਲ','Right index · ਸੱਜੀ ਪਹਿਲੀ ਉਂਗਲ','Right middle · ਸੱਜੀ ਵਿਚਕਾਰਲੀ','Right ring · ਸੱਜੀ ਅਨਾਮਿਕਾ','Right little · ਸੱਜੀ ਚੀਚੀ','Thumb · ਅੰਗੂਠਾ'];

/* ---------- Lessons ---------- */
// kind: keys (teaches new keys) · review (drills a group) · words · sentences · para (passage) · digits
const STAGES = [
  {id:'home', t:'Home row', pa:'ਘਰ ਵਾਲੀ ਕਤਾਰ'},
  {id:'top', t:'Top row', pa:'ਉੱਪਰਲੀ ਕਤਾਰ'},
  {id:'bottom', t:'Bottom row, tippi, bindi and danda', pa:'ਹੇਠਲੀ ਕਤਾਰ, ਟਿੱਪੀ, ਬਿੰਦੀ, ਡੰਡੀ'},
  {id:'shift', t:'Shift vowels and letters', pa:'ਸ਼ਿਫ਼ਟ ਵਾਲੇ ਸਵਰ ਅਤੇ ਅੱਖਰ'},
  {id:'special', t:'Addak, pair bindi, half letters, numerals', pa:'ਅੱਧਕ, ਪੈਰ ਬਿੰਦੀ, ਪੈਰੀਂ ਅੱਖਰ, ਅੰਕ'},
  {id:'words', t:'Word practice', pa:'ਸ਼ਬਦ ਅਭਿਆਸ'},
  {id:'sent', t:'Sentences and paragraphs', pa:'ਵਾਕ ਅਤੇ ਪੈਰੇ'}
];
const LESSONS = [
  {stage:'home', kind:'keys', t:'ਕ and ਤ', pa:'ਕ ਅਤੇ ਤ', keys:['ਕ','ਤ'], tip:'Rest your right hand on J K L ; with the index finger on the bump of J. K gives ਕ (middle finger) and L gives ਤ (ring finger).'},
  {stage:'home', kind:'keys', t:'ਰ and ਚ', pa:'ਰ ਅਤੇ ਚ', keys:['ਰ','ਚ'], tip:'J gives ਰ with the right index finger. ; gives ਚ with the right little finger.'},
  {stage:'home', kind:'review', t:'Right hand home row review', pa:'ਸੱਜੇ ਹੱਥ ਦੀ ਦੁਹਰਾਈ', keys:['ਕ','ਤ','ਰ','ਚ'], tip:'Keep all four fingers resting on J K L ; and look at the screen, not the keys.'},
  {stage:'home', kind:'keys', t:'Sihari and aunkar', pa:'ਸਿਹਾਰੀ ਅਤੇ ਔਂਕੜ', keys:['ਿ','ੁ'], tip:'F gives ਿ and G gives ੁ with the left index finger. A matra is typed after its letter, even sihari: ਕਿ is K then F.'},
  {stage:'home', kind:'keys', t:'Lavan and hora', pa:'ਲਾਵਾਂ ਅਤੇ ਹੋੜਾ', keys:['ੇ','ੋ'], tip:'S gives ੇ (left ring finger) and A gives ੋ (left little finger).'},
  {stage:'home', kind:'keys', t:'ਪ and ਟ', pa:'ਪ ਅਤੇ ਟ', keys:['ਪ','ਟ'], tip:'Right index reaches left to H for ਪ. Right little finger reaches the quote key for ਟ.'},
  {stage:'home', kind:'review', t:'Home row review', pa:'ਘਰ ਵਾਲੀ ਕਤਾਰ ਦੀ ਦੁਹਰਾਈ', keys:['ਕ','ਤ','ਰ','ਚ','ਪ','ਟ','ਿ','ੁ','ੇ','ੋ'], tip:'Every key of the home row together. Aim for steady rhythm rather than bursts.'},

  {stage:'top', kind:'keys', t:'Kanna', pa:'ਕੰਨਾ', keys:['ਾ'], tip:'E gives kanna ਾ with the left middle finger. It is the most used matra in Punjabi.'},
  {stage:'top', kind:'keys', t:'Bihari and dulainkar', pa:'ਬਿਹਾਰੀ ਅਤੇ ਦੁਲੈਂਕੜ', keys:['ੀ','ੂ'], tip:'R gives ੀ and T gives ੂ, both with the left index finger reaching up.'},
  {stage:'top', kind:'keys', t:'Dulavan and kanaura', pa:'ਦੁਲਾਵਾਂ ਅਤੇ ਕਨੌੜਾ', keys:['ੈ','ੌ'], tip:'W gives ੈ (left ring finger) and Q gives ੌ (left little finger).'},
  {stage:'top', kind:'review', t:'All matras review', pa:'ਸਾਰੀਆਂ ਲਗਾਂ ਮਾਤਰਾਂ', keys:['ਾ','ਿ','ੀ','ੁ','ੂ','ੇ','ੈ','ੋ','ੌ'], tip:'The nine matras sit under the left hand: Q W E R T on top, A S F G on the home row.'},
  {stage:'top', kind:'keys', t:'ਬ and ਹ', pa:'ਬ ਅਤੇ ਹ', keys:['ਬ','ਹ'], tip:'Y gives ਬ and U gives ਹ, both with the right index finger.'},
  {stage:'top', kind:'keys', t:'ਗ and ਦ', pa:'ਗ ਅਤੇ ਦ', keys:['ਗ','ਦ'], tip:'I gives ਗ (right middle finger) and O gives ਦ (right ring finger).'},
  {stage:'top', kind:'keys', t:'ਜ and ਡ', pa:'ਜ ਅਤੇ ਡ', keys:['ਜ','ਡ'], tip:'P gives ਜ and [ gives ਡ, both with the right little finger.'},
  {stage:'top', kind:'review', t:'Top row review', pa:'ਉੱਪਰਲੀ ਕਤਾਰ ਦੀ ਦੁਹਰਾਈ', keys:['ਬ','ਹ','ਗ','ਦ','ਜ','ਡ','ਾ','ੀ','ੂ','ੈ','ੌ'], tip:'Return each finger to the home row after every reach.'},

  {stage:'bottom', kind:'keys', t:'ਮ and ਨ', pa:'ਮ ਅਤੇ ਨ', keys:['ਮ','ਨ'], tip:'C gives ਮ (left middle finger) and V gives ਨ (left index finger).'},
  {stage:'bottom', kind:'keys', t:'ਵ and ਲ', pa:'ਵ ਅਤੇ ਲ', keys:['ਵ','ਲ'], tip:'B gives ਵ (left index) and N gives ਲ (right index).'},
  {stage:'bottom', kind:'keys', t:'ਸ and ਯ', pa:'ਸ ਅਤੇ ਯ', keys:['ਸ','ਯ'], tip:'M gives ਸ (right index) and / gives ਯ (right little finger).'},
  {stage:'bottom', kind:'review', t:'Bottom row review', pa:'ਹੇਠਲੀ ਕਤਾਰ ਦੀ ਦੁਹਰਾਈ', keys:['ਮ','ਨ','ਵ','ਲ','ਸ','ਯ'], tip:'Curl the fingers down without moving the wrists.'},
  {stage:'bottom', kind:'keys', t:'Tippi', pa:'ਟਿੱਪੀ', keys:['ੰ'], tip:'X gives tippi ੰ. Use it with mukta, sihari, aunkar and dulainkar: ਪੰਜ, ਹਿੰਦੀ, ਮੁੰਡਾ, ਨੂੰ.'},
  {stage:'bottom', kind:'keys', t:'Bindi', pa:'ਬਿੰਦੀ', keys:['ਂ'], tip:'Shift+X gives bindi ਂ. Use it with the other matras: ਮਾਂ, ਨਹੀਂ, ਮੈਂ, ਸਮੇਂ, ਕਿਉਂ.'},
  {stage:'bottom', kind:'keys', t:'Danda and comma', pa:'ਡੰਡੀ ਅਤੇ ਕਾਮਾ', keys:['।',','], tip:'Shift + full stop gives the danda । that ends every sentence. No space before it, one space after.'},
  {stage:'bottom', kind:'review', t:'All unshifted keys', pa:'ਬਿਨਾਂ ਸ਼ਿਫ਼ਟ ਸਾਰੇ ਬਟਨ', keys:['ਮ','ਨ','ਵ','ਲ','ਸ','ਯ','ੰ','ਂ','ਬ','ਹ','ਗ','ਦ','ਜ','ਡ'], tip:'You now know every key you can type without Shift. This lesson mixes all of them.'},

  {stage:'shift', kind:'keys', t:'ਅ ਇ ਉ', pa:'ਅ ਇ ਉ', keys:['ਅ','ਇ','ਉ'], tip:'Hold Shift with the right hand. Shift+D ਅ, Shift+F ਇ, Shift+G ਉ. Exam rule: ਉ is one key, never ੳ + ੁ.'},
  {stage:'shift', kind:'keys', t:'ਏ and ਓ', pa:'ਏ ਅਤੇ ਓ', keys:['ਏ','ਓ'], tip:'Shift+S ਏ and Shift+A ਓ.'},
  {stage:'shift', kind:'keys', t:'ਆ ਈ ਊ', pa:'ਆ ਈ ਊ', keys:['ਆ','ਈ','ਊ'], tip:'Shift+E ਆ, Shift+R ਈ, Shift+T ਊ. Each full vowel is a single keystroke.'},
  {stage:'shift', kind:'keys', t:'ਐ and ਔ', pa:'ਐ ਅਤੇ ਔ', keys:['ਐ','ਔ'], tip:'Shift+W ਐ and Shift+Q ਔ.'},
  {stage:'shift', kind:'review', t:'Vowels review', pa:'ਸਵਰਾਂ ਦੀ ਦੁਹਰਾਈ', keys:['ਅ','ਆ','ਇ','ਈ','ਉ','ਊ','ਏ','ਐ','ਓ','ਔ'], tip:'All ten vowel letters. Press Shift with the hand that is not typing the letter.'},
  {stage:'shift', kind:'keys', t:'ਖ and ਥ', pa:'ਖ ਅਤੇ ਥ', keys:['ਖ','ਥ'], tip:'Shift+K ਖ and Shift+L ਥ. The aspirated letter sits on the same key as its partner: ਕ/ਖ, ਤ/ਥ. Hold Shift with the left hand.'},
  {stage:'shift', kind:'keys', t:'ਛ and ਠ', pa:'ਛ ਅਤੇ ਠ', keys:['ਛ','ਠ'], tip:"Shift+; ਛ and Shift+' ਠ. Same pairs again: ਚ/ਛ, ਟ/ਠ."},
  {stage:'shift', kind:'keys', t:'ਫ and ੜ', pa:'ਫ ਅਤੇ ੜ', keys:['ਫ','ੜ'], tip:'Shift+H ਫ and Shift+J ੜ.'},
  {stage:'shift', kind:'keys', t:'ਭ and ਘ', pa:'ਭ ਅਤੇ ਘ', keys:['ਭ','ਘ'], tip:'Shift+Y ਭ and Shift+I ਘ: ਬ/ਭ and ਗ/ਘ.'},
  {stage:'shift', kind:'keys', t:'ਧ and ਝ', pa:'ਧ ਅਤੇ ਝ', keys:['ਧ','ਝ'], tip:'Shift+O ਧ and Shift+P ਝ: ਦ/ਧ and ਜ/ਝ.'},
  {stage:'shift', kind:'keys', t:'ਢ ਣ ਙ ਞ', pa:'ਢ ਣ ਙ ਞ', keys:['ਢ','ਣ','ਙ','ਞ'], tip:'Shift+[ ਢ and Shift+C ਣ are common. Shift+U ਙ and Shift+] ਞ are rare but appear in exams.'},
  {stage:'shift', kind:'keys', t:'ਸ਼ and ਲ਼', pa:'ਸ਼ ਅਤੇ ਲ਼', keys:['ਸ਼','ਲ਼'], tip:'Shift+M ਸ਼ and Shift+N ਲ਼. ਸ਼ has its own key, so you never add a pair bindi to ਸ.'},
  {stage:'shift', kind:'review', t:'Shift letters review', pa:'ਸ਼ਿਫ਼ਟ ਅੱਖਰਾਂ ਦੀ ਦੁਹਰਾਈ', keys:['ਖ','ਥ','ਛ','ਠ','ਫ','ੜ','ਭ','ਘ','ਧ','ਝ','ਢ','ਣ','ਸ਼','ਲ਼'], tip:'All the Shift letters mixed with everything learned so far.'},

  {stage:'special', kind:'keys', t:'Addak', pa:'ਅੱਧਕ', keys:['ੱ'], tip:'Shift+4 gives addak ੱ. Type it before the letter it doubles: ਪੱਕਾ is ਪ ੱ ਕ ਾ.'},
  {stage:'special', kind:'keys', t:'Pair bindi', pa:'ਪੈਰ ਬਿੰਦੀ', keys:['਼'], tip:'The ] key adds pair bindi ਼ to the letter before it: ਖ਼ ਗ਼ ਜ਼ ਫ਼. Type the letter first, then ].'},
  {stage:'special', kind:'keys', t:'Pairi rara', pa:'ਪੈਰੀਂ ਰਾਰਾ', keys:['੍'], focus:'੍ਰ', tip:'Letter, then D (halant ੍), then J (ਰ) makes pairi rara: ਪ੍ਰ = H D J. Shift+3 types ੍ਰ in one go.'},
  {stage:'special', kind:'keys', t:'Pairi haha and vava', pa:'ਪੈਰੀਂ ਹਾਹਾ ਅਤੇ ਵਾਵਾ', keys:['੍'], focus:'੍ਹ', tip:'Letter, D, U makes pairi haha: ਪੜ੍ਹ, ਕੱਲ੍ਹ, ਉਨ੍ਹਾਂ. Shift+` types ੍ਹ in one go. Letter, D, B makes pairi vava (ਸ੍ਵ).'},
  {stage:'special', kind:'digits', t:'Gurmukhi numerals', pa:'ਗੁਰਮੁਖੀ ਅੰਕ', keys:['੧','੨','੩','੪','੫','੬','੭','੮','੯','੦'], tip:'The number row types ੧ ੨ ੩. Reach up with the nearest finger and come straight back.'},
  {stage:'special', kind:'review', t:'Special marks review', pa:'ਖ਼ਾਸ ਚਿੰਨ੍ਹਾਂ ਦੀ ਦੁਹਰਾਈ', keys:['ੱ','਼','੍'], tip:'Addak, pair bindi and half letters in real words. These are where most exam mistakes happen, because one wrong mark makes the whole word wrong.'},

  {stage:'words', kind:'words', list:'COMMON', t:'Most common words', pa:'ਸਭ ਤੋਂ ਆਮ ਸ਼ਬਦ', tip:'These small words make up a third of any passage. Typing them without thinking saves a lot of time.'},
  {stage:'words', kind:'words', list:'HOME', t:'Home and family', pa:'ਘਰ ਅਤੇ ਪਰਿਵਾਰ', tip:'Everyday words about family, food and the house.'},
  {stage:'words', kind:'words', list:'NATURE', t:'Farming and nature', pa:'ਖੇਤੀ ਅਤੇ ਕੁਦਰਤ', tip:'Words that come up in passages about Punjab, farming and the environment.'},
  {stage:'words', kind:'words', list:'EDU', t:'Education, time and numbers', pa:'ਸਿੱਖਿਆ, ਸਮਾਂ ਅਤੇ ਗਿਣਤੀ', tip:'Days, months, numbers in words, and school vocabulary.'},
  {stage:'words', kind:'words', list:'VERBS', t:'Verbs', pa:'ਕਿਰਿਆਵਾਂ', tip:'Verb forms with ਦਾ, ਦੀ, ਦੇ and ਣਾ endings. Watch bindi versus tippi.'},
  {stage:'words', kind:'words', list:'OFFICE', t:'Office and government', pa:'ਦਫ਼ਤਰ ਅਤੇ ਸਰਕਾਰ', tip:'Official vocabulary used in clerk exam passages and letters.'},
  {stage:'words', kind:'words', list:'ALL', t:'Mixed words test', pa:'ਮਿਲੇ ਜੁਲੇ ਸ਼ਬਦ', tip:'Words from every list, in random order.'},

  {stage:'sent', kind:'sentences', list:'SENTENCES', t:'Everyday sentences 1', pa:'ਆਮ ਵਾਕ ੧', tip:'One space between words, no space before the danda.'},
  {stage:'sent', kind:'sentences', list:'SENTENCES', t:'Everyday sentences 2', pa:'ਆਮ ਵਾਕ ੨', tip:'Read a few words ahead while you type.'},
  {stage:'sent', kind:'sentences', list:'OFFICE_SENTENCES', t:'Office sentences', pa:'ਦਫ਼ਤਰੀ ਵਾਕ', tip:'Sentences in the style of official letters and orders.'},
  {stage:'sent', kind:'para', passage:'punjab', t:'Paragraph: The land of Punjab', pa:'ਪੈਰਾ: ਪੰਜਾਬ ਦੀ ਧਰਤੀ', tip:'A full exam passage, a few sentences at a time.'},
  {stage:'sent', kind:'para', passage:'computer', t:'Paragraph: Computers and typing', pa:'ਪੈਰਾ: ਕੰਪਿਊਟਰ ਅਤੇ ਟਾਈਪਿੰਗ', tip:'A full exam passage, a few sentences at a time.'},
  {stage:'sent', kind:'para', passage:'office', t:'Paragraph: Office order', pa:'ਪੈਰਾ: ਦਫ਼ਤਰੀ ਹੁਕਮ', tip:'Official language, as in clerk exam passages.'},
  {stage:'sent', kind:'para', passage:'education', t:'Paragraph: The value of education', pa:'ਪੈਰਾ: ਸਿੱਖਿਆ ਦਾ ਮਹੱਤਵ', tip:'A full exam passage, a few sentences at a time.'},
  {stage:'sent', kind:'para', passage:'bhagat', t:'Paragraph: Shaheed Bhagat Singh', pa:'ਪੈਰਾ: ਸ਼ਹੀਦ ਭਗਤ ਸਿੰਘ', tip:'Names and places with ਜ਼, ੍ਹ and ੱ. Take care with every mark.'}
].map((l, i) => Object.assign({id: i + 1}, l));

const WORD_LISTS = {
  COMMON: `ਅਤੇ ਜਾਂ ਪਰ ਕਿ ਜੋ ਜਦੋਂ ਤਾਂ ਵੀ ਹੀ ਨਹੀਂ ਹਾਂ ਨਾ ਇਹ ਉਹ ਇਸ ਉਸ ਇਨ੍ਹਾਂ ਉਨ੍ਹਾਂ ਮੈਂ ਅਸੀਂ ਤੁਸੀਂ ਆਪ ਮੇਰਾ ਸਾਡਾ ਤੁਹਾਡਾ ਆਪਣਾ ਆਪਣੀ ਆਪਣੇ ਕੌਣ ਕੀ ਕਿਉਂ ਕਿੱਥੇ ਕਦੋਂ ਕਿਵੇਂ ਕਿੰਨਾ ਵਿੱਚ ਉੱਤੇ ਹੇਠਾਂ ਅੰਦਰ ਬਾਹਰ ਨਾਲ ਲਈ ਤੋਂ ਨੂੰ ਦਾ ਦੀ ਦੇ ਨੇ ਵੱਲੋਂ ਬਾਰੇ ਬਹੁਤ ਥੋੜ੍ਹਾ ਸਭ ਹਰ ਕੋਈ ਕੁਝ ਹੋਰ ਬਿਲਕੁਲ ਜ਼ਰੂਰ ਹੁਣ ਫਿਰ ਪਹਿਲਾਂ ਬਾਅਦ ਹਮੇਸ਼ਾ ਕਦੇ ਇੱਥੇ ਉੱਥੇ ਚੰਗਾ ਮਾੜਾ ਵੱਡਾ ਛੋਟਾ ਨਵਾਂ ਪੁਰਾਣਾ ਸੋਹਣਾ ਜ਼ਰੂਰੀ ਸੌਖਾ ਔਖਾ ਸਾਫ਼ ਸਹੀ ਗ਼ਲਤ ਹੈ ਹਨ ਸੀ ਸਨ ਗਿਆ ਗਈ ਗਏ ਕਰਕੇ ਤਰ੍ਹਾਂ ਵਾਲਾ ਵਾਲੀ ਵਾਲੇ ਜਿਹੜਾ ਜਿਹੜੀ ਇੱਕ ਦੋ`,
  HOME: `ਘਰ ਮਾਤਾ ਪਿਤਾ ਮਾਂ ਬਾਪੂ ਭਰਾ ਭੈਣ ਦਾਦਾ ਦਾਦੀ ਨਾਨਾ ਨਾਨੀ ਚਾਚਾ ਚਾਚੀ ਤਾਇਆ ਤਾਈ ਮਾਮਾ ਮਾਮੀ ਮਾਸੀ ਭੂਆ ਪੁੱਤਰ ਧੀ ਬੱਚਾ ਬੱਚੇ ਪਰਿਵਾਰ ਰਸੋਈ ਕਮਰਾ ਵਿਹੜਾ ਛੱਤ ਦਰਵਾਜ਼ਾ ਖਿੜਕੀ ਮੰਜਾ ਕੁਰਸੀ ਮੇਜ਼ ਪੱਖਾ ਬਿਜਲੀ ਪਾਣੀ ਰੋਟੀ ਦਾਲ ਸਬਜ਼ੀ ਚੌਲ ਦੁੱਧ ਦਹੀਂ ਲੱਸੀ ਮੱਖਣ ਘਿਓ ਚਾਹ ਖੰਡ ਲੂਣ ਮਿਰਚ ਆਟਾ ਗੁੜ ਸਾਗ ਪਰੌਂਠਾ ਖੀਰ ਫਲ ਸੇਬ ਕੇਲਾ ਅੰਬ ਸੰਤਰਾ ਅੰਗੂਰ ਕੱਪੜੇ ਜੁੱਤੀ ਪੱਗ ਚੁੰਨੀ ਕਮੀਜ਼ ਸਲਵਾਰ ਮਹਿਮਾਨ ਗੁਆਂਢੀ ਦੋਸਤ ਪਿਆਰ ਸਤਿਕਾਰ ਖ਼ੁਸ਼ੀ ਤਿਉਹਾਰ ਵਿਆਹ ਮੇਲਾ ਗੀਤ ਬੋਲੀ ਭੰਗੜਾ ਗਿੱਧਾ`,
  NATURE: `ਖੇਤ ਖੇਤੀ ਕਿਸਾਨ ਫ਼ਸਲ ਕਣਕ ਝੋਨਾ ਮੱਕੀ ਕਪਾਹ ਗੰਨਾ ਸਰ੍ਹੋਂ ਛੋਲੇ ਬਾਜਰਾ ਬੀਜ ਖਾਦ ਨਹਿਰ ਖੂਹ ਟਿਊਬਵੈੱਲ ਟਰੈਕਟਰ ਹਲ ਬਲਦ ਗਾਂ ਮੱਝ ਬੱਕਰੀ ਘੋੜਾ ਕੁੱਤਾ ਬਿੱਲੀ ਚਿੜੀ ਮੋਰ ਕਾਂ ਤੋਤਾ ਰੁੱਖ ਬੂਟਾ ਪੱਤਾ ਫੁੱਲ ਟਾਹਣੀ ਜੜ੍ਹ ਮਿੱਟੀ ਧਰਤੀ ਅਸਮਾਨ ਸੂਰਜ ਚੰਨ ਤਾਰੇ ਬੱਦਲ ਮੀਂਹ ਹਵਾ ਧੁੱਪ ਛਾਂ ਗਰਮੀ ਸਰਦੀ ਬਸੰਤ ਪਤਝੜ ਦਰਿਆ ਪਹਾੜ ਜੰਗਲ ਮੈਦਾਨ ਬਾਗ਼ ਮੰਡੀ ਵਾਢੀ ਬਿਜਾਈ ਸਿੰਚਾਈ ਪਰਾਲੀ ਪ੍ਰਦੂਸ਼ਣ ਵਾਤਾਵਰਣ ਕੁਦਰਤ ਪਿੰਡ ਸ਼ਹਿਰ ਸੜਕ ਪੁਲ ਰਸਤਾ`,
  EDU: `ਸਕੂਲ ਕਾਲਜ ਯੂਨੀਵਰਸਿਟੀ ਜਮਾਤ ਅਧਿਆਪਕ ਵਿਦਿਆਰਥੀ ਕਿਤਾਬ ਕਾਪੀ ਕਲਮ ਪੈਨਸਿਲ ਬਸਤਾ ਸਬਕ ਪਾਠ ਸਵਾਲ ਜਵਾਬ ਗਿਆਨ ਸਿੱਖਿਆ ਪੜ੍ਹਾਈ ਲਿਖਾਈ ਇਮਤਿਹਾਨ ਨੰਬਰ ਅੰਕ ਗਣਿਤ ਵਿਗਿਆਨ ਇਤਿਹਾਸ ਭੂਗੋਲ ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਹਿੰਦੀ ਅੰਗਰੇਜ਼ੀ ਲਾਇਬ੍ਰੇਰੀ ਅੱਜ ਕੱਲ੍ਹ ਪਰਸੋਂ ਸਵੇਰ ਦੁਪਹਿਰ ਸ਼ਾਮ ਰਾਤ ਦਿਨ ਹਫ਼ਤਾ ਮਹੀਨਾ ਸਾਲ ਘੰਟਾ ਮਿੰਟ ਸਮਾਂ ਐਤਵਾਰ ਸੋਮਵਾਰ ਮੰਗਲਵਾਰ ਬੁੱਧਵਾਰ ਵੀਰਵਾਰ ਸ਼ੁੱਕਰਵਾਰ ਸ਼ਨਿੱਚਰਵਾਰ ਜਨਵਰੀ ਫ਼ਰਵਰੀ ਮਾਰਚ ਅਪ੍ਰੈਲ ਮਈ ਜੂਨ ਜੁਲਾਈ ਅਗਸਤ ਸਤੰਬਰ ਅਕਤੂਬਰ ਨਵੰਬਰ ਦਸੰਬਰ ਇੱਕ ਦੋ ਤਿੰਨ ਚਾਰ ਪੰਜ ਛੇ ਸੱਤ ਅੱਠ ਨੌਂ ਦਸ ਵੀਹ ਪੰਜਾਹ ਸੌ ਹਜ਼ਾਰ ਲੱਖ ਕਰੋੜ`,
  VERBS: `ਕਰਨਾ ਜਾਣਾ ਆਉਣਾ ਖਾਣਾ ਪੀਣਾ ਪੜ੍ਹਨਾ ਲਿਖਣਾ ਬੋਲਣਾ ਸੁਣਨਾ ਵੇਖਣਾ ਦੇਣਾ ਲੈਣਾ ਰਹਿਣਾ ਸੌਣਾ ਉੱਠਣਾ ਬੈਠਣਾ ਤੁਰਨਾ ਦੌੜਨਾ ਹੱਸਣਾ ਰੋਣਾ ਸਿੱਖਣਾ ਸਿਖਾਉਣਾ ਸਮਝਣਾ ਸੋਚਣਾ ਖੇਡਣਾ ਗਾਉਣਾ ਨੱਚਣਾ ਖੋਲ੍ਹਣਾ ਭੇਜਣਾ ਮਿਲਣਾ ਲੱਭਣਾ ਬਣਾਉਣਾ ਚਲਾਉਣਾ ਬਚਾਉਣਾ ਕਮਾਉਣਾ ਪਹੁੰਚਣਾ ਜਿੱਤਣਾ ਹਾਰਨਾ ਪੁੱਛਣਾ ਦੱਸਣਾ ਕਰਦਾ ਕਰਦੀ ਕਰਦੇ ਕੀਤਾ ਕੀਤੀ ਕੀਤੇ ਜਾਂਦਾ ਜਾਂਦੀ ਜਾਂਦੇ ਹੋਇਆ ਹੋਈ ਹੋਏ ਹੋਵੇਗਾ ਹੋਵੇਗੀ ਚਾਹੀਦਾ ਚਾਹੀਦੀ ਚਾਹੀਦੇ ਸਕਦਾ ਸਕਦੀ ਸਕਦੇ ਰਿਹਾ ਰਹੀ ਰਹੇ ਦਿੱਤਾ ਦਿੱਤੀ ਲਿਆ ਲਈ ਕਹਿੰਦਾ ਰਹਿੰਦਾ ਦਿੰਦਾ ਹੁੰਦਾ ਹੁੰਦੀ ਹੁੰਦੇ ਪਾਉਂਦੇ ਮਨਾਉਂਦੇ ਸਿਖਾਉਂਦੀ`,
  OFFICE: `ਦਫ਼ਤਰ ਸਰਕਾਰ ਸਰਕਾਰੀ ਅਫ਼ਸਰ ਕਲਰਕ ਕਰਮਚਾਰੀ ਅਧਿਕਾਰੀ ਵਿਭਾਗ ਮੰਤਰੀ ਸਕੱਤਰ ਡਾਇਰੈਕਟਰ ਜ਼ਿਲ੍ਹਾ ਤਹਿਸੀਲ ਪੰਚਾਇਤ ਸਰਪੰਚ ਨਗਰ ਨਿਗਮ ਅਰਜ਼ੀ ਪੱਤਰ ਚਿੱਠੀ ਫ਼ਾਈਲ ਰਿਕਾਰਡ ਰਿਪੋਰਟ ਹੁਕਮ ਨੋਟਿਸ ਸੂਚਨਾ ਸੂਚੀ ਮਿਤੀ ਨੰਬਰ ਦਸਤਖ਼ਤ ਮੋਹਰ ਤਨਖ਼ਾਹ ਛੁੱਟੀ ਬਦਲੀ ਤਰੱਕੀ ਭਰਤੀ ਨੌਕਰੀ ਅਸਾਮੀ ਉਮੀਦਵਾਰ ਪ੍ਰੀਖਿਆ ਨਤੀਜਾ ਯੋਗਤਾ ਤਜਰਬਾ ਸਰਟੀਫਿਕੇਟ ਦਸਤਾਵੇਜ਼ ਪੜਤਾਲ ਕਾਰਵਾਈ ਮਨਜ਼ੂਰੀ ਪ੍ਰਵਾਨਗੀ ਬਜਟ ਖ਼ਰਚਾ ਰਕਮ ਰੁਪਏ ਬੈਂਕ ਖਾਤਾ ਟੈਕਸ ਕਾਨੂੰਨ ਨਿਯਮ ਅਦਾਲਤ ਜੱਜ ਵਕੀਲ ਪੁਲਿਸ ਥਾਣਾ ਸ਼ਿਕਾਇਤ ਮੀਟਿੰਗ ਫ਼ੈਸਲਾ ਸਹਾਇਤਾ ਯੋਜਨਾ ਸਕੀਮ ਪੈਨਸ਼ਨ ਲਾਭਪਾਤਰੀ ਕੰਪਿਊਟਰ ਟਾਈਪਿੰਗ ਕੀਬੋਰਡ ਬਿਨੈਕਾਰ ਹਾਜ਼ਰੀ ਸੇਵਾ ਕੇਂਦਰ`
};

/* ---------- Word bank ---------- */
const WORDS = `ਕਰ ਪਰ ਤਰ ਚਰ ਕਟ ਤਰਕ ਕਿ ਕੇ ਤੇ ਕਿਤੇ ਕਿਰਤ ਤੋਪ ਰੇਤ ਕੋਟ ਪੇਟ ਚੋਟ ਚੋਰ ਤੁਰ ਪਰਤ ਟਿਕਟ ਕਾਰ ਤਾਰ ਪਾਰ ਚਾਰ ਤਾਰਾ ਪੀਰ ਤੀਰ ਕੀਤਾ ਪਾਤਰ ਕਾਪੀ ਟੋਪੀ ਰੋਟੀ ਚੋਟੀ ਪੂਰਾ ਪੈਰ ਤੈਰਾਕ ਚੌਕ ਪਤਾ ਪਾਪ ਤਾਪ ਚਾਕੂ ਪਾਰਟੀ ਟਾਪੂ ਪਿਤਾ ਚਾਚਾ ਕਾਕਾ ਰੀਤ ਕੁਰਤਾ ਤਰੀਕਾ ਕਰਤਾ ਚੀਤਾ ਪੀਤਾ ਰਾਤ ਤੀਰਥ
ਹਰ ਬਾਗ ਗੀਤ ਦੇਰ ਬੇਰ ਹਾਰ ਡਾਕ ਜਾਦੂ ਗਾਜਰ ਬਾਜ ਰਾਜ ਤਾਜ ਦਰ ਗੁਰੂ ਦੇਹ ਹੀਰਾ ਬੂਟਾ ਡਾਕੂ ਜੇਬ ਕਿਤਾਬ ਦਾਦਾ ਦਾਦੀ ਬਾਪੂ ਚਾਬੀ ਦੁਕਾਨ ਬਹਾਦਰ ਗਾਗਰ ਜਹਾਜ਼ ਡਰ ਬਾਹਰ ਦਿਨ ਰੋਜ਼ ਗੁਰਦੁਆਰਾ ਦੂਰ ਜੀਵ ਹੁਕਮ ਬਰਾਬਰ ਤਾਰੀਖ਼ ਦੇਸ਼ ਬੈਂਕ ਦਰਜਾ ਜਾਗਰੂਕ ਹਾਜ਼ਰ ਬੁਰਾ ਹਰਾ ਦੀਪ ਦੀਵਾ ਡੋਰ ਜੋਤ ਬਿਜਲੀ ਗੋਡਾ ਡੰਡਾ ਹੋਰ ਦੋ ਜੋ ਹੈ ਹੋ ਦੇ ਦਾ ਦੀ
ਮਨ ਤਨ ਜਲ ਫਲ ਕਲਮ ਨਗਰ ਸੇਵਾ ਲੋਕ ਮੇਲਾ ਨਾਲ ਲਈ ਸਮਾਜ ਸਰਕਾਰ ਮਿਹਨਤ ਸਬਕ ਸਾਲ ਮਹੀਨਾ ਵਾਕ ਨਾਮ ਮਾਤਾ ਮਾਮਾ ਮਾਸੀ ਨਾਨਾ ਨਾਨੀ ਸਾਗ ਮੋਰ ਸੋਨਾ ਲਾਲ ਨੀਲਾ ਪੀਲਾ ਕਾਲਾ ਹਵਾ ਸੂਰਜ ਵਰਦੀ ਕਮਰਾ ਗਲੀ ਨਹਿਰ ਕਿਸਾਨ ਜਮਾਤ ਯਾਦ ਯਾਰ ਯੋਗ ਸਵਾਲ ਜਵਾਬ ਵਿਚਾਰ ਦਵਾਈ ਸਿਹਤ ਲਿਪੀ ਬੋਲੀ ਕਵਿਤਾ ਸਕੂਲ ਕਾਲਜ ਰੇਲ ਸਾਈਕਲ ਦਰਿਆ ਧਰਤੀ ਪਾਣੀ ਅਸਮਾਨ ਸਮਾਂ ਮੀਲ ਨਵਾਂ ਸਾਰਾ ਸਭ ਮੇਰਾ ਤੇਰਾ ਸਾਡਾ ਮਾਲਕ ਮਕਾਨ ਲਗਾਤਾਰ ਸਰਦੀ ਗਰਮੀ ਮੌਸਮ ਸਵੇਰ ਸ਼ਾਮ ਯਤਨ ਯੋਜਨਾ ਨਿਯਮ ਮਾਮਲਾ ਸਮਾਰੋਹ ਵਿਸਾਖੀ ਲੋਹੜੀ ਦੀਵਾਲੀ ਮੰਦਰ ਬਾਜ਼ਾਰ ਰੁਪਏ ਸਿਪਾਹੀ ਕਲਰਕ ਸਮਾਚਾਰ ਵਿਦਿਆਰਥੀ ਸਿਲਾਈ ਮਾਲੀ ਸੈਰ ਨੌਕਰ ਮੌਕਾ ਵੈਰ ਲੈਣ ਨਹੀਂ ਮੈਂ ਅਸੀਂ ਤੁਸੀਂ ਕਿਉਂ ਕਦੋਂ ਕਿਵੇਂ ਉਹ ਇਹ ਉਸ ਇਸ ਅਤੇ ਜਾਂ
ਪੰਜ ਪੰਜਾਬ ਪੰਜਾਬੀ ਹਿੰਦੀ ਮੁੰਡਾ ਨੂੰ ਮਾਂ ਮੈਂ ਗੰਨਾ ਚੰਨ ਰੰਗ ਸੰਗਤ ਮੰਗ ਬੰਦ ਅੰਦਰ ਸੁੰਦਰ ਕੰਮ ਚੰਗਾ ਲੰਬਾ ਠੰਢਾ ਝੰਡਾ ਤੰਦਰੁਸਤ ਸਿੰਘ ਮਿੰਟ ਹੁੰਦਾ ਦਿੰਦਾ ਕਹਿੰਦਾ ਰਹਿੰਦਾ ਕਿਉਂਕਿ ਥਾਂ ਛਾਂ ਗਾਂ ਨਾਂ ਸਾਂਝ ਮੀਂਹ ਦਹੀਂ ਸਾਨੂੰ ਤੁਹਾਨੂੰ ਉਨ੍ਹਾਂ ਇਨ੍ਹਾਂ ਜਿਨ੍ਹਾਂ ਸਮੇਂ ਕੇਂਦਰ ਗੱਲਾਂ ਖੇਤਾਂ ਭਾਸ਼ਾਵਾਂ
ਅੱਜ ਅੱਖਰ ਅਮੀਰ ਅਰਜ਼ੀ ਅਭਿਆਸ ਅਧਿਆਪਕ ਅਫ਼ਸਰ ਅਨਾਜ ਇੱਕ ਇਮਾਰਤ ਇਲਾਜ ਇਨਾਮ ਇਤਿਹਾਸ ਉਮਰ ਉਮੀਦ ਉਮੀਦਵਾਰ ਉੱਤੇ ਉੱਚਾ ਏਕਤਾ ਓਦੋਂ ਆਦਮੀ ਆਜ਼ਾਦੀ ਆਵਾਜ਼ ਆਸ ਈਮਾਨ ਊਠ ਐਨਕ ਔਰਤ ਔਖਾ ਆਪ ਆਪਣਾ ਆਉਣਾ ਜਾਣਾ ਖਾਣਾ ਪੀਣਾ
ਖੇਤ ਖੇਤੀ ਖੇਡ ਖ਼ਬਰ ਖ਼ੁਸ਼ੀ ਖੁਸ਼ੀ ਖਿੜਕੀ ਖੂਹ ਥਾਲੀ ਥੋੜ੍ਹਾ ਛੇ ਛੋਟਾ ਛੱਤ ਛੁੱਟੀ ਠੀਕ ਠੰਢ ਫੁੱਲ ਫ਼ਸਲ ਫ਼ਾਈਲ ਫ਼ਰਜ਼ ਫਿਰ ਸੜਕ ਪੜ੍ਹਨਾ ਪੜ੍ਹਾਈ ਕੁੜੀ ਗੱਡੀ ਜੋੜ ਭਰਾ ਭੈਣ ਭਾਸ਼ਾ ਭਾਰਤ ਭਰਤੀ ਭੋਜਨ ਘਰ ਘੱਟ ਘੰਟਾ ਘਾਹ ਧਰਮ ਧਿਆਨ ਧੀ ਧੰਨਵਾਦ ਝੋਨਾ ਝੂਠ ਢੋਲ ਢੰਗ ਪਾਣੀ ਰਾਣੀ ਕਹਾਣੀ ਪੁਰਾਣਾ ਲਿਖਣਾ ਸੁਣਨਾ ਗਿਣਤੀ ਸ਼ਹਿਰ ਸ਼ਬਦ ਸ਼ੁੱਧ ਸ਼ਕਤੀ ਸ਼ੁਰੂ ਸ਼ਾਂਤੀ ਵਿਸ਼ਾ ਕੋਸ਼ਿਸ਼ ਬਾਰਿਸ਼ ਮਸ਼ੀਨ ਪੀਲ਼ਾ
ਪੱਕਾ ਬੱਚਾ ਸੱਚ ਹੱਥ ਮੱਖਣ ਲੱਸੀ ਦੁੱਧ ਰੁੱਖ ਪੱਤਾ ਸੱਤ ਅੱਠ ਕੱਲ੍ਹ ਗੱਲ ਵੱਡਾ ਮਿੱਠਾ ਚਿੱਟਾ ਖੱਟਾ ਮਿੱਟੀ ਚਿੱਠੀ ਪੁੱਤਰ ਦੱਸ ਵਿੱਚ ਕਬੱਡੀ ਸੱਭਿਆਚਾਰ ਮੁੱਖ ਲੱਖ ਹਿੱਸਾ ਇੱਥੇ ਕਿੱਥੇ ਜਿੱਥੇ ਉੱਠਣਾ ਸਿੱਖਣਾ
ਜ਼ਮੀਨ ਜ਼ਰੂਰੀ ਜ਼ਿਲ੍ਹਾ ਜ਼ਿੰਦਗੀ ਕਾਗ਼ਜ਼ ਗ਼ਰੀਬ ਬਾਗ਼ ਮਜ਼ਦੂਰ ਸਬਜ਼ੀ ਦਰਵਾਜ਼ਾ ਹਜ਼ਾਰ ਮੇਜ਼ ਸਫ਼ਰ ਦਫ਼ਤਰ ਮੁਫ਼ਤ ਹਫ਼ਤਾ ਸਾਫ਼ ਤਰੱਕੀ ਖ਼ਾਲਸਾ
ਪ੍ਰੀਖਿਆ ਪ੍ਰਬੰਧ ਪ੍ਰਧਾਨ ਪ੍ਰਸਿੱਧ ਪ੍ਰਦੂਸ਼ਣ ਪ੍ਰੀਤ ਪ੍ਰੇਮ ਕ੍ਰਿਪਾ ਕ੍ਰਾਂਤੀ ਸ੍ਰੀ ਤ੍ਰਿਪਤ ਦ੍ਰਿੜ ਅੰਮ੍ਰਿਤਸਰ ਪੜ੍ਹਾਈ ਚੜ੍ਹਦਾ ਤਰ੍ਹਾਂ ਸਰ੍ਹੋਂ ਬੁੱਲ੍ਹ ਖੁੱਲ੍ਹਾ ਸਵੈ ${Object.values(WORD_LISTS).join(' ')}`.split(/\s+/).filter(Boolean);
WORD_LISTS.ALL = Object.values(WORD_LISTS).join(' ');

const SENTENCES = [
  'ਪੰਜਾਬ ਪੰਜ ਦਰਿਆਵਾਂ ਦੀ ਧਰਤੀ ਹੈ।',
  'ਮੈਂ ਹਰ ਰੋਜ਼ ਟਾਈਪਿੰਗ ਦਾ ਅਭਿਆਸ ਕਰਦਾ ਹਾਂ।',
  'ਸਾਡੇ ਪਿੰਡ ਵਿੱਚ ਇੱਕ ਸਰਕਾਰੀ ਸਕੂਲ ਹੈ।',
  'ਕਿਸਾਨ ਖੇਤਾਂ ਵਿੱਚ ਸਖ਼ਤ ਮਿਹਨਤ ਕਰਦੇ ਹਨ।',
  'ਸਮੇਂ ਦੀ ਕਦਰ ਕਰਨ ਵਾਲਾ ਮਨੁੱਖ ਸਦਾ ਅੱਗੇ ਵਧਦਾ ਹੈ।',
  'ਸਾਨੂੰ ਆਪਣੀ ਮਾਂ ਬੋਲੀ ਉੱਤੇ ਮਾਣ ਹੈ।',
  'ਸਵੇਰ ਦੀ ਸੈਰ ਸਿਹਤ ਲਈ ਬਹੁਤ ਚੰਗੀ ਹੁੰਦੀ ਹੈ।',
  'ਦਫ਼ਤਰ ਦਾ ਕੰਮ ਸਮੇਂ ਸਿਰ ਪੂਰਾ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ।',
  'ਰੁੱਖ ਸਾਨੂੰ ਛਾਂ, ਫਲ ਅਤੇ ਸਾਫ਼ ਹਵਾ ਦਿੰਦੇ ਹਨ।',
  'ਪਾਣੀ ਦੀ ਹਰ ਬੂੰਦ ਕੀਮਤੀ ਹੈ।',
  'ਚੰਗੀਆਂ ਕਿਤਾਬਾਂ ਸਾਡੀਆਂ ਸੱਚੀਆਂ ਦੋਸਤ ਹੁੰਦੀਆਂ ਹਨ।',
  'ਅਧਿਆਪਕ ਬੱਚਿਆਂ ਨੂੰ ਪਿਆਰ ਨਾਲ ਪੜ੍ਹਾਉਂਦੇ ਹਨ।',
  'ਉਮੀਦਵਾਰ ਨੂੰ ਪ੍ਰੀਖਿਆ ਕੇਂਦਰ ਵਿੱਚ ਸਮੇਂ ਤੋਂ ਪਹਿਲਾਂ ਪਹੁੰਚਣਾ ਚਾਹੀਦਾ ਹੈ।',
  'ਇਮਾਨਦਾਰੀ ਸਭ ਤੋਂ ਵਧੀਆ ਨੀਤੀ ਹੈ।',
  'ਗੁਰਮੁਖੀ ਲਿਪੀ ਵਿੱਚ ਪੈਂਤੀ ਅੱਖਰ ਹਨ।',
  'ਮਿਹਨਤ ਦਾ ਫਲ ਸਦਾ ਮਿੱਠਾ ਹੁੰਦਾ ਹੈ।',
  'ਵਿਸਾਖੀ ਵਾਲੇ ਦਿਨ ਕਿਸਾਨ ਢੋਲ ਦੀ ਤਾਲ ਉੱਤੇ ਭੰਗੜਾ ਪਾਉਂਦੇ ਹਨ।',
  'ਸੇਵਾ ਕੇਂਦਰ ਵਿੱਚ ਅਰਜ਼ੀ ਦੇਣ ਸਮੇਂ ਸਾਰੇ ਦਸਤਾਵੇਜ਼ ਨਾਲ ਲੈ ਕੇ ਜਾਓ।',
  'ਮੈਂ ਪੰਜਾਬ ਦੇ ਇੱਕ ਛੋਟੇ ਜਿਹੇ ਪਿੰਡ ਵਿੱਚ ਰਹਿੰਦਾ ਹਾਂ।',
  'ਸਾਡੇ ਘਰ ਵਿੱਚ ਪੰਜ ਜੀਅ ਹਨ।',
  'ਮੇਰੇ ਪਿਤਾ ਜੀ ਖੇਤੀ ਕਰਦੇ ਹਨ।',
  'ਮੇਰੀ ਮਾਤਾ ਜੀ ਸਵੇਰੇ ਜਲਦੀ ਉੱਠਦੇ ਹਨ।',
  'ਅੱਜ ਮੌਸਮ ਬਹੁਤ ਸੁਹਾਵਣਾ ਹੈ।',
  'ਕੱਲ੍ਹ ਸਾਰਾ ਦਿਨ ਮੀਂਹ ਪੈਂਦਾ ਰਿਹਾ।',
  'ਬੱਚੇ ਸਕੂਲ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਖੇਡ ਰਹੇ ਹਨ।',
  'ਸਾਨੂੰ ਵੱਡਿਆਂ ਦਾ ਸਤਿਕਾਰ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ।',
  'ਸੱਚ ਬੋਲਣਾ ਸਭ ਤੋਂ ਵੱਡਾ ਗੁਣ ਹੈ।',
  'ਮਿਹਨਤ ਕਰਨ ਵਾਲਾ ਕਦੇ ਨਹੀਂ ਹਾਰਦਾ।',
  'ਗੁਆਂਢੀ ਸਾਡੇ ਸੁੱਖ ਦੁੱਖ ਦੇ ਸਾਥੀ ਹੁੰਦੇ ਹਨ।',
  'ਹਰ ਰੋਜ਼ ਅਖ਼ਬਾਰ ਪੜ੍ਹਨ ਨਾਲ ਗਿਆਨ ਵਧਦਾ ਹੈ।',
  'ਸੜਕ ਪਾਰ ਕਰਦੇ ਸਮੇਂ ਦੋਵੇਂ ਪਾਸੇ ਵੇਖੋ।',
  'ਗੱਡੀ ਚਲਾਉਂਦੇ ਸਮੇਂ ਮੋਬਾਈਲ ਫ਼ੋਨ ਦੀ ਵਰਤੋਂ ਨਾ ਕਰੋ।',
  'ਨਸ਼ੇ ਸਿਹਤ ਅਤੇ ਪਰਿਵਾਰ ਦੋਵਾਂ ਨੂੰ ਬਰਬਾਦ ਕਰਦੇ ਹਨ।',
  'ਸਾਫ਼ ਸਫ਼ਾਈ ਰੱਖਣ ਨਾਲ ਬਿਮਾਰੀਆਂ ਦੂਰ ਰਹਿੰਦੀਆਂ ਹਨ।',
  'ਧੀਆਂ ਪੁੱਤਰਾਂ ਨਾਲੋਂ ਕਿਸੇ ਗੱਲ ਵਿੱਚ ਘੱਟ ਨਹੀਂ ਹਨ।',
  'ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਸੁਸ਼ੋਭਿਤ ਹੈ।',
  'ਚੰਡੀਗੜ੍ਹ ਪੰਜਾਬ ਅਤੇ ਹਰਿਆਣਾ ਦੀ ਸਾਂਝੀ ਰਾਜਧਾਨੀ ਹੈ।',
  'ਲੁਧਿਆਣਾ ਪੰਜਾਬ ਦਾ ਸਭ ਤੋਂ ਵੱਡਾ ਸ਼ਹਿਰ ਹੈ।',
  'ਭਾਖੜਾ ਡੈਮ ਸਤਲੁਜ ਦਰਿਆ ਉੱਤੇ ਬਣਿਆ ਹੋਇਆ ਹੈ।',
  'ਲੋਹੜੀ ਦਾ ਤਿਉਹਾਰ ਜਨਵਰੀ ਮਹੀਨੇ ਵਿੱਚ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ।',
  'ਦੀਵਾਲੀ ਵਾਲੀ ਰਾਤ ਹਰ ਪਾਸੇ ਰੌਸ਼ਨੀ ਹੁੰਦੀ ਹੈ।',
  'ਕਿਤਾਬਾਂ ਪੜ੍ਹਨ ਦੀ ਆਦਤ ਮਨੁੱਖ ਨੂੰ ਸਿਆਣਾ ਬਣਾਉਂਦੀ ਹੈ।',
  'ਸਮਾਂ ਕਿਸੇ ਦੀ ਉਡੀਕ ਨਹੀਂ ਕਰਦਾ।',
  'ਪਿੰਡ ਦੇ ਲੋਕ ਮਿਲ ਜੁਲ ਕੇ ਰਹਿੰਦੇ ਹਨ।',
  'ਹਰ ਬੱਚੇ ਨੂੰ ਪੜ੍ਹਨ ਦਾ ਹੱਕ ਹੈ।',
  'ਅਸੀਂ ਹਰ ਐਤਵਾਰ ਗੁਰਦੁਆਰੇ ਜਾਂਦੇ ਹਾਂ।',
  'ਖੇਡਾਂ ਨਾਲ ਸਰੀਰ ਤੰਦਰੁਸਤ ਰਹਿੰਦਾ ਹੈ।',
  'ਉਸ ਨੇ ਆਪਣਾ ਕੰਮ ਪੂਰੀ ਇਮਾਨਦਾਰੀ ਨਾਲ ਕੀਤਾ।',
  'ਬਾਜ਼ਾਰ ਵਿੱਚ ਅੱਜ ਬਹੁਤ ਭੀੜ ਸੀ।',
  'ਮੇਰਾ ਛੋਟਾ ਭਰਾ ਦਸਵੀਂ ਜਮਾਤ ਵਿੱਚ ਪੜ੍ਹਦਾ ਹੈ।',
  'ਸਾਨੂੰ ਬਿਜਲੀ ਅਤੇ ਪਾਣੀ ਦੀ ਬੱਚਤ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ।',
  'ਕਿਸਾਨ ਦੇਸ਼ ਦਾ ਅੰਨਦਾਤਾ ਹੈ।',
];

const OFFICE_SENTENCES = [
  'ਆਪ ਜੀ ਦੀ ਅਰਜ਼ੀ ਪ੍ਰਾਪਤ ਹੋ ਗਈ ਹੈ।',
  'ਇਸ ਸਬੰਧੀ ਲੋੜੀਂਦੀ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ।',
  'ਸਾਰੇ ਕਰਮਚਾਰੀ ਸਮੇਂ ਸਿਰ ਦਫ਼ਤਰ ਵਿੱਚ ਹਾਜ਼ਰ ਹੋਣ।',
  'ਇਹ ਹੁਕਮ ਤੁਰੰਤ ਪ੍ਰਭਾਵ ਨਾਲ ਲਾਗੂ ਹੋਣਗੇ।',
  'ਉਮੀਦਵਾਰ ਆਪਣੇ ਅਸਲ ਦਸਤਾਵੇਜ਼ ਨਾਲ ਲੈ ਕੇ ਆਉਣ।',
  'ਮੀਟਿੰਗ ਸੋਮਵਾਰ ਨੂੰ ਸਵੇਰੇ ਦਸ ਵਜੇ ਹੋਵੇਗੀ।',
  'ਛੁੱਟੀ ਲਈ ਅਰਜ਼ੀ ਘੱਟੋ ਘੱਟ ਦੋ ਦਿਨ ਪਹਿਲਾਂ ਦਿੱਤੀ ਜਾਵੇ।',
  'ਸਬੰਧਤ ਫ਼ਾਈਲ ਪ੍ਰਵਾਨਗੀ ਲਈ ਪੇਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।',
  'ਸ਼ਿਕਾਇਤ ਦੀ ਪੜਤਾਲ ਕਰਕੇ ਰਿਪੋਰਟ ਭੇਜੀ ਜਾਵੇ।',
  'ਤਨਖ਼ਾਹ ਹਰ ਮਹੀਨੇ ਦੀ ਪਹਿਲੀ ਤਾਰੀਖ਼ ਨੂੰ ਦਿੱਤੀ ਜਾਵੇਗੀ।',
  'ਇਸ ਦਫ਼ਤਰ ਦਾ ਪੱਤਰ ਨੰਬਰ ਅਤੇ ਮਿਤੀ ਹਵਾਲੇ ਵਿੱਚ ਜ਼ਰੂਰ ਲਿਖੋ।',
  'ਨਤੀਜਾ ਵਿਭਾਗ ਦੀ ਵੈੱਬਸਾਈਟ ਉੱਤੇ ਪਾ ਦਿੱਤਾ ਗਿਆ ਹੈ।',
  'ਬਿਨੈਕਾਰ ਨੂੰ ਨਿੱਜੀ ਸੁਣਵਾਈ ਦਾ ਮੌਕਾ ਦਿੱਤਾ ਜਾਵੇ।',
  'ਸਰਕਾਰੀ ਰਿਕਾਰਡ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖਣਾ ਹਰ ਕਰਮਚਾਰੀ ਦੀ ਜ਼ਿੰਮੇਵਾਰੀ ਹੈ।',
  'ਪ੍ਰੀਖਿਆ ਕੇਂਦਰ ਵਿੱਚ ਮੋਬਾਈਲ ਫ਼ੋਨ ਲੈ ਕੇ ਜਾਣ ਦੀ ਮਨਾਹੀ ਹੈ।',
  'ਸਾਰੀਆਂ ਸ਼ਾਖਾਵਾਂ ਆਪਣੀ ਮਹੀਨਾਵਾਰ ਰਿਪੋਰਟ ਸਮੇਂ ਸਿਰ ਭੇਜਣ।',
  'ਦਫ਼ਤਰ ਵਿੱਚ ਸਾਰਾ ਕੰਮ ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਵਿੱਚ ਕੀਤਾ ਜਾਵੇ।',
  'ਜਨਤਾ ਦੀਆਂ ਸ਼ਿਕਾਇਤਾਂ ਦਾ ਨਿਪਟਾਰਾ ਪਹਿਲ ਦੇ ਅਧਾਰ ਉੱਤੇ ਕੀਤਾ ਜਾਵੇ।',
  'ਇਸ ਪੱਤਰ ਦੀ ਪ੍ਰਾਪਤੀ ਦੀ ਸੂਚਨਾ ਤੁਰੰਤ ਭੇਜੀ ਜਾਵੇ।',
  'ਉਕਤ ਕਰਮਚਾਰੀ ਦੀ ਬਦਲੀ ਜ਼ਿਲ੍ਹਾ ਦਫ਼ਤਰ ਵਿੱਚ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।',
  'ਬਜਟ ਦੀ ਰਕਮ ਸਿਰਫ਼ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਕੰਮਾਂ ਉੱਤੇ ਹੀ ਖ਼ਰਚ ਕੀਤੀ ਜਾਵੇ।',
  'ਅਗਲੀ ਮੀਟਿੰਗ ਦੀ ਸੂਚਨਾ ਸਾਰੇ ਮੈਂਬਰਾਂ ਨੂੰ ਭੇਜ ਦਿੱਤੀ ਜਾਵੇ।'
];

/* ---------- Exam passages ---------- */
const PASSAGES = [
 {id:'punjab', t:'ਪੰਜਾਬ ਦੀ ਧਰਤੀ', en:'The land of Punjab', x:`ਪੰਜਾਬ ਭਾਰਤ ਦਾ ਇੱਕ ਖੁਸ਼ਹਾਲ ਅਤੇ ਉਪਜਾਊ ਸੂਬਾ ਹੈ। ਪੰਜਾਬ ਸ਼ਬਦ ਫ਼ਾਰਸੀ ਦੇ ਦੋ ਸ਼ਬਦਾਂ ਪੰਜ ਅਤੇ ਆਬ ਤੋਂ ਮਿਲ ਕੇ ਬਣਿਆ ਹੈ, ਜਿਸ ਦਾ ਅਰਥ ਹੈ ਪੰਜ ਪਾਣੀਆਂ ਦੀ ਧਰਤੀ। ਕਿਸੇ ਸਮੇਂ ਇੱਥੇ ਸਤਲੁਜ, ਬਿਆਸ, ਰਾਵੀ, ਚਨਾਬ ਅਤੇ ਜੇਹਲਮ ਪੰਜ ਦਰਿਆ ਵਗਦੇ ਸਨ। ਦੇਸ਼ ਦੀ ਵੰਡ ਤੋਂ ਬਾਅਦ ਹੁਣ ਭਾਰਤੀ ਪੰਜਾਬ ਵਿੱਚ ਸਤਲੁਜ, ਬਿਆਸ ਅਤੇ ਰਾਵੀ ਦਰਿਆ ਹੀ ਵਗਦੇ ਹਨ। ਪੰਜਾਬ ਦੀ ਧਰਤੀ ਬਹੁਤ ਉਪਜਾਊ ਹੈ ਅਤੇ ਇੱਥੋਂ ਦੇ ਲੋਕ ਮਿਹਨਤੀ ਹਨ। ਇਸੇ ਕਰਕੇ ਪੰਜਾਬ ਨੂੰ ਭਾਰਤ ਦਾ ਅੰਨ ਭੰਡਾਰ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਕਣਕ ਅਤੇ ਝੋਨਾ ਇੱਥੋਂ ਦੀਆਂ ਮੁੱਖ ਫ਼ਸਲਾਂ ਹਨ। ਹਰੀ ਕ੍ਰਾਂਤੀ ਤੋਂ ਬਾਅਦ ਪੰਜਾਬ ਦੇ ਕਿਸਾਨਾਂ ਨੇ ਦੇਸ਼ ਨੂੰ ਅਨਾਜ ਦੇ ਮਾਮਲੇ ਵਿੱਚ ਆਤਮ ਨਿਰਭਰ ਬਣਾਉਣ ਵਿੱਚ ਵੱਡਾ ਯੋਗਦਾਨ ਪਾਇਆ। ਪੰਜਾਬ ਦਾ ਸੱਭਿਆਚਾਰ ਵੀ ਬਹੁਤ ਅਮੀਰ ਹੈ। ਭੰਗੜਾ ਅਤੇ ਗਿੱਧਾ ਇੱਥੋਂ ਦੇ ਪ੍ਰਸਿੱਧ ਲੋਕ ਨਾਚ ਹਨ। ਵਿਆਹਾਂ ਅਤੇ ਤਿਉਹਾਰਾਂ ਮੌਕੇ ਲੋਕ ਬੋਲੀਆਂ ਪਾਉਂਦੇ ਹਨ ਅਤੇ ਖੁਸ਼ੀ ਮਨਾਉਂਦੇ ਹਨ। ਪੰਜਾਬੀ ਲੋਕ ਆਪਣੀ ਮਹਿਮਾਨ ਨਿਵਾਜ਼ੀ ਲਈ ਸਾਰੀ ਦੁਨੀਆ ਵਿੱਚ ਜਾਣੇ ਜਾਂਦੇ ਹਨ। ਅੱਜ ਪੰਜਾਬੀ ਦੁਨੀਆ ਦੇ ਹਰ ਕੋਨੇ ਵਿੱਚ ਵੱਸਦੇ ਹਨ ਅਤੇ ਆਪਣੀ ਮਿਹਨਤ ਨਾਲ ਨਾਮ ਕਮਾ ਰਹੇ ਹਨ।`},
 {id:'nanak', t:'ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ', en:'Sri Guru Nanak Dev Ji', x:`ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਬਾਨੀ ਅਤੇ ਪਹਿਲੇ ਗੁਰੂ ਸਨ। ਆਪ ਜੀ ਦਾ ਜਨਮ ਰਾਇ ਭੋਇ ਦੀ ਤਲਵੰਡੀ ਵਿਖੇ ਹੋਇਆ, ਜਿਸ ਨੂੰ ਅੱਜਕੱਲ੍ਹ ਸ੍ਰੀ ਨਨਕਾਣਾ ਸਾਹਿਬ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਆਪ ਜੀ ਦੇ ਪਿਤਾ ਜੀ ਦਾ ਨਾਮ ਮਹਿਤਾ ਕਾਲੂ ਜੀ ਅਤੇ ਮਾਤਾ ਜੀ ਦਾ ਨਾਮ ਮਾਤਾ ਤ੍ਰਿਪਤਾ ਜੀ ਸੀ। ਬਚਪਨ ਤੋਂ ਹੀ ਆਪ ਜੀ ਦਾ ਮਨ ਦੁਨਿਆਵੀ ਕੰਮਾਂ ਨਾਲੋਂ ਵੱਧ ਪਰਮਾਤਮਾ ਦੀ ਭਗਤੀ ਵਿੱਚ ਲੱਗਦਾ ਸੀ। ਆਪ ਜੀ ਨੇ ਲੋਕਾਂ ਨੂੰ ਕਿਰਤ ਕਰਨ, ਨਾਮ ਜਪਣ ਅਤੇ ਵੰਡ ਛਕਣ ਦਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ। ਆਪ ਜੀ ਨੇ ਜਾਤ ਪਾਤ, ਊਚ ਨੀਚ ਅਤੇ ਵਹਿਮਾਂ ਭਰਮਾਂ ਦਾ ਖੰਡਨ ਕੀਤਾ। ਲੋਕਾਂ ਨੂੰ ਸੱਚ ਦਾ ਰਸਤਾ ਵਿਖਾਉਣ ਲਈ ਆਪ ਜੀ ਨੇ ਚਾਰ ਲੰਬੀਆਂ ਯਾਤਰਾਵਾਂ ਕੀਤੀਆਂ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਉਦਾਸੀਆਂ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਇਨ੍ਹਾਂ ਯਾਤਰਾਵਾਂ ਦੌਰਾਨ ਭਾਈ ਮਰਦਾਨਾ ਜੀ ਰਬਾਬ ਵਜਾਉਂਦੇ ਸਨ ਅਤੇ ਗੁਰੂ ਜੀ ਬਾਣੀ ਦਾ ਉਚਾਰਨ ਕਰਦੇ ਸਨ। ਆਪ ਜੀ ਨੇ ਇਸਤਰੀ ਨੂੰ ਸਮਾਜ ਵਿੱਚ ਬਰਾਬਰ ਦਾ ਦਰਜਾ ਦੇਣ ਦੀ ਗੱਲ ਕੀਤੀ। ਆਪਣੇ ਜੀਵਨ ਦੇ ਅੰਤਲੇ ਸਾਲ ਆਪ ਜੀ ਨੇ ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਬਤੀਤ ਕੀਤੇ, ਜਿੱਥੇ ਆਪ ਜੀ ਆਪ ਖੇਤੀ ਕਰਦੇ ਸਨ। ਗੁਰੂ ਜੀ ਦੀ ਬਾਣੀ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਵਿੱਚ ਦਰਜ ਹੈ ਅਤੇ ਅੱਜ ਵੀ ਸਾਰੀ ਮਨੁੱਖਤਾ ਨੂੰ ਰਾਹ ਵਿਖਾਉਂਦੀ ਹੈ।`},
 {id:'water', t:'ਪਾਣੀ ਦੀ ਸੰਭਾਲ', en:'Saving water', x:`ਪਾਣੀ ਕੁਦਰਤ ਦੀ ਇੱਕ ਅਨਮੋਲ ਦਾਤ ਹੈ। ਪਾਣੀ ਤੋਂ ਬਿਨਾਂ ਧਰਤੀ ਉੱਤੇ ਜੀਵਨ ਦੀ ਕਲਪਨਾ ਵੀ ਨਹੀਂ ਕੀਤੀ ਜਾ ਸਕਦੀ। ਗੁਰਬਾਣੀ ਵਿੱਚ ਵੀ ਪਾਣੀ ਨੂੰ ਪਿਤਾ ਦਾ ਦਰਜਾ ਦਿੱਤਾ ਗਿਆ ਹੈ। ਪਰ ਅੱਜ ਪੰਜਾਬ ਵਿੱਚ ਧਰਤੀ ਹੇਠਲੇ ਪਾਣੀ ਦਾ ਪੱਧਰ ਹਰ ਸਾਲ ਹੇਠਾਂ ਜਾ ਰਿਹਾ ਹੈ। ਝੋਨੇ ਦੀ ਫ਼ਸਲ ਲਈ ਬਹੁਤ ਜ਼ਿਆਦਾ ਪਾਣੀ ਦੀ ਲੋੜ ਪੈਂਦੀ ਹੈ ਅਤੇ ਇਸ ਲਈ ਲੱਖਾਂ ਟਿਊਬਵੈੱਲ ਦਿਨ ਰਾਤ ਧਰਤੀ ਵਿੱਚੋਂ ਪਾਣੀ ਕੱਢਦੇ ਹਨ। ਕਈ ਬਲਾਕਾਂ ਨੂੰ ਪਹਿਲਾਂ ਹੀ ਖ਼ਤਰੇ ਵਾਲੇ ਖੇਤਰ ਐਲਾਨਿਆ ਜਾ ਚੁੱਕਾ ਹੈ। ਜੇਕਰ ਅਸੀਂ ਹੁਣ ਵੀ ਨਾ ਸੰਭਲੇ ਤਾਂ ਆਉਣ ਵਾਲੀਆਂ ਪੀੜ੍ਹੀਆਂ ਨੂੰ ਪੀਣ ਵਾਲੇ ਪਾਣੀ ਲਈ ਵੀ ਤਰਸਣਾ ਪਵੇਗਾ। ਪਾਣੀ ਬਚਾਉਣ ਲਈ ਕਿਸਾਨਾਂ ਨੂੰ ਤੁਪਕਾ ਸਿੰਚਾਈ ਅਤੇ ਘੱਟ ਪਾਣੀ ਵਾਲੀਆਂ ਫ਼ਸਲਾਂ ਅਪਣਾਉਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ। ਮੀਂਹ ਦੇ ਪਾਣੀ ਨੂੰ ਸੰਭਾਲ ਕੇ ਧਰਤੀ ਵਿੱਚ ਵਾਪਸ ਭੇਜਣਾ ਵੀ ਇੱਕ ਵਧੀਆ ਤਰੀਕਾ ਹੈ। ਘਰਾਂ ਵਿੱਚ ਵੀ ਸਾਨੂੰ ਟੂਟੀਆਂ ਖੁੱਲ੍ਹੀਆਂ ਨਹੀਂ ਛੱਡਣੀਆਂ ਚਾਹੀਦੀਆਂ ਅਤੇ ਪਾਣੀ ਦੀ ਹਰ ਬੂੰਦ ਦੀ ਕਦਰ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ। ਪਾਣੀ ਦੀ ਸੰਭਾਲ ਹਰ ਨਾਗਰਿਕ ਦਾ ਫ਼ਰਜ਼ ਹੈ।`},
 {id:'bhagat', t:'ਸ਼ਹੀਦ ਭਗਤ ਸਿੰਘ', en:'Shaheed Bhagat Singh', x:`ਸ਼ਹੀਦ ਭਗਤ ਸਿੰਘ ਭਾਰਤ ਦੀ ਆਜ਼ਾਦੀ ਦੀ ਲੜਾਈ ਦੇ ਮਹਾਨ ਨਾਇਕ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ ਲਾਇਲਪੁਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਬੰਗਾ ਵਿੱਚ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦਾ ਜੱਦੀ ਪਿੰਡ ਖਟਕੜ ਕਲਾਂ ਹੈ, ਜੋ ਹੁਣ ਸ਼ਹੀਦ ਭਗਤ ਸਿੰਘ ਨਗਰ ਜ਼ਿਲ੍ਹੇ ਵਿੱਚ ਹੈ। ਉਨ੍ਹਾਂ ਦਾ ਪਰਿਵਾਰ ਦੇਸ਼ ਭਗਤੀ ਲਈ ਜਾਣਿਆ ਜਾਂਦਾ ਸੀ। ਜਲ੍ਹਿਆਂਵਾਲੇ ਬਾਗ਼ ਦੇ ਖ਼ੂਨੀ ਸਾਕੇ ਨੇ ਬਾਲ ਭਗਤ ਸਿੰਘ ਦੇ ਮਨ ਉੱਤੇ ਡੂੰਘਾ ਅਸਰ ਪਾਇਆ। ਉਨ੍ਹਾਂ ਨੇ ਲਾਹੌਰ ਦੇ ਨੈਸ਼ਨਲ ਕਾਲਜ ਵਿੱਚ ਪੜ੍ਹਾਈ ਕੀਤੀ ਅਤੇ ਨੌਜਵਾਨ ਭਾਰਤ ਸਭਾ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ। ਲਾਲਾ ਲਾਜਪਤ ਰਾਏ ਦੀ ਮੌਤ ਦਾ ਬਦਲਾ ਲੈਣ ਲਈ ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਸਾਥੀਆਂ ਨਾਲ ਮਿਲ ਕੇ ਕਾਰਵਾਈ ਕੀਤੀ। ਬਾਅਦ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੇ ਬਟੁਕੇਸ਼ਵਰ ਦੱਤ ਨਾਲ ਮਿਲ ਕੇ ਕੇਂਦਰੀ ਅਸੈਂਬਲੀ ਵਿੱਚ ਬੰਬ ਸੁੱਟਿਆ ਤਾਂ ਜੋ ਬੋਲੀ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਦੇ ਕੰਨਾਂ ਤੱਕ ਆਵਾਜ਼ ਪਹੁੰਚ ਸਕੇ। ਜੇਲ੍ਹ ਵਿੱਚ ਰਹਿੰਦਿਆਂ ਵੀ ਉਨ੍ਹਾਂ ਨੇ ਬਹੁਤ ਸਾਰੀਆਂ ਕਿਤਾਬਾਂ ਪੜ੍ਹੀਆਂ ਅਤੇ ਲੇਖ ਲਿਖੇ। ਤੇਈ ਸਾਲ ਦੀ ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਰਾਜਗੁਰੂ ਅਤੇ ਸੁਖਦੇਵ ਦੇ ਨਾਲ ਫਾਂਸੀ ਦੇ ਦਿੱਤੀ ਗਈ। ਇਨਕਲਾਬ ਜ਼ਿੰਦਾਬਾਦ ਦਾ ਨਾਅਰਾ ਅੱਜ ਵੀ ਨੌਜਵਾਨਾਂ ਵਿੱਚ ਜੋਸ਼ ਭਰ ਦਿੰਦਾ ਹੈ।`},
 {id:'computer', t:'ਕੰਪਿਊਟਰ ਅਤੇ ਟਾਈਪਿੰਗ', en:'Computers and typing', x:`ਅੱਜ ਦਾ ਯੁੱਗ ਕੰਪਿਊਟਰ ਦਾ ਯੁੱਗ ਹੈ। ਦਫ਼ਤਰਾਂ, ਬੈਂਕਾਂ, ਸਕੂਲਾਂ, ਹਸਪਤਾਲਾਂ ਅਤੇ ਰੇਲਵੇ ਸਟੇਸ਼ਨਾਂ ਉੱਤੇ ਹਰ ਪਾਸੇ ਕੰਪਿਊਟਰ ਦੀ ਵਰਤੋਂ ਹੋ ਰਹੀ ਹੈ। ਜਿਹੜਾ ਕੰਮ ਪਹਿਲਾਂ ਕਈ ਦਿਨਾਂ ਵਿੱਚ ਹੁੰਦਾ ਸੀ, ਉਹ ਹੁਣ ਕੁਝ ਮਿੰਟਾਂ ਵਿੱਚ ਹੋ ਜਾਂਦਾ ਹੈ। ਸਰਕਾਰੀ ਦਫ਼ਤਰਾਂ ਵਿੱਚ ਹੁਣ ਬਹੁਤੀਆਂ ਫ਼ਾਈਲਾਂ ਕੰਪਿਊਟਰ ਉੱਤੇ ਤਿਆਰ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ। ਇਸੇ ਲਈ ਕਲਰਕ ਅਤੇ ਹੋਰ ਅਸਾਮੀਆਂ ਦੀ ਭਰਤੀ ਸਮੇਂ ਟਾਈਪਿੰਗ ਟੈਸਟ ਲਿਆ ਜਾਂਦਾ ਹੈ। ਪੰਜਾਬ ਵਿੱਚ ਸਰਕਾਰੀ ਕੰਮਕਾਜ ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਵਿੱਚ ਹੁੰਦਾ ਹੈ, ਇਸ ਲਈ ਉਮੀਦਵਾਰ ਦਾ ਪੰਜਾਬੀ ਟਾਈਪਿੰਗ ਵਿੱਚ ਨਿਪੁੰਨ ਹੋਣਾ ਜ਼ਰੂਰੀ ਹੈ। ਰਾਵੀ ਫੌਂਟ ਯੂਨੀਕੋਡ ਉੱਤੇ ਅਧਾਰਿਤ ਹੈ ਅਤੇ ਹਰ ਕੰਪਿਊਟਰ ਉੱਤੇ ਸਹੀ ਢੰਗ ਨਾਲ ਪੜ੍ਹਿਆ ਜਾ ਸਕਦਾ ਹੈ। ਟਾਈਪਿੰਗ ਸਿੱਖਣ ਲਈ ਸਭ ਤੋਂ ਜ਼ਰੂਰੀ ਗੱਲ ਰੋਜ਼ਾਨਾ ਅਭਿਆਸ ਹੈ। ਸ਼ੁਰੂ ਵਿੱਚ ਰਫ਼ਤਾਰ ਦੀ ਥਾਂ ਸ਼ੁੱਧਤਾ ਵੱਲ ਧਿਆਨ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ। ਉਂਗਲਾਂ ਨੂੰ ਹਮੇਸ਼ਾ ਘਰ ਵਾਲੀ ਕਤਾਰ ਉੱਤੇ ਰੱਖੋ ਅਤੇ ਕੀਬੋਰਡ ਵੱਲ ਵੇਖੇ ਬਿਨਾਂ ਟਾਈਪ ਕਰਨ ਦੀ ਆਦਤ ਪਾਓ। ਜਦੋਂ ਹੱਥ ਆਪਣੇ ਆਪ ਸਹੀ ਬਟਨਾਂ ਉੱਤੇ ਜਾਣ ਲੱਗ ਪੈਣ, ਤਾਂ ਰਫ਼ਤਾਰ ਆਪਣੇ ਆਪ ਵਧ ਜਾਂਦੀ ਹੈ।`},
 {id:'vaisakhi', t:'ਵਿਸਾਖੀ ਦਾ ਤਿਉਹਾਰ', en:'The Vaisakhi festival', x:`ਵਿਸਾਖੀ ਪੰਜਾਬ ਦਾ ਇੱਕ ਪ੍ਰਮੁੱਖ ਤਿਉਹਾਰ ਹੈ। ਇਹ ਹਰ ਸਾਲ ਅਪ੍ਰੈਲ ਮਹੀਨੇ ਵਿੱਚ ਮਨਾਇਆ ਜਾਂਦਾ ਹੈ। ਇਸ ਸਮੇਂ ਕਣਕ ਦੀ ਫ਼ਸਲ ਪੱਕ ਕੇ ਤਿਆਰ ਹੋ ਜਾਂਦੀ ਹੈ ਅਤੇ ਕਿਸਾਨ ਆਪਣੀ ਮਿਹਨਤ ਦਾ ਫਲ ਵੇਖ ਕੇ ਖੁਸ਼ ਹੁੰਦੇ ਹਨ। ਸੁਨਹਿਰੀ ਖੇਤਾਂ ਨੂੰ ਵੇਖ ਕੇ ਕਿਸਾਨ ਢੋਲ ਦੀ ਤਾਲ ਉੱਤੇ ਭੰਗੜਾ ਪਾਉਂਦੇ ਹਨ। ਵਿਸਾਖੀ ਦਾ ਧਾਰਮਿਕ ਮਹੱਤਵ ਵੀ ਬਹੁਤ ਹੈ। ਸੰਨ ਸੋਲਾਂ ਸੌ ਨੜਿੰਨਵੇਂ ਦੀ ਵਿਸਾਖੀ ਵਾਲੇ ਦਿਨ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਕੀਤੀ ਸੀ। ਇਸ ਦਿਨ ਗੁਰਦੁਆਰਿਆਂ ਵਿੱਚ ਵਿਸ਼ੇਸ਼ ਦੀਵਾਨ ਸਜਦੇ ਹਨ ਅਤੇ ਨਗਰ ਕੀਰਤਨ ਕੱਢੇ ਜਾਂਦੇ ਹਨ। ਤਲਵੰਡੀ ਸਾਬੋ ਵਿਖੇ ਸ੍ਰੀ ਦਮਦਮਾ ਸਾਹਿਬ ਵਿੱਚ ਬਹੁਤ ਵੱਡਾ ਮੇਲਾ ਲੱਗਦਾ ਹੈ। ਸੰਨ ਉੱਨੀ ਸੌ ਉੱਨੀ ਵਿੱਚ ਵਿਸਾਖੀ ਵਾਲੇ ਦਿਨ ਹੀ ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਜਲ੍ਹਿਆਂਵਾਲੇ ਬਾਗ਼ ਵਿੱਚ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਨੇ ਨਿਹੱਥੇ ਲੋਕਾਂ ਉੱਤੇ ਗੋਲੀਆਂ ਚਲਾਈਆਂ ਸਨ। ਇਸ ਤਰ੍ਹਾਂ ਵਿਸਾਖੀ ਦਾ ਤਿਉਹਾਰ ਖੁਸ਼ੀ, ਸ਼ਰਧਾ ਅਤੇ ਕੁਰਬਾਨੀ ਤਿੰਨਾਂ ਦੀ ਯਾਦ ਦਿਵਾਉਂਦਾ ਹੈ।`},
 {id:'pollution', t:'ਵਾਤਾਵਰਣ ਪ੍ਰਦੂਸ਼ਣ', en:'Environmental pollution', x:`ਵਾਤਾਵਰਣ ਦਾ ਅਰਥ ਹੈ ਸਾਡੇ ਆਲੇ ਦੁਆਲੇ ਦੀ ਹਵਾ, ਪਾਣੀ, ਮਿੱਟੀ ਅਤੇ ਰੁੱਖ ਬੂਟੇ। ਜਦੋਂ ਇਨ੍ਹਾਂ ਵਿੱਚ ਗੰਦਗੀ ਅਤੇ ਜ਼ਹਿਰੀਲੇ ਤੱਤ ਮਿਲ ਜਾਂਦੇ ਹਨ ਤਾਂ ਉਸ ਨੂੰ ਪ੍ਰਦੂਸ਼ਣ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਕਾਰਖ਼ਾਨਿਆਂ ਦਾ ਧੂੰਆਂ, ਵਾਹਨਾਂ ਦੀ ਗਿਣਤੀ ਵਿੱਚ ਵਾਧਾ ਅਤੇ ਰੁੱਖਾਂ ਦੀ ਕਟਾਈ ਪ੍ਰਦੂਸ਼ਣ ਦੇ ਮੁੱਖ ਕਾਰਨ ਹਨ। ਪੰਜਾਬ ਵਿੱਚ ਝੋਨੇ ਦੀ ਪਰਾਲੀ ਨੂੰ ਅੱਗ ਲਾਉਣ ਨਾਲ ਹਰ ਸਾਲ ਹਵਾ ਬਹੁਤ ਦੂਸ਼ਿਤ ਹੋ ਜਾਂਦੀ ਹੈ। ਇਸ ਨਾਲ ਸਾਹ ਅਤੇ ਅੱਖਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਵਧਦੀਆਂ ਹਨ ਅਤੇ ਸੜਕਾਂ ਉੱਤੇ ਹਾਦਸੇ ਵੀ ਹੁੰਦੇ ਹਨ। ਪਰਾਲੀ ਸਾੜਨ ਨਾਲ ਮਿੱਟੀ ਦੇ ਮਿੱਤਰ ਕੀੜੇ ਵੀ ਮਰ ਜਾਂਦੇ ਹਨ ਅਤੇ ਜ਼ਮੀਨ ਦੀ ਉਪਜਾਊ ਸ਼ਕਤੀ ਘਟਦੀ ਹੈ। ਸਰਕਾਰ ਵੱਲੋਂ ਕਿਸਾਨਾਂ ਨੂੰ ਪਰਾਲੀ ਦੀ ਸੰਭਾਲ ਲਈ ਮਸ਼ੀਨਾਂ ਉੱਤੇ ਸਬਸਿਡੀ ਦਿੱਤੀ ਜਾ ਰਹੀ ਹੈ। ਸਾਨੂੰ ਸਾਰਿਆਂ ਨੂੰ ਵੱਧ ਤੋਂ ਵੱਧ ਰੁੱਖ ਲਾਉਣੇ ਚਾਹੀਦੇ ਹਨ ਅਤੇ ਪਲਾਸਟਿਕ ਦੇ ਲਿਫ਼ਾਫ਼ਿਆਂ ਦੀ ਵਰਤੋਂ ਬੰਦ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ। ਛੋਟੇ ਸਫ਼ਰ ਲਈ ਸਾਈਕਲ ਦੀ ਵਰਤੋਂ ਕਰਨੀ ਸਿਹਤ ਅਤੇ ਵਾਤਾਵਰਣ ਦੋਵਾਂ ਲਈ ਲਾਭਦਾਇਕ ਹੈ। ਸਾਫ਼ ਵਾਤਾਵਰਣ ਹੀ ਤੰਦਰੁਸਤ ਜੀਵਨ ਦੀ ਨੀਂਹ ਹੈ।`},
 {id:'education', t:'ਸਿੱਖਿਆ ਦਾ ਮਹੱਤਵ', en:'The value of education', x:`ਸਿੱਖਿਆ ਮਨੁੱਖ ਦੇ ਜੀਵਨ ਦਾ ਸਭ ਤੋਂ ਕੀਮਤੀ ਗਹਿਣਾ ਹੈ। ਪੜ੍ਹਿਆ ਲਿਖਿਆ ਵਿਅਕਤੀ ਚੰਗੇ ਅਤੇ ਮਾੜੇ ਵਿੱਚ ਫ਼ਰਕ ਕਰ ਸਕਦਾ ਹੈ ਅਤੇ ਸਮਾਜ ਦੀ ਤਰੱਕੀ ਵਿੱਚ ਹਿੱਸਾ ਪਾ ਸਕਦਾ ਹੈ। ਸਿੱਖਿਆ ਸਿਰਫ਼ ਕਿਤਾਬੀ ਗਿਆਨ ਤੱਕ ਸੀਮਤ ਨਹੀਂ ਹੁੰਦੀ, ਸਗੋਂ ਇਹ ਮਨੁੱਖ ਨੂੰ ਚੰਗਾ ਨਾਗਰਿਕ ਬਣਨਾ ਵੀ ਸਿਖਾਉਂਦੀ ਹੈ। ਸਰਕਾਰ ਨੇ ਛੇ ਤੋਂ ਚੌਦਾਂ ਸਾਲ ਤੱਕ ਦੇ ਬੱਚਿਆਂ ਲਈ ਮੁਫ਼ਤ ਅਤੇ ਲਾਜ਼ਮੀ ਸਿੱਖਿਆ ਦਾ ਕਾਨੂੰਨ ਬਣਾਇਆ ਹੈ। ਸਰਕਾਰੀ ਸਕੂਲਾਂ ਵਿੱਚ ਬੱਚਿਆਂ ਨੂੰ ਮੁਫ਼ਤ ਕਿਤਾਬਾਂ, ਵਰਦੀਆਂ ਅਤੇ ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ। ਧੀਆਂ ਨੂੰ ਪੜ੍ਹਾਉਣਾ ਵੀ ਓਨਾ ਹੀ ਜ਼ਰੂਰੀ ਹੈ ਜਿੰਨਾ ਪੁੱਤਰਾਂ ਨੂੰ। ਇੱਕ ਪੜ੍ਹੀ ਲਿਖੀ ਧੀ ਪੂਰੇ ਪਰਿਵਾਰ ਨੂੰ ਰੋਸ਼ਨੀ ਦਿੰਦੀ ਹੈ। ਅੱਜ ਦੇ ਸਮੇਂ ਵਿੱਚ ਕੰਪਿਊਟਰ ਦੀ ਜਾਣਕਾਰੀ ਵੀ ਸਿੱਖਿਆ ਦਾ ਜ਼ਰੂਰੀ ਹਿੱਸਾ ਬਣ ਗਈ ਹੈ। ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਚਾਹੀਦਾ ਹੈ ਕਿ ਉਹ ਮਨ ਲਾ ਕੇ ਪੜ੍ਹਾਈ ਕਰਨ ਅਤੇ ਆਪਣੇ ਅਧਿਆਪਕਾਂ ਦਾ ਸਤਿਕਾਰ ਕਰਨ। ਸਿੱਖਿਆ ਹੀ ਉਹ ਚਾਬੀ ਹੈ ਜਿਸ ਨਾਲ ਤਰੱਕੀ ਦਾ ਹਰ ਦਰਵਾਜ਼ਾ ਖੁੱਲ੍ਹ ਜਾਂਦਾ ਹੈ।`},
 {id:'office', t:'ਦਫ਼ਤਰੀ ਰਿਕਾਰਡ ਸਬੰਧੀ ਹੁਕਮ', en:'Office order on records', x:`ਦਫ਼ਤਰ ਦੇ ਰਿਕਾਰਡ ਦੀ ਸਾਂਭ ਸੰਭਾਲ ਸਬੰਧੀ ਆਪ ਜੀ ਨੂੰ ਸੂਚਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਕਿ ਦਫ਼ਤਰ ਦੇ ਸਾਰੇ ਪੁਰਾਣੇ ਰਿਕਾਰਡ ਦੀ ਪੜਤਾਲ ਕਰਕੇ ਉਸ ਨੂੰ ਸਹੀ ਢੰਗ ਨਾਲ ਸੰਭਾਲਿਆ ਜਾਣਾ ਹੈ। ਸਾਰੀਆਂ ਸ਼ਾਖਾਵਾਂ ਦੇ ਇੰਚਾਰਜ ਆਪਣੀ ਸ਼ਾਖਾ ਦੀਆਂ ਫ਼ਾਈਲਾਂ ਦੀ ਸੂਚੀ ਤਿਆਰ ਕਰਕੇ ਇਸ ਦਫ਼ਤਰ ਨੂੰ ਭੇਜਣਾ ਯਕੀਨੀ ਬਣਾਉਣ। ਜਿਹੜੀਆਂ ਫ਼ਾਈਲਾਂ ਦੀ ਮਿਆਦ ਪੂਰੀ ਹੋ ਚੁੱਕੀ ਹੈ, ਉਨ੍ਹਾਂ ਨੂੰ ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਨਸ਼ਟ ਕਰਨ ਲਈ ਵੱਖਰੀ ਸੂਚੀ ਬਣਾਈ ਜਾਵੇ। ਜ਼ਰੂਰੀ ਰਿਕਾਰਡ ਨੂੰ ਕੰਪਿਊਟਰ ਵਿੱਚ ਸਕੈਨ ਕਰਕੇ ਸੁਰੱਖਿਅਤ ਰੱਖਿਆ ਜਾਵੇ ਤਾਂ ਜੋ ਲੋੜ ਪੈਣ ਉੱਤੇ ਉਸ ਨੂੰ ਤੁਰੰਤ ਲੱਭਿਆ ਜਾ ਸਕੇ। ਹਰ ਫ਼ਾਈਲ ਉੱਤੇ ਵਿਸ਼ਾ, ਫ਼ਾਈਲ ਨੰਬਰ ਅਤੇ ਸਾਲ ਸਾਫ਼ ਸਾਫ਼ ਲਿਖਿਆ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ। ਰਿਕਾਰਡ ਰੂਮ ਵਿੱਚ ਅੱਗ ਬੁਝਾਊ ਯੰਤਰ ਲਗਾਏ ਜਾਣ ਅਤੇ ਸਿੱਲ੍ਹ ਤੋਂ ਬਚਾਅ ਦਾ ਪੂਰਾ ਪ੍ਰਬੰਧ ਕੀਤਾ ਜਾਵੇ। ਇਹ ਕੰਮ ਅਗਲੇ ਪੰਦਰਾਂ ਦਿਨਾਂ ਦੇ ਅੰਦਰ ਅੰਦਰ ਮੁਕੰਮਲ ਕਰਕੇ ਰਿਪੋਰਟ ਇਸ ਦਫ਼ਤਰ ਨੂੰ ਭੇਜੀ ਜਾਵੇ। ਇਸ ਕੰਮ ਵਿੱਚ ਕਿਸੇ ਕਿਸਮ ਦੀ ਢਿੱਲ ਬਰਦਾਸ਼ਤ ਨਹੀਂ ਕੀਤੀ ਜਾਵੇਗੀ ਅਤੇ ਜ਼ਿੰਮੇਵਾਰ ਕਰਮਚਾਰੀ ਵਿਰੁੱਧ ਬਣਦੀ ਕਾਰਵਾਈ ਕੀਤੀ ਜਾਵੇਗੀ। ਇਹ ਹੁਕਮ ਤੁਰੰਤ ਲਾਗੂ ਹੋਣਗੇ।`},
 {id:'health', t:'ਸਿਹਤ ਅਤੇ ਖੇਡਾਂ', en:'Health and sports', x:`ਚੰਗੀ ਸਿਹਤ ਮਨੁੱਖ ਦਾ ਸਭ ਤੋਂ ਵੱਡਾ ਧਨ ਹੈ। ਕਿਹਾ ਜਾਂਦਾ ਹੈ ਕਿ ਤੰਦਰੁਸਤ ਸਰੀਰ ਵਿੱਚ ਹੀ ਤੰਦਰੁਸਤ ਮਨ ਵੱਸਦਾ ਹੈ। ਅਜੋਕੇ ਸਮੇਂ ਵਿੱਚ ਲੋਕ ਸਰੀਰਕ ਕੰਮ ਘੱਟ ਕਰਦੇ ਹਨ ਅਤੇ ਜ਼ਿਆਦਾ ਸਮਾਂ ਮੋਬਾਈਲ ਅਤੇ ਟੈਲੀਵਿਜ਼ਨ ਅੱਗੇ ਬਿਤਾਉਂਦੇ ਹਨ। ਇਸ ਕਾਰਨ ਸ਼ੂਗਰ, ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਅਤੇ ਦਿਲ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਤੇਜ਼ੀ ਨਾਲ ਵਧ ਰਹੀਆਂ ਹਨ। ਚੰਗੀ ਸਿਹਤ ਲਈ ਸੰਤੁਲਿਤ ਭੋਜਨ, ਪੂਰੀ ਨੀਂਦ ਅਤੇ ਰੋਜ਼ਾਨਾ ਕਸਰਤ ਬਹੁਤ ਜ਼ਰੂਰੀ ਹਨ। ਸਵੇਰੇ ਜਲਦੀ ਉੱਠ ਕੇ ਸੈਰ ਕਰਨੀ ਅਤੇ ਯੋਗ ਕਰਨਾ ਸਰੀਰ ਨੂੰ ਚੁਸਤ ਰੱਖਦਾ ਹੈ। ਸਾਨੂੰ ਤਲੀਆਂ ਹੋਈਆਂ ਚੀਜ਼ਾਂ ਅਤੇ ਬਜ਼ਾਰੀ ਖਾਣੇ ਦੀ ਥਾਂ ਹਰੀਆਂ ਸਬਜ਼ੀਆਂ, ਦਾਲਾਂ, ਫਲ ਅਤੇ ਦੁੱਧ ਨੂੰ ਆਪਣੀ ਖੁਰਾਕ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ। ਪੰਜਾਬ ਦੇ ਪਿੰਡਾਂ ਵਿੱਚ ਕਬੱਡੀ, ਕੁਸ਼ਤੀ ਅਤੇ ਹਾਕੀ ਵਰਗੀਆਂ ਖੇਡਾਂ ਦੀ ਪੁਰਾਣੀ ਪਰੰਪਰਾ ਹੈ। ਖੇਡਾਂ ਨੌਜਵਾਨਾਂ ਨੂੰ ਨਸ਼ਿਆਂ ਤੋਂ ਦੂਰ ਰੱਖਣ ਦਾ ਵੀ ਇੱਕ ਵਧੀਆ ਸਾਧਨ ਹਨ। ਜੇਕਰ ਅਸੀਂ ਆਪਣੀ ਸਿਹਤ ਦਾ ਧਿਆਨ ਰੱਖਾਂਗੇ ਤਾਂ ਹੀ ਅਸੀਂ ਪਰਿਵਾਰ, ਸਮਾਜ ਅਤੇ ਦੇਸ਼ ਦੀ ਸੇਵਾ ਕਰ ਸਕਾਂਗੇ।`},
 {id:'language', t:'ਪੰਜਾਬੀ ਮਾਂ ਬੋਲੀ', en:'Punjabi, our mother tongue', x:`ਪੰਜਾਬੀ ਸਾਡੀ ਮਾਂ ਬੋਲੀ ਹੈ ਅਤੇ ਇਸ ਨੂੰ ਗੁਰਮੁਖੀ ਲਿਪੀ ਵਿੱਚ ਲਿਖਿਆ ਜਾਂਦਾ ਹੈ। ਗੁਰਮੁਖੀ ਲਿਪੀ ਦੇ ਵਿਕਾਸ ਵਿੱਚ ਸ੍ਰੀ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਦਾ ਵੱਡਾ ਯੋਗਦਾਨ ਹੈ। ਗੁਰਮੁਖੀ ਵਿੱਚ ਪੈਂਤੀ ਅੱਖਰ ਹਨ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਪੈਂਤੀ ਅੱਖਰੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਇਸ ਤੋਂ ਇਲਾਵਾ ਪੈਰ ਬਿੰਦੀ ਵਾਲੇ ਅੱਖਰ ਵੀ ਵਰਤੇ ਜਾਂਦੇ ਹਨ। ਲਗਾਂ ਮਾਤਰਾਂ ਦੀ ਗਿਣਤੀ ਦਸ ਹੈ ਅਤੇ ਬਿੰਦੀ, ਟਿੱਪੀ ਅਤੇ ਅੱਧਕ ਨੂੰ ਲਗਾਖਰ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਪੰਜਾਬ ਸਰਕਾਰ ਨੇ ਪੰਜਾਬੀ ਨੂੰ ਰਾਜ ਭਾਸ਼ਾ ਦਾ ਦਰਜਾ ਦਿੱਤਾ ਹੋਇਆ ਹੈ ਅਤੇ ਸਰਕਾਰੀ ਦਫ਼ਤਰਾਂ ਵਿੱਚ ਕੰਮਕਾਜ ਪੰਜਾਬੀ ਵਿੱਚ ਕਰਨਾ ਲਾਜ਼ਮੀ ਹੈ। ਬਾਬਾ ਫ਼ਰੀਦ ਜੀ, ਵਾਰਿਸ ਸ਼ਾਹ, ਬੁੱਲ੍ਹੇ ਸ਼ਾਹ, ਭਾਈ ਵੀਰ ਸਿੰਘ ਅਤੇ ਅੰਮ੍ਰਿਤਾ ਪ੍ਰੀਤਮ ਵਰਗੇ ਮਹਾਨ ਲੇਖਕਾਂ ਨੇ ਪੰਜਾਬੀ ਸਾਹਿਤ ਨੂੰ ਅਮੀਰ ਬਣਾਇਆ ਹੈ। ਅੱਜ ਪੰਜਾਬੀ ਦੁਨੀਆ ਦੀਆਂ ਸਭ ਤੋਂ ਵੱਧ ਬੋਲੀਆਂ ਜਾਣ ਵਾਲੀਆਂ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਹੈ। ਕੈਨੇਡਾ, ਇੰਗਲੈਂਡ ਅਤੇ ਆਸਟ੍ਰੇਲੀਆ ਵਰਗੇ ਦੇਸ਼ਾਂ ਵਿੱਚ ਵੀ ਪੰਜਾਬੀ ਬੋਲਣ ਵਾਲੇ ਲੱਖਾਂ ਲੋਕ ਰਹਿੰਦੇ ਹਨ। ਸਾਨੂੰ ਆਪਣੀ ਮਾਂ ਬੋਲੀ ਉੱਤੇ ਮਾਣ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ ਅਤੇ ਆਪਣੇ ਬੱਚਿਆਂ ਨੂੰ ਵੀ ਪੰਜਾਬੀ ਪੜ੍ਹਨੀ ਅਤੇ ਲਿਖਣੀ ਸਿਖਾਉਣੀ ਚਾਹੀਦੀ ਹੈ।`},
 {id:'sewa', t:'ਸੇਵਾ ਕੇਂਦਰ', en:'Sewa Kendras', x:`ਪੰਜਾਬ ਸਰਕਾਰ ਨੇ ਲੋਕਾਂ ਨੂੰ ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਇੱਕੋ ਛੱਤ ਹੇਠ ਦੇਣ ਲਈ ਸੂਬੇ ਭਰ ਵਿੱਚ ਸੇਵਾ ਕੇਂਦਰ ਖੋਲ੍ਹੇ ਹਨ। ਇਨ੍ਹਾਂ ਕੇਂਦਰਾਂ ਵਿੱਚ ਜਨਮ ਅਤੇ ਮੌਤ ਦੇ ਸਰਟੀਫਿਕੇਟ, ਰਿਹਾਇਸ਼ੀ ਸਰਟੀਫਿਕੇਟ, ਜਾਤੀ ਸਰਟੀਫਿਕੇਟ ਅਤੇ ਪੈਨਸ਼ਨ ਨਾਲ ਸਬੰਧਤ ਸੈਂਕੜੇ ਸੇਵਾਵਾਂ ਮਿਲਦੀਆਂ ਹਨ। ਪਹਿਲਾਂ ਲੋਕਾਂ ਨੂੰ ਇੱਕ ਕੰਮ ਲਈ ਕਈ ਦਫ਼ਤਰਾਂ ਦੇ ਚੱਕਰ ਕੱਟਣੇ ਪੈਂਦੇ ਸਨ, ਪਰ ਹੁਣ ਅਰਜ਼ੀ ਦੇਣ ਤੋਂ ਬਾਅਦ ਤੈਅ ਸਮੇਂ ਵਿੱਚ ਕੰਮ ਹੋ ਜਾਂਦਾ ਹੈ। ਅਰਜ਼ੀ ਦੀ ਸਥਿਤੀ ਮੋਬਾਈਲ ਫ਼ੋਨ ਉੱਤੇ ਸੁਨੇਹੇ ਰਾਹੀਂ ਵੀ ਦੱਸੀ ਜਾਂਦੀ ਹੈ। ਇਸ ਨਾਲ ਕੰਮ ਵਿੱਚ ਪਾਰਦਰਸ਼ਤਾ ਆਈ ਹੈ ਅਤੇ ਭ੍ਰਿਸ਼ਟਾਚਾਰ ਘਟਿਆ ਹੈ। ਸੇਵਾ ਕੇਂਦਰਾਂ ਵਿੱਚ ਕੰਮ ਕਰਨ ਵਾਲੇ ਕਰਮਚਾਰੀਆਂ ਲਈ ਕੰਪਿਊਟਰ ਅਤੇ ਪੰਜਾਬੀ ਟਾਈਪਿੰਗ ਦਾ ਗਿਆਨ ਜ਼ਰੂਰੀ ਹੈ। ਲੋਕਾਂ ਨੂੰ ਵੀ ਚਾਹੀਦਾ ਹੈ ਕਿ ਉਹ ਅਰਜ਼ੀ ਦੇਣ ਸਮੇਂ ਸਾਰੇ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ ਨਾਲ ਲੈ ਕੇ ਜਾਣ ਤਾਂ ਜੋ ਉਨ੍ਹਾਂ ਦਾ ਕੰਮ ਬਿਨਾਂ ਦੇਰੀ ਤੋਂ ਹੋ ਸਕੇ। ਡਿਜੀਟਲ ਸੇਵਾਵਾਂ ਨੇ ਆਮ ਆਦਮੀ ਦੀ ਜ਼ਿੰਦਗੀ ਨੂੰ ਸੌਖਾ ਬਣਾ ਦਿੱਤਾ ਹੈ।`}
];

// English passages for the second part of the exam test, in the plain official style of typing-test matter.
const ENG_PASSAGES = [
 {id:'en-egov', t:'E-governance in Punjab', x:`The Government of Punjab has taken several steps to bring public services closer to the people through e-governance. Citizens can now apply for certificates, pensions and licences online or at the nearest Sewa Kendra, and they can track the status of their applications without visiting a government office again and again. The use of computers in offices has reduced delays, improved record keeping and made the working of departments more transparent. Every clerk and data entry operator is expected to be comfortable with typing, file management and basic office software. For this reason a typing test is held for many posts after the written examination. A candidate who types with speed and accuracy can dispose of official work quickly and correctly. Regular practice, correct posture and the habit of reading a few words ahead are the keys to success in such a test. Candidates should also learn to proofread their work, because a single wrong figure in a letter or a notice can create confusion for the public and the department alike.`},
 {id:'en-water', t:'Conservation of groundwater', x:`Agriculture is the backbone of the economy of Punjab, and water is the backbone of agriculture. Over the last few decades the level of groundwater in most districts of the state has fallen sharply because of the heavy use of tube wells for paddy cultivation. Experts have warned that if the present trend continues, many blocks may face a serious shortage of drinking water in the coming years. The state government has encouraged farmers to adopt crop diversification, direct seeding of rice and drip irrigation to reduce the use of water. Farmers who delay the transplantation of paddy until the arrival of the monsoon also help in saving a large quantity of water. Every citizen has a duty to use water wisely. Simple habits such as closing taps after use, repairing leaking pipes and harvesting rainwater on rooftops can make a real difference. Schools and village panchayats can play an important role in spreading awareness about the need to protect this precious natural resource for future generations.`},
 {id:'en-office', t:'Duties of a clerk', x:`A clerk is an important link in the working of any government office. The clerk receives letters, diarises them, puts up files to senior officers and prepares draft replies for their approval. Accuracy and neatness are expected in every piece of work, because official correspondence becomes a permanent record of the department. The clerk must follow the rules regarding the movement of files, the maintenance of registers and the safe custody of documents. Confidential papers should never be left on the table or shared with unauthorised persons. With the introduction of computers, most letters and notings are now typed directly on the system, and many offices use electronic files instead of paper. A clerk who can type quickly in both Punjabi and English is therefore a valuable member of the staff. Politeness towards visitors, punctuality and a willingness to learn new methods of work are qualities that help an employee earn the trust of colleagues and of the public.`},
 {id:'en-health', t:'Health and fitness', x:`Good health is the greatest wealth a person can possess. A healthy body and a calm mind help us to work with energy and to face the challenges of daily life with confidence. In recent years the number of people suffering from diabetes, high blood pressure and heart disease has increased, mainly because of an inactive lifestyle and unhealthy food habits. Long hours in front of a computer or a mobile phone, lack of sleep and stress add to the problem. Doctors advise that every adult should take part in some form of physical activity for at least thirty minutes a day. A brisk walk in the morning, cycling, yoga or a game of football with friends can keep the body fit. A balanced diet that includes fresh fruit, green vegetables, pulses and milk products provides the nutrients the body needs. Drinking enough water and avoiding tobacco and alcohol are equally important. Small changes made today can prevent serious illness tomorrow.`},
 {id:'en-env', t:'Stubble burning and clean air', x:`Every year after the harvest of paddy, a thick layer of smoke covers large parts of north India. One of the main causes of this pollution is the burning of crop residue in the fields. Burning stubble may appear to be a quick and cheap way of preparing the land for the next crop, but it harms the soil, kills useful insects and releases harmful gases into the air. People with asthma, children and the elderly suffer the most when the quality of air becomes poor. The government provides machines such as the Happy Seeder and the Super Seeder on subsidy so that farmers can sow wheat without burning the residue. Paddy straw can also be used to produce bio gas, to make cardboard and as fuel in power plants. Awareness camps have been organised in villages to explain these alternatives. Clean air is the right of every citizen, and protecting it is a shared responsibility of farmers, industry, government and the general public.`},
 {id:'en-digital', t:'Digital literacy', x:`We live in a digital age in which computers and the internet have become a part of almost every activity. Banking, shopping, education, health care and even the payment of electricity bills can now be done online. Digital literacy means the ability to use these tools safely and effectively. A digitally literate person knows how to search for reliable information, fill online forms, send emails and protect personal data from fraud. Cyber criminals often trick people by sending fake messages that ask for a password or a one time password. Citizens must never share such details with anyone, even if the caller claims to be a bank officer. Schools and colleges have started courses to teach students the basics of computers, and many training centres offer typing and office software courses for job seekers. For candidates preparing for government jobs, skill in computer operation and typing is no longer optional. It is an essential qualification for a successful career.`},
 {id:'en-sports', t:'Punjab and sports', x:`Punjab has a proud tradition in sports and has given the country many outstanding players. Hockey has a special place in the hearts of the people, and players from the villages around Jalandhar have represented India in the Olympic Games for decades. Wrestling, kabaddi, athletics, shooting and cricket are also popular across the state. Rural sports festivals such as the Kila Raipur games attract visitors from many countries. Sports teach young people discipline, teamwork and the value of hard work. They also keep the youth away from bad habits and drugs. The state government has announced new policies to build stadiums, provide coaching and give cash awards and jobs to medal winners. Parents should encourage their children to take part in games along with their studies. A strong and healthy younger generation is the best investment any society can make for its future, and the playground is the place where that strength is built.`},
 {id:'en-rti', t:'Right to Information', x:`The Right to Information Act was passed by Parliament in the year 2005 to promote transparency and accountability in the working of every public authority. Under this Act any citizen of India can request information from a government office by submitting a simple application along with the prescribed fee. The office is required to provide the information within thirty days. If the applicant is not satisfied with the reply, an appeal can be filed with the first appellate authority and then with the State Information Commission. Each department has appointed a Public Information Officer to deal with such requests. The Act has helped citizens to know how public money is spent, why a decision was taken and what the status of their pending work is. At the same time, some information that affects the security of the country or the privacy of an individual is exempted from disclosure. Government employees must maintain their records properly so that information can be supplied correctly and on time.`}
];
