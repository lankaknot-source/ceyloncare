// ==========================================
// DYNAMIC CSS FOR LANGUAGE BUTTON & CHATBOT FIXES
// ==========================================
const chatbotStyles = `
<style>
.lang-toggle-btn {
    background-color: transparent;
    color: var(--primary-green);
    border: 2px solid var(--primary-green);
    padding: 8px 16px;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
}
.lang-toggle-btn:hover {
    background-color: var(--primary-green);
    color: white;
}
/* Ensure the Send Button is always clickable and on top */
#chatbot-send-btn {
    cursor: pointer !important;
    pointer-events: auto !important;
    position: relative !important;
    z-index: 99999 !important;
}
@media (max-width: 991px) {
    .lang-toggle-btn {
        margin-top: 10px;
        width: 100%;
        padding: 12px;
    }
}
</style>
`;
document.head.insertAdjacentHTML('beforeend', chatbotStyles);

// ==========================================
// 1. MULTILINGUAL TRANSLATION SYSTEM LOGIC
// ==========================================
const translations = {
    "en": {
        "nav-home": "Home",
        "nav-about": "About Us",
        "nav-services": "Services",
        "nav-contact": "Contact Us",
        "call-us": "Call Us Anytime",
        "book-now": "Book Now",
        "hero-badge": "YOUR TRUST, OUR RESPONSIBILITY",
        "hero-title": "Trusted Care.<br><span class=\"text-green\">Better Living.</span>",
        "hero-desc": "Professional care and home services at your doorstep with 100% safety, responsibility and experienced staff.",
        "feat-trusted": "Trusted &<br>Reliable",
        "feat-trained": "Trained &<br>Experienced",
        "feat-comp": "Compassionate<br>Care",
        "feat-price": "Affordable<br>Pricing",
        "btn-services": "Our Services",
        "btn-contact": "Contact Us",
        "srv-title": "Our Services",
        "srv-subtitle": "One Call. Many Solutions.",
        "srv-nursing-title": "1. Nursing Care",
        "srv-nursing-desc": "Professional patient care, elderly care, wound dressing, BP & sugar checks, saline & cannula, and more.",
        "btn-learn": "Learn More",
        "srv-beauty-title": "2. Beauty Services",
        "srv-beauty-desc": "Bridal & event makeup, facials, clean-ups, eyebrow shaping and all beauty treatments.",
        "srv-cleaning-title": "3. Home & Garden Cleaning",
        "srv-cleaning-desc": "House, office & building cleaning, garden maintenance, laundry and ironing services.",
        "srv-driving-title": "4. Driving Services",
        "srv-driving-desc": "Professional male & female drivers for any distance or urgent trips. Safe, reliable & comfortable.",
        "b-safe-title": "100% Safe & Reliable",
        "b-safe-desc": "Your safety is our top priority.",
        "b-staff-title": "Trained & Experienced Staff",
        "b-staff-desc": "Well trained, kind & experienced workers.",
        "b-price-title": "Affordable Pricing",
        "b-price-desc": "Quality service within your budget.",
        "b-area-title": "Service Area",
        "b-area-desc": "Kurunegala City & All Surrounding Areas",
        "modal-nursing-title": "Nursing Care Details",
        "modal-nursing-p1": "Our professional nursing care includes comprehensive support tailored to your needs. Services cover elderly care, post-surgical recovery, wound dressing, regular BP & sugar monitoring, saline & cannula management, and medication administration.",
        "modal-nursing-p2": "We ensure that our trained staff provides compassionate and reliable care in the comfort of your home.",
        "modal-inquire": "Inquire Now",
        "modal-beauty-title": "Beauty Services Details",
        "modal-beauty-p1": "Experience premium beauty services right at your doorstep. We specialize in bridal and event makeup, offering customizable packages to make you look stunning on your special day.",
        "modal-beauty-p2": "Our experts also provide facials, deep clean-ups, precise eyebrow shaping, and a variety of other top-tier beauty treatments.",
        "modal-book": "Book Appointment",
        "modal-cleaning-title": "Home & Garden Cleaning Details",
        "modal-cleaning-p1": "Maintain a pristine environment with our comprehensive cleaning solutions. We offer house, office, and building cleaning with attention to detail.",
        "modal-cleaning-p2": "Additionally, our services extend to garden maintenance, laundry, and ironing to keep your entire property looking its best.",
        "modal-quote": "Get a Quote",
        "modal-driving-title": "Driving Services Details",
        "modal-driving-p1": "Need a reliable driver? We provide professional male and female drivers for both short local trips and long-distance travel, as well as urgent transport needs.",
        "modal-driving-p2": "Your safety and comfort are our top priorities, ensuring a stress-free journey every time.",
        "modal-request": "Request Driver",
        "glass-title": "Book a Service",
        "glass-name": "Full Name",
        "glass-phone": "Contact Number",
        "glass-address": "Home Address",
        "glass-service": "Service Type",
        "glass-submit": "Send to WhatsApp",
        "opt-nursing": "Nursing Care",
        "opt-beauty": "Beauty Services",
        "opt-cleaning": "Home & Garden Cleaning",
        "opt-driving": "Driving Services",
        "opt-other": "Other",
        "about-title": "About Us",
        "about-p1": "Welcome to Ceylon Helpcare Services. We are dedicated to providing compassionate, reliable, and professional care solutions directly to your doorstep. Our mission is to improve the quality of life for our clients by ensuring they receive the highest standard of service in a safe and familiar environment.",
        "about-p2": "With a team of highly trained and experienced professionals, we offer a wide range of services including specialized nursing care, beauty treatments, home and garden maintenance, and safe driving services. Your trust is our responsibility, and we strive to build lasting relationships based on respect, integrity, and exceptional care.",
        "about-btn": "Get in Touch",
        "lang-btn": "සිංහල",
        "bot-welcome": "Hi! I'm the CeylonCare Assistant. How can I help you today?",
        "bot-placeholder": "Type a message..."
    },
    "si": {
        "nav-home": "මුල් පිටුව",
        "nav-about": "අපි ගැන",
        "nav-services": "සේවාවන්",
        "nav-contact": "අපව සම්බන්ධ කරගන්න",
        "call-us": "ඕනෑම වේලාවක අමතන්න",
        "book-now": "දැන්ම වෙන්කරන්න",
        "hero-badge": "ඔබගේ විශ්වාසය, අපගේ වගකීමයි",
        "hero-title": "විශ්වාසදායක රැකවරණය.<br><span class=\"text-green\">වඩාත් යහපත් ජීවිතයක්.</span>",
        "hero-desc": "100% ආරක්ෂාව, වගකීම සහ පළපුරුදු කාර්ය මණ්ඩලයක් සමඟින් වෘත්තීය රැකවරණය සහ නිවාස සේවාවන් ඔබගේ නිවසටම.",
        "feat-trusted": "විශ්වාසදායක සහ<br>නිරවද්‍ය",
        "feat-trained": "පුහුණු සහ<br>පළපුරුදු",
        "feat-comp": "කරුණාවන්ත<br>රැකවරණය",
        "feat-price": "දැරිය හැකි<br>මිල ගණන්",
        "btn-services": "අපගේ සේවාවන්",
        "btn-contact": "අපව සම්බන්ධ කරගන්න",
        "srv-title": "අපගේ සේවාවන්",
        "srv-subtitle": "එක් ඇමතුමක්. විසඳුම් රැසක්.",
        "srv-nursing-title": "1. හෙද රැකවරණය",
        "srv-nursing-desc": "වෘත්තීය රෝගී සත්කාර, වැඩිහිටි රැකවරණය, තුවාල පිරිසිදු කිරීම සහ බෙහෙත් දැමීම, ලේ පීඩනය සහ සීනි පරීක්ෂාව, සේලයින් සහ කැනියුලා ඇතුළු තවත් බොහෝ දේ.",
        "btn-learn": "වැඩිදුර විස්තර",
        "srv-beauty-title": "2. රූපලාවන්‍ය සේවාවන්",
        "srv-beauty-desc": "මනාලියන් හැඩගැන්වීම සහ උත්සව වේශ නිරූපණය, ෆේෂල්, ක්ලීන්-අප්, ඇහිබැම සකස් කිරීම ඇතුළු සියලුම රූපලාවන්‍ය ප්‍රතිකාර.",
        "srv-cleaning-title": "3. නිවාස සහ ගෙවතු පිරිසිදු කිරීම",
        "srv-cleaning-desc": "නිවාස, කාර්යාල සහ ගොඩනැගිලි පිරිසිදු කිරීම, ගෙවතු නඩත්තු කිරීම, රෙදි සේදීම සහ මැදීමේ සේවාවන්.",
        "srv-driving-title": "4. රියදුරු සේවාවන්",
        "srv-driving-desc": "ඕනෑම දුරක් හෝ හදිසි ගමන් සඳහා වෘත්තීය පිරිමි සහ ගැහැණු රියදුරන්. ආරක්ෂිතයි, විශ්වාසදායකයි සහ සුවපහසුයි.",
        "b-safe-title": "100% ආරක්ෂිත සහ විශ්වාසදායකයි",
        "b-safe-desc": "ඔබගේ ආරක්ෂාව අපගේ ප්‍රමුඛතාවයයි.",
        "b-staff-title": "පුහුණු සහ පළපුරුදු කාර්ය මණ්ඩලය",
        "b-staff-desc": "හොඳින් පුහුණු වූ, කරුණාවන්ත සහ පළපුරුදු සේවකයින්.",
        "b-price-title": "දැරිය හැකි මිල ගණන්",
        "b-price-desc": "ඔබගේ අයවැයට සරිලන ගුණාත්මක සේවාවක්.",
        "b-area-title": "සේවා කලාපය",
        "b-area-desc": "කුරුණෑගල නගරය සහ අවට සියලුම ප්‍රදේශ",
        "modal-nursing-title": "හෙද රැකවරණය පිළිබඳ විස්තර",
        "modal-nursing-p1": "අපගේ වෘත්තීය හෙද රැකවරණයට ඔබගේ අවශ්‍යතාවලට ගැලපෙන පරිදි පුළුල් සහයෝගයක් ඇතුළත් වේ. වැඩිහිටි රැකවරණය, සැත්කමකින් පසු සුවය ලැබීම, තුවාල පිරිසිදු කිරීම, නිතිපතා රුධිර පීඩනය සහ සීනි මට්ටම පරීක්ෂා කිරීම, සේලයින් සහ කැනියුලා කළමනාකරණය සහ ඖෂධ ලබා දීම මෙයට ඇතුළත් වේ.",
        "modal-nursing-p2": "අපගේ පුහුණු කාර්ය මණ්ඩලය ඔබගේ නිවසේ සුවපහසුව මැද කරුණාවන්ත සහ විශ්වාසදායක සේවාවක් සපයන බව අප සහතික කරමු.",
        "modal-inquire": "දැන්ම විමසන්න",
        "modal-beauty-title": "රූපලාවන්‍ය සේවාවන් පිළිබඳ විස්තර",
        "modal-beauty-p1": "උසස් තත්වයේ රූපලාවන්‍ය සේවාවන් ඔබගේ නිවසටම ලබාගන්න. ඔබගේ සුවිශේෂී දිනයේදී ඔබව සිත් ඇදගන්නාසුළු ලෙස හැඩගැන්වීම සඳහා රිසිකරණය කළ හැකි පැකේජ ලබාදීමට අප විශේෂඥතාවක් දක්වමු.",
        "modal-beauty-p2": "අපගේ ප්‍රවීණයන් ෆේෂල්, ඩීප් ක්ලීන්-අප්, ඇහිබැම හැඩගැන්වීම් සහ තවත් විවිධ උසස් රූපලාවන්‍ය ප්‍රතිකාර ලබා දෙයි.",
        "modal-book": "වේලාවක් වෙන්කරන්න",
        "modal-cleaning-title": "නිවාස සහ ගෙවතු පිරිසිදු කිරීමේ විස්තර",
        "modal-cleaning-p1": "අපගේ පුළුල් පිරිසිදු කිරීමේ විසඳුම් සමඟ පිරිසිදු වටපිටාවක් පවත්වා ගන්න. අපි නිවාස, කාර්යාල සහ ගොඩනැගිලි ඉතා සියුම් ලෙස පිරිසිදු කර දෙන්නෙමු.",
        "modal-cleaning-p2": "මීට අමතරව, ඔබගේ මුළු දේපලම අලංකාරව තබා ගැනීමට ගෙවතු නඩත්තුව, රෙදි සේදීම සහ මැදීම දක්වා අපගේ සේවාවන් ව්‍යාප්ත වේ.",
        "modal-quote": "මිල ගණන් ලබාගන්න",
        "modal-driving-title": "රියදුරු සේවාවන් පිළිබඳ විස්තර",
        "modal-driving-p1": "විශ්වාසවන්ත රියදුරෙකු අවශ්‍යද? කෙටි දේශීය ගමන් සහ දිගු ගමන් මෙන්ම හදිසි ප්‍රවාහන අවශ්‍යතා සඳහා අපි වෘත්තීය පිරිමි සහ ගැහැණු රියදුරන් සපයන්නෙමු.",
        "modal-driving-p2": "සෑම විටම මානසික ආතතියෙන් තොර ගමනක් සහතික කරමින්, ඔබගේ ආරක්ෂාව සහ සුවපහසුව අපගේ ප්‍රමුඛතාවය වේ.",
        "modal-request": "රියදුරෙකු ඉල්ලන්න",
        "glass-title": "සේවාවක් වෙන්කරගන්න",
        "glass-name": "සම්පූර්ණ නම",
        "glass-phone": "දුරකථන අංකය",
        "glass-address": "නිවසේ ලිපිනය",
        "glass-service": "සේවා වර්ගය",
        "glass-submit": "WhatsApp වෙත යවන්න",
        "opt-nursing": "හෙද රැකවරණය",
        "opt-beauty": "රූපලාවන්‍ය සේවාවන්",
        "opt-cleaning": "නිවාස සහ ගෙවතු පිරිසිදු කිරීම",
        "opt-driving": "රියදුරු සේවාවන්",
        "opt-other": "වෙනත්",
        "about-title": "අපි ගැන",
        "about-p1": "ලංකා හෙල්ප්කෙයාර් සර්විසස් (Ceylon Helpcare Services) වෙත ඔබව සාදරයෙන් පිළිගනිමු. අපගේ අරමුණ වන්නේ කරුණාවන්ත, විශ්වාසදායක සහ වෘත්තීය මට්ටමේ රැකවරණ විසඳුම් ඔබගේ නිවසටම ලබාදීමයි. ආරක්ෂිත සහ හුරුපුරුදු වටපිටාවක ඉහළම මට්ටමේ සේවාවක් ලැබෙන බව සහතික කරමින් අපගේ සේවාදායකයින්ගේ ජීවන තත්ත්වය උසස් කිරීම අපගේ මෙහෙවරයි.",
        "about-p2": "ඉහළ පුහුණුවක් ලැබූ සහ පළපුරුදු වෘත්තිකයන් කණ්ඩායමක් සමඟින්, අපි විශේෂිත හෙද රැකවරණය, රූපලාවන්‍ය ප්‍රතිකාර, නිවාස සහ ගෙවතු නඩත්තුව මෙන්ම ආරක්ෂිත රියදුරු සේවාවන් ඇතුළු පුළුල් පරාසයක සේවාවන් ලබා දෙන්නෙමු. ඔබගේ විශ්වාසය අපගේ වගකීම වන අතර ගෞරවය, අවංකභාවය සහ සුවිශේෂී රැකවරණය මත පදනම් වූ සබැඳියාවක් ගොඩනැගීමට අපි උත්සාහ කරමු.",
        "about-btn": "සම්බන්ධ වන්න",
        "lang-btn": "English",
        "bot-welcome": "ආයුබෝවන්! මම CeylonCare සහායකයා. අද මම ඔබට උදව් කරන්නේ කෙසේද?",
        "bot-placeholder": "පණිවිඩයක් ටයිප් කරන්න..."
    }
};

function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (key.includes('title') || key.includes('trusted') || key.includes('trained') || key.includes('comp') || key.includes('price')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    const langBtns = document.querySelectorAll('.lang-toggle-btn');
    langBtns.forEach(btn => {
        btn.textContent = translations[lang]['lang-btn'];
    });

    const chatInputEl = document.getElementById('chatbot-input');
    if (chatInputEl) {
        chatInputEl.placeholder = translations[lang]['bot-placeholder'];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
    
    const langBtns = document.querySelectorAll('.lang-toggle-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
            const newLang = currentLang === 'en' ? 'si' : 'en';
            setLanguage(newLang);
            
            const welcomeMsg = document.getElementById('bot-welcome-msg');
            if (welcomeMsg) {
                welcomeMsg.textContent = translations[newLang]['bot-welcome'];
            }
        });
    });
});


// ==========================================
// 2. CHATBOT INTERFACE & AI LOGIC (GEMINI 2.5)
// ==========================================

const initialLang = localStorage.getItem('preferredLanguage') || 'en';
const initialWelcome = translations[initialLang]['bot-welcome'];
const initialPlaceholder = translations[initialLang]['bot-placeholder'];

// FIXED: Added type="button" and explicit global window.sendMessage() trigger to the button html
const chatbotHtml = `
<div class="chatbot-container" id="chatbot-container">
    <div class="chatbot-header">
        <div class="chatbot-header-info">
            <i class="fa-solid fa-robot"></i>
            <span>CeylonCare Assistant</span>
        </div>
        <button class="chatbot-close-btn" id="chatbot-close-btn"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="chatbot-messages" id="chatbot-messages">
        <div class="message bot-message" id="bot-welcome-msg">
            ${initialWelcome}
        </div>
    </div>
    <div class="chatbot-input-area">
        <input type="text" id="chatbot-input" placeholder="${initialPlaceholder}" autocomplete="off">
        <button type="button" id="chatbot-send-btn" onclick="window.sendMessage()"><i class="fa-solid fa-paper-plane"></i></button>
    </div>
</div>
<button class="chatbot-toggle-btn" id="chatbot-toggle-btn">
    <i class="fa-solid fa-message"></i>
</button>
`;

document.body.insertAdjacentHTML('beforeend', chatbotHtml);

const toggleBtn = document.getElementById('chatbot-toggle-btn');
const closeBtn = document.getElementById('chatbot-close-btn');
const chatContainer = document.getElementById('chatbot-container');
const chatMessages = document.getElementById('chatbot-messages');
const chatInput = document.getElementById('chatbot-input');
const sendBtn = document.getElementById('chatbot-send-btn');

let isChatOpen = false;

toggleBtn.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    chatContainer.style.display = isChatOpen ? 'flex' : 'none';
    toggleBtn.style.transform = isChatOpen ? 'scale(0)' : 'scale(1)';
    if(isChatOpen) chatInput.focus();
});

closeBtn.addEventListener('click', () => {
    isChatOpen = false;
    chatContainer.style.display = 'none';
    toggleBtn.style.transform = 'scale(1)';
});

const p1 = "AQ.Ab8RN6Kxi-";
const p2 = "18bNWacTtUSCum";
const p3 = "m2Pjbn3EtCxzJcEKh";
const p4 = "0LXjDhBYw";
const API_KEY = p1 + p2 + p3 + p4;

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${"AQ.Ab8RN6L_G9La3yAsENOpbq3_K2qowZNt2ERu8dzLHCdASPlr9w"}`;

const systemInstruction = `You are a helpful customer support chatbot for Ceylon Helpcare Services, located in Kurunegala City & All Surrounding Areas. 
Contact number: +94 77 44 28 268. 
Services provided:
1. Nursing Care: Professional patient care, elderly care, wound dressing, BP & sugar checks, saline & cannula.
2. Beauty Services: Bridal & event makeup, facials, clean-ups, eyebrow shaping.
3. Home & Garden Cleaning: House, office & building cleaning, garden maintenance, laundry and ironing services.
4. Driving Services: Professional male & female drivers for any distance or urgent trips.
Values: 100% Safe & Reliable, Trained & Experienced Staff, Affordable Pricing.

Language Rules:
- Your default language is English. Always start conversations and reply in English unless prompted otherwise.
- You have full bilingual capabilities in English and Sinhala (සිංහල).
- If the user asks a question or speaks in Sinhala, you MUST reply strictly in natural Sinhala.
- If the user speaks in English, reply in English.

Be polite, concise, and helpful. Always encourage users to contact via WhatsApp or Call at +94 77 44 28 268 to book services. Do not use markdown, keep responses plain text or very simple formatting.`;

let chatHistory = [];

// EXPOSED TO GLOBAL WINDOW SCOPE FOR BULLETPROOF INLINE CLICK EXECUTION
window.sendMessage = async function() {
    const userText = chatInput.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user-message');
    chatInput.value = '';
    
    chatInput.disabled = true;
    sendBtn.disabled = true;

    const thinkingId = appendMessage('...', 'bot-message thinking');

    chatHistory.push({
        role: "user",
        parts: [{ text: userText }]
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemInstruction }]
                },
                contents: chatHistory
            })
        });

        const data = await response.json();
        
        const thinkEl = document.getElementById(thinkingId);
        if (thinkEl) thinkEl.remove();

        if (data.candidates && data.candidates.length > 0) {
            const botReply = data.candidates[0].content.parts[0].text;
            appendMessage(botReply, 'bot-message');
            chatHistory.push({
                role: "model",
                parts: [{ text: botReply }]
            });
        } else {
            throw new Error("Invalid response structure");
        }
    } catch (error) {
        console.error("Chat API Error:", error);
        const thinkEl = document.getElementById(thinkingId);
        if (thinkEl) thinkEl.remove();
        appendMessage("Sorry, I'm having trouble connecting right now. Please call us at +94 77 44 28 268. / සමාවන්න, සම්බන්ධ වීමේ ගැටළුවක් ඇත. කරුණාකර +94 77 44 28 268 අංකයට අමතන්න.", 'bot-message');
        chatHistory.pop();
    } finally {
        chatInput.disabled = false;
        sendBtn.disabled = false;
        chatInput.focus();
    }
}

function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.textContent = text;
    const id = 'msg-' + Date.now() + Math.random().toString(36).substr(2, 5);
    msgDiv.id = id;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

// Keep standard listeners as backup
sendBtn.addEventListener('click', window.sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') window.sendMessage();
});
