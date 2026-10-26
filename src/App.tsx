import ComponentGallery from './demo/ComponentGallery'
import RolePreview from './demo/RolePreview'
import HomePage from './features/home/HomePage'

export default function App() {
  const preview = new URLSearchParams(window.location.search).get('preview')
  if (preview === 'components') return <ComponentGallery />
  if (preview === 'visitor' || preview === 'operator' || preview === 'admin') return <RolePreview role={preview} />
  return <HomePage />
}
