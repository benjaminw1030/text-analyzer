// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

function removeNumPunct(text) {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~1234567890()@]/g,"");
}

function removeOffensive(text) {
  function censor(word) {
    return word !== "zoinks" || word !== "muppeteer" || word !== "biffaroni" || word !== "loopdaloop"
  }
  text.split(" ");
  text.filter(censor);
  text.join(" ");

}

// Business Logic

function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function (element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function numberOfOccurrencesInText(word, text) {
  if (noInputtedWord(word, text)) {
    return 0;
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function (element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function mostUsedWords(text) {
  const wordArray = text.trim().toLowerCase().split(" ");
  const uniqueArray = [];
  if (text.trim().length === 0) {
    return 0;
  }
  wordArray.forEach(function (element) {
    if (!uniqueArray.includes(element)) {
      uniqueArray.push(element);
    }
  });
  uniqueArray.sort((a, b) => {
    return numberOfOccurrencesInText(b, text) - numberOfOccurrencesInText(a, text)
  });
  return uniqueArray.slice(0, 3);
}

// UI Logic

function boldPassage(word, text) {
  if (noInputtedWord(word, text)) {
    return "";
  }
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function (element, index) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    if (index !== (textArray.length - 1)) {
      htmlString = htmlString.concat(" ");
    }
  });
  return htmlString + "</p>";
}

$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    const mostUsed = mostUsedWords(passage);
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldPassage(word, passage));
    if (mostUsed === 0) {
      $("#most-used").hide();
      $("#error").show();
    } else {
      mostUsed.forEach(function (word, index) {
        $("#common-word-" + index + "").html(word);
        $("#common-count-" + index + "").html(numberOfOccurrencesInText(word, passage));
      });
      $("#most-used").show();
      $("#error").hide();
    }
    console.log(removePunctuation(passage));
  });
});