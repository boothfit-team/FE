import type { CategoryFilter, Festival, HomeBooth } from './home.types'

// Replace this module with an API adapter when the event endpoint is available.
// Dates intentionally follow the Figma draft, rather than the current date.
export const festival: Festival = {
  name: '2026 캠퍼스 학술제',
  departureTime: '18:00',
  dates: [
    { value: '2026-10-16', label: '10월 16일 금요일', shortLabel: '10월 16일' },
    { value: '2026-10-17', label: '10월 17일 토요일', shortLabel: '10월 17일' },
  ],
}
export const categoryOptions: readonly { value: CategoryFilter; label: CategoryFilter }[] =
  ['전체', '체험', '게임', '만들기', '전시'].map(value => ({ value, label: value })) as { value: CategoryFilter; label: CategoryFilter }[]

const bothDays = festival.dates.map(date => date.value)
const firstDay = [bothDays[0]]
export const homeBooths: readonly HomeBooth[] = [
  { id: 'ai', title: '미래를 그리는 AI', posterLines: ['미래를 그리는', 'AI'], category: '체험', location: '학생회관 앞 A-01', description: 'AI로 나만의 캠퍼스 포스터를 만드는 인터랙티브 부스', dates: bothDays, operatingHours: '11:00–17:30', duration: 20, waitMinutes: 28, reservationCount: 2, rating: 4.5, reviewCount: 2, posterColor: '#2457e5', accentColor: '#6c8dff' },
  { id: 'mini-game', title: '1분 미니게임 랩', posterLines: ['1분 미니게임', '랩'], category: '게임', location: '중앙광장 B-02', description: '짧고 즐거운 미니게임으로 친구와 기록에 도전해요.', dates: bothDays, operatingHours: '10:00–17:00', duration: 5, waitMinutes: 24, reservationCount: 1, rating: 4.8, reviewCount: 6, posterColor: '#4050c9', accentColor: '#8d99ff' },
  { id: 'scent', title: '향기의 실험실', posterLines: ['나만의 향기', '실험실'], category: '만들기', location: '학생회관 C-03', description: '좋아하는 향을 조합해 나만의 향기를 만들어요.', dates: bothDays, operatingHours: '11:00–17:30', duration: 15, waitMinutes: 12, reservationCount: 2, rating: 4.7, reviewCount: 4, posterColor: '#9a6a25', accentColor: '#e7c487' },
  { id: 'environment', title: '환경 데이터 전시', posterLines: ['데이터로 만나는', '우리의 환경'], category: '전시', location: '공학관 D-01', description: '일상 속 환경 데이터를 새로운 시선으로 살펴봐요.', dates: bothDays, operatingHours: '10:00–18:00', duration: 10, waitMinutes: 0, reservationCount: 0, rating: 4.6, reviewCount: 3, posterColor: '#24765d', accentColor: '#8dcab5' },
  { id: 'robot', title: '로봇 바리스타 체험', posterLines: ['로봇 바리스타', '체험'], category: '체험', location: '공학관 앞 D-04', description: '로봇이 만드는 커피를 보며 기술을 가까이서 경험해요.', dates: bothDays, operatingHours: '11:00–17:00', duration: 20, waitMinutes: 18, reservationCount: 3, rating: 4.8, reviewCount: 5, posterColor: '#40586d', accentColor: '#92b3ca' },
  { id: 'quiz', title: '캠퍼스 퀴즈 챌린지', posterLines: ['캠퍼스 퀴즈', '챌린지'], category: '게임', location: '중앙광장 B-03', description: '캠퍼스에 관한 문제를 풀고 새로운 이야기를 알아가요.', dates: bothDays, operatingHours: '10:00–17:00', duration: 10, waitMinutes: 5, reservationCount: 1, rating: 4.3, reviewCount: 2, posterColor: '#7a4a8e', accentColor: '#c5a0d6' },
  { id: 'keyring', title: '업사이클 키링 공방', posterLines: ['업사이클', '키링 공방'], category: '만들기', location: '중앙광장 F-06', description: '새로운 쓰임을 찾아 재료를 나만의 키링으로 만들어요.', dates: bothDays, operatingHours: '11:00–17:30', duration: 15, waitMinutes: 10, reservationCount: 2, rating: 4.7, reviewCount: 3, posterColor: '#9b5644', accentColor: '#e6b29c' },
  { id: 'photo', title: '캠퍼스 사진전', posterLines: ['우리가 담은', '캠퍼스'], category: '전시', location: '학생회관 1층', description: '학생들의 시선으로 기록한 캠퍼스의 순간을 만나요.', dates: bothDays, operatingHours: '10:00–18:00', duration: 10, waitMinutes: 0, reservationCount: 0, rating: 4.5, reviewCount: 2, posterColor: '#3c6579', accentColor: '#9ac8d8' },
  { id: 'vr', title: '가상현실 탐험', posterLines: ['새로운 세계로', 'VR 탐험'], category: '체험', location: '공학관 E-02', description: '가상현실 기기로 새로운 공간을 탐험해요.', dates: firstDay, operatingHours: '11:00–17:00', duration: 15, waitMinutes: 20, reservationCount: 2, rating: 4.6, reviewCount: 4, posterColor: '#524295', accentColor: '#b1a0ee' },
  { id: 'board', title: '보드게임 라운지', posterLines: ['함께 즐기는', '보드게임'], category: '게임', location: '중앙광장 B-05', description: '친구들과 함께 규칙을 배우고 보드게임을 즐겨요.', dates: firstDay, operatingHours: '10:00–17:30', duration: 20, waitMinutes: 10, reservationCount: 1, rating: 4.4, reviewCount: 3, posterColor: '#a36030', accentColor: '#efc17f' },
  { id: 'postcard', title: '나만의 엽서 만들기', posterLines: ['오늘의 기억을', '엽서에 담아'], category: '만들기', location: '학생회관 C-05', description: '학술제의 추억을 담아 한 장의 엽서를 완성해요.', dates: firstDay, operatingHours: '11:00–17:00', duration: 15, waitMinutes: 5, reservationCount: 1, rating: 4.5, reviewCount: 2, posterColor: '#a95779', accentColor: '#edb5cf' },
  { id: 'research', title: '우리의 연구 이야기', posterLines: ['질문에서 시작한', '연구 이야기'], category: '전시', location: '공학관 로비', description: '학생들의 질문과 발견을 담은 연구 결과를 살펴봐요.', dates: firstDay, operatingHours: '10:00–18:00', duration: 10, waitMinutes: 0, reservationCount: 0, rating: 4.5, reviewCount: 2, posterColor: '#3f6770', accentColor: '#a0c6c9' },
]
