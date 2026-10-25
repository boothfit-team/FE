# FE

부스핏 React+Vite 프런트엔드 저장소입니다. 현재 애플리케이션 소스가 추가되기 전이므로 CI는 npm 실행을 건너뛰고, PR의 브랜치·이슈 연결 규칙을 검사합니다.

작업을 시작하기 전 [협업 규칙](CONTRIBUTING.md)을 확인해 주세요. 기능 작업은 FE 이슈를 만들고 `dev`에서 분기한 뒤 `dev`로 PR을 엽니다. 배포할 변경은 `dev`에서 `main`으로 PR을 엽니다.

React+Vite 프로젝트를 추가할 때는 `package.json`과 `package-lock.json`을 함께 반영해 주세요. 그러면 CI에서 Node.js 22로 설치, lint, test, build를 실행합니다. lint와 test는 해당 npm 스크립트가 있을 때 실행됩니다.
