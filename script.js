document.addEventListener('DOMContentLoaded', () => {
    const polishInput = document.getElementById('polishInput');
    const ukrainianOutput = document.getElementById('ukrainianOutput');

    // Словник правил транскрипції.
    // Ключі відсортовані за довжиною (від найдовших до найкоротших),
    // щоб 'szcz' замінилось раніше, ніж 'sz' або 'cz'.
    const transcriptionRules = {
        // Триграфи
        'szcz': 'щ',

        // Діграфи з 'i' + голосна
        'dzia': 'джя',
        'dzie': 'джє',
        'dzio': 'джьо',
        'dziu': 'джю',
        'cia': 'чя',
        'cie': 'чє',
        'cio': 'чьо',
        'ciu': 'чю',
        'sia': 'ся',
        'sie': 'сє',
        'sio': 'сьо',
        'siu': 'сю',
        'zia': 'жя',
        'zie': 'жє',
        'zio': 'жьо',
        'ziu': 'жю',
        'nia': 'ня',
        'nie': 'нє',
        'nio': 'ньо',
        'niu': 'ню',
        
        // 'j' + голосна
        'ja': 'я',
        'je': 'є',
        'jo': 'йо',
        'ju': 'ю',

        // Стандартні діграфи
        'ch': 'х',
        'cz': 'ч',
        'dz': 'дз',
        'dź': 'джь',
        'rz': 'ж',
        'sz': 'ш',

        // Літери з діакритикою
        'ą': 'он', // 'он' або 'ом'
        'ę': 'ен', // 'ен' або 'ем' (крім кінця слова)
        'ó': 'у',
        'ć': 'чь',
        'ń': 'нь',
        'ś': 'шь',
        'ź': 'жь',
        'ż': 'ж',
        'ł': 'в',

        // Прості літери
        'a': 'а',
        'b': 'б',
        'c': 'ц',
        'd': 'д',
        'e': 'е',
        'f': 'ф',
        'g': 'ґ',
        'h': 'х',
        'i': 'і',
        'j': 'й', // 'j' що не стоїть перед голосною
        'k': 'к',
        'l': 'л',
        'm': 'м',
        'n': 'н',
        'o': 'о',
        'p': 'п',
        'r': 'р',
        's': 'с',
        't': 'т',
        'u': 'у',
        'w': 'в',
        'y': 'и',
        'z': 'з'
    };

    // Створюємо один великий RegExp з усіх ключів, відсортованих за довжиною
    const sortedKeys = Object.keys(transcriptionRules).sort((a, b) => b.length - a.length);
    // Екрануємо спеціальні символи, якщо вони є (хоча тут їх немає)
    const escapedKeys = sortedKeys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(escapedKeys.join('|'), 'g');

    function transcribe(text) {
        // Переводимо все в нижній регістр для спрощення правил
        let result = text.toLowerCase();

        // --- Обробка особливих випадків ---
        // 1. 'ę' в кінці слова читається як 'е'
        // (шукаємо 'ę', за яким іде пробіл або кінець рядка)
        result = result.replace(/ę(?=\s|$)/g, 'е');

        // 2. 'ą' та 'ę' перед 'l' або 'ł'
        // (Приклад: wziął -> взйов/взіов). Це спрощена імітація.
        // 'wziął' за правилами дасть 'взіов'
        result = result.replace(/ąl/g, 'ол');
        result = result.replace(/ął/g, 'ов');
        result = result.replace(/ęl/g, 'ел');
        result = result.replace(/ęł/g, 'ев');
        
        // --- Застосування основних правил ---
        result = result.replace(regex, (match) => {
            return transcriptionRules[match];
        });

        return result;
    }

    // Обробник події 'input'
    polishInput.addEventListener('input', () => {
        const inputText = polishInput.value;
        const outputText = transcribe(inputText);
        ukrainianOutput.value = outputText;
    });
});