// i18n-config.js

const resources = {
  en: {
    translation: {
      fontSize: "Font Size",
      lineHeight: "Line Height",
      charSpacing: "Character Spacing",
      bold: "Bold",
      italic: "Italic",
      font: "Font",
      textColor: "Text Color",
      outlineColor: "Outline Color",
      outlineSize: "Outline Size",
      verticalAlignment: "Vertical Alignment",
      applyGradient: "Apply Gradient",
      applyShadow: "Apply Shadow",
      flip: "Flip"
    }
  },
  ja: {
    translation: {
      fontSize: "フォントサイズ",
      lineHeight: "行間",
      charSpacing: "文字間",
      bold: "太字",
      italic: "斜体",
      font: "フォント",
      textColor: "テキストカラー",
      outlineColor: "アウトライン色",
      outlineSize: "アウトラインサイズ",
      verticalAlignment: "垂直方向の配置",
      applyGradient: "グラデーションを適用",
      applyShadow: "シャドウを適用",
      flip: "Flip（動かない）"
    }
  },
  zh: {
    translation: {
      fontSize: "字体大小",
      lineHeight: "行高",
      charSpacing: "字符间距",
      bold: "粗体",
      italic: "斜体",
      font: "字体",
      textColor: "文本颜色",
      outlineColor: "轮廓颜色",
      outlineSize: "轮廓大小",
      verticalAlignment: "垂直对齐",
      applyGradient: "应用渐变",
      applyShadow: "应用阴影",
      flip: "翻转"
    }
  },
  ko: {
    translation: {
      fontSize: "글꼴 크기",
      lineHeight: "줄 간격",
      charSpacing: "문자 간격",
      bold: "굵게",
      italic: "기울임꼴",
      font: "글꼴",
      textColor: "텍스트 색상",
      outlineColor: "외곽선 색상",
      outlineSize: "외곽선 크기",
      verticalAlignment: "수직 정렬",
      applyGradient: "그라데이션 적용",
      applyShadow: "그림자 적용",
      flip: "뒤집기"
    }
  }
};

i18next
  .use(i18nextBrowserLanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,
  });

function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    element.textContent = i18next.t(key);
  });
}

function changeLang(lang) {
  i18next.changeLanguage(lang, (err, t) => {
    if (err) return console.log('Something went wrong loading', err);
    updateContent();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateContent();

  const langButtons = document.querySelectorAll(".langButton");
  langButtons.forEach(button => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang");
      changeLang(lang);
      langButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});