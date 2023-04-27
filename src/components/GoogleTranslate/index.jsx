import React, { useEffect, useState } from 'react';
import EarthIcon from 'assets/icons/earth.svg';

let initTimerId;
let addTimerId;

const GoogleTranslate = () => {
  const [isHidden, setIsHidden] = useState(true);

  const initGoogleTranslate = () => {
    if (window.google && google.translate.TranslateElement && google.translate.TranslateElement.InlineLayout) {
      new google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          includedLanguages: 'ru,en,de,es,fr,it,az,tr,pt,id,ta,ar,iw,el,zh-CN,zh-TW,fa,nl,sv,ko,vi,hi',
        },
        'google_translate_element',
      );
      clearTimeout(initTimerId);
    } else {
      clearTimeout(initTimerId);
      initTimerId = setTimeout(initGoogleTranslate, 1000);
    }
  };

  const addGoogleTranslate = () => {
    const haveGoogleElement = document.getElementById(':0.targetLanguage');

    if (haveGoogleElement) {
      setIsHidden(false);
      clearTimeout(addTimerId);
    } else {
      clearTimeout(addTimerId);
      addTimerId = setTimeout(addGoogleTranslate, 5000);
    }
  };

  useEffect(() => {
    initGoogleTranslate();
    addGoogleTranslate();
  }, []);

  return (
    <div
      id="google_translate_element"
      className={`${
        isHidden ? 'hidden' : ''
      } hide_select__translate flex items-center justify-center w-auto h-[36px] text-base font-bold text-white outline-none py-0 px-3 bg-main-blue text-white min-w-40px rounded rounded-br-sm fixed right-5 bottom-24 z-40 lg:px-2`}
    >
      <EarthIcon className="fill-current text-white h-5 w-5 mr-2 sm:mr-0 lg:mr-0 pointer-events-none absolute left-4 lg:left-2.5 flex-shrink-0" />
    </div>
  );
};

export default GoogleTranslate;
