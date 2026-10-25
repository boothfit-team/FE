import { useState } from 'react'

export default function App() {
  const [checked, setChecked] = useState(false)

  return (
    <main className="page">
      <section className="card" aria-labelledby="app-title">
        <span className="eyebrow">BOOTHFIT</span>
        <h1 id="app-title">부스핏</h1>
        <p>축제 부스를 더 편리하게 만나는 공간</p>
        <button type="button" onClick={() => setChecked(true)}>
          화면 동작 확인
        </button>
        {checked && <p role="status">화면이 정상 동작합니다.</p>}
      </section>
    </main>
  )
}
