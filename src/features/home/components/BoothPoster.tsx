import type { Festival, HomeBooth } from '../home.types'

export function BoothPoster({ booth, festival }: { booth: HomeBooth; festival: Festival }) {
  const dates = festival.dates.filter(date => booth.dates.includes(date.value)).map(date => date.shortLabel).join(' · ')
  // Reproduce the editable Figma text/rectangle poster; real poster images can replace this component.
  return <div role="img" aria-label={booth.title + ' 포스터'} style={{ backgroundColor: booth.posterColor }}
    className="relative aspect-[278/370] w-[71%] max-w-[278px] shrink-0 overflow-hidden rounded-[2px] text-white [container-type:inline-size]">
    <div style={{ backgroundColor: booth.accentColor }} className="absolute inset-x-0 top-0 h-[2.7%]" />
    <span className="absolute top-[4.86%] left-[5.76%] flex h-[6.49%] w-[25.9%] items-center rounded-full bg-[#668899] text-[4.32cqw] font-bold">{booth.category}</span>
    <span className="absolute top-[16.22%] left-[5.76%] text-[4.32cqw] font-bold text-[#e7f5f0]">{festival.name}</span>
    <span className="absolute inset-x-[6.47%] top-[34.59%] text-center text-[10.43cqw] leading-[1.45] font-bold">
      {booth.posterLines.map(line => <span key={line} className="block">{line}</span>)}
    </span>
    <span className="absolute inset-x-[6.47%] top-[73.51%] h-px bg-[#b7cdd0]" />
    <span className="absolute top-[77.57%] left-[6.47%] text-[3.96cqw] font-bold">{booth.location}</span>
    <span className="absolute top-[85.41%] left-[6.47%] text-[3.6cqw]">{dates}</span>
    <span className="absolute top-[91.62%] left-[6.47%] text-[3.96cqw] font-bold">{booth.operatingHours}</span>
  </div>
}
