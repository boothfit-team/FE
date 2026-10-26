import ComponentGallery from './demo/ComponentGallery'
import RolePreview from './demo/RolePreview'

export default function App() {
  const preview = new URLSearchParams(window.location.search).get('preview')
  if (preview === 'visitor' || preview === 'operator' || preview === 'admin') return <RolePreview role={preview} />
  return <ComponentGallery />
}
