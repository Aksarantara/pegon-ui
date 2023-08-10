type Baybayin = [string,  string]

const BaseCases : Baybayin[] = [
    ["ka" , "\u1703"],
    ["ga" , "\u1704"],
    ["nga" , "\u1705"],
    ["ta" , "\u1706"],
    ["da" , "\u1707"],
    ["na" , "\u1708"],
    ["pa" , "\u1709"],
    ["ba" , "\u170A"],
    ["ma" , "\u170B"],
    ["ya" , "\u170C"],
    ["ra" , "\u170D"],
    ["la" , "\u170E"],
    ["wa" , "\u170F"],
    ["sa" , "\u1710"],
    ["ha" , "\u1711"],
]

const SyllabelsRumBaybayin: Baybayin[] = BaseCases.flatMap(([a, b]) => {
    const vowel_a = a;
    const vowel_i = a.slice(0, -1) + "i";
    const vowel_u = a.slice(0, -1) + "u";

    const uncod_a = b;
    const uncod_i = b + "\u1712";
    const uncod_u = b + "\u1713";

    return [
        [vowel_i, uncod_i],
        [vowel_u, uncod_u],
        [vowel_a, uncod_a],
    ];
});

const ConsonantsRumBaybayin: Baybayin[] = BaseCases.map(([a, b]) => {
    const consonant = a.slice(0, -1);
    const uncod = b + "\u1714";
    return [consonant, uncod];
});

const VowelsRumBaybayin: Baybayin[] = [
    ["a" , "\u1700"],
    ["i" , "\u1701"],
    ["u" , "\u1702"],
]

const SingleRumBaybayin: Baybayin[] = [...ConsonantsRumBaybayin, ...VowelsRumBaybayin];


const SyllabelsBaybayinRum: Baybayin[] = SyllabelsRumBaybayin.map(([a, b]) => {
    return [b, a];
});

const SingleBaybayinRum: Baybayin[] = SingleRumBaybayin.map(([a, b]) => {
    return [b, a];
});


function transliterate(stringToTranslate: string, translationMap: Baybayin[]): 
    string {
        let translatedString: string = translationMap.reduce<string>((acc, [key, val]) => acc.replace(new RegExp(key, 'gi'), val),
        stringToTranslate.slice()
    )
    return translatedString;
}


function chainTransliterate(inputString: string, transliterationRules: Baybayin[][]):
    string {
        let outputString = transliterationRules.reduce<string>(
        (acc, rule) => transliterate(acc, rule),
        inputString.slice()
    )
    return outputString;
}

export function transliterateLatinToBaybayin(latinString: string): 
    string {
    let firstLetter = transliterate(latinString.charAt(0), SyllabelsRumBaybayin);
    return "\u200E".concat(
        chainTransliterate(firstLetter.concat(latinString.slice(1)),
                           [SyllabelsRumBaybayin, SingleRumBaybayin]));
}

export function transliterateBaybayinToLatin(latinString: string): 
    string {
    let firstLetter = transliterate(latinString.charAt(0), SyllabelsBaybayinRum);
    return "\u200E".concat(
        chainTransliterate(firstLetter.concat(latinString.slice(1)),
                           [SyllabelsBaybayinRum, SingleBaybayinRum]));
}