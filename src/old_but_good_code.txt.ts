this.declinationList = this.declinationList.filter(word => {
  let noSingular = word.nominativSingular === '/' || word.nominativSingular === '';
  let noPlural = word.nominativPlural.length < 4;
  let noTranslation = this.existTranslationForWord(word.nominativSingular) === false;
  return (!noSingular && !noPlural && !noTranslation);
});
this.declinationList = this.declinationList.filter(word => {
  let translationHaveNoDeclination = this.existDeclinationForTranslation(word.nominativSingular) === false;
  return (!translationHaveNoDeclination);
});
this.declinationList = this.declinationList.filter(word => {
  let wordExistMoreThanOnce = this.wordExistOnlyOnce(word.nominativSingular) === false;
  return (!wordExistMoreThanOnce);
});


private existTranslationForWord(word: string): boolean {
  let translation = this.getTranslationForWord(word);
  return translation.length > 0;
}

  private existDeclinationForTranslation(word: string): boolean {
  let translation = this.getTranslationForWord(word);
  let declinationExist: boolean = this.declinationList.map(word => word.nominativSingular).indexOf(translation) > -1;
  return declinationExist;
}

  private getTranslationForWord(word: string): string {
  let translation = "";
  this.database.map(chapter => {
    chapter.vocables.map(vocable => {
      if (vocable.croatian === word) {
        translation = vocable.german;
      }
      if (vocable.german === word) {
        translation = vocable.croatian;
      }
    })
  });
  return translation;
}

  private wordExistOnlyOnce(word: string): boolean {
  let howManyTimesWordExistInDeclinationList =
    this.declinationList
      .filter(item => {
        return (item.nominativSingular === word);
      })
      .length;
  let wordExistOnlyOnce = howManyTimesWordExistInDeclinationList === 1;
  return wordExistOnlyOnce;
}