const fs = require('fs');
const path = require('path');

// --- 설정 ---
// 폰트 파일이 저장된 디렉토리와 생성될 폰트 맵 파일의 경로를 지정합니다.
const FONT_DIR = path.resolve(__dirname, '../assets/fonts');
const OUTPUT_FILE = path.resolve(__dirname, '../src/shared/config/font-map.ts');
// 생성될 파일 내부에서 사용될, 에셋 폴더의 상대 경로입니다.
// 이 경로는 최종적으로 _layout.tsx 파일이 require() 구문에서 사용하게 됩니다.
const FONT_ASSET_PATH_FOR_REQUIRE = '../../../assets/fonts';

// --- 스크립트 실행 ---

// FONT_DIR 디렉토리가 존재하는지 확인하고, 없으면 에러를 출력하고 종료합니다.
if (!fs.existsSync(FONT_DIR)) {
  console.error(`[오류] 폰트 디렉토리를 찾을 수 없습니다: ${FONT_DIR}`);
  process.exit(1);
}

// FONT_DIR에서 지원하는 폰트 확장자(ttf, otf)를 가진 파일 목록을 읽어옵니다.
const fontFiles = fs
  .readdirSync(FONT_DIR)
  .filter(file => /\.(ttf|otf)$/i.test(file));

if (fontFiles.length === 0) {
  console.warn(`[경고] 폰트 파일이 없습니다: ${FONT_DIR}`);
}

// 폰트 파일 이름을 기반으로 '폰트 키'와 'require 경로'의 맵을 생성합니다.
// 예시) 'Paperlogy-Bold.ttf' -> fontMap['Paperlogy-Bold'] = require('../../assets/fonts/Paperlogy-Bold.ttf')
const fontMapEntries = fontFiles.map(file => {
  // 파일 이름에서 확장자를 제거하여 폰트 키를 생성합니다. (e.g., 'Paperlogy-Bold')
  const fontKey = path.basename(file, path.extname(file));
  // require 문에 들어갈 상대 경로를 생성합니다.
  const requirePath = `${FONT_ASSET_PATH_FOR_REQUIRE}/${file}`;
  return `'${fontKey}': require('${requirePath}')`;
});

// 생성된 폰트 맵을 TypeScript 파일 내용으로 포맷팅합니다.
// 파일 상단에는 자동 생성된 파일임을 알리는 경고 메시지를 포함합니다.
const fileContent = `/* eslint-disable */
// ======================================================================
//
// 이 파일은 'pnpm gen:fonts' 스크립트에 의해 자동으로 생성되었습니다.
// 이 파일을 직접 수동으로 수정하지 마세요.
// 폰트를 추가하거나 삭제하려면, 'assets/fonts' 디렉토리에 파일을 넣고
// 'pnpm gen:fonts' 명령어를 다시 실행하세요.
//
// ======================================================================

export const customFontsToLoad = {
  ${fontMapEntries.join(',\n  ')},
};
`;

// 최종적으로 생성된 내용을 OUTPUT_FILE 경로에 씁니다.
try {
  fs.writeFileSync(OUTPUT_FILE, fileContent.trim());
  console.log(`폰트 맵이 성공적으로 생성되었습니다: ${OUTPUT_FILE}`);
} catch (error) {
  console.error(`[오류] 폰트 맵 파일 생성에 실패했습니다: ${error}`);
  process.exit(1);
}
