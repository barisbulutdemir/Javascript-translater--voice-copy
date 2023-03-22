const fromLang = document.querySelector(".from-lang");
const toLang = document.querySelector(".to-lang");
const btnTranslate = document.querySelector('.btnTranslate');
const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');
const exchange = document.querySelector('.exchange');
const icons = document.querySelectorAll('.icons')


 // for döngüsü ile languages.js nin içinde geziyoruz
for (let lang in languages) {
    
    let option = `<option value="${lang}">${languages[lang]}</option>`;
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);


    // başlangıç değerlerini veriyoruzz
    fromLang.value = "tr-TR";
    toLang.value = "en-GB";

}

btnTranslate.addEventListener('click', () => {
    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;

    const url = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;

        });

} );


 // exchange butonu ile birbiri içinde değişim yaptırıyoruz. 


exchange.addEventListener('click', () => {

    // from text in değerini to text e eşitleyip to texinkini from text e eşitliyoruz.
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    // Aynı şekil burda da çevrilecek dili değiştiriyoruz.
    let lang = fromLang.value;
    fromLang.value = toLang.value
    toLang.value = lang
})


// 4 adet icon var ve her icona ayrı ayrı ulaşmak yerine tek fonsiyonda topluyoruz.

for ( let icon of icons ) {
    // For döngüsü ile iconlar arasında gezip
    icon.addEventListener('click' , (element) => {
        // classList in içindeki değere göre neyi contains ediyorsa onu göre if yapısı kuruyoruz
        if(element.target.classList.contains("fa-copy")) {
            if(element.target.id == "from") {
                navigator.clipboard.writeText(fromText.value);

             }
            else {
                navigator.clipboard.writeText(toText.value);
            }
            
        } else {

            // Seslendirme için
            let utterance;
            if (element.target.id == "from") { 
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            }
                else {
                    utterance = new SpeechSynthesisUtterance(toText.value);
                    utterance.lang = toLang.value;


                }
                speechSynthesis.speak(utterance);
            }   
    });
}
