// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron');
var tumblr = require('tumblr.js');

const $ = selector => document.querySelector(selector);

const $btnSubmit = $("#btnsubmit");

$btnSubmit.addEventListener('click', () => {

    const tbGurmukhiWord = $("#gurmukhiword");
    const tbRomanWord = $("#romanword");
    const tbEnglishWord = $("#englishword");
    const tbTumblrPost = $("#tumblrpost");
    const tbSourceUrl = $("#sourceurl");
    const tweet = $("#tweet").checked ? "on" : "off";


    tumblr_post(tbGurmukhiWord.value
            , tbRomanWord.value
            , tbEnglishWord.value
            , tbTumblrPost.value
            , tbSourceUrl.value
            , tweet
        );


});

function sentenceCase (str) {
    if ((str===null) || (str===''))
         return false;
    else
     str = str.toString();
  
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function tumblr_post(_gurmukhiWord, _romanWord, _translatedWord, _tuk, _srcUrl, _tweet){

    var _tags = _gurmukhiWord + "," + _romanWord + "," + _translatedWord + ",sggs,sikh,sikhi,sikhism,gurbani,gurmukhi,wordoftheday,Word of the day, wotd,punjab,punjabi,panjab,panjabi";

    //var panjabi_word = 'ਟੋਲਿ';
    //var roman_word = 'Tol';
    //var translated_word = 'Search';


    let _translatedWordHeading = "<strong>" + sentenceCase(_translatedWord) + "</strong><br /><br />"; 



    let tukPost = _translatedWordHeading + _tuk.replace(new RegExp('\r?\n','g'), '<br />')
                                                .replace(_gurmukhiWord, "<strong>" + _gurmukhiWord + "</strong>")
                                                .replace(_romanWord, "<strong>" + _romanWord + "</strong>")
                                                .replace(_translatedWord, "<strong>" + _translatedWord + "</strong>");
    
    let postTitle = sentenceCase(_romanWord + ' ' + _gurmukhiWord);

    let client = tumblr.createClient(
        {
            credentials:{
                consumer_key: 'LQd0h4w5Dav8BUsWZ3rNGeHA7EgmGZ2jRLy7by1Pd4n4EZlYTU',
                consumer_secret: 'P0avKNIybrmA7tSL2ZdSjpYOwvjwxEeICDBF2Ki3lb7e4qUQtE',
                token: 'i7mmEyNVIDL8JABP2hjzpfRTDuOoByWCDvQH8FdzUr5FA9gY2C',
                token_secret: 'UvMzQmdS7aBHW0qANmYtHcSpEO2J2NTYc7DrK4crTeh720HJT2'
        }
        , returnPromises: true});

        console.log(postTitle + " " + tukPost); 

    client.createTextPost('gurbaniwordoftheday.tumblr.com'
                            , {source:'https://sikhitothemax.org', 
                                tags: _tags, source_url: _srcUrl,
                                tweet: _tweet, title: postTitle, body: tukPost})
                            .then(function(res) {console.log('Done:' + res)})
                            .catch(function(err){console.log('Error:')});
}