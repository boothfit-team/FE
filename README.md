# BoothFit FE

React와 Vite로 구성한 부스핏 프런트엔드입니다. 현재 화면은 CI 검증을 위한 최소 앱이며 서비스 기능은 아직 포함하지 않습니다.

## 로컬 실행

Node.js 22.13 이상을 설치한 뒤 다음 명령을 실행합니다.

```bash
npm ci
npm run dev
```

개발 서버 주소는 실행 결과에 표시됩니다. 변경 사항을 검증하려면 `npm run lint`, `npm test`, `npm run build`를 실행합니다.

## 협업과 CI

작업 전 [협업 규칙](CONTRIBUTING.md)을 확인해 주세요. FE 이슈를 만들고 `dev`에서 작업 브랜치를 분기해 `dev`로 PR을 엽니다. 배포할 변경은 `dev`에서 `main`으로 PR을 엽니다.

GitHub Actions는 `dev`와 `main` 대상 PR 및 해당 브랜치의 푸시에서 Node.js 22로 `npm ci`, lint, test, build를 실행합니다. PR에는 브랜치 번호와 같은 `Closes #<이슈번호>`를 적어야 합니다.
